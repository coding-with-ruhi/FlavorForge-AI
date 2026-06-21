import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { generateRecipeSchema } from './validations'
import { supabase } from './supabase'
import { getGeminiJsonModel } from './gemini'
import { recipeResultSchema, flavorAnalysisSchema, substitutionSchema } from './validations'
import type { GeneratedRecipe, CanonicalIngredient, KnowledgeContext } from './types'

export const generateRecipe = createServerFn({ method: 'POST' })
  .validator(generateRecipeSchema)
  .handler(async ({ data }): Promise<GeneratedRecipe> => {
    const { ingredients, modes } = data

    // Step 1: Brain 2 — Normalize ingredients
    const canonical = await normalizeIngredients(ingredients)

    // Step 2: Brain 1 — Retrieve knowledge
    const knowledge = await retrieveKnowledge(canonical)

    // Step 3: Brain 4 — Generate recipe
    const recipe = await generateRecipeWithAI(ingredients, modes, knowledge, canonical)

    // Step 4: Brain 4B — Generate image (async, non-blocking)
    const image = await generateDishImage(recipe.visual_description, recipe.id)

    // Step 5: Brain 6.5 — Cookability
    const cookability = calculateCookability(recipe, ingredients)

    // Step 6: Brain 5 — Flavor analysis
    const flavor = await analyzeFlavor(recipe)

    // Step 7: Brain 6 — Substitutes
    const substitutions = await findSubstitutes(recipe.missing_ingredients)

    // Step 8: Brain 7 — Nutrition
    const nutrition = await calculateNutrition(recipe)

    return { recipe, image, cookability, flavor, substitutions, nutrition }
  })

// Brain 2 — Ingredient Intelligence
async function normalizeIngredients(ingredients: string[]): Promise<CanonicalIngredient[]> {
  const deduped = [...new Set(ingredients.map((i) => i.trim().toLowerCase()))]

  const { data: synonyms } = await supabase
    .from('ingredient_synonyms')
    .select('raw_term, canonical_name')

  const synonymMap = new Map<string, string>()
  if (synonyms) {
    for (const s of synonyms) {
      synonymMap.set(s.raw_term, s.canonical_name)
    }
  }

  const normalized: CanonicalIngredient[] = []
  for (const raw of deduped) {
    const canonical = synonymMap.get(raw) ?? raw
    normalized.push({ name: canonical, category: 'other' })
  }

  return normalized
}

// Brain 1 — Recipe Knowledge
async function retrieveKnowledge(ingredients: CanonicalIngredient[]): Promise<KnowledgeContext> {
  const names = ingredients.map((i) => i.name)

  const [ingredientRows, cuisineRows, recipeRows] = await Promise.all([
    supabase.from('ingredient_knowledge').select('*').in('canonical_name', names.length > 0 ? names : ['']),
    supabase.from('cuisine_knowledge').select('*'),
    supabase.from('recipe_knowledge').select('*'),
  ])

  return {
    ingredient_context: { ingredients: ingredientRows.data ?? [] },
    cuisine_context: { cuisines: cuisineRows.data ?? [] },
    recipe_context: { similar_recipes: recipeRows.data ?? [] },
  }
}

// Brain 4 — Recipe Generation
async function generateRecipeWithAI(
  ingredients: string[],
  modes: string[],
  knowledge: KnowledgeContext,
  canonical: CanonicalIngredient[],
) {
  const model = getGeminiJsonModel()

  const prompt = `You are Brain 4, the Recipe Reasoning Engine. Generate a complete recipe.

CONTEXT:
User's ingredients: ${ingredients.join(', ')}
Normalized: ${canonical.map((i) => `${i.name} (${i.category})`).join(', ')}

SELECTED MODES (in priority order):
${modes.map((m, i) => `${i + 1}. ${m}`).join('\n')}

If modes conflict, respect priority order.

Return ONLY valid JSON:
{
  "name": "Recipe Name",
  "cuisine_inspiration": "Cuisine",
  "why_this_recipe": "Explanation referencing modes and ingredients",
  "ingredients": [{"name": "string", "category": "protein|vegetable|aromatic|flavor_builder|grain|dairy|spice|other", "amount": "string", "optional": false}],
  "steps": [{"order": 1, "instruction": "string", "duration": 0}],
  "cooking_time": 0,
  "missing_ingredients": ["string"],
  "optional_upgrades": ["string"],
  "tradeoff_explanations": ["string"],
  "visual_description": "vivid description of finished dish"
}`

  const result = await model.generateContent(prompt)
  const text = result.response.text()

  try {
    const parsed = JSON.parse(text)
    const validated = recipeResultSchema.parse(parsed)
    return { ...validated, id: crypto.randomUUID() }
  } catch {
    throw new Error('Failed to generate recipe. Please try again.')
  }
}

// Brain 4B — Dish Image Generation
async function generateDishImage(visualDescription: string, recipeId: string) {
  try {
    const { getGeminiModel } = await import('./gemini')
    const model = getGeminiModel('gemini-2.0-flash-exp-image-generation')
    const result = await model.generateContent(visualDescription)
    const parts = result.response.candidates?.[0]?.content?.parts ?? []
    for (const part of parts) {
      if ('inlineData' in part && part.inlineData) {
        return { url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`, status: 'ready' as const }
      }
    }
    return { status: 'unavailable' as const }
  } catch {
    return { status: 'unavailable' as const }
  }
}

// Brain 6.5 — Cookability
function calculateCookability(recipe: { ingredients: { name: string; optional?: boolean }[]; missing_ingredients: string[]; optional_upgrades: string[] }, userIngredients: string[]) {
  const userLower = userIngredients.map((i) => i.toLowerCase())
  const missing: string[] = []
  const optionalUpgrades: string[] = []

  for (const ing of recipe.ingredients) {
    if (ing.optional) continue
    const nameLower = ing.name.toLowerCase()
    const hasIt = userLower.some((u) => nameLower.includes(u) || u.includes(nameLower))
    if (!hasIt) {
      if (recipe.missing_ingredients.includes(ing.name)) {
        missing.push(ing.name)
      } else {
        optionalUpgrades.push(ing.name)
      }
    }
  }

  const totalRequired = recipe.ingredients.filter((i) => !i.optional).length
  const available = totalRequired - missing.length
  const score = totalRequired > 0 ? Math.round((available / totalRequired) * 100) : 100

  return { cookability_score: score, ready_to_cook: missing.length === 0, missing, optional_upgrades: optionalUpgrades }
}

// Brain 5 — Flavor Analysis
async function analyzeFlavor(recipe: { name: string; ingredients: { name: string; amount: string }[]; steps: { instruction: string }[] }) {
  const model = getGeminiJsonModel()

  const prompt = `Analyze this recipe's flavor profile.
Recipe: ${recipe.name}
Ingredients: ${recipe.ingredients.map((i) => `${i.name} (${i.amount})`).join(', ')}

Score 0-10: salt, acid, fat, umami, aromatics, texture.
Provide 2-3 improvement suggestions and projected score.

Return ONLY JSON: { "current_score": 0, "salt": 0, "acid": 0, "fat": 0, "umami": 0, "aromatics": 0, "texture": 0, "suggestions": [{"aspect":"","suggestion":"","impact":0}], "projected_score": 0 }`

  try {
    const result = await model.generateContent(prompt)
    const parsed = JSON.parse(result.response.text())
    return flavorAnalysisSchema.parse(parsed)
  } catch {
    return { current_score: 7, salt: 5, acid: 5, fat: 5, umami: 5, aromatics: 5, texture: 5, suggestions: [], projected_score: 7 }
  }
}

// Brain 6 — Substitutes
async function findSubstitutes(missingIngredients: string[]) {
  if (missingIngredients.length === 0) return []

  const model = getGeminiJsonModel()

  const prompt = `For each missing ingredient, suggest 2-3 alternatives.
Missing: ${missingIngredients.join(', ')}

Return ONLY JSON: { "substitutions": [{"missing_ingredient": "string", "alternatives": [{"name":"string","confidence":0.0,"reason":"string","skip_option":false}]}] }`

  try {
    const result = await model.generateContent(prompt)
    const parsed = JSON.parse(result.response.text())
    return parsed.substitutions
  } catch {
    return missingIngredients.map((ing) => ({
      missing_ingredient: ing,
      alternatives: [{ name: `Alternative for ${ing}`, confidence: 0.5, reason: 'Common substitute', skip_option: true }],
    }))
  }
}

// Brain 7 — Nutrition
async function calculateNutrition(recipe: { ingredients: { name: string; amount: string }[] }) {
  const model = getGeminiJsonModel()

  const prompt = `Calculate approximate nutrition for this recipe.
Ingredients: ${recipe.ingredients.map((i) => `${i.name} - ${i.amount}`).join(', ')}

Return ONLY JSON: { "calories": 0, "protein_g": 0, "fat_g": 0, "carbs_g": 0, "fiber_g": 0 }`

  try {
    const result = await model.generateContent(prompt)
    const parsed = JSON.parse(result.response.text())
    return parsed
  } catch {
    return { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0 }
  }
}

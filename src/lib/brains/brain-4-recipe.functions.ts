import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getGeminiJsonModel } from '~/lib/gemini'
import { generateRecipeSchema, recipeResultSchema } from '~/lib/validations'
import type { Recipe, KnowledgeContext, CanonicalIngredient } from '~/lib/types'

const inputSchema = z.object({
  ingredients: z.array(z.string()),
  modes: z.array(z.string()),
  knowledge: z.custom<KnowledgeContext>(),
  canonical: z.array(z.custom<CanonicalIngredient>()),
})

export const brain4Generate = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { ingredients, modes, knowledge, canonical } = data

    const model = getGeminiJsonModel()

    const prompt = `You are Brain 4, the Recipe Reasoning Engine. Generate a complete recipe.

CONTEXT:
User's ingredients: ${ingredients.join(', ')}
Normalized ingredients: ${canonical.map((i) => `${i.name} (${i.category})`).join(', ')}

SELECTED MODES (in priority order):
${modes.map((m, i) => `${i + 1}. ${m}`).join('\n')}

If modes conflict, respect the priority order shown above.

KNOWLEDGE CONTEXT:
${JSON.stringify(knowledge, null, 2)}

REASONING STEPS TO FOLLOW:
1. Understand the user's goal based on their ingredients and selected modes
2. Analyze available ingredients (proteins, vegetables, aromatics, flavor builders)
3. Identify missing ingredients (required vs optional upgrades)
4. Apply selected modes with priority ordering; explain tradeoffs
5. Generate the recipe with name, cuisine, ingredients, steps, cooking time
6. Generate "Why This Recipe" explanation showing your reasoning
7. Generate a visual description for dish image generation

Return ONLY valid JSON matching this schema:
{
  "name": "Recipe Name",
  "cuisine_inspiration": "Cuisine type",
  "why_this_recipe": "Human-readable explanation of why this recipe was chosen, referencing the modes and ingredients",
  "ingredients": [{ "name": "string", "category": "protein|vegetable|aromatic|flavor_builder|grain|dairy|spice|other", "amount": "string with quantity", "optional": false }],
  "steps": [{ "order": 1, "instruction": "string", "duration": 0 }],
  "cooking_time": 0,
  "missing_ingredients": ["items user doesn't have"],
  "optional_upgrades": ["nice-to-have additions"],
  "tradeoff_explanations": ["explanations of mode tradeoffs"],
  "visual_description": "vivid description of the finished dish for image generation"
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    try {
      const parsed = JSON.parse(text)
      const recipe = recipeResultSchema.parse(parsed)
      return {
        ...recipe,
        id: crypto.randomUUID(),
      } as Recipe
    } catch {
      throw new Error('Failed to generate recipe. Please try again.')
    }
  })

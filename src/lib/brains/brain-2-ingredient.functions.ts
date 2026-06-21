import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { supabase } from '~/lib/supabase'
import { getGeminiJsonModel } from '~/lib/gemini'
import type { CanonicalIngredient } from '~/lib/types'

const inputSchema = z.object({
  ingredients: z.array(z.string()),
})

export const brain2Normalize = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { ingredients } = data
    const normalized: CanonicalIngredient[] = []

    for (const raw of ingredients) {
      const trimmed = raw.trim().toLowerCase()

      const { data: synonym } = await supabase
        .from('ingredient_synonyms')
        .select('canonical_name')
        .eq('raw_term', trimmed)
        .single()

      if (synonym) {
        const { data: knowledge } = await supabase
          .from('ingredient_knowledge')
          .select('canonical_name, category')
          .eq('canonical_name', synonym.canonical_name)
          .single()

        if (knowledge) {
          normalized.push({
            name: knowledge.canonical_name,
            category: knowledge.category as CanonicalIngredient['category'],
          })
          continue
        }
      }

      normalized.push({
        name: raw,
        category: 'other',
      })
    }

    const deduped = deduplicateIngredients(normalized)

    return { normalized_ingredients: deduped }
  })

// Fallback normalization via Gemini (for unknown ingredients)
export const brain2NormalizeWithAI = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { ingredients } = data
    const model = getGeminiJsonModel()

    const prompt = `Normalize these cooking ingredients to their standard culinary names. 
Resolve synonyms (e.g., capsicum → bell pepper, curd → yogurt, coriander → cilantro).
Categorize each as: protein, vegetable, aromatic, flavor_builder, grain, dairy, spice, or other.
Return as JSON: { "normalized_ingredients": [{ "name": string, "category": string }] }

Ingredients: ${ingredients.join(', ')}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    try {
      const parsed = JSON.parse(text)
      return parsed as { normalized_ingredients: CanonicalIngredient[] }
    } catch {
      return {
        normalized_ingredients: ingredients.map((i) => ({
          name: i,
          category: 'other' as const,
        })),
      }
    }
  })

function deduplicateIngredients(ingredients: CanonicalIngredient[]): CanonicalIngredient[] {
  const seen = new Set<string>()
  return ingredients.filter((ing) => {
    const key = ing.name.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

import { createServerFn } from '@tanstack/react-start'
import { getGeminiJsonModel } from '~/lib/gemini'
import { flavorAnalysisSchema } from '~/lib/validations'
import type { FlavorAnalysis, Recipe } from '~/lib/types'
import { z } from 'zod'

const inputSchema = z.object({
  recipe: z.custom<Recipe>(),
})

export const brain5AnalyzeFlavor = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { recipe } = data

    const model = getGeminiJsonModel()

    const prompt = `You are Brain 5, the Flavor Intelligence Engine. Analyze this recipe's flavor profile.

Recipe: ${recipe.name}
Ingredients: ${recipe.ingredients.map((i) => `${i.name} (${i.amount})`).join(', ')}
Steps: ${recipe.steps.map((s) => s.instruction).join('. ')}

Score each dimension from 0 to 10:
- Salt: saltiness level
- Acid: acidity/sourness
- Fat: richness/fat content
- Umami: savory depth
- Aromatics: herb/spice/aromatic presence
- Texture: textural variety

Also provide 2-3 specific improvement suggestions and a projected score after improvements.

Return ONLY JSON matching:
{
  "current_score": 0.0,
  "salt": 0,
  "acid": 0,
  "fat": 0,
  "umami": 0,
  "aromatics": 0,
  "texture": 0,
  "suggestions": [{"aspect": "string", "suggestion": "string", "impact": 0.0}],
  "projected_score": 0.0
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    try {
      const parsed = JSON.parse(text)
      return flavorAnalysisSchema.parse(parsed) as FlavorAnalysis
    } catch {
      return {
        current_score: 7.0,
        salt: 5,
        acid: 5,
        fat: 5,
        umami: 5,
        aromatics: 5,
        texture: 5,
        suggestions: [],
        projected_score: 7.0,
      }
    }
  })

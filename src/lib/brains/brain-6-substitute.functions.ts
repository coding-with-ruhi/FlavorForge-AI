import { createServerFn } from '@tanstack/react-start'
import { getGeminiJsonModel } from '~/lib/gemini'
import { substitutionSchema } from '~/lib/validations'
import type { Substitution } from '~/lib/types'
import { z } from 'zod'

const inputSchema = z.object({
  missingIngredients: z.array(z.string()),
})

export const brain6FindSubstitutes = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { missingIngredients } = data

    if (missingIngredients.length === 0) return []

    const model = getGeminiJsonModel()

    const prompt = `For each missing ingredient, suggest 2-3 alternative substitutions.

Missing ingredients: ${missingIngredients.join(', ')}

For each alternative, include:
- name: the substitute ingredient
- confidence: 0.0 to 1.0
- reason: why this substitute works
- skip_option: true if the ingredient can be omitted

Return ONLY JSON matching this schema:
{
  "substitutions": [
    {
      "missing_ingredient": "string",
      "alternatives": [
        { "name": "string", "confidence": 0.0, "reason": "string", "skip_option": false }
      ]
    }
  ]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    try {
      const parsed = JSON.parse(text)
      return parsed.substitutions as Substitution[]
    } catch {
      return missingIngredients.map((ing) => ({
        missing_ingredient: ing,
        alternatives: [
          {
            name: `Alternative for ${ing}`,
            confidence: 0.5,
            reason: 'Common substitute',
            skip_option: true,
          },
        ],
      }))
    }
  })

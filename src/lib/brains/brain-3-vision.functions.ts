import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getGeminiVisionModel } from '~/lib/gemini'
import { visionResultSchema } from '~/lib/validations'
import type { VisionAnalysis } from '~/lib/types'

const inputSchema = z.object({
  imageBase64: z.string(),
})

export const analyzeImage = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<VisionAnalysis> => {
    const model = getGeminiVisionModel()

    const imageParts = [
      {
        inlineData: {
          data: data.imageBase64.split(',')[1] ?? data.imageBase64,
          mimeType: 'image/jpeg',
        },
      },
    ]

    const prompt = `Analyze this food image. Identify:
1. The name of the dish
2. The ingredients you can see
3. The cuisine type
4. The cooking style (e.g., grilled, fried, baked, raw)
5. Your confidence level (0.0 to 1.0)

Return ONLY valid JSON matching this schema:
{
  "dish_name": "string",
  "ingredients": ["string"],
  "cuisine": "string",
  "cooking_style": "string",
  "confidence": 0.0
}`

    const result = await model.generateContent([prompt, ...imageParts])
    const text = result.response.text()

    try {
      const parsed = JSON.parse(text)
      return visionResultSchema.parse(parsed)
    } catch {
      return {
        dish_name: 'Unknown Dish',
        ingredients: [],
        cuisine: 'Unknown',
        cooking_style: 'Unknown',
        confidence: 0,
      }
    }
  })

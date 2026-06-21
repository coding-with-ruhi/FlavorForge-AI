import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getGeminiModel } from '~/lib/gemini'
import type { DishImage } from '~/lib/types'

const inputSchema = z.object({
  visualDescription: z.string(),
  recipeId: z.string(),
})

export const brain4bGenerateImage = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<DishImage> => {
    try {
      const model = getGeminiModel('gemini-2.0-flash-exp-image-generation')
      const result = await model.generateContent(data.visualDescription)
      const response = result.response
      const candidates = response.candidates

      if (candidates && candidates.length > 0) {
        const parts = candidates[0].content.parts
        for (const part of parts) {
          if ('inlineData' in part && part.inlineData) {
            return {
              url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
              status: 'ready' as const,
            }
          }
        }
      }

      return { status: 'unavailable' as const }
    } catch {
      return { status: 'unavailable' as const }
    }
  })

export const brain4bPollImage = createServerFn({ method: 'GET' })
  .handler(async (): Promise<DishImage> => {
    return { status: 'unavailable' as const }
  })

import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getGeminiModel } from '~/lib/gemini'

const inputSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      }),
    )
    .optional(),
})

export const chatWithCulinaryAssistant = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const { message, history } = data

    const model = getGeminiModel('gemini-2.5-flash')

    const systemPrompt = `You are a specialized culinary assistant. Your expertise is strictly limited to:
- Cooking techniques and methods
- Ingredient substitutions
- Recipe troubleshooting
- Nutrition and dietary advice
- Meal preparation and planning
- Food science basics
- Kitchen tools and equipment

If the user asks about topics outside these areas (politics, current events, personal advice, non-culinary topics), politely redirect them back to cooking-related topics.

Keep responses concise, practical, and helpful. When suggesting substitutions, explain why they work.`

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. I will act as a focused culinary assistant.' }] },
        ...(history?.map((h) => ({
          role: h.role as 'user' | 'model',
          parts: [{ text: h.content }],
        })) ?? []),
      ],
    })

    const result = await chat.sendMessage(message)
    return result.response.text()
  })

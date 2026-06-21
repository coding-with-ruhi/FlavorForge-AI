import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import type { CookabilityResult, Recipe } from '~/lib/types'

const inputSchema = z.object({
  recipe: z.custom<Recipe>(),
  userIngredients: z.array(z.string()),
})

export const brain65CalculateCookability = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<CookabilityResult> => {
    const { recipe, userIngredients } = data

    const userLower = userIngredients.map((i) => i.toLowerCase())

    const missing: string[] = []
    const optionalUpgrades: string[] = []

    for (const ing of recipe.ingredients) {
      if (ing.optional) continue
      const nameLower = ing.name.toLowerCase()
      const hasIngredient = userLower.some(
        (u) => nameLower.includes(u) || u.includes(nameLower),
      )
      if (!hasIngredient) {
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

    return {
      cookability_score: score,
      ready_to_cook: missing.length === 0,
      missing,
      optional_upgrades: optionalUpgrades,
    }
  })

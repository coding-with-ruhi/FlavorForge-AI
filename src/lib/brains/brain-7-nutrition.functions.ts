import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { supabase } from '~/lib/supabase'
import type { NutritionInfo, Recipe, RecipeIngredient } from '~/lib/types'

const inputSchema = z.object({
  recipe: z.custom<Recipe>(),
  healthGoal: z.enum(['weight_loss', 'muscle_gain', 'balanced']).optional(),
})

export const brain7CalculateNutrition = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<NutritionInfo> => {
    const { recipe, healthGoal } = data

    let totalCalories = 0
    let totalProtein = 0
    let totalFat = 0
    let totalCarbs = 0
    let totalFiber = 0

    for (const ing of recipe.ingredients) {
      const { data: nutrition } = await supabase
        .from('nutrition_data')
        .select('*')
        .eq('ingredient_name', ing.name)
        .single()

      if (nutrition) {
        const multiplier = parseAmount(ing.amount)
        totalCalories += (nutrition.calories_per_100g ?? 0) * multiplier
        totalProtein += (nutrition.protein_per_100g ?? 0) * multiplier
        totalFat += (nutrition.fat_per_100g ?? 0) * multiplier
        totalCarbs += (nutrition.carbs_per_100g ?? 0) * multiplier
        totalFiber += (nutrition.fiber_per_100g ?? 0) * multiplier
      }
    }

    return {
      calories: Math.round(totalCalories),
      protein_g: Math.round(totalProtein * 10) / 10,
      fat_g: Math.round(totalFat * 10) / 10,
      carbs_g: Math.round(totalCarbs * 10) / 10,
      fiber_g: Math.round(totalFiber * 10) / 10,
      health_goal: healthGoal,
    }
  })

function parseAmount(amount: string): number {
  const match = amount.match(/([\d.]+)/)
  if (!match) return 0.1
  const num = parseFloat(match[1])
  if (isNaN(num)) return 0.1

  if (amount.toLowerCase().includes('cup')) return num * 2
  if (amount.toLowerCase().includes('tbsp') || amount.toLowerCase().includes('tablespoon')) return num * 0.15
  if (amount.toLowerCase().includes('tsp') || amount.toLowerCase().includes('teaspoon')) return num * 0.05
  if (amount.toLowerCase().includes('oz')) return num * 0.3
  if (amount.toLowerCase().includes('lb') || amount.toLowerCase().includes('pound')) return num * 4.5
  if (amount.toLowerCase().includes('clove')) return num * 0.1
  if (amount.toLowerCase().includes('piece') || amount.toLowerCase().includes('filet') || amount.toLowerCase().includes('breast')) return num * 1.5

  return num / 100
}

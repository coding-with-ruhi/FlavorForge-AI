import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { supabase } from '~/lib/supabase'
import type { KnowledgeContext } from '~/lib/types'

export const brain1RetrieveKnowledge = createServerFn({ method: 'POST' })
  .validator(z.any())
  .handler(async ({ data }): Promise<KnowledgeContext> => {
    const input = data as { ingredients?: { name: string }[] } | undefined
    const ingredientNames = input?.ingredients?.map((i) => i.name) ?? []

    const [ingredientRows, cuisineRows, recipeRows] = await Promise.all([
      supabase
        .from('ingredient_knowledge')
        .select('*')
        .in('canonical_name', ingredientNames.length > 0 ? ingredientNames : ['']),
      supabase
        .from('cuisine_knowledge')
        .select('*'),
      supabase
        .from('recipe_knowledge')
        .select('*'),
    ])

    return {
      ingredient_context: { ingredients: ingredientRows.data ?? [] },
      cuisine_context: { cuisines: cuisineRows.data ?? [] },
      recipe_context: { similar_recipes: recipeRows.data ?? [] },
    }
  })

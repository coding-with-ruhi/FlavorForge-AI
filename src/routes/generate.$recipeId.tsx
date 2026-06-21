import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { RecipeResult } from '~/components/recipe/recipe-result'
import { supabase } from '~/lib/supabase'
import type { GeneratedRecipe } from '~/lib/types'

export const Route = createFileRoute('/generate/$recipeId')({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from('saved_recipes')
      .select('recipe_data')
      .eq('id', params.recipeId)
      .single()
    return data?.recipe_data as GeneratedRecipe | null
  },
  component: RecipeDetailPage,
})

function RecipeDetailPage() {
  const recipe = Route.useLoaderData()

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-950 mb-2">Recipe Not Found</h1>
          <p className="text-brand-600 mb-6">This recipe doesn't exist or has been removed.</p>
          <Link
            to="/generate"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Generate a new recipe
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to generator
        </Link>
        <RecipeResult recipe={recipe} />
      </div>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ChefHat, Plus, X } from 'lucide-react'
import { RECIPE_MODES } from '~/lib/constants'
import { generateRecipeSchema } from '~/lib/validations'
import type { GeneratedRecipe, RecipeModeId } from '~/lib/types'
import { generateRecipe } from '~/lib/orchestrator.functions'
import { RecipeResult } from '~/components/recipe/recipe-result'

export const Route = createFileRoute('/generate')({
  component: GeneratePage,
})

type FormData = z.infer<typeof generateRecipeSchema>

function GeneratePage() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedModes, setSelectedModes] = useState<RecipeModeId[]>([])
  const [result, setResult] = useState<GeneratedRecipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed])
      setInputValue('')
    }
  }

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddIngredient()
    }
  }

  const toggleMode = (modeId: RecipeModeId) => {
    if (selectedModes.includes(modeId)) {
      setSelectedModes(selectedModes.filter((m) => m !== modeId))
    } else if (selectedModes.length < 4) {
      setSelectedModes([...selectedModes, modeId])
    }
  }

  const handleSubmit = async () => {
    if (ingredients.length === 0 || selectedModes.length === 0) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const recipe = await generateRecipe({
        data: { ingredients, modes: selectedModes },
      })
      setResult(recipe)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-brand-50/30">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setResult(null)}
            className="flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ingredients
          </button>
          <RecipeResult recipe={result} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b-white/50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-800">
            FlavorForge
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-12 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8">
          <ChefHat className="w-8 h-8 text-brand-600" />
          <div>
            <h1 className="text-2xl font-bold text-brand-950">Generate Recipe</h1>
            <p className="text-brand-600">Add your ingredients and select cooking modes</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Ingredients */}
          <section className="glass-card rounded-2xl p-8">
            <h2 className="font-semibold text-brand-900 mb-4">Your Ingredients</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type an ingredient and press Enter..."
                className="flex-1 px-4 py-3 bg-white/50 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-brand-900 placeholder:text-brand-400 shadow-inner"
              />
              <button
                onClick={handleAddIngredient}
                disabled={!inputValue.trim()}
                className="px-5 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-brand-100 shadow-sm text-brand-800 rounded-lg text-sm font-medium animate-fade-in-up"
                  >
                    {ingredient}
                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="hover:text-brand-900 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Modes */}
          <section className="glass-card rounded-2xl p-8">
            <h2 className="font-semibold text-brand-900 mb-1">Cooking Modes</h2>
            <p className="text-sm text-brand-500 mb-4">
              Select up to 4 modes. Drag to reorder for priority.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {RECIPE_MODES.map((mode) => {
                const isSelected = selectedModes.includes(mode.id)
                return (
                  <button
                    key={mode.id}
                    onClick={() => toggleMode(mode.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/80 shadow-[0_4px_12px_rgba(87,98,70,0.1)] scale-[1.02]'
                        : 'border-white/60 bg-white/40 hover:bg-white/60 hover:border-brand-300 hover:shadow-sm'
                    } ${selectedModes.length >= 4 && !isSelected ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    <div className="font-medium text-brand-900 text-sm">{mode.label}</div>
                    <div className="text-xs text-brand-500 mt-0.5">{mode.description}</div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={ingredients.length === 0 || selectedModes.length === 0 || loading}
            className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_30px_rgba(87,98,70,0.3)] hover:shadow-[0_8px_30px_rgba(87,98,70,0.5)] hover:-translate-y-0.5"
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

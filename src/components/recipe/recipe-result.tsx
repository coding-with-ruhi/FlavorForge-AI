import type { GeneratedRecipe } from '~/lib/types'

interface RecipeResultProps {
  recipe: GeneratedRecipe
}

export function RecipeResult({ recipe }: RecipeResultProps) {
  const r = recipe.recipe

  return (
    <div className="space-y-6">
      {/* Dish Image */}
      <div className="bg-white rounded-2xl border border-brand-100 overflow-hidden">
        {recipe.image.status === 'ready' && recipe.image.url ? (
          <img
            src={recipe.image.url}
            alt={r.name}
            className="w-full h-64 sm:h-80 object-cover"
          />
        ) : (
          <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/80 flex items-center justify-center text-3xl">
                🍽️
              </div>
              <p className="text-brand-600 font-medium">
                {recipe.image.status === 'generating'
                  ? 'Generating image...'
                  : 'Dish image unavailable'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recipe Header */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-950 mb-2">{r.name}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-600">
          <span className="px-3 py-1 bg-brand-50 rounded-full">{r.cuisine_inspiration}</span>
          <span>{r.cooking_time} min</span>
        </div>
      </div>

      {/* Why This Recipe */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Why This Recipe</h2>
        <p className="text-brand-700 leading-relaxed">{r.why_this_recipe}</p>
        {r.tradeoff_explanations.length > 0 && (
          <div className="mt-3 space-y-1">
            {r.tradeoff_explanations.map((exp, i) => (
              <p key={i} className="text-sm text-brand-500">• {exp}</p>
            ))}
          </div>
        )}
      </div>

      {/* Cookability Score */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Cookability Score</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="16"
                fill="none" stroke="#e5e7eb" strokeWidth="3"
              />
              <circle
                cx="18" cy="18" r="16"
                fill="none" stroke="#16a34a" strokeWidth="3"
                strokeDasharray={`${recipe.cookability.cookability_score} ${100 - recipe.cookability.cookability_score}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-brand-700">
              {recipe.cookability.cookability_score}%
            </span>
          </div>
          <div>
            <p className={`font-medium ${recipe.cookability.ready_to_cook ? 'text-green-600' : 'text-amber-600'}`}>
              {recipe.cookability.ready_to_cook ? 'Ready to Cook' : 'Missing Ingredients'}
            </p>
          </div>
        </div>
        {recipe.cookability.missing.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-brand-500 mb-1">Missing:</p>
            <div className="flex flex-wrap gap-2">
              {recipe.cookability.missing.map((item) => (
                <span key={item} className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        {recipe.cookability.optional_upgrades.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-brand-500 mb-1">Optional Upgrades:</p>
            <div className="flex flex-wrap gap-2">
              {recipe.cookability.optional_upgrades.map((item) => (
                <span key={item} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Ingredients</h2>
        <ul className="space-y-2">
          {r.ingredients.map((ing, i) => (
            <li key={i} className="flex items-center justify-between py-1.5 border-b border-brand-50 last:border-0">
              <span className={`text-brand-900 ${ing.optional ? 'text-brand-400' : ''}`}>
                {ing.name}
                {ing.optional && <span className="text-brand-400 text-sm ml-1">(optional)</span>}
              </span>
              <span className="text-brand-500 text-sm">{ing.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Steps</h2>
        <ol className="space-y-4">
          {r.steps.map((step) => (
            <li key={step.order} className="flex gap-4">
              <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                {step.order}
              </span>
              <div>
                <p className="text-brand-900">{step.instruction}</p>
                {step.duration && (
                  <span className="text-sm text-brand-500">{step.duration} min</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Flavor Analysis */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Flavor Analysis</h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-brand-600">{recipe.flavor.current_score.toFixed(1)}</span>
          <span className="text-brand-500">/ 10</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Salt', value: recipe.flavor.salt },
            { label: 'Acid', value: recipe.flavor.acid },
            { label: 'Fat', value: recipe.flavor.fat },
            { label: 'Umami', value: recipe.flavor.umami },
            { label: 'Aromatics', value: recipe.flavor.aromatics },
            { label: 'Texture', value: recipe.flavor.texture },
          ].map((dim) => (
            <div key={dim.label} className="bg-brand-50 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-brand-600">{dim.label}</span>
                <span className="text-sm font-medium text-brand-800">{dim.value}/10</span>
              </div>
              <div className="h-1.5 bg-brand-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all"
                  style={{ width: `${(dim.value / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {recipe.flavor.suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-brand-700">Suggestions:</p>
            {recipe.flavor.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-brand-600">
                <span className="text-brand-500 mt-0.5">•</span>
                <span>{s.suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Substitutions */}
      {recipe.substitutions.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 mb-3">Substitutions</h2>
          <div className="space-y-4">
            {recipe.substitutions.map((sub, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-brand-700 mb-2">
                  Instead of <span className="text-red-600">{sub.missing_ingredient}</span>
                </p>
                <div className="space-y-2">
                  {sub.alternatives.map((alt, j) => (
                    <div key={j} className="flex items-start gap-3 p-3 bg-brand-50 rounded-xl">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-brand-900">{alt.name}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            alt.confidence > 0.7 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {Math.round(alt.confidence * 100)}%
                          </span>
                        </div>
                        <p className="text-sm text-brand-500 mt-0.5">{alt.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-3">Nutrition</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Calories', value: recipe.nutrition.calories, unit: 'kcal' },
            { label: 'Protein', value: recipe.nutrition.protein_g, unit: 'g' },
            { label: 'Fat', value: recipe.nutrition.fat_g, unit: 'g' },
            { label: 'Carbs', value: recipe.nutrition.carbs_g, unit: 'g' },
            { label: 'Fiber', value: recipe.nutrition.fiber_g, unit: 'g' },
          ].map((n) => (
            <div key={n.label} className="bg-brand-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-brand-700">{n.value}</div>
              <div className="text-xs text-brand-500">{n.unit}</div>
              <div className="text-xs text-brand-600 mt-0.5">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

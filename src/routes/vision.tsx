import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { analyzeImage } from '~/lib/brains/brain-3-vision.functions'
import type { VisionAnalysis } from '~/lib/types'

export const Route = createFileRoute('/vision')({
  component: VisionPage,
})

function VisionPage() {
  const [image, setImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<VisionAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editableIngredients, setEditableIngredients] = useState<string[]>([])
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const base64 = await fileToBase64(file)
      setImage(base64)
      const result = await analyzeImage({
        data: { imageBase64: base64 },
      })
      setAnalysis(result)
      setEditableIngredients(result.ingredients)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b-white/50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-xl font-bold text-brand-800">
            FlavorForge
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-12 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8">
          <ImageIcon className="w-8 h-8 text-brand-600" />
          <div>
            <h1 className="text-2xl font-bold text-brand-950">Image to Recipe</h1>
            <p className="text-brand-600">Upload a food photo and we'll identify the dish</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload */}
          {!image && (
            <label className="block border-2 border-dashed border-brand-300 bg-white/40 backdrop-blur-sm rounded-3xl p-16 text-center cursor-pointer hover:border-brand-500 hover:bg-white/60 transition-all duration-300 group shadow-sm hover:shadow-md">
              <Upload className="w-12 h-12 text-brand-400 mx-auto mb-4 group-hover:text-brand-500 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-brand-800 font-semibold mb-1 text-lg">Upload a food image</p>
              <p className="text-sm text-brand-500">Drag and drop or click to browse</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          {/* Preview */}
          {image && (
            <div className="glass-card rounded-3xl p-4 animate-fade-in-up">
              <img
                src={image}
                alt="Uploaded dish"
                className="w-full max-h-96 object-contain rounded-xl"
              />
            </div>
          )}

          {loading && (
            <div className="text-center py-8 text-brand-600">
              Analyzing image...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Analysis */}
          {analysis && (
            <div className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in-up">
              <h2 className="font-semibold text-brand-900">Detected Dish</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-brand-500">Name</span>
                  <p className="text-brand-900 font-medium">{analysis.dish_name}</p>
                </div>
                <div>
                  <span className="text-sm text-brand-500">Cuisine</span>
                  <p className="text-brand-900 font-medium">{analysis.cuisine}</p>
                </div>
                <div>
                  <span className="text-sm text-brand-500">Cooking Style</span>
                  <p className="text-brand-900 font-medium">{analysis.cooking_style}</p>
                </div>
                <div>
                  <span className="text-sm text-brand-500">Confidence</span>
                  <p className="text-brand-900 font-medium">
                    {Math.round(analysis.confidence * 100)}%
                  </p>
                </div>
              </div>

              <div>
                <span className="text-sm text-brand-500">Ingredients</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editableIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white border border-brand-100 shadow-sm text-brand-800 rounded-lg text-sm font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recreation Modes */}
              <div className="pt-4 border-t border-brand-100">
                <h3 className="font-semibold text-brand-900 mb-3">Recreation Mode</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {recreationModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                        selectedMode === mode.id
                          ? 'border-brand-500 bg-brand-50/80 shadow-[0_4px_12px_rgba(87,98,70,0.1)] scale-[1.02]'
                          : 'border-white/60 bg-white/40 hover:bg-white/60 hover:border-brand-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium text-brand-900 text-sm">{mode.label}</div>
                      <div className="text-xs text-brand-500 mt-0.5">{mode.description}</div>
                    </button>
                  ))}
                </div>
                {selectedMode && (
                  <Link
                    to="/generate"
                    className="mt-6 inline-block bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_30px_rgba(87,98,70,0.3)] hover:shadow-[0_8px_30px_rgba(87,98,70,0.5)] hover:-translate-y-0.5"
                  >
                    Generate Recipe
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const recreationModes = [
  { id: 'exact', label: 'Exact Recreation', description: 'Recreate the dish as accurately as possible.' },
  { id: 'ingredients-match', label: 'Ingredients-Match Version', description: 'Match the dish using ingredients you have.' },
  { id: 'budget', label: 'Budget Version', description: 'A cost-effective version of the dish.' },
  { id: 'healthy', label: 'Healthy Version', description: 'A healthier take on the dish.' },
]

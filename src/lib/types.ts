import type { RECIPE_MODES } from './constants'

export type RecipeModeId = (typeof RECIPE_MODES)[number]['id']

export interface IngredientInput {
  raw: string
}

export interface CanonicalIngredient {
  name: string
  category: 'protein' | 'vegetable' | 'aromatic' | 'flavor_builder' | 'grain' | 'dairy' | 'spice' | 'other'
  quantity?: string
  unit?: string
}

export interface KnowledgeContext {
  recipe_context: Record<string, Array<Record<string, string | number | boolean | null>>>
  cuisine_context: Record<string, Array<Record<string, string | number | boolean | null>>>
  ingredient_context: Record<string, Array<Record<string, string | number | boolean | null>>>
}

export interface VisionAnalysis {
  dish_name: string
  ingredients: string[]
  cuisine: string
  cooking_style: string
  confidence: number
}

export interface RecipeIngredient extends CanonicalIngredient {
  amount: string
  optional?: boolean
}

export interface RecipeStep {
  order: number
  instruction: string
  duration?: number
}

export interface Recipe {
  id: string
  name: string
  cuisine_inspiration: string
  why_this_recipe: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  cooking_time: number
  missing_ingredients: string[]
  optional_upgrades: string[]
  tradeoff_explanations: string[]
  visual_description: string
}

export type ImageStatus = 'generating' | 'ready' | 'unavailable'

export interface DishImage {
  url?: string
  status: ImageStatus
}

export interface FlavorSuggestion {
  aspect: string
  suggestion: string
  impact: number
}

export interface FlavorAnalysis {
  current_score: number
  salt: number
  acid: number
  fat: number
  umami: number
  aromatics: number
  texture: number
  suggestions: FlavorSuggestion[]
  projected_score: number
}

export interface SubAlternative {
  name: string
  confidence: number
  reason: string
  skip_option?: boolean
}

export interface Substitution {
  missing_ingredient: string
  alternatives: SubAlternative[]
}

export interface CookabilityResult {
  cookability_score: number
  ready_to_cook: boolean
  missing: string[]
  optional_upgrades: string[]
}

export interface NutritionInfo {
  calories: number
  protein_g: number
  fat_g: number
  carbs_g: number
  fiber_g: number
  health_goal?: 'weight_loss' | 'muscle_gain' | 'balanced'
}

export interface GeneratedRecipe {
  recipe: Recipe
  image: DishImage
  cookability: CookabilityResult
  flavor: FlavorAnalysis
  substitutions: Substitution[]
  nutrition: NutritionInfo
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface BrainStatus {
  id: string
  name: string
  status: 'pending' | 'running' | 'complete' | 'error'
}

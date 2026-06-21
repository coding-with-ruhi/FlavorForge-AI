export const RECIPE_MODES = [
  {
    id: 'use_only_my_ingredients',
    label: 'Use Only My Ingredients',
    description: 'Strictly uses only the ingredients you provided',
    icon: 'Package',
  },
  {
    id: 'maximum_flavor',
    label: 'Maximum Flavor',
    description: 'Optimize for taste above all else',
    icon: 'Flame',
  },
  {
    id: 'healthy_version',
    label: 'Healthy Version',
    description: 'Low-calorie, nutrient-dense alternative',
    icon: 'Leaf',
  },
  {
    id: 'budget_mode',
    label: 'Budget Mode',
    description: 'Cost-effective ingredients and minimal waste',
    icon: 'Wallet',
  },
  {
    id: 'restaurant_mode',
    label: 'Restaurant Mode',
    description: 'Authentic techniques and premium ingredients',
    icon: 'ChefHat',
  },
  {
    id: 'experimental_chef_mode',
    label: 'Experimental Chef Mode',
    description: 'Creative fusion and unexpected combinations',
    icon: 'Flask',
  },
] as const;

export const RECIPE_MODES_MAP = Object.fromEntries(
  RECIPE_MODES.map((m) => [m.id, m]),
) as Record<(typeof RECIPE_MODES)[number]['id'], (typeof RECIPE_MODES)[number]>;

export const CUISINE_TYPES = [
  'Italian',
  'Mexican',
  'Japanese',
  'Indian',
  'Chinese',
  'Thai',
  'French',
  'Mediterranean',
  'Korean',
  'Vietnamese',
  'Middle Eastern',
  'Greek',
  'Spanish',
  'American',
  'Caribbean',
  'African',
  'Fusion',
] as const;

export const INGREDIENT_CATEGORIES = [
  'protein',
  'vegetable',
  'aromatic',
  'flavor_builder',
  'grain',
  'dairy',
  'spice',
  'other',
] as const;

export const IMAGE_PLACEHOLDER = '/placeholder-dish.svg';

export const APP_NAME = 'FlavorForge';
export const APP_TAGLINE = 'Your AI Culinary Operating System';

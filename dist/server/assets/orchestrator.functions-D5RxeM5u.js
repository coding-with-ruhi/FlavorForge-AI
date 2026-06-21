import { a as createServerRpc, n as getGeminiJsonModel } from "./gemini-C3MT4fYh.js";
import { t as createServerFn } from "../server.js";
import { n as generateRecipeSchema, r as recipeResultSchema, t as flavorAnalysisSchema } from "./validations-CZOkCkr9.js";
import { t as supabase } from "./supabase-CpDseOdX.js";
//#region src/lib/orchestrator.functions.ts?tss-serverfn-split
var generateRecipe_createServerFn_handler = createServerRpc({
	id: "bcb6c8a0db223426023920cca66c8a30462120968482c6e4c7fb57f53fa7d8df",
	name: "generateRecipe",
	filename: "src/lib/orchestrator.functions.ts"
}, (opts) => generateRecipe.__executeServer(opts));
var generateRecipe = createServerFn({ method: "POST" }).validator(generateRecipeSchema).handler(generateRecipe_createServerFn_handler, async ({ data }) => {
	const { ingredients, modes } = data;
	const canonical = await normalizeIngredients(ingredients);
	const recipe = await generateRecipeWithAI(ingredients, modes, await retrieveKnowledge(canonical), canonical);
	return {
		recipe,
		image: await generateDishImage(recipe.visual_description, recipe.id),
		cookability: calculateCookability(recipe, ingredients),
		flavor: await analyzeFlavor(recipe),
		substitutions: await findSubstitutes(recipe.missing_ingredients),
		nutrition: await calculateNutrition(recipe)
	};
});
async function normalizeIngredients(ingredients) {
	const deduped = [...new Set(ingredients.map((i) => i.trim().toLowerCase()))];
	const { data: synonyms } = await supabase.from("ingredient_synonyms").select("raw_term, canonical_name");
	const synonymMap = /* @__PURE__ */ new Map();
	if (synonyms) for (const s of synonyms) synonymMap.set(s.raw_term, s.canonical_name);
	const normalized = [];
	for (const raw of deduped) {
		const canonical = synonymMap.get(raw) ?? raw;
		normalized.push({
			name: canonical,
			category: "other"
		});
	}
	return normalized;
}
async function retrieveKnowledge(ingredients) {
	const names = ingredients.map((i) => i.name);
	const [ingredientRows, cuisineRows, recipeRows] = await Promise.all([
		supabase.from("ingredient_knowledge").select("*").in("canonical_name", names.length > 0 ? names : [""]),
		supabase.from("cuisine_knowledge").select("*"),
		supabase.from("recipe_knowledge").select("*")
	]);
	return {
		ingredient_context: { ingredients: ingredientRows.data ?? [] },
		cuisine_context: { cuisines: cuisineRows.data ?? [] },
		recipe_context: { similar_recipes: recipeRows.data ?? [] }
	};
}
async function generateRecipeWithAI(ingredients, modes, knowledge, canonical) {
	const model = getGeminiJsonModel();
	const prompt = `You are Brain 4, the Recipe Reasoning Engine. Generate a complete recipe.

CONTEXT:
User's ingredients: ${ingredients.join(", ")}
Normalized: ${canonical.map((i) => `${i.name} (${i.category})`).join(", ")}

SELECTED MODES (in priority order):
${modes.map((m, i) => `${i + 1}. ${m}`).join("\n")}

If modes conflict, respect priority order.

Return ONLY valid JSON:
{
  "name": "Recipe Name",
  "cuisine_inspiration": "Cuisine",
  "why_this_recipe": "Explanation referencing modes and ingredients",
  "ingredients": [{"name": "string", "category": "protein|vegetable|aromatic|flavor_builder|grain|dairy|spice|other", "amount": "string", "optional": false}],
  "steps": [{"order": 1, "instruction": "string", "duration": 0}],
  "cooking_time": 0,
  "missing_ingredients": ["string"],
  "optional_upgrades": ["string"],
  "tradeoff_explanations": ["string"],
  "visual_description": "vivid description of finished dish"
}`;
	const text = (await model.generateContent(prompt)).response.text();
	try {
		const parsed = JSON.parse(text);
		return {
			...recipeResultSchema.parse(parsed),
			id: crypto.randomUUID()
		};
	} catch {
		throw new Error("Failed to generate recipe. Please try again.");
	}
}
async function generateDishImage(visualDescription, recipeId) {
	try {
		const { getGeminiModel } = await import("./gemini-C3MT4fYh.js").then((n) => n.t);
		const parts = (await getGeminiModel("gemini-2.0-flash-exp-image-generation").generateContent(visualDescription)).response.candidates?.[0]?.content?.parts ?? [];
		for (const part of parts) if ("inlineData" in part && part.inlineData) return {
			url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
			status: "ready"
		};
		return { status: "unavailable" };
	} catch {
		return { status: "unavailable" };
	}
}
function calculateCookability(recipe, userIngredients) {
	const userLower = userIngredients.map((i) => i.toLowerCase());
	const missing = [];
	const optionalUpgrades = [];
	for (const ing of recipe.ingredients) {
		if (ing.optional) continue;
		const nameLower = ing.name.toLowerCase();
		if (!userLower.some((u) => nameLower.includes(u) || u.includes(nameLower))) if (recipe.missing_ingredients.includes(ing.name)) missing.push(ing.name);
		else optionalUpgrades.push(ing.name);
	}
	const totalRequired = recipe.ingredients.filter((i) => !i.optional).length;
	const available = totalRequired - missing.length;
	return {
		cookability_score: totalRequired > 0 ? Math.round(available / totalRequired * 100) : 100,
		ready_to_cook: missing.length === 0,
		missing,
		optional_upgrades: optionalUpgrades
	};
}
async function analyzeFlavor(recipe) {
	const model = getGeminiJsonModel();
	const prompt = `Analyze this recipe's flavor profile.
Recipe: ${recipe.name}
Ingredients: ${recipe.ingredients.map((i) => `${i.name} (${i.amount})`).join(", ")}

Score 0-10: salt, acid, fat, umami, aromatics, texture.
Provide 2-3 improvement suggestions and projected score.

Return ONLY JSON: { "current_score": 0, "salt": 0, "acid": 0, "fat": 0, "umami": 0, "aromatics": 0, "texture": 0, "suggestions": [{"aspect":"","suggestion":"","impact":0}], "projected_score": 0 }`;
	try {
		const result = await model.generateContent(prompt);
		const parsed = JSON.parse(result.response.text());
		return flavorAnalysisSchema.parse(parsed);
	} catch {
		return {
			current_score: 7,
			salt: 5,
			acid: 5,
			fat: 5,
			umami: 5,
			aromatics: 5,
			texture: 5,
			suggestions: [],
			projected_score: 7
		};
	}
}
async function findSubstitutes(missingIngredients) {
	if (missingIngredients.length === 0) return [];
	const model = getGeminiJsonModel();
	const prompt = `For each missing ingredient, suggest 2-3 alternatives.
Missing: ${missingIngredients.join(", ")}

Return ONLY JSON: { "substitutions": [{"missing_ingredient": "string", "alternatives": [{"name":"string","confidence":0.0,"reason":"string","skip_option":false}]}] }`;
	try {
		const result = await model.generateContent(prompt);
		return JSON.parse(result.response.text()).substitutions;
	} catch {
		return missingIngredients.map((ing) => ({
			missing_ingredient: ing,
			alternatives: [{
				name: `Alternative for ${ing}`,
				confidence: .5,
				reason: "Common substitute",
				skip_option: true
			}]
		}));
	}
}
async function calculateNutrition(recipe) {
	const model = getGeminiJsonModel();
	const prompt = `Calculate approximate nutrition for this recipe.
Ingredients: ${recipe.ingredients.map((i) => `${i.name} - ${i.amount}`).join(", ")}

Return ONLY JSON: { "calories": 0, "protein_g": 0, "fat_g": 0, "carbs_g": 0, "fiber_g": 0 }`;
	try {
		const result = await model.generateContent(prompt);
		return JSON.parse(result.response.text());
	} catch {
		return {
			calories: 0,
			protein_g: 0,
			fat_g: 0,
			carbs_g: 0,
			fiber_g: 0
		};
	}
}
//#endregion
export { generateRecipe_createServerFn_handler };

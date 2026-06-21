import { z } from "zod";
var recipeModeSchema = z.enum([
	"use_only_my_ingredients",
	"maximum_flavor",
	"healthy_version",
	"budget_mode",
	"restaurant_mode",
	"experimental_chef_mode"
]);
var generateRecipeSchema = z.object({
	ingredients: z.array(z.string().min(1)).min(1, "Add at least one ingredient"),
	modes: z.array(recipeModeSchema).min(1).max(4)
});
z.object({ imageBase64: z.string().min(1) });
z.object({
	message: z.string().min(1).max(2e3),
	history: z.array(z.object({
		role: z.enum(["user", "assistant"]),
		content: z.string()
	})).optional()
});
var recipeResultSchema = z.object({
	name: z.string(),
	cuisine_inspiration: z.string(),
	why_this_recipe: z.string(),
	ingredients: z.array(z.object({
		name: z.string(),
		category: z.enum([
			"protein",
			"vegetable",
			"aromatic",
			"flavor_builder",
			"grain",
			"dairy",
			"spice",
			"other"
		]),
		amount: z.string(),
		optional: z.boolean().optional()
	})),
	steps: z.array(z.object({
		order: z.number(),
		instruction: z.string(),
		duration: z.number().optional()
	})),
	cooking_time: z.number(),
	missing_ingredients: z.array(z.string()),
	optional_upgrades: z.array(z.string()),
	tradeoff_explanations: z.array(z.string()),
	visual_description: z.string()
});
var flavorAnalysisSchema = z.object({
	current_score: z.number().min(0).max(10),
	salt: z.number().min(0).max(10),
	acid: z.number().min(0).max(10),
	fat: z.number().min(0).max(10),
	umami: z.number().min(0).max(10),
	aromatics: z.number().min(0).max(10),
	texture: z.number().min(0).max(10),
	suggestions: z.array(z.object({
		aspect: z.string(),
		suggestion: z.string(),
		impact: z.number().min(0).max(10)
	})),
	projected_score: z.number().min(0).max(10)
});
z.object({
	missing_ingredient: z.string(),
	alternatives: z.array(z.object({
		name: z.string(),
		confidence: z.number().min(0).max(1),
		reason: z.string(),
		skip_option: z.boolean().optional()
	}))
});
var visionResultSchema = z.object({
	dish_name: z.string(),
	ingredients: z.array(z.string()),
	cuisine: z.string(),
	cooking_style: z.string(),
	confidence: z.number().min(0).max(1)
});
//#endregion
export { visionResultSchema as i, generateRecipeSchema as n, recipeResultSchema as r, flavorAnalysisSchema as t };

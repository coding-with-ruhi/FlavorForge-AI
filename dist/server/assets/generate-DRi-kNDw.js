import { t as createServerFn } from "../server.js";
import { n as generateRecipeSchema } from "./validations-CZOkCkr9.js";
import { t as createSsrRpc } from "./createSsrRpc-BdB2e2iw.js";
import { t as RecipeResult } from "./recipe-result-XJUD1PU3.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ChefHat, Plus, X } from "lucide-react";
//#region src/lib/constants.ts
var RECIPE_MODES = [
	{
		id: "use_only_my_ingredients",
		label: "Use Only My Ingredients",
		description: "Strictly uses only the ingredients you provided",
		icon: "Package"
	},
	{
		id: "maximum_flavor",
		label: "Maximum Flavor",
		description: "Optimize for taste above all else",
		icon: "Flame"
	},
	{
		id: "healthy_version",
		label: "Healthy Version",
		description: "Low-calorie, nutrient-dense alternative",
		icon: "Leaf"
	},
	{
		id: "budget_mode",
		label: "Budget Mode",
		description: "Cost-effective ingredients and minimal waste",
		icon: "Wallet"
	},
	{
		id: "restaurant_mode",
		label: "Restaurant Mode",
		description: "Authentic techniques and premium ingredients",
		icon: "ChefHat"
	},
	{
		id: "experimental_chef_mode",
		label: "Experimental Chef Mode",
		description: "Creative fusion and unexpected combinations",
		icon: "Flask"
	}
];
Object.fromEntries(RECIPE_MODES.map((m) => [m.id, m]));
//#endregion
//#region src/lib/orchestrator.functions.ts
var generateRecipe = createServerFn({ method: "POST" }).validator(generateRecipeSchema).handler(createSsrRpc("bcb6c8a0db223426023920cca66c8a30462120968482c6e4c7fb57f53fa7d8df"));
//#endregion
//#region src/routes/generate.tsx?tsr-split=component
function GeneratePage() {
	const [ingredients, setIngredients] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [selectedModes, setSelectedModes] = useState([]);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const handleAddIngredient = () => {
		const trimmed = inputValue.trim();
		if (trimmed && !ingredients.includes(trimmed)) {
			setIngredients([...ingredients, trimmed]);
			setInputValue("");
		}
	};
	const handleRemoveIngredient = (ingredient) => {
		setIngredients(ingredients.filter((i) => i !== ingredient));
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddIngredient();
		}
	};
	const toggleMode = (modeId) => {
		if (selectedModes.includes(modeId)) setSelectedModes(selectedModes.filter((m) => m !== modeId));
		else if (selectedModes.length < 4) setSelectedModes([...selectedModes, modeId]);
	};
	const handleSubmit = async () => {
		if (ingredients.length === 0 || selectedModes.length === 0) return;
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			setResult(await generateRecipe({ data: {
				ingredients,
				modes: selectedModes
			} }));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	if (result) return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-brand-50/30",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto px-4 py-8",
			children: [/* @__PURE__ */ jsxs("button", {
				onClick: () => setResult(null),
				className: "flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6 transition-colors",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to ingredients"]
			}), /* @__PURE__ */ jsx(RecipeResult, { recipe: result })]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ jsx("header", {
			className: "fixed top-0 left-0 right-0 z-50 glass border-b-white/50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto px-4 h-16 flex items-center justify-between",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "text-xl font-bold text-brand-800",
					children: "FlavorForge"
				})
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "max-w-4xl mx-auto px-4 pt-32 pb-12 animate-fade-in-up",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-4 mb-8",
				children: [/* @__PURE__ */ jsx(ChefHat, { className: "w-8 h-8 text-brand-600" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-brand-950",
					children: "Generate Recipe"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-brand-600",
					children: "Add your ingredients and select cooking modes"
				})] })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-8",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "glass-card rounded-2xl p-8",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-semibold text-brand-900 mb-4",
								children: "Your Ingredients"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2 mb-3",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									value: inputValue,
									onChange: (e) => setInputValue(e.target.value),
									onKeyDown: handleKeyDown,
									placeholder: "Type an ingredient and press Enter...",
									className: "flex-1 px-4 py-3 bg-white/50 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-brand-900 placeholder:text-brand-400 shadow-inner"
								}), /* @__PURE__ */ jsx("button", {
									onClick: handleAddIngredient,
									disabled: !inputValue.trim(),
									className: "px-5 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg",
									children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" })
								})]
							}),
							ingredients.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: ingredients.map((ingredient) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-brand-100 shadow-sm text-brand-800 rounded-lg text-sm font-medium animate-fade-in-up",
									children: [ingredient, /* @__PURE__ */ jsx("button", {
										onClick: () => handleRemoveIngredient(ingredient),
										className: "hover:text-brand-900 transition-colors",
										children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
									})]
								}, ingredient))
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "glass-card rounded-2xl p-8",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-semibold text-brand-900 mb-1",
								children: "Cooking Modes"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-brand-500 mb-4",
								children: "Select up to 4 modes. Drag to reorder for priority."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid sm:grid-cols-2 gap-3",
								children: RECIPE_MODES.map((mode) => {
									const isSelected = selectedModes.includes(mode.id);
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => toggleMode(mode.id),
										className: `text-left p-5 rounded-xl border-2 transition-all duration-300 ${isSelected ? "border-brand-500 bg-brand-50/80 shadow-[0_4px_12px_rgba(234,88,12,0.1)] scale-[1.02]" : "border-white/60 bg-white/40 hover:bg-white/60 hover:border-brand-300 hover:shadow-sm"} ${selectedModes.length >= 4 && !isSelected ? "opacity-50 cursor-not-allowed grayscale" : ""}`,
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-medium text-brand-900 text-sm",
											children: mode.label
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-brand-500 mt-0.5",
											children: mode.description
										})]
									}, mode.id);
								})
							})
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: handleSubmit,
						disabled: ingredients.length === 0 || selectedModes.length === 0 || loading,
						className: "w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.5)] hover:-translate-y-0.5",
						children: loading ? "Generating..." : "Generate Recipe"
					}),
					error && /* @__PURE__ */ jsx("div", {
						className: "p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm",
						children: error
					})
				]
			})]
		})]
	});
}
//#endregion
export { GeneratePage as component };

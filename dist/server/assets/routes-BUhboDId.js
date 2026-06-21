import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=component
function LandingPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "fixed top-0 left-0 right-0 z-50 glass border-b-white/50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xl font-bold text-brand-800",
							children: "FlavorForge"
						}),
						/* @__PURE__ */ jsxs("nav", {
							className: "hidden md:flex items-center gap-8 text-sm font-medium text-brand-700",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "#brains",
									className: "hover:text-brand-500 transition-colors",
									children: "AI Brains"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#modes",
									className: "hover:text-brand-500 transition-colors",
									children: "Modes"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#how-it-works",
									className: "hover:text-brand-500 transition-colors",
									children: "How It Works"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/chat",
									className: "hover:text-brand-500 transition-colors",
									children: "Chat"
								})
							]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/generate",
							className: "bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors",
							children: "Start Cooking"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto text-center animate-fade-in-up",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-8",
							children: "AI-Powered Culinary Operating System"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-950 leading-tight mb-6",
							children: [
								"Your Intelligent",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "text-brand-600",
									children: "Culinary Partner"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg sm:text-xl text-brand-700 max-w-2xl mx-auto mb-10 leading-relaxed",
							children: "Generate recipes from ingredients, recreate dishes from images, improve flavor, find substitutes, and optimize nutrition — all powered by advanced AI."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/generate",
								className: "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:shadow-[0_8px_30px_rgba(234,88,12,0.3)] hover:-translate-y-0.5",
								children: "Start Generating Recipes"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/vision",
								className: "glass border-2 border-brand-200 hover:border-brand-400 text-brand-700 px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:bg-white/80 hover:-translate-y-0.5",
								children: "Upload a Dish Image"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "brains",
				className: "py-20 px-4 sm:px-6 lg:px-8 relative",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4",
							children: "Eight Specialized AI Brains"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-brand-600 text-center max-w-2xl mx-auto mb-12",
							children: "Each brain is purpose-built for a specific culinary task, working together to deliver restaurant-quality results."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
							children: brains.map((brain) => /* @__PURE__ */ jsxs("div", {
								className: "glass-card rounded-2xl p-6 group",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 flex items-center justify-center text-xl font-bold mb-5 shadow-inner border border-white group-hover:scale-110 transition-transform duration-300",
										children: brain.icon
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-semibold text-brand-900 mb-2",
										children: brain.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-brand-600 leading-relaxed",
										children: brain.description
									})
								]
							}, brain.id))
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "modes",
				className: "py-20 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4",
							children: "Six Recipe Modes"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-brand-600 text-center max-w-2xl mx-auto mb-12",
							children: "Select up to 4 modes simultaneously. When modes conflict, we respect your priority order."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: modes.map((mode) => /* @__PURE__ */ jsxs("div", {
								className: "glass-card rounded-xl p-6 group cursor-pointer",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-semibold text-brand-900 mb-1",
									children: mode.label
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-brand-600",
									children: mode.description
								})]
							}, mode.id))
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "how-it-works",
				className: "py-20 px-4 sm:px-6 lg:px-8 relative",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-4xl mx-auto",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4",
							children: "How It Works"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-brand-600 text-center max-w-2xl mx-auto mb-12",
							children: "From ingredients to a complete culinary analysis in seconds."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-8",
							children: steps.map((step, i) => /* @__PURE__ */ jsxs("div", {
								className: "glass-card rounded-2xl p-6 flex gap-6 items-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold flex-shrink-0",
									children: i + 1
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "font-semibold text-brand-900 text-lg",
									children: step.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-brand-600",
									children: step.description
								})] })]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl mx-auto text-center bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-12",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl font-bold text-white mb-4",
							children: "Ready to Transform Your Cooking?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-brand-100 mb-8 max-w-lg mx-auto",
							children: "Join FlavorForge and experience the future of culinary AI."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/generate",
							className: "inline-block bg-white text-brand-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-brand-50 transition-colors",
							children: "Get Started Free"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-brand-100 py-8 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto text-center text-sm text-brand-500",
					children: "FlavorForge AI — Your AI Culinary Operating System"
				})
			})
		]
	});
}
var brains = [
	{
		id: 1,
		icon: "🧠",
		name: "Recipe Knowledge",
		description: "Grounded culinary knowledge from structured recipe data, ingredient databases, and cuisine information."
	},
	{
		id: 2,
		icon: "🔍",
		name: "Ingredient Intelligence",
		description: "Normalizes ingredients, resolves synonyms, and categorizes every item in your pantry."
	},
	{
		id: 3,
		icon: "👁️",
		name: "Vision Engine",
		description: "Identifies dishes, ingredients, and cuisine from uploaded food images."
	},
	{
		id: 4,
		icon: "⚙️",
		name: "Recipe Reasoning",
		description: "Core generation engine that analyzes goals, applies modes, and creates complete recipes."
	},
	{
		id: 5,
		icon: "👅",
		name: "Flavor Intelligence",
		description: "Analyzes salt, acid, fat, umami, aromatics, and texture to optimize taste."
	},
	{
		id: 6,
		icon: "🔄",
		name: "Ingredient Substitutes",
		description: "Finds the best alternatives for missing ingredients with confidence scores."
	},
	{
		id: 7,
		icon: "📊",
		name: "Nutrition Engine",
		description: "Calculates macros from structured USDA data — no AI estimation."
	},
	{
		id: 8,
		icon: "💬",
		name: "Culinary Chat",
		description: "Cooking-focused assistant for techniques, troubleshooting, and meal prep."
	}
];
var modes = [
	{
		id: "ingredients-only",
		label: "Use Only My Ingredients",
		description: "Strictly uses only the ingredients you provided."
	},
	{
		id: "max-flavor",
		label: "Maximum Flavor",
		description: "Optimize for taste above all else."
	},
	{
		id: "healthy",
		label: "Healthy Version",
		description: "Low-calorie, nutrient-dense alternative."
	},
	{
		id: "budget",
		label: "Budget Mode",
		description: "Cost-effective ingredients and minimal waste."
	},
	{
		id: "restaurant",
		label: "Restaurant Mode",
		description: "Authentic techniques and premium ingredients."
	},
	{
		id: "experimental",
		label: "Experimental Chef Mode",
		description: "Creative fusion and unexpected combinations."
	}
];
var steps = [
	{
		title: "Add Your Ingredients",
		description: "Type in what you have in your pantry, fridge, or garden."
	},
	{
		title: "Select Your Modes",
		description: "Choose up to 4 cooking modes like Healthy, Budget, or Maximum Flavor."
	},
	{
		title: "AI Generates Your Recipe",
		description: "Eight specialized AI brains work together to create the perfect dish."
	},
	{
		title: "Review & Cook",
		description: "See cookability, flavor analysis, nutrition, substitutions, and more."
	}
];
//#endregion
export { LandingPage as component };

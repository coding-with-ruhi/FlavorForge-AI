import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/recipe/recipe-result.tsx
function RecipeResult({ recipe }) {
	const r = recipe.recipe;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl border border-brand-100 overflow-hidden",
				children: recipe.image.status === "ready" && recipe.image.url ? /* @__PURE__ */ jsx("img", {
					src: recipe.image.url,
					alt: r.name,
					className: "w-full h-64 sm:h-80 object-cover"
				}) : /* @__PURE__ */ jsx("div", {
					className: "w-full h-64 sm:h-80 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center",
					children: /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-16 h-16 mx-auto mb-3 rounded-full bg-white/80 flex items-center justify-center text-3xl",
							children: "🍽️"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-brand-600 font-medium",
							children: recipe.image.status === "generating" ? "Generating image..." : "Dish image unavailable"
						})]
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl sm:text-3xl font-bold text-brand-950 mb-2",
					children: r.name
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3 text-sm text-brand-600",
					children: [/* @__PURE__ */ jsx("span", {
						className: "px-3 py-1 bg-brand-50 rounded-full",
						children: r.cuisine_inspiration
					}), /* @__PURE__ */ jsxs("span", { children: [r.cooking_time, " min"] })]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-brand-900 mb-3",
						children: "Why This Recipe"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-brand-700 leading-relaxed",
						children: r.why_this_recipe
					}),
					r.tradeoff_explanations.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "mt-3 space-y-1",
						children: r.tradeoff_explanations.map((exp, i) => /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-brand-500",
							children: ["• ", exp]
						}, i))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-brand-900 mb-3",
						children: "Cookability Score"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 mb-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative w-20 h-20",
							children: [/* @__PURE__ */ jsxs("svg", {
								className: "w-20 h-20 -rotate-90",
								viewBox: "0 0 36 36",
								children: [/* @__PURE__ */ jsx("circle", {
									cx: "18",
									cy: "18",
									r: "16",
									fill: "none",
									stroke: "#e5e7eb",
									strokeWidth: "3"
								}), /* @__PURE__ */ jsx("circle", {
									cx: "18",
									cy: "18",
									r: "16",
									fill: "none",
									stroke: "#16a34a",
									strokeWidth: "3",
									strokeDasharray: `${recipe.cookability.cookability_score} ${100 - recipe.cookability.cookability_score}`,
									strokeLinecap: "round"
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-brand-700",
								children: [recipe.cookability.cookability_score, "%"]
							})]
						}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", {
							className: `font-medium ${recipe.cookability.ready_to_cook ? "text-green-600" : "text-amber-600"}`,
							children: recipe.cookability.ready_to_cook ? "Ready to Cook" : "Missing Ingredients"
						}) })]
					}),
					recipe.cookability.missing.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-brand-500 mb-1",
							children: "Missing:"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-2",
							children: recipe.cookability.missing.map((item) => /* @__PURE__ */ jsx("span", {
								className: "px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-sm",
								children: item
							}, item))
						})]
					}),
					recipe.cookability.optional_upgrades.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-brand-500 mb-1",
							children: "Optional Upgrades:"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-2",
							children: recipe.cookability.optional_upgrades.map((item) => /* @__PURE__ */ jsx("span", {
								className: "px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm",
								children: item
							}, item))
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold text-brand-900 mb-3",
					children: "Ingredients"
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: r.ingredients.map((ing, i) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center justify-between py-1.5 border-b border-brand-50 last:border-0",
						children: [/* @__PURE__ */ jsxs("span", {
							className: `text-brand-900 ${ing.optional ? "text-brand-400" : ""}`,
							children: [ing.name, ing.optional && /* @__PURE__ */ jsx("span", {
								className: "text-brand-400 text-sm ml-1",
								children: "(optional)"
							})]
						}), /* @__PURE__ */ jsx("span", {
							className: "text-brand-500 text-sm",
							children: ing.amount
						})]
					}, i))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold text-brand-900 mb-3",
					children: "Steps"
				}), /* @__PURE__ */ jsx("ol", {
					className: "space-y-4",
					children: r.steps.map((step) => /* @__PURE__ */ jsxs("li", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5",
							children: step.order
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-brand-900",
							children: step.instruction
						}), step.duration && /* @__PURE__ */ jsxs("span", {
							className: "text-sm text-brand-500",
							children: [step.duration, " min"]
						})] })]
					}, step.order))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-semibold text-brand-900 mb-3",
						children: "Flavor Analysis"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-3xl font-bold text-brand-600",
							children: recipe.flavor.current_score.toFixed(1)
						}), /* @__PURE__ */ jsx("span", {
							className: "text-brand-500",
							children: "/ 10"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4",
						children: [
							{
								label: "Salt",
								value: recipe.flavor.salt
							},
							{
								label: "Acid",
								value: recipe.flavor.acid
							},
							{
								label: "Fat",
								value: recipe.flavor.fat
							},
							{
								label: "Umami",
								value: recipe.flavor.umami
							},
							{
								label: "Aromatics",
								value: recipe.flavor.aromatics
							},
							{
								label: "Texture",
								value: recipe.flavor.texture
							}
						].map((dim) => /* @__PURE__ */ jsxs("div", {
							className: "bg-brand-50 rounded-xl p-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-center mb-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm text-brand-600",
									children: dim.label
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-sm font-medium text-brand-800",
									children: [dim.value, "/10"]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-1.5 bg-brand-200 rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-brand-600 rounded-full transition-all",
									style: { width: `${dim.value / 10 * 100}%` }
								})
							})]
						}, dim.label))
					}),
					recipe.flavor.suggestions.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-brand-700",
							children: "Suggestions:"
						}), recipe.flavor.suggestions.map((s, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2 text-sm text-brand-600",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-brand-500 mt-0.5",
								children: "•"
							}), /* @__PURE__ */ jsx("span", { children: s.suggestion })]
						}, i))]
					})
				]
			}),
			recipe.substitutions.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold text-brand-900 mb-3",
					children: "Substitutions"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: recipe.substitutions.map((sub, i) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm font-medium text-brand-700 mb-2",
						children: ["Instead of ", /* @__PURE__ */ jsx("span", {
							className: "text-red-600",
							children: sub.missing_ingredient
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-2",
						children: sub.alternatives.map((alt, j) => /* @__PURE__ */ jsx("div", {
							className: "flex items-start gap-3 p-3 bg-brand-50 rounded-xl",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-medium text-brand-900",
										children: alt.name
									}), /* @__PURE__ */ jsxs("span", {
										className: `text-xs px-1.5 py-0.5 rounded-full ${alt.confidence > .7 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`,
										children: [Math.round(alt.confidence * 100), "%"]
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-brand-500 mt-0.5",
									children: alt.reason
								})]
							})
						}, j))
					})] }, i))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl border border-brand-100 p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold text-brand-900 mb-3",
					children: "Nutrition"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
					children: [
						{
							label: "Calories",
							value: recipe.nutrition.calories,
							unit: "kcal"
						},
						{
							label: "Protein",
							value: recipe.nutrition.protein_g,
							unit: "g"
						},
						{
							label: "Fat",
							value: recipe.nutrition.fat_g,
							unit: "g"
						},
						{
							label: "Carbs",
							value: recipe.nutrition.carbs_g,
							unit: "g"
						},
						{
							label: "Fiber",
							value: recipe.nutrition.fiber_g,
							unit: "g"
						}
					].map((n) => /* @__PURE__ */ jsxs("div", {
						className: "bg-brand-50 rounded-xl p-3 text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xl font-bold text-brand-700",
								children: n.value
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-xs text-brand-500",
								children: n.unit
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-xs text-brand-600 mt-0.5",
								children: n.label
							})
						]
					}, n.label))
				})]
			})
		]
	});
}
//#endregion
export { RecipeResult as t };

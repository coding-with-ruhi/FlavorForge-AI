import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-BdB2e2iw.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { Image, Upload } from "lucide-react";
//#region src/lib/brains/brain-3-vision.functions.ts
var inputSchema = z.object({ imageBase64: z.string() });
var analyzeImage = createServerFn({ method: "POST" }).validator(inputSchema).handler(createSsrRpc("65dde5507b874be2da0e46951b733f69cc6516b04a97a079e802bdbc53b7464f"));
//#endregion
//#region src/routes/vision.tsx?tsr-split=component
function VisionPage() {
	const [image, setImage] = useState(null);
	const [analysis, setAnalysis] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editableIngredients, setEditableIngredients] = useState([]);
	const [selectedMode, setSelectedMode] = useState(null);
	const handleImageUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setLoading(true);
		setError(null);
		try {
			const base64 = await fileToBase64(file);
			setImage(base64);
			const result = await analyzeImage({ data: { imageBase64: base64 } });
			setAnalysis(result);
			setEditableIngredients(result.ingredients);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to analyze image");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ jsx("header", {
			className: "fixed top-0 left-0 right-0 z-50 glass border-b-white/50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto px-4 h-16 flex items-center",
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
				children: [/* @__PURE__ */ jsx(Image, { className: "w-8 h-8 text-brand-600" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-brand-950",
					children: "Image to Recipe"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-brand-600",
					children: "Upload a food photo and we'll identify the dish"
				})] })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [
					!image && /* @__PURE__ */ jsxs("label", {
						className: "block border-2 border-dashed border-brand-300 bg-white/40 backdrop-blur-sm rounded-3xl p-16 text-center cursor-pointer hover:border-brand-500 hover:bg-white/60 transition-all duration-300 group shadow-sm hover:shadow-md",
						children: [
							/* @__PURE__ */ jsx(Upload, { className: "w-12 h-12 text-brand-400 mx-auto mb-4 group-hover:text-brand-500 group-hover:scale-110 transition-transform duration-300" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-brand-800 font-semibold mb-1 text-lg",
								children: "Upload a food image"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-brand-500",
								children: "Drag and drop or click to browse"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*",
								onChange: handleImageUpload,
								className: "hidden"
							})
						]
					}),
					image && /* @__PURE__ */ jsx("div", {
						className: "glass-card rounded-3xl p-4 animate-fade-in-up",
						children: /* @__PURE__ */ jsx("img", {
							src: image,
							alt: "Uploaded dish",
							className: "w-full max-h-96 object-contain rounded-xl"
						})
					}),
					loading && /* @__PURE__ */ jsx("div", {
						className: "text-center py-8 text-brand-600",
						children: "Analyzing image..."
					}),
					error && /* @__PURE__ */ jsx("div", {
						className: "p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm",
						children: error
					}),
					analysis && /* @__PURE__ */ jsxs("div", {
						className: "glass-card rounded-3xl p-8 space-y-6 animate-fade-in-up",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-semibold text-brand-900",
								children: "Detected Dish"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm text-brand-500",
										children: "Name"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-brand-900 font-medium",
										children: analysis.dish_name
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm text-brand-500",
										children: "Cuisine"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-brand-900 font-medium",
										children: analysis.cuisine
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm text-brand-500",
										children: "Cooking Style"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-brand-900 font-medium",
										children: analysis.cooking_style
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm text-brand-500",
										children: "Confidence"
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-brand-900 font-medium",
										children: [Math.round(analysis.confidence * 100), "%"]
									})] })
								]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm text-brand-500",
								children: "Ingredients"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 mt-2",
								children: editableIngredients.map((ing, i) => /* @__PURE__ */ jsx("span", {
									className: "px-4 py-2 bg-white border border-brand-100 shadow-sm text-brand-800 rounded-lg text-sm font-medium",
									children: ing
								}, i))
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 border-t border-brand-100",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "font-semibold text-brand-900 mb-3",
										children: "Recreation Mode"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "grid sm:grid-cols-2 gap-3",
										children: recreationModes.map((mode) => /* @__PURE__ */ jsxs("button", {
											onClick: () => setSelectedMode(mode.id),
											className: `text-left p-5 rounded-xl border-2 transition-all duration-300 ${selectedMode === mode.id ? "border-brand-500 bg-brand-50/80 shadow-[0_4px_12px_rgba(234,88,12,0.1)] scale-[1.02]" : "border-white/60 bg-white/40 hover:bg-white/60 hover:border-brand-300 hover:shadow-sm"}`,
											children: [/* @__PURE__ */ jsx("div", {
												className: "font-medium text-brand-900 text-sm",
												children: mode.label
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs text-brand-500 mt-0.5",
												children: mode.description
											})]
										}, mode.id))
									}),
									selectedMode && /* @__PURE__ */ jsx(Link, {
										to: "/generate",
										className: "mt-6 inline-block bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.5)] hover:-translate-y-0.5",
										children: "Generate Recipe"
									})
								]
							})
						]
					})
				]
			})]
		})]
	});
}
function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
var recreationModes = [
	{
		id: "exact",
		label: "Exact Recreation",
		description: "Recreate the dish as accurately as possible."
	},
	{
		id: "ingredients-match",
		label: "Ingredients-Match Version",
		description: "Match the dish using ingredients you have."
	},
	{
		id: "budget",
		label: "Budget Version",
		description: "A cost-effective version of the dish."
	},
	{
		id: "healthy",
		label: "Healthy Version",
		description: "A healthier take on the dish."
	}
];
//#endregion
export { VisionPage as component };

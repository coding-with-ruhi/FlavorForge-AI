import { t as Route } from "./generate._recipeId-COXlpcIe.js";
import { t as RecipeResult } from "./recipe-result-XJUD1PU3.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
//#region src/routes/generate.$recipeId.tsx?tsr-split=component
function RecipeDetailPage() {
	const recipe = Route.useLoaderData();
	if (!recipe) return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-brand-950 mb-2",
					children: "Recipe Not Found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-brand-600 mb-6",
					children: "This recipe doesn't exist or has been removed."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/generate",
					className: "text-brand-600 hover:text-brand-700 font-medium",
					children: "Generate a new recipe"
				})
			]
		})
	});
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-brand-50/30",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto px-4 py-8",
			children: [/* @__PURE__ */ jsxs(Link, {
				to: "/generate",
				className: "inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6 transition-colors",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to generator"]
			}), /* @__PURE__ */ jsx(RecipeResult, { recipe })]
		})
	});
}
//#endregion
export { RecipeDetailPage as component };

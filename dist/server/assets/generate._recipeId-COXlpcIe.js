import { t as supabase } from "./supabase-CpDseOdX.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/generate.$recipeId.tsx
var $$splitComponentImporter = () => import("./generate._recipeId-C-743GSB.js");
var Route = createFileRoute("/generate/$recipeId")({
	loader: async ({ params }) => {
		const { data } = await supabase.from("saved_recipes").select("recipe_data").eq("id", params.recipeId).single();
		return data?.recipe_data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

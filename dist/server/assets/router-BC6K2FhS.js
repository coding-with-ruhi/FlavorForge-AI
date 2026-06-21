import { t as Route$5 } from "./generate._recipeId-COXlpcIe.js";
import { HeadContent, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/routes/__root.tsx
var queryClient = new QueryClient();
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FlavorForge AI — Your AI Culinary Operating System" },
			{
				name: "description",
				content: "Generate recipes from ingredients, recreate dishes from images, improve flavor, find substitutes, optimize nutrition, and more."
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true,
			toastOptions: { duration: 4e3 }
		})]
	}) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "scroll-smooth",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/vision.tsx
var $$splitComponentImporter$3 = () => import("./vision-CXsZc1sj.js");
var Route$3 = createFileRoute("/vision")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/generate.tsx
var $$splitComponentImporter$2 = () => import("./generate-DRi-kNDw.js");
var Route$2 = createFileRoute("/generate")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/chat.tsx
var $$splitComponentImporter$1 = () => import("./chat-BBMCmtsw.js");
var Route$1 = createFileRoute("/chat")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-BUhboDId.js");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var VisionRoute = Route$3.update({
	id: "/vision",
	path: "/vision",
	getParentRoute: () => Route$4
});
var GenerateRoute = Route$2.update({
	id: "/generate",
	path: "/generate",
	getParentRoute: () => Route$4
});
var ChatRoute = Route$1.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$4
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var GenerateRouteChildren = { GenerateRecipeIdRoute: Route$5.update({
	id: "/$recipeId",
	path: "/$recipeId",
	getParentRoute: () => GenerateRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	ChatRoute,
	GenerateRoute: GenerateRoute._addFileChildren(GenerateRouteChildren),
	VisionRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { createRouter, getRouter };

//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/__root.tsx",
		children: [
			"/",
			"/chat",
			"/generate",
			"/vision"
		],
		css: ["/assets/index-CTAuQ8fO.css"],
		preloads: ["/assets/index-CjEFQdx8.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CjEFQdx8.js"
		} }]
	},
	"/": {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DkdewOEM.js"]
	},
	"/chat": {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/chat.tsx",
		children: void 0,
		preloads: [
			"/assets/chat-CShZJgRC.js",
			"/assets/createServerFn-sHx0fo3T.js",
			"/assets/createLucideIcon-BnlqIuXa.js"
		]
	},
	"/generate": {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/generate.tsx",
		children: ["/generate/$recipeId"],
		preloads: [
			"/assets/generate-FY4B98Qh.js",
			"/assets/createServerFn-sHx0fo3T.js",
			"/assets/createLucideIcon-BnlqIuXa.js",
			"/assets/recipe-result-BGV9GcZt.js"
		]
	},
	"/vision": {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/vision.tsx",
		children: void 0,
		preloads: [
			"/assets/vision-BThn5Mfg.js",
			"/assets/createServerFn-sHx0fo3T.js",
			"/assets/createLucideIcon-BnlqIuXa.js"
		]
	},
	"/generate/$recipeId": {
		filePath: "C:/Users/Vikas/OneDrive/Documents/FlavorForge AI/src/routes/generate.$recipeId.tsx",
		children: void 0,
		preloads: ["/assets/generate._recipeId-B2xN5ufq.js"]
	}
} });
//#endregion
export { tsrStartManifest };

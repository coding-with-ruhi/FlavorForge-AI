import { n as TSS_SERVER_FUNCTION } from "../server.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/gemini.ts
var gemini_exports = /* @__PURE__ */ __exportAll({
	getGeminiJsonModel: () => getGeminiJsonModel,
	getGeminiModel: () => getGeminiModel,
	getGeminiVisionModel: () => getGeminiVisionModel
});
var apiKey = process.env.GEMINI_API_KEY ?? "";
var genAI;
function getGenAI() {
	if (!genAI) genAI = new GoogleGenerativeAI(apiKey);
	return genAI;
}
function getGeminiModel(model = "gemini-2.0-flash") {
	return getGenAI().getGenerativeModel({ model });
}
function getGeminiVisionModel() {
	return getGenAI().getGenerativeModel({
		model: "gemini-2.0-flash",
		generationConfig: {
			temperature: .2,
			topP: .95
		}
	});
}
function getGeminiJsonModel() {
	return getGenAI().getGenerativeModel({
		model: "gemini-2.0-flash",
		generationConfig: {
			temperature: .4,
			topP: .95,
			responseMimeType: "application/json"
		}
	});
}
//#endregion
export { createServerRpc as a, getGeminiVisionModel as i, getGeminiJsonModel as n, getGeminiModel as r, gemini_exports as t };

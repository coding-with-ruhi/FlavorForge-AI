import { a as createServerRpc, i as getGeminiVisionModel } from "./gemini-C3MT4fYh.js";
import { t as createServerFn } from "../server.js";
import { i as visionResultSchema } from "./validations-CZOkCkr9.js";
import { z } from "zod";
//#region src/lib/brains/brain-3-vision.functions.ts?tss-serverfn-split
var inputSchema = z.object({ imageBase64: z.string() });
var analyzeImage_createServerFn_handler = createServerRpc({
	id: "65dde5507b874be2da0e46951b733f69cc6516b04a97a079e802bdbc53b7464f",
	name: "analyzeImage",
	filename: "src/lib/brains/brain-3-vision.functions.ts"
}, (opts) => analyzeImage.__executeServer(opts));
var analyzeImage = createServerFn({ method: "POST" }).validator(inputSchema).handler(analyzeImage_createServerFn_handler, async ({ data }) => {
	const model = getGeminiVisionModel();
	const imageParts = [{ inlineData: {
		data: data.imageBase64.split(",")[1] ?? data.imageBase64,
		mimeType: "image/jpeg"
	} }];
	const text = (await model.generateContent([`Analyze this food image. Identify:
1. The name of the dish
2. The ingredients you can see
3. The cuisine type
4. The cooking style (e.g., grilled, fried, baked, raw)
5. Your confidence level (0.0 to 1.0)

Return ONLY valid JSON matching this schema:
{
  "dish_name": "string",
  "ingredients": ["string"],
  "cuisine": "string",
  "cooking_style": "string",
  "confidence": 0.0
}`, ...imageParts])).response.text();
	try {
		const parsed = JSON.parse(text);
		return visionResultSchema.parse(parsed);
	} catch {
		return {
			dish_name: "Unknown Dish",
			ingredients: [],
			cuisine: "Unknown",
			cooking_style: "Unknown",
			confidence: 0
		};
	}
});
//#endregion
export { analyzeImage_createServerFn_handler };

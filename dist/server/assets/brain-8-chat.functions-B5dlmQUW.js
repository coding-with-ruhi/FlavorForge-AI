import { a as createServerRpc, r as getGeminiModel } from "./gemini-C3MT4fYh.js";
import { t as createServerFn } from "../server.js";
import { z } from "zod";
//#region src/lib/brains/brain-8-chat.functions.ts?tss-serverfn-split
var inputSchema = z.object({
	message: z.string().min(1).max(2e3),
	history: z.array(z.object({
		role: z.enum(["user", "assistant"]),
		content: z.string()
	})).optional()
});
var chatWithCulinaryAssistant_createServerFn_handler = createServerRpc({
	id: "bf749b4f96525eba3e4c251337487a416030439717530838e253c6ebfe4ebeb8",
	name: "chatWithCulinaryAssistant",
	filename: "src/lib/brains/brain-8-chat.functions.ts"
}, (opts) => chatWithCulinaryAssistant.__executeServer(opts));
var chatWithCulinaryAssistant = createServerFn({ method: "POST" }).validator(inputSchema).handler(chatWithCulinaryAssistant_createServerFn_handler, async ({ data }) => {
	const { message, history } = data;
	return (await getGeminiModel("gemini-2.0-flash").startChat({ history: [
		{
			role: "user",
			parts: [{ text: `You are a specialized culinary assistant. Your expertise is strictly limited to:
- Cooking techniques and methods
- Ingredient substitutions
- Recipe troubleshooting
- Nutrition and dietary advice
- Meal preparation and planning
- Food science basics
- Kitchen tools and equipment

If the user asks about topics outside these areas (politics, current events, personal advice, non-culinary topics), politely redirect them back to cooking-related topics.

Keep responses concise, practical, and helpful. When suggesting substitutions, explain why they work.` }]
		},
		{
			role: "model",
			parts: [{ text: "Understood. I will act as a focused culinary assistant." }]
		},
		...history?.map((h) => ({
			role: h.role,
			parts: [{ text: h.content }]
		})) ?? []
	] }).sendMessage(message)).response.text();
});
//#endregion
export { chatWithCulinaryAssistant_createServerFn_handler };

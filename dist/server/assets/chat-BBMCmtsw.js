import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-BdB2e2iw.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { Bot, Send, User } from "lucide-react";
//#region src/lib/brains/brain-8-chat.functions.ts
var inputSchema = z.object({
	message: z.string().min(1).max(2e3),
	history: z.array(z.object({
		role: z.enum(["user", "assistant"]),
		content: z.string()
	})).optional()
});
var chatWithCulinaryAssistant = createServerFn({ method: "POST" }).validator(inputSchema).handler(createSsrRpc("bf749b4f96525eba3e4c251337487a416030439717530838e253c6ebfe4ebeb8"));
//#endregion
//#region src/routes/chat.tsx?tsr-split=component
function ChatPage() {
	const [messages, setMessages] = useState([{
		id: "welcome",
		role: "assistant",
		content: "Hello! I'm your culinary assistant. Ask me anything about cooking techniques, ingredient substitutions, nutrition, or recipes.",
		timestamp: Date.now()
	}]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const messagesEndRef = useRef(null);
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const handleSubmit = async () => {
		const trimmed = input.trim();
		if (!trimmed || loading) return;
		const userMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content: trimmed,
			timestamp: Date.now()
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setLoading(true);
		try {
			const response = await chatWithCulinaryAssistant({ data: {
				message: trimmed,
				history: messages.slice(1).map((m) => ({
					role: m.role,
					content: m.content
				}))
			} });
			const assistantMessage = {
				id: `assistant-${Date.now()}`,
				role: "assistant",
				content: response,
				timestamp: Date.now()
			};
			setMessages((prev) => [...prev, assistantMessage]);
		} catch {
			const errorMessage = {
				id: `error-${Date.now()}`,
				role: "assistant",
				content: "I'm sorry, I encountered an error. Please try again.",
				timestamp: Date.now()
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b border-brand-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto px-4 h-16 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "text-xl font-bold text-brand-800",
					children: "FlavorForge"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-sm text-brand-500 font-medium",
					children: "Culinary Assistant"
				})]
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 space-y-4 overflow-y-auto mb-4",
					children: [
						messages.map((msg) => /* @__PURE__ */ jsxs("div", {
							className: `flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`,
							children: [/* @__PURE__ */ jsx("div", {
								className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700"}`,
								children: msg.role === "user" ? /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4" })
							}), /* @__PURE__ */ jsx("div", {
								className: `max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-900 border border-brand-100"}`,
								children: msg.content
							})]
						}, msg.id)),
						loading && /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4" })
							}), /* @__PURE__ */ jsx("div", {
								className: "bg-brand-50 border border-brand-100 rounded-2xl px-4 py-3 text-sm text-brand-500",
								children: "Thinking..."
							})]
						}),
						/* @__PURE__ */ jsx("div", { ref: messagesEndRef })
					]
				}),
				messages.length === 1 && /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2 mb-4",
					children: suggestions.map((s) => /* @__PURE__ */ jsx("button", {
						onClick: () => {
							setInput(s);
						},
						className: "px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm border border-brand-100 hover:bg-brand-100 transition-colors",
						children: s
					}, s))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("input", {
						type: "text",
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && handleSubmit(),
						placeholder: "Ask about cooking techniques, substitutions, nutrition...",
						className: "flex-1 px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-brand-900 placeholder:text-brand-400"
					}), /* @__PURE__ */ jsx("button", {
						onClick: handleSubmit,
						disabled: !input.trim() || loading,
						className: "px-4 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
						children: /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
					})]
				})
			]
		})]
	});
}
var suggestions = [
	"How do I substitute eggs in baking?",
	"What is the best way to sear a steak?",
	"How can I reduce sodium in my diet?",
	"What can I use instead of buttermilk?"
];
//#endregion
export { ChatPage as component };

//#region node_modules/.nitro/vite/services/ssr/assets/ai.server-CEkiksWX.js
async function draftReply(thread, opts) {
	const apiKey = process.env.XAI_API_KEY;
	const system = [opts?.prompt?.trim() || "Ты оператор логистической компании Нордлайн. Пиши короткий ответ клиенту на русском: 2–5 предложений, без эмодзи, без маркетинга. Если не хватает данных — задай один уточняющий вопрос. Не выдумывай трекинг и суммы.", opts?.knowledge?.trim() ? `База знаний:\n${opts.knowledge.trim()}` : ""].filter(Boolean).join("\n\n");
	if (!apiKey) {
		const first = opts?.knowledge?.split("\n")[0]?.replace(/^[^:]+:\s*/, "") ?? "";
		if (first) return {
			ok: true,
			text: first.slice(0, 280)
		};
		return {
			ok: false,
			error: "Grok недоступен в этой среде"
		};
	}
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 280,
			temperature: .4,
			messages: [{
				role: "system",
				content: system.slice(0, 4e3)
			}, {
				role: "user",
				content: thread.slice(0, 3500)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI ${res.status}`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Пустой ответ модели"
	};
	return {
		ok: true,
		text
	};
}
//#endregion
export { draftReply };

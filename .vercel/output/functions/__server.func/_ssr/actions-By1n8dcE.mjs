import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-By1n8dcE.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSnapshot_createServerFn_handler = createServerRpc({
	id: "57c236406217c959f479bb1daab482b4059342e1cfe4176e36206e9420da583d",
	name: "getSnapshot",
	filename: "src/lib/relay/actions.ts"
}, (opts) => getSnapshot.__executeServer(opts));
var getSnapshot = createServerFn({ method: "GET" }).handler(getSnapshot_createServerFn_handler, async () => {
	const { getRelaySnapshot } = await import("./engine.server-hN4uVWC-.mjs");
	return getRelaySnapshot();
});
var sendMessageFn_createServerFn_handler = createServerRpc({
	id: "e9a74e4e21a94ef4ac2a59ec0dd3522bf4a3a84840b4fbf79931fd0d1b571761",
	name: "sendMessageFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => sendMessageFn.__executeServer(opts));
var sendMessageFn = createServerFn({ method: "POST" }).validator((input) => input).handler(sendMessageFn_createServerFn_handler, async ({ data }) => {
	const { sendChatMessage, markRead } = await import("./engine.server-hN4uVWC-.mjs");
	markRead(data.chatId);
	return sendChatMessage(data.chatId, data.text, data.as ?? "agent");
});
var markReadFn_createServerFn_handler = createServerRpc({
	id: "022bc444f76c532a83be3f7b7b9058080fbd4a78c2ffa2b076e8a34c3f6a2bc8",
	name: "markReadFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => markReadFn.__executeServer(opts));
var markReadFn = createServerFn({ method: "POST" }).validator((input) => input).handler(markReadFn_createServerFn_handler, async ({ data }) => {
	const { markRead } = await import("./engine.server-hN4uVWC-.mjs");
	markRead(data.chatId);
	return { ok: true };
});
var assignFn_createServerFn_handler = createServerRpc({
	id: "7c1012462ac3e939ec39674888029f22e28bac44ea7cfd0b792e853ae4de5242",
	name: "assignFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => assignFn.__executeServer(opts));
var assignFn = createServerFn({ method: "POST" }).validator((input) => input).handler(assignFn_createServerFn_handler, async ({ data }) => {
	const { assignTicket } = await import("./engine.server-hN4uVWC-.mjs");
	return assignTicket(data.ticketId, data.agentId);
});
var routeFn_createServerFn_handler = createServerRpc({
	id: "75f5755e89d2b82292facb372fad8677a38aacf9bdcb11f8049ed1ad7915580a",
	name: "routeFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => routeFn.__executeServer(opts));
var routeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(routeFn_createServerFn_handler, async ({ data }) => {
	const { routeTicket } = await import("./engine.server-hN4uVWC-.mjs");
	return routeTicket(data);
});
var processDocFn_createServerFn_handler = createServerRpc({
	id: "f3581f9b9cbcfb8c0111b52a8cd08aa9c1917c47e0abd867b30c3238d8b5a87a",
	name: "processDocFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => processDocFn.__executeServer(opts));
var processDocFn = createServerFn({ method: "POST" }).validator((input) => input).handler(processDocFn_createServerFn_handler, async ({ data }) => {
	const { processDocument } = await import("./engine.server-hN4uVWC-.mjs");
	return processDocument(data.documentId, data.chatId);
});
var connectChannelFn_createServerFn_handler = createServerRpc({
	id: "9c3458ba39f98c91473c38592d251292f66cf456f4fb2b4c285e2515e481ac28",
	name: "connectChannelFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => connectChannelFn.__executeServer(opts));
var connectChannelFn = createServerFn({ method: "POST" }).validator((input) => input).handler(connectChannelFn_createServerFn_handler, async ({ data }) => {
	const { connectChannel } = await import("./engine.server-hN4uVWC-.mjs");
	return connectChannel(data);
});
var disconnectChannelFn_createServerFn_handler = createServerRpc({
	id: "232ecfb9591f4c52f30e819060a9dd42311f8da04bcdeb2d2bfce3da7ec70e3c",
	name: "disconnectChannelFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => disconnectChannelFn.__executeServer(opts));
var disconnectChannelFn = createServerFn({ method: "POST" }).validator((input) => input).handler(disconnectChannelFn_createServerFn_handler, async ({ data }) => {
	const { disconnectChannel } = await import("./engine.server-hN4uVWC-.mjs");
	return disconnectChannel(data.channelId);
});
var toggleRuleFn_createServerFn_handler = createServerRpc({
	id: "f57eafca14d925d825cfa5765c1832974e423432d570ccdc821a55ee31ba7460",
	name: "toggleRuleFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => toggleRuleFn.__executeServer(opts));
var toggleRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(toggleRuleFn_createServerFn_handler, async ({ data }) => {
	const { toggleRule } = await import("./engine.server-hN4uVWC-.mjs");
	return toggleRule(data.ruleId);
});
var upsertRuleFn_createServerFn_handler = createServerRpc({
	id: "044a5597b3a09266e995e771b77129c13ee7493f68f89c4d3d153bf233e00df9",
	name: "upsertRuleFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => upsertRuleFn.__executeServer(opts));
var upsertRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(upsertRuleFn_createServerFn_handler, async ({ data }) => {
	const { upsertRule } = await import("./engine.server-hN4uVWC-.mjs");
	return upsertRule(data);
});
var deleteRuleFn_createServerFn_handler = createServerRpc({
	id: "b0290302902705beab8f4be111c7e57117bf39823e2b20fb087d38e559a8ab38",
	name: "deleteRuleFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => deleteRuleFn.__executeServer(opts));
var deleteRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(deleteRuleFn_createServerFn_handler, async ({ data }) => {
	const { deleteRule } = await import("./engine.server-hN4uVWC-.mjs");
	return deleteRule(data.ruleId);
});
var moveRuleFn_createServerFn_handler = createServerRpc({
	id: "b970ad165b0b0179ac0bb5c0384a64f5a9db758f54af9692fa86009f08c7e1e1",
	name: "moveRuleFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => moveRuleFn.__executeServer(opts));
var moveRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(moveRuleFn_createServerFn_handler, async ({ data }) => {
	const { moveRule } = await import("./engine.server-hN4uVWC-.mjs");
	return moveRule(data.ruleId, data.dir);
});
var testRouteFn_createServerFn_handler = createServerRpc({
	id: "b270a2c14d5676c4f78c7598c4780099a8710cf8f59fee315fc4cffe4a60ee96",
	name: "testRouteFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => testRouteFn.__executeServer(opts));
var testRouteFn = createServerFn({ method: "POST" }).validator((input) => input).handler(testRouteFn_createServerFn_handler, async ({ data }) => {
	const { testRoute } = await import("./engine.server-hN4uVWC-.mjs");
	return testRoute(data);
});
var applyRouterFn_createServerFn_handler = createServerRpc({
	id: "c05abcd8d1926ede027b807959b05cfd0c1aff0e968d812d54040aaae7603748",
	name: "applyRouterFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => applyRouterFn.__executeServer(opts));
var applyRouterFn = createServerFn({ method: "POST" }).validator((input = {}) => input).handler(applyRouterFn_createServerFn_handler, async ({ data }) => {
	const { applyRouter } = await import("./engine.server-hN4uVWC-.mjs");
	return applyRouter(data);
});
var applyEscalationFn_createServerFn_handler = createServerRpc({
	id: "bc48a5ff1c5b0be03d80241978b6e1c34756ab1bd202ec22c66dff316704dcda",
	name: "applyEscalationFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => applyEscalationFn.__executeServer(opts));
var applyEscalationFn = createServerFn({ method: "POST" }).handler(applyEscalationFn_createServerFn_handler, async () => {
	const { applyEscalations } = await import("./engine.server-hN4uVWC-.mjs");
	return applyEscalations();
});
var escalateTicketFn_createServerFn_handler = createServerRpc({
	id: "3f78a5f9f0774946eb7777958a06e0984f1960c45ab5cbaacf4d46bb3e362d78",
	name: "escalateTicketFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => escalateTicketFn.__executeServer(opts));
var escalateTicketFn = createServerFn({ method: "POST" }).validator((input) => input).handler(escalateTicketFn_createServerFn_handler, async ({ data }) => {
	const { escalateTicket } = await import("./engine.server-hN4uVWC-.mjs");
	return escalateTicket(data);
});
var toggleEscalationFn_createServerFn_handler = createServerRpc({
	id: "dd8b516bef048fe7843a6c27613b4fd7b1a4defddb34038753ee5c99621fcb8c",
	name: "toggleEscalationFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => toggleEscalationFn.__executeServer(opts));
var toggleEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(toggleEscalationFn_createServerFn_handler, async ({ data }) => {
	const { toggleEscalation } = await import("./engine.server-hN4uVWC-.mjs");
	return toggleEscalation(data.id);
});
var deleteEscalationFn_createServerFn_handler = createServerRpc({
	id: "95a9f16d43a772a4ccf29ff41930488d246aab33406d56ff086db19e83364e28",
	name: "deleteEscalationFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => deleteEscalationFn.__executeServer(opts));
var deleteEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(deleteEscalationFn_createServerFn_handler, async ({ data }) => {
	const { deleteEscalation } = await import("./engine.server-hN4uVWC-.mjs");
	return deleteEscalation(data.id);
});
var upsertEscalationFn_createServerFn_handler = createServerRpc({
	id: "d1a9b8df6b80fb717cdd5f48c5ec32578ffcdb5bdca66445485626bab6a3a93f",
	name: "upsertEscalationFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => upsertEscalationFn.__executeServer(opts));
var upsertEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(upsertEscalationFn_createServerFn_handler, async ({ data }) => {
	const { upsertEscalation } = await import("./engine.server-hN4uVWC-.mjs");
	return upsertEscalation(data);
});
var upsertKindFn_createServerFn_handler = createServerRpc({
	id: "0167d46e82e248f63d6cc0fd81b1d4b705157c2ac092b01539324b890b4c0276",
	name: "upsertKindFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => upsertKindFn.__executeServer(opts));
var upsertKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(upsertKindFn_createServerFn_handler, async ({ data }) => {
	const { upsertKind } = await import("./engine.server-hN4uVWC-.mjs");
	return upsertKind(data);
});
var deleteKindFn_createServerFn_handler = createServerRpc({
	id: "a1a2aba043145bc71bb514a1236d62bd5c00053ef6d5122e2f027a0f312e9c29",
	name: "deleteKindFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => deleteKindFn.__executeServer(opts));
var deleteKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(deleteKindFn_createServerFn_handler, async ({ data }) => {
	const { deleteKind } = await import("./engine.server-hN4uVWC-.mjs");
	return deleteKind(data.id);
});
var setChatKindFn_createServerFn_handler = createServerRpc({
	id: "2d59003ead56fe649fa408058303c5a57d15a9fba9f7c890dee15fe546bc2f00",
	name: "setChatKindFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => setChatKindFn.__executeServer(opts));
var setChatKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(setChatKindFn_createServerFn_handler, async ({ data }) => {
	const { setChatKind } = await import("./engine.server-hN4uVWC-.mjs");
	return setChatKind(data.chatId, data.kindId);
});
var upsertKnowledgeFn_createServerFn_handler = createServerRpc({
	id: "30534dbc8ee45e08944d30b3b579882be9c12223de619e4c9f6745f9faa41503",
	name: "upsertKnowledgeFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => upsertKnowledgeFn.__executeServer(opts));
var upsertKnowledgeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(upsertKnowledgeFn_createServerFn_handler, async ({ data }) => {
	const { upsertKnowledge } = await import("./engine.server-hN4uVWC-.mjs");
	return upsertKnowledge(data);
});
var deleteKnowledgeFn_createServerFn_handler = createServerRpc({
	id: "85e64bdc98f0c345711a01a4f06646938f725d45aaa3e8ab826139820dffef00",
	name: "deleteKnowledgeFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => deleteKnowledgeFn.__executeServer(opts));
var deleteKnowledgeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(deleteKnowledgeFn_createServerFn_handler, async ({ data }) => {
	const { deleteKnowledge } = await import("./engine.server-hN4uVWC-.mjs");
	return deleteKnowledge(data.id);
});
var upsertForkFn_createServerFn_handler = createServerRpc({
	id: "36ae7a9de827b35c75c0c103329000fe18b2f8d3494b31fec7917d7877e2bea0",
	name: "upsertForkFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => upsertForkFn.__executeServer(opts));
var upsertForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(upsertForkFn_createServerFn_handler, async ({ data }) => {
	const { upsertFork } = await import("./engine.server-hN4uVWC-.mjs");
	return upsertFork(data);
});
var deleteForkFn_createServerFn_handler = createServerRpc({
	id: "0e21a9e5f82062ca9dc04515d2134f2e55bb358201332f85bff62b850b9d1b0d",
	name: "deleteForkFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => deleteForkFn.__executeServer(opts));
var deleteForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(deleteForkFn_createServerFn_handler, async ({ data }) => {
	const { deleteFork } = await import("./engine.server-hN4uVWC-.mjs");
	return deleteFork(data.id);
});
var toggleForkFn_createServerFn_handler = createServerRpc({
	id: "cb2e931a83103149f9bf3c9694cb8c53fecb43446e71cd15a795461f2b63088a",
	name: "toggleForkFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => toggleForkFn.__executeServer(opts));
var toggleForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(toggleForkFn_createServerFn_handler, async ({ data }) => {
	const { toggleFork } = await import("./engine.server-hN4uVWC-.mjs");
	return toggleFork(data.id);
});
var testForkFn_createServerFn_handler = createServerRpc({
	id: "8db6ce1a91f0985f4c33a90d63105e74f0a302ba3f1868f670e29388087012c9",
	name: "testForkFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => testForkFn.__executeServer(opts));
var testForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(testForkFn_createServerFn_handler, async ({ data }) => {
	const { testFork } = await import("./engine.server-hN4uVWC-.mjs");
	return testFork(data);
});
var draftReplyFn_createServerFn_handler = createServerRpc({
	id: "ad0c543c0798504e39ca9ed0fdff32a86133d0d79e9a9a3c09d91e6fd0a3ecd2",
	name: "draftReplyFn",
	filename: "src/lib/relay/actions.ts"
}, (opts) => draftReplyFn.__executeServer(opts));
var draftReplyFn = createServerFn({ method: "POST" }).validator((input) => input).handler(draftReplyFn_createServerFn_handler, async ({ data }) => {
	const engine = await import("./engine.server-hN4uVWC-.mjs");
	const { TEMPLATES } = await import("./catalog-DJQRIyZJ.mjs").then((n) => n.d);
	if (data.templateId) {
		const t = TEMPLATES.find((x) => x.id === data.templateId);
		if (!t) throw new Error("Шаблон не найден");
		if (data.send) await engine.sendChatMessage(data.chatId, t.body, "bot");
		return {
			ok: true,
			text: t.body,
			sent: Boolean(data.send)
		};
	}
	const history = engine.getChatMessages(data.chatId, 12).map((m) => `${m.author === "user" ? "Клиент" : m.agentName ?? "Оператор"}: ${m.text}`).join("\n");
	const ctx = engine.aiContextForChat(data.chatId);
	const { draftReply } = await import("./ai.server-CEkiksWX.mjs");
	const drafted = await draftReply(history, {
		prompt: ctx.prompt,
		knowledge: ctx.knowledge
	});
	if (!drafted.ok) return drafted;
	if (data.send) await engine.sendChatMessage(data.chatId, drafted.text, "ai");
	return {
		ok: true,
		text: drafted.text,
		sent: Boolean(data.send),
		kind: ctx.kind.name,
		knowledge: ctx.articles.map((a) => a.title)
	};
});
//#endregion
export { applyEscalationFn_createServerFn_handler, applyRouterFn_createServerFn_handler, assignFn_createServerFn_handler, connectChannelFn_createServerFn_handler, deleteEscalationFn_createServerFn_handler, deleteForkFn_createServerFn_handler, deleteKindFn_createServerFn_handler, deleteKnowledgeFn_createServerFn_handler, deleteRuleFn_createServerFn_handler, disconnectChannelFn_createServerFn_handler, draftReplyFn_createServerFn_handler, escalateTicketFn_createServerFn_handler, getSnapshot_createServerFn_handler, markReadFn_createServerFn_handler, moveRuleFn_createServerFn_handler, processDocFn_createServerFn_handler, routeFn_createServerFn_handler, sendMessageFn_createServerFn_handler, setChatKindFn_createServerFn_handler, testForkFn_createServerFn_handler, testRouteFn_createServerFn_handler, toggleEscalationFn_createServerFn_handler, toggleForkFn_createServerFn_handler, toggleRuleFn_createServerFn_handler, upsertEscalationFn_createServerFn_handler, upsertForkFn_createServerFn_handler, upsertKindFn_createServerFn_handler, upsertKnowledgeFn_createServerFn_handler, upsertRuleFn_createServerFn_handler };

import { a as KNOWLEDGE, c as RULES, i as FORKS, l as TALK_KINDS, n as CHANNEL_META, r as ESCALATIONS, s as QUEUES, t as AGENTS, u as TEMPLATES } from "./catalog-DJQRIyZJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine.server-hN4uVWC-.js
var TG = "https://api.telegram.org";
function display(u) {
	if (!u) return "Telegram";
	return [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || String(u.id);
}
async function telegramGetMe(token) {
	const body = await (await fetch(`${TG}/bot${token}/getMe`)).json();
	if (!body.ok || !body.result) throw new Error(body.description || "Telegram getMe failed");
	return body.result;
}
async function telegramSend(token, chatId, text) {
	const body = await (await fetch(`${TG}/bot${token}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text
		})
	})).json();
	if (!body.ok) throw new Error(body.description || "Telegram send failed");
}
async function telegramGetUpdates(token, offset) {
	const url = `${TG}/bot${token}/getUpdates?offset=${offset}&limit=20&timeout=0`;
	const body = await (await fetch(url)).json();
	if (!body.ok || !body.result) return {
		updates: [],
		nextOffset: offset
	};
	let next = offset;
	const updates = [];
	for (const u of body.result) {
		next = Math.max(next, u.update_id + 1);
		const msg = u.message;
		const text = msg?.text;
		if (!msg || !text) continue;
		const chat = msg.chat;
		updates.push({
			peerId: String(chat.id),
			title: chat.title || display(msg.from),
			text
		});
	}
	return {
		updates,
		nextOffset: next
	};
}
var MAX_API = "https://platform-api2.max.ru";
async function maxGetMe(token) {
	const res = await fetch(`${MAX_API}/me`, { headers: { Authorization: token } });
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t.slice(0, 180) || `MAX ${res.status}`);
	}
	return await res.json();
}
async function maxSend(token, peerId, text) {
	const numeric = peerId.replace(/^max:/, "");
	const qs = !numeric.startsWith("-") ? `user_id=${encodeURIComponent(numeric)}` : `chat_id=${encodeURIComponent(numeric)}`;
	const res = await fetch(`${MAX_API}/messages?${qs}`, {
		method: "POST",
		headers: {
			Authorization: token,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ text })
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t.slice(0, 180) || `MAX send ${res.status}`);
	}
}
async function maxGetUpdates(token, marker) {
	const qs = marker ? `?marker=${marker}&limit=20&timeout=0` : "?limit=20&timeout=0";
	const res = await fetch(`${MAX_API}/updates${qs}`, { headers: { Authorization: token } });
	if (!res.ok) return {
		updates: [],
		marker
	};
	const body = await res.json();
	const updates = [];
	for (const u of body.updates ?? []) {
		const text = u.message?.body?.text;
		if (!text) continue;
		const userId = u.message?.sender?.user_id;
		const chatId = u.message?.recipient?.chat_id;
		updates.push({
			peerId: userId ? String(userId) : String(chatId ?? "max"),
			title: u.message?.sender?.name || "MAX",
			text
		});
	}
	return {
		updates,
		marker: body.marker ?? marker
	};
}
var GRAPH = "https://graph.facebook.com/v21.0";
async function whatsappVerify(token, phoneNumberId) {
	const res = await fetch(`${GRAPH}/${phoneNumberId}`, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t.slice(0, 180) || `WhatsApp ${res.status}`);
	}
}
async function whatsappSend(token, phoneNumberId, to, text) {
	if (!phoneNumberId) throw new Error("Нет Phone Number ID");
	const res = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			messaging_product: "whatsapp",
			to: to.replace(/\D/g, ""),
			type: "text",
			text: { body: text }
		})
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t.slice(0, 180) || `WhatsApp send ${res.status}`);
	}
}
var g = globalThis;
var ENGINE_REV = 14;
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function ago(min) {
	return (/* @__PURE__ */ new Date(Date.now() - min * 6e4)).toISOString();
}
function slaDue(queueId, fromIso) {
	const q = QUEUES.find((x) => x.id === queueId) ?? QUEUES[1];
	return new Date(new Date(fromIso).getTime() + q.slaMin * 6e4).toISOString();
}
function classify(name, text) {
	const s = `${name} ${text}`.toLowerCase();
	if (/сч[её]т|invoice|оплат/.test(s)) return "invoice";
	if (/договор|contract|соглашен/.test(s)) return "contract";
	if (/паспорт|снилс|инн|identity/.test(s)) return "identity";
	if (/резюме|cv|resume/.test(s)) return "resume";
	if (/акт|кс-2|кс2/.test(s)) return "act";
	return "other";
}
function extractFields(kind, name) {
	if (kind === "invoice") return {
		Номер: "NL-4821",
		Сумма: "186 400 ₽",
		НДС: "20%",
		Контрагент: "ООО «Берёзка»",
		Срок: "до пятницы"
	};
	if (kind === "contract") return {
		Номер: "Д-17/26",
		Стороны: "Нордлайн × Берёзка",
		Срок: "12 мес",
		Город: "Казань"
	};
	if (kind === "act") return {
		Форма: "КС-2",
		Объект: "Склад-3",
		Дата: "сегодня"
	};
	if (kind === "resume") return {
		Роль: "Логист",
		Опыт: "5 лет",
		Город: "Пермь"
	};
	if (kind === "identity") return {
		Тип: "Паспорт РФ",
		Статус: "нужна проверка"
	};
	return { Файл: name };
}
function matchKind(input) {
	const hay = `${input.text} ${input.title ?? ""}`.toLowerCase();
	const kinds = g.__RELAY?.kinds ?? TALK_KINDS;
	for (const kind of kinds) {
		if (kind.match === "*") return kind;
		try {
			if (new RegExp(kind.match, "i").test(hay)) return kind;
		} catch {}
	}
	return TALK_KINDS[TALK_KINDS.length - 1];
}
function forkMatches(fork, ctx) {
	if (!fork.enabled) return false;
	if (fork.kindId && ctx.kindId && fork.kindId !== ctx.kindId) return false;
	const trigger = fork.trigger ?? "keyword";
	const hay = `${ctx.text} ${ctx.title ?? ""}`.toLowerCase();
	if (trigger === "keyword") {
		if (!fork.match) return false;
		try {
			return new RegExp(fork.match, "i").test(hay);
		} catch {
			return false;
		}
	}
	if (trigger === "document") {
		if (!fork.match) return false;
		try {
			const re = new RegExp(fork.match, "i");
			if (ctx.docs?.some((d) => re.test(`${d.kind} ${d.name}`))) return true;
			if (!ctx.live) return re.test(hay);
			return false;
		} catch {
			return false;
		}
	}
	if (trigger === "silence") {
		if (!ctx.live) return false;
		return (ctx.silence ?? 0) >= (fork.afterMin ?? 5);
	}
	if (trigger === "repeats") {
		if (!ctx.live) return false;
		return (ctx.consecutive ?? 0) >= (fork.repeats ?? 2);
	}
	return false;
}
function matchForks(input) {
	const s = g.__RELAY;
	const forks = s?.forks ?? FORKS;
	const chat = input.chatId && s ? s.chats.find((c) => c.id === input.chatId) : void 0;
	const live = Boolean(chat && s);
	const docs = live ? s.documents.filter((d) => d.chatId === chat.id) : void 0;
	const consecutive = live ? consecutiveUserCount(s, chat.id) : void 0;
	const silence = live ? silenceMin(s, chat.id, Date.now()) : void 0;
	const hits = [];
	for (const fork of forks) if (forkMatches(fork, {
		text: input.text,
		kindId: input.kindId,
		docs,
		consecutive,
		silence,
		live
	})) hits.push(fork);
	return hits;
}
function matchRule(input) {
	const hay = `${input.text} ${input.title ?? ""} ${input.channel}`.toLowerCase();
	const hay2 = /vip/i.test(`${input.title ?? ""} ${input.text}`) && !hay.includes("vip") ? `${hay} vip` : hay;
	const rules = g.__RELAY?.rules ?? RULES;
	for (const rule of rules) {
		if (!rule.enabled) continue;
		if (rule.channel && rule.channel !== input.channel) continue;
		if (rule.match === "*") return rule;
		try {
			if (new RegExp(rule.match, "i").test(hay2)) return rule;
		} catch {}
	}
	return RULES[RULES.length - 1];
}
function recountLoad(s) {
	for (const a of s.agents) a.load = s.tickets.filter((t) => t.assigneeId === a.id && t.status !== "resolved").length;
}
function queueName(id) {
	if (!id) return "";
	return QUEUES.find((q) => q.id === id)?.name ?? id;
}
function pushRoute(s, ev) {
	if (!s.routeLog) s.routeLog = [];
	s.routeLog.unshift({
		...ev,
		id: uid("rt"),
		text: ev.text.slice(0, 160)
	});
	if (s.routeLog.length > 80) s.routeLog.length = 80;
}
function applyRuleToTicket(s, ticket, rule, nowIso) {
	const queueChanged = ticket.queueId !== rule.queueId;
	ticket.queueId = rule.queueId;
	ticket.priority = rule.priority ?? ticket.priority;
	if (queueChanged) ticket.slaDueAt = slaDue(rule.queueId, nowIso);
	ticket.reason = `Правило «${rule.name}»`;
	if (rule.agentId) {
		ticket.assigneeId = rule.agentId;
		ticket.status = "assigned";
	} else {
		ticket.assigneeId = null;
		ticket.status = "open";
	}
}
function logTicketRoute(s, opts) {
	const chat = opts.chat ?? s.chats.find((c) => c.id === opts.ticket.chatId);
	pushRoute(s, {
		at: opts.at ?? (/* @__PURE__ */ new Date()).toISOString(),
		source: opts.source,
		chatId: opts.ticket.chatId,
		chatTitle: chat?.title,
		ticketId: opts.ticket.id,
		channel: chat?.channel ?? "telegram",
		text: opts.text,
		fromQueue: opts.fromQueue,
		toQueue: opts.skipped ? opts.ticket.queueId : opts.ticket.queueId,
		priority: opts.ticket.priority,
		ruleId: opts.rule.id,
		ruleName: opts.rule.name,
		agentId: opts.ticket.assigneeId ?? void 0,
		skipped: opts.skipped,
		skipReason: opts.skipReason
	});
}
function applyRouter(opts) {
	return applyRouterTo(state(), opts);
}
function applyRouterTo(s, opts) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	let moved = 0;
	for (const ticket of s.tickets) {
		if (ticket.status === "resolved") continue;
		const chat = s.chats.find((c) => c.id === ticket.chatId);
		if (!chat) continue;
		const agent = ticket.assigneeId ? s.agents.find((a) => a.id === ticket.assigneeId) : null;
		const text = [...s.messages].reverse().find((m) => m.chatId === chat.id && m.author === "user")?.text ?? chat.preview;
		const rule = matchRule({
			text,
			channel: chat.channel,
			title: chat.title
		});
		if (!opts?.includeAssigned && agent?.kind === "human") {
			logTicketRoute(s, {
				source: "apply",
				ticket,
				chat,
				rule,
				text,
				fromQueue: ticket.queueId,
				skipped: true,
				skipReason: "оператор держит тикет",
				at: now
			});
			continue;
		}
		const fromQueue = ticket.queueId;
		const before = `${ticket.queueId}:${ticket.priority}:${ticket.assigneeId ?? ""}`;
		applyRuleToTicket(s, ticket, rule, now);
		if (before !== `${ticket.queueId}:${ticket.priority}:${ticket.assigneeId ?? ""}`) moved += 1;
		logTicketRoute(s, {
			source: "apply",
			ticket,
			chat,
			rule,
			text,
			fromQueue,
			at: now
		});
	}
	recountLoad(s);
	return {
		moved,
		open: s.tickets.filter((t) => t.status !== "resolved").length
	};
}
function threadOf(s, chatId) {
	return s.messages.filter((m) => m.chatId === chatId && m.author !== "system");
}
function lastUserText(s, chat) {
	return [...s.messages].reverse().find((m) => m.chatId === chat.id && m.author === "user")?.text ?? chat.preview;
}
function consecutiveUserCount(s, chatId) {
	const thread = threadOf(s, chatId);
	let n = 0;
	for (let i = thread.length - 1; i >= 0; i -= 1) if (thread[i].author === "user") n += 1;
	else break;
	return n;
}
function silenceMin(s, chatId, now) {
	const thread = threadOf(s, chatId);
	const last = thread[thread.length - 1];
	if (!last || last.author !== "user") return 0;
	return (now - new Date(last.at).getTime()) / 6e4;
}
function policyMatches(s, ticket, chat, policy, now) {
	if (policy.fromQueues?.length && !policy.fromQueues.includes(ticket.queueId)) return false;
	const hay = `${lastUserText(s, chat)} ${chat.title}`.toLowerCase();
	if (policy.trigger === "keyword") {
		if (!policy.match) return false;
		try {
			return new RegExp(policy.match, "i").test(hay);
		} catch {
			return false;
		}
	}
	if (policy.trigger === "sla") return new Date(ticket.slaDueAt).getTime() <= now;
	if (policy.trigger === "silence") return silenceMin(s, chat.id, now) >= (policy.afterMin ?? 5);
	if (policy.trigger === "repeats") return consecutiveUserCount(s, chat.id) >= (policy.repeats ?? 3);
	return false;
}
function fireEscalation(s, ticket, policy, text, nowIso) {
	const chat = s.chats.find((c) => c.id === ticket.chatId);
	const fromQueue = ticket.queueId;
	const already = ticket.queueId === policy.queueId;
	if (ticket.escalatedBy === policy.id && already) return false;
	ticket.queueId = policy.queueId;
	ticket.priority = policy.priority;
	ticket.assigneeId = policy.agentId ?? ticket.assigneeId;
	ticket.status = ticket.assigneeId ? "assigned" : "open";
	ticket.reason = `Эскалация «${policy.name}»`;
	ticket.escalatedBy = policy.id;
	if (!already) ticket.slaDueAt = slaDue(policy.queueId, nowIso);
	logTicketRoute(s, {
		source: "escalate",
		ticket,
		chat,
		rule: {
			id: policy.id,
			name: policy.name
		},
		text,
		fromQueue,
		at: nowIso
	});
	if (chat && !already) {
		const agent = ticket.assigneeId ? s.agents.find((a) => a.id === ticket.assigneeId) : void 0;
		s.messages.push({
			id: uid("m"),
			chatId: chat.id,
			author: "system",
			text: agent ? `Эскалация: ${policy.name}. Назначено — ${agent.name}.` : `Эскалация: ${policy.name}.`,
			at: nowIso
		});
	}
	return true;
}
function applyEscalationsTo(s) {
	const nowMs = Date.now();
	const nowIso = new Date(nowMs).toISOString();
	let moved = 0;
	const policies = s.escalations ?? ESCALATIONS;
	for (const ticket of s.tickets) {
		if (ticket.status === "resolved") continue;
		const chat = s.chats.find((c) => c.id === ticket.chatId);
		if (!chat) continue;
		for (const policy of policies) {
			if (!policy.enabled) continue;
			if (!policyMatches(s, ticket, chat, policy, nowMs)) continue;
			if (fireEscalation(s, ticket, policy, lastUserText(s, chat), nowIso)) moved += 1;
			break;
		}
	}
	recountLoad(s);
	return {
		moved,
		open: s.tickets.filter((t) => t.status !== "resolved").length
	};
}
function applyEscalations() {
	return applyEscalationsTo(state());
}
function escalateTicket(opts) {
	const s = state();
	const ticket = opts.ticketId ? s.tickets.find((t) => t.id === opts.ticketId) : s.tickets.find((t) => t.chatId === opts.chatId);
	if (!ticket) throw new Error("Тикет не найден");
	const chat = s.chats.find((c) => c.id === ticket.chatId);
	fireEscalation(s, ticket, {
		id: "manual",
		name: "Вручную",
		enabled: true,
		trigger: "keyword",
		queueId: "escalation",
		priority: ticket.priority === "p0" ? "p0" : "p1",
		agentId: "sofia"
	}, chat?.preview ?? "", (/* @__PURE__ */ new Date()).toISOString());
	recountLoad(s);
	return ticket;
}
function toggleEscalation(id) {
	const policy = state().escalations.find((p) => p.id === id);
	if (!policy) throw new Error("Правило эскалации не найдено");
	policy.enabled = !policy.enabled;
	return policy;
}
function deleteEscalation(id) {
	const s = state();
	if (!s.escalations.some((p) => p.id === id)) throw new Error("Правило эскалации не найдено");
	s.escalations = s.escalations.filter((p) => p.id !== id);
	return {
		ok: true,
		id
	};
}
function upsertEscalation(input) {
	const s = state();
	if (!input.name.trim()) throw new Error("Нужно имя");
	const fromQueues = input.fromQueues?.filter(Boolean);
	const agentId = input.agentId || void 0;
	if (input.id) {
		const policy = s.escalations.find((p) => p.id === input.id);
		if (!policy) throw new Error("Правило эскалации не найдено");
		policy.name = input.name.trim();
		policy.trigger = input.trigger;
		policy.match = input.match?.trim() || void 0;
		policy.afterMin = input.afterMin;
		policy.repeats = input.repeats;
		policy.fromQueues = fromQueues?.length ? fromQueues : void 0;
		policy.queueId = input.queueId || "escalation";
		policy.priority = input.priority ?? policy.priority;
		policy.agentId = agentId;
		if (input.enabled !== void 0) policy.enabled = input.enabled;
		return policy;
	}
	const policy = {
		id: uid("e"),
		name: input.name.trim(),
		enabled: input.enabled ?? true,
		trigger: input.trigger,
		match: input.match?.trim() || void 0,
		afterMin: input.afterMin,
		repeats: input.repeats,
		fromQueues: fromQueues?.length ? fromQueues : void 0,
		queueId: input.queueId || "escalation",
		priority: input.priority ?? "p1",
		agentId
	};
	s.escalations.push(policy);
	return policy;
}
function knowledgeForKind(s, kindId) {
	return s.knowledge.filter((a) => !a.kindIds.length || (kindId ? a.kindIds.includes(kindId) : false));
}
function aiContextForChat(chatId) {
	const s = state();
	const chat = s.chats.find((c) => c.id === chatId);
	if (!chat) throw new Error("Диалог не найден");
	const last = [...s.messages].reverse().find((m) => m.chatId === chatId && m.author === "user");
	const kind = s.kinds.find((k) => k.id === chat.kindId) ?? matchKind({
		text: last?.text ?? chat.preview,
		title: chat.title
	});
	const articles = knowledgeForKind(s, kind.id);
	const knowledge = articles.map((a) => `${a.title}: ${a.body}`).join("\n");
	return {
		kind,
		articles,
		prompt: kind.prompt,
		knowledge
	};
}
function fireFork(s, chat, fork, nowIso) {
	if (chat.forkHits?.some((h) => h.forkId === fork.id)) return false;
	chat.forkHits = [{
		id: uid("fh"),
		forkId: fork.id,
		at: nowIso,
		name: fork.name,
		action: fork.action,
		target: fork.target,
		label: fork.label,
		trigger: fork.trigger ?? "keyword"
	}, ...chat.forkHits ?? []].slice(0, 8);
	const agent = fork.action === "manager" ? s.agents.find((a) => a.id === fork.target) : void 0;
	const queue = fork.action === "queue" ? QUEUES.find((q) => q.id === fork.target) : void 0;
	let text = fork.label;
	if (fork.action === "site" || fork.action === "url") text = `${fork.label}: ${fork.target}`;
	else if (fork.action === "crm") text = `${fork.label}. Карточка ${fork.target} открыта в CRM.`;
	else if (fork.action === "manager") text = `${fork.label} — ${agent?.name ?? fork.target} уже в диалоге.`;
	else if (fork.action === "queue") text = `${fork.label} → очередь «${queue?.name ?? fork.target}».`;
	s.messages.push({
		id: uid("m"),
		chatId: chat.id,
		author: "bot",
		agentName: "Relay Bot",
		text,
		at: nowIso
	});
	const ticket = s.tickets.find((t) => t.id === chat.ticketId);
	if (fork.action === "manager" && ticket && agent) {
		ticket.assigneeId = agent.id;
		ticket.status = "assigned";
		ticket.reason = `Развилка «${fork.name}»`;
	}
	if (fork.action === "queue" && ticket) {
		ticket.queueId = fork.target;
		ticket.slaDueAt = slaDue(fork.target, nowIso);
		ticket.reason = `Развилка «${fork.name}»`;
	}
	if (fork.action === "crm" && ticket) ticket.reason = `CRM ${fork.target}`;
	return true;
}
function applyPlaybooksTo(s, chat, text, title) {
	const kind = matchKind({
		text,
		title: title ?? chat.title
	});
	chat.kindId = kind.id;
	if (!chat.forkHits) chat.forkHits = [];
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	for (const fork of matchForks({
		text,
		kindId: kind.id,
		chatId: chat.id
	})) fireFork(s, chat, fork, nowIso);
}
function applyForksTo(s) {
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	for (const chat of s.chats) {
		if (s.tickets.find((t) => t.id === chat.ticketId)?.status === "resolved") continue;
		const text = lastUserText(s, chat);
		const kind = s.kinds.find((k) => k.id === chat.kindId) ?? matchKind({
			text,
			title: chat.title
		});
		chat.kindId = kind.id;
		if (!chat.forkHits) chat.forkHits = [];
		for (const fork of matchForks({
			text,
			kindId: kind.id,
			chatId: chat.id
		})) fireFork(s, chat, fork, nowIso);
	}
	recountLoad(s);
}
function applyPlaybooksAll(s) {
	for (const chat of s.chats) applyPlaybooksTo(s, chat, [...s.messages].reverse().find((m) => m.chatId === chat.id && m.author === "user")?.text ?? chat.preview, chat.title);
	recountLoad(s);
}
function upsertKind(input) {
	const s = state();
	if (!input.name.trim() || !input.match.trim() || !input.prompt.trim()) throw new Error("Нужны имя, условие и промпт");
	if (input.id) {
		const kind = s.kinds.find((k) => k.id === input.id);
		if (!kind) throw new Error("Тип беседы не найден");
		if (kind.match === "*" && input.match !== "*") throw new Error("Дефолтный тип нельзя заменить");
		kind.name = input.name.trim();
		if (kind.match !== "*") kind.match = input.match.trim();
		kind.queueId = input.queueId || kind.queueId;
		kind.prompt = input.prompt.trim();
		kind.description = (input.description ?? kind.description).trim();
		return kind;
	}
	const kind = {
		id: uid("k"),
		name: input.name.trim(),
		match: input.match.trim(),
		queueId: input.queueId || "support",
		prompt: input.prompt.trim(),
		description: (input.description ?? "").trim()
	};
	const fallback = s.kinds.findIndex((k) => k.match === "*");
	if (fallback >= 0) s.kinds.splice(fallback, 0, kind);
	else s.kinds.push(kind);
	return kind;
}
function deleteKind(id) {
	const s = state();
	const kind = s.kinds.find((k) => k.id === id);
	if (!kind) throw new Error("Тип беседы не найден");
	if (kind.match === "*") throw new Error("Дефолтный тип нельзя удалить");
	s.kinds = s.kinds.filter((k) => k.id !== id);
	for (const art of s.knowledge) art.kindIds = art.kindIds.filter((k) => k !== id);
	for (const fork of s.forks) if (fork.kindId === id) fork.kindId = void 0;
	return {
		ok: true,
		id
	};
}
function setChatKind(chatId, kindId) {
	const s = state();
	const chat = s.chats.find((c) => c.id === chatId);
	const kind = s.kinds.find((k) => k.id === kindId);
	if (!chat || !kind) throw new Error("Диалог или тип не найден");
	chat.kindId = kind.id;
	return chat;
}
function upsertKnowledge(input) {
	const s = state();
	if (!input.title.trim() || !input.body.trim()) throw new Error("Нужны заголовок и текст");
	const kindIds = (input.kindIds ?? []).filter(Boolean);
	if (input.id) {
		const art = s.knowledge.find((a) => a.id === input.id);
		if (!art) throw new Error("Статья не найдена");
		art.title = input.title.trim();
		art.body = input.body.trim();
		art.kindIds = kindIds;
		return art;
	}
	const art = {
		id: uid("kb"),
		title: input.title.trim(),
		body: input.body.trim(),
		kindIds
	};
	s.knowledge.unshift(art);
	return art;
}
function deleteKnowledge(id) {
	const s = state();
	if (!s.knowledge.some((a) => a.id === id)) throw new Error("Статья не найдена");
	s.knowledge = s.knowledge.filter((a) => a.id !== id);
	return {
		ok: true,
		id
	};
}
function upsertFork(input) {
	const s = state();
	if (!input.name.trim() || !input.target.trim() || !input.label.trim()) throw new Error("Нужны имя, назначение и подпись");
	const trigger = input.trigger ?? "keyword";
	const match = (input.match ?? "").trim();
	if ((trigger === "keyword" || trigger === "document") && !match && !input.id) throw new Error("Для этого триггера нужно условие");
	const kindId = input.kindId || void 0;
	const afterMin = trigger === "silence" ? input.afterMin ?? 5 : void 0;
	const repeats = trigger === "repeats" ? input.repeats ?? 2 : void 0;
	if (input.id) {
		const fork = s.forks.find((f) => f.id === input.id);
		if (!fork) throw new Error("Развилка не найдена");
		fork.name = input.name.trim();
		fork.trigger = trigger;
		fork.match = match;
		fork.afterMin = afterMin;
		fork.repeats = repeats;
		fork.action = input.action;
		fork.target = input.target.trim();
		fork.label = input.label.trim();
		fork.kindId = kindId;
		if (input.enabled !== void 0) fork.enabled = input.enabled;
		return fork;
	}
	const fork = {
		id: uid("f"),
		name: input.name.trim(),
		enabled: input.enabled ?? true,
		kindId,
		trigger,
		match,
		afterMin,
		repeats,
		action: input.action,
		target: input.target.trim(),
		label: input.label.trim()
	};
	s.forks.push(fork);
	return fork;
}
function deleteFork(id) {
	const s = state();
	if (!s.forks.some((f) => f.id === id)) throw new Error("Развилка не найдена");
	s.forks = s.forks.filter((f) => f.id !== id);
	return {
		ok: true,
		id
	};
}
function toggleFork(id) {
	const fork = state().forks.find((f) => f.id === id);
	if (!fork) throw new Error("Развилка не найдена");
	fork.enabled = !fork.enabled;
	return fork;
}
function testFork(input) {
	const kind = input.kindId ? state().kinds.find((k) => k.id === input.kindId) : matchKind({ text: input.text });
	const forks = matchForks({
		text: input.text,
		kindId: kind?.id
	});
	const compact = (fork) => ({
		id: fork.id,
		name: fork.name,
		trigger: fork.trigger ?? "keyword",
		action: fork.action,
		target: fork.target,
		label: fork.label
	});
	return {
		kindId: kind?.id ?? null,
		kind: kind?.name ?? null,
		fork: forks[0] ? compact(forks[0]) : null,
		forks: forks.map(compact)
	};
}
function seed() {
	const chats = [
		{
			id: "c1",
			channel: "telegram",
			title: "Анна Козлова",
			peerId: "104221",
			preview: "Не пришёл трекинг по NL-4821",
			lastAt: ago(4),
			unread: 2,
			ticketId: "t1",
			muted: false,
			kindId: "k-track",
			forkHits: []
		},
		{
			id: "c2",
			channel: "whatsapp",
			title: "Игорь Семёнов",
			peerId: "79031234567",
			preview: "Счёт на 40 паллет до Казани?",
			lastAt: ago(12),
			unread: 1,
			ticketId: "t2",
			muted: false,
			kindId: "k-sales",
			forkHits: []
		},
		{
			id: "c3",
			channel: "max",
			title: "Пилот Минцифры",
			peerId: "max:90011",
			preview: "Нужна очередь в ЕСИА",
			lastAt: ago(18),
			unread: 0,
			ticketId: "t3",
			muted: false,
			kindId: "k-gov",
			forkHits: []
		},
		{
			id: "c4",
			channel: "telegram",
			title: "ООО «Берёзка»",
			peerId: "88210",
			preview: "Договор поставки во вложении",
			lastAt: ago(37),
			unread: 0,
			ticketId: "t4",
			muted: false,
			kindId: "k-docs",
			forkHits: []
		},
		{
			id: "c5",
			channel: "whatsapp",
			title: "Марина К.",
			peerId: "79015550011",
			preview: "Курьер грубил, хочу возврат",
			lastAt: ago(51),
			unread: 1,
			ticketId: "t5",
			muted: false,
			kindId: "k-complaint",
			forkHits: []
		},
		{
			id: "c6",
			channel: "telegram",
			title: "Алексей Морозов · VIP",
			peerId: "10001",
			preview: "Самолёт через 2 часа — где груз?",
			lastAt: ago(2),
			unread: 3,
			ticketId: "t6",
			muted: false,
			kindId: "k-vip",
			forkHits: []
		},
		{
			id: "c7",
			channel: "max",
			title: "Кандидат · HR",
			peerId: "max:4412",
			preview: "Резюме логиста, Пермь",
			lastAt: ago(80),
			unread: 0,
			ticketId: "t7",
			muted: false,
			kindId: "k-hr",
			forkHits: []
		},
		{
			id: "c8",
			channel: "vk",
			title: "Склад-3",
			peerId: "vk:group",
			preview: "Смена закрыта, акт во вложении",
			lastAt: ago(110),
			unread: 0,
			ticketId: "t8",
			muted: false,
			kindId: "k-docs",
			forkHits: []
		}
	];
	const messages = [
		{
			id: "m1a",
			chatId: "c1",
			author: "user",
			text: "Добрый день! Заказ NL-4821 уехал вчера, трекинг так и не пришёл.",
			at: ago(28)
		},
		{
			id: "m1b",
			chatId: "c1",
			author: "bot",
			agentName: "Relay Bot",
			text: "Диалог поставлен в очередь «Поддержка». SLA 15 мин.",
			at: ago(27)
		},
		{
			id: "m1c",
			chatId: "c1",
			author: "user",
			text: "Не пришёл трекинг по NL-4821. Клиент уже спрашивает.",
			at: ago(4)
		},
		{
			id: "m2a",
			chatId: "c2",
			author: "user",
			text: "Можно счёт на 40 паллет до Казани, отгрузка в четверг?",
			at: ago(14)
		},
		{
			id: "m2b",
			chatId: "c2",
			author: "user",
			text: "Счёт на 40 паллет до Казани?",
			at: ago(12)
		},
		{
			id: "m3a",
			chatId: "c3",
			author: "user",
			text: "Готовим пилот MAX для ведомства. Нужна очередь обращений с ЕСИА и журнал MCP.",
			at: ago(40)
		},
		{
			id: "m3b",
			chatId: "c3",
			author: "agent",
			agentName: "София Левина",
			text: "Можем отдать MCP-эндпоинт и вебхук MAX. Пришлите контур (тест/прод) и объём.",
			at: ago(22)
		},
		{
			id: "m3c",
			chatId: "c3",
			author: "user",
			text: "Нужна очередь в ЕСИА. Контур — тест, до 2 тыс. диалогов.",
			at: ago(18)
		},
		{
			id: "m4a",
			chatId: "c4",
			author: "user",
			text: "Направляем договор поставки на согласование.",
			at: ago(40),
			attachments: [{
				id: "a4",
				name: "dogovor_postavki.pdf",
				kind: "contract",
				sizeKb: 420,
				documentId: "d1"
			}]
		},
		{
			id: "m4b",
			chatId: "c4",
			author: "bot",
			agentName: "Relay Bot",
			text: "Файл классифицирован как договор → очередь «Документы».",
			at: ago(39)
		},
		{
			id: "m5a",
			chatId: "c5",
			author: "user",
			text: "Вчера курьер грубил на выгрузке. Хочу возврат и разбор.",
			at: ago(51)
		},
		{
			id: "m6a",
			chatId: "c6",
			author: "user",
			text: "Груз NL-9901 на Шереметьево. Самолёт через 2 часа. Где машина?",
			at: ago(8)
		},
		{
			id: "m6b",
			chatId: "c6",
			author: "user",
			text: "Самолёт через 2 часа — где груз? Это VIP, не оставляйте без ответа.",
			at: ago(2)
		},
		{
			id: "m7a",
			chatId: "c7",
			author: "user",
			text: "Добрый день, откликаюсь на логиста. Резюме во вложении.",
			at: ago(82),
			attachments: [{
				id: "a7",
				name: "resume_logist.pdf",
				kind: "resume",
				sizeKb: 188,
				documentId: "d2"
			}]
		},
		{
			id: "m8a",
			chatId: "c8",
			author: "user",
			text: "Смена закрыта. Акт КС-2 прикладываю.",
			at: ago(110),
			attachments: [{
				id: "a8",
				name: "KS-2_sklad3.pdf",
				kind: "act",
				sizeKb: 256,
				documentId: "d3"
			}]
		}
	];
	const tickets = [
		{
			id: "t1",
			chatId: "c1",
			queueId: "support",
			priority: "p1",
			status: "open",
			assigneeId: null,
			openedAt: ago(28),
			slaDueAt: ago(2),
			reason: "Правило «По умолчанию — поддержка»"
		},
		{
			id: "t2",
			chatId: "c2",
			queueId: "sales",
			priority: "p2",
			status: "open",
			assigneeId: "dmitry",
			openedAt: ago(14),
			slaDueAt: slaDue("sales", ago(12)),
			reason: "Правило «Запрос цены / паллет»"
		},
		{
			id: "t3",
			chatId: "c3",
			queueId: "support",
			priority: "p1",
			status: "assigned",
			assigneeId: "sofia",
			openedAt: ago(40),
			slaDueAt: slaDue("support", ago(2)),
			reason: "Пилот MAX / ЕСИА"
		},
		{
			id: "t4",
			chatId: "c4",
			queueId: "docs",
			priority: "p2",
			status: "pending",
			assigneeId: "relay-bot",
			openedAt: ago(40),
			slaDueAt: slaDue("docs", ago(37)),
			reason: "Правило «Счёт, акт, договор»"
		},
		{
			id: "t5",
			chatId: "c5",
			queueId: "escalation",
			priority: "p1",
			status: "assigned",
			assigneeId: "sofia",
			openedAt: ago(51),
			slaDueAt: slaDue("escalation", ago(4)),
			reason: "Эскалация «Жалоба поверх оператора»",
			escalatedBy: "e2"
		},
		{
			id: "t6",
			chatId: "c6",
			queueId: "vip",
			priority: "p0",
			status: "open",
			assigneeId: null,
			openedAt: ago(8),
			slaDueAt: slaDue("vip", ago(2)),
			reason: "Правило «VIP-клиент или «срочно»»"
		},
		{
			id: "t7",
			chatId: "c7",
			queueId: "docs",
			priority: "p3",
			status: "pending",
			assigneeId: "relay-bot",
			openedAt: ago(82),
			slaDueAt: slaDue("docs", ago(80)),
			reason: "Правило «Резюме / HR»"
		},
		{
			id: "t8",
			chatId: "c8",
			queueId: "docs",
			priority: "p2",
			status: "pending",
			assigneeId: "relay-bot",
			openedAt: ago(110),
			slaDueAt: slaDue("docs", ago(110)),
			reason: "Правило «Счёт, акт, договор»"
		}
	];
	const documents = [
		{
			id: "d1",
			chatId: "c4",
			name: "dogovor_postavki.pdf",
			kind: "contract",
			status: "classified",
			sizeKb: 420,
			at: ago(40),
			fields: extractFields("contract", "dogovor_postavki.pdf"),
			summary: "Договор поставки на 12 месяцев, Казань. Нужна виза юриста."
		},
		{
			id: "d2",
			chatId: "c7",
			name: "resume_logist.pdf",
			kind: "resume",
			status: "routed",
			sizeKb: 188,
			at: ago(82),
			fields: extractFields("resume", "resume_logist.pdf"),
			summary: "Кандидат на логиста, Пермь, опыт 5 лет."
		},
		{
			id: "d3",
			chatId: "c8",
			name: "KS-2_sklad3.pdf",
			kind: "act",
			status: "inbox",
			sizeKb: 256,
			at: ago(110),
			fields: extractFields("act", "KS-2_sklad3.pdf"),
			summary: "Акт КС-2 по складу-3. Ждёт проводки."
		},
		{
			id: "d4",
			chatId: "c2",
			name: "stavka_kazan.xlsx",
			kind: "invoice",
			status: "inbox",
			sizeKb: 64,
			at: ago(12),
			fields: extractFields("invoice", "stavka_kazan.xlsx"),
			summary: "Черновик ставки на 40 паллет, Казань."
		}
	];
	const channels = [
		{
			id: "telegram",
			name: "Telegram",
			connected: true,
			demo: true,
			account: "@nordline_bot",
			tokenSet: false,
			extraSet: false,
			lastEventAt: ago(2),
			inbound: 18,
			outbound: 11,
			latencyMs: 42
		},
		{
			id: "whatsapp",
			name: "WhatsApp",
			connected: true,
			demo: true,
			account: "+7 495 000-12-12",
			tokenSet: false,
			extraSet: false,
			lastEventAt: ago(12),
			inbound: 9,
			outbound: 6,
			latencyMs: 88
		},
		{
			id: "max",
			name: "MAX",
			connected: true,
			demo: true,
			account: "Нордлайн MAX",
			tokenSet: false,
			extraSet: false,
			lastEventAt: ago(18),
			inbound: 7,
			outbound: 4,
			latencyMs: 55
		},
		{
			id: "vk",
			name: "VK",
			connected: true,
			demo: true,
			account: "club nordline",
			tokenSet: false,
			extraSet: false,
			lastEventAt: ago(110),
			inbound: 3,
			outbound: 1,
			latencyMs: 70
		}
	];
	return {
		rev: ENGINE_REV,
		startedAt: Date.now(),
		channels,
		chats,
		messages,
		tickets,
		documents,
		rules: RULES.map((r) => ({ ...r })),
		escalations: ESCALATIONS.map((p) => ({
			...p,
			fromQueues: p.fromQueues ? [...p.fromQueues] : void 0
		})),
		kinds: TALK_KINDS.map((k) => ({ ...k })),
		knowledge: KNOWLEDGE.map((a) => ({
			...a,
			kindIds: [...a.kindIds]
		})),
		forks: FORKS.map((f) => ({ ...f })),
		agents: AGENTS.map((a) => ({ ...a })),
		mcpLog: [{
			id: "mcp1",
			at: ago(3),
			method: "tools/call",
			tool: "list_chats",
			ok: true,
			ms: 11
		}, {
			id: "mcp2",
			at: ago(9),
			method: "tools/list",
			ok: true,
			ms: 4
		}],
		routeLog: [],
		secrets: {
			telegram: {},
			whatsapp: {},
			max: {},
			vk: {}
		},
		injectIndex: 0,
		lastInjectAt: Date.now() - 4e3,
		lastPullAt: 0,
		mcpCalls: 14,
		mcpLastMs: 11
	};
}
function state() {
	if (!g.__RELAY || g.__RELAY.rev !== ENGINE_REV) {
		const secrets = g.__RELAY?.secrets;
		const next = seed();
		if (secrets) next.secrets = secrets;
		g.__RELAY = next;
		applyRouterTo(next, { includeAssigned: true });
		applyEscalationsTo(next);
		applyPlaybooksAll(next);
		applyForksTo(next);
	}
	const s = g.__RELAY;
	if (!s.kinds?.length) {
		s.kinds = TALK_KINDS.map((k) => ({ ...k }));
		s.knowledge = KNOWLEDGE.map((a) => ({
			...a,
			kindIds: [...a.kindIds]
		}));
		s.forks = FORKS.map((f) => ({ ...f }));
		applyPlaybooksAll(s);
	}
	for (const f of s.forks ?? []) if (!f.trigger) f.trigger = "keyword";
	if (!s.knowledge) s.knowledge = [];
	if (!s.forks) s.forks = [];
	return s;
}
var INJECT = [
	{
		channel: "max",
		title: "Ольга · бухгалтерия",
		peerId: "max:2201",
		text: "Подтвердите получение акта КС-2 по складу-3."
	},
	{
		channel: "telegram",
		title: "Анна Козлова",
		peerId: "104221",
		text: "Клиент на линии. Есть трекинг?"
	},
	{
		channel: "whatsapp",
		title: "Игорь Семёнов",
		peerId: "79031234567",
		text: "Если ставка до 18:00 — берём слот на четверг."
	},
	{
		channel: "telegram",
		title: "Алексей Морозов · VIP",
		peerId: "10001",
		text: "Машина всё ещё не на рампе. Это уже минуты."
	},
	{
		channel: "vk",
		title: "Склад-3",
		peerId: "vk:group",
		text: "Ворота 4 свободны, можно принимать."
	},
	{
		channel: "max",
		title: "Пилот Минцифры",
		peerId: "max:90011",
		text: "Пришлите MCP URL и список tools — кладём в контур."
	}
];
function bumpChannel(id, dir) {
	const ch = state().channels.find((c) => c.id === id);
	if (!ch) return;
	if (dir === "in") ch.inbound += 1;
	else ch.outbound += 1;
	ch.lastEventAt = (/* @__PURE__ */ new Date()).toISOString();
}
function upsertChat(partial) {
	const s = state();
	let chat = s.chats.find((c) => c.channel === partial.channel && c.peerId === partial.peerId);
	if (!chat) {
		const id = uid("c");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const rule = matchRule({
			text: partial.text,
			channel: partial.channel,
			title: partial.title
		});
		const ticket = {
			id: uid("t"),
			chatId: id,
			queueId: rule.queueId,
			priority: rule.priority ?? "p2",
			status: rule.agentId ? "assigned" : "open",
			assigneeId: rule.agentId ?? null,
			openedAt: now,
			slaDueAt: slaDue(rule.queueId, now),
			reason: `Правило «${rule.name}»`
		};
		chat = {
			id,
			channel: partial.channel,
			title: partial.title,
			peerId: partial.peerId,
			preview: partial.text,
			lastAt: now,
			unread: 1,
			ticketId: ticket.id,
			muted: false
		};
		s.tickets.unshift(ticket);
		s.chats.unshift(chat);
		logTicketRoute(s, {
			source: "inbound",
			ticket,
			chat,
			rule,
			text: partial.text,
			at: now
		});
		applyPlaybooksTo(s, chat, partial.text, partial.title);
	}
	return chat;
}
function addIncoming(opts) {
	const s = state();
	const existed = s.chats.some((c) => c.channel === opts.channel && c.peerId === opts.peerId);
	const chat = upsertChat({
		id: "",
		channel: opts.channel,
		title: opts.title,
		peerId: opts.peerId,
		text: opts.text
	});
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const message = {
		id: uid("m"),
		chatId: chat.id,
		author: "user",
		text: opts.text,
		at: now,
		attachments: opts.attachments
	};
	s.messages.push(message);
	chat.preview = opts.text;
	chat.lastAt = now;
	chat.unread += 1;
	const ticket = s.tickets.find((t) => t.id === chat.ticketId);
	const rule = matchRule({
		text: opts.text,
		channel: opts.channel,
		title: opts.title || chat.title
	});
	if (ticket && existed) {
		if (ticket.status === "resolved") {
			ticket.status = "open";
			ticket.openedAt = now;
			ticket.assigneeId = null;
		}
		if ((ticket.assigneeId ? s.agents.find((a) => a.id === ticket.assigneeId) : null)?.kind === "human") logTicketRoute(s, {
			source: "inbound",
			ticket,
			chat,
			rule,
			text: opts.text,
			fromQueue: ticket.queueId,
			skipped: true,
			skipReason: "оператор держит тикет",
			at: now
		});
		else if (rule.match === "*") logTicketRoute(s, {
			source: "inbound",
			ticket,
			chat,
			rule,
			text: opts.text,
			fromQueue: ticket.queueId,
			skipped: true,
			skipReason: "дефолт не перетирает очередь",
			at: now
		});
		else {
			const fromQueue = ticket.queueId;
			applyRuleToTicket(s, ticket, rule, now);
			logTicketRoute(s, {
				source: "inbound",
				ticket,
				chat,
				rule,
				text: opts.text,
				fromQueue,
				at: now
			});
		}
		recountLoad(s);
	}
	if (opts.attachments) for (const a of opts.attachments) {
		if (s.documents.some((d) => d.id === a.documentId)) continue;
		const kind = a.kind;
		s.documents.unshift({
			id: a.documentId,
			chatId: chat.id,
			name: a.name,
			kind,
			status: "inbox",
			sizeKb: a.sizeKb,
			at: now,
			fields: extractFields(kind, a.name),
			summary: `${a.name} · ожидает разбора`
		});
	}
	bumpChannel(opts.channel, "in");
	applyPlaybooksTo(s, chat, opts.text, opts.title || chat.title);
	applyEscalationsTo(s);
	return {
		chat,
		message
	};
}
function maybeInject() {
	const s = state();
	const now = Date.now();
	if (now - s.lastInjectAt < 7e3) return;
	s.lastInjectAt = now;
	const item = INJECT[s.injectIndex % INJECT.length];
	s.injectIndex += 1;
	addIncoming(item);
}
async function maybePullLive() {
	const s = state();
	const now = Date.now();
	if (now - s.lastPullAt < 4e3) return;
	s.lastPullAt = now;
	const tg = s.secrets.telegram.token;
	if (tg) try {
		const { updates, nextOffset } = await telegramGetUpdates(tg, s.secrets.telegram.offset ?? 0);
		if (nextOffset) s.secrets.telegram.offset = nextOffset;
		for (const u of updates) {
			const text = u.text;
			if (!text) continue;
			addIncoming({
				channel: "telegram",
				title: u.title,
				peerId: u.peerId,
				text
			});
		}
	} catch {}
	const mx = s.secrets.max.token;
	if (mx) try {
		const { updates, marker } = await maxGetUpdates(mx, s.secrets.max.marker);
		if (marker) s.secrets.max.marker = marker;
		for (const u of updates) addIncoming({
			channel: "max",
			title: u.title,
			peerId: u.peerId,
			text: u.text
		});
	} catch {}
}
function stats(s) {
	const now = Date.now();
	return {
		open: s.tickets.filter((t) => t.status !== "resolved").length,
		waiting: s.tickets.filter((t) => t.status === "open" && !t.assigneeId).length,
		breached: s.tickets.filter((t) => t.status !== "resolved" && new Date(t.slaDueAt).getTime() < now).length,
		mcpCalls: s.mcpCalls,
		mcpLastMs: s.mcpLastMs,
		uptimeMs: now - s.startedAt,
		injected: s.injectIndex
	};
}
async function getRelaySnapshot() {
	maybeInject();
	await maybePullLive();
	applyEscalationsTo(state());
	applyForksTo(state());
	const s = state();
	return {
		now: (/* @__PURE__ */ new Date()).toISOString(),
		workspace: "Нордлайн · прод",
		channels: s.channels.map((c) => ({ ...c })),
		queues: QUEUES,
		agents: s.agents.map((a) => ({ ...a })),
		chats: [...s.chats].sort((a, b) => +new Date(b.lastAt) - +new Date(a.lastAt)).map((c) => ({
			...c,
			forkHits: c.forkHits ? c.forkHits.map((h) => ({ ...h })) : []
		})),
		messages: s.messages.map((m) => ({ ...m })),
		tickets: s.tickets.map((t) => ({ ...t })),
		documents: [...s.documents].sort((a, b) => +new Date(b.at) - +new Date(a.at)),
		rules: s.rules.map((r) => ({ ...r })),
		escalations: (s.escalations ?? []).map((p) => ({
			...p,
			fromQueues: p.fromQueues ? [...p.fromQueues] : void 0
		})),
		kinds: (s.kinds ?? []).map((k) => ({ ...k })),
		knowledge: (s.knowledge ?? []).map((a) => ({
			...a,
			kindIds: [...a.kindIds]
		})),
		forks: (s.forks ?? []).map((f) => ({ ...f })),
		mcpLog: [...s.mcpLog].slice(0, 24),
		routeLog: [...s.routeLog ?? []].slice(0, 50),
		stats: stats(s),
		templates: TEMPLATES
	};
}
async function sendChatMessage(chatId, text, as = "agent") {
	const s = state();
	const chat = s.chats.find((c) => c.id === chatId);
	if (!chat) throw new Error("Диалог не найден");
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const agentName = as === "ai" ? "Grok" : as === "bot" ? "Relay Bot" : "Оператор";
	const message = {
		id: uid("m"),
		chatId,
		author: as === "agent" ? "agent" : as === "ai" ? "bot" : "bot",
		agentName,
		text,
		at: now
	};
	s.messages.push(message);
	chat.preview = text;
	chat.lastAt = now;
	chat.unread = 0;
	bumpChannel(chat.channel, "out");
	const secret = s.secrets[chat.channel];
	if (secret.token && !s.channels.find((c) => c.id === chat.channel)?.demo) try {
		if (chat.channel === "telegram") await telegramSend(secret.token, chat.peerId, text);
		if (chat.channel === "max") await maxSend(secret.token, chat.peerId, text);
		if (chat.channel === "whatsapp") await whatsappSend(secret.token, secret.extra ?? "", chat.peerId, text);
	} catch (err) {
		s.messages.push({
			id: uid("m"),
			chatId,
			author: "system",
			text: `Канал не принял отправку: ${err instanceof Error ? err.message : "ошибка"}`,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return message;
}
function markRead(chatId) {
	const chat = state().chats.find((c) => c.id === chatId);
	if (chat) chat.unread = 0;
}
function assignTicket(ticketId, agentId) {
	const s = state();
	const ticket = s.tickets.find((t) => t.id === ticketId);
	const agent = s.agents.find((a) => a.id === agentId);
	if (!ticket || !agent) throw new Error("Тикет или агент не найден");
	ticket.assigneeId = agentId;
	ticket.status = "assigned";
	recountLoad(s);
	return ticket;
}
function routeTicket(opts) {
	const s = state();
	const ticket = opts.ticketId ? s.tickets.find((t) => t.id === opts.ticketId) : s.tickets.find((t) => t.chatId === opts.chatId);
	if (!ticket) throw new Error("Тикет не найден");
	const fromQueue = ticket.queueId;
	if (opts.queueId) {
		ticket.queueId = opts.queueId;
		ticket.slaDueAt = slaDue(opts.queueId, (/* @__PURE__ */ new Date()).toISOString());
		if (opts.queueId !== "escalation") ticket.escalatedBy = void 0;
	}
	if (opts.priority) ticket.priority = opts.priority;
	ticket.status = ticket.assigneeId ? "assigned" : "open";
	const q = QUEUES.find((x) => x.id === ticket.queueId);
	const rule = opts.rule ?? {
		id: "manual",
		name: "Вручную"
	};
	ticket.reason = opts.rule ? `Правило «${opts.rule.name}»` : `Перенаправлено в «${q?.name ?? ticket.queueId}»`;
	const chat = s.chats.find((c) => c.id === ticket.chatId);
	logTicketRoute(s, {
		source: opts.source ?? "manual",
		ticket,
		chat,
		rule,
		text: opts.text ?? chat?.preview ?? "",
		fromQueue
	});
	return ticket;
}
function processDocument(documentId, chatId) {
	const s = state();
	const docs = s.documents.filter((d) => documentId ? d.id === documentId : d.chatId === chatId);
	if (!docs.length) throw new Error("Документ не найден");
	const out = [];
	for (const doc of docs) {
		doc.kind = classify(doc.name, doc.summary);
		doc.fields = extractFields(doc.kind, doc.name);
		doc.status = "classified";
		doc.summary = `${doc.name} · ${doc.kind} · поля извлечены`;
		const chat = s.chats.find((c) => c.id === doc.chatId);
		if (chat) {
			const rule = matchRule({
				text: `${doc.name} ${doc.kind} ${doc.summary}`,
				channel: chat.channel,
				title: chat.title
			});
			routeTicket({
				chatId: chat.id,
				queueId: rule.queueId,
				priority: rule.priority,
				source: "document",
				rule,
				text: `${doc.name} · ${doc.kind}`
			});
			doc.status = "routed";
		}
		out.push(doc);
	}
	return out;
}
async function connectChannel(input) {
	const s = state();
	const ch = s.channels.find((c) => c.id === input.channelId);
	if (!ch) throw new Error("Канал не найден");
	const token = input.token.trim();
	if (!token) throw new Error("Нужен токен");
	let account = ch.account;
	if (input.channelId === "telegram") {
		const me = await telegramGetMe(token);
		account = me.username ? `@${me.username}` : me.first_name;
		s.secrets.telegram = {
			token,
			offset: 0
		};
	} else if (input.channelId === "max") {
		const me = await maxGetMe(token);
		account = me.name || me.username || "MAX bot";
		s.secrets.max = {
			token,
			marker: 0
		};
	} else if (input.channelId === "whatsapp") {
		if (!input.extra?.trim()) throw new Error("Нужен Phone Number ID");
		await whatsappVerify(token, input.extra.trim());
		account = input.extra.trim();
		s.secrets.whatsapp = {
			token,
			extra: input.extra.trim()
		};
	} else {
		s.secrets.vk = { token };
		account = "VK community";
	}
	ch.connected = true;
	ch.demo = false;
	ch.tokenSet = true;
	ch.extraSet = Boolean(input.extra);
	ch.account = account;
	ch.lastEventAt = (/* @__PURE__ */ new Date()).toISOString();
	ch.latencyMs = 30;
	return ch;
}
function disconnectChannel(channelId) {
	const s = state();
	const ch = s.channels.find((c) => c.id === channelId);
	if (!ch) throw new Error("Канал не найден");
	s.secrets[channelId] = {};
	ch.demo = true;
	ch.tokenSet = false;
	ch.extraSet = false;
	ch.account = CHANNEL_META[channelId].name + " · демо";
	ch.connected = true;
	return ch;
}
function toggleRule(ruleId) {
	const rule = state().rules.find((r) => r.id === ruleId);
	if (!rule) throw new Error("Правило не найдено");
	if (rule.match === "*") return rule;
	rule.enabled = !rule.enabled;
	return rule;
}
function testRoute(input) {
	const channel = input.channel ?? "telegram";
	const rule = matchRule({
		text: input.text,
		channel,
		title: input.title
	});
	const s = state();
	const queue = QUEUES.find((q) => q.id === rule.queueId);
	const agent = rule.agentId ? s.agents.find((a) => a.id === rule.agentId) : void 0;
	pushRoute(s, {
		at: (/* @__PURE__ */ new Date()).toISOString(),
		source: "probe",
		chatTitle: input.title,
		channel,
		text: input.text,
		toQueue: rule.queueId,
		priority: rule.priority ?? "p2",
		ruleId: rule.id,
		ruleName: rule.name,
		agentId: rule.agentId
	});
	return {
		queueId: rule.queueId,
		queue: queue?.name ?? rule.queueId,
		slaMin: queue?.slaMin ?? 15,
		priority: rule.priority ?? "p2",
		agentId: rule.agentId ?? null,
		agent: agent?.name ?? null,
		ruleId: rule.id,
		rule: rule.name,
		channel
	};
}
function upsertRule(input) {
	const s = state();
	if (!QUEUES.some((q) => q.id === input.queueId)) throw new Error("Нет такой очереди");
	if (!input.name.trim() || !input.match.trim()) throw new Error("Нужны имя и условие");
	const channel = input.channel || void 0;
	const agentId = input.agentId || void 0;
	if (input.id) {
		const rule = s.rules.find((r) => r.id === input.id);
		if (!rule) throw new Error("Правило не найдено");
		if (rule.match === "*" && input.match !== "*") throw new Error("Дефолтное правило нельзя заменить");
		rule.name = input.name.trim();
		if (rule.match !== "*") rule.match = input.match.trim();
		rule.queueId = input.queueId;
		rule.priority = input.priority ?? rule.priority;
		rule.channel = channel;
		rule.agentId = agentId;
		if (input.enabled !== void 0 && rule.match !== "*") rule.enabled = input.enabled;
		return rule;
	}
	const rule = {
		id: uid("r"),
		name: input.name.trim(),
		match: input.match.trim(),
		queueId: input.queueId,
		priority: input.priority ?? "p2",
		channel,
		agentId,
		enabled: input.enabled ?? true
	};
	const fallback = s.rules.findIndex((r) => r.match === "*");
	if (fallback >= 0) s.rules.splice(fallback, 0, rule);
	else s.rules.push(rule);
	return rule;
}
function deleteRule(ruleId) {
	const s = state();
	const rule = s.rules.find((r) => r.id === ruleId);
	if (!rule) throw new Error("Правило не найдено");
	if (rule.match === "*") throw new Error("Дефолтное правило нельзя удалить");
	s.rules = s.rules.filter((r) => r.id !== ruleId);
	return {
		ok: true,
		id: ruleId
	};
}
function moveRule(ruleId, dir) {
	const s = state();
	const i = s.rules.findIndex((r) => r.id === ruleId);
	if (i < 0) throw new Error("Правило не найдено");
	if (s.rules[i].match === "*") return s.rules[i];
	const j = dir === "up" ? i - 1 : i + 1;
	if (j < 0 || j >= s.rules.length) return s.rules[i];
	if (s.rules[j].match === "*") return s.rules[i];
	const swap = s.rules[i];
	s.rules[i] = s.rules[j];
	s.rules[j] = swap;
	return s.rules[j];
}
function recordMcp(method, tool, ok, ms) {
	const s = state();
	s.mcpCalls += 1;
	s.mcpLastMs = ms;
	s.mcpLog.unshift({
		id: uid("mcp"),
		at: (/* @__PURE__ */ new Date()).toISOString(),
		method,
		tool,
		ok,
		ms
	});
	s.mcpLog = s.mcpLog.slice(0, 40);
}
function searchInbox(query) {
	const s = state();
	const q = query.toLowerCase().trim();
	return {
		chats: s.chats.filter((c) => `${c.title} ${c.preview}`.toLowerCase().includes(q)),
		messages: s.messages.filter((m) => m.text.toLowerCase().includes(q)).slice(-40),
		documents: s.documents.filter((d) => `${d.name} ${d.summary}`.toLowerCase().includes(q))
	};
}
function getChatMessages(chatId, limit = 80) {
	return state().messages.filter((m) => m.chatId === chatId).slice(-limit);
}
function listRouteLog(limit = 40) {
	return (state().routeLog ?? []).slice(0, limit).map((e) => ({
		...e,
		from: queueName(e.fromQueue),
		to: queueName(e.toQueue)
	}));
}
function listQueuesView() {
	const s = state();
	return QUEUES.map((q) => ({
		...q,
		tickets: s.tickets.filter((t) => t.queueId === q.id && t.status !== "resolved")
	}));
}
//#endregion
export { addIncoming, aiContextForChat, applyEscalations, applyRouter, assignTicket, connectChannel, deleteEscalation, deleteFork, deleteKind, deleteKnowledge, deleteRule, disconnectChannel, escalateTicket, getChatMessages, getRelaySnapshot, listQueuesView, listRouteLog, markRead, moveRule, processDocument, recordMcp, routeTicket, searchInbox, sendChatMessage, setChatKind, testFork, testRoute, toggleEscalation, toggleFork, toggleRule, upsertEscalation, upsertFork, upsertKind, upsertKnowledge, upsertRule };

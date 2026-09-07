import { MCP_TOOLS, TEMPLATES } from "./catalog";
import {
  aiContextForChat,
  applyEscalations,
  applyRouter,
  assignTicket,
  escalateTicket,
  getChatMessages,
  getRelaySnapshot,
  listQueuesView,
  listRouteLog,
  processDocument,
  recordMcp,
  routeTicket,
  searchInbox,
  sendChatMessage,
  testFork,
  testRoute,
  upsertEscalation,
  upsertFork,
  upsertKind,
  upsertKnowledge,
  upsertRule,
} from "./engine.server";
import { draftReply } from "./ai.server";

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

function ok(id: Rpc["id"], result: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result };
}
function fail(id: Rpc["id"], code: number, message: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}
function toolText(data: unknown) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

async function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_channels": {
      const snap = await getRelaySnapshot();
      return toolText(snap.channels);
    }
    case "list_chats": {
      const snap = await getRelaySnapshot();
      let chats = snap.chats;
      const channel = args.channel as string | undefined;
      const queue = args.queue as string | undefined;
      const unread = args.unread as boolean | undefined;
      if (channel) chats = chats.filter((c) => c.channel === channel);
      if (queue) {
        const ids = new Set(snap.tickets.filter((t) => t.queueId === queue).map((t) => t.chatId));
        chats = chats.filter((c) => ids.has(c.id));
      }
      if (unread) chats = chats.filter((c) => c.unread > 0);
      return toolText(chats);
    }
    case "get_messages": {
      const chatId = String(args.chat_id ?? "");
      const limit = Number(args.limit ?? 80);
      return toolText(getChatMessages(chatId, limit));
    }
    case "send_message": {
      const as = (args.as as "agent" | "bot" | "ai") || "agent";
      const msg = await sendChatMessage(String(args.chat_id), String(args.text ?? ""), as);
      return toolText(msg);
    }
    case "search_inbox": {
      return toolText(searchInbox(String(args.query ?? "")));
    }
    case "list_queues": {
      return toolText(listQueuesView());
    }
    case "list_route_log": {
      let rows = listRouteLog(Number(args.limit ?? 40));
      const source = args.source as string | undefined;
      if (source) rows = rows.filter((r) => r.source === source);
      return toolText(rows);
    }
    case "route_ticket": {
      const ticket = routeTicket({
        ticketId: args.ticket_id ? String(args.ticket_id) : undefined,
        chatId: args.chat_id ? String(args.chat_id) : undefined,
        queueId: args.queue_id ? String(args.queue_id) : undefined,
        priority: args.priority as "p0" | "p1" | "p2" | "p3" | undefined,
      });
      return toolText(ticket);
    }
    case "test_route": {
      return toolText(
        testRoute({
          text: String(args.text ?? ""),
          channel: args.channel as "telegram" | "whatsapp" | "max" | "vk" | undefined,
          title: args.title ? String(args.title) : undefined,
        }),
      );
    }
    case "apply_router": {
      return toolText(applyRouter({ includeAssigned: Boolean(args.include_assigned) }));
    }
    case "list_escalations": {
      const snap = await getRelaySnapshot();
      return toolText(snap.escalations);
    }
    case "apply_escalation": {
      return toolText(applyEscalations());
    }
    case "escalate_ticket": {
      return toolText(
        escalateTicket({
          ticketId: args.ticket_id ? String(args.ticket_id) : undefined,
          chatId: args.chat_id ? String(args.chat_id) : undefined,
        }),
      );
    }
    case "upsert_escalation": {
      return toolText(
        upsertEscalation({
          id: args.id ? String(args.id) : undefined,
          name: String(args.name ?? ""),
          trigger: (args.trigger as "keyword" | "sla" | "silence" | "repeats") ?? "keyword",
          match: args.match ? String(args.match) : undefined,
          afterMin: args.after_min != null ? Number(args.after_min) : undefined,
          repeats: args.repeats != null ? Number(args.repeats) : undefined,
          fromQueues: Array.isArray(args.from_queues) ? args.from_queues.map(String) : undefined,
          queueId: args.queue_id ? String(args.queue_id) : undefined,
          priority: args.priority as "p0" | "p1" | "p2" | "p3" | undefined,
          agentId: args.agent_id ? String(args.agent_id) : undefined,
          enabled: args.enabled as boolean | undefined,
        }),
      );
    }
    case "upsert_rule": {
      return toolText(
        upsertRule({
          id: args.id ? String(args.id) : undefined,
          name: String(args.name ?? ""),
          match: String(args.match ?? ""),
          queueId: String(args.queue_id ?? ""),
          priority: args.priority as "p0" | "p1" | "p2" | "p3" | undefined,
          channel: (args.channel as "telegram" | "whatsapp" | "max" | "vk" | undefined) ?? "",
          agentId: args.agent_id ? String(args.agent_id) : "",
          enabled: typeof args.enabled === "boolean" ? args.enabled : undefined,
        }),
      );
    }
    case "assign_ticket": {
      return toolText(assignTicket(String(args.ticket_id), String(args.agent_id)));
    }
    case "process_document": {
      return toolText(
        processDocument(
          args.document_id ? String(args.document_id) : undefined,
          args.chat_id ? String(args.chat_id) : undefined,
        ),
      );
    }
    case "get_stats": {
      const snap = await getRelaySnapshot();
      return toolText({ stats: snap.stats, channels: snap.channels.map((c) => ({ id: c.id, inbound: c.inbound, outbound: c.outbound, demo: c.demo })) });
    }
    case "list_kinds": {
      const snap = await getRelaySnapshot();
      return toolText(snap.kinds);
    }
    case "upsert_kind": {
      return toolText(
        upsertKind({
          id: args.id ? String(args.id) : undefined,
          name: String(args.name ?? ""),
          match: String(args.match ?? ""),
          queueId: args.queue_id ? String(args.queue_id) : undefined,
          prompt: String(args.prompt ?? ""),
          description: args.description ? String(args.description) : undefined,
        }),
      );
    }
    case "list_knowledge": {
      const snap = await getRelaySnapshot();
      const kindId = args.kind_id ? String(args.kind_id) : undefined;
      const rows = kindId ? snap.knowledge.filter((a) => a.kindIds.includes(kindId) || a.kindIds.length === 0) : snap.knowledge;
      return toolText(rows);
    }
    case "upsert_knowledge": {
      return toolText(
        upsertKnowledge({
          id: args.id ? String(args.id) : undefined,
          title: String(args.title ?? ""),
          body: String(args.body ?? ""),
          kindIds: Array.isArray(args.kind_ids) ? args.kind_ids.map(String) : undefined,
        }),
      );
    }
    case "list_forks": {
      const snap = await getRelaySnapshot();
      return toolText(snap.forks);
    }
    case "upsert_fork": {
      return toolText(
        upsertFork({
          id: args.id ? String(args.id) : undefined,
          name: String(args.name ?? ""),
          match: args.match ? String(args.match) : "",
          trigger: (args.trigger as "keyword" | "document" | "silence" | "repeats") ?? "keyword",
          afterMin: typeof args.after_min === "number" ? args.after_min : undefined,
          repeats: typeof args.repeats === "number" ? args.repeats : undefined,
          action: (args.action as "site" | "crm" | "manager" | "queue" | "url") ?? "site",
          target: String(args.target ?? ""),
          label: String(args.label ?? ""),
          kindId: args.kind_id ? String(args.kind_id) : undefined,
          enabled: args.enabled as boolean | undefined,
        }),
      );
    }
    case "test_fork": {
      return toolText(testFork({ text: String(args.text ?? ""), kindId: args.kind_id ? String(args.kind_id) : undefined }));
    }
    case "auto_reply": {
      const chatId = String(args.chat_id);
      const templateId = args.template_id ? String(args.template_id) : undefined;
      let text = TEMPLATES.find((t) => t.id === templateId)?.body;
      if (!text) {
        const history = getChatMessages(chatId, 12)
          .map((m) => `${m.author === "user" ? "Клиент" : m.agentName ?? "Оператор"}: ${m.text}`)
          .join("\n");
        const ctx = aiContextForChat(chatId);
        const drafted = await draftReply(history, { prompt: ctx.prompt, knowledge: ctx.knowledge });
        if (!drafted.ok) throw new Error(drafted.error);
        text = drafted.text;
      }
      if (args.send) {
        const msg = await sendChatMessage(chatId, text, "ai");
        return toolText({ sent: true, message: msg });
      }
      return toolText({ sent: false, draft: text });
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export async function handleMcpRpc(rpc: Rpc) {
  const started = Date.now();
  const method = rpc.method ?? "";
  try {
    if (method === "initialize") {
      recordMcp(method, undefined, true, Date.now() - started);
      return ok(rpc.id, {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {}, resources: {} },
        serverInfo: { name: "relay", title: "Relay Messenger MCP", version: "1.0.0" },
        instructions:
          "Единый MCP-шлюз Telegram, WhatsApp, MAX и VK. Сначала list_chats, затем send_message / route_ticket / process_document.",
      });
    }
    if (method === "ping") {
      recordMcp(method, undefined, true, Date.now() - started);
      return ok(rpc.id, {});
    }
    if (method === "notifications/initialized" || method.startsWith("notifications/")) {
      return null;
    }
    if (method === "tools/list") {
      recordMcp(method, undefined, true, Date.now() - started);
      return ok(rpc.id, { tools: MCP_TOOLS });
    }
    if (method === "tools/call") {
      const name = String(rpc.params?.name ?? "");
      const args = (rpc.params?.arguments as Record<string, unknown>) ?? {};
      const result = await callTool(name, args);
      recordMcp(method, name, true, Date.now() - started);
      return ok(rpc.id, result);
    }
    if (method === "resources/list") {
      recordMcp(method, undefined, true, Date.now() - started);
      return ok(rpc.id, {
        resources: [
          { uri: "relay://inbox", name: "Inbox", mimeType: "application/json" },
          { uri: "relay://queues", name: "Queues", mimeType: "application/json" },
          { uri: "relay://routes", name: "Route log", mimeType: "application/json" },
          { uri: "relay://stats", name: "Stats", mimeType: "application/json" },
        ],
      });
    }
    if (method === "resources/read") {
      const uri = String(rpc.params?.uri ?? "");
      const snap = await getRelaySnapshot();
      const map: Record<string, unknown> = {
        "relay://inbox": snap.chats,
        "relay://queues": listQueuesView(),
        "relay://routes": listRouteLog(40),
        "relay://stats": snap.stats,
      };
      const data = map[uri];
      if (!data) return fail(rpc.id, -32002, "Unknown resource");
      recordMcp(method, uri, true, Date.now() - started);
      return ok(rpc.id, { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(data, null, 2) }] });
    }
    recordMcp(method || "unknown", undefined, false, Date.now() - started);
    return fail(rpc.id, -32601, `Method not found: ${method}`);
  } catch (err) {
    recordMcp(method, typeof rpc.params?.name === "string" ? rpc.params.name : undefined, false, Date.now() - started);
    return fail(rpc.id, -32000, err instanceof Error ? err.message : "Internal error");
  }
}

export function mcpHealth() {
  return {
    ok: true,
    name: "relay",
    transport: "streamable-http",
    protocol: "2025-03-26",
    tools: MCP_TOOLS.map((t) => t.name),
  };
}

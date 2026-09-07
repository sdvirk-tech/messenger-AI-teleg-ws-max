import { createServerFn } from "@tanstack/react-start";
import type { ChannelId, EscalationTrigger, ForkAction, ForkTrigger, Priority } from "./types";

export const getSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  const { getRelaySnapshot } = await import("./engine.server");
  return getRelaySnapshot();
});

export const sendMessageFn = createServerFn({ method: "POST" })
  .validator((input: { chatId: string; text: string; as?: "agent" | "bot" | "ai" }) => input)
  .handler(async ({ data }) => {
    const { sendChatMessage, markRead } = await import("./engine.server");
    markRead(data.chatId);
    return sendChatMessage(data.chatId, data.text, data.as ?? "agent");
  });

export const markReadFn = createServerFn({ method: "POST" })
  .validator((input: { chatId: string }) => input)
  .handler(async ({ data }) => {
    const { markRead } = await import("./engine.server");
    markRead(data.chatId);
    return { ok: true };
  });

export const assignFn = createServerFn({ method: "POST" })
  .validator((input: { ticketId: string; agentId: string }) => input)
  .handler(async ({ data }) => {
    const { assignTicket } = await import("./engine.server");
    return assignTicket(data.ticketId, data.agentId);
  });

export const routeFn = createServerFn({ method: "POST" })
  .validator((input: { ticketId?: string; chatId?: string; queueId?: string; priority?: Priority }) => input)
  .handler(async ({ data }) => {
    const { routeTicket } = await import("./engine.server");
    return routeTicket(data);
  });

export const processDocFn = createServerFn({ method: "POST" })
  .validator((input: { documentId?: string; chatId?: string }) => input)
  .handler(async ({ data }) => {
    const { processDocument } = await import("./engine.server");
    return processDocument(data.documentId, data.chatId);
  });

export const connectChannelFn = createServerFn({ method: "POST" })
  .validator((input: { channelId: ChannelId; token: string; extra?: string }) => input)
  .handler(async ({ data }) => {
    const { connectChannel } = await import("./engine.server");
    return connectChannel(data);
  });

export const disconnectChannelFn = createServerFn({ method: "POST" })
  .validator((input: { channelId: ChannelId }) => input)
  .handler(async ({ data }) => {
    const { disconnectChannel } = await import("./engine.server");
    return disconnectChannel(data.channelId);
  });

export const toggleRuleFn = createServerFn({ method: "POST" })
  .validator((input: { ruleId: string }) => input)
  .handler(async ({ data }) => {
    const { toggleRule } = await import("./engine.server");
    return toggleRule(data.ruleId);
  });

export const upsertRuleFn = createServerFn({ method: "POST" })
  .validator(
    (input: {
      id?: string;
      name: string;
      match: string;
      queueId: string;
      priority?: Priority;
      channel?: ChannelId | "";
      agentId?: string | "";
      enabled?: boolean;
    }) => input,
  )
  .handler(async ({ data }) => {
    const { upsertRule } = await import("./engine.server");
    return upsertRule(data);
  });

export const deleteRuleFn = createServerFn({ method: "POST" })
  .validator((input: { ruleId: string }) => input)
  .handler(async ({ data }) => {
    const { deleteRule } = await import("./engine.server");
    return deleteRule(data.ruleId);
  });

export const moveRuleFn = createServerFn({ method: "POST" })
  .validator((input: { ruleId: string; dir: "up" | "down" }) => input)
  .handler(async ({ data }) => {
    const { moveRule } = await import("./engine.server");
    return moveRule(data.ruleId, data.dir);
  });

export const testRouteFn = createServerFn({ method: "POST" })
  .validator((input: { text: string; channel?: ChannelId; title?: string }) => input)
  .handler(async ({ data }) => {
    const { testRoute } = await import("./engine.server");
    return testRoute(data);
  });

export const applyRouterFn = createServerFn({ method: "POST" })
  .validator((input: { includeAssigned?: boolean } = {}) => input)
  .handler(async ({ data }) => {
    const { applyRouter } = await import("./engine.server");
    return applyRouter(data);
  });

export const applyEscalationFn = createServerFn({ method: "POST" }).handler(async () => {
  const { applyEscalations } = await import("./engine.server");
  return applyEscalations();
});

export const escalateTicketFn = createServerFn({ method: "POST" })
  .validator((input: { ticketId?: string; chatId?: string }) => input)
  .handler(async ({ data }) => {
    const { escalateTicket } = await import("./engine.server");
    return escalateTicket(data);
  });

export const toggleEscalationFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { toggleEscalation } = await import("./engine.server");
    return toggleEscalation(data.id);
  });

export const deleteEscalationFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { deleteEscalation } = await import("./engine.server");
    return deleteEscalation(data.id);
  });

export const upsertEscalationFn = createServerFn({ method: "POST" })
  .validator(
    (input: {
      id?: string;
      name: string;
      trigger: EscalationTrigger;
      match?: string;
      afterMin?: number;
      repeats?: number;
      fromQueues?: string[];
      queueId?: string;
      priority?: Priority;
      agentId?: string | "";
      enabled?: boolean;
    }) => input,
  )
  .handler(async ({ data }) => {
    const { upsertEscalation } = await import("./engine.server");
    return upsertEscalation(data);
  });

export const upsertKindFn = createServerFn({ method: "POST" })
  .validator(
    (input: { id?: string; name: string; match: string; queueId?: string; prompt: string; description?: string }) => input,
  )
  .handler(async ({ data }) => {
    const { upsertKind } = await import("./engine.server");
    return upsertKind(data);
  });

export const deleteKindFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { deleteKind } = await import("./engine.server");
    return deleteKind(data.id);
  });

export const setChatKindFn = createServerFn({ method: "POST" })
  .validator((input: { chatId: string; kindId: string }) => input)
  .handler(async ({ data }) => {
    const { setChatKind } = await import("./engine.server");
    return setChatKind(data.chatId, data.kindId);
  });

export const upsertKnowledgeFn = createServerFn({ method: "POST" })
  .validator((input: { id?: string; title: string; body: string; kindIds?: string[] }) => input)
  .handler(async ({ data }) => {
    const { upsertKnowledge } = await import("./engine.server");
    return upsertKnowledge(data);
  });

export const deleteKnowledgeFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { deleteKnowledge } = await import("./engine.server");
    return deleteKnowledge(data.id);
  });

export const upsertForkFn = createServerFn({ method: "POST" })
  .validator(
    (input: {
      id?: string;
      name: string;
      match?: string;
      trigger?: ForkTrigger;
      afterMin?: number;
      repeats?: number;
      action: ForkAction;
      target: string;
      label: string;
      kindId?: string | "";
      enabled?: boolean;
    }) => input,
  )
  .handler(async ({ data }) => {
    const { upsertFork } = await import("./engine.server");
    return upsertFork(data);
  });

export const deleteForkFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { deleteFork } = await import("./engine.server");
    return deleteFork(data.id);
  });

export const toggleForkFn = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const { toggleFork } = await import("./engine.server");
    return toggleFork(data.id);
  });

export const testForkFn = createServerFn({ method: "POST" })
  .validator((input: { text: string; kindId?: string }) => input)
  .handler(async ({ data }) => {
    const { testFork } = await import("./engine.server");
    return testFork(data);
  });

export const draftReplyFn = createServerFn({ method: "POST" })
  .validator((input: { chatId: string; send?: boolean; templateId?: string }) => input)
  .handler(async ({ data }) => {
    const engine = await import("./engine.server");
    const { TEMPLATES } = await import("./catalog");
    if (data.templateId) {
      const t = TEMPLATES.find((x) => x.id === data.templateId);
      if (!t) throw new Error("Шаблон не найден");
      if (data.send) {
        await engine.sendChatMessage(data.chatId, t.body, "bot");
      }
      return { ok: true as const, text: t.body, sent: Boolean(data.send) };
    }
    const history = engine
      .getChatMessages(data.chatId, 12)
      .map((m) => `${m.author === "user" ? "Клиент" : m.agentName ?? "Оператор"}: ${m.text}`)
      .join("\n");
    const ctx = engine.aiContextForChat(data.chatId);
    const { draftReply } = await import("./ai.server");
    const drafted = await draftReply(history, { prompt: ctx.prompt, knowledge: ctx.knowledge });
    if (!drafted.ok) return drafted;
    if (data.send) {
      await engine.sendChatMessage(data.chatId, drafted.text, "ai");
    }
    return {
      ok: true as const,
      text: drafted.text,
      sent: Boolean(data.send),
      kind: ctx.kind.name,
      knowledge: ctx.articles.map((a) => a.title),
    };
  });

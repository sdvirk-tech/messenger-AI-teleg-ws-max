import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUp, PenLine, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { ChannelMark } from "@/components/marks";
import { Badge, Button, Input, Textarea } from "@/components/ui";
import { assignFn, draftReplyFn, escalateTicketFn, markReadFn, routeFn, sendMessageFn, setChatKindFn } from "@/lib/relay/actions";
import { CHANNEL_LABEL, DOC_LABEL, FORK_ACTION_LABEL, FORK_TRIGGER_LABEL, PRIORITY_LABEL, formatAgo, formatClock, slaLeft } from "@/lib/relay/format";
import type { Chat, Message, Snapshot, Ticket } from "@/lib/relay/types";
import { cn } from "@/lib/utils";

function ticketFor(snap: Snapshot, chat: Chat) {
  return snap.tickets.find((t) => t.id === chat.ticketId);
}
function queueName(snap: Snapshot, id: string) {
  return snap.queues.find((q) => q.id === id)?.name ?? id;
}

export function InboxView({ snap, selectedId }: { snap: Snapshot; selectedId?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const chats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return snap.chats;
    return snap.chats.filter((c) => `${c.title} ${c.preview}`.toLowerCase().includes(q));
  }, [snap.chats, query]);
  const selected = snap.chats.find((c) => c.id === selectedId) ?? null;
  const paneChat = selected ?? snap.chats[0] ?? null;
  const messages = paneChat ? snap.messages.filter((m) => m.chatId === paneChat.id) : [];
  const ticket = paneChat ? ticketFor(snap, paneChat) : undefined;

  return (
    <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)_minmax(240px,280px)]">
      <section className={cn("min-h-0 border-r border-line flex flex-col", selected ? "hidden md:flex" : "flex")}>
        <div className="p-3">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по инбоксу" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {chats.map((chat) => {
            const t = ticketFor(snap, chat);
            const sla = t ? slaLeft(t.slaDueAt, snap.now) : null;
            const active = chat.id === paneChat?.id;
            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => navigate({ to: "/", search: { chat: chat.id } })}
                className={cn(
                  "flex w-full gap-3 px-3 py-2.5 text-left transition-[background-color] duration-150",
                  active ? "bg-elevated" : "hover:bg-elevated/60",
                )}
              >
                <span className="mt-1 text-muted">
                  <ChannelMark id={chat.channel} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={cn("truncate text-sm", chat.unread ? "font-medium text-fg" : "text-fg")}>{chat.title}</span>
                    <span className="shrink-0 text-xs text-subtle tabular-nums">{formatAgo(chat.lastAt, snap.now)}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">{chat.preview}</span>
                  <span className="mt-1.5 flex items-center gap-1.5">
                    {chat.kindId ? (
                      <Badge tone="muted">{(snap.kinds ?? []).find((k) => k.id === chat.kindId)?.name ?? "тип"}</Badge>
                    ) : t ? (
                      <Badge tone="muted">{queueName(snap, t.queueId)}</Badge>
                    ) : null}
                    {t && chat.kindId ? <Badge tone="muted">{queueName(snap, t.queueId)}</Badge> : null}
                    {sla ? <Badge tone={sla.tone === "ok" ? "sage" : sla.tone}>{sla.label}</Badge> : null}
                    {chat.unread > 0 ? <Badge tone="stone">{chat.unread}</Badge> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={cn("min-h-0 flex flex-col", selected ? "flex" : "hidden md:flex")}>
        {paneChat && ticket ? (
          <Thread snap={snap} chat={paneChat} ticket={ticket} messages={messages} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="text-sm text-muted max-w-xs">Выберите диалог. Сообщения с Telegram, WhatsApp, MAX и VK сходятся сюда и сразу попадают в очередь.</p>
          </div>
        )}
      </section>

      <aside className="min-h-0 hidden border-l border-line overflow-y-auto md:block">
        {paneChat && ticket ? <ContextPanel snap={snap} chat={paneChat} ticket={ticket} /> : <IdleStats snap={snap} />}
      </aside>
    </div>
  );
}

function Thread({ snap, chat, ticket, messages }: { snap: Snapshot; chat: Chat; ticket: Ticket; messages: Message[] }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  const [draftMeta, setDraftMeta] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const send = useMutation({
    mutationFn: (payload: { chatId: string; text: string }) => sendMessageFn({ data: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["relay"] }),
  });

  return (
    <>
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-3 md:px-4">
        <button
          type="button"
          className="md:hidden text-sm text-muted"
          onClick={() => navigate({ to: "/", search: {} })}
        >
          Назад
        </button>
        <span className="text-muted">
          <ChannelMark id={chat.channel} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{chat.title}</div>
          <div className="text-xs text-subtle">{CHANNEL_LABEL[chat.channel]} · {chat.peerId}</div>
        </div>
        <Badge tone={ticket.priority === "p0" || ticket.priority === "p1" ? "danger" : "muted"}>{PRIORITY_LABEL[ticket.priority]}</Badge>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-5 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex", m.author === "user" ? "justify-start" : "justify-end")}>
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                m.author === "user" ? "bg-elevated text-fg rounded-tl-sm" : "bg-accent text-accent-fg rounded-tr-sm",
                m.author === "system" && "bg-transparent text-subtle shadow-[var(--shadow-border)]",
              )}
            >
              {m.author !== "user" && m.agentName ? (
                <div className={cn("mb-1 text-[11px]", m.author === "system" ? "text-subtle" : "text-accent-fg/70")}>{m.agentName}</div>
              ) : null}
              <div>{m.text}</div>
              {m.attachments?.length ? (
                <div className="mt-2 space-y-1">
                  {m.attachments.map((a) => (
                    <div key={a.id} className="rounded-md bg-bg/20 px-2 py-1 text-xs">
                      {a.name} · {DOC_LABEL[a.kind]} · {a.sizeKb} КБ
                    </div>
                  ))}
                </div>
              ) : null}
              <div className={cn("mt-1 text-[11px] tabular-nums", m.author === "user" ? "text-subtle" : "text-accent-fg/60")}>
                {formatClock(m.at)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {draft ? (
        <div className="mx-3 mb-2 rounded-lg bg-elevated px-3 py-2 text-sm">
          <div className="mb-1 text-xs text-muted">Черновик Grok{draftMeta ? ` · ${draftMeta}` : ""}</div>
          <p className="text-fg leading-relaxed">{draft}</p>
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                send.mutate({ chatId: chat.id, text: draft });
                setDraft(null);
                setDraftMeta(null);
              }}
            >
              Отправить
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setDraft(null);
                setDraftMeta(null);
              }}
            >
              Скрыть
            </Button>
          </div>
        </div>
      ) : null}
      <form
        className="shrink-0 border-t border-line p-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const value = text.trim();
          if (!value) return;
          setText("");
          await markReadFn({ data: { chatId: chat.id } });
          send.mutate({ chatId: chat.id, text: value });
        }}
      >
        <div className="flex items-end gap-2">
          <Textarea
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ответ в этот канал"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={!text.trim() || send.isPending} aria-label="Отправить">
            <ArrowUp className="size-4" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {snap.templates.map((t) => (
            <Button key={t.id} type="button" size="sm" variant="ghost" onClick={() => setText(t.body)}>
              {t.title}
            </Button>
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const res = await draftReplyFn({ data: { chatId: chat.id } });
                if (res.ok) {
                  setDraft(res.text);
                  const titles = "knowledge" in res && Array.isArray(res.knowledge) ? res.knowledge : [];
                  const kind = "kind" in res && typeof res.kind === "string" ? res.kind : "";
                  setDraftMeta([kind, titles.length ? `${titles.length} ст.` : ""].filter(Boolean).join(" · ") || null);
                } else setDraft(res.error);
              } finally {
                setBusy(false);
              }
            }}
          >
            <PenLine className="size-3.5" />
            {busy ? "Пишет…" : "Черновик Grok"}
          </Button>
        </div>
      </form>
    </>
  );
}

function ContextPanel({ snap, chat, ticket }: { snap: Snapshot; chat: Chat; ticket: Ticket }) {
  const qc = useQueryClient();
  const sla = slaLeft(ticket.slaDueAt, snap.now);
  const docs = snap.documents.filter((d) => d.chatId === chat.id);
  const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
  const kinds = snap.kinds ?? [];
  const kind = kinds.find((k) => k.id === chat.kindId);
  const articles = (snap.knowledge ?? []).filter(
    (a) => !a.kindIds.length || (chat.kindId ? a.kindIds.includes(chat.kindId) : false),
  );

  return (
    <div className="p-4 space-y-5">
      <div>
        <div className="text-xs text-subtle mb-2">Тип беседы</div>
        <select
          className="h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none"
          value={chat.kindId ?? ""}
          onChange={async (e) => {
            if (!e.target.value) return;
            await setChatKindFn({ data: { chatId: chat.id, kindId: e.target.value } });
            invalidate();
          }}
        >
          {kinds.map((k) => (
            <option key={k.id} value={k.id}>
              {k.name}
            </option>
          ))}
        </select>
        {kind ? (
          <p className="mt-1.5 text-xs text-subtle leading-relaxed line-clamp-3">{kind.prompt}</p>
        ) : (
          <p className="mt-1.5 text-xs text-subtle leading-relaxed">Промпт Grok и база знаний берутся из этого типа.</p>
        )}
      </div>
      {articles.length ? (
        <div>
          <div className="text-xs text-subtle mb-2">База знаний</div>
          <div className="space-y-2">
            {articles.map((a) => (
              <div key={a.id} className="rounded-lg bg-elevated p-3">
                <div className="text-sm">{a.title}</div>
                <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-3">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div>
        <div className="text-xs text-subtle mb-2">Очередь</div>
        <select
          className="h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none"
          value={ticket.queueId}
          onChange={async (e) => {
            await routeFn({ data: { ticketId: ticket.id, queueId: e.target.value } });
            invalidate();
          }}
        >
          {snap.queues.map((q) => (
            <option key={q.id} value={q.id}>
              {q.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-xs text-subtle mb-2">Приоритет</div>
        <div className="flex gap-1">
          {(["p0", "p1", "p2", "p3"] as const).map((p) => (
            <Button
              key={p}
              size="sm"
              variant={ticket.priority === p ? "primary" : "ghost"}
              onClick={async () => {
                await routeFn({ data: { ticketId: ticket.id, priority: p } });
                invalidate();
              }}
            >
              {PRIORITY_LABEL[p]}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-subtle mb-2">Назначить</div>
        <div className="space-y-1">
          {snap.agents.map((a) => (
            <button
              key={a.id}
              type="button"
              className={cn(
                "flex h-10 w-full items-center gap-2 rounded-md px-2 text-left text-sm transition-[background-color] duration-150",
                ticket.assigneeId === a.id ? "bg-elevated" : "hover:bg-elevated/60",
              )}
              onClick={async () => {
                await assignFn({ data: { ticketId: ticket.id, agentId: a.id } });
                invalidate();
              }}
            >
              <UserRound className="size-3.5 text-muted" />
              <span className="flex-1 truncate">{a.name}</span>
              <span className="text-xs text-subtle tabular-nums">{a.load}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">SLA</span>
        <Badge tone={sla.tone === "ok" ? "sage" : sla.tone}>{sla.label}</Badge>
      </div>
      <p className="text-xs text-subtle leading-relaxed">{ticket.reason}</p>
      {ticket.queueId !== "escalation" ? (
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            await escalateTicketFn({ data: { ticketId: ticket.id } });
            invalidate();
          }}
        >
          Эскалировать старшему
        </Button>
      ) : (
        <Badge tone="danger">У старшего смены</Badge>
      )}
      {docs.length ? (
        <div>
          <div className="text-xs text-subtle mb-2">Документы</div>
          <div className="space-y-2">
            {docs.map((d) => (
              <div key={d.id} className="rounded-lg bg-elevated p-3">
                <div className="text-sm">{d.name}</div>
                <div className="mt-1 text-xs text-muted">{DOC_LABEL[d.kind]} · {d.status}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {(chat.forkHits ?? []).length ? (
        <div>
          <div className="text-xs text-subtle mb-2">Развилки</div>
          <div className="space-y-2">
            {chat.forkHits!.map((h) => (
              <div key={h.id} className="rounded-lg bg-elevated p-3">
                <div className="text-sm">{h.label}</div>
                <div className="mt-1 text-xs text-muted">
                  {h.trigger ? `${FORK_TRIGGER_LABEL[h.trigger]} · ` : ""}
                  {FORK_ACTION_LABEL[h.action]}
                  {h.target ? ` · ${h.target}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function IdleStats({ snap }: { snap: Snapshot }) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-xs text-subtle">Сейчас</div>
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Открыто", snap.stats.open],
          ["Ждут", snap.stats.waiting],
          ["SLA", snap.stats.breached],
          ["MCP", snap.stats.mcpCalls],
        ].map(([k, v]) => (
          <div key={String(k)} className="rounded-lg bg-elevated p-3">
            <div className="text-xs text-muted">{k}</div>
            <div className="mt-1 text-lg tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {snap.channels.map((c) => (
          <div key={c.id} className="flex items-center gap-2 text-sm">
            <ChannelMark id={c.id} className="text-muted" />
            <span className="flex-1">{c.name}</span>
            <span className="text-xs text-subtle tabular-nums">{c.inbound}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Input } from "@/components/ui";
import { ChannelMark } from "@/components/marks";
import {
  applyEscalationFn,
  applyRouterFn,
  deleteEscalationFn,
  deleteRuleFn,
  moveRuleFn,
  routeFn,
  testRouteFn,
  toggleEscalationFn,
  toggleRuleFn,
  upsertEscalationFn,
  upsertRuleFn,
} from "@/lib/relay/actions";
import { CHANNEL_LABEL, ESCALATION_TRIGGER_LABEL, PRIORITY_LABEL, ROUTE_SOURCE_LABEL, formatAgo, slaLeft } from "@/lib/relay/format";
import type { ChannelId, EscalationTrigger, Priority, RouteSource, Snapshot } from "@/lib/relay/types";
import { cn } from "@/lib/utils";

const selectClass =
  "h-10 rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none";

export function QueuesView({ snap }: { snap: Snapshot }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
  const [probe, setProbe] = useState("Счёт на 40 паллет до Казани, слот в четверг");
  const [probeChannel, setProbeChannel] = useState<ChannelId>("whatsapp");
  const [probeResult, setProbeResult] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [escApplied, setEscApplied] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [logFilter, setLogFilter] = useState<"all" | RouteSource | "skip">("all");
  const hits = (id: string) => (snap.routeLog ?? []).filter((e) => e.ruleId === id && !e.skipped).length;
  const logRows = (snap.routeLog ?? []).filter((e) => {
    if (logFilter === "all") return true;
    if (logFilter === "skip") return Boolean(e.skipped);
    return e.source === logFilter && !e.skipped;
  });
  const queueLabel = (id?: string) => snap.queues.find((q) => q.id === id)?.name ?? id ?? "";

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="flex gap-3 overflow-x-auto px-4 py-4 min-h-[240px]">
        {snap.queues.map((q) => {
          const tickets = snap.tickets.filter((t) => t.queueId === q.id && t.status !== "resolved");
          return (
            <section key={q.id} className="w-[240px] shrink-0 rounded-xl bg-surface p-2">
              <div className="flex items-center justify-between px-2 py-2">
                <h2 className="text-sm font-medium">{q.name}</h2>
                <span className="text-xs text-subtle tabular-nums">{tickets.length}</span>
              </div>
              <p className="px-2 pb-2 text-[11px] text-subtle">SLA {q.slaMin} мин</p>
              <div className="space-y-2">
                {tickets.map((t) => {
                  const chat = snap.chats.find((c) => c.id === t.chatId);
                  if (!chat) return null;
                  const sla = slaLeft(t.slaDueAt, snap.now);
                  const agent = snap.agents.find((a) => a.id === t.assigneeId);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => navigate({ to: "/", search: { chat: chat.id } })}
                      className="w-full rounded-lg bg-elevated p-3 text-left transition-[box-shadow] duration-150 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <ChannelMark id={chat.channel} className="text-muted" />
                        <span className="truncate font-medium">{chat.title}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted">{chat.preview}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <Badge tone={t.priority === "p0" ? "danger" : "muted"}>{PRIORITY_LABEL[t.priority]}</Badge>
                        <Badge tone={sla.tone === "ok" ? "sage" : sla.tone}>{sla.label}</Badge>
                      </div>
                      {agent ? <div className="mt-1.5 text-[11px] text-subtle truncate">{agent.name}</div> : null}
                    </button>
                  );
                })}
              </div>
              <div className="px-1 pt-2">
                <select
                  className="h-9 w-full rounded-md bg-elevated px-2 text-xs text-muted outline-none"
                  defaultValue=""
                  onChange={async (e) => {
                    const ticketId = e.target.value;
                    if (!ticketId) return;
                    await routeFn({ data: { ticketId, queueId: q.id } });
                    invalidate();
                    e.currentTarget.value = "";
                  }}
                >
                  <option value="">Переместить сюда…</option>
                  {snap.tickets
                    .filter((t) => t.queueId !== q.id && t.status !== "resolved")
                    .map((t) => {
                      const chat = snap.chats.find((c) => c.id === t.chatId);
                      return (
                        <option key={t.id} value={t.id}>
                          {chat?.title ?? t.id}
                        </option>
                      );
                    })}
                </select>
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-line px-4 py-5 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium">Эскалация</h2>
            <p className="mt-1 text-xs text-muted max-w-xl">
              Срабатывает даже если оператор уже держит тикет. Первое подходящее правило поднимает в «Эскалацию» и назначает старшего.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const res = await applyEscalationFn();
                setEscApplied(`Поднято ${res.moved} из ${res.open}`);
                invalidate();
              } finally {
                setBusy(false);
              }
            }}
          >
            Прогнать сейчас
          </Button>
        </div>
        {escApplied ? <p className="text-xs text-ok">{escApplied}</p> : null}

        <div className="space-y-2 max-w-5xl">
          {(snap.escalations ?? []).map((policy) => (
            <article key={policy.id} className="rounded-xl bg-surface p-3">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1 grid gap-2 md:grid-cols-[1.2fr_1fr]">
                  <Input
                    value={policy.name}
                    onChange={(e) => {
                      policy.name = e.target.value;
                      qc.setQueryData(["relay"], { ...snap, escalations: [...snap.escalations] });
                    }}
                    onBlur={() =>
                      upsertEscalationFn({
                        data: {
                          id: policy.id,
                          name: policy.name,
                          trigger: policy.trigger,
                          match: policy.match,
                          afterMin: policy.afterMin,
                          repeats: policy.repeats,
                          fromQueues: policy.fromQueues,
                          queueId: policy.queueId,
                          priority: policy.priority,
                          agentId: policy.agentId ?? "",
                        },
                      }).then(invalidate)
                    }
                  />
                  {policy.trigger === "keyword" ? (
                    <Input
                      className="font-mono text-xs"
                      value={policy.match ?? ""}
                      onChange={(e) => {
                        policy.match = e.target.value;
                        qc.setQueryData(["relay"], { ...snap, escalations: [...snap.escalations] });
                      }}
                      onBlur={() =>
                        upsertEscalationFn({
                          data: {
                            id: policy.id,
                            name: policy.name,
                            trigger: policy.trigger,
                            match: policy.match,
                            fromQueues: policy.fromQueues,
                            queueId: policy.queueId,
                            priority: policy.priority,
                            agentId: policy.agentId ?? "",
                          },
                        }).then(invalidate)
                      }
                    />
                  ) : policy.trigger === "repeats" ? (
                    <Input
                      type="number"
                      value={policy.repeats ?? 3}
                      onChange={(e) => {
                        policy.repeats = Number(e.target.value);
                        qc.setQueryData(["relay"], { ...snap, escalations: [...snap.escalations] });
                      }}
                      onBlur={() =>
                        upsertEscalationFn({
                          data: {
                            id: policy.id,
                            name: policy.name,
                            trigger: policy.trigger,
                            repeats: policy.repeats,
                            fromQueues: policy.fromQueues,
                            queueId: policy.queueId,
                            priority: policy.priority,
                            agentId: policy.agentId ?? "",
                          },
                        }).then(invalidate)
                      }
                    />
                  ) : policy.trigger === "silence" ? (
                    <Input
                      type="number"
                      value={policy.afterMin ?? 5}
                      onChange={(e) => {
                        policy.afterMin = Number(e.target.value);
                        qc.setQueryData(["relay"], { ...snap, escalations: [...snap.escalations] });
                      }}
                      onBlur={() =>
                        upsertEscalationFn({
                          data: {
                            id: policy.id,
                            name: policy.name,
                            trigger: policy.trigger,
                            afterMin: policy.afterMin,
                            fromQueues: policy.fromQueues,
                            queueId: policy.queueId,
                            priority: policy.priority,
                            agentId: policy.agentId ?? "",
                          },
                        }).then(invalidate)
                      }
                    />
                  ) : (
                    <div className="flex h-10 items-center text-xs text-muted">когда SLA уже вышел</div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <select
                  className={cn(selectClass, "h-8 text-xs")}
                  value={policy.trigger}
                  onChange={(e) =>
                    upsertEscalationFn({
                      data: {
                        id: policy.id,
                        name: policy.name,
                        trigger: e.target.value as EscalationTrigger,
                        match: policy.match,
                        afterMin: policy.afterMin,
                        repeats: policy.repeats,
                        fromQueues: policy.fromQueues,
                        queueId: policy.queueId,
                        priority: policy.priority,
                        agentId: policy.agentId ?? "",
                      },
                    }).then(invalidate)
                  }
                >
                  {(Object.keys(ESCALATION_TRIGGER_LABEL) as EscalationTrigger[]).map((t) => (
                    <option key={t} value={t}>
                      {ESCALATION_TRIGGER_LABEL[t]}
                    </option>
                  ))}
                </select>
                <select
                  className={cn(selectClass, "h-8 text-xs")}
                  value={policy.priority}
                  onChange={(e) =>
                    upsertEscalationFn({
                      data: {
                        id: policy.id,
                        name: policy.name,
                        trigger: policy.trigger,
                        match: policy.match,
                        afterMin: policy.afterMin,
                        repeats: policy.repeats,
                        fromQueues: policy.fromQueues,
                        queueId: policy.queueId,
                        priority: e.target.value as Priority,
                        agentId: policy.agentId ?? "",
                      },
                    }).then(invalidate)
                  }
                >
                  {(["p0", "p1", "p2", "p3"] as const).map((p) => (
                    <option key={p} value={p}>
                      {PRIORITY_LABEL[p]}
                    </option>
                  ))}
                </select>
                <select
                  className={cn(selectClass, "h-8 text-xs")}
                  value={policy.agentId ?? ""}
                  onChange={(e) =>
                    upsertEscalationFn({
                      data: {
                        id: policy.id,
                        name: policy.name,
                        trigger: policy.trigger,
                        match: policy.match,
                        afterMin: policy.afterMin,
                        repeats: policy.repeats,
                        fromQueues: policy.fromQueues,
                        queueId: policy.queueId,
                        priority: policy.priority,
                        agentId: e.target.value,
                      },
                    }).then(invalidate)
                  }
                >
                  <option value="">Без назначения</option>
                  {snap.agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <Button
                  size="sm"
                  variant={policy.enabled ? "primary" : "ghost"}
                  onClick={() => toggleEscalationFn({ data: { id: policy.id } }).then(invalidate)}
                >
                  {policy.enabled ? "Вкл" : "Выкл"}
                </Button>
                <Button size="iconSm" variant="ghost" aria-label="Удалить" onClick={() => deleteEscalationFn({ data: { id: policy.id } }).then(invalidate)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {snap.queues
                  .filter((q) => q.id !== "escalation")
                  .map((q) => {
                    const on = !policy.fromQueues?.length || policy.fromQueues.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        className={cn(
                          "h-8 rounded-md px-2.5 text-xs transition-colors duration-150",
                          on ? "bg-elevated text-fg" : "text-subtle hover:bg-elevated hover:text-fg",
                        )}
                        onClick={() => {
                          const all = snap.queues.filter((x) => x.id !== "escalation").map((x) => x.id);
                          const current = policy.fromQueues?.length ? [...policy.fromQueues] : all;
                          const next = current.includes(q.id) ? current.filter((id) => id !== q.id) : [...current, q.id];
                          upsertEscalationFn({
                            data: {
                              id: policy.id,
                              name: policy.name,
                              trigger: policy.trigger,
                              match: policy.match,
                              afterMin: policy.afterMin,
                              repeats: policy.repeats,
                              fromQueues: next,
                              queueId: policy.queueId,
                              priority: policy.priority,
                              agentId: policy.agentId ?? "",
                            },
                          }).then(invalidate);
                        }}
                      >
                        {q.name}
                      </button>
                    );
                  })}
              </div>
            </article>
          ))}
        </div>

        <form
          className="rounded-xl bg-surface p-3 max-w-5xl space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const name = String(fd.get("name") ?? "").trim();
            const trigger = String(fd.get("trigger") ?? "keyword") as EscalationTrigger;
            const match = String(fd.get("match") ?? "").trim();
            const afterMin = Number(fd.get("afterMin") || 5);
            const repeats = Number(fd.get("repeats") || 3);
            const priority = (String(fd.get("priority") ?? "p1") || "p1") as Priority;
            const agentId = String(fd.get("agentId") ?? "sofia");
            if (!name) return;
            await upsertEscalationFn({
              data: {
                name,
                trigger,
                match: trigger === "keyword" ? match || "срочно" : undefined,
                afterMin: trigger === "silence" ? afterMin : undefined,
                repeats: trigger === "repeats" ? repeats : undefined,
                queueId: "escalation",
                priority,
                agentId,
              },
            });
            form.reset();
            invalidate();
          }}
        >
          <div className="text-xs text-subtle">Новое правило эскалации</div>
          <div className="grid gap-2 md:grid-cols-2">
            <Input name="name" placeholder="Имя" />
            <Input name="match" className="font-mono text-xs" placeholder="претенз|адвокат — для текста" />
          </div>
          <div className="flex flex-wrap gap-2">
            <select name="trigger" className={cn(selectClass, "h-8 text-xs")} defaultValue="keyword">
              {(Object.keys(ESCALATION_TRIGGER_LABEL) as EscalationTrigger[]).map((t) => (
                <option key={t} value={t}>
                  {ESCALATION_TRIGGER_LABEL[t]}
                </option>
              ))}
            </select>
            <Input name="afterMin" type="number" className="w-24 h-8 text-xs" placeholder="мин" />
            <select name="priority" className={cn(selectClass, "h-8 text-xs")} defaultValue="p1">
              {(["p0", "p1", "p2", "p3"] as const).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABEL[p]}
                </option>
              ))}
            </select>
            <select name="agentId" className={cn(selectClass, "h-8 text-xs")} defaultValue="sofia">
              {snap.agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <Button type="submit" size="sm">
              Добавить
            </Button>
          </div>
        </form>
      </section>

      <section className="border-t border-line px-4 py-5 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium">Маршрутизация</h2>
            <p className="mt-1 text-xs text-muted max-w-xl">Первое совпадение побеждает. Человека с назначенным тикетом правила не трогают, пока не нажмёте прогон с назначенными.</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const res = await applyRouterFn({ data: {} });
                setApplied(`Переложено ${res.moved} из ${res.open}`);
                invalidate();
              } finally {
                setBusy(false);
              }
            }}
          >
            Прогнать открытые
          </Button>
        </div>
        {applied ? <p className="text-xs text-ok">{applied}</p> : null}

        <form
          className="rounded-xl bg-surface p-3 flex flex-col gap-2 md:flex-row md:items-end"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await testRouteFn({ data: { text: probe, channel: probeChannel } });
            setProbeResult(`${res.queue} · ${PRIORITY_LABEL[res.priority]} · ${res.agent ?? "без назначения"} · «${res.rule}»`);
            invalidate();
          }}
        >
          <label className="flex-1 min-w-0 text-xs text-subtle">
            Проверка сообщения
            <Input className="mt-1" value={probe} onChange={(e) => setProbe(e.target.value)} placeholder="Текст входящего" />
          </label>
          <label className="text-xs text-subtle">
            Канал
            <select className={cn(selectClass, "mt-1 w-full md:w-40")} value={probeChannel} onChange={(e) => setProbeChannel(e.target.value as ChannelId)}>
              {(Object.keys(CHANNEL_LABEL) as ChannelId[]).map((id) => (
                <option key={id} value={id}>
                  {CHANNEL_LABEL[id]}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" size="md">
            Куда уйдёт
          </Button>
        </form>
        {probeResult ? (
          <div className="rounded-lg bg-elevated px-3 py-2 text-sm">{probeResult}</div>
        ) : null}

        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-sm font-medium">Журнал маршрутизации</h3>
            <span className="text-xs text-subtle tabular-nums">{(snap.routeLog ?? []).length} записей</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {(
              [
                ["all", "Все"],
                ["inbound", "Входящие"],
                ["apply", "Прогон"],
                ["escalate", "Эскалация"],
                ["probe", "Проверки"],
                ["skip", "Пропуски"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setLogFilter(id)}
                className={cn(
                  "h-8 rounded-md px-2.5 text-xs transition-colors duration-150",
                  logFilter === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl bg-surface">
            {logRows.length === 0 ? (
              <div className="px-4 py-6 text-sm text-muted">Пока пусто — входящие и проверки появятся здесь.</div>
            ) : (
              logRows.map((row, i) => (
                <div
                  key={row.id}
                  className={cn("px-4 py-2.5", i !== 0 && "border-t border-line", row.skipped && "opacity-70")}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <ChannelMark id={row.channel} className="text-muted shrink-0" />
                    <span className="truncate font-medium">{row.chatTitle ?? "проверка"}</span>
                    <Badge tone={row.skipped ? "warn" : "muted"}>{ROUTE_SOURCE_LABEL[row.source]}</Badge>
                    <span className="ml-auto text-xs text-subtle tabular-nums shrink-0">{formatAgo(row.at, snap.now)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted line-clamp-1">{row.text}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                    {row.fromQueue && row.fromQueue !== row.toQueue ? (
                      <span className="text-subtle">
                        {queueLabel(row.fromQueue)} → {queueLabel(row.toQueue)}
                      </span>
                    ) : (
                      <span className="text-subtle">{queueLabel(row.toQueue)}</span>
                    )}
                    <span className="text-subtle">·</span>
                    <span>{row.skipped ? row.skipReason : `«${row.ruleName}»`}</span>
                    <Badge tone={row.priority === "p0" ? "danger" : "muted"}>{PRIORITY_LABEL[row.priority]}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2 max-w-5xl">
          {snap.rules.map((rule, index) => {
            const fallback = rule.match === "*";
            return (
              <article key={rule.id} className="rounded-xl bg-surface p-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 w-8 shrink-0">
                    <div className="text-xs text-subtle tabular-nums">{index + 1}</div>
                    <div className="text-[10px] text-subtle tabular-nums">{hits(rule.id)}</div>
                  </div>
                  <div className="min-w-0 flex-1 grid gap-2 md:grid-cols-[1.2fr_1fr]">
                    <Input
                      value={rule.name}
                      disabled={fallback}
                      onChange={(e) => {
                        rule.name = e.target.value;
                        qc.setQueryData(["relay"], { ...snap, rules: [...snap.rules] });
                      }}
                      onBlur={() =>
                        upsertRuleFn({
                          data: {
                            id: rule.id,
                            name: rule.name,
                            match: rule.match,
                            queueId: rule.queueId,
                            priority: rule.priority,
                            channel: rule.channel ?? "",
                            agentId: rule.agentId ?? "",
                          },
                        }).then(invalidate)
                      }
                    />
                    <Input
                      className="font-mono text-xs"
                      value={rule.match}
                      disabled={fallback}
                      onChange={(e) => {
                        rule.match = e.target.value;
                        qc.setQueryData(["relay"], { ...snap, rules: [...snap.rules] });
                      }}
                      onBlur={() =>
                        upsertRuleFn({
                          data: {
                            id: rule.id,
                            name: rule.name,
                            match: rule.match,
                            queueId: rule.queueId,
                            priority: rule.priority,
                            channel: rule.channel ?? "",
                            agentId: rule.agentId ?? "",
                          },
                        }).then(invalidate)
                      }
                    />
                  </div>
                  <div className="flex shrink-0 flex-col">
                    <Button size="iconSm" variant="ghost" disabled={fallback || index === 0} aria-label="Выше" onClick={() => moveRuleFn({ data: { ruleId: rule.id, dir: "up" } }).then(invalidate)}>
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      size="iconSm"
                      variant="ghost"
                      disabled={fallback || index >= snap.rules.length - 2}
                      aria-label="Ниже"
                      onClick={() => moveRuleFn({ data: { ruleId: rule.id, dir: "down" } }).then(invalidate)}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 pl-10">
                  <select
                    className={cn(selectClass, "h-8 text-xs")}
                    value={rule.channel ?? ""}
                    disabled={fallback}
                    onChange={(e) =>
                      upsertRuleFn({
                        data: {
                          id: rule.id,
                          name: rule.name,
                          match: rule.match,
                          queueId: rule.queueId,
                          priority: rule.priority,
                          channel: e.target.value as ChannelId | "",
                          agentId: rule.agentId ?? "",
                        },
                      }).then(invalidate)
                    }
                  >
                    <option value="">Все каналы</option>
                    {(Object.keys(CHANNEL_LABEL) as ChannelId[]).map((id) => (
                      <option key={id} value={id}>
                        {CHANNEL_LABEL[id]}
                      </option>
                    ))}
                  </select>
                  <select
                    className={cn(selectClass, "h-8 text-xs")}
                    value={rule.queueId}
                    onChange={(e) =>
                      upsertRuleFn({
                        data: {
                          id: rule.id,
                          name: rule.name,
                          match: rule.match,
                          queueId: e.target.value,
                          priority: rule.priority,
                          channel: rule.channel ?? "",
                          agentId: rule.agentId ?? "",
                        },
                      }).then(invalidate)
                    }
                  >
                    {snap.queues.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className={cn(selectClass, "h-8 text-xs")}
                    value={rule.priority ?? "p2"}
                    onChange={(e) =>
                      upsertRuleFn({
                        data: {
                          id: rule.id,
                          name: rule.name,
                          match: rule.match,
                          queueId: rule.queueId,
                          priority: e.target.value as Priority,
                          channel: rule.channel ?? "",
                          agentId: rule.agentId ?? "",
                        },
                      }).then(invalidate)
                    }
                  >
                    {(["p0", "p1", "p2", "p3"] as const).map((p) => (
                      <option key={p} value={p}>
                        {PRIORITY_LABEL[p]}
                      </option>
                    ))}
                  </select>
                  <select
                    className={cn(selectClass, "h-8 text-xs")}
                    value={rule.agentId ?? ""}
                    onChange={(e) =>
                      upsertRuleFn({
                        data: {
                          id: rule.id,
                          name: rule.name,
                          match: rule.match,
                          queueId: rule.queueId,
                          priority: rule.priority,
                          channel: rule.channel ?? "",
                          agentId: e.target.value,
                        },
                      }).then(invalidate)
                    }
                  >
                    <option value="">Без назначения</option>
                    {snap.agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    size="sm"
                    variant={rule.enabled ? "primary" : "ghost"}
                    disabled={fallback}
                    onClick={() => toggleRuleFn({ data: { ruleId: rule.id } }).then(invalidate)}
                  >
                    {rule.enabled ? "Вкл" : "Выкл"}
                  </Button>
                  {!fallback ? (
                    <Button size="iconSm" variant="ghost" aria-label="Удалить" onClick={() => deleteRuleFn({ data: { ruleId: rule.id } }).then(invalidate)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <form
          className="rounded-xl bg-surface p-3 max-w-5xl space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const name = String(fd.get("name") ?? "").trim();
            const match = String(fd.get("match") ?? "").trim();
            const queueId = String(fd.get("queueId") ?? "support");
            const priority = (String(fd.get("priority") ?? "p2") || "p2") as Priority;
            const channel = String(fd.get("channel") ?? "") as ChannelId | "";
            const agentId = String(fd.get("agentId") ?? "");
            if (!name || !match) return;
            await upsertRuleFn({ data: { name, match, queueId, priority, channel, agentId } });
            form.reset();
            invalidate();
          }}
        >
          <div className="text-xs text-subtle">Новое правило</div>
          <div className="grid gap-2 md:grid-cols-2">
            <Input name="name" placeholder="Имя" />
            <Input name="match" className="font-mono text-xs" placeholder="vip|срочно или *" />
          </div>
          <div className="flex flex-wrap gap-2">
            <select name="channel" className={cn(selectClass, "h-8 text-xs")} defaultValue="">
              <option value="">Все каналы</option>
              {(Object.keys(CHANNEL_LABEL) as ChannelId[]).map((id) => (
                <option key={id} value={id}>
                  {CHANNEL_LABEL[id]}
                </option>
              ))}
            </select>
            <select name="queueId" className={cn(selectClass, "h-8 text-xs")} defaultValue={snap.queues[1]?.id ?? "support"}>
              {snap.queues.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
            <select name="priority" className={cn(selectClass, "h-8 text-xs")} defaultValue="p2">
              {(["p0", "p1", "p2", "p3"] as const).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABEL[p]}
                </option>
              ))}
            </select>
            <select name="agentId" className={cn(selectClass, "h-8 text-xs")} defaultValue="">
              <option value="">Без назначения</option>
              {snap.agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <Button type="submit" size="sm">
              <Plus className="size-3.5" />
              Добавить
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

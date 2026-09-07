import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Input, Textarea } from "@/components/ui";
import {
  deleteForkFn,
  deleteKindFn,
  deleteKnowledgeFn,
  testForkFn,
  toggleForkFn,
  upsertForkFn,
  upsertKindFn,
  upsertKnowledgeFn,
} from "@/lib/relay/actions";
import { FORK_ACTION_LABEL, FORK_TRIGGER_LABEL } from "@/lib/relay/format";
import type { Fork, ForkAction, ForkTrigger, Snapshot, TalkKind } from "@/lib/relay/types";
import { cn } from "@/lib/utils";

const selectClass =
  "h-10 rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none";

type Tab = "kinds" | "knowledge" | "forks";

export function PlaybooksView({ snap }: { snap: Snapshot }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
  const [tab, setTab] = useState<Tab>("kinds");
  const [openId, setOpenId] = useState<string | null>(snap.kinds[0]?.id ?? null);
  const kinds = snap.kinds ?? [];
  const knowledge = snap.knowledge ?? [];
  const forks = snap.forks ?? [];

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <p className="px-4 pt-3 text-xs text-muted max-w-2xl leading-relaxed">
        Тип беседы задаёт промпт Grok. Статью знаний можно повесить на один тип или сразу на несколько. Триггер развилки — текст, файл, тишина или повторы; дальше клиент уходит на сайт, в CRM, к менеджеру или в очередь.
      </p>
      <div className="flex flex-wrap gap-1 px-4 pt-3">
        {(
          [
            ["kinds", "Типы бесед"],
            ["knowledge", "База знаний"],
            ["forks", "Развилки"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-10 rounded-md px-3 text-sm transition-colors duration-150",
              tab === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "kinds" ? (
        <KindsTab snap={snap} kinds={kinds} openId={openId} setOpenId={setOpenId} invalidate={invalidate} qc={qc} />
      ) : null}
      {tab === "knowledge" ? <KnowledgeTab kinds={kinds} knowledge={knowledge} invalidate={invalidate} qc={qc} snap={snap} /> : null}
      {tab === "forks" ? <ForksTab kinds={kinds} forks={forks} invalidate={invalidate} snap={snap} /> : null}
    </div>
  );
}

function KindsTab({
  snap,
  kinds,
  openId,
  setOpenId,
  invalidate,
  qc,
}: {
  snap: Snapshot;
  kinds: TalkKind[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  invalidate: () => void;
  qc: ReturnType<typeof useQueryClient>;
}) {
  const open = kinds.find((k) => k.id === openId) ?? kinds[0];
  const linked = (snap.knowledge ?? []).filter((a) => open && (!a.kindIds.length || a.kindIds.includes(open.id)));
  const chats = snap.chats.filter((c) => c.kindId === open?.id);

  return (
    <div className="mt-2 flex flex-col md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b md:border-b-0 md:border-r border-line p-3 space-y-1 bg-bg">
        <div className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible pb-1 md:pb-0">
          {kinds.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setOpenId(k.id)}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 md:w-full",
                k.id === open?.id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
              )}
            >
              <div className="truncate font-medium text-fg">{k.name}</div>
              <div className="mt-0.5 hidden md:block text-xs text-subtle truncate">
                {(snap.knowledge ?? []).filter((a) => a.kindIds.includes(k.id) || !a.kindIds.length).length} ст. ·{" "}
                {k.match === "*" ? "остальное" : k.match}
              </div>
            </button>
          ))}
        </div>
        <form
          className="pt-3 space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") ?? "").trim();
            const match = String(fd.get("match") ?? "").trim();
            if (!name || !match) return;
            const kind = await upsertKindFn({
              data: {
                name,
                match,
                queueId: "support",
                prompt: "Ты оператор Нордлайн. Короткий ответ на русском, без выдуманных фактов.",
                description: "",
              },
            });
            e.currentTarget.reset();
            setOpenId(kind.id);
            invalidate();
          }}
        >
          <Input name="name" placeholder="Новый тип" />
          <Input name="match" className="font-mono text-xs" placeholder="трекинг|заказ" />
          <Button type="submit" size="sm" className="w-full">
            Добавить тип
          </Button>
        </form>
      </aside>
      {open ? (
        <section className="p-4 space-y-4 max-w-3xl bg-bg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium">{open.name}</h2>
              <p className="mt-1 text-xs text-muted">
                {chats.length} диалогов · {linked.length} статей
              </p>
            </div>
            {open.match !== "*" ? (
              <Button
                size="iconSm"
                variant="ghost"
                aria-label="Удалить"
                onClick={() =>
                  deleteKindFn({ data: { id: open.id } }).then(() => {
                    setOpenId(kinds[0]?.id ?? null);
                    invalidate();
                  })
                }
              >
                <Trash2 className="size-3.5" />
              </Button>
            ) : null}
          </div>
          <label className="block text-xs text-subtle">
            Имя
            <Input
              className="mt-1"
              value={open.name}
              onChange={(e) => {
                open.name = e.target.value;
                qc.setQueryData(["relay"], { ...snap, kinds: [...kinds] });
              }}
              onBlur={() => saveKind(open).then(invalidate)}
            />
          </label>
          <label className="block text-xs text-subtle">
            Условие
            <Input
              className="mt-1 font-mono text-xs"
              value={open.match}
              disabled={open.match === "*"}
              onChange={(e) => {
                open.match = e.target.value;
                qc.setQueryData(["relay"], { ...snap, kinds: [...kinds] });
              }}
              onBlur={() => saveKind(open).then(invalidate)}
            />
          </label>
          <label className="block text-xs text-subtle">
            Зачем этот тип
            <Input
              className="mt-1"
              value={open.description}
              onChange={(e) => {
                open.description = e.target.value;
                qc.setQueryData(["relay"], { ...snap, kinds: [...kinds] });
              }}
              onBlur={() => saveKind(open).then(invalidate)}
            />
          </label>
          <label className="block text-xs text-subtle">
            Очередь
            <select
              className={cn(selectClass, "mt-1 w-full")}
              value={open.queueId}
              onChange={(e) => {
                open.queueId = e.target.value;
                saveKind(open).then(invalidate);
              }}
            >
              {snap.queues.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-subtle">
            Промпт для ИИ
            <Textarea
              className="mt-1 min-h-36"
              value={open.prompt}
              onChange={(e) => {
                open.prompt = e.target.value;
                qc.setQueryData(["relay"], { ...snap, kinds: [...kinds] });
              }}
              onBlur={() => saveKind(open).then(invalidate)}
            />
          </label>
          <div>
            <div className="text-xs text-subtle mb-2">Привязанные знания</div>
            {linked.length ? (
              <div className="space-y-2">
                {linked.map((a) => (
                  <div key={a.id} className="rounded-lg bg-surface p-3">
                    <div className="text-sm">{a.title}</div>
                    <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">{a.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">Пока нет статей — добавьте во вкладке «База знаний».</p>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function saveKind(kind: TalkKind) {
  return upsertKindFn({
    data: {
      id: kind.id,
      name: kind.name,
      match: kind.match,
      queueId: kind.queueId,
      prompt: kind.prompt,
      description: kind.description,
    },
  });
}

function KnowledgeTab({
  kinds,
  knowledge,
  invalidate,
  qc,
  snap,
}: {
  kinds: TalkKind[];
  knowledge: Snapshot["knowledge"];
  invalidate: () => void;
  qc: ReturnType<typeof useQueryClient>;
  snap: Snapshot;
}) {
  return (
    <div className="p-4 space-y-3 max-w-3xl">
      <p className="text-xs text-muted">Статья может висеть на одном типе беседы или сразу на нескольких — Grok подхватит её в черновике.</p>
      {knowledge.map((art) => (
        <article key={art.id} className="rounded-xl bg-surface p-3 space-y-2">
          <div className="flex items-start gap-2">
            <Input
              value={art.title}
              onChange={(e) => {
                art.title = e.target.value;
                qc.setQueryData(["relay"], { ...snap, knowledge: [...knowledge] });
              }}
              onBlur={() => upsertKnowledgeFn({ data: { id: art.id, title: art.title, body: art.body, kindIds: art.kindIds } }).then(invalidate)}
            />
            <Button size="iconSm" variant="ghost" aria-label="Удалить" onClick={() => deleteKnowledgeFn({ data: { id: art.id } }).then(invalidate)}>
              <Trash2 className="size-3.5" />
            </Button>
          </div>
          <Textarea
            className="min-h-24"
            value={art.body}
            onChange={(e) => {
              art.body = e.target.value;
              qc.setQueryData(["relay"], { ...snap, knowledge: [...knowledge] });
            }}
            onBlur={() => upsertKnowledgeFn({ data: { id: art.id, title: art.title, body: art.body, kindIds: art.kindIds } }).then(invalidate)}
          />
          <div className="flex flex-wrap gap-1">
            {!art.kindIds.length ? <Badge tone="muted">все типы</Badge> : null}
            {kinds
              .filter((k) => k.match !== "*")
              .map((k) => {
                const on = art.kindIds.includes(k.id);
                return (
                  <button
                    key={k.id}
                    type="button"
                    className={cn(
                      "h-8 rounded-md px-2.5 text-xs transition-colors duration-150",
                      on ? "bg-elevated text-fg" : "text-subtle hover:bg-elevated hover:text-fg",
                    )}
                    onClick={() => {
                      const kindIds = on ? art.kindIds.filter((id) => id !== k.id) : [...art.kindIds, k.id];
                      upsertKnowledgeFn({ data: { id: art.id, title: art.title, body: art.body, kindIds } }).then(invalidate);
                    }}
                  >
                    {k.name}
                  </button>
                );
              })}
          </div>
        </article>
      ))}
      <form
        className="rounded-xl bg-surface p-3 space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const title = String(fd.get("title") ?? "").trim();
          const body = String(fd.get("body") ?? "").trim();
          const kindId = String(fd.get("kindId") ?? "");
          if (!title || !body) return;
          await upsertKnowledgeFn({ data: { title, body, kindIds: kindId ? [kindId] : [] } });
          form.reset();
          invalidate();
        }}
      >
        <div className="text-xs text-subtle">Новая статья</div>
        <Input name="title" placeholder="Заголовок" />
        <Textarea name="body" className="min-h-20" placeholder="Факты, которые ИИ имеет право использовать" />
        <div className="flex flex-wrap gap-2">
          <select name="kindId" className={cn(selectClass, "text-xs")} defaultValue="">
            <option value="">Все типы</option>
            {kinds.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name}
              </option>
            ))}
          </select>
          <Button type="submit" size="sm">
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
}

function saveFork(fork: Fork, patch: Partial<Fork> = {}) {
  const next = { ...fork, ...patch };
  return upsertForkFn({
    data: {
      id: next.id,
      name: next.name,
      match: next.match ?? "",
      trigger: next.trigger ?? "keyword",
      afterMin: next.afterMin,
      repeats: next.repeats,
      action: next.action,
      target: next.target,
      label: next.label,
      kindId: next.kindId ?? "",
      enabled: next.enabled,
    },
  });
}

function ForksTab({
  kinds,
  forks,
  invalidate,
  snap,
}: {
  kinds: TalkKind[];
  forks: Snapshot["forks"];
  invalidate: () => void;
  snap: Snapshot;
}) {
  const [probe, setProbe] = useState("Не пришёл трекинг по NL-4821");
  const [probeKind, setProbeKind] = useState("k-track");
  const [probeOut, setProbeOut] = useState<string | null>(null);
  const [newTrigger, setNewTrigger] = useState<ForkTrigger>("keyword");
  const hits = (id: string) => snap.chats.reduce((n, c) => n + (c.forkHits?.filter((h) => h.forkId === id).length ?? 0), 0);

  return (
    <div className="p-4 space-y-4 max-w-3xl">
      <p className="text-xs text-muted">
        Триггер решает, когда сработает развилка. Текст и файл проверяются по фразе; тишина и повторы — по живому диалогу.
      </p>
      <form
        className="rounded-xl bg-surface p-3 flex flex-col gap-2 md:flex-row md:items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await testForkFn({ data: { text: probe, kindId: probeKind } });
          const list = res.forks?.length ? res.forks : res.fork ? [res.fork] : [];
          setProbeOut(
            list.length
              ? `${res.kind}: ${list.map((f) => `${f.name} (${FORK_TRIGGER_LABEL[(f.trigger as ForkTrigger) ?? "keyword"]}) → ${f.label}`).join("; ")}`
              : `${res.kind ?? "тип"} · по тексту не сработало (тишина и повторы смотрите в карточке диалога)`,
          );
        }}
      >
        <label className="flex-1 text-xs text-subtle">
          Проверка текста
          <Input className="mt-1" value={probe} onChange={(e) => setProbe(e.target.value)} />
        </label>
        <select className={cn(selectClass, "md:w-48")} value={probeKind} onChange={(e) => setProbeKind(e.target.value)}>
          {kinds.map((k) => (
            <option key={k.id} value={k.id}>
              {k.name}
            </option>
          ))}
        </select>
        <Button type="submit" size="md">
          Куда уйдёт
        </Button>
      </form>
      {probeOut ? <div className="rounded-lg bg-elevated px-3 py-2 text-sm">{probeOut}</div> : null}

      {forks.map((fork) => {
        const trigger = fork.trigger ?? "keyword";
        return (
          <article key={fork.id} className="rounded-xl bg-surface p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{fork.name}</div>
                <div className="mt-0.5 text-xs text-subtle">
                  {FORK_TRIGGER_LABEL[trigger]}
                  {trigger === "silence" ? ` · ${fork.afterMin ?? 5} мин` : ""}
                  {trigger === "repeats" ? ` · ${fork.repeats ?? 2} подряд` : ""}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge tone="muted">{hits(fork.id)}</Badge>
                <Button size="sm" variant={fork.enabled ? "primary" : "ghost"} onClick={() => toggleForkFn({ data: { id: fork.id } }).then(invalidate)}>
                  {fork.enabled ? "Вкл" : "Выкл"}
                </Button>
                <Button size="iconSm" variant="ghost" aria-label="Удалить" onClick={() => deleteForkFn({ data: { id: fork.id } }).then(invalidate)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
            <Input defaultValue={fork.name} key={`${fork.id}-name`} onBlur={(e) => saveFork(fork, { name: e.currentTarget.value }).then(invalidate)} />
            <div className="grid gap-2 md:grid-cols-2">
              <select className={selectClass} value={trigger} onChange={(e) => saveFork(fork, { trigger: e.target.value as ForkTrigger }).then(invalidate)}>
                {(Object.keys(FORK_TRIGGER_LABEL) as ForkTrigger[]).map((t) => (
                  <option key={t} value={t}>
                    {FORK_TRIGGER_LABEL[t]}
                  </option>
                ))}
              </select>
              {trigger === "keyword" || trigger === "document" ? (
                <Input
                  className="font-mono text-xs"
                  defaultValue={fork.match}
                  key={`${fork.id}-match-${trigger}`}
                  placeholder={trigger === "document" ? "invoice|акт|resume" : "трекинг|NL-\\d+"}
                  onBlur={(e) => saveFork(fork, { match: e.currentTarget.value }).then(invalidate)}
                />
              ) : trigger === "silence" ? (
                <Input
                  type="number"
                  defaultValue={fork.afterMin ?? 5}
                  key={`${fork.id}-silence`}
                  onBlur={(e) => saveFork(fork, { afterMin: Number(e.currentTarget.value) || 5 }).then(invalidate)}
                />
              ) : (
                <Input
                  type="number"
                  defaultValue={fork.repeats ?? 2}
                  key={`${fork.id}-repeats`}
                  onBlur={(e) => saveFork(fork, { repeats: Number(e.currentTarget.value) || 2 }).then(invalidate)}
                />
              )}
            </div>
            <Input defaultValue={fork.label} key={`${fork.id}-label`} onBlur={(e) => saveFork(fork, { label: e.currentTarget.value }).then(invalidate)} />
            <div className="flex flex-wrap gap-2">
              <select className={selectClass} value={fork.action} onChange={(e) => saveFork(fork, { action: e.target.value as ForkAction }).then(invalidate)}>
                {(Object.keys(FORK_ACTION_LABEL) as ForkAction[]).map((a) => (
                  <option key={a} value={a}>
                    {FORK_ACTION_LABEL[a]}
                  </option>
                ))}
              </select>
              <Input
                className="flex-1 min-w-40"
                defaultValue={fork.target}
                key={`${fork.id}-target`}
                onBlur={(e) => saveFork(fork, { target: e.currentTarget.value }).then(invalidate)}
              />
              <select className={selectClass} value={fork.kindId ?? ""} onChange={(e) => saveFork(fork, { kindId: e.target.value || undefined }).then(invalidate)}>
                <option value="">Все типы</option>
                {kinds.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>
          </article>
        );
      })}

      <form
        className="rounded-xl bg-surface p-3 space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const name = String(fd.get("name") ?? "").trim();
          const match = String(fd.get("match") ?? "").trim();
          const action = String(fd.get("action") ?? "site") as ForkAction;
          const target = String(fd.get("target") ?? "").trim();
          const label = String(fd.get("label") ?? "").trim();
          const kindId = String(fd.get("kindId") ?? "");
          const afterMin = Number(fd.get("afterMin") || 5);
          const repeats = Number(fd.get("repeats") || 2);
          if (!name || !target || !label) return;
          if ((newTrigger === "keyword" || newTrigger === "document") && !match) return;
          await upsertForkFn({
            data: {
              name,
              match,
              trigger: newTrigger,
              afterMin: newTrigger === "silence" ? afterMin : undefined,
              repeats: newTrigger === "repeats" ? repeats : undefined,
              action,
              target,
              label,
              kindId,
            },
          });
          form.reset();
          setNewTrigger("keyword");
          invalidate();
        }}
      >
        <div className="text-xs text-subtle">Новая развилка</div>
        <div className="grid gap-2 md:grid-cols-2">
          <Input name="name" placeholder="Имя" />
          <select className={selectClass} value={newTrigger} onChange={(e) => setNewTrigger(e.target.value as ForkTrigger)}>
            {(Object.keys(FORK_TRIGGER_LABEL) as ForkTrigger[]).map((t) => (
              <option key={t} value={t}>
                {FORK_TRIGGER_LABEL[t]}
              </option>
            ))}
          </select>
          {newTrigger === "keyword" || newTrigger === "document" ? (
            <Input name="match" className="font-mono text-xs" placeholder={newTrigger === "document" ? "invoice|акт" : "оплат|счёт"} />
          ) : newTrigger === "silence" ? (
            <Input name="afterMin" type="number" defaultValue={5} />
          ) : (
            <Input name="repeats" type="number" defaultValue={2} />
          )}
          <Input name="label" placeholder="Что увидит клиент" />
          <Input name="target" placeholder="https://… или CRM-ID или sofia" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select name="action" className={selectClass} defaultValue="site">
            {(Object.keys(FORK_ACTION_LABEL) as ForkAction[]).map((a) => (
              <option key={a} value={a}>
                {FORK_ACTION_LABEL[a]}
              </option>
            ))}
          </select>
          <select name="kindId" className={selectClass} defaultValue="">
            <option value="">Все типы</option>
            {kinds.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name}
              </option>
            ))}
          </select>
          <Button type="submit" size="sm">
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
}

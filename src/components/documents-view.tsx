import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Button } from "@/components/ui";
import { processDocFn } from "@/lib/relay/actions";
import { DOC_LABEL, formatAgo } from "@/lib/relay/format";
import type { DocStatus, Snapshot } from "@/lib/relay/types";

const COLS: { id: DocStatus; title: string }[] = [
  { id: "inbox", title: "Входящие" },
  { id: "classified", title: "Разобраны" },
  { id: "routed", title: "В очереди" },
  { id: "done", title: "Готово" },
];

export function DocumentsView({ snap }: { snap: Snapshot }) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-0 overflow-auto">
      <div className="grid gap-3 p-4 md:grid-cols-4">
        {COLS.map((col) => {
          const docs = snap.documents.filter((d) => d.status === col.id);
          return (
            <section key={col.id} className="rounded-xl bg-surface p-2 min-w-0">
              <div className="flex items-center justify-between px-2 py-2">
                <h2 className="text-sm font-medium">{col.title}</h2>
                <span className="text-xs text-subtle tabular-nums">{docs.length}</span>
              </div>
              <div className="space-y-2">
                {docs.map((d) => {
                  const chat = snap.chats.find((c) => c.id === d.chatId);
                  return (
                    <article key={d.id} className="rounded-lg bg-elevated p-3 shadow-[var(--shadow-border)]">
                      <div className="text-sm truncate">{d.name}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Badge tone="muted">{DOC_LABEL[d.kind]}</Badge>
                        <span className="text-xs text-subtle">{d.sizeKb} КБ</span>
                      </div>
                      <p className="mt-2 text-xs text-muted leading-relaxed">{d.summary}</p>
                      <dl className="mt-2 space-y-1">
                        {Object.entries(d.fields).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2 text-xs">
                            <dt className="text-subtle">{k}</dt>
                            <dd className="text-fg truncate">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          type="button"
                          className="text-xs text-muted hover:text-fg"
                          onClick={() => chat && navigate({ to: "/", search: { chat: chat.id } })}
                        >
                          {chat?.title ?? "диалог"} · {formatAgo(d.at, snap.now)}
                        </button>
                        {d.status !== "done" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              await processDocFn({ data: { documentId: d.id } });
                              qc.invalidateQueries({ queryKey: ["relay"] });
                            }}
                          >
                            Разобрать
                          </Button>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

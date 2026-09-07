import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChannelMark } from "@/components/marks";
import { Badge, Button, Input } from "@/components/ui";
import { CHANNEL_META } from "@/lib/relay/catalog";
import { connectChannelFn, disconnectChannelFn } from "@/lib/relay/actions";
import { formatAgo } from "@/lib/relay/format";
import type { ChannelId, Snapshot } from "@/lib/relay/types";

export function ChannelsView({ snap }: { snap: Snapshot }) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="grid gap-3 md:grid-cols-2 max-w-4xl">
        {snap.channels.map((ch) => (
          <ChannelCard key={ch.id} snap={snap} id={ch.id} />
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-xs text-subtle leading-relaxed">
        Токены живут в памяти сервера этой сессии и не пишутся в базу. Без токена канал работает как живое демо: входящие появляются сами, MCP-инструменты отвечают мгновенно.
      </p>
    </div>
  );
}

function ChannelCard({ snap, id }: { snap: Snapshot; id: ChannelId }) {
  const ch = snap.channels.find((c) => c.id === id)!;
  const meta = CHANNEL_META[id];
  const qc = useQueryClient();
  const [token, setToken] = useState("");
  const [extra, setExtra] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <article className="rounded-xl bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-muted">
          <ChannelMark id={id} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium">{ch.name}</h2>
            <Badge tone={ch.demo ? "warn" : "sage"}>{ch.demo ? "демо" : "живой"}</Badge>
          </div>
          <div className="mt-1 text-xs text-muted truncate">{ch.account}</div>
        </div>
        <div className="text-right text-xs text-subtle tabular-nums">
          <div>{ch.latencyMs} мс</div>
          <div>{formatAgo(ch.lastEventAt, snap.now)}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-elevated px-3 py-2">
          <div className="text-xs text-subtle">Входящие</div>
          <div className="text-lg tabular-nums">{ch.inbound}</div>
        </div>
        <div className="rounded-lg bg-elevated px-3 py-2">
          <div className="text-xs text-subtle">Исходящие</div>
          <div className="text-lg tabular-nums">{ch.outbound}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted leading-relaxed">{meta.hint}</p>
      <form
        className="mt-3 space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError(null);
          try {
            await connectChannelFn({ data: { channelId: id, token, extra: extra || undefined } });
            setToken("");
            setExtra("");
            qc.invalidateQueries({ queryKey: ["relay"] });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Не удалось подключить");
          } finally {
            setPending(false);
          }
        }}
      >
        <Input
          type="password"
          autoComplete="off"
          placeholder="Токен бота / Cloud API"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        {meta.extraLabel ? (
          <Input
            placeholder={meta.extraPlaceholder ?? meta.extraLabel}
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        ) : null}
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={!token.trim() || pending}>
            {pending ? "Проверка…" : "Подключить"}
          </Button>
          {!ch.demo ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={async () => {
                await disconnectChannelFn({ data: { channelId: id } });
                qc.invalidateQueries({ queryKey: ["relay"] });
              }}
            >
              Демо
            </Button>
          ) : null}
        </div>
      </form>
    </article>
  );
}

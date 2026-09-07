import { useState } from "react";
import { Badge, Button, Textarea } from "@/components/ui";
import { MCP_TOOLS } from "@/lib/relay/catalog";
import type { Snapshot } from "@/lib/relay/types";
import { formatAgo } from "@/lib/relay/format";
import { cn } from "@/lib/utils";

const PRESETS: { label: string; body: unknown }[] = [
  { label: "initialize", body: { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "relay-ui", version: "1.0" } } } },
  { label: "tools/list", body: { jsonrpc: "2.0", id: 2, method: "tools/list" } },
  { label: "list_chats", body: { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "list_chats", arguments: { unread: true } } } },
  { label: "get_stats", body: { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_stats", arguments: {} } } },
  { label: "send_message", body: { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "send_message", arguments: { chat_id: "c1", text: "Трекинг NL-4821: в пути, слот на рампе 21:40." } } } },
  { label: "list_kinds", body: { jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "list_kinds", arguments: {} } } },
  { label: "list_knowledge", body: { jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "list_knowledge", arguments: { kind_id: "k-track" } } } },
  { label: "test_fork", body: { jsonrpc: "2.0", id: 8, method: "tools/call", params: { name: "test_fork", arguments: { text: "Не пришёл трекинг по NL-4821", kind_id: "k-track" } } } },
];

export function McpView({ snap }: { snap: Snapshot }) {
  const [req, setReq] = useState(JSON.stringify(PRESETS[2]?.body, null, 2));
  const [res, setRes] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const endpoint = typeof window !== "undefined" ? `${window.location.origin}/api/mcp` : "/api/mcp";

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="grid gap-6 p-4 lg:grid-cols-[1fr_1fr] max-w-6xl">
        <section className="rounded-xl bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium">Эндпоинт</h2>
              <p className="mt-1 text-xs text-muted">Streamable HTTP, JSON-RPC 2.0. Claude, Cursor, n8n — POST сюда.</p>
            </div>
            <Badge tone="sage">{snap.stats.mcpLastMs} мс</Badge>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-elevated px-3 py-2">
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-fg">{endpoint}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await navigator.clipboard.writeText(endpoint);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
            >
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </div>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-elevated p-3 font-mono text-[11px] text-muted leading-relaxed">{`{
  "mcpServers": {
    "relay": { "url": "${endpoint}" }
  }
}`}</pre>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Вызовы", snap.stats.mcpCalls],
              ["Аптайм", `${Math.round(snap.stats.uptimeMs / 1000)} с`],
              ["Tools", MCP_TOOLS.length],
            ].map(([k, v]) => (
              <div key={String(k)} className="rounded-lg bg-elevated px-3 py-2">
                <div className="text-xs text-subtle">{k}</div>
                <div className="text-sm tabular-nums">{v}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-surface p-4">
          <h2 className="text-sm font-medium">Playground</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <Button key={p.label} size="sm" variant="ghost" onClick={() => setReq(JSON.stringify(p.body, null, 2))}>
                {p.label}
              </Button>
            ))}
          </div>
          <Textarea className="mt-3 min-h-40 font-mono text-xs" value={req} onChange={(e) => setReq(e.target.value)} />
          <Button
            className="mt-2"
            size="sm"
            disabled={pending}
            onClick={async () => {
              setPending(true);
              const t0 = performance.now();
              try {
                const r = await fetch("/api/mcp", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Accept: "application/json" },
                  body: req,
                });
                const json = await r.json();
                setRes(`${Math.round(performance.now() - t0)} мс · HTTP ${r.status}\n${JSON.stringify(json, null, 2)}`);
              } catch (err) {
                setRes(err instanceof Error ? err.message : "ошибка");
              } finally {
                setPending(false);
              }
            }}
          >
            {pending ? "Вызов…" : "Выполнить"}
          </Button>
          {res ? <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-elevated p-3 font-mono text-[11px] text-muted whitespace-pre-wrap">{res}</pre> : null}
        </section>
      </div>

      <section className="px-4 pb-4 max-w-6xl">
        <h2 className="text-sm font-medium mb-3">Инструменты</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {MCP_TOOLS.map((tool) => (
            <button
              key={tool.name}
              type="button"
              className="rounded-xl bg-surface p-4 text-left transition-[box-shadow] duration-150 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              onClick={() =>
                setReq(
                  JSON.stringify(
                    { jsonrpc: "2.0", id: 9, method: "tools/call", params: { name: tool.name, arguments: {} } },
                    null,
                    2,
                  ),
                )
              }
            >
              <div className="font-mono text-xs text-accent">{tool.name}</div>
              <p className="mt-1 text-sm text-muted leading-relaxed">{tool.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-8 max-w-6xl">
        <h2 className="text-sm font-medium mb-3">Журнал вызовов</h2>
        <div className="overflow-hidden rounded-xl bg-surface">
          {snap.mcpLog.map((row, i) => (
            <div
              key={row.id}
              className={cn("flex items-center gap-3 px-4 py-2.5 text-sm", i !== 0 && "border-t border-line")}
            >
              <span className={cn("size-1.5 rounded-full", row.ok ? "bg-ok" : "bg-danger")} />
              <span className="font-mono text-xs text-muted w-28 truncate">{row.method}</span>
              <span className="flex-1 truncate text-xs">{row.tool ?? "—"}</span>
              <span className="text-xs text-subtle tabular-nums">{row.ms} мс</span>
              <span className="text-xs text-subtle w-14 text-right">{formatAgo(row.at, snap.now)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FileText, Inbox, Layers, Plug, Radio } from "lucide-react";
import type { ReactNode } from "react";
import { RelayMark } from "@/components/marks";
import { cn } from "@/lib/utils";
import { useRelay } from "@/lib/relay/use-relay";

const NAV = [
  { to: "/", label: "Входящие", icon: Inbox, match: (p: string) => p === "/" },
  { to: "/queues", label: "Очереди", icon: Layers, match: (p: string) => p.startsWith("/queues") },
  { to: "/playbooks", label: "Сценарии", icon: BookOpen, match: (p: string) => p.startsWith("/playbooks") },
  { to: "/documents", label: "Файлы", icon: FileText, match: (p: string) => p.startsWith("/documents") },
  { to: "/channels", label: "Каналы", icon: Plug, match: (p: string) => p.startsWith("/channels") },
  { to: "/mcp", label: "MCP", icon: Radio, match: (p: string) => p.startsWith("/mcp") },
] as const;

export function AppShell({ children, title, action }: { children: ReactNode; title?: string; action?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data } = useRelay();
  const unread = data?.chats.reduce((n, c) => n + c.unread, 0) ?? 0;
  const live = data?.stats.mcpLastMs ?? 0;
  const demo = data?.channels.every((c) => c.demo) ?? true;

  return (
    <div className="flex h-dvh min-h-0 bg-bg text-fg">
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-line px-3 py-4">
        <div className="flex items-center gap-2 px-2 mb-6">
          <span className="flex size-8 items-center justify-center rounded-md bg-elevated text-accent">
            <RelayMark />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium tracking-tight">Relay</div>
            <div className="text-xs text-muted truncate">{data?.workspace ?? "Нордлайн"}</div>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-md px-2.5 text-sm transition-[background-color,color] duration-150",
                  active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                )}
              >
                <Icon className="size-4" strokeWidth={1.7} />
                <span className="flex-1">{item.label}</span>
                {item.to === "/" && unread > 0 ? (
                  <span className="tabular-nums text-xs text-accent">{unread}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-2 pt-4 text-xs text-subtle">
          <div className="flex items-center gap-2">
            <span className={cn("size-1.5 rounded-full", demo ? "bg-warn" : "bg-ok")} />
            MCP {live ? `${live} мс` : "онлайн"}
          </div>
          <div className="mt-1">{demo ? "Демо-каналы" : "Живые токены"}</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {title ? (
          <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line px-4 md:px-5">
            <h1 className="text-sm font-medium tracking-tight">{title}</h1>
            {action}
          </header>
        ) : null}
        <div className="min-h-0 flex-1 overflow-hidden pb-16 md:pb-0">{children}</div>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 flex h-16 border-t border-line bg-bg/95 px-1 pb-[env(safe-area-inset-bottom)]">
        {NAV.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] tracking-wide",
                active ? "text-fg" : "text-subtle",
              )}
            >
              <Icon className="size-5" strokeWidth={1.7} />
              {item.label}
              {item.to === "/" && unread > 0 ? (
                <span className="absolute top-1.5 right-[calc(50%-18px)] size-1.5 rounded-full bg-accent" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

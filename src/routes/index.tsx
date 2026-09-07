import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { InboxView } from "@/components/inbox-view";
import { getSnapshot } from "@/lib/relay/actions";
import { useRelay } from "@/lib/relay/use-relay";

type Search = { chat?: string };

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    chat: typeof raw.chat === "string" ? raw.chat : undefined,
  }),
  loader: () => getSnapshot(),
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const { chat } = Route.useSearch();
  const { data } = useRelay(initial);
  const snap = data ?? initial;
  return (
    <AppShell>
      <InboxView snap={snap} selectedId={chat} />
    </AppShell>
  );
}

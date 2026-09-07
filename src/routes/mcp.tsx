import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { McpView } from "@/components/mcp-view";
import { getSnapshot } from "@/lib/relay/actions";
import { useRelay } from "@/lib/relay/use-relay";

export const Route = createFileRoute("/mcp")({
  loader: () => getSnapshot(),
  component: McpPage,
});

function McpPage() {
  const initial = Route.useLoaderData();
  const { data } = useRelay(initial);
  return (
    <AppShell title="MCP-сервер">
      <McpView snap={data ?? initial} />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { QueuesView } from "@/components/queues-view";
import { getSnapshot } from "@/lib/relay/actions";
import { useRelay } from "@/lib/relay/use-relay";

export const Route = createFileRoute("/queues")({
  loader: () => getSnapshot(),
  component: QueuesPage,
});

function QueuesPage() {
  const initial = Route.useLoaderData();
  const { data } = useRelay(initial);
  return (
    <AppShell title="Очереди и маршрутизация">
      <QueuesView snap={data ?? initial} />
    </AppShell>
  );
}

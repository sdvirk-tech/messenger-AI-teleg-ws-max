import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PlaybooksView } from "@/components/playbooks-view";
import { getSnapshot } from "@/lib/relay/actions";
import { useRelay } from "@/lib/relay/use-relay";

export const Route = createFileRoute("/playbooks")({
  loader: () => getSnapshot(),
  component: PlaybooksPage,
});

function PlaybooksPage() {
  const initial = Route.useLoaderData();
  const { data } = useRelay(initial);
  return (
    <AppShell title="Справочник бесед">
      <PlaybooksView snap={data ?? initial} />
    </AppShell>
  );
}

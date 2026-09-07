import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DocumentsView } from "@/components/documents-view";
import { getSnapshot } from "@/lib/relay/actions";
import { useRelay } from "@/lib/relay/use-relay";

export const Route = createFileRoute("/documents")({
  loader: () => getSnapshot(),
  component: DocumentsPage,
});

function DocumentsPage() {
  const initial = Route.useLoaderData();
  const { data } = useRelay(initial);
  return (
    <AppShell title="Документы">
      <DocumentsView snap={data ?? initial} />
    </AppShell>
  );
}

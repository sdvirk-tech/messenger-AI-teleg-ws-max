import { createFileRoute } from "@tanstack/react-router";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

function withCors(res: Response) {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, headers });
}

export const Route = createFileRoute("/api/mcp")({
  server: {
    handlers: {
      OPTIONS: async () => withCors(new Response(null, { status: 204 })),
      GET: async ({ request }) => {
        const { mcpHealth } = await import("@/lib/relay/mcp.server");
        const accept = request.headers.get("accept") ?? "";
        if (accept.includes("text/event-stream")) {
          const body = `: relay ready\n\nevent: endpoint\ndata: /api/mcp\n\n`;
          return withCors(
            new Response(body, {
              headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
              },
            }),
          );
        }
        return withCors(Response.json(mcpHealth()));
      },
      POST: async ({ request }) => {
        const { handleMcpRpc } = await import("@/lib/relay/mcp.server");
        let rpc: { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };
        try {
          rpc = (await request.json()) as typeof rpc;
        } catch {
          return withCors(Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 }));
        }
        const result = await handleMcpRpc(rpc);
        if (result === null) return withCors(new Response(null, { status: 202 }));
        const headers: Record<string, string> = { "Mcp-Session-Id": "relay-live" };
        return withCors(Response.json(result, { headers }));
      },
      DELETE: async () => withCors(new Response(null, { status: 204 })),
    },
  },
});

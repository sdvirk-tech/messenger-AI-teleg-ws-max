import { createFileRoute } from "@tanstack/react-router";
import type { ChannelId } from "@/lib/relay/types";

function asChannel(raw: string): ChannelId | null {
  if (raw === "telegram" || raw === "whatsapp" || raw === "max" || raw === "vk") return raw;
  return null;
}

export const Route = createFileRoute("/api/webhooks/$channel")({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        const channel = asChannel(params.channel);
        if (!channel) return Response.json({ ok: false, error: "unknown channel" }, { status: 404 });
        const { addIncoming } = await import("@/lib/relay/engine.server");
        const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;

        if (channel === "telegram") {
          const msg = payload.message as { text?: string; chat?: { id?: number; title?: string; first_name?: string }; from?: { first_name?: string } } | undefined;
          const text = msg?.text;
          if (text) {
            addIncoming({
              channel: "telegram",
              title: msg?.chat?.title || msg?.from?.first_name || "Telegram",
              peerId: String(msg?.chat?.id ?? "tg"),
              text,
            });
          }
        } else if (channel === "max") {
          const message = payload.message as { body?: { text?: string }; sender?: { name?: string; user_id?: number } } | undefined;
          const text = message?.body?.text ?? (payload.text as string | undefined);
          if (text) {
            addIncoming({
              channel: "max",
              title: message?.sender?.name || "MAX",
              peerId: String(message?.sender?.user_id ?? "max"),
              text,
            });
          }
        } else if (channel === "whatsapp") {
          const entry = (payload.entry as { changes?: { value?: { messages?: { from?: string; text?: { body?: string } }[]; contacts?: { profile?: { name?: string } }[] } }[] }[] | undefined)?.[0];
          const value = entry?.changes?.[0]?.value;
          const msg = value?.messages?.[0];
          const text = msg?.text?.body;
          if (text) {
            addIncoming({
              channel: "whatsapp",
              title: value?.contacts?.[0]?.profile?.name || msg?.from || "WhatsApp",
              peerId: msg?.from || "wa",
              text,
            });
          }
        } else {
          const text = String(payload.text ?? payload.body ?? "");
          if (text) addIncoming({ channel: "vk", title: String(payload.title ?? "VK"), peerId: String(payload.peerId ?? "vk"), text });
        }

        return Response.json({ ok: true });
      },
    },
  },
});

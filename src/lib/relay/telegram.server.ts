const TG = "https://api.telegram.org";

type TgUser = { id: number; username?: string; first_name: string; last_name?: string };

function display(u?: TgUser) {
  if (!u) return "Telegram";
  return [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || String(u.id);
}

export async function telegramGetMe(token: string) {
  const res = await fetch(`${TG}/bot${token}/getMe`);
  const body = (await res.json()) as { ok: boolean; description?: string; result?: TgUser & { username?: string } };
  if (!body.ok || !body.result) throw new Error(body.description || "Telegram getMe failed");
  return body.result;
}

export async function telegramSend(token: string, chatId: string, text: string) {
  const res = await fetch(`${TG}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const body = (await res.json()) as { ok: boolean; description?: string };
  if (!body.ok) throw new Error(body.description || "Telegram send failed");
}

export async function telegramGetUpdates(token: string, offset: number) {
  const url = `${TG}/bot${token}/getUpdates?offset=${offset}&limit=20&timeout=0`;
  const res = await fetch(url);
  const body = (await res.json()) as {
    ok: boolean;
    result?: {
      update_id: number;
      message?: { chat: { id: number; title?: string; first_name?: string; username?: string; type: string }; from?: TgUser; text?: string };
    }[];
  };
  if (!body.ok || !body.result) return { updates: [] as { peerId: string; title: string; text: string }[], nextOffset: offset };
  let next = offset;
  const updates = [];
  for (const u of body.result) {
    next = Math.max(next, u.update_id + 1);
    const msg = u.message;
    const text = msg?.text;
    if (!msg || !text) continue;
    const chat = msg.chat;
    updates.push({
      peerId: String(chat.id),
      title: chat.title || display(msg.from),
      text,
    });
  }
  return { updates, nextOffset: next };
}

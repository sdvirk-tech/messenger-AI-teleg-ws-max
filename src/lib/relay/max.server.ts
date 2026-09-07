const MAX_API = "https://platform-api2.max.ru";

type MaxMe = { name?: string; username?: string; user_id?: number };

export async function maxGetMe(token: string) {
  const res = await fetch(`${MAX_API}/me`, { headers: { Authorization: token } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t.slice(0, 180) || `MAX ${res.status}`);
  }
  return (await res.json()) as MaxMe;
}

export async function maxSend(token: string, peerId: string, text: string) {
  const numeric = peerId.replace(/^max:/, "");
  const asUser = !numeric.startsWith("-");
  const qs = asUser ? `user_id=${encodeURIComponent(numeric)}` : `chat_id=${encodeURIComponent(numeric)}`;
  const res = await fetch(`${MAX_API}/messages?${qs}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t.slice(0, 180) || `MAX send ${res.status}`);
  }
}

export async function maxGetUpdates(token: string, marker?: number) {
  const qs = marker ? `?marker=${marker}&limit=20&timeout=0` : "?limit=20&timeout=0";
  const res = await fetch(`${MAX_API}/updates${qs}`, { headers: { Authorization: token } });
  if (!res.ok) return { updates: [] as { peerId: string; title: string; text: string }[], marker };
  const body = (await res.json()) as {
    marker?: number;
    updates?: {
      update_type?: string;
      message?: { body?: { text?: string }; sender?: { name?: string; user_id?: number }; recipient?: { chat_id?: number } };
    }[];
  };
  const updates = [];
  for (const u of body.updates ?? []) {
    const text = u.message?.body?.text;
    if (!text) continue;
    const userId = u.message?.sender?.user_id;
    const chatId = u.message?.recipient?.chat_id;
    updates.push({
      peerId: userId ? String(userId) : String(chatId ?? "max"),
      title: u.message?.sender?.name || "MAX",
      text,
    });
  }
  return { updates, marker: body.marker ?? marker };
}

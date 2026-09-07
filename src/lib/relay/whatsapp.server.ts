const GRAPH = "https://graph.facebook.com/v21.0";

export async function whatsappVerify(token: string, phoneNumberId: string) {
  const res = await fetch(`${GRAPH}/${phoneNumberId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t.slice(0, 180) || `WhatsApp ${res.status}`);
  }
}

export async function whatsappSend(token: string, phoneNumberId: string, to: string, text: string) {
  if (!phoneNumberId) throw new Error("Нет Phone Number ID");
  const res = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to.replace(/\D/g, ""),
      type: "text",
      text: { body: text },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t.slice(0, 180) || `WhatsApp send ${res.status}`);
  }
}

import type { ChannelId, DocKind, EscalationTrigger, ForkAction, ForkTrigger, Priority, RouteSource, TicketStatus } from "./types";

export function formatClock(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function formatAgo(iso: string, nowIso?: string): string {
  const now = nowIso ? new Date(nowIso).getTime() : Date.now();
  const t = new Date(iso).getTime();
  const sec = Math.max(0, Math.round((now - t) / 1000));
  if (sec < 45) return "сейчас";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} мин`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} ч`;
  const d = Math.round(h / 24);
  return `${d} д`;
}

export function slaLeft(dueIso: string, nowIso?: string): { label: string; tone: "ok" | "warn" | "danger" } {
  const now = nowIso ? new Date(nowIso).getTime() : Date.now();
  const due = new Date(dueIso).getTime();
  const min = Math.round((due - now) / 60000);
  if (min < 0) return { label: `+${Math.abs(min)} мин`, tone: "danger" };
  if (min <= 5) return { label: `${min} мин`, tone: "danger" };
  if (min <= 15) return { label: `${min} мин`, tone: "warn" };
  return { label: `${min} мин`, tone: "ok" };
}

export const CHANNEL_LABEL: Record<ChannelId, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  max: "MAX",
  vk: "VK",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  p0: "P0",
  p1: "P1",
  p2: "P2",
  p3: "P3",
};

export const STATUS_LABEL: Record<TicketStatus, string> = {
  open: "Открыт",
  pending: "Ожидает",
  assigned: "Назначен",
  resolved: "Закрыт",
};

export const ROUTE_SOURCE_LABEL: Record<RouteSource, string> = {
  inbound: "входящее",
  apply: "прогон",
  manual: "вручную",
  document: "файл",
  probe: "проверка",
  escalate: "эскалация",
};

export const ESCALATION_TRIGGER_LABEL: Record<EscalationTrigger, string> = {
  keyword: "текст",
  sla: "просрочен SLA",
  silence: "нет ответа",
  repeats: "повторы клиента",
};

export const FORK_TRIGGER_LABEL: Record<ForkTrigger, string> = {
  keyword: "текст",
  document: "файл",
  silence: "нет ответа",
  repeats: "повторы клиента",
};

export const FORK_ACTION_LABEL: Record<ForkAction, string> = {
  site: "раздел сайта",
  crm: "карточка CRM",
  manager: "менеджер",
  queue: "очередь",
  url: "ссылка",
};

export const DOC_LABEL: Record<DocKind, string> = {
  invoice: "Счёт",
  contract: "Договор",
  identity: "Документ",
  resume: "Резюме",
  act: "Акт",
  other: "Файл",
};

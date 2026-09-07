export type ChannelId = "telegram" | "whatsapp" | "max" | "vk";

export type Priority = "p0" | "p1" | "p2" | "p3";

export type TicketStatus = "open" | "pending" | "assigned" | "resolved";

export type DocKind = "invoice" | "contract" | "identity" | "resume" | "act" | "other";

export type DocStatus = "inbox" | "classified" | "routed" | "done";

export type MessageAuthor = "user" | "agent" | "bot" | "system";

export type Channel = {
  id: ChannelId;
  name: string;
  connected: boolean;
  demo: boolean;
  account: string;
  tokenSet: boolean;
  extraSet: boolean;
  lastEventAt: string;
  inbound: number;
  outbound: number;
  latencyMs: number;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  kind: "human" | "bot" | "ai";
  online: boolean;
  load: number;
};

export type Queue = {
  id: string;
  name: string;
  slaMin: number;
  color: "stone" | "sage" | "warn" | "danger";
};

export type Chat = {
  id: string;
  channel: ChannelId;
  title: string;
  peerId: string;
  preview: string;
  lastAt: string;
  unread: number;
  ticketId: string;
  muted: boolean;
  kindId?: string;
  forkHits?: ForkHit[];
};

export type Attachment = {
  id: string;
  name: string;
  kind: DocKind;
  sizeKb: number;
  documentId: string;
};

export type Message = {
  id: string;
  chatId: string;
  author: MessageAuthor;
  agentName?: string;
  text: string;
  at: string;
  attachments?: Attachment[];
};

export type Ticket = {
  id: string;
  chatId: string;
  queueId: string;
  priority: Priority;
  status: TicketStatus;
  assigneeId: string | null;
  openedAt: string;
  slaDueAt: string;
  reason: string;
  escalatedBy?: string;
};

export type Document = {
  id: string;
  chatId: string;
  name: string;
  kind: DocKind;
  status: DocStatus;
  sizeKb: number;
  at: string;
  fields: Record<string, string>;
  summary: string;
};

export type RouteSource = "inbound" | "apply" | "manual" | "document" | "probe" | "escalate";

export type RouteEvent = {
  id: string;
  at: string;
  source: RouteSource;
  chatId?: string;
  chatTitle?: string;
  ticketId?: string;
  channel: ChannelId;
  text: string;
  fromQueue?: string;
  toQueue: string;
  priority: Priority;
  ruleId: string;
  ruleName: string;
  agentId?: string;
  skipped?: boolean;
  skipReason?: string;
};

export type ForkAction = "site" | "crm" | "manager" | "queue" | "url";

export type ForkTrigger = "keyword" | "document" | "silence" | "repeats";

export type TalkKind = {
  id: string;
  name: string;
  match: string;
  queueId: string;
  prompt: string;
  description: string;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  body: string;
  kindIds: string[];
};

export type Fork = {
  id: string;
  name: string;
  enabled: boolean;
  kindId?: string;
  trigger: ForkTrigger;
  match: string;
  afterMin?: number;
  repeats?: number;
  action: ForkAction;
  target: string;
  label: string;
};

export type ForkHit = {
  id: string;
  forkId: string;
  at: string;
  name: string;
  action: ForkAction;
  target: string;
  label: string;
  trigger?: ForkTrigger;
};

export type EscalationTrigger = "keyword" | "sla" | "silence" | "repeats";

export type EscalationPolicy = {
  id: string;
  name: string;
  enabled: boolean;
  trigger: EscalationTrigger;
  match?: string;
  afterMin?: number;
  repeats?: number;
  fromQueues?: string[];
  queueId: string;
  priority: Priority;
  agentId?: string;
};

export type Rule = {
  id: string;
  name: string;
  enabled: boolean;
  match: string;
  queueId: string;
  priority?: Priority;
  channel?: ChannelId;
  agentId?: string;
};

export type McpCall = {
  id: string;
  at: string;
  method: string;
  tool?: string;
  ok: boolean;
  ms: number;
};

export type Stats = {
  open: number;
  waiting: number;
  breached: number;
  mcpCalls: number;
  mcpLastMs: number;
  uptimeMs: number;
  injected: number;
};

export type Snapshot = {
  now: string;
  workspace: string;
  channels: Channel[];
  queues: Queue[];
  agents: Agent[];
  chats: Chat[];
  messages: Message[];
  tickets: Ticket[];
  documents: Document[];
  rules: Rule[];
  escalations: EscalationPolicy[];
  kinds: TalkKind[];
  knowledge: KnowledgeArticle[];
  forks: Fork[];
  mcpLog: McpCall[];
  routeLog: RouteEvent[];
  stats: Stats;
  templates: { id: string; title: string; body: string }[];
};

export type ConnectInput = {
  channelId: ChannelId;
  token: string;
  extra?: string;
};

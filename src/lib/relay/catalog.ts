import type { ChannelId, EscalationPolicy, Fork, KnowledgeArticle, Queue, Rule, Agent, TalkKind } from "./types";

export const QUEUES: Queue[] = [
  { id: "vip", name: "VIP", slaMin: 5, color: "danger" },
  { id: "support", name: "Поддержка", slaMin: 15, color: "stone" },
  { id: "sales", name: "Продажи", slaMin: 30, color: "sage" },
  { id: "docs", name: "Документы", slaMin: 120, color: "warn" },
  { id: "hr", name: "HR", slaMin: 240, color: "sage" },
  { id: "escalation", name: "Эскалация", slaMin: 15, color: "danger" },
];

export const AGENTS: Agent[] = [
  { id: "sofia", name: "София Левина", role: "Поддержка", kind: "human", online: true, load: 4 },
  { id: "dmitry", name: "Дмитрий Орлов", role: "Продажи", kind: "human", online: true, load: 2 },
  { id: "relay-bot", name: "Relay Bot", role: "Маршрутизация", kind: "bot", online: true, load: 11 },
  { id: "grok", name: "Grok", role: "Автоответы", kind: "ai", online: true, load: 3 },
];

export const RULES: Rule[] = [
  { id: "r1", name: "VIP / срочно", enabled: true, match: "vip|срочно|самолёт|самолет|рамп", queueId: "vip", priority: "p0", agentId: "sofia" },
  { id: "r2", name: "Жалоба / возврат", enabled: true, match: "жалоб|претенз|возврат|груб", queueId: "escalation", priority: "p1", agentId: "sofia" },
  { id: "r3", name: "Продажи: ставка и объём", enabled: true, match: "паллет|(?<![а-яё])ставк|коммерч|купить|отгрузк|(?<![а-яё])цен[аыу]", queueId: "sales", priority: "p2", agentId: "dmitry" },
  { id: "r4", name: "WhatsApp → продажи", enabled: true, match: "заказ|доставк|слот", queueId: "sales", priority: "p2", channel: "whatsapp", agentId: "dmitry" },
  { id: "r5", name: "Счёт, акт, договор", enabled: true, match: "сч[её]т|invoice|акт|договор|кс-2|оплат", queueId: "docs", priority: "p2", agentId: "relay-bot" },
  { id: "r6", name: "HR и резюме", enabled: true, match: "резюме|вакан|оффер|hr|resume|cv", queueId: "hr", priority: "p3" },
  { id: "r7", name: "MAX · ведомства", enabled: true, match: "есиа|ведомств|минцифр|пилот|mcp", queueId: "support", priority: "p1", channel: "max", agentId: "sofia" },
  { id: "r8", name: "Склад VK", enabled: true, match: "склад|смена|ворота", queueId: "docs", priority: "p2", channel: "vk", agentId: "relay-bot" },
  { id: "r9", name: "По умолчанию — поддержка", enabled: true, match: "*", queueId: "support", priority: "p2" },
];

export const ESCALATIONS: EscalationPolicy[] = [
  {
    id: "e1",
    name: "Юрист / претензия",
    enabled: true,
    trigger: "keyword",
    match: "претенз|адвокат|роспотреб|прокуратур|(?<![а-яё])иск(?![а-яё])|суд",
    queueId: "escalation",
    priority: "p0",
    agentId: "sofia",
  },
  {
    id: "e2",
    name: "Жалоба поверх оператора",
    enabled: true,
    trigger: "keyword",
    match: "жалоб|возврат|груб|брак",
    queueId: "escalation",
    priority: "p1",
    agentId: "sofia",
  },
  {
    id: "e3",
    name: "SLA просрочен",
    enabled: true,
    trigger: "sla",
    fromQueues: ["support", "sales", "docs", "hr"],
    queueId: "escalation",
    priority: "p1",
    agentId: "sofia",
  },
  {
    id: "e4",
    name: "VIP без ответа",
    enabled: true,
    trigger: "silence",
    afterMin: 5,
    fromQueues: ["vip"],
    queueId: "escalation",
    priority: "p0",
    agentId: "sofia",
  },
  {
    id: "e5",
    name: "Клиент пишет третье",
    enabled: true,
    trigger: "repeats",
    repeats: 4,
    fromQueues: ["support", "sales", "vip"],
    queueId: "escalation",
    priority: "p1",
    agentId: "sofia",
  },
];

export const TALK_KINDS: TalkKind[] = [
  {
    id: "k-vip",
    name: "VIP / срочный груз",
    match: "vip|срочно|самолёт|самолет|рамп",
    queueId: "vip",
    description: "Рейс, рампа, минуты. Короткий статус, без очереди.",
    prompt:
      "Ты старший смены Нордлайн по VIP. Клиент уже на объекте или у самолёта. Ответ: 1–3 коротких предложения, статус машины/груза, следующий шаг в минутах. Не извиняйся длинно. Не обещай то, чего нет в базе знаний.",
  },
  {
    id: "k-complaint",
    name: "Жалоба / возврат",
    match: "жалоб|претенз|возврат|груб|брак",
    queueId: "escalation",
    description: "Конфликт, возврат, грубость. Не спорить, фиксировать факты.",
    prompt:
      "Ты старший смены Нордлайн по претензиям. Признай факт, не оправдывай курьера, скажи что обращение уже у старшего. Один конкретный следующий шаг (возврат / разбор / компенсация). Без канцелярита и без обещания денег, если суммы нет в базе.",
  },
  {
    id: "k-sales",
    name: "Коммерческое",
    match: "паллет|(?<![а-яё])ставк|коммерч|купить|отгрузк|слот|(?<![а-яё])цен[аыу]",
    queueId: "sales",
    description: "Ставка, объём, слот отгрузки.",
    prompt:
      "Ты менеджер продаж Нордлайн. Уточни город, объём (паллет/тонны) и дату слота, если их нет. Не называй цену, которой нет в базе знаний. Коротко, по делу, на «вы».",
  },
  {
    id: "k-docs",
    name: "Документы",
    match: "сч[её]т|invoice|акт|договор|кс-2|оплат",
    queueId: "docs",
    description: "Договор, счёт, акт, оплата.",
    prompt:
      "Ты документ-координатор Нордлайн. Подтверди получение файла, назови тип (договор/счёт/акт) и срок визы. Не выдумывай реквизиты. Если нужна оплата — направь на раздел оплаты из развилки, не присылай новые реквизиты.",
  },
  {
    id: "k-hr",
    name: "HR / резюме",
    match: "резюме|вакан|оффер|hr|resume|cv|логист",
    queueId: "hr",
    description: "Отклик, вакансия, оффер.",
    prompt:
      "Ты HR Нордлайн. Поблагодари за отклик, скажи что резюме в работе, назови срок ответа (до 3 рабочих дней). Не оценивай кандидата. Если просят вакансии — дай ссылку из базы знаний.",
  },
  {
    id: "k-gov",
    name: "Госконтур / MAX",
    match: "есиа|ведомств|минцифр|пилот|mcp",
    queueId: "support",
    description: "Пилот MAX, ЕСИА, MCP.",
    prompt:
      "Ты интегратор Нордлайн. Отвечай предметно: MCP URL, список tools, контур тест/прод. Без маркетинга. Если просят доступ — направь на контур из базы знаний.",
  },
  {
    id: "k-track",
    name: "Трекинг заказа",
    match: "трекинг|NL-\\d+|заказ",
    queueId: "support",
    description: "Где груз, трек-номер, статус.",
    prompt:
      "Ты поддержка Нордлайн по трекингу. Если есть номер NL-**** — подтверди что ищешь статус и дай ссылку на раздел трекинга. Не выдумывай координаты машины. Один уточняющий вопрос, если номера нет.",
  },
  {
    id: "k-general",
    name: "Общая поддержка",
    match: "*",
    queueId: "support",
    description: "Всё, что не разобрали другие типы.",
    prompt:
      "Ты оператор Нордлайн. Короткий ответ на русском, 2–4 предложения. Если не хватает данных — один вопрос. Не выдумывай трекинг, суммы и сроки.",
  },
];

export const KNOWLEDGE: KnowledgeArticle[] = [
  {
    id: "kb-track",
    title: "Трекинг NL",
    body: "Клиентский трекинг: nordline.ru/track + номер вида NL-4821. Статус обновляется раз в 10 минут. Если номера нет в портале — эскалация на смену, не обещать ETA.",
    kindIds: ["k-track", "k-vip"],
  },
  {
    id: "kb-vip-ramp",
    title: "Рампа Шереметьево",
    body: "VIP: рампа 4, контакт смены +7 495 000-12-12 доб. 901. Целевой слот подачи — 40 минут. Статус машины спрашивать у диспетчера, не у клиента.",
    kindIds: ["k-vip"],
  },
  {
    id: "kb-rates",
    title: "Ставки и слоты",
    body: "Коммерческие ставки считает Дмитрий. Нужны: город, паллеты, дата. Слоты чт–пт закрываются в 18:00 накануне. Черновик ставки не является офертой.",
    kindIds: ["k-sales", "k-vip"],
  },
  {
    id: "kb-docs",
    title: "Виза документов",
    body: "Договор — юрист, 1 рабочий день. Счёт — бухгалтерия, 4 часа. Акт КС-2 — склад, до закрытия смены. Оплата: nordline.ru/pay по номеру счёта.",
    kindIds: ["k-docs", "k-sales"],
  },
  {
    id: "kb-return",
    title: "Возврат и претензия",
    body: "Фиксируем дату, ФИО курьера, фото. Возврат инициирует старший смены. Компенсацию не обещаем в чате. Юридическая претензия уходит в CRM-CASE.",
    kindIds: ["k-complaint"],
  },
  {
    id: "kb-esia",
    title: "Пилот MAX / ЕСИА",
    body: "Контур тест: mcp.nordline.ru/api/mcp, tools/list без секретов. Лимит пилота — 2 тыс. диалогов. Прод — только после акта Минцифры. Документация: nordline.ru/docs/mcp.",
    kindIds: ["k-gov"],
  },
  {
    id: "kb-hr",
    title: "Найм логистов",
    body: "Вакансии: nordline.ru/jobs. Отклик — до 3 рабочих дней. Собеседования ведёт HR, не линейный руководитель. Оффер не обсуждаем в мессенджере.",
    kindIds: ["k-hr"],
  },
];

export const FORKS: Fork[] = [
  {
    id: "f-track",
    name: "Портал трекинга",
    enabled: true,
    kindId: "k-track",
    trigger: "keyword",
    match: "трекинг|NL-\\d+",
    action: "site",
    target: "https://nordline.ru/track",
    label: "Открыть статус заказа на сайте",
  },
  {
    id: "f-slot",
    name: "Слот → CRM",
    enabled: true,
    kindId: "k-sales",
    trigger: "keyword",
    match: "слот|четверг|паллет",
    action: "crm",
    target: "CRM-DEAL:kazan-pallet",
    label: "Карточка сделки в CRM",
  },
  {
    id: "f-pay",
    name: "Оплата счёта",
    enabled: true,
    trigger: "keyword",
    match: "оплат|сч[её]т",
    action: "site",
    target: "https://nordline.ru/pay",
    label: "Перейти к оплате",
  },
  {
    id: "f-lawyer",
    name: "Претензия старшему",
    enabled: true,
    kindId: "k-complaint",
    trigger: "keyword",
    match: "возврат|груб|претенз",
    action: "manager",
    target: "sofia",
    label: "Передать старшему смены",
  },
  {
    id: "f-jobs",
    name: "Вакансии",
    enabled: true,
    kindId: "k-hr",
    trigger: "keyword",
    match: "резюме|вакан|логист",
    action: "site",
    target: "https://nordline.ru/jobs",
    label: "Открыть вакансии",
  },
  {
    id: "f-mcp",
    name: "Документация MCP",
    enabled: true,
    kindId: "k-gov",
    trigger: "keyword",
    match: "mcp|есиа|tools",
    action: "url",
    target: "https://nordline.ru/docs/mcp",
    label: "Контур и список tools",
  },
  {
    id: "f-vip-disp",
    name: "Диспетчер рампы",
    enabled: true,
    kindId: "k-vip",
    trigger: "keyword",
    match: "рамп|самолёт|самолет|минут",
    action: "manager",
    target: "sofia",
    label: "Связать с диспетчером рампы",
  },
  {
    id: "f-hr-q",
    name: "Кандидат → HR",
    enabled: true,
    kindId: "k-hr",
    trigger: "keyword",
    match: "резюме|вакан|логист",
    action: "queue",
    target: "hr",
    label: "Перевести кандидата в очередь HR",
  },
  {
    id: "f-doc-pay",
    name: "Счёт во вложении",
    enabled: true,
    trigger: "document",
    match: "invoice|сч[её]т",
    action: "site",
    target: "https://nordline.ru/pay",
    label: "Оплатить по счёту из вложения",
  },
  {
    id: "f-sales-hold",
    name: "Тишина в продажах",
    enabled: true,
    kindId: "k-sales",
    trigger: "silence",
    match: "",
    afterMin: 10,
    action: "crm",
    target: "CRM-DEAL:followup",
    label: "Нет ответа — карточка follow-up в CRM",
  },
  {
    id: "f-track-again",
    name: "Трекинг повторно",
    enabled: true,
    kindId: "k-track",
    trigger: "repeats",
    match: "",
    repeats: 2,
    action: "site",
    target: "https://nordline.ru/track",
    label: "Клиент спрашивает снова — открыть трекинг",
  },
];

export const CHANNEL_META: Record<
  ChannelId,
  { name: string; hint: string; extraLabel?: string; extraPlaceholder?: string }
> = {
  telegram: {
    name: "Telegram",
    hint: "Токен бота от @BotFather. Relay будет слать и забирать апдейты через Bot API.",
  },
  whatsapp: {
    name: "WhatsApp",
    hint: "Cloud API: постоянный токен и Phone Number ID из Meta Business.",
    extraLabel: "Phone Number ID",
    extraPlaceholder: "123456789012345",
  },
  max: {
    name: "MAX",
    hint: "Токен бота MAX (platform-api). Заголовок Authorization без Bearer.",
  },
  vk: {
    name: "VK",
    hint: "Ключ сообщества с правом messages. В демо-режиме очередь уже живая.",
  },
};

export const MCP_TOOLS = [
  {
    name: "list_channels",
    description: "Список мессенджеров и статус подключений (Telegram, WhatsApp, MAX, VK).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_chats",
    description: "Единый инбокс по всем каналам. Фильтр: channel, queue, unread.",
    inputSchema: {
      type: "object",
      properties: {
        channel: { type: "string", enum: ["telegram", "whatsapp", "max", "vk"] },
        queue: { type: "string" },
        unread: { type: "boolean" },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_messages",
    description: "История диалога по chat_id.",
    inputSchema: {
      type: "object",
      properties: {
        chat_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["chat_id"],
      additionalProperties: false,
    },
  },
  {
    name: "send_message",
    description: "Отправить сообщение в чат. Если канал подключён живым токеном — уходит в мессенджер.",
    inputSchema: {
      type: "object",
      properties: {
        chat_id: { type: "string" },
        text: { type: "string" },
        as: { type: "string", enum: ["agent", "bot", "ai"] },
      },
      required: ["chat_id", "text"],
      additionalProperties: false,
    },
  },
  {
    name: "search_inbox",
    description: "Поиск по тексту диалогов и документам.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "list_queues",
    description: "Очереди, SLA и открытые тикеты.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_route_log",
    description: "Журнал решений маршрутизатора: правило, очередь, пропуски.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        source: { type: "string", enum: ["inbound", "apply", "manual", "document", "probe", "escalate"] },
      },
      additionalProperties: false,
    },
  },
  {
    name: "route_ticket",
    description: "Перенаправить тикет в очередь и выставить приоритет.",
    inputSchema: {
      type: "object",
      properties: {
        ticket_id: { type: "string" },
        chat_id: { type: "string" },
        queue_id: { type: "string" },
        priority: { type: "string", enum: ["p0", "p1", "p2", "p3"] },
      },
      additionalProperties: false,
    },
  },
  {
    name: "test_route",
    description: "Проверить, в какую очередь попадёт сообщение при текущих правилах. Ничего не меняет.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string" },
        channel: { type: "string", enum: ["telegram", "whatsapp", "max", "vk"] },
        title: { type: "string" },
      },
      required: ["text"],
      additionalProperties: false,
    },
  },
  {
    name: "apply_router",
    description: "Прогнать открытые тикеты через текущие правила маршрутизации.",
    inputSchema: {
      type: "object",
      properties: { include_assigned: { type: "boolean" } },
      additionalProperties: false,
    },
  },
  {
    name: "upsert_rule",
    description: "Создать или обновить правило маршрутизации. Первое совпадение побеждает.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        match: { type: "string" },
        queue_id: { type: "string" },
        priority: { type: "string", enum: ["p0", "p1", "p2", "p3"] },
        channel: { type: "string", enum: ["telegram", "whatsapp", "max", "vk"] },
        agent_id: { type: "string" },
        enabled: { type: "boolean" },
      },
      required: ["name", "match", "queue_id"],
      additionalProperties: false,
    },
  },
  {
    name: "list_escalations",
    description: "Правила эскалации: текст, SLA, тишина, повторы.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "upsert_escalation",
    description: "Создать или обновить правило эскалации.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        trigger: { type: "string", enum: ["keyword", "sla", "silence", "repeats"] },
        match: { type: "string" },
        after_min: { type: "number" },
        repeats: { type: "number" },
        from_queues: { type: "array", items: { type: "string" } },
        queue_id: { type: "string" },
        priority: { type: "string", enum: ["p0", "p1", "p2", "p3"] },
        agent_id: { type: "string" },
        enabled: { type: "boolean" },
      },
      required: ["name", "trigger"],
      additionalProperties: false,
    },
  },
  {
    name: "apply_escalation",
    description: "Прогнать открытые тикеты через правила эскалации.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "escalate_ticket",
    description: "Вручную эскалировать тикет старшему смены.",
    inputSchema: {
      type: "object",
      properties: { ticket_id: { type: "string" }, chat_id: { type: "string" } },
      additionalProperties: false,
    },
  },
  {
    name: "list_kinds",
    description: "Справочник типов бесед и промпты для ИИ.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "upsert_kind",
    description: "Создать или обновить тип беседы и его промпт.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        match: { type: "string" },
        queue_id: { type: "string" },
        prompt: { type: "string" },
        description: { type: "string" },
      },
      required: ["name", "match", "prompt"],
      additionalProperties: false,
    },
  },
  {
    name: "list_knowledge",
    description: "Базы знаний. Фильтр: kind_id.",
    inputSchema: {
      type: "object",
      properties: { kind_id: { type: "string" } },
      additionalProperties: false,
    },
  },
  {
    name: "upsert_knowledge",
    description: "Статья базы знаний. kind_ids — одна или несколько типов бесед.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        body: { type: "string" },
        kind_ids: { type: "array", items: { type: "string" } },
      },
      required: ["title", "body"],
      additionalProperties: false,
    },
  },
  {
    name: "list_forks",
    description: "Развилки и их триггеры: текст, файл, тишина, повторы.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "upsert_fork",
    description: "Создать или обновить развилку и её триггер.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        trigger: { type: "string", enum: ["keyword", "document", "silence", "repeats"] },
        match: { type: "string" },
        after_min: { type: "number" },
        repeats: { type: "number" },
        action: { type: "string", enum: ["site", "crm", "manager", "queue", "url"] },
        target: { type: "string" },
        label: { type: "string" },
        kind_id: { type: "string" },
        enabled: { type: "boolean" },
      },
      required: ["name", "action", "target", "label"],
      additionalProperties: false,
    },
  },
  {
    name: "test_fork",
    description: "Проверить, какие развилки сработают на тексте (триггеры «текст» и «файл»).",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string" },
        kind_id: { type: "string" },
      },
      required: ["text"],
      additionalProperties: false,
    },
  },
  {
    name: "assign_ticket",
    description: "Назначить тикет оператору, боту или Grok.",
    inputSchema: {
      type: "object",
      properties: {
        ticket_id: { type: "string" },
        agent_id: { type: "string" },
      },
      required: ["ticket_id", "agent_id"],
      additionalProperties: false,
    },
  },
  {
    name: "process_document",
    description: "Классифицировать вложение, извлечь поля и поставить в очередь документов.",
    inputSchema: {
      type: "object",
      properties: {
        document_id: { type: "string" },
        chat_id: { type: "string" },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_stats",
    description: "Оперативные метрики: открытые, SLA, MCP, каналы.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "auto_reply",
    description: "Черновик ответа по треду (Grok) или шаблон. Не отправляет, пока send=true.",
    inputSchema: {
      type: "object",
      properties: {
        chat_id: { type: "string" },
        send: { type: "boolean" },
        template_id: { type: "string" },
      },
      required: ["chat_id"],
      additionalProperties: false,
    },
  },
] as const;

export const TEMPLATES = [
  {
    id: "t-track",
    title: "Трекинг принят",
    body: "Здравствуйте! Приняли обращение. Трекинг по заказу пришлём в течение 10 минут, статус обновим в этом чате.",
  },
  {
    id: "t-invoice",
    title: "Счёт в работе",
    body: "Документ получили, ставим в очередь на проверку. Счёт или акт вернём подписанным в этот диалог.",
  },
  {
    id: "t-sorry",
    title: "Эскалация",
    body: "Спасибо, что написали. Передали обращение старшему смене — ответим с решением, не шаблоном.",
  },
  {
    id: "t-sales",
    title: "Коммерческое",
    body: "Запрос на расчёт получили. Уточните город, объём и желаемую дату — вернём ставку сегодня.",
  },
];

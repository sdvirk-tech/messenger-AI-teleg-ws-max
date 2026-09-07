import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ChevronUp, f as ChevronDown, o as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { I as upsertRuleFn, M as upsertEscalationFn, O as testRouteFn, S as moveRuleFn, c as applyEscalationFn, f as deleteEscalationFn, g as deleteRuleFn, j as toggleRuleFn, k as toggleEscalationFn, l as applyRouterFn, n as Route$2, w as routeFn } from "./router-Bq2_uDkI.mjs";
import { _ as slaLeft, a as ChannelMark, d as PRIORITY_LABEL, f as ROUTE_SOURCE_LABEL, h as formatAgo, i as CHANNEL_LABEL, m as cn, n as Badge, r as Button, s as ESCALATION_TRIGGER_LABEL, t as AppShell, u as Input, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queues-CIkOW0Bl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var selectClass = "h-10 rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none";
function QueuesView({ snap }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
	const [probe, setProbe] = (0, import_react.useState)("Счёт на 40 паллет до Казани, слот в четверг");
	const [probeChannel, setProbeChannel] = (0, import_react.useState)("whatsapp");
	const [probeResult, setProbeResult] = (0, import_react.useState)(null);
	const [applied, setApplied] = (0, import_react.useState)(null);
	const [escApplied, setEscApplied] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [logFilter, setLogFilter] = (0, import_react.useState)("all");
	const hits = (id) => (snap.routeLog ?? []).filter((e) => e.ruleId === id && !e.skipped).length;
	const logRows = (snap.routeLog ?? []).filter((e) => {
		if (logFilter === "all") return true;
		if (logFilter === "skip") return Boolean(e.skipped);
		return e.source === logFilter && !e.skipped;
	});
	const queueLabel = (id) => snap.queues.find((q) => q.id === id)?.name ?? id ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full min-h-0 overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 overflow-x-auto px-4 py-4 min-h-[240px]",
				children: snap.queues.map((q) => {
					const tickets = snap.tickets.filter((t) => t.queueId === q.id && t.status !== "resolved");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "w-[240px] shrink-0 rounded-xl bg-surface p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium",
									children: q.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle tabular-nums",
									children: tickets.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "px-2 pb-2 text-[11px] text-subtle",
								children: [
									"SLA ",
									q.slaMin,
									" мин"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: tickets.map((t) => {
									const chat = snap.chats.find((c) => c.id === t.chatId);
									if (!chat) return null;
									const sla = slaLeft(t.slaDueAt, snap.now);
									const agent = snap.agents.find((a) => a.id === t.assigneeId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => navigate({
											to: "/",
											search: { chat: chat.id }
										}),
										className: "w-full rounded-lg bg-elevated p-3 text-left transition-[box-shadow] duration-150 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, {
													id: chat.channel,
													className: "text-muted"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate font-medium",
													children: chat.title
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 line-clamp-2 text-xs text-muted",
												children: chat.preview
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-wrap items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: t.priority === "p0" ? "danger" : "muted",
													children: PRIORITY_LABEL[t.priority]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: sla.tone === "ok" ? "sage" : sla.tone,
													children: sla.label
												})]
											}),
											agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1.5 text-[11px] text-subtle truncate",
												children: agent.name
											}) : null
										]
									}, t.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-1 pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "h-9 w-full rounded-md bg-elevated px-2 text-xs text-muted outline-none",
									defaultValue: "",
									onChange: async (e) => {
										const ticketId = e.target.value;
										if (!ticketId) return;
										await routeFn({ data: {
											ticketId,
											queueId: q.id
										} });
										invalidate();
										e.currentTarget.value = "";
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Переместить сюда…"
									}), snap.tickets.filter((t) => t.queueId !== q.id && t.status !== "resolved").map((t) => {
										const chat = snap.chats.find((c) => c.id === t.chatId);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: t.id,
											children: chat?.title ?? t.id
										}, t.id);
									})]
								})
							})
						]
					}, q.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-4 py-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Эскалация"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted max-w-xl",
							children: "Срабатывает даже если оператор уже держит тикет. Первое подходящее правило поднимает в «Эскалацию» и назначает старшего."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: busy,
							onClick: async () => {
								setBusy(true);
								try {
									const res = await applyEscalationFn();
									setEscApplied(`Поднято ${res.moved} из ${res.open}`);
									invalidate();
								} finally {
									setBusy(false);
								}
							},
							children: "Прогнать сейчас"
						})]
					}),
					escApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ok",
						children: escApplied
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-w-5xl",
						children: (snap.escalations ?? []).map((policy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl bg-surface p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-start gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 grid gap-2 md:grid-cols-[1.2fr_1fr]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: policy.name,
											onChange: (e) => {
												policy.name = e.target.value;
												qc.setQueryData(["relay"], {
													...snap,
													escalations: [...snap.escalations]
												});
											},
											onBlur: () => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												match: policy.match,
												afterMin: policy.afterMin,
												repeats: policy.repeats,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: policy.agentId ?? ""
											} }).then(invalidate)
										}), policy.trigger === "keyword" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "font-mono text-xs",
											value: policy.match ?? "",
											onChange: (e) => {
												policy.match = e.target.value;
												qc.setQueryData(["relay"], {
													...snap,
													escalations: [...snap.escalations]
												});
											},
											onBlur: () => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												match: policy.match,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: policy.agentId ?? ""
											} }).then(invalidate)
										}) : policy.trigger === "repeats" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											value: policy.repeats ?? 3,
											onChange: (e) => {
												policy.repeats = Number(e.target.value);
												qc.setQueryData(["relay"], {
													...snap,
													escalations: [...snap.escalations]
												});
											},
											onBlur: () => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												repeats: policy.repeats,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: policy.agentId ?? ""
											} }).then(invalidate)
										}) : policy.trigger === "silence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											value: policy.afterMin ?? 5,
											onChange: (e) => {
												policy.afterMin = Number(e.target.value);
												qc.setQueryData(["relay"], {
													...snap,
													escalations: [...snap.escalations]
												});
											},
											onBlur: () => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												afterMin: policy.afterMin,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: policy.agentId ?? ""
											} }).then(invalidate)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 items-center text-xs text-muted",
											children: "когда SLA уже вышел"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: policy.trigger,
											onChange: (e) => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: e.target.value,
												match: policy.match,
												afterMin: policy.afterMin,
												repeats: policy.repeats,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: policy.agentId ?? ""
											} }).then(invalidate),
											children: Object.keys(ESCALATION_TRIGGER_LABEL).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: t,
												children: ESCALATION_TRIGGER_LABEL[t]
											}, t))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: policy.priority,
											onChange: (e) => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												match: policy.match,
												afterMin: policy.afterMin,
												repeats: policy.repeats,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: e.target.value,
												agentId: policy.agentId ?? ""
											} }).then(invalidate),
											children: [
												"p0",
												"p1",
												"p2",
												"p3"
											].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p,
												children: PRIORITY_LABEL[p]
											}, p))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: policy.agentId ?? "",
											onChange: (e) => upsertEscalationFn({ data: {
												id: policy.id,
												name: policy.name,
												trigger: policy.trigger,
												match: policy.match,
												afterMin: policy.afterMin,
												repeats: policy.repeats,
												fromQueues: policy.fromQueues,
												queueId: policy.queueId,
												priority: policy.priority,
												agentId: e.target.value
											} }).then(invalidate),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Без назначения"
											}), snap.agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: a.id,
												children: a.name
											}, a.id))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: policy.enabled ? "primary" : "ghost",
											onClick: () => toggleEscalationFn({ data: { id: policy.id } }).then(invalidate),
											children: policy.enabled ? "Вкл" : "Выкл"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "iconSm",
											variant: "ghost",
											"aria-label": "Удалить",
											onClick: () => deleteEscalationFn({ data: { id: policy.id } }).then(invalidate),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1",
									children: snap.queues.filter((q) => q.id !== "escalation").map((q) => {
										const on = !policy.fromQueues?.length || policy.fromQueues.includes(q.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: cn("h-8 rounded-md px-2.5 text-xs transition-colors duration-150", on ? "bg-elevated text-fg" : "text-subtle hover:bg-elevated hover:text-fg"),
											onClick: () => {
												const all = snap.queues.filter((x) => x.id !== "escalation").map((x) => x.id);
												const current = policy.fromQueues?.length ? [...policy.fromQueues] : all;
												const next = current.includes(q.id) ? current.filter((id) => id !== q.id) : [...current, q.id];
												upsertEscalationFn({ data: {
													id: policy.id,
													name: policy.name,
													trigger: policy.trigger,
													match: policy.match,
													afterMin: policy.afterMin,
													repeats: policy.repeats,
													fromQueues: next,
													queueId: policy.queueId,
													priority: policy.priority,
													agentId: policy.agentId ?? ""
												} }).then(invalidate);
											},
											children: q.name
										}, q.id);
									})
								})
							]
						}, policy.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "rounded-xl bg-surface p-3 max-w-5xl space-y-2",
						onSubmit: async (e) => {
							e.preventDefault();
							const form = e.currentTarget;
							const fd = new FormData(form);
							const name = String(fd.get("name") ?? "").trim();
							const trigger = String(fd.get("trigger") ?? "keyword");
							const match = String(fd.get("match") ?? "").trim();
							const afterMin = Number(fd.get("afterMin") || 5);
							const repeats = Number(fd.get("repeats") || 3);
							const priority = String(fd.get("priority") ?? "p1") || "p1";
							const agentId = String(fd.get("agentId") ?? "sofia");
							if (!name) return;
							await upsertEscalationFn({ data: {
								name,
								trigger,
								match: trigger === "keyword" ? match || "срочно" : void 0,
								afterMin: trigger === "silence" ? afterMin : void 0,
								repeats: trigger === "repeats" ? repeats : void 0,
								queueId: "escalation",
								priority,
								agentId
							} });
							form.reset();
							invalidate();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-subtle",
								children: "Новое правило эскалации"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "name",
									placeholder: "Имя"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "match",
									className: "font-mono text-xs",
									placeholder: "претенз|адвокат — для текста"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										name: "trigger",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "keyword",
										children: Object.keys(ESCALATION_TRIGGER_LABEL).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: t,
											children: ESCALATION_TRIGGER_LABEL[t]
										}, t))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "afterMin",
										type: "number",
										className: "w-24 h-8 text-xs",
										placeholder: "мин"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										name: "priority",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "p1",
										children: [
											"p0",
											"p1",
											"p2",
											"p3"
										].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p,
											children: PRIORITY_LABEL[p]
										}, p))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										name: "agentId",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "sofia",
										children: snap.agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: a.id,
											children: a.name
										}, a.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										children: "Добавить"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-4 py-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Маршрутизация"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted max-w-xl",
							children: "Первое совпадение побеждает. Человека с назначенным тикетом правила не трогают, пока не нажмёте прогон с назначенными."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: busy,
							onClick: async () => {
								setBusy(true);
								try {
									const res = await applyRouterFn({ data: {} });
									setApplied(`Переложено ${res.moved} из ${res.open}`);
									invalidate();
								} finally {
									setBusy(false);
								}
							},
							children: "Прогнать открытые"
						})]
					}),
					applied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ok",
						children: applied
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "rounded-xl bg-surface p-3 flex flex-col gap-2 md:flex-row md:items-end",
						onSubmit: async (e) => {
							e.preventDefault();
							const res = await testRouteFn({ data: {
								text: probe,
								channel: probeChannel
							} });
							setProbeResult(`${res.queue} · ${PRIORITY_LABEL[res.priority]} · ${res.agent ?? "без назначения"} · «${res.rule}»`);
							invalidate();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex-1 min-w-0 text-xs text-subtle",
								children: ["Проверка сообщения", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1",
									value: probe,
									onChange: (e) => setProbe(e.target.value),
									placeholder: "Текст входящего"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs text-subtle",
								children: ["Канал", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: cn(selectClass, "mt-1 w-full md:w-40"),
									value: probeChannel,
									onChange: (e) => setProbeChannel(e.target.value),
									children: Object.keys(CHANNEL_LABEL).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: id,
										children: CHANNEL_LABEL[id]
									}, id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "md",
								children: "Куда уйдёт"
							})
						]
					}),
					probeResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-elevated px-3 py-2 text-sm",
						children: probeResult
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-5xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: "Журнал маршрутизации"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-subtle tabular-nums",
									children: [(snap.routeLog ?? []).length, " записей"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1 mb-2",
								children: [
									["all", "Все"],
									["inbound", "Входящие"],
									["apply", "Прогон"],
									["escalate", "Эскалация"],
									["probe", "Проверки"],
									["skip", "Пропуски"]
								].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLogFilter(id),
									className: cn("h-8 rounded-md px-2.5 text-xs transition-colors duration-150", logFilter === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
									children: label
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-xl bg-surface",
								children: logRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-4 py-6 text-sm text-muted",
									children: "Пока пусто — входящие и проверки появятся здесь."
								}) : logRows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("px-4 py-2.5", i !== 0 && "border-t border-line", row.skipped && "opacity-70"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, {
													id: row.channel,
													className: "text-muted shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate font-medium",
													children: row.chatTitle ?? "проверка"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: row.skipped ? "warn" : "muted",
													children: ROUTE_SOURCE_LABEL[row.source]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto text-xs text-subtle tabular-nums shrink-0",
													children: formatAgo(row.at, snap.now)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted line-clamp-1",
											children: row.text
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-center gap-1.5 text-xs",
											children: [
												row.fromQueue && row.fromQueue !== row.toQueue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-subtle",
													children: [
														queueLabel(row.fromQueue),
														" → ",
														queueLabel(row.toQueue)
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-subtle",
													children: queueLabel(row.toQueue)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-subtle",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.skipped ? row.skipReason : `«${row.ruleName}»` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: row.priority === "p0" ? "danger" : "muted",
													children: PRIORITY_LABEL[row.priority]
												})
											]
										})
									]
								}, row.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-w-5xl",
						children: snap.rules.map((rule, index) => {
							const fallback = rule.match === "*";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl bg-surface p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1.5 w-8 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-subtle tabular-nums",
												children: index + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-subtle tabular-nums",
												children: hits(rule.id)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1 grid gap-2 md:grid-cols-[1.2fr_1fr]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: rule.name,
												disabled: fallback,
												onChange: (e) => {
													rule.name = e.target.value;
													qc.setQueryData(["relay"], {
														...snap,
														rules: [...snap.rules]
													});
												},
												onBlur: () => upsertRuleFn({ data: {
													id: rule.id,
													name: rule.name,
													match: rule.match,
													queueId: rule.queueId,
													priority: rule.priority,
													channel: rule.channel ?? "",
													agentId: rule.agentId ?? ""
												} }).then(invalidate)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "font-mono text-xs",
												value: rule.match,
												disabled: fallback,
												onChange: (e) => {
													rule.match = e.target.value;
													qc.setQueryData(["relay"], {
														...snap,
														rules: [...snap.rules]
													});
												},
												onBlur: () => upsertRuleFn({ data: {
													id: rule.id,
													name: rule.name,
													match: rule.match,
													queueId: rule.queueId,
													priority: rule.priority,
													channel: rule.channel ?? "",
													agentId: rule.agentId ?? ""
												} }).then(invalidate)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex shrink-0 flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "iconSm",
												variant: "ghost",
												disabled: fallback || index === 0,
												"aria-label": "Выше",
												onClick: () => moveRuleFn({ data: {
													ruleId: rule.id,
													dir: "up"
												} }).then(invalidate),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "iconSm",
												variant: "ghost",
												disabled: fallback || index >= snap.rules.length - 2,
												"aria-label": "Ниже",
												onClick: () => moveRuleFn({ data: {
													ruleId: rule.id,
													dir: "down"
												} }).then(invalidate),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2 pl-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: rule.channel ?? "",
											disabled: fallback,
											onChange: (e) => upsertRuleFn({ data: {
												id: rule.id,
												name: rule.name,
												match: rule.match,
												queueId: rule.queueId,
												priority: rule.priority,
												channel: e.target.value,
												agentId: rule.agentId ?? ""
											} }).then(invalidate),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Все каналы"
											}), Object.keys(CHANNEL_LABEL).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: id,
												children: CHANNEL_LABEL[id]
											}, id))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: rule.queueId,
											onChange: (e) => upsertRuleFn({ data: {
												id: rule.id,
												name: rule.name,
												match: rule.match,
												queueId: e.target.value,
												priority: rule.priority,
												channel: rule.channel ?? "",
												agentId: rule.agentId ?? ""
											} }).then(invalidate),
											children: snap.queues.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: q.id,
												children: q.name
											}, q.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: rule.priority ?? "p2",
											onChange: (e) => upsertRuleFn({ data: {
												id: rule.id,
												name: rule.name,
												match: rule.match,
												queueId: rule.queueId,
												priority: e.target.value,
												channel: rule.channel ?? "",
												agentId: rule.agentId ?? ""
											} }).then(invalidate),
											children: [
												"p0",
												"p1",
												"p2",
												"p3"
											].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p,
												children: PRIORITY_LABEL[p]
											}, p))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: cn(selectClass, "h-8 text-xs"),
											value: rule.agentId ?? "",
											onChange: (e) => upsertRuleFn({ data: {
												id: rule.id,
												name: rule.name,
												match: rule.match,
												queueId: rule.queueId,
												priority: rule.priority,
												channel: rule.channel ?? "",
												agentId: e.target.value
											} }).then(invalidate),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Без назначения"
											}), snap.agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: a.id,
												children: a.name
											}, a.id))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: rule.enabled ? "primary" : "ghost",
											disabled: fallback,
											onClick: () => toggleRuleFn({ data: { ruleId: rule.id } }).then(invalidate),
											children: rule.enabled ? "Вкл" : "Выкл"
										}),
										!fallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "iconSm",
											variant: "ghost",
											"aria-label": "Удалить",
											onClick: () => deleteRuleFn({ data: { ruleId: rule.id } }).then(invalidate),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										}) : null
									]
								})]
							}, rule.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "rounded-xl bg-surface p-3 max-w-5xl space-y-2",
						onSubmit: async (e) => {
							e.preventDefault();
							const form = e.currentTarget;
							const fd = new FormData(form);
							const name = String(fd.get("name") ?? "").trim();
							const match = String(fd.get("match") ?? "").trim();
							const queueId = String(fd.get("queueId") ?? "support");
							const priority = String(fd.get("priority") ?? "p2") || "p2";
							const channel = String(fd.get("channel") ?? "");
							const agentId = String(fd.get("agentId") ?? "");
							if (!name || !match) return;
							await upsertRuleFn({ data: {
								name,
								match,
								queueId,
								priority,
								channel,
								agentId
							} });
							form.reset();
							invalidate();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-subtle",
								children: "Новое правило"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "name",
									placeholder: "Имя"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "match",
									className: "font-mono text-xs",
									placeholder: "vip|срочно или *"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "channel",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Все каналы"
										}), Object.keys(CHANNEL_LABEL).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: id,
											children: CHANNEL_LABEL[id]
										}, id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										name: "queueId",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: snap.queues[1]?.id ?? "support",
										children: snap.queues.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: q.id,
											children: q.name
										}, q.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										name: "priority",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "p2",
										children: [
											"p0",
											"p1",
											"p2",
											"p3"
										].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p,
											children: PRIORITY_LABEL[p]
										}, p))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "agentId",
										className: cn(selectClass, "h-8 text-xs"),
										defaultValue: "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Без назначения"
										}), snap.agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: a.id,
											children: a.name
										}, a.id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										size: "sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Добавить"]
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
function QueuesPage() {
	const initial = Route$2.useLoaderData();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Очереди и маршрутизация",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueuesView, { snap: data ?? initial })
	});
}
//#endregion
export { QueuesPage as component };

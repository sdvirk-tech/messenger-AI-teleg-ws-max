import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as ArrowUp, s as PenLine, t as UserRound } from "../_libs/lucide-react.mjs";
import { E as setChatKindFn, T as sendMessageFn, s as Route$7, u as assignFn, v as draftReplyFn, w as routeFn, x as markReadFn, y as escalateTicketFn } from "./router-Bq2_uDkI.mjs";
import { _ as slaLeft, a as ChannelMark, c as FORK_ACTION_LABEL, d as PRIORITY_LABEL, g as formatClock, h as formatAgo, i as CHANNEL_LABEL, l as FORK_TRIGGER_LABEL, m as cn, n as Badge, o as DOC_LABEL, p as Textarea, r as Button, t as AppShell, u as Input, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DWk3jOaq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ticketFor(snap, chat) {
	return snap.tickets.find((t) => t.id === chat.ticketId);
}
function queueName(snap, id) {
	return snap.queues.find((q) => q.id === id)?.name ?? id;
}
function InboxView({ snap, selectedId }) {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const chats = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return snap.chats;
		return snap.chats.filter((c) => `${c.title} ${c.preview}`.toLowerCase().includes(q));
	}, [snap.chats, query]);
	const selected = snap.chats.find((c) => c.id === selectedId) ?? null;
	const paneChat = selected ?? snap.chats[0] ?? null;
	const messages = paneChat ? snap.messages.filter((m) => m.chatId === paneChat.id) : [];
	const ticket = paneChat ? ticketFor(snap, paneChat) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)_minmax(240px,280px)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("min-h-0 border-r border-line flex flex-col", selected ? "hidden md:flex" : "flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Поиск по инбоксу"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: chats.map((chat) => {
						const t = ticketFor(snap, chat);
						const sla = t ? slaLeft(t.slaDueAt, snap.now) : null;
						const active = chat.id === paneChat?.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/",
								search: { chat: chat.id }
							}),
							className: cn("flex w-full gap-3 px-3 py-2.5 text-left transition-[background-color] duration-150", active ? "bg-elevated" : "hover:bg-elevated/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, { id: chat.channel })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("truncate text-sm", chat.unread ? "font-medium text-fg" : "text-fg"),
											children: chat.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-xs text-subtle tabular-nums",
											children: formatAgo(chat.lastAt, snap.now)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block truncate text-xs text-muted",
										children: chat.preview
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1.5 flex items-center gap-1.5",
										children: [
											chat.kindId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "muted",
												children: (snap.kinds ?? []).find((k) => k.id === chat.kindId)?.name ?? "тип"
											}) : t ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "muted",
												children: queueName(snap, t.queueId)
											}) : null,
											t && chat.kindId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "muted",
												children: queueName(snap, t.queueId)
											}) : null,
											sla ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: sla.tone === "ok" ? "sage" : sla.tone,
												children: sla.label
											}) : null,
											chat.unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "stone",
												children: chat.unread
											}) : null
										]
									})
								]
							})]
						}, chat.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: cn("min-h-0 flex flex-col", selected ? "flex" : "hidden md:flex"),
				children: paneChat && ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
					snap,
					chat: paneChat,
					ticket,
					messages
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full flex-col items-center justify-center px-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted max-w-xs",
						children: "Выберите диалог. Сообщения с Telegram, WhatsApp, MAX и VK сходятся сюда и сразу попадают в очередь."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "min-h-0 hidden border-l border-line overflow-y-auto md:block",
				children: paneChat && ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextPanel, {
					snap,
					chat: paneChat,
					ticket
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleStats, { snap })
			})
		]
	});
}
function Thread({ snap, chat, ticket, messages }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [text, setText] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [draftMeta, setDraftMeta] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const send = useMutation({
		mutationFn: (payload) => sendMessageFn({ data: payload }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["relay"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-12 shrink-0 items-center gap-3 border-b border-line px-3 md:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "md:hidden text-sm text-muted",
					onClick: () => navigate({
						to: "/",
						search: {}
					}),
					children: "Назад"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, { id: chat.channel })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-medium",
						children: chat.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-subtle",
						children: [
							CHANNEL_LABEL[chat.channel],
							" · ",
							chat.peerId
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: ticket.priority === "p0" || ticket.priority === "p1" ? "danger" : "muted",
					children: PRIORITY_LABEL[ticket.priority]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-5 space-y-3",
			children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex", m.author === "user" ? "justify-start" : "justify-end"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed", m.author === "user" ? "bg-elevated text-fg rounded-tl-sm" : "bg-accent text-accent-fg rounded-tr-sm", m.author === "system" && "bg-transparent text-subtle shadow-[var(--shadow-border)]"),
					children: [
						m.author !== "user" && m.agentName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("mb-1 text-[11px]", m.author === "system" ? "text-subtle" : "text-accent-fg/70"),
							children: m.agentName
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.text }),
						m.attachments?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 space-y-1",
							children: m.attachments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-bg/20 px-2 py-1 text-xs",
								children: [
									a.name,
									" · ",
									DOC_LABEL[a.kind],
									" · ",
									a.sizeKb,
									" КБ"
								]
							}, a.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("mt-1 text-[11px] tabular-nums", m.author === "user" ? "text-subtle" : "text-accent-fg/60"),
							children: formatClock(m.at)
						})
					]
				})
			}, m.id))
		}),
		draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-3 mb-2 rounded-lg bg-elevated px-3 py-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 text-xs text-muted",
					children: ["Черновик Grok", draftMeta ? ` · ${draftMeta}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-fg leading-relaxed",
					children: draft
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => {
							send.mutate({
								chatId: chat.id,
								text: draft
							});
							setDraft(null);
							setDraftMeta(null);
						},
						children: "Отправить"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => {
							setDraft(null);
							setDraftMeta(null);
						},
						children: "Скрыть"
					})]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "shrink-0 border-t border-line p-3",
			onSubmit: async (e) => {
				e.preventDefault();
				const value = text.trim();
				if (!value) return;
				setText("");
				await markReadFn({ data: { chatId: chat.id } });
				send.mutate({
					chatId: chat.id,
					text: value
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Ответ в этот канал",
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							e.currentTarget.form?.requestSubmit();
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: !text.trim() || send.isPending,
					"aria-label": "Отправить",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-1.5",
				children: [snap.templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: () => setText(t.body),
					children: t.title
				}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					disabled: busy,
					onClick: async () => {
						setBusy(true);
						try {
							const res = await draftReplyFn({ data: { chatId: chat.id } });
							if (res.ok) {
								setDraft(res.text);
								const titles = "knowledge" in res && Array.isArray(res.knowledge) ? res.knowledge : [];
								const kind = "kind" in res && typeof res.kind === "string" ? res.kind : "";
								setDraftMeta([kind, titles.length ? `${titles.length} ст.` : ""].filter(Boolean).join(" · ") || null);
							} else setDraft(res.error);
						} finally {
							setBusy(false);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), busy ? "Пишет…" : "Черновик Grok"]
				})]
			})]
		})
	] });
}
function ContextPanel({ snap, chat, ticket }) {
	const qc = useQueryClient();
	const sla = slaLeft(ticket.slaDueAt, snap.now);
	const docs = snap.documents.filter((d) => d.chatId === chat.id);
	const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
	const kinds = snap.kinds ?? [];
	const kind = kinds.find((k) => k.id === chat.kindId);
	const articles = (snap.knowledge ?? []).filter((a) => !a.kindIds.length || (chat.kindId ? a.kindIds.includes(chat.kindId) : false));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-subtle mb-2",
					children: "Тип беседы"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none",
					value: chat.kindId ?? "",
					onChange: async (e) => {
						if (!e.target.value) return;
						await setChatKindFn({ data: {
							chatId: chat.id,
							kindId: e.target.value
						} });
						invalidate();
					},
					children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k.id,
						children: k.name
					}, k.id))
				}),
				kind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-subtle leading-relaxed line-clamp-3",
					children: kind.prompt
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-subtle leading-relaxed",
					children: "Промпт Grok и база знаний берутся из этого типа."
				})
			] }),
			articles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "База знаний"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted leading-relaxed line-clamp-3",
						children: a.body
					})]
				}, a.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "Очередь"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none",
				value: ticket.queueId,
				onChange: async (e) => {
					await routeFn({ data: {
						ticketId: ticket.id,
						queueId: e.target.value
					} });
					invalidate();
				},
				children: snap.queues.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: q.id,
					children: q.name
				}, q.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "Приоритет"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: [
					"p0",
					"p1",
					"p2",
					"p3"
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: ticket.priority === p ? "primary" : "ghost",
					onClick: async () => {
						await routeFn({ data: {
							ticketId: ticket.id,
							priority: p
						} });
						invalidate();
					},
					children: PRIORITY_LABEL[p]
				}, p))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "Назначить"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: snap.agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("flex h-10 w-full items-center gap-2 rounded-md px-2 text-left text-sm transition-[background-color] duration-150", ticket.assigneeId === a.id ? "bg-elevated" : "hover:bg-elevated/60"),
					onClick: async () => {
						await assignFn({ data: {
							ticketId: ticket.id,
							agentId: a.id
						} });
						invalidate();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 truncate",
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle tabular-nums",
							children: a.load
						})
					]
				}, a.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "SLA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: sla.tone === "ok" ? "sage" : sla.tone,
					children: sla.label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle leading-relaxed",
				children: ticket.reason
			}),
			ticket.queueId !== "escalation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "w-full",
				onClick: async () => {
					await escalateTicketFn({ data: { ticketId: ticket.id } });
					invalidate();
				},
				children: "Эскалировать старшему"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "danger",
				children: "У старшего смены"
			}),
			docs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "Документы"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: d.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted",
						children: [
							DOC_LABEL[d.kind],
							" · ",
							d.status
						]
					})]
				}, d.id))
			})] }) : null,
			(chat.forkHits ?? []).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle mb-2",
				children: "Развилки"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: chat.forkHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: h.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted",
						children: [
							h.trigger ? `${FORK_TRIGGER_LABEL[h.trigger]} · ` : "",
							FORK_ACTION_LABEL[h.action],
							h.target ? ` · ${h.target}` : ""
						]
					})]
				}, h.id))
			})] }) : null
		]
	});
}
function IdleStats({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle",
				children: "Сейчас"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					["Открыто", snap.stats.open],
					["Ждут", snap.stats.waiting],
					["SLA", snap.stats.breached],
					["MCP", snap.stats.mcpCalls]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg tabular-nums",
						children: v
					})]
				}, String(k)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: snap.channels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, {
							id: c.id,
							className: "text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle tabular-nums",
							children: c.inbound
						})
					]
				}, c.id))
			})
		]
	});
}
function Home() {
	const initial = Route$7.useLoaderData();
	const { chat } = Route$7.useSearch();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxView, {
		snap: data ?? initial,
		selectedId: chat
	}) });
}
//#endregion
export { Home as component };

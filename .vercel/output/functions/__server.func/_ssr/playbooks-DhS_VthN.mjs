import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as Trash2 } from "../_libs/lucide-react.mjs";
import { A as toggleForkFn, D as testForkFn, F as upsertKnowledgeFn, N as upsertForkFn, P as upsertKindFn, h as deleteKnowledgeFn, m as deleteKindFn, p as deleteForkFn, r as Route$3 } from "./router-Bq2_uDkI.mjs";
import { c as FORK_ACTION_LABEL, l as FORK_TRIGGER_LABEL, m as cn, n as Badge, p as Textarea, r as Button, t as AppShell, u as Input, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playbooks-DhS_VthN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var selectClass = "h-10 rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none";
function PlaybooksView({ snap }) {
	const qc = useQueryClient();
	const invalidate = () => qc.invalidateQueries({ queryKey: ["relay"] });
	const [tab, setTab] = (0, import_react.useState)("kinds");
	const [openId, setOpenId] = (0, import_react.useState)(snap.kinds[0]?.id ?? null);
	const kinds = snap.kinds ?? [];
	const knowledge = snap.knowledge ?? [];
	const forks = snap.forks ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full min-h-0 overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pt-3 text-xs text-muted max-w-2xl leading-relaxed",
				children: "Тип беседы задаёт промпт Grok. Статью знаний можно повесить на один тип или сразу на несколько. Триггер развилки — текст, файл, тишина или повторы; дальше клиент уходит на сайт, в CRM, к менеджеру или в очередь."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 px-4 pt-3",
				children: [
					["kinds", "Типы бесед"],
					["knowledge", "База знаний"],
					["forks", "Развилки"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-10 rounded-md px-3 text-sm transition-colors duration-150", tab === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
					children: label
				}, id))
			}),
			tab === "kinds" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindsTab, {
				snap,
				kinds,
				openId,
				setOpenId,
				invalidate,
				qc
			}) : null,
			tab === "knowledge" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeTab, {
				kinds,
				knowledge,
				invalidate,
				qc,
				snap
			}) : null,
			tab === "forks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForksTab, {
				kinds,
				forks,
				invalidate,
				snap
			}) : null
		]
	});
}
function KindsTab({ snap, kinds, openId, setOpenId, invalidate, qc }) {
	const open = kinds.find((k) => k.id === openId) ?? kinds[0];
	const linked = (snap.knowledge ?? []).filter((a) => open && (!a.kindIds.length || a.kindIds.includes(open.id)));
	const chats = snap.chats.filter((c) => c.kindId === open?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex flex-col md:grid md:grid-cols-[240px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b md:border-b-0 md:border-r border-line p-3 space-y-1 bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto md:flex-col md:overflow-visible pb-1 md:pb-0",
				children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpenId(k.id),
					className: cn("shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 md:w-full", k.id === open?.id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-medium text-fg",
						children: k.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 hidden md:block text-xs text-subtle truncate",
						children: [
							(snap.knowledge ?? []).filter((a) => a.kindIds.includes(k.id) || !a.kindIds.length).length,
							" ст. ·",
							" ",
							k.match === "*" ? "остальное" : k.match
						]
					})]
				}, k.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "pt-3 space-y-2",
				onSubmit: async (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const name = String(fd.get("name") ?? "").trim();
					const match = String(fd.get("match") ?? "").trim();
					if (!name || !match) return;
					const kind = await upsertKindFn({ data: {
						name,
						match,
						queueId: "support",
						prompt: "Ты оператор Нордлайн. Короткий ответ на русском, без выдуманных фактов.",
						description: ""
					} });
					e.currentTarget.reset();
					setOpenId(kind.id);
					invalidate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "name",
						placeholder: "Новый тип"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "match",
						className: "font-mono text-xs",
						placeholder: "трекинг|заказ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						className: "w-full",
						children: "Добавить тип"
					})
				]
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "p-4 space-y-4 max-w-3xl bg-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: open.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							chats.length,
							" диалогов · ",
							linked.length,
							" статей"
						]
					})] }), open.match !== "*" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "iconSm",
						variant: "ghost",
						"aria-label": "Удалить",
						onClick: () => deleteKindFn({ data: { id: open.id } }).then(() => {
							setOpenId(kinds[0]?.id ?? null);
							invalidate();
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-subtle",
					children: ["Имя", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1",
						value: open.name,
						onChange: (e) => {
							open.name = e.target.value;
							qc.setQueryData(["relay"], {
								...snap,
								kinds: [...kinds]
							});
						},
						onBlur: () => saveKind(open).then(invalidate)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-subtle",
					children: ["Условие", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1 font-mono text-xs",
						value: open.match,
						disabled: open.match === "*",
						onChange: (e) => {
							open.match = e.target.value;
							qc.setQueryData(["relay"], {
								...snap,
								kinds: [...kinds]
							});
						},
						onBlur: () => saveKind(open).then(invalidate)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-subtle",
					children: ["Зачем этот тип", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1",
						value: open.description,
						onChange: (e) => {
							open.description = e.target.value;
							qc.setQueryData(["relay"], {
								...snap,
								kinds: [...kinds]
							});
						},
						onBlur: () => saveKind(open).then(invalidate)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-subtle",
					children: ["Очередь", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: cn(selectClass, "mt-1 w-full"),
						value: open.queueId,
						onChange: (e) => {
							open.queueId = e.target.value;
							saveKind(open).then(invalidate);
						},
						children: snap.queues.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: q.id,
							children: q.name
						}, q.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-subtle",
					children: ["Промпт для ИИ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-1 min-h-36",
						value: open.prompt,
						onChange: (e) => {
							open.prompt = e.target.value;
							qc.setQueryData(["relay"], {
								...snap,
								kinds: [...kinds]
							});
						},
						onBlur: () => saveKind(open).then(invalidate)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-subtle mb-2",
					children: "Привязанные знания"
				}), linked.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: linked.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted leading-relaxed line-clamp-2",
							children: a.body
						})]
					}, a.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Пока нет статей — добавьте во вкладке «База знаний»."
				})] })
			]
		}) : null]
	});
}
function saveKind(kind) {
	return upsertKindFn({ data: {
		id: kind.id,
		name: kind.name,
		match: kind.match,
		queueId: kind.queueId,
		prompt: kind.prompt,
		description: kind.description
	} });
}
function KnowledgeTab({ kinds, knowledge, invalidate, qc, snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 space-y-3 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Статья может висеть на одном типе беседы или сразу на нескольких — Grok подхватит её в черновике."
			}),
			knowledge.map((art) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-surface p-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: art.title,
							onChange: (e) => {
								art.title = e.target.value;
								qc.setQueryData(["relay"], {
									...snap,
									knowledge: [...knowledge]
								});
							},
							onBlur: () => upsertKnowledgeFn({ data: {
								id: art.id,
								title: art.title,
								body: art.body,
								kindIds: art.kindIds
							} }).then(invalidate)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "iconSm",
							variant: "ghost",
							"aria-label": "Удалить",
							onClick: () => deleteKnowledgeFn({ data: { id: art.id } }).then(invalidate),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "min-h-24",
						value: art.body,
						onChange: (e) => {
							art.body = e.target.value;
							qc.setQueryData(["relay"], {
								...snap,
								knowledge: [...knowledge]
							});
						},
						onBlur: () => upsertKnowledgeFn({ data: {
							id: art.id,
							title: art.title,
							body: art.body,
							kindIds: art.kindIds
						} }).then(invalidate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1",
						children: [!art.kindIds.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: "все типы"
						}) : null, kinds.filter((k) => k.match !== "*").map((k) => {
							const on = art.kindIds.includes(k.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("h-8 rounded-md px-2.5 text-xs transition-colors duration-150", on ? "bg-elevated text-fg" : "text-subtle hover:bg-elevated hover:text-fg"),
								onClick: () => {
									const kindIds = on ? art.kindIds.filter((id) => id !== k.id) : [...art.kindIds, k.id];
									upsertKnowledgeFn({ data: {
										id: art.id,
										title: art.title,
										body: art.body,
										kindIds
									} }).then(invalidate);
								},
								children: k.name
							}, k.id);
						})]
					})
				]
			}, art.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl bg-surface p-3 space-y-2",
				onSubmit: async (e) => {
					e.preventDefault();
					const form = e.currentTarget;
					const fd = new FormData(form);
					const title = String(fd.get("title") ?? "").trim();
					const body = String(fd.get("body") ?? "").trim();
					const kindId = String(fd.get("kindId") ?? "");
					if (!title || !body) return;
					await upsertKnowledgeFn({ data: {
						title,
						body,
						kindIds: kindId ? [kindId] : []
					} });
					form.reset();
					invalidate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: "Новая статья"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "title",
						placeholder: "Заголовок"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "body",
						className: "min-h-20",
						placeholder: "Факты, которые ИИ имеет право использовать"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "kindId",
							className: cn(selectClass, "text-xs"),
							defaultValue: "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Все типы"
							}), kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k.id,
								children: k.name
							}, k.id))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							children: "Добавить"
						})]
					})
				]
			})
		]
	});
}
function saveFork(fork, patch = {}) {
	const next = {
		...fork,
		...patch
	};
	return upsertForkFn({ data: {
		id: next.id,
		name: next.name,
		match: next.match ?? "",
		trigger: next.trigger ?? "keyword",
		afterMin: next.afterMin,
		repeats: next.repeats,
		action: next.action,
		target: next.target,
		label: next.label,
		kindId: next.kindId ?? "",
		enabled: next.enabled
	} });
}
function ForksTab({ kinds, forks, invalidate, snap }) {
	const [probe, setProbe] = (0, import_react.useState)("Не пришёл трекинг по NL-4821");
	const [probeKind, setProbeKind] = (0, import_react.useState)("k-track");
	const [probeOut, setProbeOut] = (0, import_react.useState)(null);
	const [newTrigger, setNewTrigger] = (0, import_react.useState)("keyword");
	const hits = (id) => snap.chats.reduce((n, c) => n + (c.forkHits?.filter((h) => h.forkId === id).length ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 space-y-4 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Триггер решает, когда сработает развилка. Текст и файл проверяются по фразе; тишина и повторы — по живому диалогу."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl bg-surface p-3 flex flex-col gap-2 md:flex-row md:items-end",
				onSubmit: async (e) => {
					e.preventDefault();
					const res = await testForkFn({ data: {
						text: probe,
						kindId: probeKind
					} });
					const list = res.forks?.length ? res.forks : res.fork ? [res.fork] : [];
					setProbeOut(list.length ? `${res.kind}: ${list.map((f) => `${f.name} (${FORK_TRIGGER_LABEL[f.trigger ?? "keyword"]}) → ${f.label}`).join("; ")}` : `${res.kind ?? "тип"} · по тексту не сработало (тишина и повторы смотрите в карточке диалога)`);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex-1 text-xs text-subtle",
						children: ["Проверка текста", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							value: probe,
							onChange: (e) => setProbe(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: cn(selectClass, "md:w-48"),
						value: probeKind,
						onChange: (e) => setProbeKind(e.target.value),
						children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k.id,
							children: k.name
						}, k.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "md",
						children: "Куда уйдёт"
					})
				]
			}),
			probeOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg bg-elevated px-3 py-2 text-sm",
				children: probeOut
			}) : null,
			forks.map((fork) => {
				const trigger = fork.trigger ?? "keyword";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium truncate",
									children: fork.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 text-xs text-subtle",
									children: [
										FORK_TRIGGER_LABEL[trigger],
										trigger === "silence" ? ` · ${fork.afterMin ?? 5} мин` : "",
										trigger === "repeats" ? ` · ${fork.repeats ?? 2} подряд` : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "muted",
										children: hits(fork.id)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: fork.enabled ? "primary" : "ghost",
										onClick: () => toggleForkFn({ data: { id: fork.id } }).then(invalidate),
										children: fork.enabled ? "Вкл" : "Выкл"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "iconSm",
										variant: "ghost",
										"aria-label": "Удалить",
										onClick: () => deleteForkFn({ data: { id: fork.id } }).then(invalidate),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							defaultValue: fork.name,
							onBlur: (e) => saveFork(fork, { name: e.currentTarget.value }).then(invalidate)
						}, `${fork.id}-name`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: selectClass,
								value: trigger,
								onChange: (e) => saveFork(fork, { trigger: e.target.value }).then(invalidate),
								children: Object.keys(FORK_TRIGGER_LABEL).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: FORK_TRIGGER_LABEL[t]
								}, t))
							}), trigger === "keyword" || trigger === "document" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "font-mono text-xs",
								defaultValue: fork.match,
								placeholder: trigger === "document" ? "invoice|акт|resume" : "трекинг|NL-\\d+",
								onBlur: (e) => saveFork(fork, { match: e.currentTarget.value }).then(invalidate)
							}, `${fork.id}-match-${trigger}`) : trigger === "silence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								defaultValue: fork.afterMin ?? 5,
								onBlur: (e) => saveFork(fork, { afterMin: Number(e.currentTarget.value) || 5 }).then(invalidate)
							}, `${fork.id}-silence`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								defaultValue: fork.repeats ?? 2,
								onBlur: (e) => saveFork(fork, { repeats: Number(e.currentTarget.value) || 2 }).then(invalidate)
							}, `${fork.id}-repeats`)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							defaultValue: fork.label,
							onBlur: (e) => saveFork(fork, { label: e.currentTarget.value }).then(invalidate)
						}, `${fork.id}-label`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: selectClass,
									value: fork.action,
									onChange: (e) => saveFork(fork, { action: e.target.value }).then(invalidate),
									children: Object.keys(FORK_ACTION_LABEL).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: a,
										children: FORK_ACTION_LABEL[a]
									}, a))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "flex-1 min-w-40",
									defaultValue: fork.target,
									onBlur: (e) => saveFork(fork, { target: e.currentTarget.value }).then(invalidate)
								}, `${fork.id}-target`),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: selectClass,
									value: fork.kindId ?? "",
									onChange: (e) => saveFork(fork, { kindId: e.target.value || void 0 }).then(invalidate),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Все типы"
									}), kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: k.id,
										children: k.name
									}, k.id))]
								})
							]
						})
					]
				}, fork.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl bg-surface p-3 space-y-2",
				onSubmit: async (e) => {
					e.preventDefault();
					const form = e.currentTarget;
					const fd = new FormData(form);
					const name = String(fd.get("name") ?? "").trim();
					const match = String(fd.get("match") ?? "").trim();
					const action = String(fd.get("action") ?? "site");
					const target = String(fd.get("target") ?? "").trim();
					const label = String(fd.get("label") ?? "").trim();
					const kindId = String(fd.get("kindId") ?? "");
					const afterMin = Number(fd.get("afterMin") || 5);
					const repeats = Number(fd.get("repeats") || 2);
					if (!name || !target || !label) return;
					if ((newTrigger === "keyword" || newTrigger === "document") && !match) return;
					await upsertForkFn({ data: {
						name,
						match,
						trigger: newTrigger,
						afterMin: newTrigger === "silence" ? afterMin : void 0,
						repeats: newTrigger === "repeats" ? repeats : void 0,
						action,
						target,
						label,
						kindId
					} });
					form.reset();
					setNewTrigger("keyword");
					invalidate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: "Новая развилка"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								placeholder: "Имя"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: selectClass,
								value: newTrigger,
								onChange: (e) => setNewTrigger(e.target.value),
								children: Object.keys(FORK_TRIGGER_LABEL).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: FORK_TRIGGER_LABEL[t]
								}, t))
							}),
							newTrigger === "keyword" || newTrigger === "document" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "match",
								className: "font-mono text-xs",
								placeholder: newTrigger === "document" ? "invoice|акт" : "оплат|счёт"
							}) : newTrigger === "silence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "afterMin",
								type: "number",
								defaultValue: 5
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "repeats",
								type: "number",
								defaultValue: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "label",
								placeholder: "Что увидит клиент"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "target",
								placeholder: "https://… или CRM-ID или sofia"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "action",
								className: selectClass,
								defaultValue: "site",
								children: Object.keys(FORK_ACTION_LABEL).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: a,
									children: FORK_ACTION_LABEL[a]
								}, a))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: "kindId",
								className: selectClass,
								defaultValue: "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Все типы"
								}), kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k.id,
									children: k.name
								}, k.id))]
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
	});
}
function PlaybooksPage() {
	const initial = Route$3.useLoaderData();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Справочник бесед",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybooksView, { snap: data ?? initial })
	});
}
//#endregion
export { PlaybooksPage as component };

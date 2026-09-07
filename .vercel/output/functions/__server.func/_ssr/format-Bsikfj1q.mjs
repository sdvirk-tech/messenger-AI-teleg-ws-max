import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plug, c as Layers, i as Radio, l as Inbox, p as BookOpen, u as FileText } from "../_libs/lucide-react.mjs";
import { b as getSnapshot } from "./router-Bq2_uDkI.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-Bsikfj1q.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function RelayMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: cn("size-5", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 8.5c2.8-3.2 8.2-3.2 11 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.7",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 15.5c2.8 3.2 8.2 3.2 11 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.7",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "5.2",
				cy: "12",
				r: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18.8",
				cy: "12",
				r: "1.5",
				fill: "currentColor"
			})
		]
	});
}
function ChannelMark({ id, className }) {
	const cls = cn("size-4", className);
	if (id === "telegram") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: cls,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20.5 4.6 3.8 11.1c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.6 5.1c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L21.9 5.8c.3-1.2-.4-1.7-1.4-1.2Z",
			fill: "currentColor"
		})
	});
	if (id === "whatsapp") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: cls,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 3.2A8.3 8.3 0 0 0 5.2 16.4L4 20.8l4.5-1.2A8.3 8.3 0 1 0 12 3.2Zm4.6 11.7c-.2.5-1.1 1-1.6 1-1.4.1-3.2-.8-4.6-2.2-1.5-1.5-2.4-3.4-2.2-4.7.1-.5.6-1.4 1.1-1.6.3-.1.6 0 .8.3l1 1.5c.1.2.1.5 0 .7L10.5 11c.4.8 1.2 1.6 2 2l1.2-.6c.2-.1.5-.1.7 0l1.5 1c.3.2.4.5.3.8Z",
			fill: "currentColor"
		})
	});
	if (id === "max") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: cls,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3.5",
			y: "3.5",
			width: "17",
			height: "17",
			rx: "4",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7.5 16V8.5L12 13l4.5-4.5V16",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinejoin: "round"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: cls,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12.4 3.5c-3.2 0-5.2 1.6-6.1 4.8h3.4c.4-1.6 1.3-2.4 2.7-2.4 1.2 0 2 .6 2.4 1.8.2.7.1 1.3-.3 1.8H8.2v2.5h6.1c-.5 2.3-1.9 3.5-4.1 3.5-2.2 0-3.6-1.2-4.2-3.5H2.7c.8 4 3.6 6.4 8.4 6.4 5.2 0 8.2-3.2 8.2-8 0-4.4-2.7-6.9-6.9-6.9Z",
			fill: "currentColor"
		})
	});
}
function useRelay(initial) {
	return useQuery({
		queryKey: ["relay"],
		queryFn: () => getSnapshot(),
		initialData: initial,
		refetchInterval: 2500
	});
}
var NAV = [
	{
		to: "/",
		label: "Входящие",
		icon: Inbox,
		match: (p) => p === "/"
	},
	{
		to: "/queues",
		label: "Очереди",
		icon: Layers,
		match: (p) => p.startsWith("/queues")
	},
	{
		to: "/playbooks",
		label: "Сценарии",
		icon: BookOpen,
		match: (p) => p.startsWith("/playbooks")
	},
	{
		to: "/documents",
		label: "Файлы",
		icon: FileText,
		match: (p) => p.startsWith("/documents")
	},
	{
		to: "/channels",
		label: "Каналы",
		icon: Plug,
		match: (p) => p.startsWith("/channels")
	},
	{
		to: "/mcp",
		label: "MCP",
		icon: Radio,
		match: (p) => p.startsWith("/mcp")
	}
];
function AppShell({ children, title, action }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data } = useRelay();
	const unread = data?.chats.reduce((n, c) => n + c.unread, 0) ?? 0;
	const live = data?.stats.mcpLastMs ?? 0;
	const demo = data?.channels.every((c) => c.demo) ?? true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden md:flex w-56 shrink-0 flex-col border-r border-line px-3 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-md bg-elevated text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelayMark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium tracking-tight",
								children: "Relay"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted truncate",
								children: data?.workspace ?? "Нордлайн"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-0.5",
						children: NAV.map((item) => {
							const active = item.match(pathname);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-10 items-center gap-2 rounded-md px-2.5 text-sm transition-[background-color,color] duration-150", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4",
										strokeWidth: 1.7
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: item.label
									}),
									item.to === "/" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-xs text-accent",
										children: unread
									}) : null
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto px-2 pt-4 text-xs text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", demo ? "bg-warn" : "bg-ok") }),
								"MCP ",
								live ? `${live} мс` : "онлайн"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: demo ? "Демо-каналы" : "Живые токены"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line px-4 md:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-sm font-medium tracking-tight",
						children: title
					}), action]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-hidden pb-16 md:pb-0",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "md:hidden fixed bottom-0 inset-x-0 z-20 flex h-16 border-t border-line bg-bg/95 px-1 pb-[env(safe-area-inset-bottom)]",
				children: NAV.map((item) => {
					const active = item.match(pathname);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] tracking-wide", active ? "text-fg" : "text-subtle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: 1.7
							}),
							item.label,
							item.to === "/" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-[calc(50%-18px)] size-1.5 rounded-full bg-accent" }) : null
						]
					}, item.to);
				})
			})
		]
	});
}
var buttonStyles = cva("inline-flex items-center justify-center gap-2 font-medium select-none transition-[background-color,color,opacity,box-shadow,transform] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-elevated",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			subtle: "bg-elevated text-fg hover:bg-line"
		},
		size: {
			sm: "h-8 px-3 text-sm rounded-md",
			md: "h-10 px-3.5 text-sm rounded-md",
			lg: "h-11 px-4 text-[0.9375rem] rounded-lg",
			icon: "size-10 rounded-md",
			iconSm: "size-8 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonStyles({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 focus:shadow-[var(--shadow-border-hover)]", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("w-full rounded-md bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 focus:shadow-[var(--shadow-border-hover)] resize-none", className),
		...props
	});
}
function Badge({ children, tone = "stone", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums", {
			stone: "text-fg bg-elevated",
			sage: "text-ok bg-ok/10",
			warn: "text-warn bg-warn/10",
			danger: "text-danger bg-danger/10",
			muted: "text-muted bg-elevated"
		}[tone], className),
		children
	});
}
function formatClock(iso) {
	return new Date(iso).toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatAgo(iso, nowIso) {
	const now = nowIso ? new Date(nowIso).getTime() : Date.now();
	const t = new Date(iso).getTime();
	const sec = Math.max(0, Math.round((now - t) / 1e3));
	if (sec < 45) return "сейчас";
	const min = Math.round(sec / 60);
	if (min < 60) return `${min} мин`;
	const h = Math.round(min / 60);
	if (h < 24) return `${h} ч`;
	return `${Math.round(h / 24)} д`;
}
function slaLeft(dueIso, nowIso) {
	const now = nowIso ? new Date(nowIso).getTime() : Date.now();
	const due = new Date(dueIso).getTime();
	const min = Math.round((due - now) / 6e4);
	if (min < 0) return {
		label: `+${Math.abs(min)} мин`,
		tone: "danger"
	};
	if (min <= 5) return {
		label: `${min} мин`,
		tone: "danger"
	};
	if (min <= 15) return {
		label: `${min} мин`,
		tone: "warn"
	};
	return {
		label: `${min} мин`,
		tone: "ok"
	};
}
var CHANNEL_LABEL = {
	telegram: "Telegram",
	whatsapp: "WhatsApp",
	max: "MAX",
	vk: "VK"
};
var PRIORITY_LABEL = {
	p0: "P0",
	p1: "P1",
	p2: "P2",
	p3: "P3"
};
var ROUTE_SOURCE_LABEL = {
	inbound: "входящее",
	apply: "прогон",
	manual: "вручную",
	document: "файл",
	probe: "проверка",
	escalate: "эскалация"
};
var ESCALATION_TRIGGER_LABEL = {
	keyword: "текст",
	sla: "просрочен SLA",
	silence: "нет ответа",
	repeats: "повторы клиента"
};
var FORK_TRIGGER_LABEL = {
	keyword: "текст",
	document: "файл",
	silence: "нет ответа",
	repeats: "повторы клиента"
};
var FORK_ACTION_LABEL = {
	site: "раздел сайта",
	crm: "карточка CRM",
	manager: "менеджер",
	queue: "очередь",
	url: "ссылка"
};
var DOC_LABEL = {
	invoice: "Счёт",
	contract: "Договор",
	identity: "Документ",
	resume: "Резюме",
	act: "Акт",
	other: "Файл"
};
//#endregion
export { slaLeft as _, ChannelMark as a, FORK_ACTION_LABEL as c, PRIORITY_LABEL as d, ROUTE_SOURCE_LABEL as f, formatClock as g, formatAgo as h, CHANNEL_LABEL as i, FORK_TRIGGER_LABEL as l, cn as m, Badge as n, DOC_LABEL as o, Textarea as p, Button as r, ESCALATION_TRIGGER_LABEL as s, AppShell as t, Input as u, useRelay as v };

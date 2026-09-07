import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as MCP_TOOLS } from "./catalog-DJQRIyZJ.mjs";
import { i as Route$4 } from "./router-Bq2_uDkI.mjs";
import { h as formatAgo, m as cn, n as Badge, p as Textarea, r as Button, t as AppShell, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mcp-BenlwmtP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		label: "initialize",
		body: {
			jsonrpc: "2.0",
			id: 1,
			method: "initialize",
			params: {
				protocolVersion: "2025-03-26",
				capabilities: {},
				clientInfo: {
					name: "relay-ui",
					version: "1.0"
				}
			}
		}
	},
	{
		label: "tools/list",
		body: {
			jsonrpc: "2.0",
			id: 2,
			method: "tools/list"
		}
	},
	{
		label: "list_chats",
		body: {
			jsonrpc: "2.0",
			id: 3,
			method: "tools/call",
			params: {
				name: "list_chats",
				arguments: { unread: true }
			}
		}
	},
	{
		label: "get_stats",
		body: {
			jsonrpc: "2.0",
			id: 4,
			method: "tools/call",
			params: {
				name: "get_stats",
				arguments: {}
			}
		}
	},
	{
		label: "send_message",
		body: {
			jsonrpc: "2.0",
			id: 5,
			method: "tools/call",
			params: {
				name: "send_message",
				arguments: {
					chat_id: "c1",
					text: "Трекинг NL-4821: в пути, слот на рампе 21:40."
				}
			}
		}
	},
	{
		label: "list_kinds",
		body: {
			jsonrpc: "2.0",
			id: 6,
			method: "tools/call",
			params: {
				name: "list_kinds",
				arguments: {}
			}
		}
	},
	{
		label: "list_knowledge",
		body: {
			jsonrpc: "2.0",
			id: 7,
			method: "tools/call",
			params: {
				name: "list_knowledge",
				arguments: { kind_id: "k-track" }
			}
		}
	},
	{
		label: "test_fork",
		body: {
			jsonrpc: "2.0",
			id: 8,
			method: "tools/call",
			params: {
				name: "test_fork",
				arguments: {
					text: "Не пришёл трекинг по NL-4821",
					kind_id: "k-track"
				}
			}
		}
	}
];
function McpView({ snap }) {
	const [req, setReq] = (0, import_react.useState)(JSON.stringify(PRESETS[2]?.body, null, 2));
	const [res, setRes] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const endpoint = typeof window !== "undefined" ? `${window.location.origin}/api/mcp` : "/api/mcp";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full min-h-0 overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 p-4 lg:grid-cols-[1fr_1fr] max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium",
								children: "Эндпоинт"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: "Streamable HTTP, JSON-RPC 2.0. Claude, Cursor, n8n — POST сюда."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "sage",
								children: [snap.stats.mcpLastMs, " мс"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2 rounded-lg bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "min-w-0 flex-1 truncate font-mono text-xs text-fg",
								children: endpoint
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: async () => {
									await navigator.clipboard.writeText(endpoint);
									setCopied(true);
									setTimeout(() => setCopied(false), 1200);
								},
								children: copied ? "Скопировано" : "Копировать"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-3 overflow-x-auto rounded-lg bg-elevated p-3 font-mono text-[11px] text-muted leading-relaxed",
							children: `{
  "mcpServers": {
    "relay": { "url": "${endpoint}" }
  }
}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-3 gap-2",
							children: [
								["Вызовы", snap.stats.mcpCalls],
								["Аптайм", `${Math.round(snap.stats.uptimeMs / 1e3)} с`],
								["Tools", MCP_TOOLS.length]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-elevated px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-subtle",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm tabular-nums",
									children: v
								})]
							}, String(k)))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Playground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setReq(JSON.stringify(p.body, null, 2)),
								children: p.label
							}, p.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-3 min-h-40 font-mono text-xs",
							value: req,
							onChange: (e) => setReq(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-2",
							size: "sm",
							disabled: pending,
							onClick: async () => {
								setPending(true);
								const t0 = performance.now();
								try {
									const r = await fetch("/api/mcp", {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
											Accept: "application/json"
										},
										body: req
									});
									const json = await r.json();
									setRes(`${Math.round(performance.now() - t0)} мс · HTTP ${r.status}\n${JSON.stringify(json, null, 2)}`);
								} catch (err) {
									setRes(err instanceof Error ? err.message : "ошибка");
								} finally {
									setPending(false);
								}
							},
							children: pending ? "Вызов…" : "Выполнить"
						}),
						res ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-3 max-h-72 overflow-auto rounded-lg bg-elevated p-3 font-mono text-[11px] text-muted whitespace-pre-wrap",
							children: res
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 pb-4 max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium mb-3",
					children: "Инструменты"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 md:grid-cols-2",
					children: MCP_TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "rounded-xl bg-surface p-4 text-left transition-[box-shadow] duration-150 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
						onClick: () => setReq(JSON.stringify({
							jsonrpc: "2.0",
							id: 9,
							method: "tools/call",
							params: {
								name: tool.name,
								arguments: {}
							}
						}, null, 2)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs text-accent",
							children: tool.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted leading-relaxed",
							children: tool.description
						})]
					}, tool.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 pb-8 max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium mb-3",
					children: "Журнал вызовов"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface",
					children: snap.mcpLog.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center gap-3 px-4 py-2.5 text-sm", i !== 0 && "border-t border-line"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", row.ok ? "bg-ok" : "bg-danger") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted w-28 truncate",
								children: row.method
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate text-xs",
								children: row.tool ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-subtle tabular-nums",
								children: [row.ms, " мс"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle w-14 text-right",
								children: formatAgo(row.at, snap.now)
							})
						]
					}, row.id))
				})]
			})
		]
	});
}
function McpPage() {
	const initial = Route$4.useLoaderData();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "MCP-сервер",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McpView, { snap: data ?? initial })
	});
}
//#endregion
export { McpPage as component };

import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as CHANNEL_META } from "./catalog-DJQRIyZJ.mjs";
import { _ as disconnectChannelFn, d as connectChannelFn, o as Route$6 } from "./router-Bq2_uDkI.mjs";
import { a as ChannelMark, h as formatAgo, n as Badge, r as Button, t as AppShell, u as Input, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channels-CaC7P4ll.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChannelsView({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-y-auto p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2 max-w-4xl",
			children: snap.channels.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelCard, {
				snap,
				id: ch.id
			}, ch.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-xs text-subtle leading-relaxed",
			children: "Токены живут в памяти сервера этой сессии и не пишутся в базу. Без токена канал работает как живое демо: входящие появляются сами, MCP-инструменты отвечают мгновенно."
		})]
	});
}
function ChannelCard({ snap, id }) {
	const ch = snap.channels.find((c) => c.id === id);
	const meta = CHANNEL_META[id];
	const qc = useQueryClient();
	const [token, setToken] = (0, import_react.useState)("");
	const [extra, setExtra] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelMark, {
							id,
							className: "size-5"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium",
								children: ch.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: ch.demo ? "warn" : "sage",
								children: ch.demo ? "демо" : "живой"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted truncate",
							children: ch.account
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-xs text-subtle tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [ch.latencyMs, " мс"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatAgo(ch.lastEventAt, snap.now) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: "Входящие"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg tabular-nums",
						children: ch.inbound
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: "Исходящие"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg tabular-nums",
						children: ch.outbound
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted leading-relaxed",
				children: meta.hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-2",
				onSubmit: async (e) => {
					e.preventDefault();
					setPending(true);
					setError(null);
					try {
						await connectChannelFn({ data: {
							channelId: id,
							token,
							extra: extra || void 0
						} });
						setToken("");
						setExtra("");
						qc.invalidateQueries({ queryKey: ["relay"] });
					} catch (err) {
						setError(err instanceof Error ? err.message : "Не удалось подключить");
					} finally {
						setPending(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "off",
						placeholder: "Токен бота / Cloud API",
						value: token,
						onChange: (e) => setToken(e.target.value)
					}),
					meta.extraLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: meta.extraPlaceholder ?? meta.extraLabel,
						value: extra,
						onChange: (e) => setExtra(e.target.value)
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: !token.trim() || pending,
							children: pending ? "Проверка…" : "Подключить"
						}), !ch.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: async () => {
								await disconnectChannelFn({ data: { channelId: id } });
								qc.invalidateQueries({ queryKey: ["relay"] });
							},
							children: "Демо"
						}) : null]
					})
				]
			})
		]
	});
}
function ChannelsPage() {
	const initial = Route$6.useLoaderData();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Каналы",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelsView, { snap: data ?? initial })
	});
}
//#endregion
export { ChannelsPage as component };

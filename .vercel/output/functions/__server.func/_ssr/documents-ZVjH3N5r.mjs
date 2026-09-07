import { a as require_jsx_runtime, i as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as processDocFn, a as Route$5 } from "./router-Bq2_uDkI.mjs";
import { h as formatAgo, n as Badge, o as DOC_LABEL, r as Button, t as AppShell, v as useRelay } from "./format-Bsikfj1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-ZVjH3N5r.js
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	{
		id: "inbox",
		title: "Входящие"
	},
	{
		id: "classified",
		title: "Разобраны"
	},
	{
		id: "routed",
		title: "В очереди"
	},
	{
		id: "done",
		title: "Готово"
	}
];
function DocumentsView({ snap }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0 overflow-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 p-4 md:grid-cols-4",
			children: COLS.map((col) => {
				const docs = snap.documents.filter((d) => d.status === col.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-2 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: col.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle tabular-nums",
							children: docs.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: docs.map((d) => {
							const chat = snap.chats.find((c) => c.id === d.chatId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-lg bg-elevated p-3 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm truncate",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "muted",
											children: DOC_LABEL[d.kind]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-subtle",
											children: [d.sizeKb, " КБ"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted leading-relaxed",
										children: d.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
										className: "mt-2 space-y-1",
										children: Object.entries(d.fields).slice(0, 4).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-subtle",
												children: k
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "text-fg truncate",
												children: v
											})]
										}, k))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "text-xs text-muted hover:text-fg",
											onClick: () => chat && navigate({
												to: "/",
												search: { chat: chat.id }
											}),
											children: [
												chat?.title ?? "диалог",
												" · ",
												formatAgo(d.at, snap.now)
											]
										}), d.status !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: async () => {
												await processDocFn({ data: { documentId: d.id } });
												qc.invalidateQueries({ queryKey: ["relay"] });
											},
											children: "Разобрать"
										}) : null]
									})
								]
							}, d.id);
						})
					})]
				}, col.id);
			})
		})
	});
}
function DocumentsPage() {
	const initial = Route$5.useLoaderData();
	const { data } = useRelay(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Документы",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentsView, { snap: data ?? initial })
	});
}
//#endregion
export { DocumentsPage as component };

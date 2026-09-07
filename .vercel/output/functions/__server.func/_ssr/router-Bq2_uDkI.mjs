import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as createRootRoute, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-DDletREw.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSnapshot = createServerFn({ method: "GET" }).handler(createSsrRpc("57c236406217c959f479bb1daab482b4059342e1cfe4176e36206e9420da583d"));
var sendMessageFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e9a74e4e21a94ef4ac2a59ec0dd3522bf4a3a84840b4fbf79931fd0d1b571761"));
var markReadFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("022bc444f76c532a83be3f7b7b9058080fbd4a78c2ffa2b076e8a34c3f6a2bc8"));
var assignFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7c1012462ac3e939ec39674888029f22e28bac44ea7cfd0b792e853ae4de5242"));
var routeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("75f5755e89d2b82292facb372fad8677a38aacf9bdcb11f8049ed1ad7915580a"));
var processDocFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f3581f9b9cbcfb8c0111b52a8cd08aa9c1917c47e0abd867b30c3238d8b5a87a"));
var connectChannelFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("9c3458ba39f98c91473c38592d251292f66cf456f4fb2b4c285e2515e481ac28"));
var disconnectChannelFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("232ecfb9591f4c52f30e819060a9dd42311f8da04bcdeb2d2bfce3da7ec70e3c"));
var toggleRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f57eafca14d925d825cfa5765c1832974e423432d570ccdc821a55ee31ba7460"));
var upsertRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("044a5597b3a09266e995e771b77129c13ee7493f68f89c4d3d153bf233e00df9"));
var deleteRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b0290302902705beab8f4be111c7e57117bf39823e2b20fb087d38e559a8ab38"));
var moveRuleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b970ad165b0b0179ac0bb5c0384a64f5a9db758f54af9692fa86009f08c7e1e1"));
var testRouteFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b270a2c14d5676c4f78c7598c4780099a8710cf8f59fee315fc4cffe4a60ee96"));
var applyRouterFn = createServerFn({ method: "POST" }).validator((input = {}) => input).handler(createSsrRpc("c05abcd8d1926ede027b807959b05cfd0c1aff0e968d812d54040aaae7603748"));
var applyEscalationFn = createServerFn({ method: "POST" }).handler(createSsrRpc("bc48a5ff1c5b0be03d80241978b6e1c34756ab1bd202ec22c66dff316704dcda"));
var escalateTicketFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3f78a5f9f0774946eb7777958a06e0984f1960c45ab5cbaacf4d46bb3e362d78"));
var toggleEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("dd8b516bef048fe7843a6c27613b4fd7b1a4defddb34038753ee5c99621fcb8c"));
var deleteEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("95a9f16d43a772a4ccf29ff41930488d246aab33406d56ff086db19e83364e28"));
var upsertEscalationFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d1a9b8df6b80fb717cdd5f48c5ec32578ffcdb5bdca66445485626bab6a3a93f"));
var upsertKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0167d46e82e248f63d6cc0fd81b1d4b705157c2ac092b01539324b890b4c0276"));
var deleteKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a1a2aba043145bc71bb514a1236d62bd5c00053ef6d5122e2f027a0f312e9c29"));
var setChatKindFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("2d59003ead56fe649fa408058303c5a57d15a9fba9f7c890dee15fe546bc2f00"));
var upsertKnowledgeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("30534dbc8ee45e08944d30b3b579882be9c12223de619e4c9f6745f9faa41503"));
var deleteKnowledgeFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("85e64bdc98f0c345711a01a4f06646938f725d45aaa3e8ab826139820dffef00"));
var upsertForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("36ae7a9de827b35c75c0c103329000fe18b2f8d3494b31fec7917d7877e2bea0"));
var deleteForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0e21a9e5f82062ca9dc04515d2134f2e55bb358201332f85bff62b850b9d1b0d"));
var toggleForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("cb2e931a83103149f9bf3c9694cb8c53fecb43446e71cd15a795461f2b63088a"));
var testForkFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("8db6ce1a91f0985f4c33a90d63105e74f0a302ba3f1868f670e29388087012c9"));
var draftReplyFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ad0c543c0798504e39ca9ed0fdff32a86133d0d79e9a9a3c09d91e6fd0a3ecd2"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bq2_uDkI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function QueryProvider({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		refetchOnWindowFocus: false,
		staleTime: 1500
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children
	});
}
var styles_default = "/assets/styles-D0ggjQHf.css";
var APP_NAME = "Relay";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0c0c0d"
			},
			{
				name: "description",
				content: "MCP-шлюз для Telegram, WhatsApp, MAX и очередей."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg font-sans",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-DWk3jOaq.mjs");
var Route$7 = createFileRoute("/")({
	validateSearch: (raw) => ({ chat: typeof raw.chat === "string" ? raw.chat : void 0 }),
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./channels-CaC7P4ll.mjs");
var Route$6 = createFileRoute("/channels")({
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./documents-ZVjH3N5r.mjs");
var Route$5 = createFileRoute("/documents")({
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./mcp-BenlwmtP.mjs");
var Route$4 = createFileRoute("/mcp")({
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./playbooks-DhS_VthN.mjs");
var Route$3 = createFileRoute("/playbooks")({
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./queues-CIkOW0Bl.mjs");
var Route$2 = createFileRoute("/queues")({
	loader: () => getSnapshot(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
	"Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version",
	"Access-Control-Expose-Headers": "Mcp-Session-Id"
};
function withCors(res) {
	const headers = new Headers(res.headers);
	for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
	return new Response(res.body, {
		status: res.status,
		headers
	});
}
var Route$1 = createFileRoute("/api/mcp")({ server: { handlers: {
	OPTIONS: async () => withCors(new Response(null, { status: 204 })),
	GET: async ({ request }) => {
		const { mcpHealth } = await import("./mcp.server-3nNprMoR.mjs");
		if ((request.headers.get("accept") ?? "").includes("text/event-stream")) return withCors(new Response(`: relay ready\n\nevent: endpoint\ndata: /api/mcp\n\n`, { headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive"
		} }));
		return withCors(Response.json(mcpHealth()));
	},
	POST: async ({ request }) => {
		const { handleMcpRpc } = await import("./mcp.server-3nNprMoR.mjs");
		let rpc;
		try {
			rpc = await request.json();
		} catch {
			return withCors(Response.json({
				jsonrpc: "2.0",
				id: null,
				error: {
					code: -32700,
					message: "Parse error"
				}
			}, { status: 400 }));
		}
		const result = await handleMcpRpc(rpc);
		if (result === null) return withCors(new Response(null, { status: 202 }));
		return withCors(Response.json(result, { headers: { "Mcp-Session-Id": "relay-live" } }));
	},
	DELETE: async () => withCors(new Response(null, { status: 204 }))
} } });
function asChannel(raw) {
	if (raw === "telegram" || raw === "whatsapp" || raw === "max" || raw === "vk") return raw;
	return null;
}
var Route = createFileRoute("/api/webhooks/$channel")({ server: { handlers: { POST: async ({ params, request }) => {
	const channel = asChannel(params.channel);
	if (!channel) return Response.json({
		ok: false,
		error: "unknown channel"
	}, { status: 404 });
	const { addIncoming } = await import("./engine.server-hN4uVWC-.mjs");
	const payload = await request.json().catch(() => ({}));
	if (channel === "telegram") {
		const msg = payload.message;
		const text = msg?.text;
		if (text) addIncoming({
			channel: "telegram",
			title: msg?.chat?.title || msg?.from?.first_name || "Telegram",
			peerId: String(msg?.chat?.id ?? "tg"),
			text
		});
	} else if (channel === "max") {
		const message = payload.message;
		const text = message?.body?.text ?? payload.text;
		if (text) addIncoming({
			channel: "max",
			title: message?.sender?.name || "MAX",
			peerId: String(message?.sender?.user_id ?? "max"),
			text
		});
	} else if (channel === "whatsapp") {
		const value = (payload.entry?.[0])?.changes?.[0]?.value;
		const msg = value?.messages?.[0];
		const text = msg?.text?.body;
		if (text) addIncoming({
			channel: "whatsapp",
			title: value?.contacts?.[0]?.profile?.name || msg?.from || "WhatsApp",
			peerId: msg?.from || "wa",
			text
		});
	} else {
		const text = String(payload.text ?? payload.body ?? "");
		if (text) addIncoming({
			channel: "vk",
			title: String(payload.title ?? "VK"),
			peerId: String(payload.peerId ?? "vk"),
			text
		});
	}
	return Response.json({ ok: true });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	ChannelsRoute: Route$6.update({
		id: "/channels",
		path: "/channels",
		getParentRoute: () => Route$8
	}),
	DocumentsRoute: Route$5.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => Route$8
	}),
	McpRoute: Route$4.update({
		id: "/mcp",
		path: "/mcp",
		getParentRoute: () => Route$8
	}),
	PlaybooksRoute: Route$3.update({
		id: "/playbooks",
		path: "/playbooks",
		getParentRoute: () => Route$8
	}),
	QueuesRoute: Route$2.update({
		id: "/queues",
		path: "/queues",
		getParentRoute: () => Route$8
	}),
	ApiMcpRoute: Route$1.update({
		id: "/api/mcp",
		path: "/api/mcp",
		getParentRoute: () => Route$8
	}),
	ApiWebhooksChannelRoute: Route.update({
		id: "/api/webhooks/$channel",
		path: "/api/webhooks/$channel",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { toggleForkFn as A, processDocFn as C, testForkFn as D, setChatKindFn as E, upsertKnowledgeFn as F, upsertRuleFn as I, upsertEscalationFn as M, upsertForkFn as N, testRouteFn as O, upsertKindFn as P, moveRuleFn as S, sendMessageFn as T, disconnectChannelFn as _, Route$5 as a, getSnapshot as b, applyEscalationFn as c, connectChannelFn as d, deleteEscalationFn as f, deleteRuleFn as g, deleteKnowledgeFn as h, Route$4 as i, toggleRuleFn as j, toggleEscalationFn as k, applyRouterFn as l, deleteKindFn as m, Route$2 as n, Route$6 as o, deleteForkFn as p, Route$3 as r, Route$7 as s, router_exports as t, assignFn as u, draftReplyFn as v, routeFn as w, markReadFn as x, escalateTicketFn as y };

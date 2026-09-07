import type { ChannelId } from "@/lib/relay/types";
import { cn } from "@/lib/utils";

export function RelayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path
        d="M6.5 8.5c2.8-3.2 8.2-3.2 11 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 15.5c2.8 3.2 8.2 3.2 11 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="5.2" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18.8" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ChannelMark({ id, className }: { id: ChannelId; className?: string }) {
  const cls = cn("size-4", className);
  if (id === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path
          d="M20.5 4.6 3.8 11.1c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.6 5.1c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L21.9 5.8c.3-1.2-.4-1.7-1.4-1.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path
          d="M12 3.2A8.3 8.3 0 0 0 5.2 16.4L4 20.8l4.5-1.2A8.3 8.3 0 1 0 12 3.2Zm4.6 11.7c-.2.5-1.1 1-1.6 1-1.4.1-3.2-.8-4.6-2.2-1.5-1.5-2.4-3.4-2.2-4.7.1-.5.6-1.4 1.1-1.6.3-.1.6 0 .8.3l1 1.5c.1.2.1.5 0 .7L10.5 11c.4.8 1.2 1.6 2 2l1.2-.6c.2-.1.5-.1.7 0l1.5 1c.3.2.4.5.3.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (id === "max") {
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 16V8.5L12 13l4.5-4.5V16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden>
      <path
        d="M12.4 3.5c-3.2 0-5.2 1.6-6.1 4.8h3.4c.4-1.6 1.3-2.4 2.7-2.4 1.2 0 2 .6 2.4 1.8.2.7.1 1.3-.3 1.8H8.2v2.5h6.1c-.5 2.3-1.9 3.5-4.1 3.5-2.2 0-3.6-1.2-4.2-3.5H2.7c.8 4 3.6 6.4 8.4 6.4 5.2 0 8.2-3.2 8.2-8 0-4.4-2.7-6.9-6.9-6.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

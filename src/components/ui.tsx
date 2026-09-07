import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none transition-[background-color,color,opacity,box-shadow,transform] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        ghost: "bg-transparent text-fg hover:bg-elevated",
        outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        subtle: "bg-elevated text-fg hover:bg-line",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-10 px-3.5 text-sm rounded-md",
        lg: "h-11 px-4 text-[0.9375rem] rounded-lg",
        icon: "size-10 rounded-md",
        iconSm: "size-8 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md bg-elevated px-3 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 focus:shadow-[var(--shadow-border-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 focus:shadow-[var(--shadow-border-hover)] resize-none",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  children,
  tone = "stone",
  className,
}: {
  children: React.ReactNode;
  tone?: "stone" | "sage" | "warn" | "danger" | "muted";
  className?: string;
}) {
  const tones = {
    stone: "text-fg bg-elevated",
    sage: "text-ok bg-ok/10",
    warn: "text-warn bg-warn/10",
    danger: "text-danger bg-danger/10",
    muted: "text-muted bg-elevated",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums", tones[tone], className)}>
      {children}
    </span>
  );
}

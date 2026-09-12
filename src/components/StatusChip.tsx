import type { ReactNode } from "react";

export type Tone = "accent" | "cyan" | "blue";

const TONE: Record<Tone, { dot: string; text: string; chip: string }> = {
  accent: {
    dot: "bg-accent",
    text: "text-accent-hi",
    chip: "border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)]",
  },
  cyan: {
    dot: "bg-ai",
    text: "text-ai",
    chip: "border-[rgba(var(--accent-cyan-rgb),0.28)] bg-[rgba(var(--accent-cyan-rgb),0.08)]",
  },
  blue: {
    dot: "bg-azure",
    text: "text-azure",
    chip: "border-[rgba(var(--accent-blue-rgb),0.28)] bg-[rgba(var(--accent-blue-rgb),0.08)]",
  },
};

/** A small status readout: a coloured dot and a word, in the mono register. */
export default function StatusChip({
  tone,
  pulse = false,
  children,
}: {
  tone: Tone;
  pulse?: boolean;
  children: ReactNode;
}) {
  const c = TONE[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${c.chip} ${c.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot} ${pulse ? "animate-pulse-dot" : ""}`} />
      {children}
    </span>
  );
}

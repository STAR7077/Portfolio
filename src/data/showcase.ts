import type { ProjectCategory } from "./projects";

/**
 * How the Work section presents each project.
 *
 * Four projects are featured, each with its own layout so the section does
 * not repeat one card twelve times. They cover the three categories between
 * them, so every filter still opens on at least one showcase. Everything
 * else sits in the compact grid underneath.
 */

export type ShowcaseLayout =
  /** Visual on the left at 60%, write-up on the right. */
  | "split-left"
  /** Write-up on the left, visual on the right at 60%. */
  | "split-right"
  /** Write-up across the top, a full-width visual underneath. */
  | "wide"
  /** A full-width product visual first, the write-up underneath. */
  | "dashboard";

export const FEATURED: { slug: string; layout: ShowcaseLayout }[] = [
  { slug: "real-estate-whatsapp-ai-bot", layout: "split-left" },
  { slug: "swop", layout: "split-right" },
  { slug: "inmatic-ai", layout: "wide" },
  { slug: "planfy", layout: "dashboard" },
];

export type FrameKind = "browser" | "phone" | "media";

/**
 * The frame each project's imagery sits in. Most screenshots are wide
 * desktop captures and get a browser. The bot's is a portrait chat and gets
 * a phone. SWOP's images are store-listing strips that already contain the
 * phones, so wrapping them in another device would be a phone inside a
 * phone: they get a plain media frame.
 */
const FRAMES: Record<string, FrameKind> = {
  "real-estate-whatsapp-ai-bot": "phone",
  swop: "media",
};

export function frameFor(slug: string): FrameKind {
  return FRAMES[slug] ?? "browser";
}

/**
 * Category accents: a quiet signal, not a recolour. Only the tag, the
 * hover border and a faint glow change; every card stays the same surface.
 */
export const CATEGORY_TONE: Record<
  ProjectCategory,
  { text: string; tag: string; rgb: string }
> = {
  ai: {
    text: "text-ai",
    tag: "border-[rgba(var(--accent-cyan-rgb),0.28)] bg-[rgba(var(--accent-cyan-rgb),0.08)] text-ai",
    rgb: "var(--accent-cyan-rgb)",
  },
  web: {
    text: "text-azure",
    tag: "border-[rgba(var(--accent-blue-rgb),0.28)] bg-[rgba(var(--accent-blue-rgb),0.08)] text-azure",
    rgb: "var(--accent-blue-rgb)",
  },
  mobile: {
    text: "text-accent-hi",
    tag: "border-[rgba(var(--accent-highlight-rgb),0.3)] bg-[rgba(var(--accent-highlight-rgb),0.1)] text-accent-hi",
    rgb: "var(--accent-highlight-rgb)",
  },
};

/** The domain shown in a browser frame's address bar. */
export function domainOf(link?: string): string | null {
  if (!link) return null;
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { Project, ProjectCategory } from "@/data/projects";
import { CATEGORY_TONE } from "@/data/showcase";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IconArrowUpRight } from "./icons";

/**
 * The parts every project presentation shares, so the featured showcases
 * and the compact cards describe a project in exactly the same terms.
 */

/**
 * A description that opens at a few lines with the rest one click away.
 *
 * The text is always in the page, so search engines and screen readers get
 * all of it; the clamp only keeps a long list from running for screens.
 * The toggle exists only when the clamped text is actually cut off, which
 * is re-measured as the element resizes, and is measured only while
 * collapsed since, expanded, nothing overflows by design.
 *
 * `dep` re-runs the measurement when the text itself changes (a language
 * switch).
 */
export function useClamp(dep: unknown) {
  const id = useId();
  const ref = useRef<HTMLParagraphElement | null>(null);
  const expandedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!expandedRef.current) setOverflowing(el.scrollHeight > el.clientHeight + 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [dep]);

  function toggle() {
    expandedRef.current = !expandedRef.current;
    setExpanded(expandedRef.current);
  }

  // The ref travels separately from the render state: reading render values
  // out of an object that also holds a ref counts as touching the ref.
  const state = { id, expanded, toggle, showToggle: overflowing || expanded };
  return [ref, state] as const;
}

export type ClampState = ReturnType<typeof useClamp>[1];

/** The Read more / Show less control for a useClamp description. */
export function ClampToggle({ clamp }: { clamp: ClampState }) {
  const { t } = useLanguage();
  if (!clamp.showToggle) return null;
  return (
    <button
      type="button"
      aria-expanded={clamp.expanded}
      aria-controls={clamp.id}
      onClick={clamp.toggle}
      // Above a stretched card link, so it stays clickable inside one.
      className="relative z-10 mt-2 w-fit rounded font-mono text-[11px] uppercase tracking-[0.12em] text-accent-hi transition-colors duration-300 hover:text-fg"
    >
      {clamp.expanded ? t.work.showLess : t.work.readMore}
    </button>
  );
}

export function useLinkLabel(project: Project) {
  const { t } = useLanguage();
  if (project.linkKind === "playStore") return t.work.playStore;
  if (project.linkKind === "drive") return t.work.projectFiles;
  return t.work.companySite;
}

export function CategoryTags({ categories }: { categories: ProjectCategory[] }) {
  const { t } = useLanguage();
  const label: Record<ProjectCategory, string> = {
    ai: t.categories.ai,
    web: t.categories.web,
    mobile: t.categories.mobile,
  };
  return (
    <span className="flex flex-wrap gap-1.5">
      {categories.map((c) => (
        <span
          key={c}
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] ${CATEGORY_TONE[c].tag}`}
        >
          {label[c]}
        </span>
      ))}
    </span>
  );
}

/** The stack as chips. With a limit, the remainder is counted, not dropped. */
export function TechList({ tech, limit }: { tech: string[]; limit?: number }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const hidden = tech.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-fg-2"
        >
          {item}
        </li>
      ))}
      {hidden > 0 && (
        <li className="rounded-md border border-dashed border-line px-2 py-1 font-mono text-[11px] text-fg-3">
          +{hidden}
        </li>
      )}
    </ul>
  );
}

/**
 * The outbound link. With `stretch`, its hit area covers the nearest
 * positioned ancestor, which is how a whole card becomes one link without
 * nesting interactive elements inside another.
 */
export function ProjectLink({
  project,
  stretch = false,
  className = "",
}: {
  project: Project;
  stretch?: boolean;
  className?: string;
}) {
  const label = useLinkLabel(project);
  if (!project.link) return null;
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title}: ${label}`}
      onClick={() => track("project_opened", { project: project.slug })}
      className={`inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold text-fg transition-colors duration-300 hover:text-accent-hi ${
        stretch ? "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']" : ""
      } ${className}`}
    >
      {label}
      <IconArrowUpRight size={15} className="nudge" />
    </a>
  );
}

/** The live number for the WhatsApp bot, so a visitor can try it. */
export function DemoChip({ number, className = "" }: { number: string; className?: string }) {
  const { t } = useLanguage();
  return (
    <a
      href={`https://wa.me/${number.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_opened", { from: "bot_demo" })}
      className={`inline-flex w-fit items-center gap-2 rounded-lg border border-[rgba(37,211,102,0.3)] bg-[rgba(37,211,102,0.08)] px-3 py-1.5 text-[13px] font-semibold text-[#5be38e] transition-colors duration-300 hover:bg-[rgba(37,211,102,0.14)] ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.71.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
      <span>{number}</span>
      <span className="font-normal text-fg-2">{t.work.tryBot}</span>
    </a>
  );
}

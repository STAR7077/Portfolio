"use client";

import { m } from "motion/react";
import type { WorkFilter } from "@/data/workFilter";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EASE_OUT } from "@/lib/motion";

/**
 * The category switch. The selected state is a surface that slides between
 * options rather than jumping, and each button's text is exactly its label,
 * so nothing but the label is announced or matched.
 */
export default function ProjectFilters({
  active,
  onChange,
}: {
  active: WorkFilter;
  onChange: (next: WorkFilter) => void;
}) {
  const { t } = useLanguage();
  const filters: { key: WorkFilter; label: string }[] = [
    { key: "all", label: t.work.filterAll },
    { key: "ai", label: t.categories.ai },
    { key: "web", label: t.categories.web },
    { key: "mobile", label: t.categories.mobile },
  ];

  return (
    <div
      role="group"
      aria-label={t.work.filterLabel}
      className="flex flex-wrap items-center gap-1 rounded-xl border border-line bg-white/[0.025] p-1"
    >
      {filters.map((f) => {
        const on = f.key === active;
        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(f.key)}
            className={`relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
              on ? "text-fg" : "text-fg-2 hover:text-fg"
            }`}
          >
            {on && (
              <m.span
                layoutId="work-filter"
                className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-inset ring-[rgba(113,107,255,0.4)]"
                transition={{ duration: 0.4, ease: EASE_OUT }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The promise panel under the hero headline: a label and three benefits,
 * each led by a small stroke icon.
 *
 * The three claims are the ones the client reviews on this site actually
 * make, so nothing here is a promise the testimonials do not already back.
 */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[var(--accent)]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function PromiseCard() {
  const { t } = useLanguage();

  const items = [
    {
      label: t.hero.promiseTime,
      // Cycle: a process that now runs itself.
      icon: (
        <Icon>
          <path d="M21 12a9 9 0 1 1-3.2-6.9" />
          <path d="M21 4v5h-5" />
        </Icon>
      ),
    },
    {
      label: t.hero.promiseDeadlines,
      // Calendar with a tick.
      icon: (
        <Icon>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <path d="m9 15 2 2 4-4" />
        </Icon>
      ),
    },
    {
      label: t.hero.promiseComms,
      // Speech bubble.
      icon: (
        <Icon>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.6A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
          <path d="M9 11h8M9 15h5" />
        </Icon>
      ),
    },
  ];

  return (
    <div className="mt-8 w-fit rounded-2xl border border-[var(--border)] bg-[#f5f5f8] px-6 py-5">
      <p className="text-[15px] text-[var(--muted)]">{t.hero.promiseLabel}</p>
      <ul className="mt-3.5 flex flex-wrap items-center gap-x-7 gap-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {item.icon}
            <span className="text-[14px] font-medium text-[var(--foreground)]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

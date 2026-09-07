"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The promise panel under the hero headline: a label and three benefits,
 * each led by a small stroke icon.
 *
 * Wording, panel and the coral icons follow the supplied reference.
 */

/** Coral from the reference, rather than the site accent. */
const CORAL = "#F04438";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke={CORAL}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
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
      // Clock with a plus: time added back.
      icon: (
        <Icon>
          <circle cx="10.5" cy="13.5" r="7.5" />
          <path d="M10.5 9.5v4l2.5 1.5" />
          <path d="M18 2.5v4M16 4.5h4" />
        </Icon>
      ),
    },
    {
      label: t.hero.promiseDeadlines,
      // Wrench inside a ring: things repaired.
      icon: (
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.8 9.2a2.6 2.6 0 0 1-3.4 3.4l-2.5 2.5a1.35 1.35 0 1 1-1.9-1.9l2.5-2.5a2.6 2.6 0 0 1 3.4-3.4l-1.6 1.6 1.4 1.4 1.6-1.6Z" />
        </Icon>
      ),
    },
    {
      label: t.hero.promiseComms,
      // People with a plus: more of them.
      icon: (
        <Icon>
          <path d="M2 9.5h4M4 7.5v4" />
          <circle cx="13" cy="8" r="3.2" />
          <path d="M19.5 20v-1.6a3.5 3.5 0 0 0-3.5-3.5h-6a3.5 3.5 0 0 0-3.5 3.5V20" />
          <path d="M18 5.4a3 3 0 0 1 0 5.2" />
        </Icon>
      ),
    },
  ];

  return (
    <div className="mt-8 w-fit rounded-2xl bg-[#f6f6f7] px-7 py-6">
      <p className="text-[17px] text-[#6b6b76]">{t.hero.promiseLabel}</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {item.icon}
            <span className="text-[14px] text-[var(--foreground)]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

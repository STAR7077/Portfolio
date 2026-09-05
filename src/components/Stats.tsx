"use client";

import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { locales } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Stats() {
  const { t } = useLanguage();

  // Counted from the real data so these can never drift from the page below.
  const fiveStar = testimonials.filter((item) => item.rating === 5).length;

  const items = [
    { value: String(projects.length), label: t.stats.projects },
    { value: String(fiveStar), label: t.stats.reviews },
    { value: String(locales.length), label: t.stats.languages },
    { value: "3", label: t.stats.platforms },
  ];

  return (
    <section className="relative -mt-6 pb-4">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 80} className="h-full">
            <div className="lift h-full rounded-2xl border border-[var(--border)] bg-white px-6 py-5 shadow-[0_10px_30px_-22px_rgba(22,21,28,0.5)] hover:border-[var(--accent)]/40">
              <div className="text-gradient-brand font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {item.value}
              </div>
              <div className="mt-1.5 text-[13px] text-[var(--muted)]">{item.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

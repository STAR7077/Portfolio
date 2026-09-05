"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import StackCard from "./StackCard";
import Reveal from "./Reveal";

export default function Work() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filters: { key: ProjectCategory | "all"; label: string }[] = [
    { key: "all", label: t.work.filterAll },
    { key: "ai", label: t.categories.ai },
    { key: "web", label: t.categories.web },
    { key: "mobile", label: t.categories.mobile },
  ];

  const visible =
    active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="work" className="border-t border-[var(--border)] py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 lg:grid-cols-12 lg:gap-14">
        {/* Left column pins while the deck scrolls past it. */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {t.work.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {t.work.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[var(--muted)]">{t.work.intro}</p>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((f) => {
                const on = active === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    aria-pressed={on}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                      on
                        ? "bg-[var(--accent)] text-white shadow-[0_10px_28px_-10px_rgba(109,40,217,0.7)]"
                        : "border border-[var(--border-strong)] bg-white text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 text-sm text-[var(--faint)]">
              {visible.length} / {projects.length}
            </p>
          </Reveal>
        </div>

        {/* The deck. Each card pins slightly lower than the one before it. */}
        <div key={active} className="panel-in lg:col-span-7">
          {visible.map((project, i) => (
            <StackCard
              key={project.slug}
              project={project}
              index={i}
              total={visible.length}
            />
          ))}
          {/* Tail space so the last card can settle before the section ends. */}
          <div className="h-24" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

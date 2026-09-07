"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import StackCard from "./StackCard";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";

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

  // No overflow-hidden on the section: it would turn this into a scroll
  // container and stop the cards below from pinning. SectionScenery clips
  // its own pieces instead.
  return (
    <section
      id="work"
      className="section-wash relative border-t border-[var(--border)] py-24 sm:py-28"
    >
      <SectionScenery preset="work" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.work.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-[42px] font-semibold leading-[1.16667] tracking-[-0.5px] text-[var(--foreground)] lg:text-[56px] xl:text-[72px]">
            {t.work.title}
          </h2>
          <p className="lead mt-7 max-w-2xl text-[var(--muted)]">{t.work.intro}</p>
        </Reveal>

        {/* Filters sit with the heading so the cards below can use the
            full page width, split evenly between copy and imagery. */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
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
            <span className="ml-2 font-mono text-sm text-[var(--faint)]">
              {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        {/* Full-width deck. Each card pins slightly lower than the one before. */}
        <div key={active} className="panel-in mt-12">
          {visible.map((project, i) => (
            <StackCard key={project.slug} project={project} index={i} total={visible.length} />
          ))}
          <div className="h-24" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

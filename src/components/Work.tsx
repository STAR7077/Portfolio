"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
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
    <section id="work" className="border-t border-white/5 bg-white/[0.015] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} />
          <p className="max-w-2xl text-slate-400">{t.work.intro}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                  active === f.key
                    ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[#0b0b12] shadow-[0_8px_24px_rgba(139,92,246,0.35)]"
                    : "border border-white/10 bg-white/[0.03] text-slate-300 backdrop-blur hover:border-white/25 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            // Keyed by filter too, so switching category replays the reveal.
            <Reveal key={`${active}-${project.slug}`} delay={(i % 3) * 90} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

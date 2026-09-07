"use client";

import { useSyncExternalStore } from "react";
import { projects } from "@/data/projects";
import {
  getServerSnapshot,
  getSnapshot,
  setWorkFilter,
  subscribe,
  type WorkFilter,
} from "@/data/workFilter";
import { useLanguage } from "@/i18n/LanguageProvider";
import StackCard from "./StackCard";
import Reveal from "./Reveal";
import CubeCluster from "./CubeCluster";

export default function Work() {
  const { t } = useLanguage();

  // The URL hash is the filter, so #work/mobile opens straight onto the
  // mobile projects and every filter click leaves a link worth sharing.
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const filters: { key: WorkFilter; label: string }[] = [
    { key: "all", label: t.work.filterAll },
    { key: "ai", label: t.categories.ai },
    { key: "web", label: t.categories.web },
    { key: "mobile", label: t.categories.mobile },
  ];

  const visible =
    active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  // No overflow-hidden on the section: it would turn this into a scroll
  // container and stop the cards below from pinning. The decoration band
  // clips its own contents instead.
  return (
    <section id="work" className="relative bg-[#1B1E87] py-24 sm:py-28">
      {/* One viewport of decoration at the top of the section: two
          concentric rings and the cube cluster, all sharing the reference's
          anchor point of top 50% / right 30%. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-screen overflow-hidden lg:block"
        aria-hidden="true"
      >
        <div className="absolute right-[30%] top-1/2 h-[160vh] w-[160vh] -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15" />
        <div className="absolute right-[30%] top-1/2 h-[100vh] w-[100vh] -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15" />
        <div className="absolute right-[30%] top-1/2 h-[100vh] w-[100vh] -translate-y-1/2 translate-x-1/2">
          <CubeCluster />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            {t.work.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-[42px] font-semibold leading-[1.16667] tracking-[-0.5px] text-white lg:text-[56px] xl:text-[72px]">
            {t.work.title}
          </h2>
          <p className="lead mt-7 max-w-2xl text-white/70">{t.work.intro}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {filters.map((f) => {
              const on = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setWorkFilter(f.key)}
                  aria-pressed={on}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                    on
                      ? "bg-white text-[#1B1E87] shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)]"
                      : "border border-white/25 bg-white/5 text-white/80 backdrop-blur hover:border-white hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            <span className="ml-2 font-mono text-sm text-white/50">
              {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

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

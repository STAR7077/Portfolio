"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// three.js is a large dependency, so it is split out of the main bundle and
// only fetched in the browser when this section renders.
const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[8%] rounded-full bg-[#e6e2f3]" />
    </div>
  ),
});

const PLACES = [
  { id: "brazil", lat: -10, lon: -52 },
  { id: "spain", lat: 40.2, lon: -3.7 },
  { id: "mexico", lat: 23.5, lon: -102 },
] as const;

export default function Reach() {
  const { t } = useLanguage();

  // PLACES is a module constant, so the scene is built once. Only the
  // labels change when the visitor switches language.
  const labels = Object.fromEntries(PLACES.map((p) => [p.id, t.reach[p.id]]));

  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading eyebrow={t.reach.eyebrow} title={t.reach.title} />
            <p className="max-w-md leading-relaxed text-[var(--muted)]">{t.reach.intro}</p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {PLACES.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--foreground)] shadow-sm"
                >
                  <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {labels[m.id]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0)_68%)] blur-2xl"
              aria-hidden="true"
            />
            <Globe points={PLACES} labels={labels} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

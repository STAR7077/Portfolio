"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageProvider";
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

// Country centroids, roughly. Order sets which label wins a tie on screen.
const PLACES = [
  { id: "brazil", lat: -10, lon: -52 },
  { id: "unitedStates", lat: 39.5, lon: -98.5 },
  { id: "canada", lat: 56, lon: -106 },
  { id: "mexico", lat: 23.5, lon: -102 },
  { id: "argentina", lat: -34, lon: -64 },
  { id: "peru", lat: -10, lon: -76 },
  { id: "colombia", lat: 4, lon: -73 },
  { id: "spain", lat: 40.2, lon: -3.7 },
  { id: "unitedKingdom", lat: 54, lon: -2 },
  { id: "germany", lat: 51, lon: 10.4 },
  { id: "denmark", lat: 56, lon: 9.5 },
  { id: "poland", lat: 52, lon: 19 },
  { id: "japan", lat: 36, lon: 138 },
  { id: "australia", lat: -25, lon: 134 },
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {t.reach.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
              {t.reach.title}
            </h2>
            <p className="lead mt-5 max-w-md text-[var(--muted)]">{t.reach.intro}</p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {PLACES.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[13px] text-[var(--foreground)] shadow-sm"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
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

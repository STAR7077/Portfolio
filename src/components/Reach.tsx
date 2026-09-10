"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";

// three.js is a large dependency, so it is split out of the main bundle and
// only fetched in the browser when this section renders.
const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[8%] rounded-full bg-[#e9eef4]" />
    </div>
  ),
});

/**
 * One colour per region, carried by both the marker on the globe and the
 * chip in the list, so the two halves of the section read as one thing.
 * Deliberately away from the site's purple, which the globe used to wear.
 */
const REGIONS = [
  { key: "americas", color: "#F04438" },
  { key: "europe", color: "#0EA5E9" },
  { key: "asiaPacific", color: "#10B981" },
] as const;

type RegionKey = (typeof REGIONS)[number]["key"];

const REGION_COLOR: Record<RegionKey, string> = {
  americas: "#F04438",
  europe: "#0EA5E9",
  asiaPacific: "#10B981",
};

// Country centroids, roughly, grouped by the region they belong to.
const PLACES = [
  { id: "brazil", lat: -10, lon: -52, region: "americas" },
  { id: "unitedStates", lat: 39.5, lon: -98.5, region: "americas" },
  { id: "canada", lat: 56, lon: -106, region: "americas" },
  { id: "mexico", lat: 23.5, lon: -102, region: "americas" },
  { id: "colombia", lat: 4, lon: -73, region: "americas" },
  { id: "peru", lat: -10, lon: -76, region: "americas" },
  { id: "argentina", lat: -34, lon: -64, region: "americas" },
  { id: "chile", lat: -35.5, lon: -71.3, region: "americas" },
  { id: "uruguay", lat: -32.8, lon: -56, region: "americas" },
  { id: "unitedKingdom", lat: 54, lon: -2, region: "europe" },
  { id: "spain", lat: 40.2, lon: -3.7, region: "europe" },
  { id: "germany", lat: 51, lon: 10.4, region: "europe" },
  { id: "denmark", lat: 56, lon: 9.5, region: "europe" },
  { id: "poland", lat: 52, lon: 19, region: "europe" },
  { id: "japan", lat: 36, lon: 138, region: "asiaPacific" },
  { id: "australia", lat: -25, lon: 134, region: "asiaPacific" },
] as const satisfies readonly { id: string; lat: number; lon: number; region: RegionKey }[];

// Built once at module scope, so the scene is never rebuilt on a re-render.
const GLOBE_POINTS = PLACES.map((p) => ({
  id: p.id,
  lat: p.lat,
  lon: p.lon,
  color: REGION_COLOR[p.region],
}));

export default function Reach() {
  const { t } = useLanguage();

  // Only the labels change when the visitor switches language.
  const labels = Object.fromEntries(PLACES.map((p) => [p.id, t.reach[p.id]]));

  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-28">
      <SectionScenery preset="reach" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
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

          <div className="mt-8 space-y-5">
            {REGIONS.map((region, i) => {
              const inRegion = PLACES.filter((p) => p.region === region.key);
              return (
                <Reveal key={region.key} delay={120 + i * 70}>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--faint)]">
                      <span
                        className="block h-2 w-2 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      {t.reach[region.key]}
                      <span className="font-mono tracking-normal">
                        {String(inRegion.length).padStart(2, "0")}
                      </span>
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {inRegion.map((m) => (
                        <li
                          key={m.id}
                          className="rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[13px] text-[var(--foreground)] shadow-sm"
                          style={{ borderColor: `${region.color}44` }}
                        >
                          {labels[m.id]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-[600px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(14,165,233,0)_68%)] blur-2xl"
              aria-hidden="true"
            />
            <Globe points={GLOBE_POINTS} labels={labels} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

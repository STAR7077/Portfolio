"use client";

import dynamic from "next/dynamic";
import { m } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IN_VIEW, STAGGER, fadeUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";

// three.js is a large dependency, so it is split out of the main bundle and
// only fetched in the browser when this section renders.
const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[8%] rounded-full bg-[#111826]" />
    </div>
  ),
});

/**
 * One colour per region, carried by both the marker on the globe and the
 * chip in the list, so the two halves of the section read as one thing.
 *
 * The globe was asked to carry no purple, so the site violet is off the
 * table here. Europe and Asia-Pacific take the palette's blue and cyan; the
 * Americas keep the warm coral they have always had, since the palette has
 * no third hue that is not purple and three regions need three.
 */
const REGIONS = [
  { key: "americas", color: "#FF7466" },
  { key: "europe", color: "#62B6FF" },
  { key: "asiaPacific", color: "#58D6C9" },
] as const;

type RegionKey = (typeof REGIONS)[number]["key"];

const REGION_COLOR: Record<RegionKey, string> = {
  americas: "#FF7466",
  europe: "#62B6FF",
  asiaPacific: "#58D6C9",
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
    <section id="reach" className="relative overflow-hidden bg-canvas-2 py-24 sm:py-32">
      <BackgroundGlow preset="reach" dots />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
            <SectionHeading index="05" eyebrow={t.reach.eyebrow} title={t.reach.title} intro={t.reach.intro} />
          </m.div>

          <m.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={stagger(STAGGER.base, 0.1)}
            className="mt-10 space-y-6"
          >
            {REGIONS.map((region) => {
              const inRegion = PLACES.filter((p) => p.region === region.key);
              return (
                <m.div key={region.key} variants={fadeUp}>
                  <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                    <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: region.color }} />
                    {t.reach[region.key]}
                    <span className="text-fg-2">{String(inRegion.length).padStart(2, "0")}</span>
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {inRegion.map((place) => (
                      <li
                        key={place.id}
                        className="rounded-lg border bg-white/[0.025] px-3 py-1.5 text-[13px] text-fg-2"
                        style={{ borderColor: `${region.color}33` }}
                      >
                        {labels[place.id]}
                      </li>
                    ))}
                  </ul>
                </m.div>
              );
            })}
          </m.div>
        </div>

        <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
          <div className="relative mx-auto w-full max-w-[600px]">
            {/* Light pooled under the planet, a gradient rather than a blur. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(98,182,255,0.16), transparent)" }}
            />
            <Globe points={GLOBE_POINTS} labels={labels} />
          </div>
        </m.div>
      </div>
    </section>
  );
}

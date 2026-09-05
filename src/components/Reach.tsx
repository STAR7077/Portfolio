"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * A light-weight stand-in for the WebGL globe on the reference site.
 * The sphere is CSS: a shaded circle with a dot grid whose background
 * position drifts, which reads as rotation without shipping three.js.
 * Markers use the same ripple idea as the reference (jbRipple / jbBlink).
 */
const MARKERS = [
  { key: "brazil", top: "62%", left: "62%" },
  { key: "spain", top: "31%", left: "44%" },
  { key: "mexico", top: "44%", left: "22%" },
] as const;

export default function Reach() {
  const { t } = useLanguage();

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
              {MARKERS.map((m) => (
                <li
                  key={m.key}
                  className="flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--foreground)] shadow-sm"
                >
                  <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {t.reach[m.key]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            {/* Soft halo */}
            <div
              className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0)_68%)] blur-2xl"
              aria-hidden="true"
            />

            {/* Sphere */}
            <div className="globe absolute inset-0 overflow-hidden rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#eceaf4_45%,#ddd9ea_100%)] shadow-[inset_-24px_-24px_60px_rgba(109,40,217,0.16),0_24px_60px_-30px_rgba(22,21,28,0.5)]">
              <div className="globe-dots absolute inset-0" aria-hidden="true" />
              {/* Meridian curves */}
              <div
                className="absolute inset-0 rounded-full border-x border-[var(--accent)]/12"
                style={{ margin: "0 22%" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full border-y border-[var(--accent)]/12"
                style={{ margin: "22% 0" }}
                aria-hidden="true"
              />
            </div>

            {/* Client markers */}
            {MARKERS.map((m, i) => (
              <span
                key={m.key}
                className="absolute z-10 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
                style={{
                  top: m.top,
                  left: m.left,
                  animation: `ripple 2.8s ease-out ${i * 0.6}s infinite`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

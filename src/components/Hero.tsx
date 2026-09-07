"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import HeroIllustration from "./HeroIllustration";
import PromiseCard from "./PromiseCard";

/* eslint-disable @next/next/no-img-element */

/**
 * Split hero: copy on the left, the isometric scene anchored bottom-right
 * over its diagonal panel, following the reference layout. The artwork is
 * MIT-licensed; see THIRD-PARTY-NOTICES.md.
 */
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      // White ground, so the panel image (whose own left side is white)
      // has nothing to seam against.
      className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-0 sm:pt-0 lg:min-h-screen"
    >
      {/* Diagonal panel, anchored to the right edge and scaled to height. */}
      <img
        src="/hero/bg-main.jpg"
        alt=""
        className="pointer-events-none absolute right-0 top-0 hidden h-full max-w-none sm:block"
      />

      {/* The scene sits on the bottom-right corner, sized off the viewport
          height so it keeps its proportions the way the reference does. */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[71vh] w-[71vh] sm:block xl:h-[89vh] xl:w-[89vh]">
        <HeroIllustration />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 sm:min-h-[80vh] lg:min-h-screen lg:py-32">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm">
              <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-green-600" />
              {t.hero.availability}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 font-heading text-[2.5rem] font-bold leading-[1.06] text-[var(--foreground)] sm:text-5xl lg:text-[3.75rem]">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 align-middle">
                <span className="relative inline-block h-[0.9em] w-[0.9em] shrink-0 align-middle">
                  <span
                    className="animate-spin-conic absolute -inset-[6px] rounded-full bg-[conic-gradient(from_210deg,#7c3aed,#c026d3,#4f46e5,#7c3aed)] opacity-30 blur-md"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 p-[3px]">
                    <img
                      src="/lucas.jpg"
                      alt="Lucas Marley"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                </span>
                <span className="text-gradient-brand">{t.hero.headline3}</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <PromiseCard />
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <a
                href="#work"
                className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_38px_-12px_rgba(109,40,217,0.8)] transition-transform duration-500 hover:scale-[1.03]"
              >
                {t.hero.ctaWork}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[var(--border-strong)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-500 hover:border-[var(--accent)]"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* On phones the panel is hidden, so the scene runs full width below
          the copy rather than being cropped off the right edge. */}
      <div className="relative mt-10 h-[95vw] w-full sm:hidden">
        <HeroIllustration />
      </div>
    </section>
  );
}

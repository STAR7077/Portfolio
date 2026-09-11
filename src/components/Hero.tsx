"use client";

import { m } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STAGGER, fadeUp, heroReveal, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import HeroVisual from "./HeroVisual";
import { IconArrowRight, IconClock, IconTrend, IconWrench } from "./icons";

/**
 * Two columns on a desktop: the claim on the left, the interface
 * composition on the right. Below lg it stacks, copy first, so a phone
 * reads the headline before it sees any decoration.
 *
 * The headline keeps its three lines. The square brackets in the copy
 * marked words for the old hand-drawn underline; that treatment is gone,
 * and the last line carries the brand gradient instead.
 */

const unmark = (s: string) => s.replace(/[[\]]/g, "");

export default function Hero() {
  const { t } = useLanguage();
  const lines = [t.hero.headline1, t.hero.headline2, t.hero.headline3].map(unmark);

  const promises = [
    { icon: <IconClock size={15} />, label: t.hero.promiseTime },
    { icon: <IconWrench size={15} />, label: t.hero.promiseDeadlines },
    { icon: <IconTrend size={15} />, label: t.hero.promiseComms },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-canvas pb-20 pt-40 sm:pt-44 lg:pb-28 lg:pt-44">
      <BackgroundGlow preset="hero" grid drift />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
        <m.div initial="hidden" animate="show" variants={stagger(STAGGER.base, 0.05)}>
          <m.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[11.5px] text-fg-2"
          >
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-ai" />
            {t.hero.availability}
          </m.span>

          <h1 className="t-hero mt-7">
            {lines.map((line, i) => (
              <m.span key={i} variants={heroReveal} className="block">
                {/* Inline, so the gradient spans the words rather than the
                    whole column and actually reaches its cyan end. */}
                <span className={i === lines.length - 1 ? "text-gradient-brand" : undefined}>{line}</span>
              </m.span>
            ))}
          </h1>

          <m.p variants={fadeUp} className="t-lead mt-6 max-w-xl">
            {t.hero.intro}
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              {t.hero.ctaWork}
              <IconArrowRight size={16} className="nudge-x" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t.hero.ctaContact}
            </a>
          </m.div>

          <m.div variants={fadeUp} className="mt-10 max-w-xl border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{t.hero.promiseLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
              {promises.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-[13.5px] text-fg-2">
                  <span className="text-accent-hi">{p.icon}</span>
                  {p.label}
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>

        <HeroVisual />
      </div>

      {/* The hero hands its ground to the next section rather than ending
          on a hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas"
      />
    </section>
  );
}

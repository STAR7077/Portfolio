"use client";

import { m } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IN_VIEW, STAGGER, fadeUp, itemUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";
import { IconArrowRight, IconCalendarCheck, IconChat, IconPackage, IconUser } from "./icons";

/**
 * Who I am and, more usefully, what an engagement is actually like.
 *
 * Asymmetric: the statement holds its place on the left while the right
 * column is read, which is the one sticky element on the page. Services
 * says what I can be hired for and Skills, directly below, says what I
 * build it with, so this section covers what neither does: how the work
 * runs.
 *
 * The portrait stays small. The only copy of the photo is 400px wide, so
 * anything larger would be soft.
 */
export default function About() {
  const { t } = useLanguage();

  const points = [
    { title: t.about.work1Title, body: t.about.work1Body, icon: <IconUser size={17} /> },
    { title: t.about.work2Title, body: t.about.work2Body, icon: <IconCalendarCheck size={17} /> },
    { title: t.about.work3Title, body: t.about.work3Body, icon: <IconChat size={17} /> },
    { title: t.about.work4Title, body: t.about.work4Body, icon: <IconPackage size={17} /> },
  ];

  return (
    // overflow-clip rather than hidden: hidden would make the section a
    // scroll container and quietly stop the statement from sticking.
    <section id="about" className="relative overflow-clip bg-canvas-2 py-24 sm:py-32">
      <BackgroundGlow preset="about" />
      {/* Hands over from the darker ground above without a visible edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={fadeUp}
          className="lg:sticky lg:top-36 lg:self-start"
        >
          <SectionHeading index="02" eyebrow={t.about.eyebrow} statement={t.about.statement} size="md" />
        </m.div>

        <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={stagger(STAGGER.base)}>
          <m.div variants={fadeUp} className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lucas.webp"
              alt={t.about.portraitAlt}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-white/15"
            />
            <div>
              <p className="text-[17px] font-bold tracking-[-0.02em] text-fg">Lucas Marley</p>
              <p className="mt-0.5 font-mono text-[12px] text-fg-3">{t.about.role}</p>
            </div>
          </m.div>

          <m.p variants={fadeUp} className="t-lead mt-7 max-w-xl">
            {t.about.paragraph1}
          </m.p>

          <m.div variants={fadeUp}>
            <a href="#contact" className="btn btn-secondary btn-sm mt-8">
              {t.nav.cta}
              <IconArrowRight size={15} className="nudge-x" />
            </a>
          </m.div>

          <m.p variants={fadeUp} className="t-eyebrow mt-14">
            {t.about.workHeading}
          </m.p>

          <m.ul variants={stagger(STAGGER.tight)} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <m.li
                key={point.title}
                variants={itemUp}
                className="rounded-card border border-line bg-white/[0.02] p-5 shadow-[var(--edge-top)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)] text-accent-hi">
                  {point.icon}
                </span>
                <p className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-fg">{point.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{point.body}</p>
              </m.li>
            ))}
          </m.ul>
        </m.div>
      </div>
    </section>
  );
}

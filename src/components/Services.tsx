"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { m } from "motion/react";
import { IN_VIEW, STAGGER, fadeUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";

/**
 * What I can be hired for, as a grid of cards that fill with the accent
 * on hover: the icon tile inverts, the copy turns white and the corner
 * disc fades out. It follows the supplied reference, in the site's own
 * purple rather than the reference's pink.
 *
 * This replaces the scrolling tech marquee and the four stat tiles that
 * used to sit here. The numbers survive as the row underneath, where
 * they support the services rather than competing with them.
 */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Dividers for the figures: two per row on a phone, four on anything wider.
 * Written out per cell because a rule has to know where its row starts.
 */
const CELL = [
  "pr-5 sm:pr-6",
  "border-l border-line pl-5 sm:px-6",
  "border-t border-line pr-5 sm:border-l sm:border-t-0 sm:px-6",
  "border-l border-t border-line pl-5 sm:border-t-0 sm:px-6",
];

export default function Services() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.services.aiTitle,
      body: t.services.aiBody,
      // A large spark and a small one.
      icon: (
        <Icon>
          <path d="M10.5 3 12.3 7.7 17 9.5l-4.7 1.8L10.5 16l-1.8-4.7L4 9.5l4.7-1.8L10.5 3Z" />
          <path d="M17.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
        </Icon>
      ),
    },
    {
      title: t.services.webTitle,
      body: t.services.webBody,
      // A browser frame with code inside it.
      icon: (
        <Icon>
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="M2.5 8.5h19" />
          <path d="M10 12.5 8 14.5l2 2M14 12.5l2 2-2 2" />
        </Icon>
      ),
    },
    {
      title: t.services.mobileTitle,
      body: t.services.mobileBody,
      // A handset.
      icon: (
        <Icon>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.8" />
          <path d="M10.5 5.5h3M10.8 18.4h2.4" />
        </Icon>
      ),
    },
    {
      title: t.services.backendTitle,
      body: t.services.backendBody,
      // Stacked storage.
      icon: (
        <Icon>
          <ellipse cx="12" cy="5.8" rx="7.5" ry="3" />
          <path d="M4.5 5.8v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
          <path d="M4.5 11.8v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
        </Icon>
      ),
    },
    {
      title: t.services.odooTitle,
      body: t.services.odooBody,
      // Four modules, which is how an ERP is scoped.
      icon: (
        <Icon>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </Icon>
      ),
    },
    {
      title: t.services.nocodeTitle,
      body: t.services.nocodeBody,
      // Speed to market.
      icon: (
        <Icon>
          <path d="M13 2.5 4.5 14h6l-1 7.5L18.5 10h-6l.5-7.5Z" />
        </Icon>
      ),
    },
  ];

  // Career totals, supplied by Lucas. They cover every engagement, so they
  // are deliberately not counted from the handful of case studies in Work.
  const numbers = [
    { value: "150+", label: t.stats.projects },
    { value: "12+", label: t.stats.years },
    { value: "100+", label: t.stats.customers },
    { value: "21+", label: t.stats.countries },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <BackgroundGlow preset="services" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
          <SectionHeading index="01" eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
        </m.div>

        {/* The figures sit under the title, where they qualify the section
            before the services themselves are read. */}
        {/* The figures read as a row of instrument readouts: the number large,
            the plus in the accent, the label in the mono register. */}
        <m.dl
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={stagger(STAGGER.tight)}
          className="mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4"
        >
          {numbers.map((item, i) => (
            <m.div
              key={item.label}
              variants={fadeUp}
              className={`py-7 ${CELL[i]}`}
            >
              <dt className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-fg sm:text-[2.75rem]">
                {item.value.replace("+", "")}
                <span className="text-accent-hi">+</span>
              </dt>
              <dd className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg-3">{item.label}</dd>
            </m.div>
          ))}
        </m.dl>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={stagger(STAGGER.base)}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <m.div key={card.title} variants={fadeUp} className="h-full">
              <article className="service-card relative h-full overflow-hidden rounded-card border border-line bg-card p-7 shadow-[var(--edge-top)]">
                {/* The fan in the corner, which on hover becomes the wave
                    that carries the accent across the card. */}
                <span className="service-wave" aria-hidden="true" />

                {/* The inversions live in globals.css beside the wave, so
                    they fire on touch as well as on hover. */}
                <span className="service-icon relative flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(var(--accent-rgb),0.12)] text-accent-hi">
                  {card.icon}
                </span>

                <h3 className="service-title relative mt-6 text-[1.2rem] font-bold text-fg">
                  {card.title}
                </h3>
                <p className="service-body relative mt-3 text-[15px] leading-relaxed text-fg-2">
                  {card.body}
                </p>
              </article>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

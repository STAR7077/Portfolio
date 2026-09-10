"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
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
    <section id="services" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
          <p className="lead -mt-2 max-w-2xl text-[var(--muted)]">{t.services.intro}</p>
        </Reveal>

        {/* The figures sit under the title, where they qualify the section
            before the services themselves are read. */}
        <Reveal delay={80}>
          <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-[var(--border)] py-8 sm:grid-cols-4">
            {numbers.map((item) => (
              <div key={item.label}>
                <dt className="text-gradient-brand font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  {item.value}
                </dt>
                <dd className="mt-1.5 text-[13px] text-[var(--muted)]">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70} className="h-full">
              <article className="service-card relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-[0_14px_40px_-30px_rgba(22,21,28,0.6)]">
                {/* The fan in the corner, which on hover becomes the wave
                    that carries the accent across the card. */}
                <span className="service-wave" aria-hidden="true" />

                {/* The inversions live in globals.css beside the wave, so
                    they fire on touch as well as on hover. */}
                <span className="service-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] grad-accent text-white">
                  {card.icon}
                </span>

                <h3 className="service-title relative mt-6 font-heading text-xl font-bold text-[var(--foreground)]">
                  {card.title}
                </h3>
                <p className="service-body relative mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

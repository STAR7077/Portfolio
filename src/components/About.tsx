"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";

/**
 * Who I am and, more usefully, what an engagement is actually like.
 *
 * This used to be two paragraphs, the second of which listed in prose the
 * same stack the Skills grid shows in logos. Services says what I can be
 * hired for and Skills says what I build it with, so the job left for this
 * section is the one nothing else covers: how the work runs, which is what
 * someone deciding whether to hire is nervous about.
 *
 * The portrait is deliberately modest in size. The only copy of the photo
 * is 400px wide, so anything larger would be soft.
 */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function About() {
  const { t } = useLanguage();

  const points = [
    {
      title: t.about.work1Title,
      body: t.about.work1Body,
      // One person.
      icon: (
        <Icon>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20v-1.4A4.6 4.6 0 0 1 9.6 14h4.8a4.6 4.6 0 0 1 4.6 4.6V20" />
        </Icon>
      ),
    },
    {
      title: t.about.work2Title,
      body: t.about.work2Body,
      // A date on a calendar.
      icon: (
        <Icon>
          <rect x="3.2" y="5" width="17.6" height="16" rx="2.6" />
          <path d="M3.2 10h17.6M8 3v4M16 3v4" />
          <path d="M8.6 14.6l2.2 2.2 4-4" />
        </Icon>
      ),
    },
    {
      title: t.about.work3Title,
      body: t.about.work3Body,
      // Kept in the conversation.
      icon: (
        <Icon>
          <path d="M20.5 12.5a7.5 7.5 0 0 1-10.9 6.7L4 20.5l1.4-5.4A7.5 7.5 0 1 1 20.5 12.5Z" />
          <path d="M9 11.5h6M9 14.5h3.5" />
        </Icon>
      ),
    },
    {
      title: t.about.work4Title,
      body: t.about.work4Body,
      // Handed over.
      icon: (
        <Icon>
          <path d="M4 8.6 12 4l8 4.6v6.8L12 20l-8-4.6Z" />
          <path d="M4 8.6 12 13l8-4.4M12 13v7" />
        </Icon>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[var(--border)] bg-white py-24 sm:py-28"
    >
      <SectionScenery preset="about" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        </Reveal>

        <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <Reveal delay={60}>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lucas.webp"
                  alt={t.about.portraitAlt}
                  width={88}
                  height={88}
                  className="h-22 w-22 shrink-0 rounded-full object-cover ring-4 ring-[var(--accent)]/15"
                  style={{ height: 88, width: 88 }}
                />
                <div>
                  <p className="font-heading text-lg font-bold text-[var(--foreground)]">
                    Lucas Marley
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{t.about.role}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-[var(--muted)]">
                {t.about.paragraph1}
              </p>
            </Reveal>

            {/* The section is about whether I am safe to hire, so it ends by
                inviting the next step rather than trailing off. */}
            <Reveal delay={200}>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t.nav.cta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </a>
            </Reveal>
          </div>

          <div>
            <Reveal delay={160}>
              <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                {t.about.workHeading}
              </h3>
            </Reveal>

            <ul className="mt-6 space-y-6">
              {points.map((point, i) => (
                <Reveal key={point.title} delay={200 + i * 70} as="li">
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-tint)] text-[var(--accent)]">
                      {point.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">{point.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-[var(--muted)]">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

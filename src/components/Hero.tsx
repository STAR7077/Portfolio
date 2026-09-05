"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* Soft violet washes rather than the previous neon glow. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-a absolute -left-40 -top-52 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0)_62%)] blur-3xl" />
        <div className="mesh-b absolute -right-48 top-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.13)_0%,rgba(192,38,211,0)_65%)] blur-3xl" />
        <div className="mesh-c absolute left-1/3 top-[420px] h-[560px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.10)_0%,rgba(79,70,229,0)_68%)] blur-3xl" />
      </div>

      {/* Centred column, following the reference hero rather than a split layout. */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm">
            <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-green-600" />
            {t.hero.availability}
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 font-heading text-[2.5rem] font-bold leading-[1.06] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-[4.25rem]">
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
            <br />
            {/* The portrait sits inside the headline, the way the reference
                site drops its illustration into the sentence. */}
            <span className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 align-middle">
              <span className="relative inline-block h-[0.95em] w-[0.95em] shrink-0 align-middle">
                <span
                  className="animate-spin-conic absolute -inset-[6px] rounded-full bg-[conic-gradient(from_210deg,#7c3aed,#c026d3,#4f46e5,#7c3aed)] opacity-30 blur-md"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 p-[3px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {t.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
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
    </section>
  );
}

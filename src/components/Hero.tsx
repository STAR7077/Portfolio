"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* Layered background. Each layer travels at its own rate as you
          scroll, and one is blurred, which is what reads as depth. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-120} className="absolute -left-40 -top-52 h-[760px] w-[760px]">
          <div className="mesh-a h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0)_62%)] blur-3xl" />
        </Parallax>
        <Parallax speed={-220} className="absolute -right-48 top-10 h-[700px] w-[700px]">
          <div className="mesh-b h-full w-full rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.13)_0%,rgba(192,38,211,0)_65%)] blur-3xl" />
        </Parallax>
        <Parallax speed={160} className="absolute left-1/3 top-[420px] h-[560px] w-[640px]">
          <div className="mesh-c h-full w-full rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.10)_0%,rgba(79,70,229,0)_68%)] blur-3xl" />
        </Parallax>

        {/* Small solids, moving faster than the washes behind them. */}
        <Parallax speed={-300} className="absolute right-[11%] top-[22%] hidden lg:block">
          <div className="h-16 w-16 rotate-12 rounded-2xl bg-violet-400/25" />
        </Parallax>
        <Parallax speed={200} className="absolute left-[7%] top-[64%] hidden lg:block">
          <div className="h-10 w-10 rounded-full bg-fuchsia-400/30" />
        </Parallax>
        <Parallax speed={340} className="absolute left-[24%] top-[26%] hidden lg:block">
          <div className="h-20 w-20 -rotate-6 rounded-3xl bg-indigo-400/20 blur-[2px]" />
        </Parallax>
        <Parallax speed={-420} className="absolute right-[26%] bottom-[8%] hidden lg:block">
          <div className="h-12 w-12 rotate-45 rounded-xl bg-violet-300/30 blur-[1px]" />
        </Parallax>
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
          <h1 className="mt-7 font-heading text-[2.5rem] font-bold leading-[1.06] text-[var(--foreground)] sm:text-6xl lg:text-[4.25rem]">
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
          <p className="lead mx-auto mt-6 max-w-xl text-[var(--muted)]">{t.hero.subtitle}</p>
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

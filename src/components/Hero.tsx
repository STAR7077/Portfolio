"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Soft violet washes rather than the previous neon glow. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-a absolute -left-40 -top-52 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0)_62%)] blur-3xl" />
        <div className="mesh-b absolute -right-48 top-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.13)_0%,rgba(192,38,211,0)_65%)] blur-3xl" />
        <div className="mesh-c absolute left-1/3 top-[420px] h-[560px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.10)_0%,rgba(79,70,229,0)_68%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm">
              <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-green-600" />
              {t.hero.availability}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 font-heading text-[2.75rem] font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-6xl">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="text-gradient-brand">{t.hero.headline3}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {t.hero.subtitle}
            </p>
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

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative mx-auto h-[280px] w-[280px] sm:h-[330px] sm:w-[330px]">
              <div
                className="animate-spin-conic absolute -inset-6 rounded-full bg-[conic-gradient(from_210deg,#7c3aed,#c026d3,#4f46e5,#7c3aed)] opacity-25 blur-2xl"
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 p-[3px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lucas.jpg"
                  alt="Lucas Marley"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -right-3 bottom-8 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-2.5 shadow-[0_12px_34px_-16px_rgba(22,21,28,0.5)] sm:-right-8">
                <span className="text-[13px] tracking-wider text-amber-500">★★★★★</span>
                <span className="text-[13px] font-bold text-[var(--foreground)]">5.0</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

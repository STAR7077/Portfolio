"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Ambient gradient mesh. Three blobs on separate drift cycles. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-a absolute -left-40 -top-52 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.40)_0%,rgba(139,92,246,0)_62%)] blur-3xl" />
        <div className="mesh-b absolute -right-48 top-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.30)_0%,rgba(232,121,249,0)_65%)] blur-3xl" />
        <div className="mesh-c absolute left-1/3 top-[420px] h-[560px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(56,189,248,0)_68%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200 backdrop-blur">
              <span className="animate-pulse-dot block h-1.5 w-1.5 rounded-full bg-green-400" />
              {t.hero.availability}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 font-heading text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="text-gradient-brand">{t.hero.headline3}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <a
                href="#work"
                className="rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 px-7 py-3.5 text-sm font-bold text-[#0b0b12] shadow-[0_12px_38px_rgba(168,85,247,0.45)] transition-transform duration-500 hover:scale-[1.03]"
              >
                {t.hero.ctaWork}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.08]"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative mx-auto h-[280px] w-[280px] sm:h-[330px] sm:w-[330px]">
              {/* Rotating conic glow behind the portrait. */}
              <div
                className="animate-spin-conic absolute -inset-7 rounded-full bg-[conic-gradient(from_210deg,#8b5cf6,#e879f9,#38bdf8,#8b5cf6)] opacity-55 blur-2xl"
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-sky-400 p-[3px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lucas.jpg"
                  alt="Lucas Marley"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -right-3 bottom-8 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#12121c]/75 px-4 py-2.5 shadow-[0_10px_34px_rgba(0,0,0,0.5)] backdrop-blur-md sm:-right-8">
                <span className="text-[13px] tracking-wider text-amber-400">★★★★★</span>
                <span className="text-[13px] font-bold text-white">5.0</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

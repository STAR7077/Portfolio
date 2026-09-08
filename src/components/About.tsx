"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";

export default function About() {
  const { t } = useLanguage();

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

        <div className="max-w-3xl space-y-5 leading-relaxed text-[var(--muted)]">
          <Reveal delay={60}><p>{t.about.paragraph1}</p></Reveal>
          <Reveal delay={140}><p>{t.about.paragraph2}</p></Reveal>
        </div>

      </div>
    </section>
  );
}

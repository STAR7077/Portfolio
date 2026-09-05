"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Tool and language names are proper nouns, so they read the same in every locale.
const skills = [
  "Node.js", "Python", "React", "Next.js", "TypeScript", "Django",
  "PostgreSQL", "Redis", "React Native", "Flutter", "OpenAI / LLMs",
  "Docker / AWS", "Odoo / ERP",
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-t border-[var(--border)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        </Reveal>

        <div className="max-w-3xl space-y-5 leading-relaxed text-[var(--muted)]">
          <Reveal delay={60}><p>{t.about.paragraph1}</p></Reveal>
          <Reveal delay={140}><p>{t.about.paragraph2}</p></Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--foreground)] shadow-sm transition-colors duration-500 hover:border-[var(--accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";

// Tool and language names are proper nouns — they read the same in every locale.
const skills = [
  "Node.js",
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "Django",
  "PostgreSQL",
  "Redis",
  "React Native",
  "Flutter",
  "OpenAI / LLMs",
  "Docker / AWS",
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="max-w-3xl space-y-5 text-slate-300 leading-relaxed">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

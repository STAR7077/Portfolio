"use client";

import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";
import Parallax from "./Parallax";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-tint)] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-200} className="absolute -left-40 top-20 h-[620px] w-[620px]">
          <div className="mesh-b h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10)_0%,rgba(124,58,237,0)_66%)] blur-3xl" />
        </Parallax>
        <Parallax speed={260} className="absolute right-[6%] top-[18%] hidden lg:block">
          <div className="h-14 w-14 rotate-12 rounded-2xl bg-violet-300/25 blur-[1px]" />
        </Parallax>
      </div>
      <SectionScenery preset="testimonials" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        </Reveal>
        {/* Columns rather than a grid. The quotes run from one line to ten,
            and a grid row stretches every card to match its tallest
            neighbour, which left a third of a card empty under the short
            ones. Columns let each card end where its quote ends. */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 90} className="mb-6 break-inside-avoid">
              <TestimonialCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

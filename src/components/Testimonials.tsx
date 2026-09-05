"use client";

import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-200} className="absolute -left-40 top-20 h-[620px] w-[620px]">
          <div className="mesh-b h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10)_0%,rgba(124,58,237,0)_66%)] blur-3xl" />
        </Parallax>
        <Parallax speed={260} className="absolute right-[6%] top-[18%] hidden lg:block">
          <div className="h-14 w-14 rotate-12 rounded-2xl bg-violet-300/25 blur-[1px]" />
        </Parallax>
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 90} className="h-full">
              <TestimonialCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

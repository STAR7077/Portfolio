"use client";

import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./Reveal";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-white/5 py-24 sm:py-28"
    >
      <div
        className="mesh-b pointer-events-none absolute -left-40 top-20 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.20)_0%,rgba(139,92,246,0)_66%)] blur-3xl"
        aria-hidden="true"
      />

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

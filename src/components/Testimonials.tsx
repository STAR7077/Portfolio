"use client";

import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      className="border-t border-white/5 bg-gradient-to-b from-violet-500/[0.06] to-transparent py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

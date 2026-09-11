"use client";

import { m } from "motion/react";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IN_VIEW, STAGGER, fadeUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

/**
 * Social proof, given the weight it deserves: one review set large at the
 * head of the section, the rest around it.
 *
 * The others sit in columns rather than a grid. Reviews run from one line to
 * ten, and a grid row stretches every card to its tallest neighbour; columns
 * let each card end where its quote ends.
 */
export default function Testimonials() {
  const { t } = useLanguage();
  const featured = testimonials.find((x) => x.featured);
  const others = testimonials.filter((x) => x !== featured);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <BackgroundGlow preset="testimonials" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas-2 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
          <SectionHeading index="06" eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        </m.div>

        {featured && (
          <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp} className="mt-12">
            <TestimonialCard testimonial={featured} featured />
          </m.div>
        )}

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={stagger(STAGGER.base)}
          className="mt-4 columns-1 gap-4 md:columns-2 lg:columns-3"
        >
          {others.map((item) => (
            <m.div key={item.name} variants={fadeUp} className="mb-4 break-inside-avoid">
              <TestimonialCard testimonial={item} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

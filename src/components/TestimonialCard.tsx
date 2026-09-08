"use client";

import type { Testimonial } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import Avatar from "./Avatar";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { locale } = useLanguage();

  // No h-full: the cards are laid out in columns, so each one ends where its
  // quote ends rather than being stretched to match a row.
  return (
    <figure className="lift rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_14px_40px_-28px_rgba(22,21,28,0.5)] hover:border-[var(--accent)]/40">
      <div>
        <span className="font-heading text-3xl text-[var(--accent)]/40">&ldquo;</span>
        <blockquote className="text-sm leading-relaxed text-[var(--foreground)]">
          {testimonial.quote[locale]}
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={testimonial.name} src={`/testimonials/${testimonial.avatarFile}`} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</span>
          <span className="text-xs text-amber-500">{"★".repeat(testimonial.rating)}</span>
        </div>
      </figcaption>
    </figure>
  );
}

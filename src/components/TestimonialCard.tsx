"use client";

import type { Testimonial } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageProvider";
import Avatar from "./Avatar";

/**
 * One client's review, in two sizes: the featured quote at the head of the
 * section, and the standard card around it.
 *
 * Stars and the platform only appear when they were actually read off a
 * review. A review passed on directly carries neither rather than a guess.
 *
 * Neither size lifts on hover: nothing here is clickable, and a lift would
 * promise an action that is not there.
 */

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 24V14.2C0 6.4 4.3 1.6 12.6 0l1.5 3.4C9.7 4.8 7.6 7.4 7.3 11H13v13H0Zm18 0V14.2C18 6.4 22.3 1.6 30.6 0l1.5 3.4c-4.4 1.4-6.5 4-6.8 7.6H31v13H18Z" />
    </svg>
  );
}

function Meta({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.rating && !testimonial.source) return null;
  return (
    <span className="flex shrink-0 flex-col items-end gap-1">
      {testimonial.rating && (
        <span
          role="img"
          aria-label={`${testimonial.rating} / 5`}
          className="text-[11px] leading-none tracking-[0.12em] text-[var(--rating)]"
        >
          {"★".repeat(testimonial.rating)}
        </span>
      )}
      {testimonial.source && (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-3">
          {testimonial.source}
        </span>
      )}
    </span>
  );
}

export default function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  const { locale, t } = useLanguage();
  const attribution = [testimonial.role, t.reach[testimonial.country]].filter(Boolean).join(" · ");
  const avatarSrc = `/testimonials/${testimonial.avatarFile}`;

  if (featured) {
    return (
      <figure className="relative overflow-hidden rounded-panel border border-line bg-[image:var(--grad-quote)] p-8 shadow-[var(--edge-top)] sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(760px circle at 0% 0%, rgba(var(--accent-rgb),0.18), transparent 60%)" }}
        />
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />

        <QuoteMark className="relative h-8 w-10 text-accent-hi sm:h-10 sm:w-12" />
        <blockquote className="relative mt-7 max-w-4xl text-[clamp(1.3rem,2.1vw,1.85rem)] font-medium leading-[1.42] tracking-[-0.02em] text-fg">
          {testimonial.quote[locale]}
        </blockquote>

        <figcaption className="relative mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-7">
          <Avatar name={testimonial.name} src={avatarSrc} size={52} />
          <div className="min-w-0">
            <p className="text-[16px] font-bold tracking-[-0.015em] text-fg">{testimonial.name}</p>
            <p className="mt-0.5 font-mono text-[12px] text-fg-3">{attribution}</p>
          </div>
          <span className="ml-auto">
            <Meta testimonial={testimonial} />
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="card relative flex flex-col p-6">
      <QuoteMark className="h-4 w-5 text-accent-hi/70" />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-fg-2">{testimonial.quote[locale]}</blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Avatar name={testimonial.name} src={avatarSrc} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-semibold text-fg">{testimonial.name}</p>
          <p className="mt-0.5 font-mono text-[11px] leading-snug text-fg-3">{attribution}</p>
        </div>
        <Meta testimonial={testimonial} />
      </figcaption>
    </figure>
  );
}

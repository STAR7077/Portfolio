import type { Testimonial } from "@/data/testimonials";
import Avatar from "./Avatar";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div>
        <span className="font-heading text-3xl text-violet-400/60">&ldquo;</span>
        <blockquote className="text-sm leading-relaxed text-slate-200">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={testimonial.name} src={`/testimonials/${testimonial.avatarFile}`} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{testimonial.name}</span>
            <span className="text-xs text-amber-400">{"★".repeat(testimonial.rating)}</span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { projects } from "@/data/projects";
import { FEATURED } from "@/data/showcase";
import {
  getServerSnapshot,
  getSnapshot,
  setWorkFilter,
  subscribe,
} from "@/data/workFilter";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DURATION, EASE_OUT, IN_VIEW, LAYOUT, cardSwap, fadeUp } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import ProjectCard from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";
import ProjectShowcase from "./ProjectShowcase";
import SectionHeading from "./SectionHeading";

/**
 * The strongest section on the page. Four featured projects each get their
 * own layout, then everything else sits in a compact grid.
 *
 * The category filter still lives in the URL hash, so #work/ai, #work/web
 * and #work/mobile open straight onto a category and the back button and
 * pasted links keep working. Filtering never removes an item abruptly:
 * leaving items fade and shrink out of the layout while the rest slide into
 * their new places.
 *
 * This replaces the horizontal carousel, which showed every project in the
 * same slide one at a time.
 */

/** Showcases are large, so they rise rather than scale when they arrive. */
const showcaseSwap: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
  const { t } = useLanguage();
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduced = useReducedMotion();

  // The decorative word slides a little as the section arrives, so it sits
  // at a different depth from the heading in front of it.
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  // It starts at its resting place (0) because that is also what the server
  // renders: a non-zero start would stay baked into the HTML for anyone the
  // parallax is switched off for, leaving the word parked off-position.
  const decorX = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const visible = projects.filter((p) => active === "all" || p.categories.includes(active));
  const featured = FEATURED.flatMap((f) => {
    const project = visible.find((p) => p.slug === f.slug);
    return project ? [{ project, layout: f.layout }] : [];
  });
  const featuredSlugs = new Set(featured.map((f) => f.project.slug));
  const rest = visible.filter((p) => !featuredSlugs.has(p.slug));

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <BackgroundGlow preset="work" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas-2 to-transparent"
      />

      {/* A single oversized word behind the heading. Decoration only: at
          this opacity it registers as texture, never as something to read. */}
      <m.div
        aria-hidden="true"
        style={reduced ? undefined : { x: decorX }}
        className="pointer-events-none absolute right-[-3vw] top-16 select-none whitespace-nowrap font-heading text-[19vw] font-extrabold uppercase leading-none tracking-[-0.05em] text-decor sm:top-20"
      >
        {t.work.decor}
      </m.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
            <SectionHeading index="04" eyebrow={t.work.eyebrow} statement={t.work.statement} />
          </m.div>

          <m.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={fadeUp}
            className="flex flex-col items-start gap-3 lg:items-end"
          >
            <ProjectFilters active={active} onChange={setWorkFilter} />
            <span className="font-mono text-[11px] text-fg-3">
              {pad(visible.length)} / {pad(projects.length)}
            </span>
          </m.div>
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          <AnimatePresence mode="popLayout">
            {featured.map((f, i) => (
              <m.div
                key={f.project.slug}
                layout="position"
                transition={{ layout: LAYOUT }}
                variants={showcaseSwap}
                initial="hidden"
                whileInView="show"
                exit="exit"
                viewport={IN_VIEW}
              >
                <ProjectShowcase project={f.project} layout={f.layout} number={pad(i + 1)} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {rest.length > 0 && (
          <m.div layout="position" transition={{ layout: LAYOUT }} className="mt-20 sm:mt-28">
            <div className="flex items-center gap-4">
              <p className="t-eyebrow shrink-0">{t.work.moreTitle}</p>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatePresence mode="popLayout">
                {rest.map((project, i) => (
                  <m.div
                    key={project.slug}
                    layout
                    transition={{ layout: LAYOUT }}
                    variants={cardSwap}
                    initial="hidden"
                    whileInView="show"
                    exit="exit"
                    viewport={IN_VIEW}
                    // Cards share each row between them, so a short last row
                    // is filled rather than left with a gap.
                    className="min-w-0 grow basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]"
                  >
                    <ProjectCard project={project} number={pad(featured.length + i + 1)} />
                  </m.div>
                ))}
              </AnimatePresence>
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}

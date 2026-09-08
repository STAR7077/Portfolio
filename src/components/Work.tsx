"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { projects } from "@/data/projects";
import {
  getServerSnapshot,
  getSnapshot,
  setWorkFilter,
  subscribe,
  type WorkFilter,
} from "@/data/workFilter";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProjectSlide from "./ProjectSlide";
import Reveal from "./Reveal";
import CubeCluster from "./CubeCluster";

/** How far a pointer has to travel before it counts as a drag, not a click. */
const DRAG_THRESHOLD = 6;

export default function Work() {
  const { t } = useLanguage();

  // The URL hash is the filter, so #work/mobile opens straight onto the
  // mobile projects and every filter click leaves a link worth sharing.
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const filters: { key: WorkFilter; label: string }[] = [
    { key: "all", label: t.work.filterAll },
    { key: "ai", label: t.categories.ai },
    { key: "web", label: t.categories.web },
    { key: "mobile", label: t.categories.mobile },
  ];

  const visible =
    active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  const track = useRef<HTMLDivElement | null>(null);
  const [at, setAt] = useState(0);

  /** Width of one slide plus the gap, which is the distance between slides. */
  const stride = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  }, []);

  const glide = useRef(0);

  /**
   * Moves the track to a slide and animates getting there.
   *
   * Two reasons this is hand-rolled rather than scrollTo with a smooth
   * behaviour. Mandatory snapping has to be suspended for the duration,
   * because applying it to a track sitting between two slides jumps it to
   * the nearest one at once, which is what turned a released drag into a
   * teleport. And native smooth scrolling is not always available: plenty of
   * machines have it switched off, and there it lands instantly however it
   * is asked. A frame loop behaves the same everywhere.
   */
  const glideTo = useCallback((el: HTMLDivElement, left: number) => {
    cancelAnimationFrame(glide.current);

    const from = el.scrollLeft;
    const delta = left - from;
    if (Math.abs(delta) < 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = left;
      el.classList.remove("is-settling");
      return;
    }

    el.classList.add("is-settling");
    // Long enough to read as movement, short enough not to feel slow, and
    // scaled a little by how far it has to go.
    const ms = Math.min(620, Math.max(300, Math.abs(delta) * 0.42));
    const start = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      el.scrollLeft = from + delta * ease(t);
      if (t < 1) {
        glide.current = requestAnimationFrame(step);
      } else {
        glide.current = 0;
        el.classList.remove("is-settling");
      }
    };
    glide.current = requestAnimationFrame(step);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      const step = stride();
      if (!el || !step) return;
      const clamped = Math.max(0, Math.min(i, el.children.length - 1));
      glideTo(el, clamped * step);
    },
    [stride, glideTo]
  );

  // Follow the scroll position rather than owning it, so dragging, the
  // buttons, a trackpad swipe and the keyboard all report the same place.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const step = stride();
      if (step) setAt(Math.round(el.scrollLeft / step));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stride]);

  // Drag sideways with the pointer. The track scrolls natively, so this only
  // has to translate pointer movement into scrollLeft and then get out of the
  // way. Vertical movement is left alone, so a drag that is mostly downwards
  // still scrolls the page on to the next section.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let id: number | null = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let lastDx = 0;
    let dragging = false;
    let moved = false;

    function onDown(e: PointerEvent) {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      id = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      cancelAnimationFrame(glide.current);
      glide.current = 0;
      el!.classList.remove("is-settling");
      startLeft = el!.scrollLeft;
      lastDx = 0;
      dragging = true;
      moved = false;
    }

    function onMove(e: PointerEvent) {
      if (!dragging || e.pointerId !== id) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      lastDx = dx;

      if (!moved) {
        // Let a mostly-vertical gesture go: it belongs to the page.
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > DRAG_THRESHOLD) {
          dragging = false;
          return;
        }
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        moved = true;
        el!.setPointerCapture(e.pointerId);
        el!.classList.add("is-dragging");
      }

      el!.scrollLeft = startLeft - dx;
    }

    function release(e: PointerEvent) {
      if (!dragging || e.pointerId !== id) return;
      dragging = false;
      if (!moved) return;
      // is-settling takes over before is-dragging comes off, so snapping
      // is never briefly live while the track sits between two slides.
      el!.classList.add("is-settling");
      el!.classList.remove("is-dragging");
      try {
        el!.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      // Settle deliberately, since scroll snapping does not fire for a
      // scrollLeft written by hand. A slide is the width of the track, so
      // asking for half of it before the carousel moves means a lot of
      // dragging: a decisive flick of a seventh of the width is enough.
      const step = stride();
      if (!step) return;
      const from = Math.round(startLeft / step);
      const decisive = Math.abs(lastDx) > el!.clientWidth * 0.14;
      const target = decisive
        ? from + (lastDx < 0 ? 1 : -1)
        : Math.round(el!.scrollLeft / step);
      const clamped = Math.max(0, Math.min(target, el!.children.length - 1));
      glideTo(el!, clamped * step);
    }

    /** A drag that ends on a link must not also follow it. */
    function onClick(e: MouseEvent) {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    }

    // Starting a drag on a project image otherwise begins a native image
    // drag, which swallows the pointer stream: the events simply stop
    // arriving mid-gesture and the carousel never moves.
    const onDragStart = (e: Event) => e.preventDefault();
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(glide.current);
      el.classList.remove("is-dragging", "is-settling");
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
      el.removeEventListener("click", onClick, true);
    };
  }, [stride, glideTo]);

  // A new filter shows a different set, so start it at the beginning.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
    setAt(0);
  }, [active]);

  const count = visible.length;

  return (
    <section id="work" className="relative bg-[#1B1E87] py-24 sm:py-28">
      {/* One viewport of decoration at the top of the section: two
          concentric rings and the cube cluster, all sharing the reference's
          anchor point of top 50% / right 30%. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-screen overflow-hidden lg:block"
        aria-hidden="true"
      >
        <div className="absolute right-[30%] top-1/2 h-[160vh] w-[160vh] -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15" />
        <div className="absolute right-[30%] top-1/2 h-[100vh] w-[100vh] -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15" />
        <div className="absolute right-[30%] top-1/2 h-[100vh] w-[100vh] -translate-y-1/2 translate-x-1/2">
          <CubeCluster />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            {t.work.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-[42px] font-semibold leading-[1.16667] tracking-[-0.5px] text-white lg:text-[56px] xl:text-[72px]">
            {t.work.title}
          </h2>
          <p className="lead mt-7 max-w-2xl text-white/70">{t.work.intro}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {filters.map((f) => {
              const on = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setWorkFilter(f.key)}
                  aria-pressed={on}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                    on
                      ? "bg-white text-[#1B1E87] shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)]"
                      : "border border-white/25 bg-white/5 text-white/80 backdrop-blur hover:border-white hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            <span className="ml-2 font-mono text-sm text-white/70">
              {String(count).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>
      </div>

      {/* The projects run sideways, one to a slide. The section is only as
          tall as a single project, so scrolling down from anywhere in it
          carries straight on to the next section. */}
      <div
        ref={track}
        className="work-track relative z-10 mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2"
        role="group"
        aria-roledescription="carousel"
        aria-label={t.work.title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(at + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(at - 1);
          }
        }}
      >
        {visible.map((project, i) => (
          <div
            // Keyed by the filter as well, so a new set of slides is a new
            // set of elements and the entrance animation plays again. The
            // track itself is deliberately not keyed: remounting it would
            // strand the drag listeners on a detached node.
            key={`${active}-${project.slug}`}
            className="panel-in w-full flex-none snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            <ProjectSlide project={project} index={i} total={count} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-7 flex max-w-6xl items-center gap-4 px-6">
        <button
          type="button"
          onClick={() => goTo(at - 1)}
          disabled={at <= 0}
          aria-label={t.work.prevProject}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-[#1B1E87] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(at + 1)}
          disabled={at >= count - 1}
          aria-label={t.work.nextProject}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-[#1B1E87] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* One tick per project, so the length of the set is visible at a
            glance without counting slides. */}
        <div className="flex flex-1 items-center gap-1.5">
          {visible.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={project.title}
              aria-current={i === at}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i === at ? "bg-white" : "bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <span className="shrink-0 font-mono text-sm text-white/70">
          {String(Math.min(at + 1, count)).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

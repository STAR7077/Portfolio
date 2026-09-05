"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  /**
   * Pixels of travel across the section's scroll range. Negative moves the
   * layer up as you scroll down. Layers at different speeds are what create
   * the sense of depth.
   */
  speed: number;
  className?: string;
  children: ReactNode;
}

/**
 * Scroll-driven parallax for a decorative layer.
 *
 * The progress formula matches the reference implementation: the first
 * section measures against the viewport height, later ones against a
 * two-viewport window centred on the section, so each one animates over
 * its own approach and exit.
 *
 * Position is written straight to the node inside a rAF loop rather than
 * held in React state, so scrolling never triggers a re-render, and the
 * loop only runs while the section is actually on screen.
 */
export default function Parallax({ speed, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = node.closest("section");
    let frame = 0;
    let running = false;
    let lastY = NaN;

    function update() {
      frame = requestAnimationFrame(update);
      const vh = window.innerHeight;
      if (!vh) return;

      const top = section instanceof HTMLElement ? section.offsetTop : 0;
      const progress =
        top === 0
          ? window.scrollY / vh
          : (window.scrollY + vh - top) / (vh * 2);

      const y = progress * speed;
      if (Number.isNaN(y) || Math.abs(y - lastY) < 0.25) return;
      lastY = y;
      node!.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries[0]?.isIntersecting ?? false;
        if (onScreen && !running) {
          running = true;
          update();
        } else if (!onScreen && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(section instanceof HTMLElement ? section : node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

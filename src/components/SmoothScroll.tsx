"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling, the way all three reference sites do it.
 *
 * Lenis intercepts wheel and touch input and eases the scroll position,
 * which is what makes pinned and sticky sections read as deliberate
 * rather than jumpy. Anyone who has asked for reduced motion keeps
 * native scrolling, but still gets the anchor handling below.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let frame = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        // Expo-out, the same family as the reveal transitions.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });

      const instance = lenis;
      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    function scrollTo(target: HTMLElement | number, offset = 0) {
      if (lenis) {
        lenis.scrollTo(target, { offset });
        return;
      }
      const top =
        typeof target === "number"
          ? target
          : target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "auto" });
    }

    // Keep in-page anchors working through Lenis rather than jumping.
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!(target instanceof HTMLElement)) return;
      e.preventDefault();

      // On wide screens the contact panel is held fixed behind the page and
      // is uncovered as the content above scrolls off it. A fixed element
      // has no position in the document, so scrolling "to" it goes nowhere.
      // Reaching it means scrolling to the end of the page instead.
      const holder = target.closest(".reveal-footer");
      if (holder && getComputedStyle(holder).position === "fixed") {
        scrollTo(document.documentElement.scrollHeight);
        return;
      }

      scrollTo(target, -90);
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}

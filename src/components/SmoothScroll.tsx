"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { parseWorkHash, setWorkFilter } from "@/data/workFilter";

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

    /** Category deep links point at the Work section and set its filter. */
    function goToWork(hash: string) {
      const filter = parseWorkHash(hash);
      if (filter === null) return false;
      setWorkFilter(filter);
      const work = document.getElementById("work");
      if (work) scrollTo(work, -90);
      return true;
    }

    // Keep in-page anchors working through Lenis rather than jumping.
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      // "#work/mobile" is not a valid selector and matches no element, so
      // this has to come before the lookup below.
      if (goToWork(id)) {
        e.preventDefault();
        return;
      }

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

    // Someone arriving on #work/mobile gets no help from the browser: there
    // is no element with that id, so nothing scrolls. Wait for load, since
    // images above the fold decide where the section ends up.
    let settle = 0;
    const openDeepLink = () => {
      settle = requestAnimationFrame(() => goToWork(window.location.hash));
    };
    if (parseWorkHash(window.location.hash)) {
      if (document.readyState === "complete") openDeepLink();
      else window.addEventListener("load", openDeepLink, { once: true });
    }

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", openDeepLink);
      if (settle) cancelAnimationFrame(settle);
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}

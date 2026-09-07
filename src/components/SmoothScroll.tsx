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

    function scrollTo(target: HTMLElement | number, offset = 0, immediate = false) {
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate });
        return;
      }
      const top =
        typeof target === "number"
          ? target
          : target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "auto" });
    }

    /**
     * Holds a deep link on its target while the page is still growing.
     *
     * Arriving on #work/mobile means scrolling past everything above the
     * section, and those images are usually still loading, so the section
     * keeps moving down for a second or two. Rather than wait for the last
     * image, land immediately and re-aim whenever the target actually
     * moves, giving up as soon as the visitor scrolls for themselves.
     */
    let settleTimer = 0;
    let releaseSettle: (() => void) | null = null;

    function stopSettling() {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = 0;
      releaseSettle?.();
      releaseSettle = null;
    }

    const HANDOVER = ["wheel", "touchstart", "keydown", "mousedown"] as const;

    function settleOn(el: HTMLElement) {
      stopSettling();

      HANDOVER.forEach((ev) => window.addEventListener(ev, stopSettling, { passive: true }));
      releaseSettle = () => {
        HANDOVER.forEach((ev) => window.removeEventListener(ev, stopSettling));
      };

      const deadline = Date.now() + 3000;
      let aimedAt = NaN;

      const hold = () => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        // Only re-aim on a real layout shift, so an in-flight scroll is
        // left to finish instead of being restarted every tick.
        if (!Number.isFinite(aimedAt) || Math.abs(top - aimedAt) > 8) {
          aimedAt = top;
          scrollTo(el, -90, true);
        }
        settleTimer = Date.now() < deadline ? window.setTimeout(hold, 180) : 0;
        if (!settleTimer) stopSettling();
      };
      hold();
    }

    /** Category deep links point at the Work section and set its filter. */
    function goToWork(hash: string, arriving = false) {
      const filter = parseWorkHash(hash);
      if (filter === null) return false;
      setWorkFilter(filter);

      const work = document.getElementById("work");
      if (!work) return true;

      // On arrival the page is still settling, so hold the position. An
      // in-page click happens on a page that has stopped moving, where an
      // eased scroll reads better than a jump.
      if (arriving) settleOn(work);
      else scrollTo(work, -90);
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
    // is no element with that id, so nothing scrolls.
    let arrival = 0;
    if (parseWorkHash(window.location.hash)) {
      arrival = requestAnimationFrame(() => goToWork(window.location.hash, true));
    }

    // The same link opened in a tab that already has the site loaded is a
    // same-document navigation: no reload, so only this fires. Back and
    // forward between categories land here too.
    function onHashChange() {
      goToWork(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
      if (arrival) cancelAnimationFrame(arrival);
      stopSettling();
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}

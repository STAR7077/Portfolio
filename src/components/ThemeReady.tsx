"use client";

import { useEffect } from "react";

/**
 * Turns the colour transitions on once the page has painted.
 *
 * Without this, restoring a saved light theme would animate from dark to
 * light on every load, which is the flash this whole system exists to
 * avoid, just slower. Colours are applied instantly on arrival and only a
 * deliberate toggle after that is animated.
 *
 * Renders nothing.
 */
export default function ThemeReady() {
  useEffect(() => {
    // Two frames: one for the paint that uses the applied theme, one more
    // so the class lands after it rather than in the same commit.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.documentElement.classList.add("theme-ready"))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}

import type { Transition, Variants } from "motion/react";

/**
 * Every animated value on the site reads its timing from here, so the feel
 * can be tuned in one place. The CSS side (ambient loops, button feedback)
 * mirrors the same numbers as custom properties in globals.css.
 */

/** Long expo-out settle: fast to move, slow to finish. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Gentler, for things that should not appear to snap. */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.45,
  reveal: 0.7,
  hero: 0.85,
} as const;

export const STAGGER = {
  tight: 0.055,
  base: 0.09,
  loose: 0.14,
} as const;

/**
 * Shared viewport trigger for section reveals: fire once, a little before
 * the element reaches the fold so it is already settling as it arrives.
 */
export const IN_VIEW = { once: true, margin: "0px 0px -12% 0px", amount: 0.12 } as const;

/** Section content rising into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
};

/**
 * The hero headline, and nothing else, also resolves a blur. It runs once
 * on load; animating a filter anywhere that repeats would be wasteful.
 */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.hero, ease: EASE_OUT },
  },
};

/** A parent that releases its children one after another. */
export function stagger(gap: number = STAGGER.base, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
}

/** Small items, such as tech labels, inside a staggered group. */
export const itemUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Cards arriving and leaving when a filter changes. */
export const cardSwap: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

/** Cards sliding into their new positions after a filter change. */
export const LAYOUT: Transition = { duration: 0.5, ease: EASE_OUT };

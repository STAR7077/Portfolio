"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Loads motion's feature set once for the whole page.
 *
 * domMax rather than domAnimation because the Work filter relies on layout
 * animation, which only the larger set includes. `strict` makes a stray
 * `motion.div` an error, so every animated element uses the lighter `m`
 * component and the feature bundle is only paid for once.
 *
 * reducedMotion="user" drops transform and layout animation for anyone who
 * has asked their system for less motion, leaving opacity changes in place.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

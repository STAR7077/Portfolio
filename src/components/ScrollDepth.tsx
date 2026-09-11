"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * A few pixels of scroll parallax for a layer inside a larger surface: as
 * the surface passes through the viewport the layer drifts from `amount`
 * below its resting place to `amount` above it, so it reads as sitting at a
 * different depth from its frame.
 *
 * Transform only, driven by motion's scroll tracking rather than a scroll
 * listener of its own. Desktop widths only, and off entirely for anyone who
 * has asked for reduced motion: on a phone it would be motion for its own
 * sake on a screen being scrolled quickly past.
 */

const WIDE = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function ScrollDepth({
  children,
  amount = 16,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const wide = useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <m.div ref={ref} style={reduced || !wide ? undefined : { y }} className={className}>
      {children}
    </m.div>
  );
}

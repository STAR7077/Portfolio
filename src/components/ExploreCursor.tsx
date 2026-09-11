"use client";

import { useRef, useState, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { IconArrowUpRight } from "./icons";

/**
 * A small label that follows the pointer across a large project visual,
 * saying what a click there does.
 *
 * It sits just below and to the right of the pointer instead of replacing
 * it: the browser's own cursor stays, so nothing about the page's normal
 * behaviour changes. It only exists on fine pointers, since a touch screen
 * has no hover position to follow.
 */

const FINE = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

interface ExploreCursorProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export default function ExploreCursor({ label, children, className = "" }: ExploreCursorProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useSyncExternalStore(subscribe, () => window.matchMedia(FINE).matches, () => false);
  const reduced = useReducedMotion();
  const [inside, setInside] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  function place(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left + 16);
    y.set(e.clientY - rect.top + 18);
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        // Start where the pointer is, so the label does not fly in from 0,0.
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.jump(e.clientX - rect.left + 16);
          y.jump(e.clientY - rect.top + 18);
        }
        setInside(true);
      }}
      onPointerMove={(e) => e.pointerType === "mouse" && place(e)}
      onPointerLeave={() => setInside(false)}
    >
      {children}
      {fine && (
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-40"
          style={reduced ? { x, y } : { x: sx, y: sy }}
          initial={false}
          animate={{ opacity: inside ? 1 : 0, scale: inside ? 1 : 0.85 }}
          transition={{ duration: 0.2 }}
        >
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[rgba(13,17,24,0.85)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md">
            {label}
            <IconArrowUpRight size={12} />
          </span>
        </m.span>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Milliseconds to stagger this element behind the ones beside it. */
  delay?: number;
  /** Rendered element. Defaults to a div so it can wrap anything. */
  as?: ElementType;
  className?: string;
}

/**
 * Reveals its children once they scroll into view: a short rise plus a fade,
 * on a long expo-out curve. It fires once and then stops observing, so
 * scrolling back up does not replay it.
 *
 * Content is always in the DOM and readable without JavaScript; only the
 * transition is conditional, and prefers-reduced-motion drops it in CSS.
 */
export default function Reveal({ children, delay = 0, as, className = "" }: RevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver, show everything rather than hiding content.
    // Deferred a frame so this is not a synchronous state update inside the effect.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Start a little before the element reaches the fold so it is already
      // settling by the time it is properly on screen.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

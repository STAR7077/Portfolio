"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Holds the contact section and footer behind the page, so the content
 * above scrolls off them and reveals them, the way the reference site's
 * sticky footer works.
 *
 * The panel's own height is published as --reveal-h and the page above
 * reserves exactly that much margin. Writing a CSS variable rather than
 * keeping the number in React state keeps this out of the render path.
 */
export default function RevealFooter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The reveal only works while the panel fits the viewport: a fixed panel
    // taller than the screen has its top, the headline, cut off for good.
    // When it does not fit it simply follows the page like any section.
    const publish = () => {
      const height = node.offsetHeight;
      const fits = height <= window.innerHeight;
      node.dataset.fits = String(fits);
      document.documentElement.style.setProperty("--reveal-h", fits ? `${height}px` : "0px");
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(node);
    window.addEventListener("resize", publish);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", publish);
      document.documentElement.style.removeProperty("--reveal-h");
    };
  }, []);

  return (
    <div ref={ref} className="reveal-footer">
      {children}
    </div>
  );
}

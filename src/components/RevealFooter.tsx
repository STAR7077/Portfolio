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

    const publish = () =>
      document.documentElement.style.setProperty("--reveal-h", `${node.offsetHeight}px`);

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

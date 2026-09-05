"use client";

import { useRef, useState, type WheelEvent } from "react";

const PALETTE = [
  "from-violet-300/60 via-fuchsia-200/40 to-transparent",
  "from-indigo-300/60 via-violet-200/40 to-transparent",
  "from-fuchsia-300/60 via-pink-200/40 to-transparent",
  "from-sky-300/60 via-violet-200/40 to-transparent",
];

function colorFor(title: string) {
  const sum = title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

function Placeholder({ title }: { title: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${colorFor(
        title
      )} bg-[#eceaf2]`}
    >
      <span className="font-heading text-4xl font-bold text-[#16151c]/20">
        {title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
      </span>
    </div>
  );
}

interface ProjectCarouselProps {
  title: string;
  /** Paths under /public. Missing files are skipped silently. */
  images: string[];
}

export default function ProjectCarousel({ title, images }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const lastWheel = useRef(0);

  const usable = images.filter((src) => !broken.has(src));
  if (usable.length === 0) return <Placeholder title={title} />;

  const safeIndex = index % usable.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + usable.length) % usable.length);
  }

  /**
   * Wheeling over the image steps through the set. The event is not
   * cancelled, so the page keeps scrolling normally: the images advance
   * as a side effect rather than trapping the pointer.
   */
  function onWheel(e: WheelEvent<HTMLDivElement>) {
    if (usable.length < 2) return;
    if (Math.abs(e.deltaY) < 12) return;
    const now = Date.now();
    if (now - lastWheel.current < 320) return;
    lastWheel.current = now;
    go(e.deltaY > 0 ? 1 : -1);
  }

  return (
    <div
      className="group/carousel relative h-full w-full overflow-hidden bg-[#eceaf2]"
      onWheel={onWheel}
    >
      {usable.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${title} screenshot ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: i === safeIndex ? 1 : 0,
            transform: i === safeIndex ? "scale(1)" : "scale(1.04)",
          }}
          onError={() => setBroken((prev) => new Set(prev).add(src))}
        />
      ))}

      {usable.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={(e) => { e.preventDefault(); go(-1); }}
            className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#16151c] opacity-0 shadow-sm transition-opacity duration-300 group-hover/carousel:opacity-100"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={(e) => { e.preventDefault(); go(1); }}
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#16151c] opacity-0 shadow-sm transition-opacity duration-300 group-hover/carousel:opacity-100"
          >
            &rsaquo;
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {usable.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === safeIndex ? "w-4 bg-[#16151c]" : "w-1.5 bg-[#16151c]/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

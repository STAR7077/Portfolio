"use client";

import { useState } from "react";

const PALETTE = [
  "from-violet-600/40 via-fuchsia-600/20 to-transparent",
  "from-indigo-600/40 via-violet-600/20 to-transparent",
  "from-fuchsia-600/40 via-pink-600/20 to-transparent",
  "from-sky-600/40 via-violet-600/20 to-transparent",
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
      )} bg-[#0d0d1a]`}
    >
      <span className="font-heading text-4xl font-bold text-white/25">
        {title
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 3)}
      </span>
    </div>
  );
}

interface ProjectCarouselProps {
  title: string;
  /** Paths under /public, e.g. ["/projects/faire-1.jpg", ...]. Missing files are skipped silently. */
  images: string[];
}

export default function ProjectCarousel({ title, images }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const usable = images.filter((src) => !broken.has(src));

  if (usable.length === 0) {
    return <Placeholder title={title} />;
  }

  const safeIndex = index % usable.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + usable.length) % usable.length);
  }

  return (
    <div className="group/carousel relative h-full w-full overflow-hidden bg-[#0d0d1a]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={usable[safeIndex]}
        src={usable[safeIndex]}
        alt={`${title} screenshot ${safeIndex + 1}`}
        className="h-full w-full object-cover"
        onError={() =>
          setBroken((prev) => new Set(prev).add(usable[safeIndex]))
        }
      />

      {usable.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.preventDefault();
              go(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/carousel:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={(e) => {
              e.preventDefault();
              go(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/carousel:opacity-100"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {usable.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === safeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

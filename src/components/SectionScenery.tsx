"use client";

import Parallax from "./Parallax";

/* eslint-disable @next/next/no-img-element */

/**
 * Decorative isometric pieces drifting behind a section.
 *
 * This follows the reference project's idiom for every section below its
 * hero: one oversized shape pushed part-way off canvas, a smaller one
 * opposite it, and a blurred copy moving the other way. Rates mirror the
 * reference's -200 / -400 / +200 pattern. Artwork is MIT-licensed; see
 * THIRD-PARTY-NOTICES.md.
 */

interface Piece {
  src: string;
  /** Position and size, relative to the section box. */
  className: string;
  speed: number;
  opacity?: number;
  blur?: boolean;
}

const PRESETS: Record<string, Piece[]> = {
  about: [
    { src: "/hero/pink-floor-square.webp", className: "-right-[14%] top-[6%] w-[46%]", speed: -200, opacity: 0.5 },
    { src: "/hero/white-floor-square.webp", className: "left-[4%] top-[62%] w-[16%]", speed: -400, opacity: 0.9 },
    { src: "/hero/white-floor-square.webp", className: "left-[38%] top-[2%] w-[11%]", speed: 200, opacity: 0.7, blur: true },
  ],
  reach: [
    { src: "/hero/orange-ball.webp", className: "left-[7%] top-[12%] w-[5%]", speed: 260, opacity: 0.85 },
    { src: "/hero/purple-top.webp", className: "-left-[8%] bottom-[8%] w-[24%]", speed: -240, opacity: 0.35 },
    { src: "/hero/white-floor-square.webp", className: "right-[6%] top-[8%] w-[12%]", speed: -380, opacity: 0.8, blur: true },
  ],
  testimonials: [
    { src: "/hero/pink-floor-square.webp", className: "-left-[16%] top-[10%] w-[42%]", speed: -200, opacity: 0.4 },
    { src: "/hero/white-floor-square.webp", className: "right-[5%] top-[4%] w-[13%]", speed: 220, opacity: 0.85, blur: true },
  ],
  contact: [
    { src: "/hero/white-floor-square.webp", className: "-left-[6%] top-[4%] w-[34%]", speed: -260, opacity: 0.6 },
    { src: "/hero/floor-ball.webp", className: "right-[9%] bottom-[14%] w-[9%]", speed: 240, opacity: 0.8 },
  ],
};

export default function SectionScenery({ preset }: { preset: keyof typeof PRESETS }) {
  const pieces = PRESETS[preset] ?? [];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {pieces.map((piece, i) => (
        <Parallax key={i} speed={piece.speed} className={`absolute ${piece.className}`}>
          <img
            src={piece.src}
            alt=""
            className={`w-full ${piece.blur ? "blur-[2px]" : ""}`}
            style={{ opacity: piece.opacity ?? 1 }}
          />
        </Parallax>
      ))}
    </div>
  );
}

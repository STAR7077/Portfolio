"use client";

import Parallax from "./Parallax";

/* eslint-disable @next/next/no-img-element */

/**
 * Isometric hero scene.
 *
 * Artwork and layout come from the MIT-licensed `personal-website` project
 * by Maksym; see THIRD-PARTY-NOTICES.md at the repository root. The piece
 * positions and the per-layer parallax rates match that implementation:
 * some pieces are fixed to the floor, the ones above it travel at their
 * own rate, and one is repeated blurred as a depth cue.
 */
export default function HeroIllustration() {
  return (
    <div className="relative h-full w-full">
      {/* Fixed to the ground plane. */}
      <img src="/hero/floor.webp" alt="" className="absolute bottom-0 left-0 w-full" />
      <img src="/hero/left-blue.webp" alt="" className="absolute bottom-[39.6%] left-[19.3%] w-[33%]" />
      <img src="/hero/right-yellow.webp" alt="" className="absolute bottom-[40%] right-[14.3%] w-[25%]" />
      <img
        src="/hero/pink-floor-square.webp"
        alt=""
        className="absolute bottom-[7%] left-[3%] hidden w-[27%] sm:block"
      />

      {/* Rising as you scroll. */}
      <Parallax speed={-100} className="absolute bottom-[68%] right-[31%] w-[33%]">
        <img src="/hero/purple-top.webp" alt="" className="w-full" />
      </Parallax>
      <Parallax speed={-200} className="absolute bottom-[76%] right-[39.2%] w-[16.5%]">
        <img src="/hero/pink-top.webp" alt="" className="w-full" />
      </Parallax>
      <Parallax speed={-200} className="absolute bottom-[39%] right-[43.2%] w-[8%]">
        <img src="/hero/orange-ball.webp" alt="" className="w-full" />
      </Parallax>
      <Parallax speed={-100} className="absolute bottom-[19%] left-[-4%] hidden w-[19%] sm:block">
        <img src="/hero/white-floor-square.webp" alt="" className="w-full" />
      </Parallax>

      {/* Falling as you scroll. */}
      <Parallax speed={100} className="absolute bottom-[16%] right-[13%] w-[16%]">
        <img src="/hero/floor-ball.webp" alt="" className="w-full" />
      </Parallax>

      {/* The same square again, blurred and moving fastest, which is what
          separates the foreground from everything behind it. */}
      <Parallax speed={200} className="absolute left-[11%] top-[13%] hidden w-[20%] sm:block">
        <img src="/hero/white-floor-square.webp" alt="" className="w-full blur-[2px]" />
      </Parallax>
    </div>
  );
}

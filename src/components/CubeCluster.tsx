"use client";

import Parallax from "./Parallax";

/* eslint-disable @next/next/no-img-element */

/**
 * The expanding cube cluster.
 *
 * Positions and travel are taken from the MIT-licensed reference project's
 * WhatIDo illustration; see THIRD-PARTY-NOTICES.md. The cubes fly apart
 * from the centre as the section scrolls: the light cubes move sideways in
 * opposite directions, the pink one rises, the violet one falls, and the
 * two small balls shoot off diagonally. The orange ball stays put, so the
 * expansion has a fixed point to read against.
 */
export default function CubeCluster() {
  return (
    <div className="relative h-full w-full">
      {/* Left cube travels left only. */}
      <Parallax speed={0} speedX={-200} className="absolute left-[-13%] top-[37%] w-[88%]">
        <img src="/hero/light-purple-cube.png" alt="" className="w-full" />
      </Parallax>

      {/* Right cube travels right only. */}
      <Parallax speed={0} speedX={200} className="absolute left-[7%] top-[42%] w-[88%]">
        <img src="/hero/light-purple-cube.png" alt="" className="w-full" />
      </Parallax>

      {/* Pink cube rises. */}
      <Parallax speed={-300} className="absolute left-[39.5%] top-[25%] w-[18%]">
        <img src="/hero/pink-top.png" alt="" className="w-full" />
      </Parallax>

      {/* Violet cube falls. */}
      <Parallax speed={300} className="absolute left-[4%] top-[46%] w-[70%]">
        <img src="/hero/dark-purple-cube.png" alt="" className="w-full" />
      </Parallax>

      {/* Balls shoot off diagonally, fastest of all. */}
      <Parallax speed={-400} speedX={-400} className="absolute left-[37%] top-[35%] w-[4.5%]">
        <img src="/hero/white-ball.png" alt="" className="w-full" />
      </Parallax>
      <Parallax speed={-300} speedX={300} className="absolute left-[58%] top-[45%] w-[4%]">
        <img src="/hero/white-ball.png" alt="" className="w-full" />
      </Parallax>

      {/* Fixed centre. */}
      <img
        src="/hero/orange-ball.png"
        alt=""
        className="absolute left-[46%] top-[43.5%] w-[5.3%]"
      />
    </div>
  );
}

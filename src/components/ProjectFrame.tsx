"use client";

import Image from "next/image";
import type { FrameKind } from "@/data/showcase";

interface ProjectFrameProps {
  kind: FrameKind;
  src: string;
  alt: string;
  /** Rendered width at each breakpoint, so the right size is fetched. */
  sizes: string;
  /** Shown in a browser frame's address bar. */
  domain?: string | null;
  /** Width over height of the screen area. Defaults per frame. */
  ratio?: string;
  className?: string;
}

/**
 * Device chrome around a screenshot, so a project reads as a product rather
 * than a picture in a rectangle.
 *
 * The image zooms slightly when an ancestor marked `group` is hovered, which
 * is how both the showcase stages and the grid cards drive it. Images load
 * lazily: nothing in Work is above the fold.
 */
export default function ProjectFrame({
  kind,
  src,
  alt,
  sizes,
  domain,
  ratio,
  className = "",
}: ProjectFrameProps) {
  const img = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
    />
  );

  if (kind === "phone") {
    return (
      <div
        className={`relative mx-auto w-full rounded-[34px] border border-white/[0.12] bg-sunken p-[7px] shadow-[var(--shadow-float)] ${className}`}
      >
        <div
          className="relative overflow-hidden rounded-[27px] bg-black"
          style={{ aspectRatio: ratio ?? "603 / 952" }}
        >
          {img}
        </div>
      </div>
    );
  }

  if (kind === "media") {
    return (
      <div
        className={`relative overflow-hidden rounded-[14px] border border-line bg-sunken shadow-[var(--shadow-float)] ${className}`}
        style={{ aspectRatio: ratio ?? "770 / 333" }}
      >
        {img}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-line bg-sunken shadow-[var(--shadow-float)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-white/[0.025] px-3.5 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        </div>
        {domain && (
          <span className="mx-auto min-w-0 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10.5px] text-fg-3">
            {domain}
          </span>
        )}
        {/* Balances the dots so the address sits in the true centre. */}
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div className="relative overflow-hidden bg-sunken" style={{ aspectRatio: ratio ?? "16 / 9" }}>
        {img}
      </div>
    </div>
  );
}

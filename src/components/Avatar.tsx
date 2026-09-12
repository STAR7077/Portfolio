"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Deterministic-ish color pick from name so the same person always gets the same tint.
// Initials fall back onto the site's own accents, never a stray hue.
const PALETTE = [
  "from-[var(--accent-strong)] to-[var(--accent-blue)]",
  "from-[var(--accent-strong)] to-[var(--accent-cyan)]",
  "from-[var(--accent)] to-[var(--accent-highlight)]",
  "from-[var(--accent-blue)] to-[var(--accent-cyan)]",
];

function colorFor(name: string) {
  const sum = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

interface AvatarProps {
  name: string;
  /** Path under /public, e.g. "/testimonials/gabriel-londero.webp". Shown only if the file actually exists. */
  src: string;
  size?: number;
}

export default function Avatar({ name, src, size = 44 }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br ${colorFor(
          name
        )} font-heading font-semibold text-white shrink-0`}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        title={name}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className="rounded-full object-cover shrink-0 bg-raised ring-1 ring-white/10"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}

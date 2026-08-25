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

interface ProjectImageProps {
  title: string;
  /** Path under /public, e.g. "/projects/faire.jpg" — shown only if the file actually exists. */
  src: string;
}

export default function ProjectImage({ title, src }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${colorFor(
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${title} screenshot`}
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

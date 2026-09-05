"use client";

import { projects } from "@/data/projects";

const STACK = [
  "Node.js", "Python", "React", "Next.js", "TypeScript", "Django",
  "PostgreSQL", "Redis", "React Native", "Flutter", "OpenAI", "Claude",
  "Gemini", "n8n", "Supabase", "Airtable", "Docker", "AWS", "Odoo",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // The track holds the list twice and travels exactly -50%, so the second
  // copy lands where the first began and the loop is seamless.
  const doubled = [...items, ...items];

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`marquee-track flex w-max shrink-0 gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--muted)] shadow-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const titles = projects.map((p) => p.title);

  return (
    <section
      className="relative overflow-hidden py-10"
      aria-hidden="true"
    >
      {/* Fade the ends so the loop does not visibly cut off at the edges. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="flex flex-col gap-3">
        <Row items={STACK} />
        <Row items={titles} reverse />
      </div>
    </section>
  );
}

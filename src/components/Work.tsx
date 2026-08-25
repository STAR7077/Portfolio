"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

const filters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & Automation" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
];

export default function Work() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible =
    active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="work" className="py-24 sm:py-28 border-t border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Selected projects" title="Work." />
        <p className="max-w-2xl text-slate-400">
          A mix of AI-agent systems, SaaS platforms and mobile apps from recent freelance and contract
          engagements. Client codebases are private, so these are summarized case studies rather than
          public repos.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f.key
                  ? "bg-violet-500 text-white"
                  : "border border-white/10 text-slate-300 hover:border-white/25"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import type { CSSProperties } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProjectCarousel from "./ProjectCarousel";

interface StackCardProps {
  project: Project;
  index: number;
  total: number;
}

/**
 * One card in the sticky deck. Each pins `index * step` lower than the
 * previous one, so scrolling deals them onto each other and leaves a
 * stepped edge of every earlier card visible.
 */
export default function StackCard({ project, index, total }: StackCardProps) {
  const { locale, t } = useLanguage();

  const categoryLabel: Record<ProjectCategory, string> = {
    ai: t.categories.ai,
    web: t.categories.web,
    mobile: t.categories.mobile,
  };

  const linkLabel =
    project.linkKind === "playStore"
      ? t.work.playStore
      : project.linkKind === "drive"
        ? t.work.projectFiles
        : t.work.companySite;

  return (
    <article
      className="stack-card mb-5"
      style={{ "--i": index } as CSSProperties}
    >
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_-2px_0_0_rgba(228,228,234,1),0_20px_44px_-24px_rgba(22,21,28,0.45)] sm:grid-cols-[minmax(0,240px)_1fr]">
        <div className="h-40 w-full sm:h-auto">
          <ProjectCarousel
            title={project.title}
            images={project.images.map((f) => `/projects/${f}`)}
          />
        </div>

        <div className="flex min-h-[300px] flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[var(--accent-tint)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[var(--accent)]"
                >
                  {categoryLabel[c]}
                </span>
              ))}
            </div>
            <span className="shrink-0 font-mono text-[11px] tracking-widest text-[var(--faint)]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--foreground)]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[var(--accent)]">
            {project.tagline[locale]}
          </p>
          <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-[var(--muted)]">
            {project.description[locale]}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--faint)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-2)]"
            >
              {linkLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

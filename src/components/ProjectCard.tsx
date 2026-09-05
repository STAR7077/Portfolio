"use client";

import type { Project, ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectCard({ project }: { project: Project }) {
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
    <article className="lift group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl hover:border-violet-400/40">
      <div className="relative h-44 w-full overflow-hidden">
        <ProjectCarousel
          title={project.title}
          images={project.images.map((f) => `/projects/${f}`)}
        />
        {/* Softens the join between screenshot and card body. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0b12]/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-violet-300"
            >
              {categoryLabel[c]}
            </span>
          ))}
        </div>

        <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-sm font-medium text-violet-300/80">{project.tagline[locale]}</p>
        <p className="text-sm leading-relaxed text-slate-400">{project.description[locale]}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tech.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-slate-400"
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
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            {linkLabel}
          </a>
        )}
      </div>
    </article>
  );
}

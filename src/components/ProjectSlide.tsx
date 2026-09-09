"use client";

import type { Project, ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectSlideProps {
  project: Project;
  index: number;
  total: number;
}

/**
 * One project, filling the width of the carousel: the write-up on the left
 * and the imagery on the right, each with a half of the slide rather than
 * sharing one small card.
 *
 * This replaced a sticky deck of twelve cards, which was the right idea at
 * three projects and turned the section into eleven phone screens at twelve.
 */
export default function ProjectSlide({ project, index, total }: ProjectSlideProps) {
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
    <article className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_-2px_0_0_rgba(228,228,234,1),0_20px_44px_-24px_rgba(22,21,28,0.45)] lg:grid-cols-2">
      {/* Left half: the write-up. */}
      <div className="flex min-h-[360px] flex-col p-7 sm:p-9 lg:p-10">
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

        <h3 className="mt-5 font-heading text-2xl text-[var(--foreground)] sm:text-3xl">
          {project.title}
        </h3>

        {project.demoWhatsApp && (
          <a
            href={`https://wa.me/${project.demoWhatsApp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-3 py-1.5 text-[13px] font-semibold text-[#0F7A42] transition-colors hover:bg-[#25D366]/20"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.71.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
            </svg>
            <span>{project.demoWhatsApp}</span>
            <span className="font-normal text-[var(--faint)]">{t.work.tryBot}</span>
          </a>
        )}

        <p
          className={`font-medium text-[var(--accent)] ${project.demoWhatsApp ? "mt-3" : "mt-1.5"}`}
        >
          {project.tagline[locale]}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
          {project.description[locale]}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tech.slice(0, 8).map((tech) => (
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
            className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-2)]"
          >
            {linkLabel}
          </a>
        )}
      </div>

      {/* Right half: the imagery. */}
      <div className="order-first h-60 w-full sm:h-72 lg:order-none lg:h-auto">
        <ProjectCarousel
          title={project.title}
          images={project.images.map((f) => `/projects/${f}`)}
          priority={index === 0}
        />
      </div>
    </article>
  );
}

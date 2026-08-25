import type { Project } from "@/data/projects";
import ProjectImage from "./ProjectImage";

const categoryLabel: Record<string, string> = {
  ai: "AI & Automation",
  web: "Web",
  mobile: "Mobile",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-violet-400/40">
      <div className="h-44 w-full overflow-hidden">
        <ProjectImage title={project.title} src={`/projects/${project.image}`} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300"
            >
              {categoryLabel[c]}
            </span>
          ))}
        </div>

        <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-sm font-medium text-violet-300/80">{project.tagline}</p>
        <p className="text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tech.slice(0, 6).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            Company site ↗
          </a>
        )}
      </div>
    </article>
  );
}

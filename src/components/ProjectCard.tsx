"use client";

import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { CATEGORY_TONE, domainOf, frameFor } from "@/data/showcase";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProjectFrame from "./ProjectFrame";
import { CategoryTags, ClampToggle, ProjectLink, TechList, useClamp } from "./ProjectParts";

/**
 * A project in the compact grid under the showcases.
 *
 * The whole card is one link: the written link stretches its hit area over
 * the card, so there is a single named interactive element rather than a
 * link wrapped around a block of content. The Read more toggle sits above
 * that hit area.
 *
 * Descriptions open at four lines with the rest one click away. The text is
 * all in the page either way, so search engines and screen readers get the
 * full write-up; the clamp only keeps eight cards from running to seven
 * screens. The toggle appears only when a description actually overflows.
 *
 * It is a container query host: a card left alone on its row takes the
 * full width and, past about 42rem, lays out side by side.
 */

const TECH_PREVIEW = 6;

export default function ProjectCard({ project, number }: { project: Project; number: string }) {
  const { locale } = useLanguage();
  const tone = CATEGORY_TONE[project.categories[0]];
  const [bodyRef, clamp] = useClamp(locale);

  return (
    <article
      className="@container group card card-hover card-cat relative flex h-full flex-col overflow-hidden"
      style={{ "--cat": tone.rgb } as CSSProperties}
    >
      <div className="flex h-full flex-col @2xl:flex-row">
        <div className="relative shrink-0 border-b border-line bg-sunken p-4 @2xl:w-[46%] @2xl:border-b-0 @2xl:border-r @2xl:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `radial-gradient(420px circle at 50% 0%, rgba(${tone.rgb}, 0.12), transparent 62%)` }}
          />
          <ProjectFrame
            kind={frameFor(project.slug)}
            src={`/projects/${project.images[0]}`}
            alt={`${project.title} screenshot 1`}
            domain={domainOf(project.link)}
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 520px"
            className="relative"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <CategoryTags categories={project.categories} />
            <span className="font-mono text-[11px] text-fg-3">{number}</span>
          </div>
          <h3 className="mt-4 text-[1.25rem] font-bold tracking-[-0.025em] text-fg">{project.title}</h3>
          <p className={`mt-1 text-[14px] font-medium ${tone.text}`}>{project.tagline[locale]}</p>

          <p
            id={clamp.id}
            ref={bodyRef}
            className={`mt-3 text-[14.5px] leading-relaxed text-fg-2 ${clamp.expanded ? "" : "line-clamp-4"}`}
          >
            {project.description[locale]}
          </p>
          <ClampToggle clamp={clamp} />

          <div className="mt-5">
            <TechList tech={project.tech} limit={clamp.expanded ? undefined : TECH_PREVIEW} />
          </div>
          <div className="mt-auto pt-6">
            <ProjectLink project={project} stretch />
          </div>
        </div>
      </div>
    </article>
  );
}

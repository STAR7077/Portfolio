"use client";

import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { CATEGORY_TONE, domainOf, frameFor, type ShowcaseLayout } from "@/data/showcase";
import { useLanguage } from "@/i18n/LanguageProvider";
import ExploreCursor from "./ExploreCursor";
import ProjectFrame from "./ProjectFrame";
import ScrollDepth from "./ScrollDepth";
import { CategoryTags, ClampToggle, DemoChip, ProjectLink, TechList, useClamp } from "./ProjectParts";
import StatusChip from "./StatusChip";
import { IconBolt, IconSpark, IconUsers } from "./icons";

/**
 * A featured project, given room: the product on a lit stage with a few
 * interface details floating over it, and the full write-up beside or
 * beneath it. Each of the four layouts is used once, so the section never
 * repeats a card.
 *
 * The floating details are decorative mock-ups of what each system does,
 * built from its real stack. They carry no invented results, and they are
 * hidden from assistive technology.
 */

interface Props {
  project: Project;
  layout: ShowcaseLayout;
  number: string;
}

/** One floating detail over a stage. */
function Signal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-20 hidden sm:block ${className}`}>
      <div className="panel px-3 py-2.5">{children}</div>
    </div>
  );
}

function SignalStatus({ icon, title, status }: { icon: ReactNode; title: string; status: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.12)] text-accent-hi">
        {icon}
      </span>
      <span className="whitespace-nowrap text-[12.5px] font-semibold text-fg">{title}</span>
      {status}
    </div>
  );
}

function SignalMono({ top, bottom }: { top: string; bottom?: string }) {
  return (
    <div className="font-mono text-[11px] leading-snug">
      <div className="whitespace-nowrap text-fg-2">{top}</div>
      {bottom && <div className="mt-1 whitespace-nowrap text-ai">{bottom}</div>}
    </div>
  );
}

/**
 * The lit surface a project sits on. The whole stage is a pointer shortcut
 * to the project, duplicating the written link below it, so it is taken
 * out of the tab order and hidden from screen readers rather than
 * announced twice.
 */
function Stage({
  project,
  href,
  label,
  children,
  className = "",
}: {
  project: Project;
  href?: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const tone = CATEGORY_TONE[project.categories[0]];
  const surface = (
    <div className="group relative overflow-hidden rounded-panel border border-line bg-[image:var(--grad-stage)] shadow-[var(--edge-top)]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `radial-gradient(700px circle at 50% 0%, rgba(${tone.rgb}, 0.16), transparent 62%)` }}
      />
      {children}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 z-30"
        />
      )}
    </div>
  );

  if (!href) return <div className={className}>{surface}</div>;
  return (
    <ExploreCursor label={label} className={className}>
      {surface}
    </ExploreCursor>
  );
}

export default function ProjectShowcase({ project, layout, number }: Props) {
  const { locale, t } = useLanguage();
  const v = t.heroVisual;
  const kind = frameFor(project.slug);
  const tone = CATEGORY_TONE[project.categories[0]];
  const images = project.images.map((f) => `/projects/${f}`);
  const domain = domainOf(project.link);
  const alt = (i: number) => `${project.title} screenshot ${i + 1}`;
  // Fully open on a desktop, where there is room beside the visual. Below
  // that the four showcases would otherwise run to twelve screens.
  const [bodyRef, clamp] = useClamp(locale);

  // The bot has no site to visit, but it does have a live number to message.
  const stageHref = project.demoWhatsApp
    ? `https://wa.me/${project.demoWhatsApp.replace(/\D/g, "")}`
    : project.link;
  const stageLabel = project.demoWhatsApp ? t.work.tryBot : t.work.explore;

  const heading = (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] text-fg-3">{number}</span>
        <CategoryTags categories={project.categories} />
      </div>
      <h3 className="mt-4 text-[clamp(1.8rem,2.8vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-fg">
        {project.title}
      </h3>
      {/* The number sits directly under the name, which is where it was
          asked for: it is the one thing on the page a visitor can try. */}
      {project.demoWhatsApp && <DemoChip number={project.demoWhatsApp} className="mt-3" />}
      <p className={`mt-2 text-[15px] font-medium ${tone.text}`}>{project.tagline[locale]}</p>
    </>
  );

  const body = (
    <>
      <p
        id={clamp.id}
        ref={bodyRef}
        className={`text-[15.5px] leading-[1.7] text-fg-2 ${clamp.expanded ? "" : "line-clamp-5 lg:line-clamp-none"}`}
      >
        {project.description[locale]}
      </p>
      <ClampToggle clamp={clamp} />
      <div className="mt-6">
        <TechList tech={project.tech} />
      </div>
      <ProjectLink project={project} className="mt-7" />
    </>
  );

  // ---------------------------------------------------------------- visuals

  const phoneStage = (
    <Stage project={project} href={stageHref} label={stageLabel}>
      <div className="relative flex items-center justify-center px-6 py-10 sm:py-14">
        <ScrollDepth className="w-full max-w-[230px] sm:max-w-[260px]">
          <ProjectFrame
            kind="phone"
            src={images[0]}
            alt={alt(0)}
            sizes="(max-width: 639px) 70vw, 260px"
          />
        </ScrollDepth>
        <Signal className="float-a left-6 top-10 lg:left-8">
          <SignalStatus
            icon={<IconSpark size={13} />}
            title={v.agent}
            status={
              <StatusChip tone="cyan" pulse>
                {v.active}
              </StatusChip>
            }
          />
        </Signal>
        <Signal className="float-b bottom-10 right-6 lg:right-8">
          <SignalMono top="POST /webhooks/whatsapp" bottom="200 OK · 84 ms" />
        </Signal>
      </div>
    </Stage>
  );

  const mediaStage = (
    <Stage project={project} href={stageHref} label={stageLabel}>
      <div className="relative p-5 sm:p-8 lg:p-10">
        <ScrollDepth amount={12}>
          <ProjectFrame
            kind="media"
            src={images[0]}
            alt={alt(0)}
            sizes="(max-width: 1023px) 92vw, 620px"
          />
        </ScrollDepth>
        <div className="relative mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-fg-2">
            iOS · Android
          </span>
          <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-fg-2">
            Google Play
          </span>
        </div>
      </div>
    </Stage>
  );

  const wideStage = (
    <Stage project={project} href={stageHref} label={stageLabel}>
      {/* The frame runs off the bottom of the stage, as if the product
          continues below the fold. */}
      <div className="relative -mb-[8%] px-4 pt-6 sm:px-10 sm:pt-12 lg:px-16 lg:pt-14">
        <ScrollDepth>
          <ProjectFrame
            kind="browser"
            src={images[0]}
            alt={alt(0)}
            domain={domain}
            ratio="1400 / 680"
            sizes="(max-width: 1023px) 92vw, 980px"
          />
        </ScrollDepth>
        {images[1] && (
          <ProjectFrame
            kind="browser"
            src={images[1]}
            alt={alt(1)}
            domain={domain}
            ratio="1400 / 582"
            sizes="360px"
            className="absolute bottom-[12%] right-6 z-10 hidden w-[36%] lg:block"
          />
        )}
        <Signal className="float-a left-6 top-4 sm:left-12 sm:top-8">
          <SignalStatus
            icon={<IconBolt size={13} />}
            title={v.run}
            status={<StatusChip tone="cyan">{v.executed}</StatusChip>}
          />
        </Signal>
      </div>
    </Stage>
  );

  const dashboardStage = (
    <Stage project={project} href={stageHref} label={stageLabel}>
      <div className="relative -mb-[6%] px-4 pt-6 sm:px-10 sm:pt-12 lg:px-10 lg:pt-16">
        {/* Two more screens behind the main one, set back and dimmed. */}
        {images[1] && (
          <ProjectFrame
            kind="browser"
            src={images[1]}
            alt={alt(1)}
            domain={domain}
            ratio="1400 / 695"
            sizes="440px"
            className="absolute left-4 top-24 z-0 hidden w-[40%] opacity-50 lg:block"
          />
        )}
        {images[2] && (
          <ProjectFrame
            kind="browser"
            src={images[2]}
            alt={alt(2)}
            domain={domain}
            ratio="1400 / 697"
            sizes="440px"
            className="absolute right-4 top-24 z-0 hidden w-[40%] opacity-50 lg:block"
          />
        )}
        <ScrollDepth className="relative z-10 mx-auto lg:w-[70%]">
          <ProjectFrame
            kind="browser"
            src={images[0]}
            alt={alt(0)}
            domain={domain}
            ratio="1400 / 677"
            sizes="(max-width: 1023px) 92vw, 760px"
          />
        </ScrollDepth>
        <Signal className="float-a left-6 top-6 sm:left-10 lg:left-[11%] lg:top-10">
          <SignalStatus
            icon={<IconUsers size={13} />}
            title="Zoho CRM"
            status={<StatusChip tone="cyan">{v.synced}</StatusChip>}
          />
        </Signal>
        <Signal className="float-b right-6 top-[46%] sm:right-10 lg:right-[10%]">
          <SignalMono top="sms · email" bottom="reminders" />
        </Signal>
      </div>
    </Stage>
  );

  // ---------------------------------------------------------------- layouts

  if (layout === "split-left" || layout === "split-right") {
    const visualLeft = layout === "split-left";
    const stage = kind === "phone" ? phoneStage : kind === "media" ? mediaStage : wideStage;
    return (
      <article
        className={`grid grid-cols-1 items-center gap-10 lg:gap-14 ${
          visualLeft ? "lg:grid-cols-[1.4fr_1fr]" : "lg:grid-cols-[1fr_1.4fr]"
        }`}
      >
        {/* On a phone the picture always comes first, whichever side it
            sits on at desktop width. */}
        <div className={visualLeft ? "" : "order-first lg:order-none lg:col-start-2"}>{stage}</div>
        <div className={visualLeft ? "" : "lg:col-start-1 lg:row-start-1"}>
          {heading}
          <div className="mt-6">{body}</div>
        </div>
      </article>
    );
  }

  if (layout === "wide") {
    return (
      <article>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>{heading}</div>
          <div>{body}</div>
        </div>
        <div className="mt-10">{wideStage}</div>
      </article>
    );
  }

  // dashboard
  return (
    <article>
      {dashboardStage}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>{heading}</div>
        <div>{body}</div>
      </div>
    </article>
  );
}

"use client";

import { m } from "motion/react";
import { brandIcons } from "@/data/brandIcons";
import { skillGroups, type SkillTile } from "@/data/skills";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IN_VIEW, STAGGER, fadeUp, itemUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";

/**
 * The stack, grouped by the part of the build each tool belongs to.
 *
 * Every tool is a named chip with its mark drawn in one neutral tone. On a
 * dark ground a wall of full-colour logos reads as noise, and the name is
 * what a reader is actually scanning for. There are no bars or
 * percentages: a skill level is not something a number can honestly carry.
 *
 * Tools whose owners have withdrawn their mark from simple-icons appear as
 * the name alone.
 *
 * It sits on the same ground as About directly above, so the two read as
 * one account: how the work runs, then what it is built with.
 */

function Chip({ tile }: { tile: SkillTile }) {
  const isWord = "word" in tile;
  const label = isWord ? tile.word : brandIcons[tile.icon].title;

  return (
    <m.li
      variants={itemUp}
      // The lift has to come from motion, not the .skill-tile:hover rule.
      // Once the reveal finishes motion leaves transform set inline, and an
      // inline style beats a stylesheet one, so the CSS lift never fired.
      // The rule stays as the pre-hydration fallback.
      whileHover={{ y: -2 }}
      className="skill-tile inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.025] px-2.5 py-1.5"
    >
      {!isWord && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0 text-fg-3"
        >
          <path d={brandIcons[tile.icon].path} />
        </svg>
      )}
      <span className="text-[12.5px] leading-none text-fg-2">{label}</span>
    </m.li>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative overflow-hidden bg-canvas-2 pb-24 pt-10 sm:pb-32 sm:pt-12">
      <BackgroundGlow preset="skills" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* A rule rather than a change of ground: this continues About. */}
        <div aria-hidden="true" className="rule-brand mb-20 opacity-50 sm:mb-24" />

        <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
          <SectionHeading index="03" eyebrow={t.skills.eyebrow} title={t.skills.title} intro={t.skills.intro} />
        </m.div>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={stagger(STAGGER.base, 0.1)}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <m.article
              key={group.key}
              variants={fadeUp}
              className="skill-card relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-card p-6 shadow-[var(--edge-top)]"
            >
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[1.05rem] font-bold text-fg">{t.skills[`${group.key}Title`]}</h3>
                  {group.focus && (
                    <span className="rounded-md border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)] px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent-hi">
                      {t.skills.coreFocus}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-fg-3">
                  {String(group.tiles.length).padStart(2, "0")}
                </span>
              </div>

              <m.ul variants={stagger(0.035)} className="relative mt-5 flex flex-wrap gap-2">
                {group.tiles.map((tile, i) => (
                  <Chip key={i} tile={tile} />
                ))}
              </m.ul>

              {/* Pinned to the foot, so every card in a row ends on the same
                  line however many tools it holds. */}
              <p className="relative mt-auto pt-6 text-[14px] leading-relaxed text-fg-2">
                {t.skills[`${group.key}Body`]}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

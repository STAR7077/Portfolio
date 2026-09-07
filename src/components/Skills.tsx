"use client";

import { brandIcons } from "@/data/brandIcons";
import { skillGroups, type SkillTile } from "@/data/skills";
import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * The stack as a bento of grouped cards, following the supplied reference:
 * a title, a wrapped grid of logo tiles and a line of copy, with the two
 * lead groups running double width.
 *
 * Marks are drawn from inlined simple-icons paths in their own brand
 * colours. Tools whose owners have withdrawn their mark appear as wordmark
 * tiles, which is what the reference does for NEXT.js and iOS.
 */

function Tile({ tile }: { tile: SkillTile }) {
  const isWord = "word" in tile;
  const label = isWord ? tile.word : brandIcons[tile.icon].title;

  return (
    <li
      className="skill-tile flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-white"
      title={label}
    >
      {isWord ? (
        <span
          className="px-1 text-center text-[11px] font-bold leading-none tracking-tight"
          style={{ color: tile.hex }}
        >
          {label}
        </span>
      ) : (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill={brandIcons[tile.icon].hex}
          role="img"
          aria-label={label}
        >
          <path d={brandIcons[tile.icon].path} />
        </svg>
      )}
    </li>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative overflow-hidden border-t border-[var(--border)] py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
          <p className="lead -mt-2 max-w-2xl text-[var(--muted)]">{t.skills.intro}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.key}
              delay={i * 70}
              className={`h-full ${group.wide ? "lg:col-span-2" : ""}`}
            >
              <article className="skill-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7">
                <div className="relative flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                    {t.skills[`${group.key}Title`]}
                  </h3>
                  {group.focus && (
                    <span className="rounded-full bg-[var(--accent-tint)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {t.skills.coreFocus}
                    </span>
                  )}
                </div>

                <ul className="relative mt-5 flex flex-wrap gap-2.5">
                  {group.tiles.map((tile, j) => (
                    <Tile key={j} tile={tile} />
                  ))}
                </ul>

                {/* The copy follows the tiles rather than being pushed to the
                    floor: groups hold very different numbers of tools, and
                    bottom-aligning opens a hole in the middle of the shorter
                    cards. Spare room collects at the foot instead, which is
                    what the reference does. */}
                <p className="relative mt-7 text-[14px] leading-relaxed text-[var(--muted)]">
                  {t.skills[`${group.key}Body`]}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

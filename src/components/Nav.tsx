"use client";

import { useSyncExternalStore } from "react";
import { m } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EASE_OUT } from "@/lib/motion";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * A floating glass bar that links every section directly, with no menu to
 * open: six destinations fit, and a hidden menu costs a tap for nothing.
 *
 * It starts nearly transparent over the hero, then firms up and tightens
 * once the page moves. The section in view is marked by a pill that slides
 * between links.
 *
 * Scroll state and the active section are read through
 * useSyncExternalStore: the browser owns the scroll position, and this
 * re-renders only when a derived value actually changes, not on every
 * scroll event.
 */

const IDS = ["services", "about", "skills", "work", "testimonials", "contact"] as const;
type SectionId = (typeof IDS)[number];

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

const readScrolled = () => window.scrollY > 24;

/**
 * The last section whose top has passed a line just under the middle of
 * the viewport. Contact is a special case on wide screens: it is fixed
 * behind the page and revealed as the page scrolls off it, so its position
 * is where the page itself ends, not where its own box sits.
 */
function readActive(): SectionId | null {
  const line = window.innerHeight * 0.45;
  let current: SectionId | null = null;
  for (const id of IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    let top = el.getBoundingClientRect().top;
    if (id === "contact") {
      const holder = el.closest(".reveal-footer");
      const stack = document.querySelector(".page-stack");
      if (holder && stack && getComputedStyle(holder).position === "fixed") {
        top = stack.getBoundingClientRect().bottom;
      }
    }
    if (top <= line) current = id;
  }
  return current;
}

export default function Nav() {
  const { t } = useLanguage();
  const scrolled = useSyncExternalStore(subscribe, readScrolled, () => false);
  const active = useSyncExternalStore(subscribe, readActive, () => null);

  const links: { id: SectionId; label: string }[] = [
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "work", label: t.nav.work },
    { id: "testimonials", label: t.nav.testimonials },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className={`nav-bar flex items-center justify-between gap-3 px-3 sm:px-4 ${scrolled ? "is-scrolled" : ""}`}>
          <a href="#top" className="flex shrink-0 items-center gap-2.5 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lucas.webp"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-white/15"
            />
            <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-fg">Lucas Marley</span>
          </a>

          <nav aria-label={t.nav.primaryLabel} className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => {
              const on = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-[13.5px] transition-colors duration-300 ${
                    on ? "text-fg" : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {on && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-inset ring-white/[0.06]"
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher />
            <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* The same destinations on their own line while the bar is too
            narrow to carry them. It scrolls sideways only on the smallest
            screens, where six labels genuinely do not fit. */}
        <nav
          aria-label={t.nav.primaryLabel}
          className={`nav-bar nav-rail mt-2 flex items-center justify-between gap-0 overflow-x-auto px-1.5 sm:px-3 lg:hidden ${
            scrolled ? "is-scrolled" : ""
          }`}
        >
          {links.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={on ? "true" : undefined}
                className={`relative shrink-0 rounded-md px-1.5 py-1 text-[12px] transition-colors duration-300 sm:px-2.5 sm:text-[13px] ${
                  on ? "text-fg" : "text-fg-2"
                }`}
              >
                {on && (
                  <m.span
                    layoutId="nav-active-rail"
                    className="absolute inset-0 rounded-md bg-white/[0.07]"
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

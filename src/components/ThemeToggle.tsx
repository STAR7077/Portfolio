"use client";

import { useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  readResolved,
  serverTheme,
  setTheme,
  subscribeTheme,
  type ResolvedTheme,
} from "@/lib/theme";

/**
 * Dark and light in one control.
 *
 * Both icons are always in the DOM and are crossfaded with opacity, scale
 * and a small rotation. Swapping which icon is mounted would make the
 * server and client markup differ on the first render, which is the usual
 * source of a hydration warning in a theme toggle. Here the markup is
 * identical in both themes and only a data attribute moves, so there is
 * nothing to mismatch and no mounted flag to wait for.
 *
 * The label carries the destination rather than the current state, so a
 * screen reader hears the action: "switch to light mode".
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const theme = useSyncExternalStore<ResolvedTheme>(
    subscribeTheme,
    readResolved,
    serverTheme
  );
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        track("theme_switched", { to: next });
      }}
      aria-label={next === "light" ? t.nav.themeToLight : t.nav.themeToDark}
      title={next === "light" ? t.nav.themeToLight : t.nav.themeToDark}
      data-theme-state={theme}
      className={
        "theme-toggle relative grid h-[34px] w-[34px] shrink-0 place-items-center " +
        "rounded-[10px] border border-line bg-fill-card text-fg-2 " +
        "transition-colors duration-300 hover:text-fg sm:h-[38px] sm:w-[38px] " +
        className
      }
    >
      {/* Sun: shown in light, since that is the state you are in. */}
      <svg
        className="theme-icon theme-icon-sun absolute"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6" />
      </svg>

      <svg
        className="theme-icon theme-icon-moon absolute"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}

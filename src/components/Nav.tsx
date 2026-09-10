"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * The header links every section directly. There is no overlay panel: with
 * six destinations there is nothing left for one to hold, and a menu that
 * has to be opened to find out what is behind it costs a click for no gain.
 *
 * The links sit inline from lg, where the row is wide enough for all six
 * beside the brand and the call to action. Below that they move to their own
 * line under the bar, which keeps them one tap away on a phone rather than
 * hidden behind a button.
 */
export default function Nav() {
  const { t } = useLanguage();

  // Page order, so the header reads the way the page does.
  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#work", label: t.nav.work },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-[var(--border)] bg-[var(--surface-veil)] px-4 py-2.5 shadow-[0_8px_30px_-16px_rgba(22,21,28,0.35)] backdrop-blur-xl sm:px-6">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 font-heading font-semibold text-[var(--foreground)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lucas.webp"
              alt="Lucas Marley"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-[var(--accent)]/25"
            />
            <span className="text-[15px]">Lucas Marley</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--accent)] grad-accent px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_28px_-10px_rgba(var(--accent-rgb),0.75)] transition-transform duration-500 hover:scale-[1.04] sm:inline-block"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* The same destinations on their own line while the bar above is too
            narrow to carry them. It scrolls sideways only on the smallest
            screens, where six labels genuinely do not fit. */}
        <nav className="nav-rail mt-2 flex items-center justify-between gap-2.5 overflow-x-auto rounded-full border border-[var(--border)] bg-[var(--surface-veil)] px-3.5 py-2.5 shadow-[0_8px_30px_-16px_rgba(22,21,28,0.35)] backdrop-blur-xl sm:gap-4 sm:px-5 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="shrink-0 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--accent)] sm:text-[13px]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

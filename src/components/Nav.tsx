"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLDivElement | null>(null);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: "ai", label: t.categories.ai },
    { key: "web", label: t.categories.web },
    { key: "mobile", label: t.categories.mobile },
  ];

  const countFor = (key: ProjectCategory) =>
    projects.filter((p) => p.categories.includes(key)).length;

  // Close on Escape or on a click outside the header shell.
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: MouseEvent) {
      if (shell.current && !shell.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div ref={shell} className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-[var(--border)] bg-[var(--surface-veil)] px-4 py-2.5 shadow-[0_8px_30px_-16px_rgba(22,21,28,0.35)] backdrop-blur-xl sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-heading font-semibold text-[var(--foreground)]"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lucas.jpg"
              alt="Lucas Marley"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-[var(--accent)]/25"
            />
            <span className="text-[15px]">Lucas Marley</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-label={open ? t.nav.closeMenu : t.nav.menu}
              className="flex h-9 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-3.5 text-[13px] font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
            >
              <span className="hidden sm:inline">{t.nav.menu}</span>
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span
                  className={`block h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_28px_-10px_rgba(109,40,217,0.75)] transition-transform duration-500 hover:scale-[1.04] sm:inline-block"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* Full-width overlay panel, the cerebrium mega-menu pattern. */}
        <div
          id="nav-panel"
          className={`mt-2 origin-top overflow-hidden rounded-3xl border border-[var(--border)] bg-white/95 shadow-[0_28px_70px_-30px_rgba(22,21,28,0.55)] backdrop-blur-xl transition-all duration-500 ${
            open
              ? "pointer-events-auto max-h-[560px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          aria-hidden={!open}
        >
          <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">
                {t.nav.browseWork}
              </p>
              <ul className="mt-4 space-y-1">
                {categories.map((c) => (
                  <li key={c.key}>
                    <a
                      href="#work"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[var(--foreground)] transition-colors hover:bg-[var(--accent-tint)]"
                    >
                      <span className="font-heading text-lg font-semibold">{c.label}</span>
                      <span className="font-mono text-xs text-[var(--faint)]">
                        {String(countFor(c.key)).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">
                {t.work.eyebrow}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-1">
                {projects.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <a
                      href="#work"
                      onClick={() => setOpen(false)}
                      className="flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-[var(--accent-tint)]"
                    >
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {p.title}
                      </span>
                      <span className="line-clamp-1 text-xs text-[var(--faint)]">
                        {p.tagline[locale]}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4 md:hidden">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-sm text-[var(--muted)]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

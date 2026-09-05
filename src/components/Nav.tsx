"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t } = useLanguage();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-[var(--border)] bg-[var(--surface-veil)] px-4 py-2.5 shadow-[0_8px_30px_-16px_rgba(22,21,28,0.35)] backdrop-blur-xl sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-heading font-semibold text-[var(--foreground)]"
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
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_28px_-10px_rgba(109,40,217,0.75)] transition-transform duration-500 hover:scale-[1.04] sm:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

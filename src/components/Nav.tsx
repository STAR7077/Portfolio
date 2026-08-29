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
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#07070f]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 font-heading font-semibold text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lucas.jpg"
            alt="Lucas Marley"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/20"
          />
          Lucas Marley
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden sm:inline-block rounded-full bg-violet-500/10 border border-violet-400/30 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/20 transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

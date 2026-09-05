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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 shadow-[inset_0_0_40px_rgba(139,92,246,0.10)] backdrop-blur-xl sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-heading font-semibold text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lucas.jpg"
            alt="Lucas Marley"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-violet-400/55"
          />
          <span className="text-[15px]">Lucas Marley</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 px-5 py-2.5 text-[13px] font-bold text-[#0b0b12] shadow-[0_8px_28px_rgba(139,92,246,0.45)] transition-transform duration-500 hover:scale-[1.04] sm:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Deliberately plain: the call to action above it does the work. */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-line bg-canvas py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[12px] text-fg-3">© {new Date().getFullYear()} Lucas Marley</span>
        <span className="text-[12.5px] text-fg-3">{t.footer.builtWith}</span>
        <a
          href="#top"
          className="font-mono text-[12px] text-fg-2 transition-colors duration-300 hover:text-fg"
        >
          {t.footer.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

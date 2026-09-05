"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--background)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-[var(--faint)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Lucas Marley</span>
        <span>{t.footer.builtWith}</span>
      </div>
    </footer>
  );
}

"use client";

import { locales, localeNames } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className="flex items-center gap-0.5 rounded-full border border-[var(--border)] p-1"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={localeNames[code].label}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors duration-300 ${
              active
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--faint)] hover:text-[var(--foreground)]"
            }`}
          >
            {localeNames[code].code}
          </button>
        );
      })}
    </div>
  );
}

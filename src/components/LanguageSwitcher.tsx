"use client";

import { locales, localeNames } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className="flex items-center gap-0.5 rounded-full border border-white/10 p-1"
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
                ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[#0b0b12]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {localeNames[code].code}
          </button>
        );
      })}
    </div>
  );
}

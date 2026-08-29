"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { htmlLang, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionary";
import { getServerSnapshot, getSnapshot, setStoredLocale, subscribe } from "./localeStore";

interface LanguageValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Dictionary for the active locale. */
  t: Dictionary;
}

export function useLanguage(): LanguageValue {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((next: Locale) => setStoredLocale(next), []);

  return { locale, setLocale, t: dictionaries[locale] };
}

/**
 * Keeps the document itself in step with the chosen language. Static metadata is emitted
 * at build time in the default language, so the tab title is re-applied here.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
    document.title = t.meta.title;
  }, [locale, t.meta.title]);

  return <>{children}</>;
}

export const locales = ["en", "pt", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** A string that exists in every supported language. */
export type Localized = Record<Locale, string>;

export const localeNames: Record<Locale, { code: string; label: string }> = {
  en: { code: "EN", label: "English" },
  pt: { code: "PT", label: "Português (BR)" },
  es: { code: "ES", label: "Español" },
};

/** What goes into <html lang> — more specific than our internal keys. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

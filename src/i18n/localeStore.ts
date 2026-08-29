import { defaultLocale, isLocale, type Locale } from "./config";

const STORAGE_KEY = "portfolio-locale";

/**
 * The selected language lives in localStorage, which is an external store rather than
 * React state, so it is exposed through the useSyncExternalStore contract. That lets the
 * prerendered HTML stay in the default language while the client immediately renders the
 * visitor's own choice, with no cascading effect-driven re-render.
 */

let cached: Locale | null = null;
const listeners = new Set<() => void>();

function resolve(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Private mode or blocked storage, so fall through to the browser's language.
  }

  const browser = navigator.language?.toLowerCase() ?? "";
  if (browser.startsWith("pt")) return "pt";
  if (browser.startsWith("es")) return "es";
  return defaultLocale;
}

function notify() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep other tabs of the site in sync when the language changes in one of them.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cached = isLocale(e.newValue) ? e.newValue : null;
    notify();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Must stay referentially stable between renders, so the resolved value is cached. */
export function getSnapshot(): Locale {
  if (cached === null) cached = resolve();
  return cached;
}

/** The prerendered HTML is built in the default language. */
export function getServerSnapshot(): Locale {
  return defaultLocale;
}

export function setStoredLocale(next: Locale) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not being able to remember the choice is not worth breaking the switch over.
  }
  notify();
}

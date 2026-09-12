/**
 * The theme store.
 *
 * Three states are kept: "system", "dark" and "light". Only the resolved
 * value ("dark" or "light") reaches the document, as data-theme on <html>.
 *
 * There is no context and no provider state. The document element is the
 * single source of truth and useSyncExternalStore reads it, which is the
 * same pattern the scroll position, the active section and the Work filter
 * already use here. It also means the value a component reads on its first
 * client render is whatever the blocking script in <head> already applied,
 * so there is nothing to reconcile.
 */

export type ThemeChoice = "system" | "dark" | "light";
export type ResolvedTheme = "dark" | "light";

export const THEME_KEY = "theme";

/** Emitted when the choice changes, so every subscriber re-reads at once. */
const EVENT = "themechange";

const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function subscribeTheme(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener(EVENT, onChange);
  // A visitor on "system" should follow the OS while the tab is open.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readChoice() === "system") {
      applyResolved(systemTheme());
      onChange();
    }
  };
  mq.addEventListener("change", onSystem);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener(EVENT, onChange);
    mq.removeEventListener("change", onSystem);
  };
}

export function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** What the visitor chose, or "system" if they never did. */
export function readChoice(): ThemeChoice {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "dark" || v === "light" || v === "system") return v;
  } catch {
    // Private browsing and blocked storage both throw; "system" is fine.
  }
  return "system";
}

/** What is actually on screen, read from the element the script stamped. */
export function readResolved(): ResolvedTheme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** The server has no document, so it renders the dark default. */
export function serverTheme(): ResolvedTheme {
  return "dark";
}

function applyResolved(next: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  // Mobile browsers paint their chrome from this, so it has to move too.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", next === "light" ? "#f8f9fc" : "#080a0f");
  }
}

export function setTheme(choice: ThemeChoice) {
  try {
    if (choice === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Storage is optional; the theme still applies for this page view.
  }
  applyResolved(choice === "system" ? systemTheme() : choice);
  emit();
}

/**
 * Runs before the first paint, inlined into <head>.
 *
 * Kept as a string rather than a component so it stays one statement with
 * no imports and no hydration surface. It must not throw: a visitor with
 * storage blocked still needs a themed page, so every read is guarded and
 * the fallback is the dark default already on :root.
 */
export const THEME_SCRIPT = `(function(){try{var c=localStorage.getItem("${THEME_KEY}");var t=(c==="dark"||c==="light")?c:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

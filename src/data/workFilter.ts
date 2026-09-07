import type { ProjectCategory } from "./projects";

/**
 * The Work section's category filter, kept in the URL hash so a single
 * category can be linked to directly: #work/ai, #work/web, #work/mobile.
 *
 * Like the language, the filter is an external store rather than React
 * state. The hash is owned by the browser and can change without React
 * knowing (back button, a pasted link, an anchor click), so reading it
 * through useSyncExternalStore keeps the section honest about it without
 * an effect that re-renders after paint.
 */

export type WorkFilter = ProjectCategory | "all";

/**
 * Separators and spellings people actually type. "ai_automation" mirrors
 * the visible label, and the singular/plural app forms cover guesses.
 */
const ALIASES: Record<string, WorkFilter> = {
  "": "all",
  all: "all",
  ai: "ai",
  ai_automation: "ai",
  "ai-automation": "ai",
  aiautomation: "ai",
  automation: "ai",
  web: "web",
  website: "web",
  mobile: "mobile",
  app: "mobile",
  apps: "mobile",
};

/** The canonical link for a category, which is what gets written back. */
export function workHash(filter: WorkFilter): string {
  return filter === "all" ? "#work" : `#work/${filter}`;
}

/**
 * Reads a category out of a hash, or null when the hash is not about
 * Work at all. Accepts "#work/web", "#work_web" and "#work-web" alike,
 * so a link that reached someone in any of those shapes still lands.
 */
export function parseWorkHash(hash: string): WorkFilter | null {
  const raw = hash.replace(/^#/, "").toLowerCase();
  if (!raw.startsWith("work")) return null;

  // Whatever follows "work", minus the separator someone chose to use.
  const rest = raw.slice(4).replace(/^[/_.-]/, "");
  return ALIASES[rest] ?? null;
}

let cached: WorkFilter | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function onHashChange() {
  const parsed = parseWorkHash(window.location.hash);
  // Only a Work hash moves the filter. Scrolling off to #contact should
  // not quietly throw away the category someone picked.
  if (parsed === null || parsed === cached) return;
  cached = parsed;
  notify();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("hashchange", onHashChange);
  window.addEventListener("popstate", onHashChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", onHashChange);
    window.removeEventListener("popstate", onHashChange);
  };
}

/** Must stay referentially stable between renders, so it is cached. */
export function getSnapshot(): WorkFilter {
  if (cached === null) cached = parseWorkHash(window.location.hash) ?? "all";
  return cached;
}

/** The prerendered HTML has no hash to read, so it shows everything. */
export function getServerSnapshot(): WorkFilter {
  return "all";
}

/**
 * Points the URL at a category without adding a history entry, so a
 * visitor trying each filter in turn does not have to press back once
 * per click to leave the page.
 */
export function setWorkFilter(next: WorkFilter) {
  cached = next;
  const hash = workHash(next);
  if (window.location.hash !== hash) {
    window.history.replaceState(null, "", hash);
  }
  notify();
}

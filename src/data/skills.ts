import type { BrandKey } from "./brandIcons";

/**
 * The stack, grouped the way the supplied reference groups it: a card per
 * area, each holding the marks for the tools used in it.
 *
 * A few brands have been withdrawn from simple-icons at their owners'
 * request, so those are wordmark tiles instead. The reference does the same
 * for NEXT.js and iOS, so the mix is deliberate rather than a shortfall.
 */

export type SkillTile = { icon: BrandKey } | { word: string; hex: string };

export interface SkillGroup {
  /** Matches the dictionary keys, so the copy stays translatable. */
  key: "backend" | "frontend" | "ai" | "business" | "mobile" | "cloud";
  /** The two lead groups run double width, as in the reference. */
  wide?: boolean;
  tiles: SkillTile[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: "backend",
    wide: true,
    tiles: [
      { icon: "nodedotjs" },
      { icon: "python" },
      { icon: "django" },
      { icon: "typescript" },
      { icon: "postgresql" },
      { icon: "redis" },
      { icon: "celery" },
      { icon: "docker" },
    ],
  },
  {
    key: "frontend",
    tiles: [
      { icon: "react" },
      { icon: "nextdotjs" },
      { icon: "typescript" },
      { icon: "tailwindcss" },
    ],
  },
  {
    key: "ai",
    tiles: [
      { word: "OpenAI", hex: "#0F0F0F" },
      { icon: "claude" },
      { icon: "googlegemini" },
      { icon: "n8n" },
    ],
  },
  {
    key: "business",
    wide: true,
    tiles: [
      { icon: "odoo" },
      { word: "Bubble", hex: "#0034FF" },
      { icon: "figma" },
      { icon: "jira" },
      { icon: "notion" },
      { icon: "github" },
    ],
  },
  {
    key: "mobile",
    tiles: [
      { icon: "react" },
      { icon: "flutter" },
      { icon: "android" },
      { word: "iOS", hex: "#0F0F0F" },
    ],
  },
  {
    key: "cloud",
    tiles: [
      { word: "AWS", hex: "#FF9900" },
      { icon: "googlecloud" },
      { icon: "vercel" },
      { icon: "supabase" },
      { icon: "airtable" },
    ],
  },
];

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
  /**
   * Twelfths of the row. Chosen so every group's tiles wrap onto exactly
   * two lines: a group holding more tools gets a wider card rather than a
   * taller one, which is what keeps the rows level.
   */
  span: 3 | 4 | 5;
  /** Marks the specialism, which earns a pill beside the title. */
  focus?: boolean;
  tiles: SkillTile[];
}

/**
 * Backend leads, then frontend and agents, with mobile opening the second
 * row. Widths follow the number of tools in each group, so the first row
 * steps 3, 4, 5 across and the second, holding three similar groups, runs
 * even at 4, 4, 4. Both rows total twelve.
 *
 * No group is marked `focus` at the moment. Adding it back is a one-line
 * change if a specialism should be called out.
 */
export const skillGroups: SkillGroup[] = [
  {
    key: "backend",
    span: 3,
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
    span: 4,
    tiles: [
      { icon: "react" },
      { icon: "nextdotjs" },
      { icon: "typescript" },
      { icon: "javascript" },
      { icon: "html5" },
      { icon: "tailwindcss" },
      { icon: "sass" },
      { icon: "reactquery" },
      { icon: "threedotjs" },
    ],
  },
  {
    key: "ai",
    span: 5,
    tiles: [
      { word: "OpenAI", hex: "#0F0F0F" },
      { icon: "claude" },
      { icon: "googlegemini" },
      { icon: "langchain" },
      { icon: "langgraph" },
      { icon: "huggingface" },
      { icon: "ollama" },
      { icon: "qdrant" },
      { icon: "n8n" },
      { icon: "whatsapp" },
      { icon: "airtable" },
    ],
  },
  {
    key: "mobile",
    span: 4,
    tiles: [
      { icon: "react" },
      { icon: "flutter" },
      { icon: "dart" },
      { icon: "expo" },
      { icon: "android" },
      { word: "iOS", hex: "#0F0F0F" },
      { icon: "firebase" },
    ],
  },
  {
    key: "cloud",
    span: 4,
    tiles: [
      { word: "AWS", hex: "#FF9900" },
      { word: "Azure", hex: "#0078D4" },
      { icon: "googlecloud" },
      { icon: "firebase" },
      { icon: "supabase" },
      { icon: "vercel" },
    ],
  },
  {
    key: "business",
    span: 4,
    tiles: [
      { icon: "odoo" },
      { word: "Bubble", hex: "#0034FF" },
      { icon: "figma" },
      { icon: "jira" },
      { icon: "notion" },
      { icon: "github" },
    ],
  },
];

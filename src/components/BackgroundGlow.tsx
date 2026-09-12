/**
 * Soft light behind a section: stacked radial gradients, optionally with the
 * faint engineering grid or dot field on top.
 *
 * Every glow is a gradient on one layer, never a blurred box. A gradient is
 * painted once; a filter blur is recomputed whenever its layer changes. The
 * optional drift moves the whole layer by a few percent with a transform,
 * which the compositor handles without repainting.
 *
 * Presets rather than free-form props, so each section's light is defined
 * in one place and the page keeps a consistent temperature.
 */

type Rgb = "accent" | "blue" | "cyan";

interface Light {
  /** Centre of the light, as a CSS position inside the section. */
  at: string;
  /** Radius in pixels. */
  size: number;
  color: Rgb;
  /** Peak opacity at the centre. */
  alpha: number;
  /** Where the light has fully faded, as a percentage of its radius. */
  fade?: number;
}

const RGB: Record<Rgb, string> = {
  accent: "var(--accent-rgb)",
  blue: "var(--accent-blue-rgb)",
  cyan: "var(--accent-cyan-rgb)",
};

const PRESETS = {
  // The strongest light on the page: violet top-left, a cool trace opposite.
  hero: [
    { at: "18% 8%", size: 820, color: "accent", alpha: 0.16, fade: 45 },
    { at: "86% 58%", size: 720, color: "cyan", alpha: 0.065, fade: 50 },
    { at: "60% 110%", size: 600, color: "blue", alpha: 0.05, fade: 50 },
  ],
  // A single low wash that carries the hero's light into the next section.
  services: [
    { at: "8% 0%", size: 700, color: "accent", alpha: 0.07, fade: 50 },
    { at: "100% 70%", size: 620, color: "blue", alpha: 0.04, fade: 50 },
  ],
  about: [
    { at: "0% 30%", size: 760, color: "accent", alpha: 0.08, fade: 50 },
    { at: "100% 0%", size: 540, color: "cyan", alpha: 0.035, fade: 50 },
  ],
  skills: [
    { at: "95% 20%", size: 700, color: "blue", alpha: 0.05, fade: 50 },
  ],
  work: [
    { at: "50% 0%", size: 980, color: "accent", alpha: 0.1, fade: 48 },
    { at: "0% 80%", size: 620, color: "cyan", alpha: 0.04, fade: 50 },
  ],
  reach: [
    { at: "78% 45%", size: 700, color: "blue", alpha: 0.07, fade: 50 },
  ],
  testimonials: [
    { at: "50% 35%", size: 820, color: "accent", alpha: 0.085, fade: 50 },
  ],
  // The closing call to action gets the largest, warmest light.
  cta: [
    { at: "50% 30%", size: 1000, color: "accent", alpha: 0.22, fade: 50 },
    { at: "20% 90%", size: 700, color: "blue", alpha: 0.08, fade: 50 },
    { at: "85% 80%", size: 600, color: "cyan", alpha: 0.06, fade: 50 },
  ],
} satisfies Record<string, Light[]>;

export type GlowPreset = keyof typeof PRESETS;

interface BackgroundGlowProps {
  preset: GlowPreset;
  /** The faint grid, faded out towards the edges. */
  grid?: boolean;
  /** A dot field, for sections that want texture without lines. */
  dots?: boolean;
  /** A very slow drift of the light itself. Off by default. */
  drift?: boolean;
  className?: string;
}

/**
 * Each light's alpha is multiplied by --glow-scale, which the light theme
 * turns down. The same violet that reads as depth on near-black reads as a
 * stain on off-white, and the multiply keeps one set of presets rather than
 * a second table of numbers to keep in step.
 */
function gradient(lights: Light[]) {
  return lights
    .map(
      (l) =>
        `radial-gradient(${l.size}px circle at ${l.at}, rgba(${RGB[l.color]}, calc(${l.alpha} * var(--glow-scale))), transparent ${l.fade ?? 50}%)`
    )
    .join(", ");
}

export default function BackgroundGlow({
  preset,
  grid = false,
  dots = false,
  drift = false,
  className = "",
}: BackgroundGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Oversized so a drifting layer never shows its own edge. */}
      <div
        className={`absolute -inset-[8%] ${drift ? "glow-drift" : ""}`}
        style={{ backgroundImage: gradient(PRESETS[preset]) }}
      />
      {grid && <div className="bg-grid absolute inset-0" />}
      {dots && <div className="bg-dots absolute inset-0" />}
    </div>
  );
}

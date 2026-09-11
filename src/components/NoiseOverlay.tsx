/**
 * Monochrome grain across the whole page, drawn by the .noise rule in
 * globals.css. One static tile held on its own layer: it adds texture to
 * every dark surface without costing anything while the page scrolls.
 */
export default function NoiseOverlay() {
  return <div className="noise" aria-hidden="true" />;
}

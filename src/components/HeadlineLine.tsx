"use client";

/**
 * Renders one headline line, drawing a hand-marker underline beneath any
 * word the copy wraps in [square brackets].
 *
 * Keeping the emphasis in the string means each translation decides which
 * of its own words carry a stroke, rather than the component guessing by
 * position.
 */

/** Three strokes, so repeated underlines do not look stamped. */
const STROKES = [
  // Long, doubling back on itself.
  "M4 7.4C70 1.9 165 2.4 236 6.4 175 11.4 85 11.9 6 9.4",
  // Short and thin, a single pass.
  "M5 8.6C62 4.2 168 4.6 236 7.9",
  // Long with a lifted tail.
  "M3 8.2C74 2.8 158 3.2 235 6.1 168 10.6 92 11.2 12 9.6",
];

const isMark = (s: string) => s.startsWith("[") && s.endsWith("]");

export default function HeadlineLine({ text, seed = 0 }: { text: string; seed?: number }) {
  // Split on the bracketed runs, keeping them, and give each marked word
  // its position among the marked words without mutating a counter.
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  const segments = parts.map((part, i) => ({
    part,
    marked: isMark(part),
    order: isMark(part) ? parts.slice(0, i).filter(isMark).length : -1,
  }));

  return (
    <>
      {segments.map(({ part, marked, order }, i) => {
        if (!marked) return <span key={i}>{part}</span>;

        const word = part.slice(1, -1);
        const stroke = STROKES[(seed + order) % STROKES.length];
        const delay = 520 + order * 160;

        return (
          <span key={i} className="relative inline-block">
            {word}
            <svg
              className="underline-stroke pointer-events-none absolute left-0 top-[92%] w-full"
              style={{ animationDelay: `${delay}ms` }}
              viewBox="0 0 240 14"
              height="0.24em"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={stroke}
                stroke="#F04438"
                strokeWidth="3.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
        );
      })}
    </>
  );
}

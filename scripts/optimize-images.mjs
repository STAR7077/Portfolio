/**
 * Shrinks and re-encodes everything in public/ to WebP.
 *
 * The site shipped 6.5MB of images to a phone, 99.7% of the page weight, and
 * one project screenshot alone was 3.6MB. Nothing here was ever displayed at
 * anything like its natural size: the widest a project image is drawn is
 * about 550 CSS pixels.
 *
 * Run with `node scripts/optimize-images.mjs`. It converts in place, deletes
 * the original, and leaves the base name alone, so a reference only changes
 * its extension. Already-converted files are skipped, so it is safe to
 * re-run after adding new artwork.
 */

import { readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.join(process.cwd(), "public");

/** Widest each kind is ever drawn, doubled for dense screens. */
const RULES = [
  { dir: "projects", width: 1400, quality: 72 },
  { dir: "testimonials", width: 200, quality: 78 },
  // Decoration, never drawn near this size, and smooth enough that a lower
  // quality costs nothing visible.
  { dir: "hero", width: 900, quality: 72 },
  { dir: ".", width: 400, quality: 80, only: ["lucas.jpg", "lucas.webp"] },
];

/** Webp is included so an already-converted file can still be shrunk. */
const CONVERTIBLE = /\.(png|jpe?g|webp)$/i;

async function convert(file, width, quality) {
  const out = file.replace(CONVERTIBLE, ".webp");
  const inPlace = out === file;

  const before = (await stat(file)).size;
  // Read into memory rather than handing sharp the path: when the output is
  // the same file, sharp still has the source open and Windows refuses the
  // write outright.
  const image = sharp(await readFile(file));
  const meta = await image.metadata();

  // A webp already within its budget is left alone, which is what makes
  // re-running this safe and quick.
  if (inPlace && (meta.width ?? 0) <= width) return null;

  const buf = await image
    // `inside` never enlarges and never crops, so a picture keeps every
    // pixel of its subject, just fewer of them.
    .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toBuffer();

  // Sharp cannot read and write the same path in one pass.
  if (inPlace) await writeFile(file, buf);
  else {
    await writeFile(out, buf);
    await unlink(file);
  }

  const after = (await stat(out)).size;
  return { file: path.basename(file), before, after, from: `${meta.width}x${meta.height}` };
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const rule of RULES) {
  const dir = path.join(PUBLIC, rule.dir);
  if (!existsSync(dir)) continue;
  const names = (await readdir(dir)).filter((n) => CONVERTIBLE.test(n));
  for (const name of names) {
    if (rule.only && !rule.only.includes(name)) continue;
    const res = await convert(path.join(dir, name), rule.width, rule.quality);
    if (!res) continue;
    totalBefore += res.before;
    totalAfter += res.after;
    rows.push(res);
  }
}

rows.sort((a, b) => b.before - a.before);
for (const r of rows.slice(0, 8)) {
  console.log(`  ${kb(r.before).padStart(7)} -> ${kb(r.after).padStart(6)}  ${r.from.padEnd(11)} ${r.file}`);
}
console.log(
  rows.length
    ? `\n${rows.length} images: ${kb(totalBefore)} -> ${kb(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`
    : "nothing left to convert"
);

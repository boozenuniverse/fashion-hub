/**
 * Creates a 480px-wide variant (name-480.webp) next to every .webp under public/images, used for
 * srcset on product cards and category tiles. Run after adding or replacing real photos:
 *   npm run images:optimize
 * Originals are never modified. Existing variants are rebuilt.
 */
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const SMALL = 480;
const root = join(process.cwd(), "public/images");

const walk = (dir: string): string[] => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });

export async function makeVariants(): Promise<number> {
  const dirs = ["products", "categories", "collections", "journal"].map((d) => join(root, d) + "/");
  const originals = walk(root).filter((f) => f.endsWith(".webp") && !new RegExp(`-${SMALL}\\.webp$`).test(f) && dirs.some((d) => f.startsWith(d)));
  let made = 0;
  for (const file of originals) {
    const meta = await sharp(file).metadata();
    if (!meta.width || meta.width <= SMALL) continue;
    await sharp(file).resize({ width: SMALL }).webp({ quality: 78 }).toFile(file.replace(/\.webp$/, `-${SMALL}.webp`));
    made++;
  }
  return made;
}

if (require.main === module) {
  makeVariants().then((n) => console.log(`Created ${n} ${SMALL}px variants.`)).catch((e) => { console.error(e); process.exit(1); });
}

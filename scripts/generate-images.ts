/**
 * Generates on-brand SAMPLE artwork (WebP) for every image referenced by the data files.
 * No stock or copyrighted photography is used. Replace these files with real photography at the
 * same paths (or update the paths in data/*.ts). Run: npm run images
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { collections } from "../data/collections";
import { articles } from "../data/journal";
import { swatchFor, luminance } from "../data/colours";
import { isPhotoPath } from "../data/photos";
import { makeVariants } from "./optimize-images";
import { silhouettes } from "../data/silhouettes";

const PUBLIC = join(process.cwd(), "public");

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  return "#" + [n >> 16, (n >> 8) & 255, n & 255].map((c) => f(c).toString(16).padStart(2, "0")).join("");
}


interface SceneOpts { w: number; h: number; cat: string; tint: string; dark: boolean; zoom?: number; dx?: number; dy?: number; cx?: number; cy?: number; label?: boolean }

function scene(o: SceneOpts): string {
  const { w, h, cat, tint, dark } = o;
  const zoom = o.zoom ?? 1;
  const s = (h / 800) * zoom * (w / h < 0.9 ? Math.min(1, (w / h) / 0.75) : 1);
  const cx = (o.cx ?? w / 2) + (o.dx ?? 0);
  const cy = (o.cy ?? h / 2) + (o.dy ?? 0);
  const bg = dark ? ["#531C22", "#220707"] : ["#F9F3ED", "#E7D8CA"];
  const archFill = dark ? "#E7D8CA" : "#FFFBF7";
  const archOpacity = dark ? 0.14 : 0.75;
  const stroke = dark ? "rgba(249,243,237,.30)" : "rgba(34,7,7,.30)";
  const subjectLight = shade(tint, 0.12);
  const subjectDark = shade(tint, -0.18);
  const gold = "#AC9185";
  const subject = (silhouettes[cat] ?? silhouettes["womens-fashion"])(gold);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
<linearGradient id="sub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${subjectLight}"/><stop offset="1" stop-color="${subjectDark}"/></linearGradient>
<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${gold}" stop-opacity="${dark ? 0.5 : 0.45}"/><stop offset="1" stop-color="${gold}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<g transform="translate(${cx - 300 * s} ${cy - 400 * s}) scale(${s})">
<path d="M110 720 V290 A190 190 0 0 1 490 290 V720 Z" fill="${archFill}" opacity="${archOpacity}"/>
<path d="M92 720 V290 A208 208 0 0 1 508 290 V720" fill="none" stroke="${gold}" stroke-width="2" opacity=".6"/>
<circle cx="300" cy="330" r="210" fill="url(#sun)"/>
<ellipse cx="300" cy="724" rx="200" ry="14" fill="#220707" opacity="${dark ? 0.45 : 0.16}"/>
<g fill="url(#sub)" stroke="${stroke}" stroke-width="2" stroke-linejoin="round">${subject}</g>
</g>
${o.label === false ? "" : `<text x="${w / 2}" y="${h - h * 0.035}" font-family="DejaVu Serif, Georgia, serif" font-style="italic" font-size="${Math.max(12, h * 0.02)}" text-anchor="middle" fill="${dark ? "#E7D8CA" : "#220707"}" opacity=".55">Sample image</text>`}
</svg>`;
}

async function write(rel: string, svg: string, png = false) {
  const file = join(PUBLIC, rel);
  mkdirSync(dirname(file), { recursive: true });
  const img = sharp(Buffer.from(svg));
  if (png) await img.png().toFile(file);
  else await img.webp({ quality: 80 }).toFile(file);
}

const tintOf = (p: (typeof products)[number]): string => {
  const opt = p.options.find((o) => o.id === "colour") ?? p.options.find((o) => o.id === "shade") ?? p.options.find((o) => o.kind === "swatch");
  return opt?.values[0]?.swatch ?? swatchFor(opt?.values[0]?.value ?? "Champagne");
};

async function og() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#220707"/><path d="M820 630 V250 A180 180 0 0 1 1180 250 V630" fill="#531C22"/><path d="M800 630 V250 A200 200 0 0 1 1200 250 V630" fill="none" stroke="#AC9185" stroke-width="2"/><text x="80" y="300" font-family="DejaVu Serif, Georgia, serif" font-size="72" letter-spacing="10" fill="#F9F3ED">FASHION HUB</text><rect x="80" y="330" width="120" height="2" fill="#AC9185"/><text x="80" y="390" font-family="DejaVu Serif, Georgia, serif" font-style="italic" font-size="32" fill="#E7D8CA">Elegance Is An Everyday Affair.</text></svg>`;
  await write("images/brand/og.png", svg, true);
}

const CAT_DARK: Record<string, boolean> = { "womens-fashion": true, "mens-fashion": true, "clothing-fabrics": false, shoes: false, handbags: true, jewellery: true, watches: false, "hair-wigs": false, makeup: true, "makeup-kits": true, "beauty-skincare": true, accessories: false };

async function main() {
  const jobs: Promise<void>[] = [og()];
  for (const p of products) {
    if (!p.sample) continue; // never overwrite real product photography
    const tint = tintOf(p);
    const darkFirst = luminance(tint) >= 0.18;
    p.images.forEach((img, i) => {
      if (isPhotoPath(img.src)) return; // photographs are never overwritten
      jobs.push(write(img.src.replace(/^\//, ""), scene({ w: 900, h: 1200, cat: p.categoryId, tint, dark: i === 0 ? darkFirst : !darkFirst, zoom: i === 0 ? 1 : 1.3, dy: i === 0 ? 0 : -50 })));
    });
  }
  for (const c of categories) if (!isPhotoPath(c.image)) jobs.push(write(c.image.replace(/^\//, ""), scene({ w: 800, h: 1000, cat: c.id, tint: CAT_DARK[c.id] ? "#E7D8CA" : "#531C22", dark: CAT_DARK[c.id] })));
  const colCat: Record<string, string> = { "signature-collection": "womens-fashion", "everyday-elegance": "handbags", "evening-edit": "shoes", "modern-classics": "watches", "beauty-collection": "hair-wigs", "luxury-accessories": "jewellery" };
  for (const c of collections) jobs.push(write(c.image.replace(/^\//, ""), scene({ w: 960, h: 1200, cat: colCat[c.id], tint: CAT_DARK[colCat[c.id]] ? "#E7D8CA" : "#531C22", dark: CAT_DARK[colCat[c.id]] })));
  const artCat: Record<string, string> = { "building-an-evening-wardrobe": "womens-fashion", "choosing-the-right-lace-front-wig": "hair-wigs", "a-simple-everyday-makeup-routine": "makeup", "the-jewellery-layering-guide": "jewellery", "a-guide-to-fabrics-for-occasion-wear": "clothing-fabrics", "dressing-well-in-the-heat": "mens-fashion" };
  articles.forEach((a, i) => jobs.push(write(a.image.replace(/^\//, ""), scene({ w: 1280, h: 720, cat: artCat[a.slug], tint: i % 2 === 0 ? "#E7D8CA" : "#531C22", dark: i % 2 === 0, zoom: 0.95 }))));
  await Promise.all(jobs);
  const variants = await makeVariants();
  console.log(`Generated ${jobs.length} sample images and ${variants} small variants in public/images`);
}

main().catch((e) => { console.error(e); process.exit(1); });

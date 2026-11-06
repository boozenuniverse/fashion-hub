import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { articles } from "@/data/journal";
import { navItems } from "@/data/navigation";
import { homepage } from "@/data/homepage";
import { heroSlides } from "@/data/hero";
import { smallVariant } from "@/lib/images";

describe("catalogue data", () => {
  it("has unique ids and slugs", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });
  it("covers every department with at least three products", () => {
    for (const c of categories) expect(products.filter((p) => p.categoryId === c.id).length >= 3).toBe(true);
  });
  it("references valid categories, subcategories and collections", () => {
    for (const p of products) {
      const c = categories.find((x) => x.id === p.categoryId);
      expect(Boolean(c)).toBe(true);
      expect(Boolean(c!.subcategories.find((s) => s.id === p.subcategoryId))).toBe(true);
      for (const id of p.collectionIds) expect(Boolean(collections.find((x) => x.id === id))).toBe(true);
    }
  });
  it("uses GHS and marks every product as sample content", () => {
    for (const p of products) { expect(p.currency).toBe("GHS"); expect(p.sample).toBe(true); expect(p.price > 0).toBe(true); }
  });
  it("has category-specific attributes and required options", () => {
    const wig = products.find((p) => p.categoryId === "hair-wigs")!;
    expect(wig.options.map((o) => o.id)).toContain("length");
    const watch = products.find((p) => p.categoryId === "watches")!;
    expect(Object.keys(watch.attributes)).toContain("Movement");
    const shoe = products.find((p) => p.categoryId === "shoes")!;
    expect(Object.keys(shoe.attributes)).toContain("Heel height");
  });
  it("only compares to a higher previous price", () => {
    for (const p of products) if (p.compareAtPrice !== undefined) expect(p.compareAtPrice > p.price).toBe(true);
  });
  it("landing content references real products and existing images", () => {
    for (const it of homepage.newArrivals.items) expect(Boolean(products.find((p) => p.slug === it.slug))).toBe(true);
    for (const t of homepage.categoryTiles) expect(Boolean(categories.find((c) => c.slug === t.slug))).toBe(true);
    for (const c of homepage.featuredCollections) expect(Boolean(collections.find((x) => x.slug === c.slug))).toBe(true);
    const imgs = [...homepage.categoryTiles.map((t) => t.image), ...homepage.newArrivals.items.flatMap((i) => [i.image, i.wide].filter(Boolean) as string[]), homepage.signature.desktopImage, homepage.signature.mobileImage, ...homepage.featuredCollections.map((c) => c.image), ...heroSlides.flatMap((s) => [s.desktop.image, s.mobile.image])];
    for (const src of imgs) expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
  });
  it("journal articles reference real products", () => {
    for (const a of articles) for (const s of a.relatedProductSlugs) expect(Boolean(products.find((p) => p.slug === s))).toBe(true);
  });
  it("navigation links point at real categories/collections", () => {
    const links = navItems.flatMap((n) => [n.href, ...(n.mega?.columns.flatMap((c) => c.links.map((l) => l.href)) ?? [])]);
    for (const href of links) {
      const m = /^\/(categories|collections)\/([^/?]+)\//.exec(href);
      if (!m) continue;
      const list = m[1] === "categories" ? categories.map((c) => c.slug) : collections.map((c) => c.slug);
      expect(list).toContain(m[2]);
    }
  });
  it("image files exist on disk once generated (npm run images)", () => {
    if (!existsSync(join(process.cwd(), "public/images/categories/women.webp"))) return;
    const refs = [...products.flatMap((p) => p.images.map((i) => i.src)), ...categories.map((c) => c.image), ...collections.map((c) => c.image), ...articles.map((a) => a.image)];
    for (const src of refs) expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    // Small srcset variants (npm run images:optimize) must exist for every .webp that offers one.
    for (const p of products) for (const img of p.images) if ((img.width ?? 0) > 480) expect(existsSync(join(process.cwd(), "public", smallVariant(img.src)))).toBe(true);
  });
});

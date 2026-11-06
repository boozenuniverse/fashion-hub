import type { Availability, OptionValue, Product, ProductOption } from "@/types/product";
import { categories } from "./categories";
import { swatchFor } from "./colours";

/**
 * Compact product seed + builder. Every product here is SAMPLE catalogue content.
 * To replace it with real merchandise, edit data/products.ts (or build Product objects directly).
 */
export interface Seed {
  name: string;
  cat: string;
  sub: string;
  price: number;
  was?: number;
  brand: string;
  d: string; // description (first sentence doubles as the short description)
  colours?: string[];
  sizes?: string[];
  sizeLabel?: string;
  extra?: ProductOption[];
  attrs: Record<string, string | number | boolean>;
  flags?: ("featured" | "new" | "trending")[];
  collections?: string[];
  avail?: Availability;
  tags?: string[];
  /** Defaults to true (demonstration content). Imported real products set this to false. */
  sample?: boolean;
  /** Image paths (root-relative). Defaults to /images/products/<group>/<slug>-1.webp, -2.webp. */
  images?: string[];
  /** [width, height] of `images` (defaults to 900x1200, the generated sample size). */
  imageSize?: [number, number];
  rating?: { value: number; count: number };
}

export const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
export const MEN_SIZES = ["S", "M", "L", "XL", "XXL"];
export const SUIT_SIZES = ["46", "48", "50", "52"];
export const WOMEN_SHOE_SIZES = ["36", "37", "38", "39", "40", "41"];
export const MEN_SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];
export const RING_SIZES = ["6", "7", "8", "9"];

type ChipValue = string | [string, number];

export const chipOption = (id: string, label: string, values: ChipValue[], required = true): ProductOption => ({
  id, label, kind: "chip", required,
  values: values.map((v): OptionValue => (typeof v === "string" ? { value: v } : { value: v[0], priceAdjustment: v[1] })),
});

export const swatchOption = (id: string, label: string, names: string[], hexes?: string[]): ProductOption => ({
  id, label, kind: "swatch", required: true,
  values: names.map((n, i) => ({ value: n, swatch: hexes?.[i] ?? swatchFor(n) })),
});

export function slugify(input: string): string {
  return input.toLowerCase().replace(/&/g, "and").replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const IMAGE_FOLDER: Record<string, string> = {
  "womens-fashion": "clothing", "mens-fashion": "clothing", "clothing-fabrics": "clothing",
  shoes: "shoes", handbags: "bags", jewellery: "jewellery", watches: "watches", "hair-wigs": "wigs",
  makeup: "makeup", "makeup-kits": "makeup", "beauty-skincare": "makeup", accessories: "accessories",
};

export function imageFolderFor(categoryId: string): string {
  return IMAGE_FOLDER[categoryId] ?? "clothing";
}

export function buildProduct(seed: Seed, index: number): Product {
  const category = categories.find((c) => c.id === seed.cat);
  const sub = category?.subcategories.find((x) => x.id === seed.sub);
  if (!category || !sub) throw new Error(`Invalid category/subcategory for "${seed.name}": ${seed.cat}/${seed.sub}`);

  const slug = slugify(seed.name);
  const options: ProductOption[] = [];
  if (seed.colours?.length) options.push(swatchOption("colour", "Colour", seed.colours));
  if (seed.sizes?.length) options.push(chipOption("size", seed.sizeLabel ?? "Size", seed.sizes));
  if (seed.extra) options.push(...seed.extra);

  const folder = imageFolderFor(seed.cat);
  const firstSentence = seed.d.split(/(?<=[.!?])\s/)[0];
  const attrTags = Object.values(seed.attrs).filter((v): v is string => typeof v === "string");
  const flags = seed.flags ?? [];

  return {
    id: `${seed.sample === false ? "fh" : "sample"}-${String(index + 1).padStart(3, "0")}`,
    slug,
    name: seed.name,
    brand: seed.brand,
    categoryId: category.id,
    subcategoryId: sub.id,
    description: seed.d,
    shortDescription: firstSentence,
    price: seed.price,
    compareAtPrice: seed.was,
    currency: "GHS",
    images: (seed.images?.length ? seed.images : [1, 2].map((n) => `/images/products/${folder}/${slug}-${n}.webp`)).map((src, i) => ({
      src,
      alt: `${seed.name} - ${seed.sample === false ? "image" : "sample image"} ${i + 1}`,
      width: seed.imageSize?.[0] ?? 900,
      height: seed.imageSize?.[1] ?? 1200,
    })),
    options,
    attributes: seed.attrs,
    tags: [category.name, category.department, sub.name, ...(seed.colours ?? []), ...attrTags, ...(seed.tags ?? [])],
    badges: [],
    collectionIds: seed.collections ?? [],
    ...(seed.rating ? { rating: seed.rating } : {}),
    featured: flags.includes("featured"),
    newArrival: flags.includes("new"),
    trending: flags.includes("trending"),
    availability: seed.avail ?? "available",
    addedAt: new Date(Date.UTC(2026, 8, 30 - index)).toISOString().slice(0, 10),
    sample: seed.sample !== false,
    seo: { title: seed.name, description: firstSentence },
  };
}

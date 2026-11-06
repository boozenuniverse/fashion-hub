import { swatchFor } from "@/data/colours";
import type { Availability, Product } from "@/types/product";
import { isOnSale } from "./products";

export interface ProductFilters {
  categoryIds: string[];
  subcategoryIds: string[];
  priceMin: number | null;
  priceMax: number | null;
  colours: string[];
  sizes: string[];
  brands: string[];
  availability: Availability[];
  collectionIds: string[];
  onSale: boolean;
  newOnly: boolean;
}

export const emptyFilters: ProductFilters = {
  categoryIds: [], subcategoryIds: [], priceMin: null, priceMax: null, colours: [], sizes: [],
  brands: [], availability: [], collectionIds: [], onSale: false, newOnly: false,
};

export type SortKey = "relevance" | "featured" | "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export const sortLabels: Record<Exclude<SortKey, "relevance">, string> = {
  featured: "Featured", newest: "Newest", "price-asc": "Price: low to high", "price-desc": "Price: high to low",
  "name-asc": "Name: A to Z", "name-desc": "Name: Z to A",
};

const optionValues = (p: Product, id: string) => p.options.find((o) => o.id === id)?.values.map((v) => v.value) ?? [];
const hasAny = (selected: string[], available: string[]) => selected.length === 0 || selected.some((s) => available.includes(s));

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  return list.filter((p) => {
    if (f.categoryIds.length && !f.categoryIds.includes(p.categoryId)) return false;
    if (f.subcategoryIds.length && !f.subcategoryIds.includes(p.subcategoryId)) return false;
    if (f.priceMin !== null && p.price < f.priceMin) return false;
    if (f.priceMax !== null && p.price > f.priceMax) return false;
    if (!hasAny(f.colours, optionValues(p, "colour"))) return false;
    if (!hasAny(f.sizes, optionValues(p, "size"))) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.availability.length && !f.availability.includes(p.availability)) return false;
    if (f.collectionIds.length && !f.collectionIds.some((c) => p.collectionIds.includes(c))) return false;
    if (f.onSale && !isOnSale(p)) return false;
    if (f.newOnly && !p.newArrival) return false;
    return true;
  });
}

export function sortProducts(list: Product[], key: SortKey): Product[] {
  const indexed = list.map((p, i) => ({ p, i }));
  const featuredRank = (p: Product) => (p.featured ? 0 : p.trending ? 1 : p.newArrival ? 2 : 3);
  const cmp: Record<SortKey, (a: { p: Product; i: number }, b: { p: Product; i: number }) => number> = {
    relevance: (a, b) => a.i - b.i,
    featured: (a, b) => featuredRank(a.p) - featuredRank(b.p) || a.i - b.i,
    newest: (a, b) => Number(b.p.newArrival) - Number(a.p.newArrival) || b.p.addedAt.localeCompare(a.p.addedAt) || a.i - b.i,
    "price-asc": (a, b) => a.p.price - b.p.price || a.i - b.i,
    "price-desc": (a, b) => b.p.price - a.p.price || a.i - b.i,
    "name-asc": (a, b) => a.p.name.localeCompare(b.p.name),
    "name-desc": (a, b) => b.p.name.localeCompare(a.p.name),
  };
  return indexed.sort(cmp[key]).map((x) => x.p);
}

export interface Facets {
  priceRange: [number, number];
  categories: { id: string; count: number }[];
  subcategories: { id: string; count: number }[];
  colours: { value: string; swatch: string; count: number }[];
  sizes: { value: string; count: number }[];
  brands: { value: string; count: number }[];
  availability: { value: Availability; count: number }[];
  collections: { id: string; count: number }[];
  hasSale: boolean;
  hasNew: boolean;
}

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];
export const compareSizes = (a: string, b: string) => {
  const ia = SIZE_ORDER.indexOf(a);
  const ib = SIZE_ORDER.indexOf(b);
  if (ia !== -1 && ib !== -1) return ia - ib;
  const na = parseFloat(a);
  const nb = parseFloat(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b);
};

function tally<T extends string>(values: T[]): { value: T; count: number }[] {
  const map = new Map<T, number>();
  values.forEach((v) => map.set(v, (map.get(v) ?? 0) + 1));
  return [...map.entries()].map(([value, count]) => ({ value, count }));
}

/** Context-sensitive facets: built only from the products currently in scope. */
export function buildFacets(list: Product[]): Facets {
  const prices = list.map((p) => p.price);
  const categories = tally(list.map((p) => p.categoryId)).map(({ value, count }) => ({ id: value, count }));
  const singleCategory = categories.length === 1;
  return {
    priceRange: prices.length ? [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))] : [0, 0],
    categories,
    subcategories: singleCategory ? tally(list.map((p) => p.subcategoryId)).map(({ value, count }) => ({ id: value, count })) : [],
    colours: tally(list.flatMap((p) => optionValues(p, "colour"))).map((c) => ({ ...c, swatch: swatchFor(c.value) })).sort((a, b) => a.value.localeCompare(b.value)),
    // Sizes only make sense inside one department (shoe sizes should not appear beside makeup).
    sizes: singleCategory ? tally(list.flatMap((p) => optionValues(p, "size"))).sort((a, b) => compareSizes(a.value, b.value)) : [],
    brands: tally(list.map((p) => p.brand)).sort((a, b) => a.value.localeCompare(b.value)),
    availability: tally(list.map((p) => p.availability)),
    collections: tally(list.flatMap((p) => p.collectionIds)).map(({ value, count }) => ({ id: value, count })),
    hasSale: list.some(isOnSale),
    hasNew: list.some((p) => p.newArrival),
  };
}

export function activeFilterCount(f: ProductFilters): number {
  return (
    f.categoryIds.length + f.subcategoryIds.length + f.colours.length + f.sizes.length + f.brands.length +
    f.availability.length + f.collectionIds.length + (f.onSale ? 1 : 0) + (f.newOnly ? 1 : 0) +
    (f.priceMin !== null ? 1 : 0) + (f.priceMax !== null ? 1 : 0)
  );
}

export const PAGE_SIZE = 12;

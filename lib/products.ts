import { products } from "@/data/products";
import { collections } from "@/data/collections";
import type { Product } from "@/types/product";

/**
 * Product service. UI code reads the catalogue ONLY through these functions, so the static
 * data source can later be swapped for an API without touching components.
 */
export const getAllProducts = (): Product[] => products;
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByIds = (ids: string[]) =>
  ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
export const getProductsByCategory = (categoryId: string) => products.filter((p) => p.categoryId === categoryId);
export const getProductsByCollection = (collectionId: string) => products.filter((p) => p.collectionIds.includes(collectionId));
export const getFeaturedProducts = (limit?: number) => products.filter((p) => p.featured).slice(0, limit);
export const getTrendingProducts = (limit?: number) => products.filter((p) => p.trending).slice(0, limit);
export const getNewArrivals = (limit?: number) =>
  products.filter((p) => p.newArrival).sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, limit);
export const getCollections = () => collections;
export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

export const isOnSale = (p: Product) => typeof p.compareAtPrice === "number" && p.compareAtPrice > p.price;
export const discountPercent = (p: Product) =>
  isOnSale(p) ? Math.round(((p.compareAtPrice! - p.price) / p.compareAtPrice!) * 100) : 0;

/** Same sub-category first, then same category, then anything sharing a collection. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  const score = (p: Product) =>
    (p.subcategoryId === product.subcategoryId && p.categoryId === product.categoryId ? 4 : 0) +
    (p.categoryId === product.categoryId ? 2 : 0) +
    p.collectionIds.filter((c) => product.collectionIds.includes(c)).length;
  return others
    .map((p, i) => ({ p, s: score(p), i }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p);
}

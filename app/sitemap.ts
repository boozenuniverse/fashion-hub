import type { MetadataRoute } from "next";
import { articles } from "@/data/journal";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["/", "/shop/", "/new-arrivals/", "/collections/", "/categories/", "/journal/", "/about/", "/contact/", "/size-guide/", "/faqs/", "/shipping/", "/returns/", "/privacy/", "/terms/", "/order-enquiry/"];
  const dynamicPaths = [
    ...categories.map((c) => `/categories/${c.slug}/`),
    ...collections.map((c) => `/collections/${c.slug}/`),
    ...products.map((p) => `/products/${p.slug}/`),
    ...articles.map((a) => `/journal/${a.slug}/`),
  ];
  return [...fixed, ...dynamicPaths].map((path) => ({ url: absoluteUrl(path) }));
}

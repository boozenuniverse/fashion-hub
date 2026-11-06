import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Article } from "@/types/journal";
import type { Product } from "@/types/product";

/** Absolute URL including the GitHub Pages repository path. `path` may be root-relative. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetaInput { title: string; description: string; path: string; image?: string; type?: "website" | "article" }

export function buildMetadata({ title, description, path, image = siteConfig.ogImage, type = "website" }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${siteConfig.name}`, description, url, siteName: siteConfig.name, locale: "en_GH", type, images: [{ url: img }] },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: [img] },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/"), logo: absoluteUrl(siteConfig.logo),
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  sameAs: Object.values(siteConfig.social).filter(Boolean),
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/"),
  potentialAction: { "@type": "SearchAction", target: `${absoluteUrl("/search/")}?q={search_term_string}`, "query-input": "required name=search_term_string" },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

const availabilityUrl = { available: "https://schema.org/InStock", unavailable: "https://schema.org/OutOfStock", preorder: "https://schema.org/PreOrder" } as const;

/** Only supplied data is emitted: no ratings, reviews or stock counts. Not used for sample products. */
export const productJsonLd = (p: Product) => ({
  "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, brand: { "@type": "Brand", name: p.brand },
  image: p.images.map((i) => absoluteUrl(i.src)),
  offers: { "@type": "Offer", url: absoluteUrl(`/products/${p.slug}/`), priceCurrency: p.currency, price: p.price, availability: availabilityUrl[p.availability] },
});

export const articleJsonLd = (a: Article) => ({
  "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, datePublished: a.date,
  image: [absoluteUrl(a.image)], author: { "@type": "Organization", name: a.author },
  publisher: { "@type": "Organization", name: siteConfig.name },
  mainEntityOfPage: absoluteUrl(`/journal/${a.slug}/`),
});

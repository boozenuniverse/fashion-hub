"use client";

import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { formatPrice } from "@/lib/currency";
import { withBasePath } from "@/lib/paths";
import type { Product } from "@/types/product";

/** Compact card used on the landing page: photo, "New" pill, heart, name and price. */
export function LandingProductCard({ product, image, wide, priority = false }: { product: Product; image: string; wide?: string; priority?: boolean }) {
  return (
    <article className="overflow-hidden rounded-[10px] border border-line/80 bg-paper shadow-[0_10px_24px_-20px_rgba(34,7,7,0.6)]">
      <div className="relative aspect-[19/10] bg-sand-light lg:aspect-[142/138]">
        <Link href={`/products/${product.slug}/`} className="absolute inset-0 block" aria-label={`${product.name}, view product`} tabIndex={-1}>
          {wide ? (
            <picture>
              <source media="(min-width: 1024px)" srcSet={withBasePath(image)} />
              <img src={withBasePath(wide)} alt={`${product.name}, sample photograph`} loading={priority ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
            </picture>
          ) : (
            <Img src={image} alt={`${product.name}, sample photograph`} priority={priority} className="h-full w-full object-cover" />
          )}
        </Link>
        {product.newArrival && <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-[6px] bg-burgundy px-2.5 py-1 font-sans text-[11px] font-medium leading-none text-cream">New</span>}
        <WishlistButton product={product} className="absolute right-0 top-0" />
      </div>
      <div className="px-3 pb-3.5 pt-3">
        <h3 className="font-sans! text-[13px]! font-medium! leading-snug! text-ink"><Link href={`/products/${product.slug}/`} className="hover:underline">{product.name}</Link></h3>
        <p className="mt-1 font-sans text-[14px] font-bold text-ink"><span className="sr-only">Price: </span>{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

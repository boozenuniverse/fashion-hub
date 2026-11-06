"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { PriceTag } from "@/components/ui/PriceTag";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useUI } from "@/context/UIContext";
import { getCategoryById, getSubcategory } from "@/lib/categories";
import { discountPercent, isOnSale } from "@/lib/products";
import type { Product } from "@/types/product";

const availabilityText = { available: "Available", unavailable: "Currently unavailable", preorder: "Available to pre-order" } as const;
const pill = "rounded-[6px] bg-burgundy px-2 py-1 font-sans text-[11.5px] font-medium leading-none text-cream";

export function ProductListItem({ product }: { product: Product }) {
  const { openQuickView } = useUI();
  return (
    <article className="grid grid-cols-[104px_minmax(0,1fr)] gap-3.5 border-b border-line py-4 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-6 sm:py-6">
      <Link href={`/products/${product.slug}/`} className="relative block aspect-[3/4] w-full overflow-hidden rounded-[10px] bg-sand-light" aria-label={`${product.name}, view product`}>
        <Img src={product.images[0].src} alt={product.images[0].alt} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
      </Link>
      <div className="flex min-w-0 flex-col">
        <p className="text-[12.5px] text-muted">{getCategoryById(product.categoryId)?.name} / {getSubcategory(product.categoryId, product.subcategoryId)?.name}</p>
        <h3 className="mt-0.5 font-serif! text-[1.2rem]! leading-tight! sm:text-[1.6rem]!"><Link href={`/products/${product.slug}/`} className="hover:underline">{product.name}</Link></h3>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <PriceTag price={product.price} compareAt={product.compareAtPrice} />
          {product.newArrival && <span className={pill}>New</span>}
          {isOnSale(product) && <span className={pill}>-{discountPercent(product)}%</span>}
        </div>
        <p className="mt-2.5 hidden max-w-[60ch] text-muted sm:block">{product.description}</p>
        <p className="mt-1.5 text-[13px] text-muted">{availabilityText[product.availability]}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-2.5">
          <Link href={`/products/${product.slug}/`} className="btn btn-primary btn-sm flex-1 px-3 sm:flex-none">View product</Link>
          <button type="button" onClick={() => openQuickView(product.slug)} aria-label={`Quick view ${product.name}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-taupe/70 text-ink hover:border-burgundy hover:text-burgundy"><Eye aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} /></button>
          <WishlistButton product={product} />
        </div>
      </div>
    </article>
  );
}

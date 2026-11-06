"use client";

import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { PriceTag } from "@/components/ui/PriceTag";
import { useUI } from "@/context/UIContext";
import { getCategoryById } from "@/lib/categories";
import { getProductBySlug } from "@/lib/products";
import { ProductPurchase } from "./ProductPurchase";

/** Compact on phones (small photo beside the title, options below, sticky Add to Bag); two columns from md up. */
export function ProductQuickView() {
  const { quickViewSlug, closeQuickView } = useUI();
  const product = quickViewSlug ? getProductBySlug(quickViewSlug) : undefined;
  return (
    <Modal open={Boolean(product)} onClose={closeQuickView} title={product ? `Quick view: ${product.name}` : "Quick view"} maxWidthClass="max-w-4xl">
      {product && (
        <div className="grid min-w-0 gap-x-4 gap-y-4 px-4 pb-0 pt-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8 md:p-8">
          <div className="grid min-w-0 grid-cols-[96px_minmax(0,1fr)] items-start gap-3 md:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] bg-sand-light md:mx-auto md:max-w-none">
              <Img src={product.images[0].src} alt={product.images[0].alt} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
            </div>
            <div className="min-w-0 pr-9 md:hidden">
              <p className="text-[12.5px] text-muted">{getCategoryById(product.categoryId)?.name}</p>
              <h2 className="mt-0.5 font-serif text-[1.35rem] leading-tight">{product.name}</h2>
              <PriceTag price={product.price} compareAt={product.compareAtPrice} className="mt-1" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="hidden md:block">
              <p className="text-[13px] text-muted">{getCategoryById(product.categoryId)?.name}</p>
              <h2 className="mb-2 mt-1 font-serif text-[2.1rem] leading-tight">{product.name}</h2>
              <p className="mb-6 text-muted">{product.shortDescription}</p>
            </div>
            <ProductPurchase product={product} onAdded={closeQuickView} stickyMode="container" hidePrice />
            <p className="py-3"><Link href={`/products/${product.slug}/`} onClick={closeQuickView} className="link-quiet text-[14px]">View full details</Link></p>
          </div>
        </div>
      )}
    </Modal>
  );
}

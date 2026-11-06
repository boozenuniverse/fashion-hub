"use client";

import Link from "next/link";
import { Check, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Stars } from "@/components/ui/Stars";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/currency";
import { discountPercent, isOnSale } from "@/lib/products";
import type { Product } from "@/types/product";

const pill = "rounded-[6px] bg-burgundy px-2 py-1 font-sans text-[11.5px] font-medium leading-none text-cream";

/** Shop card: photo, badges, heart, name, price, optional real rating, Add to Bag + quick view. */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { openQuickView } = useUI();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const second = product.images[1];
  const first = product.images[0];
  const needsChoice = product.options.some((o) => o.required && o.values.length > 1);
  const unavailable = product.availability === "unavailable";
  const sizes = "(min-width:1280px) 22vw, (min-width:768px) 30vw, 48vw";

  function addToBag() {
    if (needsChoice) { openQuickView(product.slug); return; }
    add(product, Object.fromEntries(product.options.map((o) => [o.id, o.values[0].value])), 1);
    setAdded(true);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-line/70 bg-paper shadow-[0_12px_28px_-22px_rgba(34,7,7,0.65)]">
      <div className="relative aspect-[386/360] overflow-hidden bg-sand-light">
        <Link href={`/products/${product.slug}/`} className="absolute inset-0 block" aria-label={`${product.name}, view product`} tabIndex={-1}>
          <Img src={first.src} alt={first.alt} priority={priority} fullWidth={first.width} sizes={sizes} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
          {second && <Img src={second.src} alt="" aria-hidden="true" fullWidth={second.width} sizes={sizes} className="absolute inset-0 h-full w-full object-cover object-[50%_25%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
        </Link>
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {product.newArrival && <span className={pill}>New</span>}
          {isOnSale(product) && <span className={pill}>-{discountPercent(product)}%</span>}
          {product.badges.map((b) => <span key={b} className={pill}>{b}</span>)}
          {unavailable && <span className={`${pill} bg-ink/80`}>Unavailable</span>}
          {product.availability === "preorder" && <span className={`${pill} bg-ink/80`}>Pre-order</span>}
        </div>
        <WishlistButton product={product} className="absolute right-0 top-0" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-3 pb-3 pt-2.5">
        <h3 className="font-sans! text-[14px]! font-medium! leading-snug! text-ink"><Link href={`/products/${product.slug}/`} className="hover:underline">{product.name}</Link></h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <p className="font-sans text-[15px] font-bold text-burgundy"><span className="sr-only">Price: </span>{formatPrice(product.price)}</p>
          {isOnSale(product) && <p className="font-sans text-[12.5px] text-muted line-through"><span className="sr-only">Previous price: </span>{formatPrice(product.compareAtPrice!)}</p>}
        </div>
        {product.rating && <div className="mt-1"><Stars value={product.rating.value} count={product.rating.count} /></div>}
        <div className="mt-auto flex flex-col gap-2 pt-2.5 min-[400px]:flex-row">
          <button type="button" onClick={addToBag} disabled={unavailable} className="flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] bg-burgundy px-2 font-sans text-[13px] font-medium text-cream transition-colors hover:bg-ink disabled:bg-stone">
            {added ? <Check aria-hidden="true" className="h-4 w-4" /> : <ShoppingBag aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />}{added ? "Added" : unavailable ? "Unavailable" : "Add to Bag"}
          </button>
          <button type="button" onClick={() => openQuickView(product.slug)} aria-label={`Quick view ${product.name}`} className="grid min-h-[44px] w-full shrink-0 place-items-center rounded-[8px] border border-taupe/70 text-ink transition-colors hover:border-burgundy hover:text-burgundy min-[400px]:w-11">
            <span className="flex items-center gap-2 text-[13px] min-[400px]:hidden"><Eye aria-hidden="true" className="h-4 w-4" />Quick view</span>
            <Eye aria-hidden="true" className="hidden h-[18px] w-[18px] min-[400px]:block" strokeWidth={1.6} />
          </button>
        </div>
        <span className="sr-only" role="status">{added ? `${product.name} added to your bag` : ""}</span>
      </div>
    </article>
  );
}

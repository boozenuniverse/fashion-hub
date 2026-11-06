"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistGrid() {
  const { products, hydrated, remove } = useWishlist();
  const { add } = useCart();
  const { pushToast } = useUI();

  if (!hydrated) return <div className="min-h-[40vh] animate-pulse rounded-[3px] bg-sand-light" aria-busy="true" aria-label="Loading your wishlist" />;
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-[2rem] text-ink">Your wishlist is empty</p>
        <p className="mx-auto mt-2 max-w-md text-muted">Tap the heart on any product to save it here. Your wishlist is kept in this browser.</p>
        <div className="mt-6"><Button href="/shop/">Discover the collection</Button></div>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => {
        const needsOptions = p.options.some((o) => o.required && o.values.length > 1);
        return (
          <li key={p.id}>
            <ProductCard product={p} />
            <div className="mt-3">
              {p.availability === "unavailable" ? <p className="text-[13px] text-muted">Currently unavailable</p> : needsOptions ? (
                <Link href={`/products/${p.slug}/`} className="btn btn-outline btn-sm w-full">Choose options</Link>
              ) : (
                <Button size="sm" className="w-full" onClick={() => { add(p, Object.fromEntries(p.options.map((o) => [o.id, o.values[0].value])), 1); remove(p.id); pushToast(`${p.name} moved to your bag.`); }}>Move to bag</Button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

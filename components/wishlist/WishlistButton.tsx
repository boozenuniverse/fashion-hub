"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";

interface Props { product: Product; variant?: "icon" | "button"; className?: string }

export function WishlistButton({ product, variant = "icon", className = "" }: Props) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  if (variant === "button") {
    return (
      <button type="button" onClick={() => toggle(product)} aria-pressed={saved} className={`btn btn-outline ${className}`}>
        <Heart aria-hidden="true" className={`h-[17px] w-[17px] ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    );
  }
  return (
    <button type="button" onClick={() => toggle(product)} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={`grid h-11 w-11 place-items-center text-ink hover:text-wine ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/95 shadow-sm"><Heart aria-hidden="true" className={`h-[18px] w-[18px] ${saved ? "fill-wine text-wine" : ""}`} /></span>
    </button>
  );
}

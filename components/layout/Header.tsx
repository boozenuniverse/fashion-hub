"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useWishlist } from "@/context/WishlistContext";
import { DesktopNavigation } from "./DesktopNavigation";
import { Logo } from "./Logo";

const iconBtn = "relative grid h-11 w-11 place-items-center text-ink transition-colors hover:text-burgundy";

function Count({ value }: { value: number }) {
  return <span aria-hidden="true" className="absolute right-0 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-burgundy px-1 font-ui text-[10px] font-semibold leading-none text-cream">{value}</span>;
}

/** Phones: centred logo with search on the right (menu, bag and wishlist live in the bottom bar). Desktop: logo, nav, icons. */
export function Header() {
  const { openSearch, openBag } = useUI();
  const { totals } = useCart();
  const { count } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <div className="container-x grid h-[54px] grid-cols-[44px_1fr_44px] items-center lg:h-[68px] lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        <div className="hidden lg:block"><Logo /></div>
        <span aria-hidden="true" className="lg:hidden" />

        <div className="flex min-w-0 justify-center">
          <div className="lg:hidden"><Logo /></div>
          <DesktopNavigation />
        </div>

        <div className="flex items-center justify-end">
          <button type="button" className={`${iconBtn} -mr-2.5 lg:mr-0`} onClick={openSearch} aria-label="Search"><Search aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} /></button>
          <Link href="/wishlist/" className={`${iconBtn} hidden lg:grid`} aria-label={`Wishlist, ${count} saved`}><Heart aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} /><Count value={count} /></Link>
          <button type="button" className={`${iconBtn} hidden lg:grid`} onClick={openBag} aria-label={`Shopping bag, ${totals.itemCount} items`}><ShoppingBag aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} /><Count value={totals.itemCount} /></button>
        </div>
      </div>
    </header>
  );
}

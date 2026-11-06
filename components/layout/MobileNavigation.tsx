"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useWishlist } from "@/context/WishlistContext";
import { navItems } from "@/data/navigation";
import { NavAccordion } from "./NavAccordion";

const MENU = ["Collections", "Women", "Men", "Beauty", "Accessories", "Journal"];

/** Bottom sheet opened by the hamburger tab. Dropdowns list sub-categories; Bag, Wishlist and Search sit at the bottom. */
export function MobileNavigation() {
  const { navOpen, closeNav, openSearch, openBag } = useUI();
  const { totals } = useCart();
  const { count } = useWishlist();
  const items = MENU.map((label) => navItems.find((n) => n.label === label)).filter((n): n is NonNullable<typeof n> => Boolean(n));
  const foot = "relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[12px] text-ink hover:text-burgundy";
  const badge = (n: number) => <span aria-hidden="true" className="absolute right-[26%] top-1.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-burgundy px-1 font-ui text-[10px] font-semibold leading-none text-cream">{n}</span>;

  return (
    <Drawer open={navOpen} onClose={closeNav} title="Menu" side="bottom">
      <nav aria-label="Menu" className="flex-1 overflow-y-auto overscroll-contain px-5 pt-1">
        {items.map((item) =>
          item.mega ? (
            <NavAccordion key={item.label} title={item.label} href={item.href} columns={item.mega.columns} onNavigate={closeNav} />
          ) : (
            <Link key={item.label} href={item.href} onClick={closeNav} className="flex min-h-[52px] items-center border-b border-line font-serif text-[1.3rem] text-ink">{item.label}</Link>
          ),
        )}
      </nav>
      <div className="flex shrink-0 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)]">
        <button type="button" onClick={() => { closeNav(); openBag(); }} className={foot} aria-label={`Bag, ${totals.itemCount} items`}><ShoppingBag aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />Bag{badge(totals.itemCount)}</button>
        <Link href="/wishlist/" onClick={closeNav} className={foot} aria-label={`Wishlist, ${count} saved`}><Heart aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />Wishlist{badge(count)}</Link>
        <button type="button" onClick={() => { closeNav(); openSearch(); }} className={foot}><Search aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />Search</button>
      </div>
    </Drawer>
  );
}

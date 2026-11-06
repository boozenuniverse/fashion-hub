"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Menu, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useWishlist } from "@/context/WishlistContext";

/**
 * Fixed bottom navigation (phones and tablets). Five destinations, Home in the middle:
 * Bag, Wishlist, Home, Shop, Menu. Every target is at least 44px and sits in the thumb zone.
 */
export function BottomTabBar() {
  const pathname = usePathname() ?? "/";
  const { openBag, bagOpen, openShop, shopOpen, openNav, navOpen } = useUI();
  const { totals } = useCart();
  const { count } = useWishlist();

  const cell = "relative flex h-[58px] w-full flex-col items-center justify-center gap-0.5 font-sans text-[12px] leading-none";
  const tone = (active: boolean) => (active ? "font-semibold text-burgundy" : "text-ink");
  const icon = "h-[22px] w-[22px]";
  const Bar = ({ on }: { on: boolean }) => (on ? <span aria-hidden="true" className="absolute bottom-0.5 h-[3px] w-9 rounded-full bg-burgundy" /> : null);
  const Badge = ({ n }: { n: number }) => <span aria-hidden="true" className="absolute -right-2.5 -top-1.5 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-burgundy px-1 font-ui text-[10px] font-semibold leading-none text-cream">{n}</span>;

  const anySheet = shopOpen || navOpen || bagOpen;
  const homeActive = pathname === "/" && !anySheet;
  const wishActive = pathname.startsWith("/wishlist") && !anySheet;
  const shopActive = shopOpen || (!anySheet && ["/shop", "/categories", "/collections", "/products", "/new-arrivals", "/search"].some((p) => pathname.startsWith(p)));

  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        <li><button type="button" onClick={openBag} aria-label={`Bag, ${totals.itemCount} items`} className={`${cell} ${tone(bagOpen)}`}><span className="relative"><ShoppingBag aria-hidden="true" className={icon} strokeWidth={1.5} /><Badge n={totals.itemCount} /></span>Bag<Bar on={bagOpen} /></button></li>
        <li><Link href="/wishlist/" aria-label={`Wishlist, ${count} saved`} aria-current={wishActive ? "page" : undefined} className={`${cell} ${tone(wishActive)}`}><span className="relative"><Heart aria-hidden="true" className={icon} strokeWidth={1.5} /><Badge n={count} /></span>Wishlist<Bar on={wishActive} /></Link></li>
        <li><Link href="/" aria-current={homeActive ? "page" : undefined} className={`${cell} ${tone(homeActive)}`}><span className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${homeActive ? "bg-burgundy text-cream" : ""}`}><Home aria-hidden="true" className={icon} strokeWidth={homeActive ? 1.8 : 1.5} /></span><span className="sr-only">Home</span><span aria-hidden="true" className="-mt-0.5">Home</span></Link></li>
        <li><button type="button" onClick={shopOpen ? undefined : openShop} aria-haspopup="dialog" aria-expanded={shopOpen} className={`${cell} ${tone(shopActive)}`}><LayoutGrid aria-hidden="true" className={icon} strokeWidth={1.5} />Shop<Bar on={shopActive} /></button></li>
        <li><button type="button" onClick={navOpen ? undefined : openNav} aria-haspopup="dialog" aria-expanded={navOpen} className={`${cell} ${tone(navOpen)}`}><Menu aria-hidden="true" className={icon} strokeWidth={1.5} />Menu<Bar on={navOpen} /></button></li>
      </ul>
    </nav>
  );
}

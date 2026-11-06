"use client";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { CartEmptyState } from "./CartEmptyState";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const { bagOpen, closeBag } = useUI();
  const { lines, totals } = useCart();
  const blocked = lines.some((l) => l.unavailable);
  return (
    <Drawer open={bagOpen} onClose={closeBag} title="Your bag">
      {lines.length === 0 ? (
        <CartEmptyState onNavigate={closeBag} />
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">{lines.map((l) => <CartItem key={l.key} line={l} onNavigate={closeBag} compact />)}</ul>
          <div className="space-y-4 border-t border-line bg-paper px-6 py-5">
            <CartSummary totals={totals} />
            <p className="text-[12.5px] text-muted">Checkout sends an order enquiry. No payment is taken on this website.</p>
            <div className="grid gap-3">
              <Button href="/checkout/" onClick={closeBag} aria-disabled={blocked} className={blocked ? "pointer-events-none opacity-50" : ""}>Continue to enquiry</Button>
              <Button href="/bag/" variant="outline" onClick={closeBag}>View bag</Button>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { CartEmptyState } from "./CartEmptyState";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function BagView() {
  const { lines, totals, hydrated, clear } = useCart();
  if (!hydrated) return <div className="min-h-[40vh] animate-pulse rounded-[3px] bg-sand-light" aria-busy="true" aria-label="Loading your bag" />;
  if (lines.length === 0) return <CartEmptyState />;
  const blocked = lines.some((l) => l.unavailable);
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div>
        <ul className="divide-y divide-line border-y border-line">{lines.map((l) => <CartItem key={l.key} line={l} />)}</ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Button href="/shop/" variant="outline" size="sm">Continue shopping</Button>
          <button type="button" onClick={clear} className="text-[14px] text-muted underline hover:text-ink">Clear bag</button>
        </div>
      </div>
      <aside className="h-fit rounded-[4px] border border-line bg-paper p-6 lg:sticky lg:top-28">
        <h2 className="mb-4 font-serif text-[1.9rem]">Summary</h2>
        <CartSummary totals={totals} />
        <p className="mt-4 text-[13px] text-muted">Checkout prepares an order enquiry to send to Fashion Hub. No payment is taken on this website.</p>
        {blocked && <p role="alert" className="mt-4 text-[13px] font-semibold text-[#8A2E38]">Remove unavailable items to continue.</p>}
        <Button href="/checkout/" className={`mt-5 w-full ${blocked ? "pointer-events-none opacity-50" : ""}`} aria-disabled={blocked}>Continue to enquiry</Button>
      </aside>
    </div>
  );
}

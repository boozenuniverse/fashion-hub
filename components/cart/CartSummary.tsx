import { orderRules } from "@/config/business";
import { formatPrice } from "@/lib/currency";
import type { CartTotals } from "@/types/cart";

export function CartSummary({ totals }: { totals: CartTotals }) {
  return (
    <dl className="space-y-2 text-[15px]">
      {totals.savings > 0 && <div className="flex justify-between text-muted"><dt>Savings included</dt><dd>{formatPrice(totals.savings)}</dd></div>}
      <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold text-ink">{formatPrice(totals.subtotal)}</dd></div>
      <div className="flex justify-between text-muted"><dt>Delivery</dt><dd className="text-right">{orderRules.deliveryFeeLabel}</dd></div>
      <div className="flex justify-between border-t border-line pt-3 text-[1.05rem]"><dt className="font-semibold text-ink">Estimated total</dt><dd className="font-semibold text-ink">{formatPrice(totals.total)}</dd></div>
    </dl>
  );
}

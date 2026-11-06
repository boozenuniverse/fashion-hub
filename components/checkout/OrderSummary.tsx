import { useId } from "react";
import { CartSummary } from "@/components/cart/CartSummary";
import { Img } from "@/components/ui/Img";
import { formatPrice } from "@/lib/currency";
import type { CartTotals, PricedLine } from "@/types/cart";

export function OrderSummary({ lines, totals, bare = false }: { lines: PricedLine[]; totals: CartTotals; bare?: boolean }) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId} className={bare ? "" : "rounded-[10px] border border-line bg-paper p-6"}>
      <h2 id={titleId} className={bare ? "sr-only" : "mb-4 font-serif text-[1.9rem]"}>Order summary</h2>
      <ul className="divide-y divide-line">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-4 py-4">
            <span className="relative block h-[84px] w-[63px] shrink-0 overflow-hidden rounded-[2px] bg-sand-light"><Img src={l.product.images[0].src} alt="" className="absolute inset-0 h-full w-full object-cover" /></span>
            <div className="min-w-0 flex-1 text-[14px]">
              <p className="font-semibold text-ink">{l.product.name}</p>
              {Object.keys(l.selections).length > 0 && <p className="text-muted">{Object.entries(l.selections).map(([k, v]) => `${k}: ${v}`).join(", ")}</p>}
              <p className="text-muted">Qty {l.quantity}</p>
              {l.unavailable && <p className="font-semibold text-[#8A2E38]">Unavailable</p>}
            </div>
            <p className="text-[14px] font-semibold text-ink">{formatPrice(l.lineTotal)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-line pt-4"><CartSummary totals={totals} /></div>
    </section>
  );
}

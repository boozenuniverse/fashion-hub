"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/context/CartContext";
import { MAX_QUANTITY } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";
import type { PricedLine } from "@/types/cart";

const step = "grid h-11 w-11 place-items-center text-ink hover:bg-sand-light disabled:text-stone disabled:hover:bg-transparent";

export function CartItem({ line, onNavigate, compact = false }: { line: PricedLine; onNavigate?: () => void; compact?: boolean }) {
  const { setQty, remove } = useCart();
  const { product } = line;
  const options = Object.entries(line.selections);
  return (
    <li className="flex gap-4 py-5">
      <Link href={`/products/${product.slug}/`} onClick={onNavigate} className={`relative block shrink-0 overflow-hidden rounded-[2px] bg-sand-light ${compact ? "h-[104px] w-[78px]" : "h-[132px] w-[99px]"}`}>
        <Img src={product.images[0].src} alt={product.images[0].alt} className="absolute inset-0 h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${product.slug}/`} onClick={onNavigate} className="block text-[15px] font-semibold text-ink hover:underline">{product.name}</Link>
            {options.length > 0 && <p className="mt-0.5 text-[13px] text-muted">{options.map(([k, v]) => `${k.charAt(0).toUpperCase()}${k.slice(1)}: ${v}`).join(" · ")}</p>}
            {line.unavailable && <p className="mt-1 text-[13px] font-semibold text-[#8A2E38]">Currently unavailable. Remove this item to continue.</p>}
            {product.availability === "preorder" && <p className="mt-1 text-[13px] text-muted">Pre-order</p>}
          </div>
          <PriceTag price={line.unitPrice} />
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="inline-flex items-center rounded-[3px] border border-stone/70" role="group" aria-label={`Quantity for ${product.name}`}>
            <button type="button" className={step} onClick={() => setQty(line.key, line.quantity - 1)} aria-label={`Decrease quantity of ${product.name}`}><Minus aria-hidden="true" className="h-4 w-4" /></button>
            <span className="min-w-[2.25rem] text-center text-[15px] font-semibold" aria-live="polite">{line.quantity}</span>
            <button type="button" className={step} onClick={() => setQty(line.key, line.quantity + 1)} disabled={line.quantity >= MAX_QUANTITY} aria-label={`Increase quantity of ${product.name}`}><Plus aria-hidden="true" className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-3">
            {!compact && <span className="text-[15px] font-semibold text-ink">{formatPrice(line.lineTotal)}</span>}
            <button type="button" onClick={() => remove(line.key)} className="grid h-11 w-11 place-items-center text-muted hover:text-[#8A2E38]" aria-label={`Remove ${product.name} from bag`}><Trash2 aria-hidden="true" className="h-[18px] w-[18px]" /></button>
          </div>
        </div>
      </div>
    </li>
  );
}

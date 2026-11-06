"use client";

import { MessageCircle } from "lucide-react";
import { useId, useState } from "react";
import { SendChannels } from "@/components/forms/SendChannels";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { buildProductEnquiry } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

/** "Ask about this product" (or "Notify me when available") that prepares a WhatsApp/email message. */
export function ProductEnquiry({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const kind = product.availability === "available" ? "ask" : "notify";
  const message = buildProductEnquiry(siteConfig.name, product.name, absoluteUrl(`/products/${product.slug}/`), kind);
  return (
    <div className="mt-6 border-t border-line pt-5">
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)} className="inline-flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-ink underline decoration-taupe underline-offset-4 hover:decoration-2">
        <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
        {kind === "ask" ? "Ask about this product" : "Notify me when available"}
      </button>
      <div id={panelId} hidden={!open} className="mt-4 space-y-4">
        <pre className="whitespace-pre-wrap rounded-[3px] border border-line bg-paper p-4 font-sans text-[14px] text-charcoal">{message}</pre>
        <SendChannels message={message} subject={`${kind === "ask" ? "Question" : "Availability"}: ${product.name}`} />
      </div>
    </div>
  );
}

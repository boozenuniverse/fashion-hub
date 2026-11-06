"use client";

import { MessageCircle } from "lucide-react";
import { hasContact, siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Floating chat button. Renders nothing until a WhatsApp number is configured in config/site.ts. */
export function FloatingWhatsApp() {
  if (!hasContact.whatsapp()) return null;
  const href = buildWhatsAppUrl(siteConfig.contact.whatsapp, `Hello ${siteConfig.name}, I would like some help.`);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)" className="fixed bottom-20 left-4 lg:bottom-5 lg:left-5 z-30 flex h-12 items-center gap-2 rounded-full bg-burgundy px-4 text-cream shadow-lg transition-colors hover:bg-ink">
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      <span className="hidden font-ui text-[12px] font-semibold uppercase tracking-[0.12em] sm:inline">Chat with us</span>
    </a>
  );
}

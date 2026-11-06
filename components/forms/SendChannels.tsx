"use client";

import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { hasContact, siteConfig } from "@/config/site";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

/** Offers external channels for a prepared message. Nothing is sent by this website itself. */
export function SendChannels({ message, subject }: { message: string; subject: string }) {
  const [copied, setCopied] = useState(false);
  const wa = hasContact.whatsapp() ? buildWhatsAppUrl(siteConfig.contact.whatsapp, message) : null;
  const mail = hasContact.email() ? buildMailtoUrl(siteConfig.contact.email, subject, message) : null;

  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle aria-hidden="true" className="h-4 w-4" />Open WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>}
        {mail && <a href={mail} className="btn btn-outline"><Mail aria-hidden="true" className="h-4 w-4" />Send by email</a>}
        <button type="button" onClick={copy} className="btn btn-outline">{copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}{copied ? "Copied" : "Copy message"}</button>
      </div>
      <p role="status" className="sr-only">{copied ? "Message copied to clipboard" : ""}</p>
      {!wa && !mail && (
        <p className="mt-4 rounded-[3px] border border-taupe/60 bg-sand-light px-4 py-3 text-[14px] text-ink">
          Fashion Hub&rsquo;s WhatsApp and email details have not been added to this website yet (see config/site.ts), so there is no send button. Copy the message and send it to the business through your preferred channel.
        </p>
      )}
    </div>
  );
}

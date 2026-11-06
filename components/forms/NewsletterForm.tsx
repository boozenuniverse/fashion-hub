"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/validation";

/**
 * Static demonstration form. Without a provider it NEVER stores or sends the address and says so.
 * Set siteConfig.newsletter.formAction to a provider's form URL to enable real sign-ups.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "demo">("idle");
  const action = siteConfig.newsletter.formAction;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (!isValidEmail(email)) { e.preventDefault(); setStatus("invalid"); return; }
    if (!action) { e.preventDefault(); setStatus("demo"); }
  }

  return (
    <form onSubmit={onSubmit} action={action || undefined} method={action ? "post" : undefined} target={action ? "_blank" : undefined} noValidate className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }} placeholder="Enter your email address" className="min-h-[46px] flex-1 rounded-[3px] border border-sand bg-cream px-4 font-sans text-[14px] text-ink placeholder:text-muted" aria-invalid={status === "invalid" ? true : undefined} aria-describedby="newsletter-note" />
        <button type="submit" className="btn btn-sm min-h-[46px] border-sand bg-sand px-7 text-burgundy hover:bg-cream hover:border-cream">Subscribe</button>
      </div>
      <p id="newsletter-note" role="status" className="mt-2 text-[12px] text-sand/80">
        {status === "invalid" && "Enter a valid email address, for example name@example.com."}
        {status === "demo" && "This sign-up form is a demonstration: your address was not saved or sent. Newsletter sign-up will be connected to an email provider before launch."}
        {status === "idle" && (action ? "You can unsubscribe at any time." : "Demonstration only: sign-ups are not collected until an email provider is connected.")}
      </p>
    </form>
  );
}

"use client";

import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Newsletter() {
  const pathname = usePathname() ?? "/";
  const normalised = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (siteConfig.hideNewsletterOn.includes(normalised)) return null;
  return (
    <section aria-labelledby="newsletter-heading" className="on-dark border-t border-wine/40 bg-burgundy text-cream">
      <div className="container-x grid items-center gap-5 py-6 md:grid-cols-[auto_1fr] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="flex items-center gap-4 lg:gap-5">
          <span aria-hidden="true" className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-taupe/70 text-sand"><Mail className="h-6 w-6" strokeWidth={1.3} /></span>
          <span aria-hidden="true" className="hidden h-12 w-px bg-taupe/50 sm:block" />
          <div>
            <h2 id="newsletter-heading" className="font-ui text-[13px]! font-semibold! uppercase tracking-[0.16em] text-cream!">Join Our Fashion Community</h2>
            <p className="mt-1 text-[13px] text-sand">Get exclusive updates, style tips and special offers.</p>
          </div>
        </div>
        <div className="lg:border-l lg:border-taupe/40 lg:pl-10"><NewsletterForm /></div>
      </div>
    </section>
  );
}

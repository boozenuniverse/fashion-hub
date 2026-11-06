import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig, hasContact } from "@/config/site";
import { BackToTopLink } from "./BackToTopLink";
import { DressMark } from "./Logo";
import { SocialIcon } from "./SocialIcon";

const departments = [
  { label: "Women's Fashion", href: "/categories/womens-fashion/" }, { label: "Men's Fashion", href: "/categories/mens-fashion/" },
  { label: "Shoes & Bags", href: "/categories/shoes/" }, { label: "Jewellery & Watches", href: "/categories/jewellery/" }, { label: "Beauty & Hair", href: "/categories/makeup/" },
];
const support = [
  { label: "FAQs", href: "/faqs/" }, { label: "Shipping Policy", href: "/shipping/" }, { label: "Returns Policy", href: "/returns/" },
  { label: "Size Guide", href: "/size-guide/" }, { label: "Contact Us", href: "/contact/" }, { label: "My Account", href: "/account/" },
];
const about = [
  { label: "Our Story", href: "/about/" }, { label: "Fashion Journal", href: "/journal/" }, { label: "How to Order", href: "/order-enquiry/" },
  { label: "Privacy Policy", href: "/privacy/" }, { label: "Terms & Conditions", href: "/terms/" },
];

const head = "mb-4 font-ui text-[12px] font-semibold uppercase tracking-[0.16em] text-cream";
const link = "inline-flex min-h-[44px] items-center font-sans text-[14px] text-sand hover:text-cream hover:underline lg:min-h-0";
const col = "lg:border-l lg:border-wine/50 lg:pl-8";

export function Footer() {
  const c = siteConfig.contact;
  return (
    <footer className="on-dark bg-oxblood text-sand">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] lg:gap-8">
        <div className="max-w-xs">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-flex items-center gap-2.5">
            <DressMark className="h-[44px] w-[32px] text-cream" />
            <span className="flex flex-col leading-none"><span className="font-serif text-[1.7rem] font-medium tracking-[0.04em] text-cream">{siteConfig.brandMark}</span><span className="mt-1 font-serif text-[0.85rem] italic text-sand">{siteConfig.tagline}</span></span>
          </Link>
          <p className="mt-5 text-[13px] leading-relaxed">{siteConfig.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Social media">
            {Object.entries(siteConfig.social).map(([name, url]) => {
              const label = name.charAt(0).toUpperCase() + name.slice(1);
              const cls = "grid h-9 w-9 place-items-center rounded-full border border-taupe/60 text-cream";
              return <li key={name}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className={`${cls} transition-colors hover:bg-cream hover:text-ink`}><SocialIcon name={name} /></a> : <span className={`${cls} opacity-50`} title={`Add the ${label} link in config/site.ts`}><span className="sr-only">{label} (not configured)</span><SocialIcon name={name} /></span>}</li>;
            })}
          </ul>
        </div>

        <nav aria-label="Shop by department" className={col}><p className={head}>Shop by Department</p><ul className="space-y-0 lg:space-y-2.5">{departments.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="Customer support" className={col}><p className={head}>Customer Support</p><ul className="space-y-0 lg:space-y-2.5">{support.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="About us" className={col}><p className={head}>About Us</p><ul className="space-y-0 lg:space-y-2.5">{about.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul></nav>

        <div className={col}>
          <p className={head}>Contact Us</p>
          <address className="space-y-3 text-[13px] not-italic">
            <p className="flex items-start gap-2.5"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-taupe" />{hasContact.phone() ? <a className={link} href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a> : <span className="text-taupe">Phone number to be added</span>}</p>
            <p className="flex items-start gap-2.5"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-taupe" />{hasContact.email() ? <a className={link} href={`mailto:${c.email}`}>{c.email}</a> : <span className="text-taupe">Email to be added</span>}</p>
            <p className="flex items-start gap-2.5"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-taupe" /><span>{c.address || "Location to be added"}</span></p>
          </address>
        </div>
      </div>

      <div className="border-t border-wine/50">
        <div className="container-x grid gap-3 py-5 text-[12.5px] md:grid-cols-3 md:items-center">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-serif text-[1rem] italic text-sand md:text-center">{siteConfig.name} &ndash; {siteConfig.tagline}</p>
          <p className="md:text-right"><BackToTopLink /></p>
        </div>
        {siteConfig.sampleCatalogue.enabled && <p className="container-x pb-5 text-[12px] text-taupe">{siteConfig.sampleCatalogue.notice}</p>}
      </div>
    </footer>
  );
}

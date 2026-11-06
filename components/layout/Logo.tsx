import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Dress-on-stand mark used in the header and footer. */
export function DressMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 820" className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M262 120 L284 120 L294 205 Q300 217 306 205 L316 120 L338 120 L330 225 Q352 285 350 315 Q430 475 470 635 Q300 677 130 635 Q170 475 250 315 Q248 285 270 225 Z" />
      <path d="M300 660 V770 M235 785 H365" stroke="currentColor" strokeWidth="26" strokeLinecap="round" fill="none" />
    </svg>
  );
}

interface Props { tone?: "dark" | "light" }

/** Visibility (hidden / lg:hidden) belongs on a wrapper, never on this link, so display classes cannot clash. */
export function Logo({ tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-flex items-center gap-2">
      <DressMark className={`h-[30px] w-[22px] shrink-0 sm:h-[38px] sm:w-[28px] ${light ? "text-cream" : "text-burgundy"}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.15rem] font-medium tracking-[0.04em] sm:text-[1.7rem] ${light ? "text-cream" : "text-ink"}`}>{siteConfig.brandMark}</span>
        <span className={`mt-0.5 font-serif text-[0.62rem] italic sm:mt-1 sm:text-[0.82rem] ${light ? "text-sand" : "text-wine"}`}>{siteConfig.tagline}</span>
      </span>
    </Link>
  );
}

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MegaColumn } from "@/types/category";

interface Props { title: string; href?: string; columns: MegaColumn[]; onNavigate: () => void; defaultOpen?: boolean; hideColumnTitles?: boolean }

const linkCls = "flex min-h-[44px] items-center text-[15px] text-charcoal hover:text-burgundy";

/** Native <details> dropdown used by the mobile menu and shop sheets. Sub-lists are grouped by column title. */
export function NavAccordion({ title, href, columns, onNavigate, defaultOpen, hideColumnTitles }: Props) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between font-serif text-[1.3rem] text-ink [&::-webkit-details-marker]:hidden">
        {title}<ChevronDown aria-hidden="true" className="h-[18px] w-[18px] text-burgundy transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="pb-3 pl-1">
        {href && <Link href={href} onClick={onNavigate} className={`${linkCls} font-semibold text-burgundy underline decoration-taupe underline-offset-4`}>View all {title.toLowerCase()}</Link>}
        {columns.map((col) => (
          <div key={col.title} className="mb-1">
            {!hideColumnTitles && columns.length > 1 && <p className="mt-2 font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{col.title}</p>}
            <ul>{col.links.map((l) => <li key={l.href + l.label}><Link href={l.href} onClick={onNavigate} className={linkCls}>{l.label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </details>
  );
}

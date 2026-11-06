import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** Native <details> accordion: keyboard and screen-reader accessible without JavaScript. */
export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-1">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-3 text-left font-serif text-[1.35rem] text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-wine transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="max-w-[68ch] pb-5 pr-10 text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

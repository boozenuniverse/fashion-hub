import Link from "next/link";

export interface Crumb { label: string; href?: string }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? <Link href={item.href} className="hover:text-ink hover:underline">{item.label}</Link> : <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : ""}>{item.label}</span>}
              {!last && <span aria-hidden="true" className="text-stone">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

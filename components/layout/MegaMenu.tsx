import Link from "next/link";
import type { NavItem } from "@/types/category";
import { Img } from "@/components/ui/Img";

export function MegaMenu({ item, id, onNavigate }: { item: NavItem; id: string; onNavigate: () => void }) {
  if (!item.mega) return null;
  const { columns, features } = item.mega;
  return (
    <div id={id} className="absolute inset-x-0 top-full z-50 border-t border-line bg-cream shadow-[0_24px_40px_-24px_rgba(48,32,25,0.35)]">
      <div className="container-x grid grid-cols-[1fr_280px] gap-12 py-10">
        <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-serif text-[1.35rem] text-ink">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}><Link href={link.href} onClick={onNavigate} className="text-[14px] text-muted hover:text-ink hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          {features.slice(0, 1).map((f) => (
            <Link key={f.href} href={f.href} onClick={onNavigate} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand-light">
                <Img src={f.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-3 font-serif text-[1.35rem] text-ink">{f.title}</p>
              <p className="text-[13px] text-muted">{f.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

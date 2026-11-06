import Link from "next/link";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Img } from "@/components/ui/Img";
import { getCollections, getProductsByCollection } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Collections", description: "Curated Fashion Hub collections for every occasion.", path: "/collections/" });

export default function CollectionsPage() {
  return (
    <>
      <CategoryHeader title="Collections" tagline="Curated for every occasion." description="Edits that bring fashion, accessories and beauty together." crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <div className="container-x section-y-sm">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getCollections().map((c) => (
            <li key={c.id}>
              <Link href={`/collections/${c.slug}/`} className="on-dark group relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-ink">
                <Img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6 text-cream"><span className="block font-serif text-[2rem] leading-none">{c.title}</span><span className="mt-2 block text-[14px] text-sand">{c.tagline}</span><span className="mt-3 block text-[13px] text-sand">{getProductsByCollection(c.id).length} pieces</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

import Link from "next/link";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Img } from "@/components/ui/Img";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "All departments", description: "Explore every Fashion Hub department: fashion, shoes, bags, jewellery, watches, hair, makeup and beauty.", path: "/categories/" });

export default function CategoriesPage() {
  return (
    <>
      <CategoryHeader title="All departments" description="Twelve departments, from tailored fashion to beauty essentials." crumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]} />
      <div className="container-x section-y-sm">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {categories.map((c) => (
            <li key={c.id} className="grid grid-cols-[140px_1fr] gap-5 sm:grid-cols-[200px_1fr]">
              <Link href={`/categories/${c.slug}/`} className="relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-sand-light" aria-label={c.name}><Img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" /></Link>
              <div>
                <h2 className="text-[2rem]"><Link href={`/categories/${c.slug}/`} className="hover:underline">{c.name}</Link></h2>
                <p className="mt-1 text-muted">{c.description}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">{c.subcategories.map((s) => <li key={s.id}><Link href={`/categories/${c.slug}/?sub=${s.id}`} className="link-quiet">{s.name}</Link></li>)}</ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

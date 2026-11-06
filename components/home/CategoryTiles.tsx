import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { OrnateHeading } from "@/components/ui/OrnateHeading";
import { homepage } from "@/data/homepage";

export function CategoryTiles() {
  return (
    <section aria-labelledby="shop-by-category" className="bg-cream py-8 md:py-10">
      <div className="container-x">
        <div id="shop-by-category"><OrnateHeading title="Shop by Category" /></div>
        <ul className="grid grid-cols-5 gap-x-2.5 gap-y-5 lg:grid-cols-9 lg:gap-x-4">
          {homepage.categoryTiles.map((t) => (
            <li key={t.slug} className={t.mobileOnly ? "lg:hidden" : ""}>
              <Link href={`/categories/${t.slug}/`} className="group block text-center">
                <span className="relative block aspect-[142/118] overflow-hidden rounded-[14px] bg-sand-light shadow-[0_10px_22px_-16px_rgba(34,7,7,0.6)] ring-1 ring-line/70 transition-shadow duration-500 group-hover:shadow-[0_16px_26px_-14px_rgba(34,7,7,0.6)] lg:aspect-[100/97] lg:rounded-[6px]">
                  <Img src={t.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                </span>
                <span className="mt-2 block font-sans text-[12px] leading-tight text-ink lg:mt-2.5 lg:font-serif lg:text-[1.05rem] lg:italic">{t.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

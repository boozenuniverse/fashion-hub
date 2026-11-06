import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { OrnateHeading } from "@/components/ui/OrnateHeading";
import { homepage } from "@/data/homepage";
import { getCollectionBySlug } from "@/lib/products";

export function FeaturedCollections() {
  const items = homepage.featuredCollections
    .map((c) => ({ ...c, collection: getCollectionBySlug(c.slug) }))
    .filter((c): c is typeof c & { collection: NonNullable<typeof c.collection> } => Boolean(c.collection));
  return (
    <section aria-labelledby="featured-collections" className="bg-cream py-8 md:py-10">
      <div className="container-x">
        <div id="featured-collections"><OrnateHeading title="Featured Collections" /></div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {items.map(({ collection, image }) => (
            <li key={collection.id}>
              <Link href={`/collections/${collection.slug}/`} className="group flex h-full overflow-hidden rounded-[10px] bg-gradient-to-r from-sand-light to-sand/70 ring-1 ring-line/70 transition-shadow duration-500 hover:shadow-[0_18px_30px_-20px_rgba(34,7,7,0.6)]">
                <span className="relative block w-[46%] shrink-0 overflow-hidden"><Img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" /></span>
                <span className="flex flex-1 flex-col justify-center px-4 py-4 text-center lg:px-3">
                  <span className="font-serif text-[1.2rem] italic leading-tight text-ink lg:text-[1.15rem]">{collection.title.replace(/^The /, "The ")}</span>
                  <span className="mt-1.5 font-serif text-[0.95rem] italic text-wine">Shop Collection<span aria-hidden="true"> &rarr;</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

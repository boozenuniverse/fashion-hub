import { notFound } from "next/navigation";
import { Catalogue } from "@/components/catalogue/Catalogue";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { collections } from "@/data/collections";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] { return collections.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.description, path: `/collections/${c.slug}/`, image: c.image });
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  return (
    <>
      <CategoryHeader title={collection.title} tagline={collection.tagline} description={collection.description} crumbs={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections/" }, { label: collection.title }]} image={collection.image} cta={{ label: "Explore Collection", href: "#products" }} />
      <div id="products" className="container-x section-y-sm scroll-mt-24"><Catalogue products={getProductsByCollection(collection.id)} /></div>
    </>
  );
}

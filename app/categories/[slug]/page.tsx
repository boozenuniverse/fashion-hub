import { notFound } from "next/navigation";
import { Catalogue } from "@/components/catalogue/Catalogue";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { categories } from "@/data/categories";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] { return categories.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCategoryBySlug(slug);
  if (!c) return {};
  return buildMetadata({ title: c.name, description: c.description, path: `/categories/${c.slug}/`, image: c.image });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Departments", path: "/categories/" }, { name: category.name, path: `/categories/${category.slug}/` }])} />
      <CategoryHeader title={category.name} tagline={category.tagline} description={category.description} crumbs={[{ label: "Home", href: "/" }, { label: category.name }]} image={category.heroImage ?? category.image} cta={{ label: "Explore Collection", href: "#products" }} />
      <div id="products" className="container-x section-y-sm scroll-mt-24"><Catalogue products={getProductsByCategory(category.id)} showDepartments={false} initial={{ categoryIds: [category.id] }} /></div>
    </>
  );
}

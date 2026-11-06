import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductEnquiry } from "@/components/product/ProductEnquiry";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { getCategoryById, getSubcategory } from "@/lib/categories";
import { discountPercent, getProductBySlug, isOnSale } from "@/lib/products";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return buildMetadata({ title: p.seo.title, description: p.seo.description, path: `/products/${p.slug}/`, image: p.images[0].src });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategoryById(product.categoryId)!;
  const sub = getSubcategory(product.categoryId, product.subcategoryId);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: category.name, path: `/categories/${category.slug}/` }, { name: product.name, path: `/products/${product.slug}/` }])} />
      {/* Product structured data is emitted only for genuine (non-sample) products. */}
      {!product.sample && <JsonLd data={productJsonLd(product)} />}
      <div className="container-x pb-28 pt-5 lg:pb-8 lg:pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: category.name, href: `/categories/${category.slug}/` }, ...(sub ? [{ label: sub.name, href: `/categories/${category.slug}/?sub=${sub.id}` }] : []), { label: product.name }]} />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <div className="lg:pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/categories/${category.slug}/`} className="text-[13px] text-muted hover:text-ink hover:underline">{category.name}</Link>
              {product.newArrival && <Badge tone="new">New</Badge>}
              {isOnSale(product) && <Badge tone="sale">-{discountPercent(product)}%</Badge>}
              {product.sample && <Badge tone="muted">Sample product</Badge>}
            </div>
            <h1 className="mb-3 mt-3 text-[clamp(1.85rem,7vw,3.25rem)] font-normal">{product.name}</h1>
            <p className="mb-6 max-w-[52ch] text-muted">{product.shortDescription}</p>
            <ProductPurchase product={product} stickyMode="viewport" />
            <ProductEnquiry product={product} />
            <p className="mt-8 border-t border-line pt-5 text-[13.5px] text-muted">{siteConfig.delivery.defaultMessage}</p>
            {product.sample && <p className="mt-3 text-[13px] text-muted">{siteConfig.sampleCatalogue.notice}</p>}
          </div>
        </div>
        <div className="mt-16"><ProductTabs product={product} /></div>
        <RelatedProducts product={product} />
        <RecentlyViewed currentSlug={product.slug} />
      </div>
    </>
  );
}

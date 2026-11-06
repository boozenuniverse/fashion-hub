import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { ArticleContent } from "@/components/editorial/ArticleContent";
import { ArticleHeader } from "@/components/editorial/ArticleHeader";
import { ShareLinks } from "@/components/editorial/ShareLinks";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles, getArticleBySlug } from "@/data/journal";
import { getProductBySlug } from "@/lib/products";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Product } from "@/types/product";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] { return articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.excerpt, path: `/journal/${a.slug}/`, image: a.image, type: "article" });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const related = article.relatedProductSlugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p));
  const moreArticles = articles.filter((a) => a.slug !== article.slug).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 3);
  return (
    <article>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/journal/" }, { name: article.title, path: `/journal/${article.slug}/` }])} />
      <ArticleHeader article={article} />
      <div className="container-x section-y-sm"><ArticleContent blocks={article.blocks} /><div className="mt-12"><ShareLinks title={article.title} path={`/journal/${article.slug}/`} /></div></div>
      {related.length > 0 && <section className="bg-sand-light section-y-sm"><div className="container-x"><SectionHeading title="Shop the story" /><ProductGrid products={related} columns="three" /></div></section>}
      <section className="section-y-sm"><div className="container-x"><SectionHeading title="Keep reading" /><div className="grid gap-10 md:grid-cols-3">{moreArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div></div></section>
    </article>
  );
}

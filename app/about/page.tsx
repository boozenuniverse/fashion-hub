import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About Fashion Hub", description: "The story, philosophy and values behind Fashion Hub, a fashion, beauty and lifestyle destination.", path: "/about/" });

const values = [
  ["Curated", "We would rather offer a considered selection than an endless one. Each department is edited so that choosing is a pleasure."],
  ["Complete", "Clothing, fabrics, shoes, bags, jewellery, watches, hair and beauty sit together, so a whole look can come from one place."],
  ["Clear", "Honest descriptions, plain information about delivery and returns, and a straightforward way to ask us anything."],
];

export default function AboutPage() {
  return (
    <>
      <CategoryHeader title="About Fashion Hub" tagline={siteConfig.tagline} description="A fashion, beauty and lifestyle destination for people who like to dress with intention." crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <div className="container-x section-y-sm">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-t-[999px] rounded-b-[3px] bg-sand-light"><Img src="/images/categories/women-hero.webp" alt="A woman in a burgundy satin gown, sample photograph." className="absolute inset-0 h-full w-full object-cover object-[60%_30%]" /></div>
          <div>
            <h2 className="statement">Elegance is not reserved for special occasions.</h2>
            <p className="lead mt-5">Fashion Hub was imagined as a place where everyday dressing and special occasions meet: tailored clothing and fabrics for your tailor, shoes and bags for the finishing touch, and hair and beauty to complete the picture.</p>
            <p className="lead mt-4">Our philosophy is simple. Pieces should be beautiful, comfortable to live in and honestly described. We believe confidence comes from feeling at ease in what you wear.</p>
          </div>
        </div>
        <section aria-labelledby="values-title" className="mt-20">
          <h2 id="values-title" className="h-section mb-10">What we value</h2>
          <ul className="grid gap-10 md:grid-cols-3">{values.map(([t, d]) => <li key={t} className="border-t-2 border-taupe pt-5"><h3 className="text-[2rem]">{t}</h3><p className="mt-2 text-muted">{d}</p></li>)}</ul>
        </section>
        <div className="mt-16 flex flex-wrap gap-3"><Button href="/shop/">Explore the collection</Button><Button href="/contact/" variant="outline">Get in touch</Button></div>
      </div>
    </>
  );
}

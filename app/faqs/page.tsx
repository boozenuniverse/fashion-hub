import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Accordion } from "@/components/ui/Accordion";
import { faqGroups } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "FAQs", description: "Answers to common questions about ordering, delivery, sizing and returns at Fashion Hub.", path: "/faqs/" });

export default function FaqPage() {
  return (
    <>
      <CategoryHeader title="Frequently asked questions" description="Quick answers about enquiries, delivery, sizing and returns." crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <div className="container-x section-y-sm mx-auto max-w-3xl space-y-14">
        {faqGroups.map((g) => (
          <section key={g.title} aria-labelledby={`faq-${g.title}`}>
            <h2 id={`faq-${g.title}`} className="mb-4 text-[2.2rem]">{g.title}</h2>
            <Accordion items={g.items.map((i) => ({ q: i.q, a: i.a }))} />
          </section>
        ))}
      </div>
    </>
  );
}

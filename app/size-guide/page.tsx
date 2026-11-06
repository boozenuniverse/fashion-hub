import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { measuringSteps, sizeTables } from "@/data/size-guide";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Size guide", description: "Indicative size charts for women's and men's clothing, shoes and rings, with measuring tips.", path: "/size-guide/" });

export default function SizeGuidePage() {
  return (
    <>
      <CategoryHeader title="Size guide" description="Indicative measurements to help you choose. Sizing varies between makers, so check the details on each product or ask us." crumbs={[{ label: "Home", href: "/" }, { label: "Size guide" }]} />
      <div className="container-x section-y-sm space-y-16">
        <section aria-labelledby="measure-title" className="max-w-3xl">
          <h2 id="measure-title" className="text-[2.2rem]">How to measure</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 marker:text-taupe">{measuringSteps.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>
        {sizeTables.map((t) => (
          <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-32">
            <h2 id={`${t.id}-title`} className="text-[2.2rem]">{t.title}</h2>
            <p className="mb-4 mt-1 text-muted">{t.note}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-[15px]">
                <caption className="sr-only">{t.title} size chart</caption>
                <thead><tr className="border-b-2 border-ink">{t.head.map((h) => <th key={h} scope="col" className="py-3 pr-6 font-semibold text-ink">{h}</th>)}</tr></thead>
                <tbody>{t.rows.map((r) => <tr key={r[0]} className="border-b border-line">{r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="py-3 pr-6 font-semibold text-ink">{c}</th> : <td key={i} className="py-3 pr-6 text-charcoal">{c}</td>))}</tr>)}</tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { policyNotice, type Policy } from "@/data/policies";

export function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <div className="container-x section-y-sm">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: policy.title }]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="h-page">{policy.title}</h1>
        <p className="lead mt-3">{policy.intro}</p>
        <p role="note" className="mt-6 border-l-2 border-taupe bg-sand-light px-4 py-3 text-[14px] text-ink">{policyNotice}</p>
        <div className="mt-10 space-y-10">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[2rem]">{s.heading}</h2>
              {s.body.map((p) => <p key={p} className="mt-3 text-[16px] leading-relaxed text-charcoal">{p}</p>)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

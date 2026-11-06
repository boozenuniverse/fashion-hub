import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { hasContact, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact", description: "Contact Fashion Hub with questions about products, sizing, delivery or orders.", path: "/contact/" });

const Row = ({ label, value, href }: { label: string; value: string; href?: string }) => (
  <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-line py-3">
    <dt className="text-muted">{label}</dt>
    <dd>{value ? (href ? <a href={href} className="link-quiet">{value}</a> : <span className="text-ink">{value}</span>) : <span className="text-muted">To be added (config/site.ts)</span>}</dd>
  </div>
);

export default function ContactPage() {
  const c = siteConfig.contact;
  return (
    <>
      <CategoryHeader title="Contact" description="Questions about a product, sizing, delivery or an enquiry? We would love to help." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="container-x section-y-sm grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="details-title">
          <h2 id="details-title" className="text-[2rem]">Our details</h2>
          <dl className="mt-4 border-t border-line">
            <Row label="Email" value={c.email} href={hasContact.email() ? `mailto:${c.email}` : undefined} />
            <Row label="Phone" value={c.phone} href={hasContact.phone() ? `tel:${c.phone.replace(/\s/g, "")}` : undefined} />
            <Row label="WhatsApp" value={c.whatsapp} />
            <Row label="Address" value={c.address} />
            <Row label="Hours" value={c.hours} />
          </dl>
          <h3 className="mt-8 text-[1.6rem]">Follow us</h3>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {Object.entries(siteConfig.social).map(([n, url]) => { const label = n.charAt(0).toUpperCase() + n.slice(1); return <li key={n}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="link-quiet">{label}<span className="sr-only"> (opens in a new tab)</span></a> : <span className="text-muted">{label} (to be added)</span>}</li>; })}
          </ul>
        </section>
        <section aria-labelledby="form-title">
          <h2 id="form-title" className="text-[2rem]">Send a message</h2>
          <p className="mb-6 mt-1 text-muted">Write your message and we will prepare it for WhatsApp or email. This website does not send messages itself.</p>
          <ContactForm />
        </section>
      </div>
    </>
  );
}

import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "How order enquiries work", description: "How to order from Fashion Hub using an enquiry, and what this website does and does not do.", path: "/order-enquiry/" });

const steps = [
  ["Fill your bag", "Choose your colours, sizes and options and add pieces to your bag."],
  ["Prepare your enquiry", "Enter your delivery details at checkout. We format your order into a message."],
  ["Send it to Fashion Hub", "Send the message by WhatsApp or email, or copy it into the channel you prefer."],
  ["Confirm with the team", "The team confirms availability, delivery cost and timing, and how to pay."],
];

export default function OrderEnquiryPage() {
  return (
    <>
      <CategoryHeader title="How order enquiries work" description={`${siteConfig.name} takes orders by enquiry while the online store is in its first stage.`} crumbs={[{ label: "Home", href: "/" }, { label: "Order enquiries" }]} />
      <div className="container-x section-y-sm">
        <ol className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {steps.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 py-6"><span aria-hidden="true" className="font-serif text-[2.2rem] text-taupe">{i + 1}</span><div><h2 className="text-[1.7rem]"><span className="sr-only">Step {i + 1}: </span>{t}</h2><p className="mt-1 text-muted">{d}</p></div></li>
          ))}
        </ol>
        <div className="mx-auto mt-10 max-w-3xl rounded-[4px] border border-taupe/70 bg-sand-light p-6">
          <h2 className="text-[1.7rem]">What this website does not do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink marker:text-taupe">
            <li>It does not take payment or confirm that an order has been placed.</li>
            <li>It cannot confirm that your message reached the business. Your enquiry is received only when you send it and the team replies.</li>
            <li>It does not store your order or your delivery details. Your bag and wishlist stay in your own browser.</li>
          </ul>
        </div>
        <div className="mt-10 text-center"><Button href="/shop/">Continue shopping</Button></div>
      </div>
    </>
  );
}

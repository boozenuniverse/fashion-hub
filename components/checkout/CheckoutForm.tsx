"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { Button } from "@/components/ui/Button";
import { ghanaRegions } from "@/config/business";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/currency";
import { emptyCheckout, validateCheckout } from "@/lib/validation";
import { buildEnquiryMessage } from "@/lib/whatsapp";
import type { CheckoutErrors, CheckoutValues } from "@/types/cart";
import { CustomerInformation } from "./CustomerInformation";
import { DeliveryInformation } from "./DeliveryInformation";
import { EnquiryReview } from "./EnquiryReview";
import { OrderSummary } from "./OrderSummary";

const STEPS = [
  { id: 1, label: "Details", keys: ["fullName", "email", "phone"] },
  { id: 2, label: "Delivery", keys: ["region", "city", "address", "instructions"] },
  { id: 3, label: "Review", keys: ["acknowledged"] },
] as const;

/**
 * Enquiry checkout split into three single-screen steps (fewer decisions per screen).
 * Personal details live only in component state (never localStorage) and are only placed into a message
 * the customer chooses to send. There is no payment and no order storage.
 */
export function CheckoutForm() {
  const { lines, totals, hydrated, clear } = useCart();
  const [values, setValues] = useState<CheckoutValues>(emptyCheckout);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [message, setMessage] = useState<string | null>(null);

  if (!hydrated) return <div className="min-h-[50vh] animate-pulse rounded-[10px] bg-sand-light" aria-busy="true" aria-label="Loading your bag" role="status" />;
  if (lines.length === 0) return <CartEmptyState />;

  const blocked = lines.some((l) => l.unavailable);
  const patch = (p: Partial<CheckoutValues>) => { setValues((v) => ({ ...v, ...p })); setErrors((e) => { const next = { ...e }; for (const k of Object.keys(p) as (keyof CheckoutValues)[]) delete next[k]; return next; }); };

  /** Validates only the current step's fields; focuses the first problem. */
  function validateStep(s: 1 | 2 | 3): boolean {
    const all = validateCheckout(values, ghanaRegions);
    const keys = STEPS[s - 1].keys as readonly (keyof CheckoutValues)[];
    const mine: CheckoutErrors = {};
    for (const k of keys) if (all[k]) mine[k] = all[k];
    setErrors(mine);
    const first = keys.find((k) => mine[k]);
    if (first) { document.getElementById(first)?.focus(); return false; }
    return true;
  }

  const goTo = (s: 1 | 2 | 3) => { setStep(s); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const next = () => { if (validateStep(step)) goTo((step + 1) as 2 | 3); };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 3) { next(); return; }
    if (blocked || !validateStep(3)) return;
    setMessage(buildEnquiryMessage({ brand: siteConfig.name, customer: values, lines, totals }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const errorList = Object.entries(errors);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
      <div className="min-w-0">
        <div role="note" className="mb-5 rounded-[10px] border border-taupe/60 bg-sand-light p-3.5 text-[13.5px] text-ink">
          <strong>Enquiry checkout (demonstration).</strong> No payment is taken and no order is placed on this website. You prepare an enquiry to send to {siteConfig.name}, who confirm availability, delivery and payment with you.
        </div>

        {/* Order summary: collapsed on phones, sidebar on desktop */}
        <details className="group mb-5 rounded-[10px] border border-line bg-paper lg:hidden">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between px-4 text-[14px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span>Order summary ({totals.itemCount} {totals.itemCount === 1 ? "item" : "items"})</span>
            <span className="flex items-center gap-2 font-bold text-burgundy">{formatPrice(totals.total)}<ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-open:rotate-180" /></span>
          </summary>
          <div className="border-t border-line p-3"><OrderSummary lines={lines} totals={totals} bare /></div>
        </details>

        {message ? (
          <EnquiryReview message={message} onEdit={() => { setMessage(null); setStep(1); }} onClear={() => { clear(); setMessage(null); }} />
        ) : (
          <>
            <ol aria-label="Checkout steps" className="mb-6 grid grid-cols-3 gap-2">
              {STEPS.map((s) => {
                const state = s.id === step ? "current" : s.id < step ? "done" : "todo";
                return (
                  <li key={s.id} aria-current={state === "current" ? "step" : undefined} className="flex flex-col gap-1.5">
                    <span className={`h-1 rounded-full ${state === "todo" ? "bg-line" : "bg-burgundy"}`} />
                    <span className={`text-[12.5px] ${state === "current" ? "font-semibold text-burgundy" : "text-muted"}`}>{s.id}. {s.label}</span>
                  </li>
                );
              })}
            </ol>

            <form onSubmit={onSubmit} noValidate className="space-y-6">
              {errorList.length > 0 && (
                <div role="alert" className="rounded-[10px] border border-[#9b2c2c]/40 bg-[#9b2c2c]/5 p-3.5 text-[14px] text-[#7a2a22]">
                  <p className="font-semibold">Please check the highlighted fields.</p>
                  <ul className="mt-1 list-disc pl-5">{errorList.map(([k, m]) => <li key={k}>{m}</li>)}</ul>
                </div>
              )}
              {blocked && <p role="alert" className="rounded-[10px] border border-[#9b2c2c]/40 bg-[#9b2c2c]/5 p-3.5 text-[14px] text-[#7a2a22]">One or more items in your bag are unavailable. Please <Link href="/bag/" className="underline">review your bag</Link> and remove them to continue.</p>}

              {step === 1 && <CustomerInformation values={values} errors={errors} onChange={patch} />}
              {step === 2 && <DeliveryInformation values={values} errors={errors} onChange={patch} />}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-[1.6rem] text-ink">Review your enquiry</h2>
                  <dl className="divide-y divide-line rounded-[10px] border border-line bg-paper text-[14px]">
                    {([["Name", values.fullName, 1], ["Email", values.email, 1], ["Phone", values.phone, 1], ["Region", values.region, 2], ["City or town", values.city, 2], ["Address", values.address, 2]] as const).map(([k, v, s]) => (
                      <div key={k} className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-start gap-2 px-4 py-2.5"><dt className="text-muted">{k}</dt><dd className="break-words text-ink">{v}</dd><button type="button" onClick={() => goTo(s)} className="-my-1.5 min-h-[44px] px-1 text-[13px] text-burgundy underline">Edit</button></div>
                    ))}
                  </dl>
                  <div>
                    <label htmlFor="acknowledged" className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] text-charcoal">
                      <input id="acknowledged" type="checkbox" checked={values.acknowledged} onChange={(e) => patch({ acknowledged: e.target.checked })} aria-invalid={errors.acknowledged ? true : undefined} aria-describedby={errors.acknowledged ? "acknowledged-error" : undefined} className="mt-0.5 h-5 w-5 shrink-0 accent-[#531C22]" />
                      <span>I understand this is an order enquiry, not a payment, and that my enquiry is only received when I send the prepared message.</span>
                    </label>
                    {errors.acknowledged && <p id="acknowledged-error" className="mt-1.5 text-[13px] font-medium text-[#9b2c2c]">{errors.acknowledged}</p>}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                {step > 1 && <button type="button" onClick={() => goTo((step - 1) as 1 | 2)} className="min-h-[46px] px-3 text-[14px] text-ink underline">Back</button>}
                <Button type="submit" disabled={step === 3 && blocked} className="flex-1 sm:flex-none">{step < 3 ? "Continue" : "Prepare my enquiry"}</Button>
              </div>
            </form>
          </>
        )}
      </div>
      <aside className="hidden lg:block"><OrderSummary lines={lines} totals={totals} /></aside>
    </div>
  );
}

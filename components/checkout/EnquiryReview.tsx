import { SendChannels } from "@/components/forms/SendChannels";
import { siteConfig } from "@/config/site";

export function EnquiryReview({ message, onEdit, onClear }: { message: string; onEdit: () => void; onClear: () => void }) {
  return (
    <section aria-labelledby="review-title" className="space-y-6">
      <div role="status" className="rounded-[4px] border border-taupe bg-sand-light p-5">
        <h2 id="review-title" className="font-serif text-[2rem] text-ink">Your enquiry is ready to send</h2>
        <p className="mt-2 text-ink"><strong>Nothing has been sent yet, and no payment has been taken.</strong> {siteConfig.name} only receives your enquiry when you send the message below. The team will then confirm availability, delivery and payment with you.</p>
      </div>
      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink">Enquiry message</p>
        <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap rounded-[3px] border border-line bg-paper p-4 font-sans text-[14px] leading-relaxed text-charcoal">{message}</pre>
      </div>
      <SendChannels message={message} subject={`Order enquiry - ${siteConfig.name}`} />
      <div className="flex flex-wrap gap-4 border-t border-line pt-5 text-[14px]">
        <button type="button" onClick={onEdit} className="link-quiet">Edit my details</button>
        <button type="button" onClick={onClear} className="link-quiet">Clear my bag after sending</button>
      </div>
    </section>
  );
}

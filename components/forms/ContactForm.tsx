"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/validation";
import { SendChannels } from "./SendChannels";

/** Prepares a message for WhatsApp/email. This website has no backend and does not send or store anything. */
export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (v.name.trim().length < 2) found.name = "Enter your name.";
    if (!isValidEmail(v.email)) found.email = "Enter a valid email address.";
    if (v.message.trim().length < 10) found.message = "Tell us a little more (at least 10 characters).";
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) { document.getElementById(`contact-${first}`)?.focus(); return; }
    setMessage(`Hello ${siteConfig.name},\n\n${v.message.trim()}\n\nName: ${v.name.trim()}\nEmail: ${v.email.trim()}`);
  }

  if (message) {
    return (
      <div className="space-y-5">
        <div role="status" className="rounded-[4px] border border-taupe bg-sand-light p-5">
          <p className="font-serif text-[1.8rem] text-ink">Your message is ready to send</p>
          <p className="mt-1 text-ink"><strong>Nothing has been sent yet.</strong> This website cannot send messages itself. Choose a channel below to send it.</p>
        </div>
        <pre className="whitespace-pre-wrap rounded-[3px] border border-line bg-paper p-4 font-sans text-[14px]">{message}</pre>
        <SendChannels message={message} subject={`Enquiry - ${siteConfig.name}`} />
        <button type="button" onClick={() => setMessage(null)} className="link-quiet text-[14px]">Edit my message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input id="contact-name" label="Your name" autoComplete="name" value={v.name} error={errors.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
      <Input id="contact-email" label="Email" type="email" autoComplete="email" value={v.email} error={errors.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
      <TextArea id="contact-message" label="How can we help?" value={v.message} error={errors.message} onChange={(e) => setV({ ...v, message: e.target.value })} />
      <Button type="submit">Prepare my message</Button>
    </form>
  );
}

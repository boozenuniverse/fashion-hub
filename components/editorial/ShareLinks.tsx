"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { absoluteUrl } from "@/lib/seo";

export function ShareLinks({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path);
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
  ];
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  }
  return (
    <div className="mx-auto flex max-w-[68ch] flex-wrap items-center gap-3 border-y border-line py-5">
      <p className="mr-2 text-[14px] font-semibold text-ink">Share this story</p>
      {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">{l.label}<span className="sr-only"> (opens in a new tab)</span></a>)}
      <button type="button" onClick={copy} className="btn btn-outline btn-sm">{copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Link2 aria-hidden="true" className="h-4 w-4" />}{copied ? "Link copied" : "Copy link"}</button>
    </div>
  );
}

"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopLink() {
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-1.5 font-serif text-[1rem] italic text-sand hover:text-cream">
      Back to Top <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  );
}

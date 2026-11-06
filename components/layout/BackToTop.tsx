"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-20 right-4 lg:bottom-5 lg:right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-ink text-cream shadow-lg transition-colors hover:bg-wine">
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}

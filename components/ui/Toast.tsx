"use client";

import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function ToastViewport() {
  const { toasts, dismissToast } = useUI();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 lg:bottom-4 z-[90] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className={`pointer-events-auto flex max-w-md items-center gap-3 rounded-[4px] px-4 py-3 text-[14px] shadow-lg ${t.tone === "error" ? "bg-[#7a2a22] text-cream" : "bg-ink text-cream"}`}>
          <span>{t.message}</span>
          <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification" className="-mr-1 grid h-8 w-8 place-items-center text-sand hover:text-cream"><X aria-hidden="true" className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );
}

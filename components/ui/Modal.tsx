"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useDialog } from "@/hooks/useDialog";

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode; maxWidthClass?: string; hideTitle?: boolean }

/** Centered dialog on large screens; a bottom sheet that always fits the viewport on phones. */
export function Modal({ open, onClose, title, children, maxWidthClass = "max-w-5xl", hideTitle = true }: Props) {
  const ref = useDialog(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div key="modal" className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div className="absolute inset-0 bg-ink/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
            className={`relative max-h-[90dvh] w-full min-w-0 ${maxWidthClass} overflow-y-auto overflow-x-hidden overscroll-contain rounded-t-[20px] bg-cream shadow-2xl sm:rounded-[8px]`}
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-1 top-1 z-20 grid h-11 w-11 place-items-center rounded-full text-ink hover:text-burgundy"><span className="grid h-8 w-8 place-items-center rounded-full bg-cream/90 shadow-sm"><X aria-hidden="true" className="h-[18px] w-[18px]" /></span></button>
            {!hideTitle && <h2 className="px-6 pt-6 font-serif text-3xl">{title}</h2>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

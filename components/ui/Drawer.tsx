"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useDialog } from "@/hooks/useDialog";

type Side = "left" | "right" | "bottom";
interface Props { open: boolean; onClose: () => void; title: string; side?: Side; children: ReactNode; widthClass?: string }

const panel: Record<Side, string> = {
  right: "inset-y-0 right-0 w-full",
  left: "inset-y-0 left-0 w-full",
  bottom: "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[20px]",
};
const offscreen = (side: Side) => (side === "right" ? { x: "100%" } : side === "left" ? { x: "-100%" } : { y: "100%" });

/** Slide-in panel. `bottom` is a thumb-friendly sheet used for mobile menus, filters and search. */
export function Drawer({ open, onClose, title, side = "right", children, widthClass = "max-w-[440px]" }: Props) {
  const ref = useDialog(open, onClose);
  const bottom = side === "bottom";
  return (
    <AnimatePresence>
      {open && (
        <div key="drawer" className="fixed inset-0 z-[70]">
          <motion.div className="absolute inset-0 bg-ink/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
            className={`absolute flex flex-col overflow-hidden bg-cream shadow-2xl ${panel[side]} ${bottom ? "" : widthClass}`}
            initial={offscreen(side)} animate={{ x: 0, y: 0 }} exit={offscreen(side)} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {bottom && <span aria-hidden="true" className="mx-auto mt-2 block h-1 w-10 shrink-0 rounded-full bg-line" />}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-1.5">
              <h2 className="font-serif text-[1.4rem] leading-none">{title}</h2>
              <button type="button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`} className="-mr-3 grid h-11 w-11 place-items-center text-ink hover:text-burgundy"><X aria-hidden="true" className="h-5 w-5" /></button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

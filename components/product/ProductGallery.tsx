"use client";

import { Expand } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const current = images[active] ?? images[0];

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr]">
      <ul className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible" aria-label={`${name} images`}>
        {images.map((img, i) => (
          <li key={img.src} className="w-[72px] shrink-0 md:w-full">
            <button type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1} of ${images.length}`} aria-current={i === active} className={`relative block aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-sand-light ring-offset-2 ${i === active ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-stone"}`}>
              <Img src={img.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <div className="order-1 md:order-2">
        <div className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-[3px] bg-sand-light" onMouseMove={onMove} onClick={() => setZoomOpen(true)}>
          <Img src={current.src} alt={current.alt} priority className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 md:group-hover:scale-[1.6]" style={{ transformOrigin: origin }} />
          <button type="button" onClick={(e) => { e.stopPropagation(); setZoomOpen(true); }} aria-label="Enlarge image" className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-paper/95 text-ink shadow hover:text-wine"><Expand aria-hidden="true" className="h-5 w-5" /></button>
        </div>
      </div>
      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)} title={`${name}, enlarged image`} maxWidthClass="max-w-3xl">
        <Img src={current.src} alt={current.alt} className="mx-auto max-h-[88vh] w-auto" />
      </Modal>
    </div>
  );
}

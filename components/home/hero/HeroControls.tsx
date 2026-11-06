"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/data/hero";

interface Props { slides: HeroSlide[]; index: number; playing: boolean; desktopTone: "dark" | "light"; onSelect: (i: number) => void; onPrev: () => void; onNext: () => void; onToggle: () => void }

export function HeroControls({ slides, index, playing, desktopTone, onSelect, onPrev, onNext, onToggle }: Props) {
  const dark = desktopTone === "dark";
  const dot = (active: boolean) => `block rounded-full transition-all duration-300 ${active ? "h-[10px] w-[10px] bg-sand md:w-[10px]" : "h-[8px] w-[8px] bg-cream/45"} ${dark ? (active ? "md:bg-burgundy" : "md:bg-burgundy/35") : ""}`;
  const round = `grid h-11 w-11 place-items-center rounded-full border transition-colors border-cream/50 text-cream hover:bg-cream hover:text-ink ${dark ? "md:border-wine/60 md:text-wine md:hover:bg-burgundy md:hover:text-cream" : ""}`;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="container-x flex items-center justify-center gap-3 pb-0 md:justify-end md:pb-4">
        <ul className="pointer-events-auto flex items-center" aria-label="Choose slide">
          {slides.map((s, i) => (
            <li key={s.id}><button type="button" onClick={() => onSelect(i)} aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === index} className="grid h-11 w-7 place-items-center"><span className={dot(i === index)} /></button></li>
          ))}
        </ul>
        <div className="pointer-events-auto flex items-center gap-2 md:ml-3">
          <button type="button" onClick={onToggle} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className={`${round} hidden md:grid`}>{playing ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}</button>
          <button type="button" onClick={onPrev} aria-label="Previous slide" className={`${round} hidden md:grid`}><ChevronLeft aria-hidden="true" className="h-[18px] w-[18px]" /></button>
          <button type="button" onClick={onNext} aria-label="Next slide" className={`${round} hidden md:grid`}><ChevronRight aria-hidden="true" className="h-[18px] w-[18px]" /></button>
        </div>
        {/* Mobile keeps a small pause control (WCAG: moving content must be pausable). */}
        <button type="button" onClick={onToggle} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className="pointer-events-auto absolute right-1 bottom-0 grid h-11 w-11 place-items-center text-cream md:hidden"><span className="grid h-8 w-8 place-items-center rounded-full border border-cream/50">{playing ? <Pause aria-hidden="true" className="h-3 w-3" /> : <Play aria-hidden="true" className="h-3 w-3" />}</span></button>
      </div>
    </div>
  );
}

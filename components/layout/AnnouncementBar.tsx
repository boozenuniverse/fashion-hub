"use client";

import { ChevronRight, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const Sparkle = () => <span aria-hidden="true" className="text-[11px] text-taupe">&#10022;</span>;

export function AnnouncementBar() {
  const messages = siteConfig.announcements;
  const links = siteConfig.topBarLinks;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (messages.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % messages.length), 6500);
    return () => window.clearInterval(t);
  }, [messages.length, paused]);

  if (messages.length === 0) return null;
  const next = () => setIndex((i) => (i + 1) % messages.length);

  return (
    <div className="on-dark bg-burgundy text-cream" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="container-x flex min-h-[34px] items-center justify-between gap-2 py-1">
        <span aria-hidden="true" className="hidden lg:block lg:w-[260px]" />
        <p className="flex flex-1 items-center justify-center gap-2.5 text-center font-serif text-[0.8rem] leading-tight min-[400px]:text-[0.9rem] md:text-[1.05rem]">
          <Truck aria-hidden="true" className="h-4 w-4 shrink-0 text-taupe md:hidden" strokeWidth={1.6} />
          <span aria-hidden="true" className="hidden h-px w-10 bg-taupe/60 md:block" /><span className="hidden md:inline"><Sparkle /></span>
          <span>{messages[index]}</span>
          <span className="hidden md:inline"><Sparkle /></span><span aria-hidden="true" className="hidden h-px w-10 bg-taupe/60 md:block" />
        </p>
        <ul className="hidden items-center justify-end gap-3 font-ui text-[12px] text-sand lg:flex lg:w-[260px]">
          {links.map((l, i) => <li key={l} className="flex items-center gap-3">{i > 0 && <span aria-hidden="true" className="h-3 w-px bg-sand/40" />}<span>{l}</span></li>)}
        </ul>
        {messages.length > 1 && <button type="button" onClick={next} aria-label="Next announcement" className="-mr-2 grid h-9 w-9 shrink-0 place-items-center text-cream md:hidden"><ChevronRight aria-hidden="true" className="h-[18px] w-[18px]" /></button>}
      </div>
    </div>
  );
}

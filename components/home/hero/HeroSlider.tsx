"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type TouchEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { heroSlides, type HeroSlide } from "@/data/hero";
import { withBasePath } from "@/lib/paths";
import { HeroControls } from "./HeroControls";
import { photoVariants, reducedVariants, textContainer, textItem } from "./transitions";

const DURATION_MS = 7500;

// Static class maps so Tailwind can see every class.
const titleTone = { dark: "md:text-burgundy", light: "md:text-cream" } as const;
const subTone = { dark: "md:text-charcoal", light: "md:text-sand" } as const;
const eyebrowTone = { dark: "md:text-wine", light: "md:text-sand" } as const;
const ruleTone = { dark: "md:bg-wine/50", light: "md:bg-sand/60" } as const;
const scrimDesktop = {
  "dark-left": "", "dark-right": "",
  "light-left": "md:bg-gradient-to-r md:from-ink/70 md:via-ink/25 md:to-transparent",
  "light-right": "md:bg-gradient-to-l md:from-ink/70 md:via-ink/25 md:to-transparent",
} as const;

function Sparkle({ className, size }: { className: string; size: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.100 11.300 11.300 7.100 12 1.500Z" /></svg>;
}

/**
 * Photo hero with several slides. Each slide has its own copy, photography (desktop + mobile), text side,
 * tone and transition (fade, fade-right, fade-left, drop, rise, flip). Photo, copy and sparkles sit on
 * separate CSS-3D depth layers that follow the mouse. Autoplay pauses on hover/focus and via the pause
 * button; with "reduce motion" it starts paused and uses plain cross-fades.
 */
export function HeroSlider() {
  const slides = heroSlides;
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => { if (reduce) setPlaying(false); }, [reduce]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.7 });
  const photoX = useTransform(sx, [-1, 1], [14, -14]);
  const photoY = useTransform(sy, [-1, 1], [8, -8]);
  const photoRotY = useTransform(sx, [-1, 1], [-1.6, 1.6]);
  const photoRotX = useTransform(sy, [-1, 1], [1.2, -1.2]);
  const textX = useTransform(sx, [-1, 1], [-8, 8]);
  const sparkX = useTransform(sx, [-1, 1], [-28, 28]);
  const sparkY = useTransform(sy, [-1, 1], [-16, 16]);

  const go = useCallback((i: number) => setIndex(((i % slides.length) + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  const running = playing && !hovered && !focused;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(next, DURATION_MS);
    return () => window.clearTimeout(t);
  }, [running, index, next]);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  const onPointerLeave = () => { px.set(0); py.set(0); setHovered(false); };
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  }
  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0].clientX; };
  function onTouchEnd(e: TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  }

  const slide: HeroSlide = slides[index];
  const d = slide.desktop;
  const photo = reduce ? reducedVariants : photoVariants[slide.transition];
  const item = reduce ? reducedVariants : textItem(slide.transition);
  const container = reduce ? { enter: {}, center: {}, exit: {} } : textContainer;
  const side = d.textSide;

  return (
    <section
      aria-roledescription="carousel" aria-label="Featured collections"
      className="on-dark relative isolate h-[clamp(280px,68vw,340px)] overflow-hidden bg-burgundy text-cream md:h-[clamp(400px,34vw,560px)]"
      onPointerMove={onPointerMove} onPointerEnter={() => setHovered(true)} onPointerLeave={onPointerLeave}
      onFocus={() => setFocused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
      onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">{siteConfig.name}: {siteConfig.tagline}</h1>
      <div aria-live={playing ? "off" : "polite"} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <div key={slide.id} className="absolute inset-0" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
            {/* Photo layer (3D: transition wrapper > pointer parallax) */}
            <div className="absolute inset-0" style={{ perspective: 1300 }}>
              <motion.div className="absolute inset-0" variants={photo} initial="enter" animate="center" exit="exit" style={{ transformStyle: "preserve-3d" }}>
                <motion.div className="absolute inset-0" style={reduce ? undefined : { x: photoX, y: photoY, rotateX: photoRotX, rotateY: photoRotY, scale: 1.08 }}>
                  <picture>
                    <source media="(max-width: 767px)" srcSet={withBasePath(slide.mobile.image)} />
                    <img src={withBasePath(d.image)} alt={slide.alt} decoding="async" {...(index === 0 ? { fetchPriority: "high" as const } : {})} className={`h-full w-full object-cover ${side === "right" ? "md:object-left" : "md:object-right"} object-right`} />
                  </picture>
                </motion.div>
              </motion.div>
            </div>

            {/* Legibility scrims: mobile always; desktop only for light text */}
            <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/15 to-transparent md:bg-none ${scrimDesktop[`${d.tone}-${side}` as keyof typeof scrimDesktop]}`} />

            {/* Sparkles: closest depth layer */}
            {!reduce && (
              <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block" style={{ x: sparkX, y: sparkY }}>
                <motion.span className={`absolute top-[18%] text-taupe ${side === "right" ? "left-[40%]" : "left-[56%]"}`} animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><Sparkle className="" size={18} /></motion.span>
                <motion.span className={`absolute bottom-[22%] text-sand ${side === "right" ? "left-[46%]" : "left-[50%]"}`} animate={{ y: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}><Sparkle className="" size={11} /></motion.span>
              </motion.div>
            )}

            {/* Copy */}
            <div className="container-x relative z-10 flex h-full items-center pb-6 md:pb-0">
              <motion.div className={`w-[62%] max-w-[560px] md:w-[44%] md:text-center ${side === "right" ? "md:ml-auto md:mr-[2%]" : "md:ml-[2%] md:mr-auto"}`} variants={container} initial="enter" animate="center" exit="exit" style={{ perspective: 900, ...(reduce ? {} : { x: textX }) }}>
                <motion.p variants={item} className={`flex items-center gap-3 font-ui text-[10.5px] font-medium uppercase tracking-[0.24em] text-sand md:justify-center md:text-[12px] ${eyebrowTone[d.tone]}`}>
                  <span aria-hidden="true" className={`hidden h-px w-10 bg-sand/60 md:block ${ruleTone[d.tone]}`} />
                  <span>{slide.eyebrow}</span>
                  <span aria-hidden="true" className={`h-px flex-1 bg-taupe md:w-10 md:flex-none ${ruleTone[d.tone]}`} />
                </motion.p>
                <motion.h2 variants={item} className={`mt-2.5 font-serif text-[clamp(1.5rem,7.2vw,2.1rem)] font-medium leading-[1.02] tracking-[-0.01em] text-cream md:mt-4 md:text-[clamp(2.6rem,4.7vw,4.4rem)] md:uppercase md:leading-[1.02] md:tracking-[0.015em] ${titleTone[d.tone]}`}>{slide.title}</motion.h2>
                <motion.p variants={item} className={`mt-1.5 font-serif text-[0.85rem] italic leading-snug text-cream min-[400px]:text-[0.95rem] md:mt-4 md:text-[1.45rem] ${subTone[d.tone]}`}>
                  <span className="md:hidden">{slide.subtitleMobile ?? slide.subtitle}</span><span className="hidden md:inline">{slide.subtitle}</span>
                </motion.p>
                <motion.div variants={item} className="mt-3.5 md:mt-6">
                  <div className="md:hidden"><Button href={slide.primary.href} variant="light" size="sm">{slide.primary.label}<Arrow /></Button></div>
                  <div className="hidden flex-wrap justify-center gap-3 md:flex">
                    <Button href={slide.primary.href} variant={d.tone === "dark" ? "primary" : "light"}>{slide.primary.label}<Arrow /></Button>
                    {slide.secondary && <Button href={slide.secondary.href} variant={d.tone === "dark" ? "outline" : "ghost-light"}>{slide.secondary.label}</Button>}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </div>

      <HeroControls slides={slides} index={index} playing={playing} desktopTone={d.tone} onSelect={go} onPrev={prev} onNext={next} onToggle={() => setPlaying((p) => !p)} />
    </section>
  );
}

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

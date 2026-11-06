import type { Variants } from "framer-motion";
import type { HeroTransition } from "@/data/hero";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Photo layer enter/exit per transition (the photo is oversized so edges never show while it moves). */
export const photoVariants: Record<HeroTransition, Variants> = {
  fade: {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1, transition: { duration: 1.3, ease } },
    exit: { opacity: 0, scale: 1.04, transition: { duration: 0.9, ease } },
  },
  "fade-right": {
    enter: { opacity: 0, x: -130, rotateY: -10 },
    center: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 1.1, ease } },
    exit: { opacity: 0, x: 130, rotateY: 10, transition: { duration: 0.8, ease } },
  },
  "fade-left": {
    enter: { opacity: 0, x: 130, rotateY: 10 },
    center: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 1.1, ease } },
    exit: { opacity: 0, x: -130, rotateY: -10, transition: { duration: 0.8, ease } },
  },
  drop: {
    enter: { opacity: 0, y: -170, rotateX: -14, scale: 1.06 },
    center: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 85, damping: 14, mass: 1.15 } },
    exit: { opacity: 0, y: 150, rotateX: 10, transition: { duration: 0.7, ease } },
  },
  rise: {
    enter: { opacity: 0, y: 150, rotateX: 12 },
    center: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1.1, ease } },
    exit: { opacity: 0, y: -130, rotateX: -10, transition: { duration: 0.7, ease } },
  },
  flip: {
    enter: { opacity: 0, rotateY: -40, scale: 1.08 },
    center: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 1.2, ease } },
    exit: { opacity: 0, rotateY: 40, scale: 1.04, transition: { duration: 0.8, ease } },
  },
};

const textOffsets: Record<HeroTransition, { enter: Record<string, number>; exit: Record<string, number> }> = {
  fade: { enter: { y: 0 }, exit: { y: 0 } },
  "fade-right": { enter: { x: -56 }, exit: { x: 56 } },
  "fade-left": { enter: { x: 56 }, exit: { x: -56 } },
  drop: { enter: { y: -64 }, exit: { y: 48 } },
  rise: { enter: { y: 56 }, exit: { y: -48 } },
  flip: { enter: { rotateX: -70, y: 18 }, exit: { rotateX: 70, y: -18 } },
};

export const textContainer: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

/** Text items (title, subtitle, buttons) animate in the same spirit as the slide's transition. */
export const textItem = (t: HeroTransition): Variants => ({
  enter: { opacity: 0, ...textOffsets[t].enter },
  center: { opacity: 1, x: 0, y: 0, rotateX: 0, transition: t === "drop" ? { type: "spring", stiffness: 120, damping: 15 } : { duration: 0.85, ease } },
  exit: { opacity: 0, ...textOffsets[t].exit, transition: { duration: 0.4, ease } },
});

/** Used when the visitor prefers reduced motion: plain cross-fades only. */
export const reducedVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

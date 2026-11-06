import type { ReactNode } from "react";

const tones = {
  new: "bg-ink text-cream",
  sale: "bg-[#8A2E38] text-cream",
  neutral: "bg-sand-light text-ink",
  muted: "bg-paper text-muted border border-line",
} as const;

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`inline-block rounded-[2px] px-2 py-1 font-ui text-[10.5px] font-semibold leading-none tracking-wide ${tones[tone]}`}>{children}</span>;
}

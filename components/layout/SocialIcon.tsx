import type { ReactNode } from "react";

/** Small, original social glyphs (stroke based) so no brand-icon package is needed. */
const paths: Record<string, ReactNode> = {
  facebook: <path d="M14.5 8H17V4.5h-2.7C11.6 4.5 10 6.2 10 8.8V11H7.5v3.5H10V21h3.5v-6.5h2.8l.5-3.5h-3.3V9.1c0-.7.4-1.1 1-1.1Z" />,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.6" fill="none" strokeWidth="1.8" /><circle cx="16.8" cy="7.3" r="1.05" stroke="none" /></>,
  tiktok: <path d="M14 4v10.3a3.3 3.3 0 1 1-3.3-3.3M14 4c.35 2.4 1.9 4 4.2 4.2" fill="none" strokeWidth="1.9" strokeLinecap="round" />,
  youtube: <><rect x="3" y="6.2" width="18" height="11.6" rx="3.4" fill="none" strokeWidth="1.8" /><path d="M10.4 9.7v4.6l4.1-2.3Z" stroke="none" /></>,
  pinterest: <path d="M10.2 20.5 12 12.2M9.6 12.6c-.4-2.9 1.6-5.2 4.3-5.2 2 0 3.6 1.3 3.6 3.4 0 2.6-1.6 4.4-3.7 4.4-1 0-1.8-.5-2.2-1.3" fill="none" strokeWidth="1.8" strokeLinecap="round" />,
};

export function SocialIcon({ name, className = "h-[18px] w-[18px]" }: { name: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" aria-hidden="true" focusable="false">{paths[name] ?? null}</svg>;
}

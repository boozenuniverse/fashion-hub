import Link from "next/link";

interface Props { title: string; subtitle?: string; action?: { label: string; href: string }; as?: "h2" | "h1"; onDark?: boolean }

/** Centered heading with tapered rules either side (matches the design mockup). */
export function OrnateHeading({ title, subtitle, action, as: Tag = "h2", onDark }: Props) {
  const rule = onDark ? "from-transparent to-taupe/70" : "from-transparent to-taupe";
  return (
    <div className="relative mb-5 md:mb-8">
      <div className="flex items-center gap-3 md:gap-6">
        <span aria-hidden="true" className={`h-px flex-1 bg-gradient-to-r ${rule}`} />
        <Tag className={`font-serif text-[1.3rem] font-medium leading-none min-[400px]:text-[1.45rem] md:text-[1.9rem] md:uppercase md:tracking-[0.07em] ${onDark ? "text-cream!" : "text-ink"}`}>{title}</Tag>
        <span aria-hidden="true" className={`h-px flex-1 bg-gradient-to-l ${rule}`} />
        {action && <Link href={action.href} className="inline-flex min-h-[44px] shrink-0 items-center font-sans text-[13px] font-medium text-ink underline-offset-4 hover:underline md:hidden">{action.label}<span aria-hidden="true"> &rarr;</span></Link>}
      </div>
      {subtitle && <p className="mt-1.5 text-center font-serif text-[0.95rem] italic text-muted md:mt-2.5 md:text-[1.05rem]">{subtitle}</p>}
      {action && <Link href={action.href} className="hidden font-sans text-[13px] font-medium text-ink underline-offset-4 hover:underline md:absolute md:bottom-0 md:right-0 md:block">{action.label}<span aria-hidden="true"> &rarr;</span></Link>}
    </div>
  );
}

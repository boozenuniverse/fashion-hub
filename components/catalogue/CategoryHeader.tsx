import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { siteConfig } from "@/config/site";

interface Crumb { label: string; href?: string }
interface Props { title: string; description: string; crumbs: Crumb[]; tagline?: string; image?: string; cta?: { label: string; href: string } }

/** Banner used by category, collection and info pages: breadcrumb, serif title, italic line, optional photo and button. */
export function CategoryHeader({ title, description, crumbs, tagline, image, cta }: Props) {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-sand-light to-sand">
        <div aria-hidden="true" className="absolute inset-y-0 left-[38%] -z-10 hidden w-[28%] rounded-t-[999px] bg-cream/40 md:block" />
        {image && (
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-[56%] md:w-[52%]" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, #000 38%)", maskImage: "linear-gradient(to right, transparent, #000 38%)" }}>
            <Img src={image} alt="" priority className="h-full w-full object-cover object-[60%_30%]" />
          </div>
        )}
        <div className="container-x flex min-h-[190px] flex-col justify-center py-5 md:min-h-[300px] md:py-12">
          <div className={image ? "max-w-[64%] md:max-w-[46%]" : "max-w-3xl"}>
            <nav aria-label="Breadcrumb" className="mb-2 text-[12.5px] text-ink md:mb-5 md:text-[13px]">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                      {c.href && !last ? <Link href={c.href} className="inline-flex min-h-[28px] items-center hover:underline">{c.label}</Link> : <span aria-current={last ? "page" : undefined}>{c.label}</span>}
                      {!last && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-wine" />}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <h1 className="font-serif text-[clamp(1.9rem,8.4vw,3.6rem)] font-medium leading-[1] tracking-[-0.01em] text-burgundy md:text-[clamp(2.6rem,5vw,4.4rem)]">{title}</h1>
            <p className="mt-2 font-serif text-[0.95rem] italic leading-snug text-charcoal md:mt-4 md:text-[1.45rem]">{tagline ?? description}</p>
            {tagline && <p className="mt-3 hidden max-w-[56ch] text-muted md:block">{description}</p>}
            {cta && <Link href={cta.href} className="btn btn-primary btn-sm mt-3 md:mt-7 md:min-h-[46px] md:px-7 md:py-3.5 md:text-[12px]">{cta.label}<span aria-hidden="true">&rarr;</span></Link>}
          </div>
        </div>
      </header>
      {siteConfig.sampleCatalogue.enabled && <p className="bg-sand/50 px-4 py-2 text-center text-[12px] text-muted">{siteConfig.sampleCatalogue.notice}</p>}
    </>
  );
}

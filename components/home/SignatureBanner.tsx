import { Button } from "@/components/ui/Button";
import { homepage } from "@/data/homepage";
import { withBasePath } from "@/lib/paths";

/** Burgundy panel with a curved edge and photography (desktop: sunglasses portrait, mobile: handbag on satin). */
export function SignatureBanner() {
  const s = homepage.signature;
  return (
    <section aria-labelledby="signature-title" className="on-dark relative isolate overflow-hidden bg-burgundy text-cream">
      <picture>
        <source media="(min-width: 768px)" srcSet={withBasePath(s.desktopImage)} />
        <img src={withBasePath(s.mobileImage)} alt={s.alt} loading="lazy" decoding="async" className="absolute inset-y-0 right-0 -z-10 h-full w-[68%] object-cover object-right md:w-[62%]" />
      </picture>
      {/* Curved burgundy panel */}
      <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 -z-10 h-full w-[78%] md:w-[58%]">
        <defs>
          <linearGradient id="sig-fade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#531C22" /><stop offset="0.82" stopColor="#531C22" /><stop offset="1" stopColor="#531C22" stopOpacity="0.82" /></linearGradient>
        </defs>
        <path d="M0 0 H88 C97 28 90 70 70 100 H0 Z" fill="url(#sig-fade)" />
        <path d="M88 0 C97 28 90 70 70 100" fill="none" stroke="#AC9185" strokeWidth="0.35" opacity="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-x relative flex min-h-[200px] items-center py-8 md:min-h-[clamp(190px,18vw,270px)]">
        <div className="max-w-[72%] md:max-w-[420px]">
          <p className="font-ui text-[10px] font-medium uppercase tracking-[0.3em] text-sand md:text-[12px]">{s.eyebrow}</p>
          <h2 id="signature-title" className="mt-2 font-serif text-[1.95rem] font-medium leading-[1.05] text-cream! md:mt-3 md:text-[clamp(2.4rem,3.8vw,3.4rem)]">{s.title}</h2>
          <p className="mt-2 font-serif text-[1rem] italic text-sand md:mt-3 md:text-[1.35rem]">{s.text}</p>
          <Button href={s.cta.href} variant="light" size="sm" className="mt-4 md:mt-6">{s.cta.label}<span aria-hidden="true">&rarr;</span></Button>
        </div>
      </div>
    </section>
  );
}

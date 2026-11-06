import type { ImgHTMLAttributes } from "react";
import { buildSrcSet } from "@/lib/images";
import { withBasePath } from "@/lib/paths";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "srcSet"> & {
  src: string;
  alt: string;
  priority?: boolean;
  /** Intrinsic width of `src`. When set, a 480w variant is offered through srcSet (see npm run images:optimize). */
  fullWidth?: number;
};

/** Plain <img> that applies the GitHub Pages base path (next/image does not when unoptimised). */
export function Img({ src, alt, priority, className, fullWidth, sizes, ...rest }: Props) {
  const srcSet = fullWidth ? buildSrcSet(src, fullWidth, withBasePath) : undefined;
  return (
    <img
      src={withBasePath(src)}
      srcSet={srcSet}
      sizes={srcSet ? sizes ?? "100vw" : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
      {...rest}
    />
  );
}

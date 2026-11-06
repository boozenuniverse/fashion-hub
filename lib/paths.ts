import { basePath } from "@/config/deployment";

/**
 * Prefix a root-relative asset path with the GitHub Pages repository base path.
 * Use for raw <img>/<source> URLs and CSS. next/link and next/navigation add basePath themselves.
 */
export function withBasePath(path: string): string {
  if (!path || /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalised}`;
}

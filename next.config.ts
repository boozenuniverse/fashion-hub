import type { NextConfig } from "next";

/**
 * GitHub Pages static export.
 *
 * - Project sites live at https://USER.github.io/<repo>/ so a basePath is required in production.
 * - The repo name comes from NEXT_PUBLIC_REPO_NAME (set by the GitHub Actions workflow); it defaults to "fashion-hub".
 * - For a user/organisation site (repo named USER.github.io) set NEXT_PUBLIC_USE_ROOT_PATH=true to serve from "/".
 * - Next.js prefixes /_next assets with basePath automatically. Raw <img> tags and metadata URLs use
 *   lib/paths.ts (withBasePath) and lib/seo.ts (absoluteUrl) because next/image runs unoptimised here.
 */
const repositoryName = process.env.NEXT_PUBLIC_REPO_NAME ?? "fashion-hub";
const isProduction = process.env.NODE_ENV === "production";
const useRootPath = process.env.NEXT_PUBLIC_USE_ROOT_PATH === "true";
const basePath = isProduction && !useRootPath ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

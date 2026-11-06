/**
 * GitHub Pages deployment configuration (single source of truth for the front end).
 * next.config.ts reads the same environment variables, which the GitHub Actions workflow sets.
 */
export const repositoryName = process.env.NEXT_PUBLIC_REPO_NAME ?? "fashion-hub";

/** "" in development, "/<repo>" in the production export. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** PLACEHOLDER: replace USERNAME (or let the workflow set NEXT_PUBLIC_SITE_URL). No trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://USERNAME.github.io/${repositoryName}`).replace(/\/$/, "");

import { defineConfig, devices } from "@playwright/test";

// Runs against the *exported* site (out/) served under the repository sub-path, like GitHub Pages.
// Build first: `npm run build`.
const REPO = process.env.NEXT_PUBLIC_REPO_NAME ?? "fashion-hub";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: `http://127.0.0.1:4173/${REPO}/`, ...devices["Desktop Chrome"] },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node scripts/serve-export.mjs",
    url: `http://127.0.0.1:4173/${REPO}/`,
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_REPO_NAME: REPO },
  },
});

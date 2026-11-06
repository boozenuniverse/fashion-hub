import { test, expect } from "@playwright/test";

// Runs against the exported site served under the repository sub-path (see playwright.config.ts).

test.describe("exported site", () => {
  test("home page loads with no failed local requests and uses the base path", async ({ page, baseURL }) => {
    const failed: string[] = [];
    page.on("response", (r) => { if (r.url().startsWith(baseURL!.replace(/\/$/, "").split("/").slice(0, 3).join("/")) && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(failed).toEqual([]);
    const brokenImages = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    expect(brokenImages).toEqual([]);
  });

  test("filters the shop and opens a product page", async ({ page }) => {
    await page.goto("shop/");
    await expect(page.getByText(/Showing \d+ of \d+ products/)).toBeVisible();
    await page.goto("categories/shoes/?sub=heels");
    await expect(page.getByRole("link", { name: /Pointed Stiletto Pumps/ }).first()).toBeVisible();
    await page.goto("products/satin-slip-dress/");
    await expect(page.getByRole("heading", { level: 1, name: "Satin Slip Dress" })).toBeVisible();
  });

  test("bag validates required options, persists and checkout validates", async ({ page }) => {
    await page.goto("products/satin-slip-dress/");
    await page.getByRole("button", { name: "Add to bag" }).click();
    await expect(page.getByRole("alert")).toContainText(/choose your/i);
    await page.getByRole("button", { name: /Colour: Champagne/ }).click();
    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: "Add to bag" }).click();
    await expect(page.getByRole("dialog", { name: "Your bag" })).toBeVisible();
    await page.reload();
    await page.goto("bag/");
    await expect(page.getByText("Satin Slip Dress")).toBeVisible();
    await page.goto("checkout/");
    await page.getByRole("button", { name: "Prepare my enquiry" }).click();
    await expect(page.getByRole("alert").first()).toContainText(/highlighted fields/i);
  });

  test("wishlist persists across reloads", async ({ page }) => {
    await page.goto("products/evening-clutch/");
    await page.getByRole("button", { name: "Add to wishlist" }).first().click();
    await page.goto("wishlist/");
    await expect(page.getByText("Evening Clutch").first()).toBeVisible();
    await page.reload();
    await expect(page.getByText("Evening Clutch").first()).toBeVisible();
  });

  test("unknown routes show the branded 404", async ({ page }) => {
    const res = await page.goto("no-such-page/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /slipped away/i })).toBeVisible();
  });
});

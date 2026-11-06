import { test, expect } from "@playwright/test";

// Mobile regression tests at the smallest common width (320px).
test.use({ viewport: { width: 320, height: 693 }, hasTouch: true });

test.describe("mobile layout (320px)", () => {
  test("pages never scroll sideways", async ({ page }) => {
    for (const path of ["./", "shop/", "categories/womens-fashion/", "products/elegant-evening-dress/", "bag/", "checkout/"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(0);
    }
  });

  test("shows one logo and a five-item bottom bar with Home in the middle", async ({ page }) => {
    await page.goto("./");
    const logos = page.locator('header a[aria-label$="home"]:visible');
    await expect(logos).toHaveCount(1);
    const tabs = page.locator('nav[aria-label="Quick navigation"] li');
    await expect(tabs).toHaveCount(5);
    await expect(tabs.nth(2)).toContainText("Home");
    await expect(tabs.nth(0)).toContainText("Bag");
    await expect(tabs.nth(1)).toContainText("Wishlist");
    await expect(tabs.nth(3)).toContainText("Shop");
    await expect(tabs.nth(4)).toContainText("Menu");
  });

  test("tab bar targets are at least 44px", async ({ page }) => {
    await page.goto("./");
    const boxes = await page.locator('nav[aria-label="Quick navigation"] li > *').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.width, r.height]; }));
    for (const [w, h] of boxes) { expect(w).toBeGreaterThanOrEqual(44); expect(h).toBeGreaterThanOrEqual(44); }
  });

  test("Shop and Menu sheets list the expected groups", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Shop", exact: true }).click();
    const shop = page.getByRole("dialog", { name: "Shop" });
    for (const g of ["Fashion", "Accessories", "Hair & Beauty", "Discover"]) await expect(shop.getByText(g, { exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    for (const g of ["Collections", "Women", "Men", "Beauty", "Accessories", "Journal"]) await expect(menu.getByText(g, { exact: true }).first()).toBeVisible();
    for (const b of ["Bag", "Wishlist", "Search"]) await expect(menu.getByRole("button", { name: new RegExp(`^${b}`) }).or(menu.getByRole("link", { name: new RegExp(`^${b}`) })).first()).toBeVisible();
  });

  test("search shows popular and recent searches", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Search" }).first().click();
    await expect(page.getByText("Popular searches")).toBeVisible();
    await page.getByRole("button", { name: "Dress", exact: true }).click();
    await page.goto("./");
    await page.getByRole("button", { name: "Search" }).first().click();
    await expect(page.getByText("Recent searches")).toBeVisible();
  });

  test("quick view fits inside the viewport", async ({ page }) => {
    await page.goto("categories/womens-fashion/");
    await page.getByRole("button", { name: /Quick view/ }).first().click();
    const dialog = page.getByRole("dialog", { name: /Quick view/ });
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    expect(box!.height).toBeLessThanOrEqual(693 * 0.91);
  });
});

import { expect, test } from "@playwright/test";

test("enterprise architecture is discoverable from experience and its diagram enlarges without page overflow", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator(".hero").getByRole("link", { name: "Enterprise architecture case study" })).toBeVisible();
  await expect(page.locator("#state-farm-experience").getByRole("heading", { name: "Evidence from production systems" })).toBeVisible();
  await expect(page.locator("#projects").getByRole("link", { name: "Read enterprise architecture case study" })).toHaveCount(0);
  await page.locator("#pbk-experience").getByRole("link", { name: "Read enterprise architecture case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("A shared foundation for enterprise data");
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Experience" })).toHaveAttribute("aria-current", "page");
  const viewport = page.locator(".diagram-viewport");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
      await expect(viewport.getByRole("img")).toBeVisible();
      await expect.poll(() => viewport.getByRole("img").evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.getByRole("button", { name: /Enlarge diagram/ }).click();
      await expect.poll(() => viewport.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.getByRole("button", { name: /Fit diagram/ }).click();
      if (width !== 320) await page.screenshot({ path: testInfo.outputPath(`enterprise-${width}-${theme}.png`), fullPage: true });
    }
    await page.getByRole("link", { name: "Operations", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Make pipeline execution visible" })).toBeInViewport();
  }
  await page.getByRole("link", { name: "Back to experience" }).click();
  await expect(page).toHaveURL(/#professional$/);
});

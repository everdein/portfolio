import { expect, test } from "@playwright/test";

test("Dojo case study connects from the homepage and contains both themes at mobile and desktop widths", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page
    .getByRole("link", { name: "Read DSA Dojo case study", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("DSA Dojo");
  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => {
        document.documentElement.dataset.theme = value;
        localStorage.setItem("matthew-clark-portfolio-theme", value);
      }, theme);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      const image = page.locator(".case-study-lead-visual img");
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      if (width === 390 || width === 1440) {
        await page.screenshot({
          path: testInfo.outputPath(`dojo-${width}-${theme}.png`),
          fullPage: true,
        });
      }
    }
  }
  await page.getByRole("link", { name: "Evidence", exact: true }).click();
  await expect(page).toHaveURL(/#evidence$/);
  await expect(
    page.getByRole("heading", {
      name: "Check the contract through the deployed artifact",
    }),
  ).toBeInViewport();
  await page
    .getByRole("link", { name: "Read Pay Period Planner case study" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Pay Period Planner",
  );
});

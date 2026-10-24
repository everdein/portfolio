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

test("case-study diagram assets are readable and downloadable", async ({ page, request }) => {
  for (const project of ["pay-period-planner", "dsa-dojo"]) {
    await page.goto(`./work/${project}/`);
    const diagrams = page.getByRole("region", { name: "Architecture diagrams", exact: true });
    const image = diagrams.getByRole("img");
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const svgLinks = diagrams.getByRole("link", { name: /^View diagram/ });
    const sourceLinks = diagrams.getByRole("link", { name: /^Download Mermaid/ });
    await expect(svgLinks).toHaveCount(3);
    await expect(sourceLinks).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      const svg = await request.get((await svgLinks.nth(i).getAttribute("href"))!);
      expect(svg.ok()).toBe(true);
      const svgText = await svg.text();
      expect(await page.evaluate((text) => new DOMParser().parseFromString(text, "image/svg+xml").querySelector("parsererror") === null, svgText)).toBe(true);
      const source = await request.get((await sourceLinks.nth(i).getAttribute("href"))!);
      expect(source.ok()).toBe(true);
      expect(await source.text()).toMatch(/accTitle:/);
    }
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await diagrams.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `../output/architecture-diagrams/portfolio-${project}-integrated.png` });
  }
});

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

test("all diagrams render inline and case navigation remains usable", async ({ page, request }) => {
 await page.emulateMedia({ reducedMotion: "reduce" });
 for (const project of ["pay-period-planner", "dsa-dojo"]) {
  await page.goto(`./work/${project}/`);
  const diagrams = page.getByRole("region", { name: "Architecture diagrams", exact: true });
  const images = diagrams.getByRole("img");
  await expect(images).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
   const image = images.nth(i);
   await image.scrollIntoViewIfNeeded();
   await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
   const svg = await request.get((await image.getAttribute("src"))!);
   expect(svg.ok()).toBe(true);
   expect(await page.evaluate(text => new DOMParser().parseFromString(text, "image/svg+xml").querySelector("parsererror") === null, await svg.text())).toBe(true);
  }
  await diagrams.getByRole("button", { name: /^Enlarge diagram/ }).first().click();
  const viewport = diagrams.locator(".diagram-viewport").first();
  await expect.poll(() => viewport.evaluate(e => e.scrollWidth > e.clientWidth)).toBe(true);
  await diagrams.getByRole("button", { name: /^Fit diagram/ }).first().click();
  for (const width of [320, 390, 768, 1440]) {
   await page.setViewportSize({ width, height: 1000 });
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
   await page.getByRole("navigation", { name: "Case study sections", exact: true }).getByRole("link", {name:"System",exact:true}).click();
   await expect.poll(() => page.evaluate(() => document.querySelector("#system")!.getBoundingClientRect().top - document.querySelector(".case-navigation")!.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(-1);
   await expect(page.getByRole("link",{name:"Back to projects",exact:true})).toBeInViewport();
  }
  await page.locator(".architecture-diagrams figure").first().scrollIntoViewIfNeeded();
  await page.screenshot({path:`../output/architecture-diagrams/portfolio-${project}-inline.png`});
 }
});

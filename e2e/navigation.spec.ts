import { expect, test } from "@playwright/test";

test("shared navigation identifies pages and supports the mobile keyboard menu", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "./",
    "./resume/",
    "./work/dsa-dojo/",
    "./work/pay-period-planner/",
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const nav = page.getByRole("navigation", {
      name: "Primary navigation",
      exact: true,
    });
    await expect(nav).toBeHidden();
    const menu = page.locator("#site-menu-toggle");
    await menu.click();
    await expect(nav).toBeVisible();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(menu).toBeFocused();
    await menu.click();
    if (route.includes("resume"))
      await expect(
        nav.getByRole("link", { name: "Resume", exact: true }),
      ).toHaveAttribute("aria-current", "page");
    if (route.includes("work"))
      await expect(
        nav.getByRole("link", { name: "Projects", exact: true }),
      ).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(nav).toBeHidden();
    await expect
      .poll(() =>
        page.locator("#about").evaluate((e) => e.getBoundingClientRect().top),
      )
      .toBeGreaterThan(60);
    await menu.click();
    await nav.getByRole("link", { name: "Projects", exact: true }).click();
    await menu.click();
    await expect(
      nav.getByRole("link", { name: "Projects", exact: true }),
    ).toHaveAttribute("aria-current", "location");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  const mark = page.locator(".site-brand img");
  const ratio = await mark.evaluate((image) => {
    const r = image.getBoundingClientRect();
    return r.width / r.height;
  });
  const intrinsicRatio = await mark.evaluate(
    (image) =>
      (image as HTMLImageElement).naturalWidth /
      (image as HTMLImageElement).naturalHeight,
  );
  expect(ratio).toBeCloseTo(intrinsicRatio, 2);
  const theme = page.getByRole("button", { name: /Switch to .* theme/ });
  await theme.focus();
  await page.keyboard.press("Escape");
  await expect(theme).toBeFocused();
  await page.screenshot({
    path: "../output/architecture-diagrams/portfolio-shared-navigation.png",
  });
  await page.goto("./resume/");
  await page.screenshot({
    path: "../output/architecture-diagrams/resume-shared-navigation.png",
  });
});

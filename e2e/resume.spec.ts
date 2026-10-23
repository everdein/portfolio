import { expect, test } from "@playwright/test";

test("resume supports themes, narrow screens, PDF access and printing", async ({
  page,
  request,
}) => {
  await page.goto("./resume/");
  await expect(page.locator(".resume-portrait")).toBeVisible();
  expect(await page.locator(".resume-portrait").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Matthew Clark",
  );
  const download = page.getByRole("link", {
    name: "Download PDF",
    exact: true,
  });
  await expect(download).toHaveAttribute("download", "");
  const pdf = await request.get((await download.getAttribute("href"))!);
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: /switch to light/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".resume-actions")).toBeHidden();
  await expect(page.locator(".resume-canvas .rail")).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "Education", exact: true }),
  ).toBeVisible();
});

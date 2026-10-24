import { expect, test } from "@playwright/test";

test("resume supports themes, narrow screens, PDF access and printing", async ({
  page,
  request,
}) => {
  await page.goto("./resume/");
  await expect(page.locator(".resume-portrait")).toBeVisible();
  expect(
    await page
      .locator(".resume-portrait")
      .evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Matthew Clark",
  );
  for (const theme of ["light", "dark", "regular"]) {
    const download = page.getByRole("link", {
      name: `Download ${theme} PDF`,
      exact: true,
    });
    const open = page.getByRole("link", {
      name: `Open ${theme} PDF (opens in a new tab)`,
      exact: true,
    });
    const href = (await download.getAttribute("href"))!;
    await expect(download).toHaveAttribute("download", "");
    await expect(open).toHaveAttribute("href", href);
    await expect(open).toHaveAttribute("target", "_blank");
    await expect(open).not.toHaveAttribute("download");
    const pdf = await request.get(href);
    expect(pdf.ok()).toBe(true);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
    const result = page.waitForEvent("download");
    await download.click();
    expect((await result).suggestedFilename()).toBe(
      theme === "light"
        ? "matthew-clark-resume.pdf"
        : `matthew-clark-resume-${theme}.pdf`,
    );
  }
  await expect(
    page.getByRole("button", { name: "Print / save as PDF", exact: true }),
  ).toHaveCount(0);
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

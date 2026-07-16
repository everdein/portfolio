import { expect, type Page, test } from "@playwright/test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const homePath = "./";
const caseStudyPath = "./work/pay-period-planner/";

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
}

async function expectFirstViewportHint(page: Page, selector: string) {
  await expect
    .poll(() =>
      page.locator(selector).evaluate((element) => {
        const top = element.getBoundingClientRect().top;
        return top >= 0 && top < window.innerHeight;
      }),
    )
    .toBe(true);
}

async function expectAnchorBelowRail(
  page: Page,
  linkName: string,
  targetSelector: string,
) {
  await page.getByRole("link", { name: linkName, exact: true }).click();
  await expect
    .poll(() =>
      page.evaluate((selector) => {
        const target = document.querySelector(selector);
        const rail = document.querySelector(".rail");

        if (!(target instanceof HTMLElement) || !(rail instanceof HTMLElement)) {
          return false;
        }

        return (
          target.getBoundingClientRect().top >=
          rail.getBoundingClientRect().bottom - 1
        );
      }, targetSelector),
    )
    .toBe(true);
}

test("connects the portfolio, case study, screenshots, and resume", async ({
  page,
  request,
}) => {
  await page.goto(homePath);

  await expect(page).toHaveTitle("Matthew Clark | Lead Software Engineer");
  await expect(
    page.getByRole("heading", { name: "Matthew Clark", level: 1 }),
  ).toBeVisible();

  const heroCaseStudyLink = page.getByRole("link", {
    name: "Explore the case study",
    exact: true,
  });
  await expect(heroCaseStudyLink).toHaveAttribute(
    "href",
    `${basePath}/work/pay-period-planner/`,
  );

  const caseStudyLink = page.getByRole("link", {
    name: "Read case study",
    exact: true,
  });
  await expect(caseStudyLink).toHaveAttribute(
    "href",
    `${basePath}/work/pay-period-planner/`,
  );

  const resumeLink = page.getByRole("link", {
    name: "View resume (opens in a new tab)",
    exact: true,
  });
  await expect(resumeLink).toHaveAttribute("target", "_blank");

  const goodreadsLink = page.getByRole("link", {
    name: "Goodreads (opens in a new tab)",
    exact: true,
  });
  await expect(goodreadsLink).toHaveAttribute(
    "href",
    "https://www.goodreads.com/everdein",
  );
  await expect(
    goodreadsLink.locator("xpath=ancestor::*[@id='contact']"),
  ).toHaveCount(1);

  const emailLink = page.getByRole("link", {
    name: "Email",
    exact: true,
  });
  await expect(emailLink).toHaveAttribute("href", "mailto:everdein@gmail.com");
  await expect(
    emailLink.locator("xpath=ancestor::*[@id='contact']"),
  ).toHaveCount(1);

  const resumeResponse = await request.get("./matthew-clark-resume.pdf");
  expect(resumeResponse.ok()).toBe(true);
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");

  await caseStudyLink.click();
  await expect(page).toHaveURL(
    new RegExp(`${basePath}/work/pay-period-planner/?$`),
  );
  await expect(
    page.getByRole("heading", { name: "Pay Period Planner", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "The Pay Period Planner's July 15, 2026 baseline combines local unit",
      { exact: false },
    ),
  ).toBeVisible();

  await expect
    .poll(() =>
      page.evaluate(() => {
        const ledger = document.querySelector(".star-ledger");
        const actions = document.querySelector(".case-study-action-list");

        if (
          !(ledger instanceof HTMLElement) ||
          !(actions instanceof HTMLElement)
        ) {
          return Number.POSITIVE_INFINITY;
        }

        const ledgerBounds = ledger.getBoundingClientRect();
        const actionBounds = actions.getBoundingClientRect();
        const ledgerCenter = ledgerBounds.left + ledgerBounds.width / 2;
        const actionCenter = actionBounds.left + actionBounds.width / 2;

        return Math.abs(ledgerCenter - actionCenter);
      }),
    )
    .toBeLessThanOrEqual(1);

  const overview = page.getByRole("img", {
    name: "Pay Period Planner household overview with projection, balances, cash flow, and calendar summaries",
  });
  await expect(overview).toBeVisible();
  await expect
    .poll(() =>
      overview.evaluate(
        (image) => image instanceof HTMLImageElement && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
});

test("persists the selected color theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(homePath);

  const themeToggle = page.getByRole("button", {
    name: "Switch to dark theme",
    exact: true,
  });
  await expect(themeToggle).toHaveAttribute("aria-pressed", "false");

  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", {
      name: "Switch to light theme",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", {
      name: "Switch to light theme",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("keeps primary action text readable on hover", async ({ page }) => {
  await page.goto(homePath);

  const caseStudyLink = page.getByRole("link", {
    name: "Read case study",
    exact: true,
  });
  await caseStudyLink.hover();

  await expect(caseStudyLink).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(caseStudyLink).toHaveCSS("background-color", "rgb(16, 72, 51)");
});

test("contains both routes across supported portfolio widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { width: 320, height: 800 },
    { width: 390, height: 844 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport);

    await page.goto(homePath);
    await expectNoHorizontalOverflow(page);
    await expectFirstViewportHint(page, "#work");

    await page.goto(caseStudyPath);
    await expectNoHorizontalOverflow(page);
    await expectFirstViewportHint(page, ".case-study-lead-visual");

    if (viewport.width <= 760) {
      await page.goto(homePath);
      await expectAnchorBelowRail(page, "About", "#about");

      await page.goto(caseStudyPath);
      await expectAnchorBelowRail(page, "Evidence", "#evidence");
    }
  }
});

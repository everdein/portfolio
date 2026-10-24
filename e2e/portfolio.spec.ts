import { expect, type Locator, type Page, test } from "@playwright/test";

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

async function expectImageLoaded(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate(
        (element) =>
          element instanceof HTMLImageElement && element.naturalWidth > 0,
      ),
    )
    .toBe(true);
}

async function expectAlternatingSectionSurfaces(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const professional = document.querySelector("#professional");
        const projects = document.querySelector("#projects");
        const about = document.querySelector("#about");

        if (!professional || !projects || !about) {
          return false;
        }

        const professionalBackground =
          getComputedStyle(professional).backgroundColor;
        const projectsBackground = getComputedStyle(projects).backgroundColor;
        const aboutBackground = getComputedStyle(about).backgroundColor;

        return (
          projectsBackground === aboutBackground &&
          projectsBackground !== professionalBackground
        );
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

  await expect(page).toHaveTitle("Matthew Clark | Senior Software Engineer");
  await expect(
    page.getByRole("heading", { name: "Matthew Clark", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Professional", exact: true }),
  ).toHaveAttribute("href", "#professional");
  await expect(
    page.getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("href", "#projects");

  const heroCaseStudyLink = page.getByRole("link", {
    name: "Explore projects",
    exact: true,
  });
  await expect(heroCaseStudyLink).toHaveAttribute("href", "#projects");

  const caseStudyLink = page.getByRole("link", {
    name: "Read case study",
    exact: true,
  });
  await expect(caseStudyLink).toHaveAttribute(
    "href",
    `${basePath}/work/pay-period-planner/`,
  );

  const dsaDojoLink = page.getByRole("link", {
    name: "Open DSA Dojo (opens in a new tab)",
    exact: true,
  });
  await expect(dsaDojoLink).toHaveAttribute(
    "href",
    "https://everdein.github.io/dsa-dojo/",
  );
  await expect(dsaDojoLink).toHaveAttribute("target", "_blank");
  await expect(
    page.getByRole("link", {
      name: "Architecture (opens in a new tab)",
      exact: true,
    }),
  ).toHaveAttribute(
    "href",
    "https://github.com/everdein/dsa-dojo/blob/main/docs/studio-architecture.md",
  );

  await expectImageLoaded(
    page.getByRole("img", {
      name: "DSA Dojo dark lesson studio with its lesson catalog and Sensei Pip guide",
    }),
  );

  const resumeLink = page.getByRole("link", {
    name: "View resume",
    exact: true,
  });
  await expect(resumeLink).toHaveAttribute("href", `${basePath}/resume/`);

  const goodreadsLink = page.getByRole("link", {
    name: "Goodreads (opens in a new tab)",
    exact: true,
  });
  await expect(goodreadsLink).toHaveAttribute(
    "href",
    "https://www.goodreads.com/everdein",
  );
  await expect(
    goodreadsLink.locator("xpath=ancestor::footer"),
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
    page.getByRole("link", { name: "qualified evidence report" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md",
  );
  await expect(
    page.getByText("durable risk coverage across product behavior", {
      exact: false,
    }),
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
  await expectImageLoaded(overview);
  await expectImageLoaded(
    page.getByRole("img", {
      name: "Pay Period Planner next-paycheck projection with planning schedule, selected inputs, and possible allocations",
    }),
  );
  await expectImageLoaded(
    page.getByRole("img", {
      name: "Pay Period Planner monthly withdrawals workflow at a 390 pixel mobile viewport",
    }),
  );
});

test("persists the selected color theme", async ({ page }) => {
  await page.addInitScript(() => { if (!localStorage.getItem("matthew-clark-portfolio-theme")) localStorage.setItem("matthew-clark-portfolio-theme", "light"); });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(homePath);

  const themeToggle = page.getByRole("button", {
    name: "Switch to dark theme",
    exact: true,
  });
  await expect(themeToggle).toHaveAttribute("aria-pressed", "false");
  await expectAlternatingSectionSurfaces(page);

  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectAlternatingSectionSurfaces(page);
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
  await expect(caseStudyLink).toHaveCSS("background-color", "rgb(0, 105, 185)");
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
    await expectFirstViewportHint(page, "#professional");

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

// Both theme palettes must keep primary action text readable, including hover.
test("primary actions retain accessible contrast in both themes", async ({ page }) => {
  await page.addInitScript(() => { if (!localStorage.getItem("matthew-clark-portfolio-theme")) localStorage.setItem("matthew-clark-portfolio-theme", "light"); });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(homePath);
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme", exact: true }).click();
    const link = page.getByRole("link", { name: "Read case study", exact: true });
    for (const hover of [false, true]) {
      if (hover) await link.hover();
      else await page.mouse.move(0, 0);
      const ratio = await link.evaluate((element) => {
        const style = getComputedStyle(element);
        const luminance = (color: string) => {
          const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        const text = luminance(style.color);
        const background = luminance(style.backgroundColor);
        return (Math.max(text, background) + 0.05) / (Math.min(text, background) + 0.05);
      });
      expect(ratio, theme + (hover ? " hovered" : " normal")).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("defaults to Dark Modern even with a light operating-system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(homePath);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(31, 31, 31)");
  await expect(page.locator(".role")).toHaveCSS("color", "rgb(197, 134, 192)");
  await page.getByRole("button", { name: "Switch to light theme", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("link", { name: "Read case study", exact: true })).toHaveCSS("background-color", "rgb(0, 120, 212)");
});

test("project actions share a hierarchy and both case studies stay contained", async ({ page }) => {
  await page.goto(homePath);
  for (const theme of ["dark", "light"]) {
    if (theme === "light") await page.getByRole("button", { name: "Switch to light theme", exact: true }).click();
    for (const project of ["Pay Period Planner", "DSA Dojo"]) {
      const actions = page.getByLabel(`${project} links`, { exact: true });
      await expect(actions.locator("a").filter({ hasText: "Read case study" })).toHaveCSS("background-color", "rgb(0, 120, 212)");
    }
    await expect(page.getByRole("link", { name: "Open DSA Dojo (opens in a new tab)", exact: true })).toHaveCSS("background-color", "rgb(78, 201, 176)");
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./work/dsa-dojo/");
    await expectNoHorizontalOverflow(page);
  }
  await page.goto(homePath);
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "../output/brand-rollout/portfolio-projects-cleanup.png" });
  await page.goto("./resume/");
  await expect(page.getByRole("link", { name: "DSA Dojo", exact: true })).toHaveAttribute("href", `${basePath}/work/dsa-dojo/`);
  await page.screenshot({ path: "../output/brand-rollout/portfolio-resume-cleanup.png" });
});

test("paired headings and content columns never overlap", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const routes = [homePath, "./resume/", caseStudyPath, "./work/dsa-dojo/"];
  for (const theme of ["dark", "light"]) {
    await page.goto(homePath);
    const toggle = page.getByRole("button", { name: `Switch to ${theme} theme`, exact: true });
    if (await toggle.isVisible()) await toggle.click();
    for (const width of [320, 390, 760, 768, 880, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await page.goto(route);
        const collisions = await page.evaluate(() => {
          const groups = document.querySelectorAll(".projects-heading, .impact-heading, .intro-note, .hero-main, .feature-project, .case-study-section-heading, .case-study-result, .resume-job-heading, .resume-heading");
          const textRects = (element: Element) => {
            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
            const rects: DOMRect[] = Array.from(element.matches("img") ? [element] : element.querySelectorAll("img")).map(image => image.getBoundingClientRect()).filter(r => r.width > 0 && r.height > 0);
            let node: Node | null;
            while ((node = walker.nextNode())) {
              if (!node.textContent?.trim() || node.parentElement?.closest(".sr-only")) continue;
              const range = document.createRange();
              range.selectNodeContents(node);
              rects.push(...Array.from(range.getClientRects()).filter(r => r.width > 0 && r.height > 0));
            }
            return rects;
          };
          const overlaps = (a: DOMRect, b: DOMRect) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
          return Array.from(groups).flatMap(group => {
            const columns = Array.from(group.children).map(textRects);
            const failures: string[] = [];
            for (let i = 0; i < columns.length; i++) {
              for (let j = i + 1; j < columns.length; j++) {
                if (columns[i].some(a => columns[j].some(b => overlaps(a, b)))) failures.push(`${group.className}: columns ${i + 1}/${j + 1}`);
              }
            }
            return failures;
          });
        });
        expect(collisions, `${theme} ${width}px ${route}`).toEqual([]);
      }
    }
  }
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(homePath);
  await page.locator(".projects-heading").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "../output/brand-rollout/portfolio-overlap-fixed.png" });
});

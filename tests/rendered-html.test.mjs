import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports the portfolio content and metadata", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  assert.match(html, /<title>Matthew Clark \| Lead Software Engineer<\/title>/i);
  assert.match(html, /<h1[^>]*>Matthew Clark<\/h1>/i);
  assert.match(html, /I build understandable systems for complex product behavior/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="approach"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Pay Period Planner/);
  assert.match(html, /DSA Dojo/);
  assert.match(html, /https:\/\/github\.com\/everdein\/pay-period-planner/);
  assert.match(html, /https:\/\/github\.com\/everdein\/dsa-dojo/);
  assert.match(html, /https:\/\/linkedin\.com\/in\/everdein/);
  assert.match(html, /https:\/\/www\.goodreads\.com\/everdein/);
  assert.match(
    html,
    /id="contact"[\s\S]*https:\/\/www\.goodreads\.com\/everdein[\s\S]*<footer/,
  );
  assert.match(
    html,
    new RegExp(
      `href="${basePath}/matthew-clark-resume\\.pdf" target="_blank"`,
    ),
  );
  assert.match(html, /https:\/\/everdein\.github\.io\/portfolio\/og\.png/);
  assert.match(html, /Black-and-white portrait of Matthew Clark/);
  assert.match(html, /Working principle/);
  assert.doesNotMatch(html, /Working principle \/ 01/);
  assert.match(html, /Deliberate practice/);
  assert.doesNotMatch(html, /Project \/ 02/);
  assert.match(html, /Start a conversation<\/h2>/);
  assert.match(html, /Switch to dark theme/);
  assert.match(html, /aria-pressed="false"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is building/i);

  assert.match(html, new RegExp(`${basePath}/images/pay-period-planner-overview\\.png`));
  assert.match(html, new RegExp(`${basePath}/work/pay-period-planner/`));
  assert.match(html, new RegExp(`${basePath}/matthew-clark-resume\\.pdf`));
  assert.match(html, new RegExp(`${basePath}/icon\\.svg\\?`));
  await access(new URL(".nojekyll", outputRoot));
  await access(new URL("icon.svg", outputRoot));
  await access(new URL("og.png", outputRoot));
  await access(new URL("matthew-clark-resume.pdf", outputRoot));
  await access(new URL("images/matthew-clark.jpg", outputRoot));
});

test("exports the Pay Period Planner case study and approved evidence", async () => {
  const html = await readFile(
    new URL("work/pay-period-planner/index.html", outputRoot),
    "utf8",
  );
  assert.match(html, /<title>Pay Period Planner Case Study \| Matthew Clark<\/title>/i);
  assert.match(html, /<h1[^>]*>Pay Period Planner<\/h1>/i);
  assert.match(html, /id="product"/);
  assert.match(html, /id="journey"/);
  assert.match(html, /id="architecture"/);
  assert.match(html, /id="evidence"/);
  assert.match(html, /Situation/);
  assert.match(html, /Versioned aggregate replacement/);
  assert.match(html, /Claims with scope and limits/);
  assert.match(html, /Synthetic portfolio data only/);
  assert.match(html, /https:\/\/github\.com\/everdein\/pay-period-planner/);
  assert.match(
    html,
    /https:\/\/everdein\.github\.io\/portfolio\/work\/pay-period-planner\//,
  );

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.match(
    html,
    new RegExp(`${basePath}/images/pay-period-planner-projection\\.png`),
  );
  assert.match(
    html,
    new RegExp(`${basePath}/images/pay-period-planner-mobile\\.png`),
  );
  await access(new URL("images/pay-period-planner-projection.png", outputRoot));
  await access(new URL("images/pay-period-planner-mobile.png", outputRoot));
});

test("keeps the static site focused and free of server runtime", async () => {
  const [page, layout, css, packageJson, nextConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /pay-period-planner-overview\.png/);
  assert.match(layout, /matthew-clark-portfolio-theme/);
  assert.match(css, /html\[data-theme="dark"\]/);
  assert.match(css, /--rail-accent/);
  assert.match(nextConfig, /output: "export"/);
  assert.doesNotMatch(
    packageJson,
    /react-loading-skeleton|drizzle|tailwind|vinext|vite|wrangler|cloudflare/,
  );
  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await assert.rejects(access(new URL("worker", root)));
  await assert.rejects(access(new URL(".openai", root)));
  await access(new URL("public/images/pay-period-planner-overview.png", root));
  await access(new URL("public/images/matthew-clark.jpg", root));
  await access(new URL("public/.nojekyll", root));
});

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports the portfolio content and metadata", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  assert.match(html, /<title>Matthew Clark \| Software Engineer<\/title>/i);
  assert.match(html, /<h1[^>]*>Matthew Clark<\/h1>/i);
  assert.match(html, /id="work"/);
  assert.match(html, /id="approach"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Pay Period Planner/);
  assert.match(html, /DSA Dojo/);
  assert.match(html, /https:\/\/github\.com\/everdein\/pay-period-planner/);
  assert.match(html, /https:\/\/linkedin\.com\/in\/everdein/);
  assert.match(html, /https:\/\/everdein\.github\.io\/portfolio\/og\.png/);
  assert.match(html, /Toggle color theme/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is building/i);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.match(html, new RegExp(`${basePath}/images/pay-period-planner-overview\\.png`));
  await access(new URL(".nojekyll", outputRoot));
  await access(new URL("og.png", outputRoot));
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
  assert.match(nextConfig, /output: "export"/);
  assert.doesNotMatch(
    packageJson,
    /react-loading-skeleton|drizzle|tailwind|vinext|vite|wrangler|cloudflare/,
  );
  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await assert.rejects(access(new URL("worker", root)));
  await assert.rejects(access(new URL(".openai", root)));
  await access(new URL("public/images/pay-period-planner-overview.png", root));
  await access(new URL("public/.nojekyll", root));
});

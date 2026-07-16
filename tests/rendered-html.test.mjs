import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio content and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
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
  assert.match(html, /Toggle color theme/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is building/i);
});

test("removes starter-only surfaces and keeps the static site focused", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /pay-period-planner-overview\.png/);
  assert.match(layout, /matthew-clark-portfolio-theme/);
  assert.match(css, /html\[data-theme="dark"\]/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle|tailwind/);
  assert.doesNotMatch(packageJson, /WRANGLER_LOG_PATH=/);
  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await access(new URL("public/images/pay-period-planner-overview.png", root));
});

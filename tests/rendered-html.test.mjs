import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports the Dojo case study with working local navigation and qualified claims", async () => {
  const html = await readFile(new URL("work/dsa-dojo/index.html", outputRoot), "utf8");
  const home = await readFile(new URL("index.html", outputRoot), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.ok(home.includes(`href="${basePath}/work/dsa-dojo/"`));
  assert.match(html, /DSA Dojo Engineering Case Study/);
  assert.match(html, /Engineering case study/);
  for (const section of ["product", "decisions", "system", "evidence"]) {
    assert.ok(html.includes(`id="${section}"`));
    assert.ok(html.includes(`href="#${section}"`));
  }
  assert.match(html, /Learning gains, retention, and adoption have not been established/);
  assert.match(html, /independent solver/);
  assert.match(html, /retaining|Retaining/);
  assert.ok(html.includes(`href="${basePath}/work/pay-period-planner/"`));
  assert.match(html, /https:\/\/everdein\.github\.io\/portfolio\/work\/dsa-dojo\//);
  assert.match(html, /images\/dsa-dojo-lesson\.png/);
  await access(new URL("images/dsa-dojo-lesson.png", outputRoot));
});

test("exports the resume with professional content and a downloadable PDF", async () => {
  const html = await readFile(new URL("resume/index.html", outputRoot), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.match(html, /<title>Resume \| Matthew Clark<\/title>/);
  for (const heading of ["Professional summary", "Professional experience", "Selected independent projects", "Technical skills", "Education"]) assert.ok(html.includes(heading));
  assert.match(html, /September 2026–Present/);
  assert.match(html, /September 2023–September 2026/);
  assert.match(html, /3,335 test cases at 97\.08% coverage/);
  assert.match(html, /Local-first; not production hosted/);
  assert.match(html, /Bellevue College/);
  assert.ok(html.includes(`href="${basePath}/matthew-clark-resume.pdf" download=""`));
  assert.ok(html.includes(`href="${basePath}/matthew-clark-resume-dark.pdf" download=""`));
  assert.ok(html.includes(`href="${basePath}/matthew-clark-resume-regular.pdf" download=""`));
  assert.match(html, new RegExp(`href="${basePath}/matthew-clark-resume-regular.pdf"[^>]*target="_blank"`));
  assert.match(html, new RegExp(`href="${basePath}/matthew-clark-resume.pdf"[^>]*target="_blank"`));
  assert.match(html, new RegExp(`href="${basePath}/matthew-clark-resume-dark.pdf"[^>]*target="_blank"`));
  assert.doesNotMatch(html, /Print \/ save as PDF/);
  assert.match(html, /https:\/\/everdein\.github\.io\/portfolio\/resume\//);
  assert.match(html, /og-resume-20261024-syntax-accent\.png/);
});

test("exports the portfolio content and metadata", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  assert.match(html, /<title>Matthew Clark \| Senior Software Engineer<\/title>/i);
  assert.match(html, /<h1[^>]*>Matthew Clark<\/h1>/i);
  assert.match(html, /I design and build systems people can rely on/);
  assert.match(html, /id="professional"/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="approach"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /href="#professional"/);
  assert.match(html, /href="#projects"/);
  assert.ok(
    html.indexOf('id="professional"') < html.indexOf('id="projects"'),
    "professional impact should appear before selected projects",
  );
  assert.match(html, /Pay Period Planner/);
  assert.match(html, /Unit \+ integration[\s\S]{0,80}product behavior coverage/);
  assert.match(html, /Live browser[\s\S]{0,80}cross-layer workflow coverage/);
  assert.match(html, /PostgreSQL[\s\S]{0,80}relational runtime coverage/);
  assert.match(html, /https:\/\/github\.com\/everdein\/pay-period-planner/);
  assert.match(html, /DSA Dojo/);
  assert.match(html, /55 interactive[\s\S]{0,80}20 topics/);
  assert.match(html, /active-recall challenges/);
  assert.match(html, /side-by-side algorithm comparisons/);
  assert.match(html, /Nine reusable renderer families/);
  assert.match(html, /https:\/\/everdein\.github\.io\/dsa-dojo\//);
  assert.match(html, /https:\/\/github\.com\/everdein\/dsa-dojo/);
  assert.match(
    html,
    /github\.com\/everdein\/dsa-dojo\/blob\/main\/docs\/studio-architecture\.md/,
  );
  assert.match(html, /https:\/\/linkedin\.com\/in\/everdein/);
  assert.match(html, /href="mailto:everdein@gmail\.com"[^>]*>Email<\/a>/);
  assert.match(html, /https:\/\/www\.goodreads\.com\/everdein/);
  assert.match(html, /<footer[\s\S]*https:\/\/www\.goodreads\.com\/everdein/);
  assert.match(
    html,
    new RegExp(
      `href="${basePath}/resume/"`,
    ),
  );
  assert.match(html, /https:\/\/everdein\.github\.io\/portfolio\/og-20261024-syntax-accent\.png/);
  assert.match(html, /Matthew Clark wearing a light blue shirt against a softly blurred neutral background/);
  assert.match(html, /Working principle/);
  assert.match(
    html,
    /Make the product decision clear, keep system boundaries explicit,[\s\S]{0,40}leave evidence that the result works/,
  );
  assert.doesNotMatch(html, /Working principle \/ 01/);
  assert.match(html, /Independent systems/);
  assert.match(
    html,
    /Selected product work where the problem, architecture, tradeoffs,[\s\S]{0,80}verification are available for inspection/,
  );
  assert.match(html, /02 \/ Projects/);
  assert.match(html, /Evidence from production systems/);
  for (const [value, label] of [
    ["2", "Customer-facing applications"],
    ["3,335", "Automated test cases"],
    ["6", "Enforceable quality gates"],
    ["600+ MB", "Removed from production images"],
  ]) {
    assert.ok(html.includes(`<dt>${value}</dt><dd><strong>${label}</strong>`));
  }
  assert.match(html, /3,327 passing, 0 failing, with 97\.08% coverage/);
  assert.match(html, /other engineers independently extended and operated/);
  assert.match(html, /enterprise integrations/);
  assert.match(html, /PBK \/ Sep 2026–present/);
  assert.match(html, /State Farm \/ Sep 2023–Sep 2026/);
  assert.match(html, /State Farm \/ Jun 2021–Sep 2023/);
  assert.match(html, /intended to[\s\S]{0,40}cover 1,200\+ Deltek projects/);
  assert.doesNotMatch(html, /State Farm \/ 2023-present/);
  assert.match(html, /How I lead the work/);
  assert.match(html, /Create durable leverage/);
  assert.match(html, /Let&#x27;s talk about complex systems<\/h2>/);
  assert.match(html, /Switch to light theme/);
  assert.match(html, /aria-pressed="true"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is building/i);

  assert.match(html, new RegExp(`${basePath}/images/pay-period-planner-overview\\.png`));
  assert.match(html, new RegExp(`${basePath}/images/dsa-dojo-overview\\.jpg`));
  assert.match(html, new RegExp(`${basePath}/work/pay-period-planner/`));
  assert.match(
    html,
    new RegExp(
      `href="#projects"[^>]*>Explore projects</a>`,
    ),
  );
  assert.match(html, new RegExp(`${basePath}/resume/`));
  assert.match(html, new RegExp(`${basePath}/icon\\.svg\\?`));
  await access(new URL(".nojekyll", outputRoot));
  await access(new URL("icon.svg", outputRoot));
  await access(new URL("og-20261024-syntax-accent.png", outputRoot));
  await access(new URL("matthew-clark-resume.pdf", outputRoot));
  await access(new URL("images/matthew-clark-headshot.jpg", outputRoot));
  await access(new URL("images/dsa-dojo-overview.jpg", outputRoot));
});

test("exports the Pay Period Planner case study and approved evidence", async () => {
  const html = await readFile(
    new URL("work/pay-period-planner/index.html", outputRoot),
    "utf8",
  );
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.match(html, /<title>Pay Period Planner Engineering Case Study \| Matthew Clark<\/title>/i);
  assert.match(html, /<h1[^>]*>Pay Period Planner<\/h1>/i);
  assert.match(html, /id="product"/);
  assert.match(html, /id="decisions"/);
  assert.match(html, /id="system"/);
  assert.match(html, /id="evidence"/);
  assert.doesNotMatch(html, /STAR interview narrative/);
  assert.match(html, /Engineering case study/);
  assert.match(html, /Product design and end-to-end engineering/);
  assert.match(html, /no employer code, data, or implementation details appear here/);
  assert.match(html, /Claims with scope and limits/);
  for (const [value, label] of [
    ["Unit + integration", "Product behavior"],
    ["Live browser", "Cross-layer workflows"],
    ["PostgreSQL", "Relational runtime"],
    ["Axe + keyboard", "Accessible workflows"],
    ["320-1024px", "Responsive layouts"],
    ["CI + scans", "Security gates"],
  ]) {
    assert.ok(html.includes(`<strong>${value}</strong><span>${label}</span>`));
  }
  assert.doesNotMatch(html, /<strong>(119|123|63|28|29)<\/strong>/);
  assert.match(html, /qualified evidence report/);
  assert.match(
    html,
    /github\.com\/everdein\/pay-period-planner\/blob\/main\/docs\/engineering-evidence\.md/,
  );
  assert.match(html, /reflow into labeled rows without horizontal scrolling/);
  assert.match(html, /All screenshots use synthetic household data/);
  assert.match(html, /https:\/\/github\.com\/everdein\/pay-period-planner/);
  assert.match(
    html,
    new RegExp(`href="${basePath}/#projects"[^>]*>Back to projects</a>`),
  );
  assert.doesNotMatch(html, /href="[^\"]*#work"/);
  assert.match(
    html,
    /https:\/\/everdein\.github\.io\/portfolio\/work\/pay-period-planner\//,
  );

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
  assert.match(page, /dsa-dojo-overview\.jpg/);
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
  await access(new URL("public/images/dsa-dojo-overview.jpg", root));
  await access(new URL("public/images/matthew-clark-headshot.jpg", root));
  await access(new URL("public/.nojekyll", root));
});

test("all internal page links and section anchors resolve", async () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const pages = ["", "resume/", "work/pay-period-planner/", "work/dsa-dojo/"];
  for (const page of pages) {
    const html = await readFile(new URL(`${page}index.html`, outputRoot), "utf8");
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(href)) continue;
      const [path, anchor] = href.split("#");
      const relative = path ? path.slice(basePath.length).replace(/^\//, "") : page;
      const target = relative.endsWith("/") || !relative ? `${relative}index.html` : relative;
      await access(new URL(target, outputRoot));
      if (anchor) {
        const destination = await readFile(new URL(target, outputRoot), "utf8");
        assert.ok(destination.includes(`id="${anchor}"`), `${page}: ${href}`);
      }
    }
  }
});

test("case studies display all diagrams inline with route context", async () => {
 for (const project of ["pay-period-planner", "dsa-dojo"]) {
  const html = await readFile(new URL(`work/${project}/index.html`, outputRoot), "utf8");
  assert.match(html, /aria-label="Architecture diagrams"/);
  assert.match(html, /aria-label="Breadcrumb"/);
  assert.match(html, /aria-current="page"/);
  assert.doesNotMatch(html, /Download Mermaid|View diagram|case-study-rail/);
  const images = [...html.matchAll(/src="([^"]*\/diagrams\/[^"?#]+\.svg)"/g)];
  assert.equal(images.length, 3);
  for (const [, src] of images) {
   const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
   await access(new URL(src.slice(basePath.length).replace(/^\//, ""), outputRoot));
  }
 }
});

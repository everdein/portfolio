import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { checkPresence } from "../scripts/check-presence.mjs";

const policy = {
  siteUrl: "https://example.com/portfolio",
  currentTitle: "Senior Software Engineer", currentEmployer: "PBK", historicalImpactEmployer: "State Farm",
  resumeFormats: { light: "resume.pdf", dark: "resume-dark.pdf", regular: "resume-regular.pdf" },
  projects: [{ name: "Example", slug: "example", source: "https://example.com/source", live: "https://example.com/live/", evidenceImage: "images/product.png" }],
};
const basePath = "/portfolio";
const external = (label, href) => `<a href="${href}" target="_blank">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;

async function fixture(t) {
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), "portfolio-presence-"));
  t.after(() => {
    const target = path.resolve(outputRoot);
    assert.equal(path.dirname(target), path.resolve(os.tmpdir()));
    assert.ok(path.basename(target).startsWith("portfolio-presence-"));
    return rm(target, { recursive: true, force: true });
  });
  const pages = {
    "index.html": '<p class="role">Senior Software Engineer</p><section id="professional">PBK; previous outcomes at State Farm.</section><div aria-label="Example links"><a href="/portfolio/work/example/">Read case study</a>' + external("View source", policy.projects[0].source) + external("Open Example", policy.projects[0].live) + '</div><img src="/portfolio/images/product.png?v=1">',
    "resume/index.html": '<p class="role">Senior Software Engineer</p>' + Object.entries(policy.resumeFormats).map(([format, file]) => `<a href="/portfolio/${file}" download aria-label="Download ${format} PDF">${format}</a><a href="/portfolio/${file}" target="_blank" aria-label="View ${format} PDF (opens in a new tab)">${format}</a>`).join(""),
    "work/example/index.html": '<div class="case-study-actions">' + external("View source", policy.projects[0].source) + external("Open Example", policy.projects[0].live) + "</div>",
  };
  for (const [file, html] of Object.entries(pages)) {
    await mkdir(path.dirname(path.join(outputRoot, file)), { recursive: true });
    await writeFile(path.join(outputRoot, file), html);
  }
  await mkdir(path.join(outputRoot, "images"));
  await writeFile(path.join(outputRoot, "images/product.png"), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]));
  for (const file of Object.values(policy.resumeFormats)) await writeFile(path.join(outputRoot, file), "%PDF-1.7\nfixture");
  return { outputRoot, basePath, policy, pages };
}

test("valid exported routes, product destinations and all PDF action pairs pass", async (t) => {
  const options = await fixture(t);
  assert.equal((await checkPresence(options)).passed, true);
});

test("a dark View action cannot silently open the light PDF", async (t) => {
  const options = await fixture(t);
  options.pages["resume/index.html"] = options.pages["resume/index.html"].replace('href="/portfolio/resume-dark.pdf" target="_blank"', 'href="/portfolio/resume.pdf" target="_blank"');
  assert.match((await checkPresence(options)).findings.join("\n"), /dark Download\/View/);
});

test("a View action cannot silently download the otherwise correct PDF", async (t) => {
  const options = await fixture(t);
  options.pages["resume/index.html"] = options.pages["resume/index.html"].replace('href="/portfolio/resume-dark.pdf" target="_blank"', 'href="/portfolio/resume-dark.pdf" target="_blank" download');
  assert.match((await checkPresence(options)).findings.join("\n"), /dark Download\/View/);
});

test("a source link cannot borrow a matching URL elsewhere or point at the live product", async (t) => {
  const options = await fixture(t);
  options.pages["index.html"] = options.pages["index.html"].replace('href="https://example.com/source"', 'href="https://example.com/live/"') + external("Unrelated", policy.projects[0].source);
  assert.match((await checkPresence(options)).findings.join("\n"), /Example View source has wrong/);
});

test("missing local images, invalid paths and malformed PDF content fail", async (t) => {
  const options = await fixture(t);
  options.pages["index.html"] += '<img src="/portfolio/images/missing.png"><img src="/portfolio/%ZZ.png"><a href="/outside/">Wrong base</a><meta property="og:image" content="https://example.com/portfolio/images/missing-social.png"><img src="/portfolio/images/product.png" srcset="/portfolio/images/missing-wide.png 2x">';
  await writeFile(path.join(options.outputRoot, "resume-regular.pdf"), "not a PDF");
  const findings = (await checkPresence(options)).findings.join("\n");
  assert.match(findings, /missing or malformed local target images\/missing.png/);
  assert.match(findings, /malformed or out-of-base reference \/portfolio\/%ZZ.png/);
  assert.match(findings, /malformed or out-of-base reference \/outside\//);
  assert.match(findings, /missing or malformed local target resume-regular.pdf/);
  assert.match(findings, /missing or malformed local target images\/missing-social.png/);
  assert.match(findings, /missing or malformed local target images\/missing-wide.png/);
});

test("repository artwork cannot replace product evidence even when the asset exists", async (t) => {
  const options = await fixture(t);
  await writeFile(path.join(options.outputRoot, "images/example-github-thumbnail.png"), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]));
  options.pages["index.html"] = options.pages["index.html"].replace("images/product.png", "images/example-github-thumbnail.png");
  const findings = (await checkPresence(options)).findings.join("\n");
  assert.match(findings, /repository\/social artwork cannot replace/);
  assert.match(findings, /missing approved Example product evidence image/);
});

test("current role and historical employer attribution cannot silently disappear", async (t) => {
  const options = await fixture(t);
  options.pages["index.html"] = options.pages["index.html"].replace("Senior Software Engineer", "Lead Software Engineer").replace("State Farm", "another employer");
  const findings = (await checkPresence(options)).findings.join("\n");
  assert.match(findings, /approved current role/);
  assert.match(findings, /historical employer attribution/);
});

test("historical employer elsewhere cannot excuse attributing its outcomes to PBK", async (t) => {
  const options = await fixture(t);
  options.pages["index.html"] = options.pages["index.html"].replace("PBK; previous outcomes at State Farm.", "At PBK, previously worked at State Farm. The outcomes below come from my PBK tenure.");
  assert.match((await checkPresence(options)).findings.join("\n"), /historical employer attribution/);
});

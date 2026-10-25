import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const defaultRoot = fileURLToPath(new URL("../out/", import.meta.url));
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const origin = "https://presence.invalid";

function decodeHtml(text) {
  return text.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[a-f\d]+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const number = entity[2].toLowerCase() === "x" ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10);
    return number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  });
}

function attributes(tag) {
  const result = {};
  for (const [, name, double, single, bare] of tag.matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[name.toLowerCase()] = decodeHtml(double ?? single ?? bare ?? "");
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "gi"))].map((match) => attributes(match[1]));
}

function text(html) {
  return decodeHtml(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map(([, opening, body]) => ({
      ...attributes(opening),
      text: text(body.replace(/<span\b([^>]*)>[\s\S]*?<\/span>/gi, (span, attrs) => attributes(attrs).class?.split(/\s+/).includes("sr-only") ? "" : span)),
    }));
}

function region(html, tag, attribute, value) {
  for (const match of html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))) {
    const attrs = attributes(match[1]);
    const matches = attribute === "class" ? attrs.class?.split(/\s+/).includes(value) : attrs[attribute] === value;
    if (matches) return html.slice(match.index + match[0].length, html.indexOf(`</${tag}>`, match.index));
  }
  return "";
}

function localReference(reference, page, basePath) {
  // Decode first so malformed encodings and traversal cannot be hidden by URL normalization.
  const decoded = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (/[\\\u0000-\u001f]/.test(decoded)) throw new Error("Malformed path");
  const target = new URL(reference, `${origin}${basePath}/${page}`);
  if (target.origin !== origin) return null;
  let pathname = decodeURIComponent(target.pathname);
  if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) throw new Error("Outside configured base path");
  pathname = pathname.slice(basePath.length).replace(/^\//, "");
  return pathname.endsWith("/") || !pathname ? `${pathname}index.html` : pathname;
}

async function htmlFiles(root, relative = "") {
  const files = [];
  for (const entry of await readdir(path.join(root, relative), { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(root, name));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(name);
  }
  return files;
}

export async function checkPresence({ outputRoot = defaultRoot, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "", policy, pages } = {}) {
  policy ??= JSON.parse(await readFile(new URL("../docs/presence-policy.json", import.meta.url), "utf8"));
  const findings = [];
  const checked = new Set();
  const documents = pages ?? Object.fromEntries(await Promise.all((await htmlFiles(outputRoot)).map(async (file) => [file, await readFile(path.join(outputRoot, file), "utf8")])));
  const route = (relative) => `${basePath}/${relative}`;

  for (const [page, original] of Object.entries(documents)) {
    // Next's serialized data may contain strings resembling markup; inspect rendered HTML only.
    const html = original.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) => script.slice(0, script.indexOf(">") + 1));
    if (tags(html, "img").some((image) => !image.src)) findings.push(`${page}: image has no source`);
    const references = [
      ...tags(html, "img").map((attrs) => attrs.src),
      ...[...tags(html, "img"), ...tags(html, "source")].flatMap((attrs) => (attrs.srcset ?? "").split(",").map((item) => item.trim().split(/\s+/, 1)[0]).filter(Boolean)),
      ...tags(html, "script").map((attrs) => attrs.src),
      ...tags(html, "link").map((attrs) => attrs.href),
      ...anchors(html).map((attrs) => attrs.href),
      ...tags(html, "meta").filter((attrs) => /^(og:image(?::url)?|twitter:image)$/.test(attrs.property ?? attrs.name ?? "")).map((attrs) => attrs.content),
    ].filter((reference) => reference !== undefined);
    for (let reference of references) {
      if (/^https?:/i.test(reference)) {
        try {
          const target = new URL(reference);
          const site = policy.siteUrl ? new URL(policy.siteUrl) : null;
          const prefix = site?.pathname.replace(/\/$/, "");
          if (!site || target.origin !== site.origin || !target.pathname.startsWith(`${prefix}/`)) continue;
          reference = `${basePath}${target.pathname.slice(prefix.length)}${target.search}${target.hash}`;
        } catch { findings.push(`${page}: malformed URL ${reference}`); continue; }
      }
      if (/^(mailto:|tel:|data:)/i.test(reference)) continue;
      if (/^[a-z][a-z\d+.-]*:/i.test(reference) || reference.startsWith("//")) {
        findings.push(`${page}: unsupported destination ${reference}`);
        continue;
      }
      let relative;
      try { relative = localReference(reference, page, basePath); }
      catch { findings.push(`${page}: malformed or out-of-base reference ${reference}`); continue; }
      if (!relative || checked.has(relative)) continue;
      checked.add(relative);
      try {
        const target = path.resolve(outputRoot, relative);
        if (!target.startsWith(`${path.resolve(outputRoot)}${path.sep}`) || !(await stat(target)).isFile()) throw new Error("Invalid target");
        const extension = path.extname(target).toLowerCase();
        if ([".png", ".jpg", ".jpeg", ".svg", ".pdf"].includes(extension)) {
          const data = await readFile(target);
          if (extension === ".png" && !data.subarray(0, 8).equals(pngSignature)) throw new Error("Invalid PNG header");
          if ([".jpg", ".jpeg"].includes(extension) && (data[0] !== 255 || data[1] !== 216 || data[2] !== 255)) throw new Error("Invalid JPEG header");
          if (extension === ".pdf" && data.subarray(0, 5).toString() !== "%PDF-") throw new Error("Invalid PDF header");
          if (extension === ".svg" && !/<svg\b[\s\S]*<\/svg>/.test(data.toString("utf8"))) throw new Error("Invalid SVG document");
        }
      } catch { findings.push(`${page}: missing or malformed local target ${relative}`); }
    }
    if (tags(html, "img").some((attrs) => /(?:github-thumbnail|banner-thumbnail|goodreads-thumbnail)/.test(attrs.src ?? ""))) {
      findings.push(`${page}: repository/social artwork cannot replace portfolio evidence imagery`);
    }
  }

  const home = documents["index.html"] ?? "";
  const resume = documents["resume/index.html"] ?? "";
  for (const [page, html] of [["index.html", home], ["resume/index.html", resume]]) {
    const roles = [...html.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi)].filter(([, attrs]) => attributes(attrs).class?.split(/\s+/).includes("role"));
    if (text(roles[0]?.[2] ?? "") !== policy.currentTitle) findings.push(`${page}: approved current role is missing`);
  }
  const impact = text(region(home, "section", "id", "professional"));
  const historicalEmployer = policy.historicalImpactEmployer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Validate the sentence attaching outcomes to the employer, not a separate
  // career-history mention elsewhere in the section.
  const attribution = new RegExp(`\\b(?:outcomes|results)\\b[^.!?;]*\\b(?:from|during|at)\\s+(?:my\\s+)?${historicalEmployer}\\b`, "i");
  if (!impact.includes(policy.currentEmployer) || !attribution.test(impact)) findings.push("index.html: professional impact must distinguish current and historical employer attribution");
  for (const project of policy.projects) {
    const card = region(home, "div", "aria-label", `${project.name} links`);
    const links = anchors(card);
    const expected = [["Read case study", route(`work/${project.slug}/`)], ["View source", project.source]];
    if (project.live) expected.push([`Open ${project.name}`, project.live]);
    for (const [label, destination] of expected) {
      if (!links.some((link) => link.text === label && link.href === destination)) findings.push(`index.html: ${project.name} ${label} has wrong or missing destination`);
    }
    if (!tags(home, "img").some((image) => image.src?.split(/[?#]/, 1)[0] === route(project.evidenceImage))) findings.push(`index.html: missing approved ${project.name} product evidence image`);
    const casePath = `work/${project.slug}/index.html`;
    const caseLinks = anchors(region(documents[casePath] ?? "", "div", "class", "case-study-actions"));
    if (!caseLinks.some((link) => link.text === "View source" && link.href === project.source)) findings.push(`${casePath}: missing or wrong source destination`);
    if (project.live && !caseLinks.some((link) => link.text === `Open ${project.name}` && link.href === project.live)) findings.push(`${casePath}: missing or wrong live destination`);
  }
  const resumeLinks = anchors(resume);
  for (const [format, filename] of Object.entries(policy.resumeFormats)) {
    const expected = route(filename);
    const downloads = resumeLinks.filter((link) => link["aria-label"] === `Download ${format} PDF`);
    const views = resumeLinks.filter((link) => link["aria-label"]?.startsWith(`View ${format} PDF`));
    if (downloads.length !== 1 || views.length !== 1 || downloads[0]?.href !== expected || views[0]?.href !== expected || !Object.hasOwn(downloads[0] ?? {}, "download") || Object.hasOwn(views[0] ?? {}, "download") || views[0]?.target !== "_blank") findings.push(`resume/index.html: ${format} Download/View must target the same approved PDF with the correct action`);
  }
  return { passed: findings.length === 0, checkedPages: Object.keys(documents).length, checkedLocalTargets: checked.size, findings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const result = await checkPresence();
    console.log(JSON.stringify(result, null, 2));
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    console.error(`Presence check unavailable: ${error.message}`);
    process.exitCode = 1;
  }
}

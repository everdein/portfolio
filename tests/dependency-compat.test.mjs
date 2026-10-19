import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const pluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
const { getRootDirs } = pluginRequire("./utils/get-root-dirs.js");

test("Next lint root discovery supports directory globs with the scoped replacement", () => {
  const root = mkdtempSync(path.join(tmpdir(), "portfolio-lint-"));
  const normalizedRoot = root.replaceAll("\\", "/");
  const first = `${normalizedRoot}/app-a`;
  const second = `${normalizedRoot}/app-b`;
  mkdirSync(first);
  mkdirSync(second);
  writeFileSync(`${normalizedRoot}/app-file`, "not a directory");

  const roots = (rootDir) => getRootDirs({ cwd: root, settings: { next: { rootDir } } })
    .map((directory) => path.resolve(directory).replaceAll("\\", "/"))
    .sort();
  try {
    assert.deepEqual(getRootDirs({ cwd: root, settings: {} }), [root]);
    assert.deepEqual(roots(`${normalizedRoot}/app-*`), [first, second]);
    assert.deepEqual(roots(`${normalizedRoot}/{app-a,app-b}`), [first, second]);
    assert.deepEqual(roots([first, second]), [first, second]);
    assert.deepEqual(roots(`${normalizedRoot}/missing-*`), []);
    assert.deepEqual(roots(`${root}\\app-*`), [first, second]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

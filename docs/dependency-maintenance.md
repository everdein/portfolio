# Dependency and runtime maintenance

Checked against the npm registry and official release metadata on October 24, 2026.

Use Node.js **24.22.1 LTS** (selected by `.node-version`) with its bundled npm 11.19.1. Node 26.12.1 is also supported. CI reads the version file; algorithm projects additionally verify Node 26.12.1. These are patched releases; older 24.x/26.x versions are outside the declared engine range.

## Declared dependency baseline

| Package            | Version |
| ------------------ | ------- |
| next               | 16.4.3  |
| react              | 19.3.1  |
| react-dom          | 19.3.1  |
| @playwright/test   | 1.64.1  |
| @types/node        | 26.6.5  |
| @types/react       | 19.3.0  |
| @types/react-dom   | 19.3.0  |
| eslint             | 9.39.5  |
| eslint-config-next | 16.4.3  |
| typescript         | 6.0.3   |

## Compatibility constraints

ESLint remains **9.39.5** because the current React and JSX accessibility plugins declare support through ESLint 9, not 10. TypeScript remains **6.0.3** because typescript-eslint 8.72.0 declares `>=4.8.4 <6.1.0`, and TypeScript 7 changes the compiler API used by these integrations. Do not bypass peer dependencies with force or legacy-peer-deps. Revisit when the upstream plugins support the newer majors.

React/React DOM 19.3.1, Vitest/coverage 5.0.5, Playwright 1.64.1, and axe-core Playwright 4.14.0 were already current where used. Lockfiles include current compatible transitive dependencies. Scoped overrides and their current revisit criteria are documented below.

## Scoped override ownership and removal

Reviewed October 25, 2026 against the manifest, lockfile, installed tree and
published npm declarations. Maintainer owner for both overrides: Matthew Clark.
An implementation agent may gather evidence and prepare a change; removal is a
separate verified dependency change, not a consequence of this documentation.

### Next ESLint plugin: fast-glob replacement

`eslint-config-next@16.4.3` owns `@next/eslint-plugin-next@16.4.3`, whose
published declaration requests `fast-glob@3.3.1`. The scoped override resolves
that package name to `tinyglobby@0.2.17`. It applies to that declaring owner,
not every glob dependency. Next's root-discovery utility uses `globSync` with
directory-only matching; `tests/dependency-compat.test.mjs` exercises that
actual utility for default cwd, glob/brace patterns, multiple roots, missing
matches and Windows separators. This test runs first in `npm run lint`.

The alias was introduced to avoid the `braces` dependency chain associated
with [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
GitHub withdrew that advisory on October 23, 2026 because it was not considered
practically exploitable. Treat this as historical rationale, not evidence of
an active unpatched vulnerability or a new security finding. Withdrawal is a
reason to revisit the workaround; it does not by itself establish that a
dependency-tree change has been validated here.

Revisit on each Next/plugin upgrade, a change to glob API usage, or an advisory
status change. Before removing/replacing the alias, inspect the selected
upstream tree without it, review current advisories and peer/runtime constraints,
and verify Next's directory-discovery behavior, lint, exported/rendered output
and applicable browser checks. Record the decision and the resolved lockfile
tree. Keep focused compatibility coverage while the alias remains; adjust it
to the selected upstream implementation when a removal is actually verified.

### Next: PostCSS pin

The scoped `next` override pins `postcss@8.5.23`; current `next@16.4.3` already
declares exactly `8.5.23`, and the lockfile/installed tree resolves that version.
The pin is retained pending a clean redundancy review. Repository history shows
an earlier pin being advanced to this version; it does not establish a specific
original advisory rationale. Do not invent one or describe current Next as
requesting an older PostCSS release.

Revisit on every Next update or a PostCSS advisory/declaration change. Removal
requires a clean no-override resolution of the selected Next version, comparison
of the actual tree/lockfile, current audit evidence, lint, production export and
rendered/browser verification. If the new tree still needs a pin, document its
current reason and version constraint. Matching declarations make this a
candidate for review, not a removal already proved by this docs-only change.

## Update procedure

Check current stable releases and peer/runtime requirements, update manifests and lockfiles together, run a clean install, audit dependencies, and run the project verification gate plus applicable browser checks. Keep historical ADRs unchanged and update current requirements when the runtime baseline changes. Record any intentional version constraint here rather than reporting an incompatible major as installed.

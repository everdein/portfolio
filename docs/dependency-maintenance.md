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

React/React DOM 19.3.1, Vitest/coverage 5.0.5, Playwright 1.64.1, and axe-core Playwright 4.14.0 were already current where used. Lockfiles include current compatible transitive dependencies. Existing security overrides remain scoped and covered by their compatibility checks.

## Update procedure

Check current stable releases and peer/runtime requirements, update manifests and lockfiles together, run a clean install, audit dependencies, and run the project verification gate plus applicable browser checks. Keep historical ADRs unchanged and update current requirements when the runtime baseline changes. Record any intentional version constraint here rather than reporting an incompatible major as installed.

# Portfolio Agent Guide

## Scope

This repository is Matthew Clark's public engineering portfolio. Keep it
static, fast, accessible, and easy to inspect. Do not add authentication,
persistence, analytics, external AI services, or contact-form processing
without an explicit product decision.

## Content Safety

- Use only public professional information and synthetic project imagery.
- Never add personal financial data, credentials, private employer details, or
  unpublished resume content.
- Treat linked project repositories and their public case studies as the source
  of truth for technical claims.

## Experience

- Preserve the Dual Canvas structure and complete light/dark theme support.
- Keep Matthew Clark and selected work visible in the first viewport.
- Maintain semantic landmarks, keyboard focus, reduced-motion behavior, and
  responsive layouts from 320px upward.
- Use real project images for project evidence. Avoid decorative gradients,
  illustrations, and nested cards.

## Verification

Run from the repository root:

```bash
npm run lint
npm test
```

Update rendered HTML tests when public content or metadata changes.

## Hosting

- The site is a Next.js static export deployed to GitHub Pages.
- Keep `/portfolio` base-path handling aligned across `next.config.ts`, page
  assets, metadata, tests, and `.github/workflows/ci.yml`.
- Pull requests verify but do not deploy. Only a passing `main` workflow may
  publish the `out/` artifact.
- Do not add server-only Next.js APIs unless the hosting decision changes.

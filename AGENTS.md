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
Run `npm run test:browser` for navigation, layout, theme, download, or other
browser-visible changes. `npm run verify` runs all three verification stages.

## Documentation

Use `docs/visual-system.md` for approved visual and navigation rules,
`docs/resume.md` for native document exports and public PDF routes, and
`docs/dependency-maintenance.md` for runtime and compatibility decisions.
Project implementation and its canonical case study own technical claims;
update the relevant owner when behavior changes, without rewriting all docs.

## Hosting

- The site is a Next.js static export deployed to GitHub Pages.
- Keep `/portfolio` base-path handling aligned across `next.config.ts`, page
  assets, metadata, tests, and `.github/workflows/ci.yml`.
- Pull requests verify but do not deploy. Only a passing `main` workflow may
  publish the `out/` artifact.
- Do not add server-only Next.js APIs unless the hosting decision changes.

## Delegation

Use subagents for independent, bounded work when doing so would materially
improve speed or quality. Keep small or tightly dependent tasks in the main
agent. Use clear file ownership, avoid duplicate work, and have the main agent
integrate and verify the results. Follow the project's usage budget and
stopping rules. Start with at most two helpers; avoid recursive delegation.

Give each helper a question, scope, evidence requirement, and stopping condition.
Parallel writers need disjoint files or isolated worktrees. The parent owns
integration, verification, and publication; do not concurrently switch branches.

## Completion And Publication

For implementation tasks, verify the intended change, commit only its files,
push, and open a ready pull request. Merge after required checks pass, verify
the actual merge SHA's main CI and applicable Pages deployment, and check the
affected live routes or artifacts. Synchronize local `main` and delete the
completed task's local and remote branches after confirming its merged PR and
head. Preserve unrelated work and active branches; never bypass required checks.
Use configured `GH_TOKEN` first and never print or persist its value.

Read-only reviews, planning, and explicit local-only or draft-only requests
retain their requested scope. LinkedIn, Goodreads, Drive, and other social
updates require user intent for that destination. Report passed, failed,
skipped, or blocked checks and the exact remaining obstacle.

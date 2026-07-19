# Matthew Clark Portfolio

Public engineering portfolio for Matthew Clark. The site presents selected
work, architectural reasoning, and engineering evidence without coupling the
portfolio itself to any one product.

Pay Period Planner is the flagship case study. A public resume and compact
experience summary connect that project evidence to professional scope without
turning the homepage into a second resume.
The internal `/work/pay-period-planner/` route turns the approved repository
case study into a product-first walkthrough with qualified engineering evidence.

## Design Direction

The site uses the Dual Canvas visual system:

- a compact navigation rail on larger screens
- responsive top navigation on smaller screens
- forest green for architecture and product signals
- cobalt for verification and navigation signals
- complete light and dark themes with saved local preference
- real product imagery rather than decorative illustrations

## Technology

- React 19
- TypeScript
- Next.js static export
- GitHub Pages delivery through the required CI workflow
- Node's built-in test runner for exported HTML checks
- Playwright smoke coverage for routes, theme persistence, responsive
  containment, anchors, screenshots, and the public resume
- ESLint and GitHub Actions verification

The first version intentionally has no authentication, database, contact form,
analytics, or chatbot. Those features should be added only when they serve a
clear portfolio need.

## Local Development

Requires Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run lint
npm test
npm run test:browser
```

`npm test` creates a static production export and verifies its content,
metadata, public links, theme support, GitHub Pages asset paths, and absence of
server-only runtime surfaces. `npm run test:browser` starts the site on an
isolated local port and exercises the portfolio-critical Chromium workflows.

## Deployment

Pull requests run the same static export checks without publishing. A passing
push to `main` uploads the generated `out/` directory and deploys it to
[GitHub Pages](https://everdein.github.io/portfolio/). The portfolio contains no
server process, runtime secrets, authentication, or persistence.

## Content Sources

- [Pay Period Planner](https://github.com/everdein/pay-period-planner)
- [Pay Period Planner case study](https://github.com/everdein/pay-period-planner/blob/main/docs/portfolio-case-study.md)
- [Pay Period Planner engineering evidence](https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md)
- [GitHub profile](https://github.com/everdein)
- [Goodreads](https://www.goodreads.com/everdein)

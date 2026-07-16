# Matthew Clark Portfolio

Public engineering portfolio for Matthew Clark. The site presents selected
work, architectural reasoning, and engineering evidence without coupling the
portfolio itself to any one product.

Pay Period Planner is the flagship case study. DSA Dojo provides supporting
evidence of deliberate practice and explainable problem solving.

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
- vinext and Vite
- Cloudflare-compatible static delivery through Sites
- Node's built-in test runner for rendered HTML checks
- ESLint and GitHub Actions

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
```

`npm test` creates a production build and verifies the rendered portfolio
content, metadata, public links, theme support, and removal of starter-only
surfaces.

## Content Sources

- [Pay Period Planner](https://github.com/everdein/pay-period-planner)
- [Pay Period Planner case study](https://github.com/everdein/pay-period-planner/blob/main/docs/portfolio-case-study.md)
- [Pay Period Planner engineering evidence](https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md)
- [DSA Dojo](https://github.com/everdein/dsa)
- [GitHub profile](https://github.com/everdein)

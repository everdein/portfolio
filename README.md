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
- Next.js static export
- GitHub Pages delivery through the required CI workflow
- Node's built-in test runner for exported HTML checks
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
```

`npm test` creates a static production export and verifies its content,
metadata, public links, theme support, GitHub Pages asset paths, and absence of
server-only runtime surfaces.

## Deployment

Pull requests run the same static export checks without publishing. A passing
push to `main` uploads the generated `out/` directory and deploys it to
[GitHub Pages](https://everdein.github.io/portfolio/). The portfolio contains no
server process, runtime secrets, authentication, or persistence.

## Content Sources

- [Pay Period Planner](https://github.com/everdein/pay-period-planner)
- [Pay Period Planner case study](https://github.com/everdein/pay-period-planner/blob/main/docs/portfolio-case-study.md)
- [Pay Period Planner engineering evidence](https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md)
- [DSA Dojo](https://github.com/everdein/dsa)
- [GitHub profile](https://github.com/everdein)

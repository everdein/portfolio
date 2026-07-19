import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "../../ExternalLink";
import { payPeriodPlannerEvidence } from "../../payPeriodPlannerEvidence";
import { ThemeToggle } from "../../ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdein.github.io/portfolio";
const caseStudyUrl = `${siteUrl}/work/pay-period-planner/`;
const repositoryUrl = "https://github.com/everdein/pay-period-planner";
const evidenceUrl = `${repositoryUrl}/blob/main/docs/engineering-evidence.md`;

const title = "Pay Period Planner Case Study | Matthew Clark";
const description =
  "How Matthew Clark evolved a household cash-flow prototype into an authenticated React, Spring Boot, and PostgreSQL planning workspace.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: caseStudyUrl,
  },
  openGraph: {
    type: "article",
    url: caseStudyUrl,
    title,
    description,
    images: [
      {
        url: `${siteUrl}/images/pay-period-planner-overview.png`,
        width: 1440,
        height: 900,
        alt: "Pay Period Planner household overview populated with synthetic data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/images/pay-period-planner-overview.png`],
  },
};

const architectureSteps = [
  {
    name: "React + Redux Toolkit",
    detail: "Session recovery, one canonical draft, editing workflows, and projections",
  },
  {
    name: "Spring Boot HTTP boundary",
    detail: "Workspace authority, CSRF, validation, and intentionally safe errors",
  },
  {
    name: "Queries and commands",
    detail: "Normalization, calculations, presentation, and versioned replacement",
  },
  {
    name: "PostgreSQL + Flyway",
    detail: "Identity, relational financial records, ownership, and audit history",
  },
];

export default function PayPeriodPlannerCaseStudy() {
  return (
    <div className="canvas case-study-canvas">
      <a className="skip-link" href="#case-study-content">
        Skip to case study
      </a>

      <aside className="rail case-study-rail" aria-label="Case study navigation">
        <a
          className="rail-mark"
          href={`${basePath}/`}
          aria-label="Matthew Clark portfolio home"
        >
          MC
        </a>
        <p className="rail-edition">
          Flagship case study
          <br />
          Pay Period Planner / 2026
        </p>
        <nav aria-label="Case study sections">
          <a href="#product">
            <span className="nav-index" aria-hidden="true">
              01
            </span>
            <span className="nav-label">Product</span>
          </a>
          <a href="#journey">
            <span className="nav-index" aria-hidden="true">
              02
            </span>
            <span className="nav-label">Journey</span>
          </a>
          <a href="#architecture">
            <span className="nav-index" aria-hidden="true">
              03
            </span>
            <span className="nav-label">System</span>
          </a>
          <a href="#evidence">
            <span className="nav-index" aria-hidden="true">
              04
            </span>
            <span className="nav-label">Evidence</span>
          </a>
        </nav>
        <div className="rail-status case-study-rail-status">
          <a href={`${basePath}/#work`}>Back to selected work</a>
          <span>React / Spring Boot / PostgreSQL</span>
        </div>
      </aside>

      <main className="case-study-main" id="case-study-content">
        <header className="topbar" id="case-study-top">
          <p className="topbar-id">
            Pay Period Planner <span>Product / Architecture / Evidence</span>
          </p>
          <ThemeToggle />
        </header>

        <article>
          <header className="case-study-hero" aria-labelledby="case-study-title">
            <p className="role">Flagship full-stack case study</p>
            <h1 id="case-study-title">Pay Period Planner</h1>
            <p className="case-study-deck">
              A household cash-flow workspace that turns income, recurring bills,
              savings, debt, and important dates into a versioned plan for the next
              pay period.
            </p>
            <div className="case-study-actions">
              <ExternalLink className="primary-link" href={repositoryUrl}>
                View source
              </ExternalLink>
              <ExternalLink href={evidenceUrl}>Engineering evidence</ExternalLink>
              <a href={`${basePath}/#work`}>Back to portfolio</a>
            </div>

            <dl className="case-study-facts" aria-label="Project summary">
              <div>
                <dt>Product boundary</dt>
                <dd>One household planning workspace</dd>
              </div>
              <div>
                <dt>Mutation model</dt>
                <dd>Versioned aggregate replacement</dd>
              </div>
              <div>
                <dt>Runtime store</dt>
                <dd>Workspace-owned PostgreSQL</dd>
              </div>
              <div>
                <dt>Current posture</dt>
                <dd>Local-first portfolio release</dd>
              </div>
            </dl>
          </header>

          <figure className="case-study-lead-visual">
            <div className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="browser-label">
                Authenticated workspace / Household overview
              </span>
            </div>
            <div className="case-study-overview-image">
              <Image
                src={`${basePath}/images/pay-period-planner-overview.png`}
                alt="Pay Period Planner household overview with projection, balances, cash flow, and calendar summaries"
                fill
                priority
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 82vw, 1120px"
              />
            </div>
            <figcaption>
              Synthetic portfolio data only. The fixture represents an established
              senior technical household and is not financial advice or a statement
              about the developer&apos;s finances.
            </figcaption>
          </figure>

          <section
            className="case-study-section"
            id="product"
            aria-labelledby="product-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">01 / Product</span>
                <h2 id="product-heading">Make the next decision visible</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  The product began with a practical question: after the next
                  paycheck and its obligations, what cash is actually available for
                  debt, savings, or the following period?
                </p>
                <p>
                  The interface keeps the answer connected to its inputs instead of
                  hiding it behind an opaque score or a second editing surface.
                </p>
              </div>
            </div>

            <div className="decision-ledger" aria-label="Planning decisions">
              <div>
                <span>01</span>
                <strong>What arrives</strong>
                <p>Paychecks, additional income, cadence, and planning dates.</p>
              </div>
              <div>
                <span>02</span>
                <strong>What leaves</strong>
                <p>Recurring bills, annual obligations, housing, and debt.</p>
              </div>
              <div>
                <span>03</span>
                <strong>What can move</strong>
                <p>Possible debt payments, savings transfers, and reserves.</p>
              </div>
            </div>

            <div className="case-study-media-grid">
              <figure className="case-study-figure">
                <div className="case-study-figure-heading">
                  <span>Projection workflow</span>
                  <strong>Explain the estimate</strong>
                </div>
                <div className="case-study-projection-image">
                  <Image
                    src={`${basePath}/images/pay-period-planner-projection.png`}
                    alt="Pay Period Planner next-paycheck projection with planning schedule, selected inputs, and possible allocations"
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1200px) 58vw, 760px"
                  />
                </div>
                <figcaption>
                  Stable record IDs define the housing payment, reserve, and primary
                  paycheck roles. Editable labels are never identity.
                </figcaption>
              </figure>

              <figure className="case-study-figure case-study-mobile-figure">
                <div className="case-study-figure-heading">
                  <span>Responsive workflow</span>
                  <strong>Keep planning usable on a phone</strong>
                </div>
                <div className="case-study-mobile-image">
                  <Image
                    src={`${basePath}/images/pay-period-planner-mobile.png`}
                    alt="Pay Period Planner monthly withdrawals workflow at a 390 pixel mobile viewport"
                    fill
                    sizes="(max-width: 760px) 88vw, 300px"
                  />
                </div>
                <figcaption>
                  Grouped navigation becomes one section selector, controls wrap,
                  and financial tables reflow into labeled rows without horizontal
                  scrolling.
                </figcaption>
              </figure>
            </div>
          </section>

          <section
            className="case-study-section case-study-journey"
            id="journey"
            aria-labelledby="journey-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">02 / Journey</span>
                <h2 id="journey-heading">From useful prototype to coherent system</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  The first React and Spring Boot version used one local JSON
                  snapshot. It proved the workflow quickly, but it also created two
                  startup modes, global ownership, file-write risk, and no safe path
                  for multiple users.
                </p>
              </div>
            </div>

            <div className="star-ledger" aria-label="STAR interview narrative">
              <div>
                <span>Situation</span>
                <p>
                  A working financial tool had real value, but its prototype storage
                  and authentication boundaries would multiply complexity with every
                  new feature.
                </p>
              </div>
              <div>
                <span>Task</span>
                <p>
                  Create one scalable runtime without silently moving personal data
                  or losing the pay-period workflow that made the product useful.
                </p>
              </div>
              <div>
                <span>Action</span>
                <p>
                  Introduce workspace ownership, sessions, relational records,
                  optimistic versions, and additive migrations; verify the new path;
                  then remove the obsolete runtime and transition layers.
                </p>
              </div>
              <div>
                <span>Result</span>
                <p>
                  One PostgreSQL startup path, one authenticated mutation boundary,
                  cross-user isolation, conflict protection, and a smaller mental
                  model despite substantially richer behavior.
                </p>
              </div>
            </div>

            <ol className="case-study-action-list">
              <li>
                <span>01</span>
                <div>
                  <strong>Record the target before moving data</strong>
                  <p>
                    ADRs captured ownership, migration, authentication, concurrency,
                    and retirement decisions before runtime responsibilities changed.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Make Flyway the only schema authority</strong>
                  <p>
                    Additive migrations introduced accounts, workspaces, sessions,
                    typed records, projection roles, planning settings, and audit
                    history.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Move identity into the database</strong>
                  <p>
                    Signup, sign-in, session recovery, sign-out, CSRF, and membership
                    checks replaced browser Basic authentication and global context.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Consolidate around the aggregate</strong>
                  <p>
                    The browser owns one canonical draft and saves one expected
                    version. The backend locks, validates, replaces, and audits the
                    workspace transactionally.
                  </p>
                </div>
              </li>
              <li>
                <span>05</span>
                <div>
                  <strong>Delete verified transition architecture</strong>
                  <p>
                    Once independent re-entry was chosen, the JSON runtime, JSONB
                    bridge, migration administration, and unowned compatibility rows
                    were retired.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section
            className="case-study-section"
            id="architecture"
            aria-labelledby="architecture-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">03 / System</span>
                <h2 id="architecture-heading">A visible path from UI to ownership</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  Each layer has one reason to change. HTTP resolves current workspace
                  authority, application services own commands and queries, domain
                  helpers own calculations, and repositories own relational details.
                </p>
              </div>
            </div>

            <ol className="case-study-architecture" aria-label="System architecture">
              {architectureSteps.map((step, index) => (
                <li key={step.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.name}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>

            <div className="architecture-decision">
              <div>
                <span className="note-label">Why one aggregate save</span>
                <h3>Coherence over granular convenience</h3>
                <p>
                  Projections depend on several related collections. Replacing one
                  expected version gives the user a clear save boundary and guarantees
                  that derived results come from one coherent workspace state.
                </p>
              </div>
              <div>
                <span className="note-label">The cost</span>
                <h3>A deliberate collaboration limit</h3>
                <p>
                  Requests are larger and conflicts occur at aggregate scope. The
                  decision should be revisited for real-time collaboration, external
                  clients, or independently owned subdomains, not merely because a file
                  looks long.
                </p>
              </div>
            </div>

            <div className="security-band">
              <strong>Security and isolation</strong>
              <p>
                Database-backed sessions, HttpOnly cookies, CSRF-protected writes,
                current membership checks, safe error mapping, and workspace-scoped
                transactions keep every operation attached to an authorized owner.
              </p>
            </div>
          </section>

          <section
            className="case-study-section"
            id="evidence"
            aria-labelledby="evidence-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">04 / Evidence</span>
                <h2 id="evidence-heading">Claims with scope and limits</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  The repository&apos;s{" "}
                  <ExternalLink href={evidenceUrl}>qualified evidence report</ExternalLink>{" "}
                  maintains current counts and limitations. This portfolio summarizes
                  the durable risk coverage across product behavior, PostgreSQL,
                  live-browser, accessibility, responsive, and security checks.
                </p>
              </div>
            </div>

            <div className="case-study-evidence-grid">
              {payPeriodPlannerEvidence.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>

            <div className="evidence-qualification">
              <div>
                <strong>What this demonstrates</strong>
                <p>
                  Authentication, workspace isolation, save and reload persistence,
                  stale-write conflicts, accessibility rules, responsive containment,
                  and the relational runtime execute together against isolated schemas.
                </p>
              </div>
              <div>
                <strong>What it does not claim</strong>
                <p>
                  This is not cross-browser certification, a manual screen-reader
                  audit, proof of zero vulnerabilities, or production operational
                  readiness. Those boundaries stay explicit in the evidence report.
                </p>
              </div>
            </div>

            <div className="case-study-result">
              <div>
                <span className="note-label">Result</span>
                <h2>More real behavior, less accidental architecture</h2>
              </div>
              <div>
                <p>
                  Pay Period Planner now tells one coherent product and engineering
                  story: an authenticated user owns a relational workspace, edits one
                  canonical draft, and saves against an expected version. PostgreSQL is
                  the only runtime store, and obsolete personal data is neither seeded
                  nor preserved as permanent infrastructure.
                </p>
                <p>
                  Hosting, managed backups, centralized telemetry, abuse controls, and
                  demo reset policy remain deployment work. They are intentionally not
                  disguised as completed production capabilities.
                </p>
                <div className="case-study-actions">
                  <ExternalLink className="primary-link" href={repositoryUrl}>
                    Explore the repository
                  </ExternalLink>
                  <ExternalLink href={evidenceUrl}>Read the evidence</ExternalLink>
                  <a href={`${basePath}/#work`}>Return to selected work</a>
                </div>
              </div>
            </div>
          </section>
        </article>

        <footer>
          <span>Matthew Clark / Pay Period Planner case study</span>
          <div className="footer-links">
            <a href="#case-study-top">Back to top</a>
            <a href={`${basePath}/`}>Portfolio home</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

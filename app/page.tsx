import Image from "next/image";
import { ExternalLink } from "./ExternalLink";
import { payPeriodPlannerEvidenceHighlights } from "./payPeriodPlannerEvidence";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const caseStudyHref = `${basePath}/work/pay-period-planner/`;
const resumeHref = `${basePath}/matthew-clark-resume.pdf`;

export default function Home() {
  return (
    <div className="canvas">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <aside className="rail" aria-label="Portfolio navigation">
        <a className="rail-mark" href="#top" aria-label="Matthew Clark home">
          MC
        </a>
        <p className="rail-edition">
          Engineering portfolio
          <br />
          Selected work / 2026
        </p>
        <nav aria-label="Primary navigation">
          <a href="#work">
            <span className="nav-index" aria-hidden="true">
              01
            </span>
            <span className="nav-label">Work</span>
          </a>
          <a href="#impact">
            <span className="nav-index" aria-hidden="true">
              02
            </span>
            <span className="nav-label">Impact</span>
          </a>
          <a href="#approach">
            <span className="nav-index" aria-hidden="true">
              03
            </span>
            <span className="nav-label">Approach</span>
          </a>
          <a href="#about">
            <span className="nav-index" aria-hidden="true">
              04
            </span>
            <span className="nav-label">About</span>
          </a>
          <a href="#contact">
            <span className="nav-index" aria-hidden="true">
              05
            </span>
            <span className="nav-label">Contact</span>
          </a>
        </nav>
        <div className="rail-status">
          <strong>
            <span className="status-dot" aria-hidden="true" />
            Lead Software Engineer
          </strong>
          <span>
            Frontend architecture
            <br />
            Technical leadership
          </span>
        </div>
      </aside>

      <main id="main-content">
        <header className="topbar" id="top">
          <p className="topbar-id">
            Matthew Clark <span>Systems / Product / Evidence</span>
          </p>
          <ThemeToggle />
        </header>

        <section className="hero" aria-labelledby="page-title">
          <div className="hero-main">
            <div className="hero-copy">
              <p className="role">Lead Software Engineer</p>
              <h1 id="page-title">Matthew Clark</h1>
              <p className="hero-line">
                I build understandable systems for complex product behavior.
              </p>
              <p className="hero-detail">
                I lead frontend architecture for complex customer-facing React
                and TypeScript products, carrying product decisions across APIs,
                testing, accessibility, security, and production delivery.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href={caseStudyHref}>
                  Explore the case study
                </a>
                <ExternalLink href={resumeHref}>View resume</ExternalLink>
              </div>
            </div>
            <div className="hero-portrait">
              <Image
                src={`${basePath}/images/matthew-clark.jpg`}
                alt="Black-and-white portrait of Matthew Clark"
                fill
                priority
                sizes="(max-width: 1040px) 360px, 24vw"
              />
            </div>
          </div>
          <div className="intro-note">
            <span className="note-label">Working principle</span>
            <p>
              Make complex behavior understandable, keep system boundaries
              explicit, and leave evidence that the result works.
            </p>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading">
          <div className="section-heading">
            <span>01 / Work</span>
            <h2 id="work-heading">Selected engineering work</h2>
            <p>Public reasoning and evidence</p>
          </div>

          <article className="feature-project">
            <div className="project-copy">
              <span className="project-number">Featured project / 01</span>
              <h3>Pay Period Planner</h3>
              <p>
                An independently built household cash-flow product that makes
                complex planning rules explicit—from accessible React workflows
                to versioned PostgreSQL ownership and cross-layer verification.
              </p>
              <div className="project-links" aria-label="Pay Period Planner links">
                <a
                  className="primary-link"
                  href={caseStudyHref}
                >
                  Read case study
                </a>
                <ExternalLink
                  href="https://github.com/everdein/pay-period-planner"
                >
                  View source
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md"
                >
                  Evidence
                </ExternalLink>
              </div>
              <div className="stack-list" aria-label="Technology stack">
                <span>React</span>
                <span>TypeScript</span>
                <span>Spring Boot</span>
                <span>PostgreSQL</span>
              </div>
            </div>

            <div className="project-visual">
              <div className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="browser-label">
                  Authenticated workspace / Overview
                </span>
              </div>
              <div className="project-image">
                <Image
                  src={`${basePath}/images/pay-period-planner-overview.png`}
                  alt="Pay Period Planner household overview with projection, balances, cash flow, and calendar summaries"
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, (max-width: 1200px) 62vw, 52vw"
                />
              </div>
            </div>

            <aside
              className="project-signals"
              aria-label="Pay Period Planner architecture and verification"
            >
              <div className="signal-group">
                <div className="signal-label">
                  <span>Architecture</span>
                  <b aria-hidden="true" />
                </div>
                <ol className="architecture-map">
                  <li>
                    <strong>UI</strong>
                    <span>Accessible React workflows</span>
                  </li>
                  <li>
                    <strong>API</strong>
                    <span>Authenticated Spring boundary</span>
                  </li>
                  <li>
                    <strong>Data</strong>
                    <span>Relational workspace ownership</span>
                  </li>
                  <li>
                    <strong>Writes</strong>
                    <span>Optimistic concurrency</span>
                  </li>
                </ol>
              </div>
              <div className="signal-group testing">
                <div className="signal-label">
                  <span>Evidence</span>
                  <b aria-hidden="true" />
                </div>
                <ul className="evidence-list">
                  {payPeriodPlannerEvidenceHighlights.map((item) => (
                    <li key={item.label}>
                      {item.value} {item.summaryLabel}
                    </li>
                  ))}
                  <li>Accessibility and security gates</li>
                </ul>
              </div>
            </aside>
          </article>

        </section>

        <section className="impact" id="impact" aria-labelledby="impact-heading">
          <div className="impact-heading">
            <div>
              <span className="note-label">02 / Professional impact</span>
              <h2 id="impact-heading">Evidence from production systems</h2>
            </div>
            <p>
              Across my State Farm tenure, I&apos;ve architected and delivered
              customer-facing life-insurance workflows that connect frontend
              behavior, APIs, testing, security, and production delivery.
            </p>
          </div>

          <dl className="impact-facts" aria-label="Selected professional impact">
            <div>
              <dt>2</dt>
              <dd>
                <strong>Customer-facing applications</strong>
                <span>Architected and built from the ground up</span>
              </dd>
            </div>
            <div>
              <dt>1,404</dt>
              <dd>
                <strong>Production submissions</strong>
                <span>
                  Across 1,174 policies in a measured 30-day period
                </span>
              </dd>
            </div>
            <div>
              <dt>2,197</dt>
              <dd>
                <strong>Passing TypeScript tests</strong>
                <span>131 test files; capability built from zero</span>
              </dd>
            </div>
            <div>
              <dt>40</dt>
              <dd>
                <strong>Shared modules</strong>
                <span>Supporting more than 90 source and test files</span>
              </dd>
            </div>
          </dl>

          <p className="impact-note">
            Additional work includes runtime-image optimization, vulnerability
            remediation, deployment visibility, and mentoring engineers.
          </p>
        </section>

        <section
          className="approach"
          id="approach"
          aria-labelledby="approach-heading"
        >
          <div className="approach-grid">
            <div>
              <span className="note-label">03 / Approach</span>
              <h2 id="approach-heading">How I lead the work</h2>
            </div>
            <div className="approach-item">
              <strong>Clarify the product</strong>
              <p>
                Start with the decision a person needs to make, then turn
                ambiguous requirements into explicit behavior and testable
                outcomes.
              </p>
            </div>
            <div className="approach-item">
              <strong>Design the boundaries</strong>
              <p>
                Keep state, domain rules, API contracts, and data ownership clear
                across the stack.
              </p>
            </div>
            <div className="approach-item">
              <strong>Build confidence</strong>
              <p>
                Combine tests, accessibility, security, documentation, reviews,
                and mentoring so the team can deliver reliably.
              </p>
            </div>
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-heading">
          <div>
            <span className="note-label">04 / About</span>
            <h2 id="about-heading">About</h2>
          </div>
          <div className="about-content">
            <dl className="experience-facts" aria-label="Professional experience">
              <div>
                <dt>Current role</dt>
                <dd>
                  <strong>Lead Software Engineer</strong>
                  <span>State Farm / 2023-present</span>
                </dd>
              </div>
              <div>
                <dt>Software engineering</dt>
                <dd>
                  <strong>5+ years</strong>
                  <span>Customer-facing React and TypeScript systems</span>
                </dd>
              </div>
              <div>
                <dt>Foundation</dt>
                <dd>
                  <strong>10 years</strong>
                  <span>Data and analytics at Microsoft</span>
                </dd>
              </div>
            </dl>
            <div className="section-copy">
              <p>
                My background spans geospatial data quality for Google Maps, a
                decade in data and analytics at Microsoft, open-source software
                engineering at WattTime, and customer-facing product engineering
                at State Farm. That progression shapes how I connect technical
                decisions to user behavior, operational context, and measurable
                outcomes.
              </p>
              <p>
                Today I lead frontend architecture and full-stack delivery for
                complex workflows, mentor engineers, and improve the systems and
                practices that make change safer.
              </p>
              <ExternalLink className="text-link" href={resumeHref}>
                Read the full resume
              </ExternalLink>
            </div>
          </div>
        </section>

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div>
            <span className="note-label">05 / Contact</span>
            <h2 id="contact-heading">Let&apos;s talk about complex systems</h2>
          </div>
          <div className="section-copy">
            <p>
              Connect with me about frontend architecture, customer-facing
              workflow products, technical leadership, and full-stack delivery.
            </p>
            <div className="contact-links">
              <ExternalLink
                className="primary-link"
                href="https://linkedin.com/in/everdein"
              >
                LinkedIn
              </ExternalLink>
              <a href="mailto:everdein@gmail.com">Email</a>
              <ExternalLink href="https://github.com/everdein">
                GitHub
              </ExternalLink>
              <ExternalLink href={resumeHref}>Resume</ExternalLink>
            </div>
          </div>
        </section>

        <footer>
          <span>Matthew Clark / Engineering portfolio</span>
          <div className="footer-links">
            <ExternalLink href="https://www.goodreads.com/everdein">
              Goodreads
            </ExternalLink>
            <a href="#top">Back to top</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

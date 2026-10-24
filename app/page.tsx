import { BrandMark } from "./BrandMark";
import Image from "next/image";
import { ExternalLink } from "./ExternalLink";
import { payPeriodPlannerEvidenceHighlights } from "./payPeriodPlannerEvidence";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const caseStudyHref = `${basePath}/work/pay-period-planner/`;
const resumeHref = `${basePath}/resume/`;

export default function Home() {
  return (
    <div className="canvas">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <aside className="rail" aria-label="Portfolio navigation">
        <a
          className="rail-mark"
          href="#top"
          aria-label="MC — Matthew Clark home"
        >
          <BrandMark />
        </a>
        <p className="rail-edition">
          Engineering portfolio
          <br />
          Selected work
        </p>
        <nav aria-label="Primary navigation">
          <a href="#professional">
            <span className="nav-index" aria-hidden="true">
              01
            </span>
            <span className="nav-label">Professional</span>
          </a>
          <a href="#projects">
            <span className="nav-index" aria-hidden="true">
              02
            </span>
            <span className="nav-label">Projects</span>
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
            Senior Software Engineer
          </strong>
          <span>
            Application architecture
            <br />
            System design
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
              <p className="role">Senior Software Engineer</p>
              <h1 id="page-title">Matthew Clark</h1>
              <p className="hero-line">
                I design and build systems people can rely on.
              </p>
              <p className="hero-detail">
                I combine system design, application architecture, full-stack
                development, and technical leadership to connect business needs
                with software teams can maintain and extend.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href={caseStudyHref}>
                  Explore the case study
                </a>
                <a href={resumeHref}>View resume</a>
              </div>
            </div>
            <div className="hero-portrait">
              <Image
                src={`${basePath}/images/matthew-clark-headshot.jpg`}
                alt="Matthew Clark wearing a light blue shirt against a softly blurred neutral background"
                fill
                priority
                sizes="(max-width: 1040px) 360px, 24vw"
              />
            </div>
          </div>
          <div className="intro-note">
            <span className="note-label">Working principle</span>
            <p>
              Make the product decision clear, keep system boundaries explicit,
              and leave evidence that the result works.
            </p>
          </div>
        </section>

        <section
          className="impact"
          id="professional"
          aria-labelledby="professional-heading"
        >
          <div className="impact-heading">
            <div>
              <span className="note-label">01 / Professional impact</span>
              <h2 id="professional-heading">
                Evidence from production systems
              </h2>
            </div>
            <p>
              At PBK, I design across applications, services, storage, and data
              platforms. Previously, at State Farm, I owned frontend
              architecture and helped a six-engineer team deliver
              customer-facing systems. The outcomes below come from my State
              Farm tenure.
            </p>
          </div>

          <dl
            className="impact-facts"
            aria-label="Selected professional impact"
          >
            <div>
              <dt>2</dt>
              <dd>
                <strong>Customer-facing applications</strong>
                <span>Architected and built from the ground up</span>
              </dd>
            </div>
            <div>
              <dt>3,335</dt>
              <dd>
                <strong>Automated test cases</strong>
                <span>3,327 passing, 0 failing, with 97.08% coverage</span>
              </dd>
            </div>
            <div>
              <dt>6</dt>
              <dd>
                <strong>Enforceable quality gates</strong>
                <span>
                  Formatting, spelling, linting, type safety, testing, and
                  design-system compatibility
                </span>
              </dd>
            </div>
            <div>
              <dt>600+ MB</dt>
              <dd>
                <strong>Removed from production images</strong>
                <span>
                  Build-time frontend dependencies excluded across two
                  applications
                </span>
              </dd>
            </div>
          </dl>

          <p className="impact-note">
            Additional work includes an enterprise reporting data path, a
            45-page engineering enablement platform, deployment visibility for
            six applications across four environments, remediation of 10
            vulnerable items spanning five CVEs, and platform patterns that
            other engineers independently extended and operated.
          </p>
        </section>

        <section
          className="projects"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="projects-heading">
            <div>
              <span className="note-label">02 / Projects</span>
              <h2 id="projects-heading">Independent systems</h2>
            </div>
            <p>
              Selected product work where the problem, architecture, tradeoffs,
              and verification are available for inspection.
            </p>
          </div>

          <article className="feature-project">
            <div className="project-copy">
              <span className="project-number">Featured project / 01</span>
              <h3>Pay Period Planner</h3>
              <p>
                An independently built household cash-flow product that turns
                income, bills, savings, and debt into a clear next-paycheck
                plan. Its accessible React workflows connect to an authenticated
                Spring Boot API, versioned PostgreSQL data, and cross-layer
                verification.
              </p>
              <div
                className="project-links"
                aria-label="Pay Period Planner links"
              >
                <a className="primary-link" href={caseStudyHref}>
                  Read case study
                </a>
                <ExternalLink href="https://github.com/everdein/pay-period-planner">
                  View source
                </ExternalLink>
                <ExternalLink href="https://github.com/everdein/pay-period-planner/blob/main/docs/engineering-evidence.md">
                  Evidence
                </ExternalLink>
              </div>
              <div
                className="stack-list"
                aria-label="Pay Period Planner technology stack"
              >
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
                  src={`${basePath}/images/pay-period-planner-overview.png?v=20261023-balanced`}
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

          <article className="feature-project">
            <div className="project-copy">
              <span className="project-number">Showcase project / 02</span>
              <h3>DSA Dojo</h3>
              <p>
                A framework-free algorithm learning system with 55 interactive
                lessons across 20 topics. Reversible traces power guided
                playback, active-recall challenges, side-by-side algorithm
                comparisons, and a searchable prerequisite map.
              </p>
              <div className="project-links" aria-label="DSA Dojo links">
                <a
                  href={`${basePath}/work/dsa-dojo/`}
                  aria-label="Read DSA Dojo case study"
                >
                  Read case study
                </a>
                <ExternalLink
                  className="primary-link"
                  href="https://everdein.github.io/dsa-dojo/"
                >
                  Open DSA Dojo
                </ExternalLink>
                <ExternalLink href="https://github.com/everdein/dsa-dojo">
                  View source
                </ExternalLink>
                <ExternalLink href="https://github.com/everdein/dsa-dojo/blob/main/docs/studio-architecture.md">
                  Architecture
                </ExternalLink>
              </div>
              <div
                className="stack-list"
                aria-label="DSA Dojo technology stack"
              >
                <span>Semantic HTML</span>
                <span>Modern CSS</span>
                <span>JavaScript</span>
                <span>Playwright</span>
              </div>
            </div>

            <div className="project-visual">
              <div className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="browser-label">
                  Live product / Interactive lessons
                </span>
              </div>
              <div className="project-image project-image--contain">
                <Image
                  src={`${basePath}/images/dsa-dojo-overview.jpg?v=20261023-balanced`}
                  alt="DSA Dojo dark lesson studio with its lesson catalog and Sensei Pip guide"
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1200px) 62vw, 52vw"
                />
              </div>
            </div>

            <aside
              className="project-signals"
              aria-label="DSA Dojo architecture and verification"
            >
              <div className="signal-group">
                <div className="signal-label">
                  <span>Architecture</span>
                  <b aria-hidden="true" />
                </div>
                <ol className="architecture-map">
                  <li>
                    <strong>Curriculum</strong>
                    <span>55 lessons / 20 topics</span>
                  </li>
                  <li>
                    <strong>Runtime</strong>
                    <span>Deterministic traces + dynamic loading</span>
                  </li>
                  <li>
                    <strong>Learning</strong>
                    <span>Playback, challenge, progress, sharing</span>
                  </li>
                  <li>
                    <strong>Views</strong>
                    <span>Nine reusable renderer families</span>
                  </li>
                </ol>
              </div>
              <div className="signal-group testing">
                <div className="signal-label">
                  <span>Evidence</span>
                  <b aria-hidden="true" />
                </div>
                <ul className="evidence-list">
                  <li>Enforced Node coverage floors</li>
                  <li>Complete lesson-contract verification</li>
                  <li>Desktop, mobile, keyboard, and accessibility flows</li>
                  <li>Protected GitHub Pages release gate</li>
                </ul>
              </div>
            </aside>
          </article>
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
                Keep state, domain rules, API contracts, and data ownership
                clear across the stack.
              </p>
            </div>
            <div className="approach-item">
              <strong>Build confidence</strong>
              <p>
                Encode tests, accessibility, security, documentation, and
                delivery controls into the system so quality does not depend on
                individual memory.
              </p>
            </div>
            <div className="approach-item">
              <strong>Create durable leverage</strong>
              <p>
                Turn exploration and one-off work into documented, tested
                capabilities that other engineers can extend, operate, and own.
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
            <dl
              className="experience-facts"
              aria-label="Professional experience"
            >
              <div>
                <dt>Current role</dt>
                <dd>
                  <strong>Senior Software Engineer</strong>
                  <span>PBK / Sep 2026–present</span>
                </dd>
              </div>
              <div>
                <dt>Previous role</dt>
                <dd>
                  <strong>Lead Software Engineer</strong>
                  <span>State Farm / Sep 2023–Sep 2026</span>
                </dd>
              </div>
              <div>
                <dt>Earlier role</dt>
                <dd>
                  <strong>Software Engineer</strong>
                  <span>State Farm / Jun 2021–Sep 2023</span>
                </dd>
              </div>
            </dl>
            <div className="section-copy">
              <p>
                At PBK, I provide technical direction and hands-on engineering
                across frontend applications, backend services, APIs, storage,
                and data platforms. I work with business stakeholders, IT, and
                external development teams to define boundaries, interfaces,
                data flows, and dependencies across enterprise systems.
              </p>
              <p>
                My work includes developing and evaluating solutions with
                Microsoft Azure, Databricks, Microsoft Fabric, Next.js, and
                Abacus.AI, with integration work involving Concur, Workday,
                Deltek, Salesforce, and Autodesk. I review applications, guide
                technical handoffs, and establish practices for maintainability
                and ongoing ownership.
              </p>
              <p>
                I&apos;m building an AI-assisted PDF review workflow intended to
                cover 1,200+ Deltek projects, identifying missing project data
                and developing green, yellow, and red completeness ratings to
                prioritize follow-up.
              </p>
              <p>
                At State Farm, I helped build two life insurance applications
                from the ground up and progressed into a lead role. I owned
                frontend architecture, guided modernization, and supported a
                six-engineer team through design, mentoring, and production
                delivery. Shared components, documentation, and tooling helped
                other engineers build on that work.
              </p>
              <p>
                My background spans geospatial data quality for Google Maps, a
                decade in data and analytics at Microsoft, open-source software
                engineering at WattTime, and customer-facing product engineering
                at State Farm. That progression shapes how I connect technical
                decisions to user behavior, operational context, and measurable
                outcomes.
              </p>
              <p>
                I value clear communication, sound engineering judgment, and
                ownership beyond the initial release. I use AI-assisted
                programming in professional and independent work for
                implementation, refactoring, testing, and documentation while
                retaining human review and architectural ownership. My
                independent projects demonstrate engineering capabilities; AI
                assistance is part of the development process.
              </p>
              <a className="text-link" href={resumeHref}>
                Read the resume
              </a>
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
              Connect with me about application architecture, customer-facing
              systems, technical strategy, engineering quality, and creating
              platforms that help teams deliver independently.
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
              <a href={resumeHref}>Resume</a>
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

import { SiteNavigation } from "./SiteNavigation";
import Image from "next/image";
import { ExternalLink } from "./ExternalLink";
import { payPeriodPlannerEvidenceHighlights } from "./payPeriodPlannerEvidence";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const caseStudyHref = `${basePath}/work/pay-period-planner/`;
const resumeHref = `${basePath}/resume/`;

export default function Home() {
  return (
    <div className="canvas site-canvas" id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header"><SiteNavigation page="home" /></header>
      <main id="main-content">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-main">
            <div className="hero-copy">
              <p className="role">Senior Software Engineer</p>
              <h1 id="page-title">Matthew Clark</h1>
              <p className="hero-line">
                From application behavior to the systems behind it.
              </p>
              <p className="hero-detail">
                I&apos;m a hands-on software engineer working across applications,
                enterprise integration, and data platforms. At PBK, I help establish
                shared data capabilities; at State Farm, I led frontend architecture
                for customer-facing systems. I care about the decisions that make
                that work useful, operable, and understandable to the next engineer.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#professional">
                  Explore experience
                </a>
                <a href={resumeHref}>View resume</a>
                <a href={`${basePath}/work/enterprise-data/`}>Enterprise data architecture case study</a>
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
          <nav className="engineering-evidence" aria-label="Explore engineering evidence">
            <a href={`${basePath}/work/enterprise-data/`}>
              <span className="note-label">Engineering judgment</span>
              <strong>Establish a shared data foundation</strong>
              <span>Integration boundaries, reusable datasets, and operational responsibilities at PBK.</span>
              <b>Explore the architecture <span aria-hidden="true">↗</span></b>
            </a>
            <a href="#state-farm-experience">
              <span className="note-label">Organizational impact</span>
              <strong>Leave systems others can extend</strong>
              <span>Application architecture, shared patterns, and production evidence from State Farm.</span>
              <b>See the experience <span aria-hidden="true">↓</span></b>
            </a>
            <a href="#projects">
              <span className="note-label">Technical expertise</span>
              <strong>Inspect the implementation</strong>
              <span>Independent products with source code, architecture decisions, and verification.</span>
              <b>Explore the projects <span aria-hidden="true">↓</span></b>
            </a>
          </nav>
        </section>

        <section
          className="impact"
          id="professional"
          aria-labelledby="professional-heading"
        >
          <div className="impact-heading">
            <div>
              <span className="note-label">01 / Experience</span>
              <h2 id="professional-heading">
                Professional experience
              </h2>
            </div>
            <div className="impact-intro">
              <p>
                Enterprise integration and data architecture at PBK, built on
                a foundation of application architecture and technical leadership
                at State Farm.
              </p>
            </div>
          </div>

          <article className="experience-employer" aria-labelledby="pbk-heading" id="pbk-experience">
            <header className="experience-heading">
              <h3 id="pbk-heading">PBK</h3>
              <p>Senior Software Engineer <span>September 2026–Present</span></p>
            </header>
            <p className="experience-summary">
              Working within an engineering team, I contribute to applications,
              enterprise integration, and the organization&apos;s first centralized
              enterprise data foundation of this kind. The objective is consistent,
              reusable datasets that can serve multiple business needs over time.
            </p>
            <div className="enterprise-feature" aria-labelledby="enterprise-feature-heading">
              <div>
                <span className="project-number">Architecture approach</span>
                <h4 id="enterprise-feature-heading">A shared foundation for enterprise data</h4>
                <p>
                  Microsoft Fabric ingestion pipelines and a Bronze/Silver/Gold
                  medallion architecture separate source connectivity, transformation,
                  and curated business data. The foundation includes validation,
                  monitoring, and recovery capabilities; downstream consumers remain
                  opportunities described separately from implemented work.
                </p>
              </div>
              <div className="project-links">
                <a className="primary-link" href={`${basePath}/work/enterprise-data/`}>
                  Read enterprise data case study
                </a>
              </div>
            </div>
            <dl className="experience-responsibilities">
              <div>
                <dt>Across system boundaries</dt>
                <dd>I work with business stakeholders, IT, and external development
                  teams to define interfaces, data flows, and dependencies across
                  applications and enterprise systems.</dd>
              </div>
              <div>
                <dt>Beyond implementation</dt>
                <dd>Application reviews and technical handoffs address maintainability,
                  code quality, documentation, and ongoing ownership. Pipeline monitoring,
                  execution logging, and notifications provide operational visibility.</dd>
              </div>
              <div>
                <dt>In development / AI-assisted review</dt>
                <dd>I&apos;m developing a document review workflow to identify missing
                  project data and produce completeness ratings that help prioritize
                  follow-up. This work is ongoing.</dd>
              </div>
            </dl>
          </article>

          <article className="experience-employer" aria-labelledby="state-farm-heading" id="state-farm-experience">
            <header className="experience-heading">
              <h3 id="state-farm-heading">State Farm</h3>
              <p>Lead Software Engineer <span>September 2023–September 2026</span></p>
              <p>Software Engineer <span>June 2021–September 2023</span></p>
            </header>
            <p className="experience-summary">
              I owned frontend architecture and helped a six-engineer team deliver
              customer-facing systems, with shared engineering standards and
              patterns that other engineers could maintain and extend.
            </p>
            <h4 className="experience-evidence-heading">Evidence from production systems</h4>
            <p className="experience-summary">The outcomes below come from my State Farm tenure.</p>
          <dl
            className="impact-facts"
            aria-label="State Farm production evidence"
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
          </article>
        </section>

        <section
          className="projects"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="projects-heading">
            <div>
              <span className="note-label">02 / Projects</span>
              <h2 id="projects-heading">Independent projects</h2>
            </div>
            <p>
              Independently built products with system boundaries, trade-offs,
              and implementation evidence available for inspection.
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
                  className="primary-link"
                  href={`${basePath}/work/dsa-dojo/`}
                  aria-label="Read DSA Dojo case study"
                >
                  Read case study
                </a>
                <ExternalLink
                  className="live-link"
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
              <h2 id="approach-heading">Decisions behind the work</h2>
            </div>
            <div className="approach-item">
              <strong>Clarify the product</strong>
              <p>
                Start with the decision a person needs to make, then turn
                ambiguous requirements into explicit behavior and testable
                outcomes. In Pay Period Planner, the next-paycheck view connects
                income and obligations to a concrete planning decision.
              </p>
              <a className="text-link" href={`${caseStudyHref}#product`}>See the planning problem</a>
            </div>
            <div className="approach-item">
              <strong>Design the boundaries</strong>
              <p>
                Keep state, domain rules, API contracts, and data ownership
                clear across the stack. The enterprise data approach gives
                source representation, shared transformations, and curated
                business data distinct responsibilities.
              </p>
              <a className="text-link" href={`${basePath}/work/enterprise-data/#approach`}>Explore the data boundaries</a>
            </div>
            <div className="approach-item">
              <strong>Build confidence</strong>
              <p>
                Encode tests, accessibility, security, documentation, and
                delivery controls into the system so quality does not depend on
                individual memory. DSA Dojo connects deterministic execution
                traces to lesson contracts and browser verification.
              </p>
              <a className="text-link" href={`${basePath}/work/dsa-dojo/#evidence`}>Inspect the verification</a>
            </div>
            <div className="approach-item">
              <strong>Leave work others can own</strong>
              <p>
                At State Farm, shared components, documentation, and platform
                patterns supported work that other engineers independently
                extended and operated. Maintainability includes transferring
                understanding as well as code.
              </p>
              <a className="text-link" href="#state-farm-experience">See the production experience</a>
            </div>
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-heading">
          <div>
            <span className="note-label">04 / About</span>
            <h2 id="about-heading">About</h2>
          </div>
          <div className="about-content">
            <div className="section-copy">
              <p>
                Frontend engineering is a foundation of my work. Building
                customer-facing applications taught me to connect interface
                behavior with state, API contracts, and the systems behind them.
                My work at PBK extends that perspective into enterprise integration
                and data platforms.
              </p>
              <p>
                I work with business stakeholders and engineers to clarify what
                a system needs to accomplish, where responsibilities belong,
                and how someone else will maintain it. I value technical depth
                alongside enough understanding of adjacent disciplines to question
                assumptions and recognize dependencies.
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

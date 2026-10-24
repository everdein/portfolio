import { BrandMark } from "../../BrandMark";
import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "../../ExternalLink";
import { ThemeToggle } from "../../ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdein.github.io/portfolio";
const repositoryUrl = "https://github.com/everdein/dsa-dojo";
const evidenceUrl = `${repositoryUrl}/blob/main/docs/portfolio-case-study.md`;
const liveUrl = "https://everdein.github.io/dsa-dojo/";
const title = "DSA Dojo Engineering Case Study | Matthew Clark";
const description =
  "Making algorithm execution explorable with deterministic traces, reusable renderers, and verification that connects visible state to executable code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/work/dsa-dojo/` },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${siteUrl}/work/dsa-dojo/`,
    images: [
      {
        url: `${siteUrl}/images/dsa-dojo-lesson.png`,
        alt: "DSA Dojo Find Largest lesson with code, execution state, and Sensei Pip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/images/dsa-dojo-lesson.png`],
  },
};

const decisions = [
  {
    name: "Make execution reversible through data",
    detail:
      "A deterministic trace records owned snapshots of each decision. The player selects a step, so rewind does not depend on undoing a running animation. Retaining those snapshots trades memory for replay and inspection.",
  },
  {
    name: "Verify the explanation alongside the answer",
    detail:
      "Runtime checks validate trace structure and renderer state. Test and build checks also compare repeated traces, check input immutability, and compare the final result with an independent solver. This supports confidence for tested inputs, rather than a universal correctness claim.",
  },
  {
    name: "Share controls through lesson and renderer contracts",
    detail:
      "Each lesson declares its input, solver, trace, code references, and views. Renderer adapters turn state into semantic presentation, letting different algorithm families share the player without adding algorithm-specific branches to its composition root.",
  },
  {
    name: "Keep source references connected to real code",
    detail:
      "Semantic anchors resolve to physical lines in the executable domain module. Unrelated line insertions no longer stale every downstream reference; focused tests catch missing anchors. Meaningful step-to-code mapping remains an authoring responsibility.",
  },
  {
    name: "Load one lesson while verifying the whole curriculum",
    detail:
      "The catalog uses a lightweight manifest and dynamically imports selected lessons. An eager test registry checks the full curriculum in CI. This separates browser startup work from comprehensive verification; no unmeasured speedup is claimed.",
  },
];

export default function DsaDojoCaseStudy() {
  return (
    <div className="canvas case-study-canvas">
      <a className="skip-link" href="#case-study-content">
        Skip to case study
      </a>
      <aside
        className="rail case-study-rail"
        aria-label="Case study navigation"
      >
        <a
          className="rail-mark"
          href={`${basePath}/`}
          aria-label="MC — Matthew Clark portfolio home"
        >
          <BrandMark />
        </a>
        <p className="rail-edition">
          Engineering case study
          <br />
          DSA Dojo
        </p>
        <nav aria-label="Case study sections">
          {["Product", "Decisions", "System", "Evidence"].map(
            (label, index) => (
              <a href={`#${label.toLowerCase()}`} key={label}>
                <span className="nav-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="nav-label">{label}</span>
              </a>
            ),
          )}
        </nav>
        <div className="rail-status case-study-rail-status">
          <a href={`${basePath}/#projects`}>Back to projects</a>
          <span>JavaScript / Static web / Verification</span>
        </div>
      </aside>
      <main className="case-study-main" id="case-study-content">
        <header className="topbar" id="case-study-top">
          <p className="topbar-id">
            DSA Dojo <span>Product / Architecture / Evidence</span>
          </p>
          <ThemeToggle />
        </header>
        <article>
          <header
            className="case-study-hero"
            aria-labelledby="case-study-title"
          >
            <p className="role">Engineering case study</p>
            <h1 id="case-study-title">DSA Dojo</h1>
            <p className="case-study-deck">
              How do you make algorithm execution explorable while keeping the
              visualization faithful to the code? I built a shared execution
              model that connects each visible decision to inspectable
              JavaScript.
            </p>
            <div className="case-study-actions">
              <ExternalLink className="live-link" href={liveUrl}>
                Open DSA Dojo
              </ExternalLink>
              <ExternalLink href={repositoryUrl}>View source</ExternalLink>
              <ExternalLink href={evidenceUrl}>
                Read repository case study
              </ExternalLink>
            </div>
            <dl className="case-study-facts" aria-label="Project summary">
              <div>
                <dt>Role</dt>
                <dd>Product design and engineering</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>55 lessons, nine renderer families</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Live static product on GitHub Pages</dd>
              </div>
              <div>
                <dt>Runtime</dt>
                <dd>Browser-native JavaScript modules</dd>
              </div>
            </dl>
          </header>
          <figure className="case-study-lead-visual">
            <div className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="browser-label">
                Lesson studio / Code and execution
              </span>
            </div>
            <div
              className="case-study-overview-image"
              style={{ aspectRatio: "1240 / 1285" }}
            >
              <Image
                src={`${basePath}/images/dsa-dojo-lesson.png?v=20261023-balanced`}
                alt="DSA Dojo Find Largest lesson paused with array values, highlighted JavaScript, and Sensei Pip explaining the current best value"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 78vw"
              />
            </div>
            <figcaption>
              The studio places code, visible execution state, and guided
              reflection in one learning workflow.
            </figcaption>
          </figure>
          <p className="case-study-boundary">
            This case study demonstrates interactive system design and
            correctness checks. Learning gains, retention, and adoption have not
            been established through a learner study.
          </p>
          <section
            className="case-study-section"
            id="product"
            aria-labelledby="product-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">01 / Product</span>
                <h2 id="product-heading">Inspect one decision at a time</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  A final answer hides the decisions that produced it. Dojo lets
                  a learner change inputs, predict a transition, step forward,
                  rewind, and compare the resulting state with the code and
                  Pip&apos;s explanation.
                </p>
                <p>
                  Try Find Largest with <code>-4, 8, 8, 3</code>. Step forward
                  twice, then rewind. Next, open Detect a Cycle to see the same
                  player handle connected nodes. Share a custom state to reopen
                  the execution at that decision.
                </p>
                <p>
                  <ExternalLink href={`${liveUrl}studio`}>
                    Try the lesson studio
                  </ExternalLink>
                </p>
              </div>
            </div>
          </section>
          <section
            className="case-study-section"
            id="decisions"
            aria-labelledby="decisions-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">02 / Decisions</span>
                <h2 id="decisions-heading">
                  Build one execution model across algorithm families
                </h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  The challenge was keeping playback, source highlighting, and
                  visible state consistent as lessons expanded beyond arrays
                  into graphs, trees, and composed structures. Explicit
                  contracts make that consistency inspectable.
                </p>
              </div>
            </div>
            <ol className="case-study-action-list">
              {decisions.map((decision, index) => (
                <li key={decision.name}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{decision.name}</strong>
                    <p>{decision.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="case-study-section"
            id="system"
            aria-labelledby="system-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">03 / System</span>
                <h2 id="system-heading">From learner input to visible state</h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  Browser-native modules keep the path inspectable and the
                  static release free of runtime package dependencies. That
                  choice also makes explicit controllers, contracts, and browser
                  lifecycle management part of the engineering responsibility.
                </p>
              </div>
            </div>
            <ol
              className="case-study-architecture"
              aria-label="System architecture"
            >
              {[
                [
                  "Lesson definition",
                  "Parse learner input and select the solver, trace builder, source anchors, and view panels.",
                ],
                [
                  "Validated trace",
                  "Construct owned execution snapshots and validate their structure and references.",
                ],
                [
                  "Player state machine",
                  "Select a decision for stepping, playback, rewind, and comparison.",
                ],
                [
                  "Renderer and source pane",
                  "Project state into semantic DOM, code highlighting, narration, and live announcements.",
                ],
              ].map(([name, detail], index) => (
                <li key={name}>
                  <span>0{index + 1}</span>
                  <strong>{name}</strong>
                  <p>{detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="case-study-section"
            id="evidence"
            aria-labelledby="evidence-heading"
          >
            <div className="case-study-section-heading">
              <div>
                <span className="note-label">04 / Evidence</span>
                <h2 id="evidence-heading">
                  Check the contract through the deployed artifact
                </h2>
              </div>
              <div className="case-study-section-copy">
                <p>
                  The release suite checks algorithms, lesson contracts, static
                  artifacts, and desktop and mobile browser flows with automated
                  accessibility checks. The main workflow requires the browser
                  job to pass before publishing GitHub Pages.
                </p>
                <p>
                  These checks cover tested inputs and flows. They do not
                  establish universal correctness, a complete manual
                  assistive-technology audit, or measured educational
                  effectiveness.
                </p>
                <p>
                  <ExternalLink
                    href={`${repositoryUrl}/blob/main/docs/studio-architecture.md`}
                  >
                    Inspect architecture and verification
                  </ExternalLink>
                </p>
              </div>
            </div>
            <div className="case-study-result">
              <div>
                <span className="note-label">Result</span>
                <h2>A reusable system for exploring execution</h2>
              </div>
              <div>
                <p>
                  One shared player supports a 55-lesson curriculum through nine
                  renderer families, with challenges, comparison, and shareable
                  state. The engineering result is a working interactive product
                  whose execution model and checks can be inspected. Lesson
                  count describes its scope; learner research would be needed to
                  establish educational impact.
                </p>
                <div className="case-study-actions">
                  <ExternalLink className="live-link" href={liveUrl}>
                    Open DSA Dojo
                  </ExternalLink>
                  <a href={`${basePath}/work/pay-period-planner/`}>
                    Read Pay Period Planner case study
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
        <footer>
          <span>Matthew Clark / DSA Dojo case study</span>
          <a href="#case-study-top">Back to top</a>
          <a href={`${basePath}/`}>Portfolio home</a>
        </footer>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { CaseStudyNavigation } from "../../CaseStudyNavigation";
import { DiagramView } from "../../DiagramView";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Enterprise Data Architecture | Matthew Clark",
  description:
    "An anonymized architectural approach to enterprise ingestion, layered data transformation, and pipeline operations in Microsoft Fabric.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    id: "context",
    label: "01 / Context",
    title: "Bring business data together with clear boundaries",
    paragraphs: [
      "Enterprise systems represent different parts of a business, each with its own interfaces and data structures. Bringing that information together requires decisions about where source-specific integration ends, where transformation belongs, and how the resulting data is prepared for use.",
      "As a Senior Software Engineer working within an engineering team, I contributed to this foundation through Microsoft Fabric ingestion pipelines, a Bronze/Silver/Gold medallion architecture, and pipeline monitoring and notifications.",
    ],
  },
  {
    id: "approach",
    label: "02 / Approach",
    title: "Separate ingestion, transformation, and consumption",
    paragraphs: [
      "API and ODBC connections bring enterprise data into a centralized environment. Source-specific connectivity belongs at the ingestion boundary; the layered architecture gives raw source representation, shared transformations, and business-oriented data distinct responsibilities.",
      "Bronze holds raw source data. Silver handles cleansing, transformation, and standardization. Gold contains curated business data prepared for consumption. The design intent is to support reuse and maintainability as integration and consumption needs evolve.",
    ],
  },
  {
    id: "operations",
    label: "03 / Operations",
    title: "Make pipeline execution visible",
    paragraphs: [
      "Implementation included pipeline monitoring, execution logging, operational reporting, and automated success and failure email notifications. These provide visibility into execution status and failures and support ownership beyond initial delivery.",
      "Execution visibility is one part of operating a data platform. A successful run does not by itself establish that business data is correct or complete. Recovery behavior and data-quality controls require separate evidence; they are not claimed here.",
    ],
  },
  {
    id: "tradeoffs",
    label: "04 / Trade-offs",
    title: "Shared foundations bring shared responsibilities",
    paragraphs: [
      "A layered foundation offers explicit boundaries between source representation and business consumption. It also introduces work: maintaining transformations, understanding dependencies, and managing the movement of data between layers.",
      "For a narrowly scoped integration, a direct connection may involve less initial effort. A shared layered foundation becomes useful when multiple needs justify reusable transformations and curated data. This is an analysis of the approach, rather than a reconstruction of a historical alternatives review.",
      "Centralization makes shared ownership important. Changes in upstream structures or shared transformations can affect multiple consumers. Layer names alone do not prevent those effects; contracts, validation, and change practices determine how well the boundaries hold over time.",
    ],
  },
];

export default function EnterpriseDataCaseStudy() {
  return (
    <div className="canvas case-study-canvas">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <CaseStudyNavigation
        project="Enterprise data architecture"
        sections={["Context", "Approach", "Operations", "Tradeoffs"]}
      />
      <main className="case-study-main" id="case-study-content">
        <article>
          <header className="case-study-hero" aria-labelledby="case-study-title">
            <p className="role">Architecture approach / Review draft</p>
            <h1 id="case-study-title">A shared foundation for enterprise data</h1>
            <p className="case-study-deck">
              Connecting enterprise ingestion, layered transformation, and
              operational visibility through clear responsibilities in Microsoft Fabric.
            </p>
            <dl className="case-study-facts" aria-label="Case study scope">
              <div><dt>Role</dt><dd>Senior Software Engineer within an engineering team</dd></div>
              <div><dt>Focus</dt><dd>Integration, data architecture, pipeline operations</dd></div>
              <div><dt>Scope</dt><dd>Anonymized conceptual architecture</dd></div>
            </dl>
          </header>
          <p className="case-study-boundary">
            This conceptual view omits source-system names and internal configuration.
            Downstream deployments and measured business outcomes are outside its scope.
          </p>
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="case-study-section" aria-labelledby={`${section.id}-heading`}>
              <div className="case-study-section-heading">
                <div>
                  <span className="note-label">{section.label}</span>
                  <h2 id={`${section.id}-heading`}>{section.title}</h2>
                </div>
                <div className="case-study-section-copy">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              {section.id === "approach" && (
                <figure className="architecture-diagrams">
                  <DiagramView
                    src={`${basePath}/diagrams/enterprise-data/architecture.svg`}
                    width={350}
                    height={580}
                    title="Conceptual enterprise data foundation"
                    description="Generic API and ODBC source groups feed ingestion, Bronze/Silver/Gold layers, and curated datasets. Operations are shown schematically; downstream consumers are potential uses, not verified deployments."
                  />
                  <figcaption>
                    Responsibility boundaries, rather than deployment topology.
                    Possible downstream consumers are not presented as delivered capabilities.
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </article>
        <footer>
          <span>Matthew Clark / Enterprise data architecture</span>
          <a href="#case-study-top">Back to top</a>
          <a href={`${basePath}/`}>Portfolio home</a>
        </footer>
      </main>
    </div>
  );
}

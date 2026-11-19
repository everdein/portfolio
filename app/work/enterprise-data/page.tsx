import type { Metadata } from "next";
import { CaseStudyNavigation } from "../../CaseStudyNavigation";
import { DiagramView } from "../../DiagramView";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdein.github.io/portfolio";
const title = "Enterprise Data Architecture | Matthew Clark";
const description = "Establishing a shared enterprise data foundation in Microsoft Fabric, with reusable datasets, layered transformation, validation, and pipeline operations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/work/enterprise-data/` },
  openGraph: {
    type: "article", title, description,
    url: `${siteUrl}/work/enterprise-data/`,
    images: [`${siteUrl}/og-20261024-syntax-accent.png`],
  },
  twitter: {
    card: "summary_large_image", title, description,
    images: [`${siteUrl}/og-20261024-syntax-accent.png`],
  },
};

const sections = [
  {
    id: "context",
    label: "01 / Context",
    title: "Establish a shared capability",
    paragraphs: [
      "The objective was to establish the organization's first centralized enterprise data foundation of this kind: infrastructure for bringing information from disparate business systems into consistent, reusable datasets. The work created a new shared capability for ingestion, transformation, and data organization.",
      "The architecture addresses a cross-system need. A common foundation allows integrations and transformations to serve multiple downstream needs over time, rather than being tied to an individual report or application. Source interfaces and data structures still require distinct integration boundaries within that shared environment.",
      "As a Senior Software Engineer working within an engineering team, I contributed to this foundation through Microsoft Fabric ingestion pipelines, a Bronze/Silver/Gold medallion architecture, and pipeline monitoring and notifications.",
    ],
  },
  {
    id: "approach",
    label: "02 / Approach",
    title: "Separate data responsibilities",
    paragraphs: [
      "API and ODBC connections bring enterprise data into a centralized environment. Source-specific connectivity belongs at the ingestion boundary; the layered architecture gives raw source representation, shared transformations, and business-oriented data distinct responsibilities.",
      "Bronze holds raw source data. Silver handles cleansing, transformation, and standardization. Gold contains curated business data prepared for consumption. The design intent is to support reuse and maintainability as integration and consumption needs evolve.",
      "Consider a source field whose representation differs from the business meaning a consumer needs. In this separation of responsibilities, the source representation belongs in Bronze, a shared standardization belongs in Silver, and a consumption-oriented view belongs in Gold. This illustrates the boundary: each consumer should not need to repeat source-specific cleansing. It is a design example, not a description of a particular internal schema.",
    ],
  },
  {
    id: "operations",
    label: "03 / Operations",
    title: "Make pipeline execution visible",
    paragraphs: [
      "Implementation included pipeline monitoring, execution logging, operational reporting, and automated success and failure email notifications. These provide visibility into execution status and failures and support ownership beyond initial delivery.",
      "The implemented solution also includes data validation and recovery capabilities. Validation addresses the data being processed, while monitoring and notifications surface execution results. Logs and operational reporting provide information for investigating those results.",
      "Execution visibility, validation, and recovery have distinct responsibilities. Their presence does not by itself establish a reliability guarantee. This overview describes their role without specifying validation rules, recovery procedures, or automation behavior.",
    ],
  },
  {
    id: "tradeoffs",
    label: "04 / Trade-offs",
    title: "Manage shared dependencies",
    paragraphs: [
      "A layered foundation offers explicit boundaries between source representation and business consumption. It also introduces work: maintaining transformations, understanding dependencies, and managing the movement of data between layers.",
      "For a narrowly scoped integration, a direct connection may involve less initial effort. A shared layered foundation becomes useful when multiple needs justify reusable transformations and curated data. These are trade-offs inherent in the approach.",
      "Centralization makes shared ownership important. Changes in upstream structures or shared transformations can affect multiple consumers. Layer names alone do not prevent those effects; contracts, validation, and change practices determine how well the boundaries hold over time.",
    ],
  },
  {
    id: "capabilities",
    label: "05 / Capabilities",
    title: "Prepare data for further use",
    paragraphs: [
      "The implemented foundation combines ingestion, transformation, orchestration, data validation, monitoring, and recovery capabilities in Microsoft Fabric. Curated datasets establish a reusable boundary for downstream work, separating business-oriented data from source-specific connectivity.",
      "Applications, reporting, services, and AI-assisted workflows are possible consumers of that foundation. Their placement in the diagram describes architectural opportunities; it does not establish deployed integrations, adoption, or measured business impact.",
      "The capability established is a shared enterprise data foundation. Its scope does not imply that all organizational data has been consolidated. Downstream deployment, adoption, and measurable business benefits require evidence separate from the foundation itself.",
    ],
  },
];

export default function EnterpriseDataCaseStudy() {
  return (
    <div className="canvas case-study-canvas">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <CaseStudyNavigation
        project="Enterprise data architecture"
        sections={["Context", "Approach", "Operations", "Tradeoffs", "Capabilities"]}
      />
      <main className="case-study-main" id="case-study-content">
        <article>
          <header className="case-study-hero" aria-labelledby="case-study-title">
            <p className="role">Architecture approach</p>
            <h1 id="case-study-title">A shared foundation for enterprise data</h1>
            <p className="case-study-deck">
              Establishing a new organizational capability for integrating,
              transforming, and organizing business data into reusable datasets
              in Microsoft Fabric.
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
                <figure className="architecture-diagrams enterprise-data-diagram">
                  <DiagramView
                    src={`${basePath}/diagrams/enterprise-data/architecture.svg`}
                    width={1400}
                    height={2320}
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

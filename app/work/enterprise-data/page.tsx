import type { Metadata } from "next";
import { CaseStudyNavigation } from "../../CaseStudyNavigation";
import { DiagramView } from "../../DiagramView";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdein.github.io/portfolio";
const title = "Enterprise Data Architecture | Matthew Clark";
const description = "How I independently designed and implemented an enterprise data foundation in Microsoft Fabric, with shared transformations, data validation, and recoverable processing.";

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
    title: "Bring fragmented business data together",
    paragraphs: [
      "The organization had a longstanding need to bring information together across disparate enterprise business systems. It lacked a centralized enterprise data foundation of this kind. Connecting those systems was only part of the problem: their different interfaces and data structures needed to become consistent, reusable information.",
      "I independently designed and implemented the initial Microsoft Fabric data foundation, including ingestion, layered transformations, orchestration, validation, and recovery. I worked with business stakeholders, IT, and development teams on the interfaces, data flows, and dependencies around that work.",
      "The architectural challenge was to establish a shared place for source integration and transformation so each downstream application or report would not have to solve those problems again. That required accounting for incomplete executions and inconsistent data as well as the successful path from source to curated dataset.",
    ],
  },
  {
    id: "approach",
    label: "02 / Approach",
    title: "Separate data responsibilities",
    paragraphs: [
      "Microsoft Fabric was already in use when I joined PBK. We considered MuleSoft, Informatica, and Databricks as alternatives. The data volume was manageable in Fabric, and building the foundation there did not require extensive rework. That supported continuing with the existing platform.",
      "I separated source connectivity from shared transformations and business-oriented data using a Bronze/Silver/Gold medallion architecture. API and ODBC integrations bring data into Fabric through full and incremental ingestion. The source interfaces remain distinct even though their data enters a common foundation.",
      "Bronze preserves historical raw data and supports reprocessing from that retained source representation. Silver handles cleansing, normalization, and standardization. Gold holds curated business data for consumption. Preserving raw history provides a basis for rebuilding transformations without treating the current source response as the only available input.",
      "Shared transformations place source-specific interpretation behind a reusable boundary. Consumers can work with curated data instead of repeating the same cleansing rules. The corresponding responsibility is to maintain those shared rules carefully: a change can affect more than one downstream use.",
    ],
  },
  {
    id: "operations",
    label: "03 / Operations",
    title: "Account for incorrect data and incomplete runs",
    paragraphs: [
      "A completed pipeline run is not sufficient evidence that its data is correct. I implemented schema and required-field validation, null handling, normalization, and deduplication, together with record-count checks and reconciliation. These address both the shape of individual records and consistency across processing steps.",
      "The processing includes upsert/merge operations, duplicate prevention, and idempotent execution. Repeated execution must account for data already processed; recovery would be unsafe if rerunning work simply accumulated duplicate records. The implementation supports both full and incremental ingestion without making reruns synonymous with appending another copy.",
      "Dependency-based orchestration, retries, timeout handling, and partial failure handling address execution failures. Manual and independent reprocessing provide recovery options for affected work, including reprocessing from Bronze. Retaining raw history and making work repeatable are complementary parts of that recovery model.",
      "Pipeline monitoring, execution logging, operational reporting, and automated success and failure email notifications make execution results visible for investigation. These operational signals complement the validation and recovery mechanisms; they do not establish a measured reliability rate or a guarantee that every data defect is detected.",
    ],
  },
  {
    id: "tradeoffs",
    label: "04 / Trade-offs",
    title: "Own the cost of a shared foundation",
    paragraphs: [
      "Centralizing transformations reduces the need for consumers to repeat source-specific logic, but concentrates dependencies in shared datasets. Maintaining that boundary includes understanding the effects of upstream schema changes and changes to shared business rules. Layer names alone do not contain those effects.",
      "Historical raw data makes reprocessing possible, with storage and retention responsibilities attached. Separate transformation layers also require orchestration, validation, and operational ownership. Those are continuing costs of the implemented design, beyond the initial source integrations.",
      "Supporting full and incremental ingestion adds different processing paths to maintain. Idempotency, reconciliation, and independent reprocessing are part of keeping those paths manageable when work is repeated or interrupted. The public account does not specify source-level ingestion policies, retention periods, or recovery timing.",
    ],
  },
  {
    id: "capabilities",
    label: "05 / Capabilities",
    title: "Establish the foundation for downstream work",
    paragraphs: [
      "The delivered capability is the initial centralized enterprise data foundation: ingestion, layered transformation, dependency-based orchestration, data validation, monitoring, and recovery in Microsoft Fabric. Curated datasets provide a reusable boundary between source integration and downstream work.",
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
            <p className="role">Professional engineering case study</p>
            <h1 id="case-study-title">A shared foundation for enterprise data</h1>
            <p className="case-study-deck">
              I independently designed and implemented the initial Microsoft Fabric
              foundation to address a longstanding need for consistent, reusable
              data across enterprise business systems.
            </p>
            <dl className="case-study-facts" aria-label="Case study scope">
              <div><dt>Role</dt><dd>Independent architecture and implementation</dd></div>
              <div><dt>Focus</dt><dd>Integration, data correctness, recoverable processing</dd></div>
              <div><dt>Scope</dt><dd>Initial enterprise data foundation</dd></div>
            </dl>
          </header>
          <p className="case-study-boundary">
            This account describes implemented professional work. Source-system names,
            internal schemas, code, and configuration remain private. The diagram is
            schematic; downstream deployments and measured business outcomes are
            outside this case study&apos;s scope.
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

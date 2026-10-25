import { SiteNavigation } from "./SiteNavigation";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function CaseStudyNavigation({
  project,
}: {
  project: "DSA Dojo" | "Pay Period Planner";
}) {
  const other =
    project === "DSA Dojo"
      ? ["pay-period-planner", "Pay Period Planner"]
      : ["dsa-dojo", "DSA Dojo"];
  return (
    <header className="case-navigation" id="case-study-top">
      <SiteNavigation page="case-study" />
      <div className="case-navigation-heading">
        <nav aria-label="Breadcrumb">
          <a href={`${basePath}/#projects`}>Back to projects</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project}</span>
        </nav>
      </div>
      <div className="case-navigation-sections">
        <nav aria-label="Case study sections">
          {["Product", "Decisions", "System", "Evidence"].map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="case-other" href={`${basePath}/work/${other[0]}/`}>
          Next case study: {other[1]}
        </a>
      </div>
    </header>
  );
}

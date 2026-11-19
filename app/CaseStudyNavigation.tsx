import { SiteNavigation } from "./SiteNavigation";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function CaseStudyNavigation({
  project,
  sections = ["Product", "Decisions", "System", "Evidence"],
}: {
  project: "DSA Dojo" | "Pay Period Planner" | "Enterprise data architecture";
  sections?: string[];
}) {
  const other =
    project === "DSA Dojo" || project === "Enterprise data architecture"
      ? ["pay-period-planner", "Pay Period Planner"]
      : ["dsa-dojo", "DSA Dojo"];
  return (
    <header className="case-navigation" id="case-study-top">
      <SiteNavigation page="case-study" caseStudySection={project === "Enterprise data architecture" ? "professional" : "projects"} />
      <div className="case-navigation-heading">
        <nav aria-label="Breadcrumb">
          <a href={`${basePath}/#${project === "Enterprise data architecture" ? "professional" : "projects"}`}>
            {project === "Enterprise data architecture" ? "Back to experience" : "Back to projects"}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project}</span>
        </nav>
      </div>
      <div className="case-navigation-sections">
        <nav aria-label="Case study sections">
          {sections.map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="case-other" href={`${basePath}/work/${other[0]}/`}>
          {project === "Enterprise data architecture" ? "Independent application work" : "Next case study"}: {other[1]}
        </a>
      </div>
    </header>
  );
}

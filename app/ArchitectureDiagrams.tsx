import { DiagramView } from "./DiagramView";
import diagrams from "./architectureDiagrams.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ArchitectureDiagrams({
  project,
}: {
  project: "pay-period-planner" | "dsa-dojo";
}) {
  const views = diagrams.filter((diagram) => diagram.repo === project);
  return (
    <section
      className="architecture-diagrams"
      aria-label="Architecture diagrams"
    >
      {views.map((view) => (
        <figure key={view.stem}>
          <h3>{view.title}</h3>
          <p>{view.decision}</p>
          <DiagramView
            src={`${basePath}/diagrams/${project}/${view.stem}.svg`}
            width={view.width}
            height={view.height}
            title={view.title}
            description={view.decision}
          />
          <figcaption>{view.limit}</figcaption>
        </figure>
      ))}
    </section>
  );
}

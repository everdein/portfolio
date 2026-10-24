import Image from "next/image";
import diagrams from "./architectureDiagrams.json";
import { ExternalLink } from "./ExternalLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ArchitectureDiagrams({ project }: { project: "pay-period-planner" | "dsa-dojo" }) {
  const views = diagrams.filter((diagram) => diagram.repo === project);
  const overview = views.find((diagram) => diagram.stem.startsWith("02-"))!;
  const directory = `${basePath}/diagrams/${project}`;
  return (
    <section className="architecture-diagrams" aria-label="Architecture diagrams">
      <h3>Inspect the architecture</h3>
      <p>{overview.decision}</p>
      <figure>
        <a href={`${directory}/${overview.stem}.svg`} target="_blank" rel="noreferrer" aria-label="Open full-size architecture diagram (opens in a new tab)">
          <Image src={`${directory}/${overview.stem}.png`} width={overview.width} height={overview.height} alt={`${overview.title}: ${overview.decision}`} />
        </a>
        <figcaption>Open the diagram at full size to inspect its labels and boundaries.</figcaption>
      </figure>
      <ul className="diagram-resources">
        {views.map((view) => (
          <li key={view.stem}>
            <div>
              <h4>{view.title}</h4>
              <p>{view.limit}</p>
            </div>
            <div className="diagram-resource-links">
              <ExternalLink href={`${directory}/${view.stem}.svg`}>View diagram<span className="sr-only">: {view.title}</span></ExternalLink>
              <a href={`${directory}/${view.stem}.mmd`} download>Download Mermaid<span className="sr-only">: {view.title}</span></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

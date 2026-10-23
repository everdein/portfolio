import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "../ExternalLink";
import { ThemeToggle } from "../ThemeToggle";
import { PrintResume } from "./PrintResume";
import content from "./content.json";
import "./resume.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://everdein.github.io/portfolio";
const title = "Resume | Matthew Clark";
const description =
  "Matthew Clark's resume: senior software engineering, application architecture, system design, technical leadership, and independent projects.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/resume/` },
  openGraph: { title, description, url: `${siteUrl}/resume/`, type: "profile" },
  twitter: { title, description, card: "summary_large_image" },
};

export default function Resume() {
  return (
    <div className="canvas resume-canvas">
      <a className="skip-link" href="#resume-content">
        Skip to resume
      </a>
      <aside className="rail" aria-label="Resume navigation">
        <a
          className="rail-mark"
          href={`${basePath}/`}
          aria-label="MC — Matthew Clark portfolio home"
        >
          MC
        </a>
        <p className="rail-edition">
          Professional profile
          <br />
          Resume
        </p>
        <nav aria-label="Resume sections">
          {[
            ["summary", "Summary"],
            ["experience", "Experience"],
            ["independent-projects", "Projects"],
            ["skills", "Skills"],
            ["education", "Education"],
          ].map(([id, label], i) => (
            <a href={`#${id}`} key={id}>
              <span className="nav-index" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>
        <div className="rail-status">
          <a href={`${basePath}/`}>Back to portfolio</a>
        </div>
      </aside>
      <main id="resume-content">
        <header className="topbar">
          <p className="topbar-id">
            Matthew Clark <span>Experience / Skills / Education</span>
          </p>
          <ThemeToggle />
        </header>
        <article className="resume-document" aria-labelledby="resume-title">
          <header className="resume-heading">
            <Image
              className="resume-portrait"
              src={`${basePath}/images/matthew-clark-headshot.jpg`}
              alt="Matthew Clark wearing a light blue shirt against a softly blurred neutral background"
              width={220}
              height={220}
              priority
            />
            <p className="role">Senior Software Engineer</p>
            <h1 id="resume-title">Matthew Clark</h1>
            <p className="resume-specialty">
              Senior Software Engineer | Application Architecture &amp; System
              Design | Technical Leadership
            </p>
            <ul
              className="resume-contact"
              aria-label="Contact and professional profiles"
            >
              <li>Orlando, FL</li>
              <li>
                <a href="mailto:everdein@gmail.com">everdein@gmail.com</a>
              </li>
              <li>
                <ExternalLink href="https://linkedin.com/in/everdein">
                  LinkedIn
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://github.com/everdein">
                  GitHub
                </ExternalLink>
              </li>
            </ul>
            <div className="resume-actions">
              <a
                className="primary-link"
                href={`${basePath}/matthew-clark-resume.pdf`}
                download
              >
                Download PDF
              </a>
              <ExternalLink href={`${basePath}/matthew-clark-resume.pdf`}>
                Open PDF
              </ExternalLink>
              <PrintResume />
            </div>
          </header>
          <section
            id="summary"
            className="resume-section"
            aria-labelledby="summary-title"
          >
            <h2 id="summary-title">Professional summary</h2>
            <p>{content.summary}</p>
          </section>
          <section
            id="experience"
            className="resume-section"
            aria-labelledby="experience-title"
          >
            <h2 id="experience-title">Professional experience</h2>
            <div className="resume-job">
              <div className="resume-job-heading">
                <div>
                  <h3>PBK</h3>
                  <p>Senior Software Engineer</p>
                </div>
                <p>
                  September 2026–Present
                  <br />
                  Orlando, FL · Remote
                </p>
              </div>
              <h4>System design, enterprise integration &amp; applied AI</h4>
              <ul>
                {content.pbk.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="resume-job">
              <div className="resume-job-heading">
                <div>
                  <h3>State Farm</h3>
                  <p>Lead Software Engineer</p>
                </div>
                <p>
                  September 2023–September 2026
                  <br />
                  Orlando, FL · Remote
                </p>
              </div>
              <p className="resume-promotion">
                Promoted to Lead Software Engineer in September 2023 after
                joining as a Software Engineer in June 2021.
              </p>
              {content.stateFarm.map((group) => (
                <div className="resume-experience-group" key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section
            id="independent-projects"
            className="resume-section"
            aria-labelledby="resume-projects-title"
          >
            <h2 id="resume-projects-title">Selected independent projects</h2>
            <div className="resume-project">
              <h3>
                <a href={`${basePath}/work/pay-period-planner/`}>
                  Pay Period Planner
                </a>
              </h3>
              <p className="resume-stack">
                React / TypeScript / Spring Boot / PostgreSQL
              </p>
              <p>{content.planner}</p>
            </div>
            <div className="resume-project">
              <h3>
                <ExternalLink href="https://everdein.github.io/dsa-dojo/">
                  DSA Dojo — Interactive Algorithm Studio
                </ExternalLink>
              </h3>
              <p className="resume-stack">JavaScript / Node.js / Playwright</p>
              <p>{content.dsa}</p>
            </div>
          </section>
          <section
            id="skills"
            className="resume-section"
            aria-labelledby="skills-title"
          >
            <h2 id="skills-title">Technical skills</h2>
            <dl className="resume-skills">
              {content.skills.map((skill) => (
                <div key={skill.title}>
                  <dt>{skill.title}</dt>
                  <dd>{skill.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section
            id="education"
            className="resume-section"
            aria-labelledby="education-title"
          >
            <h2 id="education-title">Education</h2>
            <h3>Bachelor of Science in Computer Science</h3>
            <p>Bellevue College · Bellevue, Washington</p>
          </section>
        </article>
        <footer>
          <span>Matthew Clark / Resume</span>
          <a href={`${basePath}/`}>Back to portfolio</a>
        </footer>
      </main>
    </div>
  );
}

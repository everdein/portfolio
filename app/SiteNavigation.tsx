"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const links = [["projects", "Projects"], ["professional", "Experience"], ["about", "About"], ["resume", "Resume"]];

export function SiteNavigation({ page }: { page: "home" | "resume" | "case-study" }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  useEffect(() => {
    if (page !== "home") return;
    const update = () => {
      const visible = ["professional", "projects", "about"].filter(id => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 180;
      });
      setSection(visible.at(-1) ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [page]);
  return (
    <div className="site-navigation" onKeyDown={event => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("site-menu-toggle")?.focus();
      }
    }}>
      <a className="site-brand" href={page === "home" ? "#top" : `${basePath}/`} aria-label="Matthew Clark portfolio home">
        <BrandMark /><span>Matthew Clark</span>
      </a>
      <button id="site-menu-toggle" className="site-menu-toggle" aria-expanded={open} aria-controls="site-primary-links" onClick={() => setOpen(!open)}>{open ? "Close menu" : "Menu"}</button>
      <nav id="site-primary-links" className={open ? "site-links is-open" : "site-links"} aria-label="Primary navigation">
        {links.map(([id, label]) => {
          const active = id === "resume" ? page === "resume" : page === "case-study" ? id === "projects" : section === id;
          const href = id === "resume" ? `${basePath}/resume/` : page === "home" ? `#${id}` : `${basePath}/#${id}`;
          return <a key={id} href={href} aria-current={active ? (page === "home" ? "location" : "page") : undefined} onClick={() => setOpen(false)}>{label}</a>;
        })}
      </nav>
      <ThemeToggle />
    </div>
  );
}

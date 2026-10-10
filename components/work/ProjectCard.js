"use client";

import { useRef } from "react";
import { ProjectVisual } from "./ProjectVisual";
import { useProject } from "./ProjectProvider";
import { openProjectWithTransition } from "./open-project";

/*
  ProjectCard — one featured card.
    • Clicking the card (anywhere) opens the detail modal; the shared-element
      morph flies the visual into the modal's image.
    • The title link and the .sublinks sit above the click layer, so anyone who
      wants the live project can still click straight through.
*/
export function ProjectCard({ project, index, total }) {
  const num = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const visual = VISUALS[project.visual] || VISUALS.accent;
  const mutedNum = project.visual === "surface" || project.visual === "grid";
  const visualRef = useRef(null);
  const { openProject } = useProject();

  function open() {
    openProjectWithTransition(openProject, { ...project, num }, visualRef.current);
  }

  return (
    <article className="pcard">
      <button
        type="button"
        className="pcard__open"
        aria-label={`View details for ${project.title}`}
        onClick={open}
      />

      <div
        className={visual.className ? `pcard__visual ${visual.className}` : "pcard__visual"}
        ref={visualRef}
        style={visual.style}
      >
        <span className="pcard__num" style={mutedNum ? { color: "var(--muted)" } : undefined}>
          {num}
        </span>
        {project.badge ? <span className="badge">{project.badge}</span> : null}
        <ProjectVisual project={project} />
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">
          <a className="pcard__link" href={project.href} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>
        <p className="pcard__desc">{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="sublinks">
          {project.links.map((link) => (
            <a
              className="sublink"
              key={`${link.label}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/* visual role → CSS (docs/10). Accent/ink/surface/accent2/terminal are the
   flat roles; brass/grid are the screenshot-card roles (see ProjectVisual:
   brass supplies the hotel's gold gradient, grid the surface + inset line). */
const VISUALS = {
  accent: { style: { background: "var(--accent)", color: "var(--on-accent)" } },
  ink: { style: { background: "var(--ink)", color: "var(--ground)" } },
  surface: {
    style: { background: "var(--ground-2)", boxShadow: "inset 0 0 0 1px var(--line)" },
  },
  accent2: { style: { background: "var(--accent-2)", color: "var(--on-accent-2)" } },
  terminal: { style: { background: "#0B0B0B", color: "#D8D8D8" } },
  brass: { className: "v-brass" },
  grid: {
    className: "v-grid",
    style: {
      background: "var(--ground-2)",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--line)",
    },
  },
};

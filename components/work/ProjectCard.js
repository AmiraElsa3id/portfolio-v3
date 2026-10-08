import { ProjectArt } from "./ProjectArt";

/* ProjectCard — one featured card. The whole card is clickable via the title
   link's ::after overlay ("stretched link"); .sublinks sit above it. */
export function ProjectCard({ project, index, total }) {
  const num = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const mutedNum = project.visual === "surface";

  return (
    <article className="pcard">
      <div className="pcard__visual" style={VISUALS[project.visual]}>
        <span className="pcard__num" style={mutedNum ? { color: "var(--muted)" } : undefined}>
          {num}
        </span>
        {project.badge ? <span className="badge">{project.badge}</span> : null}
        <ProjectArt project={project} />
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

/* visual role → CSS (docs/10: accent | ink | surface | accent2 | terminal) */
const VISUALS = {
  accent: { background: "var(--accent)", color: "var(--on-accent)" },
  ink: { background: "var(--ink)", color: "var(--ground)" },
  surface: { background: "var(--ground-2)", boxShadow: "inset 0 0 0 1px var(--line)" },
  accent2: { background: "var(--accent-2)", color: "var(--on-accent-2)" },
  terminal: { background: "#0B0B0B", color: "#D8D8D8" },
};

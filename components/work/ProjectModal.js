"use client";

import { useEffect, useRef } from "react";
import { useProject } from "./ProjectProvider";
import { ProjectArt } from "./ProjectArt";
import { Icon } from "@/components/ui/Icon";

/*
  ProjectModal — the project detail view. Native <dialog> (focus trap, Esc,
  inert background, focus restore) like the summary modal. Shows the real
  screenshot plus the project's number, title, description, tags and links.
  The image carries view-transition-name project-hero so the card morphs into
  it (see open-project.js).
*/
export function ProjectModal() {
  const { project, closeProject } = useProject();
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    else if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", !!project);
    return () => document.body.classList.remove("is-locked");
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="pmodal"
      data-js="project"
      aria-labelledby="pmodal-title"
      onClose={closeProject}
      onCancel={closeProject}
      onClick={(event) => {
        if (event.target === ref.current) closeProject();
      }}
    >
      {project ? (
        <>
          <button
            type="button"
            className="iconbtn pmodal__close"
            data-js="close-project"
            aria-label="Close project details"
            onClick={closeProject}
          >
            <Icon name="close" size={16} />
          </button>

          <div className="pmodal__media">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                style={{ viewTransitionName: "project-hero" }}
              />
            ) : (
              <ProjectArt project={project} />
            )}
            {project.num ? <span className="mono pmodal__num">{project.num}</span> : null}
          </div>

          <div className="pmodal__body">
            {project.badge ? <span className="label">{project.badge}</span> : null}
            <h2 id="pmodal-title" className="pmodal__title">
              {project.title}
            </h2>
            <p className="pmodal__desc">{project.description}</p>
            {project.context ? <p className="pmodal__context">{project.context}</p> : null}

            {project.tags?.length ? (
              <div className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {project.links?.length ? (
              <div className="pmodal__links">
                {project.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      className="btn btn--ghost"
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                      <Icon name="arrowUpRight" size={16} />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </dialog>
  );
}

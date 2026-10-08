"use client";

import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "./work/ProjectArt";
import { useProject } from "./work/ProjectProvider";

/*
  MoreRow — one row of "More builds".
    • Clicking the row opens the project detail modal.
    • The arrow on the right is a direct link to the live project (Ctrl/⌘-click,
      or just a one-click shortcut for the impatient).
    • Hover shows a preview whose art is the project's own illustration.
*/
export function MoreRow({ build }) {
  const { openProject } = useProject();

  const project = {
    id: build.id,
    title: build.name,
    image: build.image,
    description: build.brief,
    tags: build.stack.split(" · "),
    links: [{ label: build.cta.replace(" ↗", ""), href: build.href }],
    num: build.num,
    context: build.context,
  };

  return (
    <div className="mrow">
      <button
        type="button"
        className="mrow__open"
        aria-label={`View details for ${build.name}`}
        onClick={() => openProject(project)}
      />

      <span className="mono mrow__muted">{build.num}</span>
      <span className="mrow__name">{build.name}</span>
      <span className="mrow__muted mrow__hide-sm">{build.summary}</span>
      <span className="mono mrow__muted mrow__hide-sm" style={{ fontSize: 12 }}>
        {build.stack}
      </span>

      <span className="mprev" aria-hidden="true">
        <span className="mshot" style={{ background: build.shot.bg, color: build.shot.color }}>
          <ProjectArt project={{ id: build.id, art: build.id, title: build.name }} />
        </span>
        <span className="mbrief">
          <b>{build.cta}</b>
          {build.brief}
        </span>
      </span>

      <a
        className="mrow__arrow"
        href={build.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${build.name} in a new tab`}
      >
        <Icon name="arrowRight" size={24} strokeWidth={1.8} />
      </a>
    </div>
  );
}

"use client";

import { Icon } from "@/components/ui/Icon";
import { useProject } from "./work/ProjectProvider";

/*
  MoreRow — one row of "More builds".
    • Clicking the row opens the project detail modal.
    • The arrow on the right is a direct link to the live project (Ctrl/⌘-click,
      or just a one-click shortcut for the impatient).
    • Hover shows a preview card that holds the project's real screenshot in a
      mini browser frame (see app/styles/projects.css — the "More-builds
      preview" block). The screenshot wipes in top-down, then settles from a
      slight zoom.
*/

// A few screenshots read better cropped away from the very top.
const PREVIEW_POSITION = {
  mudabbir: "100% 0",
  quizmaster: "50% 20%",
  cafeteria: "50% 50%",
};

export function MoreRow({ build }) {
  const { openProject } = useProject();

  const project = {
    id: build.id,
    title: build.name,
    image: build.image,
    description: build.brief,
    tags: build.stack.split(" · "),
    links: build.links ?? [{ label: build.cta.replace(" ↗", ""), href: build.href }],
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
        <span className="mshot">
          <span className="mbar">
            <i />
            <i />
            <i />
            <span className="murl">{previewUrl(build.href)}</span>
          </span>
          <span className="mimg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={build.image}
              width={720}
              height={450}
              alt=""
              loading="lazy"
              decoding="async"
              style={
                PREVIEW_POSITION[build.id]
                  ? { objectPosition: PREVIEW_POSITION[build.id] }
                  : undefined
              }
            />
          </span>
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

/* The URL strip in the preview's mini browser bar: the host, plus the path for
   links that live under one (GitHub repos), so it reads like an address bar. */
function previewUrl(href) {
  try {
    const { host, pathname } = new URL(href);
    const clean = host.replace(/^www\./, "") + (pathname === "/" ? "" : pathname);
    return clean;
  } catch {
    return href;
  }
}

"use client";

import { flushSync } from "react-dom";

/*
  Opens the project modal. When the browser supports the View Transitions API
  and motion isn't reduced, the card's visual morphs into the modal's image
  (shared `view-transition-name: project-hero`). Otherwise it just opens.
*/
export function openProjectWithTransition(openProject, project, sourceEl) {
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    reduceMotion ||
    !sourceEl
  ) {
    openProject(project);
    return;
  }

  sourceEl.style.viewTransitionName = "project-hero";
  const transition = document.startViewTransition(() => {
    // clear the card's name inside the callback so the "new" snapshot only
    // has one element carrying it — the modal image.
    sourceEl.style.viewTransitionName = "";
    flushSync(() => openProject(project));
  });
  transition.finished.finally(() => {
    sourceEl.style.viewTransitionName = "";
  });
}

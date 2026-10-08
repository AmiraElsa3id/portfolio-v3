"use client";

import { createContext, useContext, useMemo, useState } from "react";

/*
  ProjectProvider — holds the project currently shown in the detail modal.
  Any card or row can call openProject(project); the modal itself renders once
  at the page level (components/work/ProjectModal.js).
*/

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(null);

  const value = useMemo(
    () => ({
      project,
      openProject: (next) => setProject(next),
      closeProject: () => setProject(null),
    }),
    [project],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used inside <ProjectProvider>");
  return ctx;
}

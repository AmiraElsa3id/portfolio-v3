"use client";

import { useEffect } from "react";

/*
  PointerVars — ported from main.js §1. A single pointermove listener writes
  --cx / --cy on <html>; the cursor bubble and the "More builds" preview read
  them. Only on fine-pointer devices.
*/
export function PointerVars() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    function onMove(event) {
      root.style.setProperty("--cx", `${event.clientX}px`);
      root.style.setProperty("--cy", `${event.clientY}px`);
      if (!root.classList.contains("has-pointer")) root.classList.add("has-pointer");
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}

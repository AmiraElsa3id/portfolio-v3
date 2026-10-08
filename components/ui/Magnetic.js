"use client";

import { useEffect, useRef } from "react";

/*
  Magnetic — ported from main.js §2. Wraps a button and leans it ~25% toward
  the pointer while hovered, springing back on leave. Disabled for touch
  devices and reduced motion.
*/
export function Magnetic({ children, className = "mag" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * 0.25).toFixed(1)}px,${(dy * 0.3).toFixed(1)}px)`;
    }
    function onLeave() {
      el.style.transform = "";
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

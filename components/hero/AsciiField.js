"use client";

/*
  AsciiField — client wrapper for the WebGL hero (assets/js/hero-ascii.js).
  The canvas is rendered on the server; the WebGL field itself is created on
  the client in Phase 3 (useRef + useEffect + cleanup). Under reduced motion
  or when WebGL fails, the CSS .hero__fallback dot grid shows through.
*/
export function AsciiField() {
  return <canvas className="hero__canvas" data-js="ascii" aria-hidden="true" />;
}

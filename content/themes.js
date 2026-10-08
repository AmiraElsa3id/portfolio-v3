/* =====================================================================
   themes.js — PALETTE DATA
   ---------------------------------------------------------------------
   The single source of truth for the four palettes. The CSS values live
   in app/globals.css under html[data-theme="<id>"]; this file carries the
   ids, labels and the three colours the WebGL hero reads (ground, ink,
   accent). Ported from the static site's assets/js/themes.js.
   ===================================================================== */

export const STORAGE_KEY = "amera-theme";
export const DEFAULT_THEME = "dark-lime";

export const THEMES = [
  { id: "dark-lime", label: "Dark lime", ground: "#0C0D0B", ink: "#EDEEE8", accent: "#D4F53C" },
  { id: "dark-cobalt", label: "Dark cobalt", ground: "#0A0B10", ink: "#ECEDF3", accent: "#6E86FF" },
  { id: "noir", label: "Noir", ground: "#0A0A0A", ink: "#F2F2F2", accent: "#F2F2F2" },
  { id: "bone", label: "Bone (light)", ground: "#EFEDE6", ink: "#121212", accent: "#2F49FF" },
];

export function themeById(id) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

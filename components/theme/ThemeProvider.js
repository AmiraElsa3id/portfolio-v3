"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { THEMES, themeById } from "@/content/themes";
import { getServerSnapshot, getSnapshot, setStoredTheme, subscribe } from "./theme-store";

/*
  ThemeProvider — ported from the static site's assets/js/themes.js.

  Keeps the exact same contract:
    • localStorage key            "amera-theme"  (see components/theme/theme-store.js)
    • <html data-theme="…">       applied before paint by the inline script
                                  in app/layout.js, and re-applied here.
    • window "themechange" event  dispatched so AsciiField can re-tint the
                                  WebGL shader with the new palette.
    • <meta name="theme-color">   kept in sync with the palette ground.
*/

const ThemeContext = createContext(null);

function applyThemeToDom(id) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  const theme = themeById(id);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme.ground);
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync the DOM with the current theme. useLayoutEffect also re-applies the
  // attribute that React Strict Mode clears on its dev remount (a no-op in
  // production) and re-tints the hero after a change.
  useLayoutEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  const setTheme = useCallback((id) => setStoredTheme(id), []);

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

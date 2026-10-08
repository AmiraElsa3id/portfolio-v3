"use client";

import { useTheme } from "./ThemeProvider";

/* ThemeSwatches — the palette picker in the footer. Equivalent to the
   swatches themes.js used to build, but driven by React state. */
export function ThemeSwatches() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="footer__palette" role="group" aria-label="Colour palette">
      <span>Palette</span>
      <span style={{ display: "flex", gap: 10 }}>
        {themes.map((option) => (
          <button
            key={option.id}
            type="button"
            className="swatch"
            data-theme-id={option.id}
            aria-label={`${option.label} palette`}
            aria-pressed={theme === option.id}
            style={{ "--sw-accent": option.accent, "--sw-ground": option.ground }}
            onClick={() => setTheme(option.id)}
          />
        ))}
      </span>
    </div>
  );
}

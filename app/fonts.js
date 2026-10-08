import localFont from "next/font/local";

/*
  Self-hosted web fonts — the exact woff2 files from the static site's
  assets/fonts/ (Latin subset, ~190 KB total, SIL OFL 1.1).

  Each family exposes a CSS variable that app/globals.css maps onto the
  original --font-display / --font-body / --font-mono tokens, so every
  selector in the ported stylesheets keeps working unchanged.

  Only the weights the site actually uses are included:
    Syne            600 700 800
    Manrope         400 500 600 700
    JetBrains Mono  400 500 700
*/

export const syne = localFont({
  src: [
    { path: "./fonts/syne-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/syne-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/syne-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-syne",
});

export const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-manrope",
});

export const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-jetbrains",
  // Labels/metadata only: don't preload these, load them on demand.
  preload: false,
});

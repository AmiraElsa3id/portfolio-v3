"use client";

import { useEffect } from "react";

/* ConsoleHello — ported from main.js §7. A note for developers who open
   DevTools. Runs once on mount. */
export function ConsoleHello() {
  useEffect(() => {
    try {
      console.log(
        "%cAmera.%c  Hi, developer. The source is readable on purpose — have a look around. Say hi: ameraelsa3id@gmail.com",
        "font:800 20px Syne,sans-serif;color:#D4F53C;background:#0C0D0B;padding:4px 10px",
        "font:12px monospace",
      );
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}

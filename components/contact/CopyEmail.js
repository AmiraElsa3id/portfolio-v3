"use client";

import { useEffect, useRef, useState } from "react";

/* CopyEmail — ported from main.js §5. Copies the address and shows
   "Copied ✓" for 1.8s. */
export function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(email);
    } catch {
      /* clipboard may be unavailable (insecure context) */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className="copy" data-email={email} onClick={handleCopy}>
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}

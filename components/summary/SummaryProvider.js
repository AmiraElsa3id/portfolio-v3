"use client";

import { createContext, useContext, useMemo, useState } from "react";

/*
  SummaryProvider — shares the "20-second summary" modal's open state.
  The trigger lives in the nav bar and in the mobile menu; the modal itself
  renders once at the page level, so a small context is the cleanest wiring.
*/

const SummaryContext = createContext(null);

export function SummaryProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openSummary: () => setOpen(true),
      closeSummary: () => setOpen(false),
    }),
    [open],
  );

  return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
}

export function useSummary() {
  const ctx = useContext(SummaryContext);
  if (!ctx) throw new Error("useSummary must be used inside <SummaryProvider>");
  return ctx;
}

"use client";

import { useEffect, useRef } from "react";
import { useSummary } from "@/components/summary/SummaryProvider";
import { LocalClock } from "@/components/interactions/LocalClock";
import { Icon } from "@/components/ui/Icon";
import { CV_URL, profile } from "@/content/profile";

/*
  SummaryModal — the "20-second version" for recruiters (index.html §MODAL).
  Native <dialog>: showModal() handles focus trapping, Esc and the backdrop,
  and returns focus to the trigger on close. We still lock page scroll.
*/

const ROWS = [
  ["Role", "Full-stack software engineer (Laravel · Django · Node · React · Next.js)"],
  ["Now", "Full-stack Engineer & Mentor, Route Academy · Sep 2024 – now"],
  ["Before", "WordPress & Full-stack Developer, Ave Events · 2024 – 2025 · page load −25%"],
  [
    "Highlights",
    "Ranked 1st on ITI Open Source track · BSc CS, GPA 3.61 (top 15%) · Huawei ICT silver medal · mentors 20+ devs weekly",
  ],
  ["Best projects", "RestoMind (AI demand forecasting) · AI Chat Clone · Hotel Management System"],
  ["Languages", "Arabic (native) · English (professional, fluent)"],
];

export function SummaryModal() {
  const { open, closeSummary } = useSummary();
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      data-js="summary"
      aria-labelledby="summary-title"
      onClose={closeSummary}
      onCancel={closeSummary}
      onClick={(event) => {
        // clicks on the invisible ::backdrop register on the dialog itself
        if (event.target === ref.current) closeSummary();
      }}
    >
      <div className="modal__head">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="label">For recruiters · the 20-second version</span>
          <h2 id="summary-title" className="display modal__title">
            {profile.name}
          </h2>
        </div>
        <button
          type="button"
          className="iconbtn"
          data-js="close-summary"
          aria-label="Close summary"
          onClick={closeSummary}
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <dl className="tgrid">
        {ROWS.map(([dt, dd]) => (
          <FragmentRow key={dt} term={dt}>
            {dd}
          </FragmentRow>
        ))}
        <dt>Location</dt>
        <dd>
          {profile.location} (<LocalClock /> local) · open to relocation and remote
        </dd>
      </dl>

      <div className="modal__actions">
        <a className="btn btn--solid" href={CV_URL} target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
        <a className="btn btn--ghost" href={`mailto:${profile.contact.email}`}>
          Email
        </a>
        <a
          className="btn btn--ghost"
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="btn btn--ghost"
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </dialog>
  );
}

/* Small helper so each data row renders a <dt>/<dd> pair. */
function FragmentRow({ term, children }) {
  return (
    <>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </>
  );
}

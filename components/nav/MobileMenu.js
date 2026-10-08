"use client";

import { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/content/principles";
import { CV_URL, profile } from "@/content/profile";
import { useSummary } from "@/components/summary/SummaryProvider";
import { Icon } from "@/components/ui/Icon";
import { LocalClock } from "@/components/interactions/LocalClock";

/*
  MobileMenu — ported from index.html §MOBILE MENU + main.js §3.
  Now a native <dialog> (was a hidden div): showModal() gives focus trapping,
  Esc-to-close, an inert background and focus restore for free. It still
  locks page scroll and auto-closes when the window grows past 900px.
*/
export function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  const { openSummary } = useSummary();

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

  // If the window grows past the breakpoint while the menu is open, close it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (event) => {
      if (event.matches) onClose();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  function handleSummary() {
    onClose();
    openSummary();
  }

  return (
    <dialog ref={ref} className="menu" id="menu" aria-label="Menu" onClose={onClose}>
      <div className="menu__top">
        <span className="nav__logo">Amera.</span>
        <button type="button" className="iconbtn" aria-label="Close menu" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
      </div>

      <nav className="menu__links" aria-label="Mobile">
        {NAV_LINKS.map((link, i) => (
          <a key={link.href} href={link.href} onClick={onClose}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="menu__foot">
        <div className="hero__ctas">
          <button
            type="button"
            className="btn btn--ghost"
            data-js="open-summary"
            onClick={handleSummary}
          >
            20-sec summary
          </button>
          <a className="btn btn--solid" href={CV_URL} target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>
        <span className="label">
          {profile.locationShort} · <LocalClock /> local · {profile.contact.email}
        </span>
      </div>
    </dialog>
  );
}

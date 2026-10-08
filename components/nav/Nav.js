"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/content/principles";
import { CV_URL, profile } from "@/content/profile";
import { useSummary } from "@/components/summary/SummaryProvider";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "./MobileMenu";

/* Nav — ported from index.html §NAV. Transparent over the hero, solid after
   scrolling (CSS scroll timeline). The burger opens the full-screen menu. */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSummary } = useSummary();

  return (
    <>
      <header className="nav">
        <div className="nav__bar">
          <div className="container nav__inner">
            <a href="#top" className="nav__logo" aria-label={`${profile.name}, back to top`}>
              Amera.
            </a>

            <nav className="nav__links" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  <span className="roll">
                    <span data-t={link.label}>{link.label}</span>
                  </span>
                </a>
              ))}
            </nav>

            <div className="nav__actions">
              <button type="button" className="navbtn hide-sm" onClick={openSummary}>
                20-sec summary
              </button>
              <a
                className="navbtn navbtn--solid"
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
                <Icon name="download" size={14} strokeWidth={2.2} />
              </a>
              <button
                type="button"
                className="burger"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="menu"
                onClick={() => setMenuOpen(true)}
              >
                <i />
                <i />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

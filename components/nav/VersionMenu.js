"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CURRENT_VERSION, VERSIONS } from "@/content/versions";
import { Icon } from "@/components/ui/Icon";

/* VersionMenu — a disclosure that says which build of the portfolio you are
   on and lists the others. The current build is this page (no link), builds
   that still have a deployment open in a new tab, and archived ones are
   listed as plain text with the reason.

   Mounted twice: in the nav (placement="bottom", hangs below the bar) and in
   the mobile menu (placement="top", grows upward because the dialog clips its
   own scroll edge). useId keeps the two aria-controls ids apart. */
export function VersionMenu({ placement = "bottom" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();

  // Listeners exist only while the panel is open: Escape closes and hands
  // focus back to the trigger, a click anywhere else just closes.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const current = VERSIONS.find((v) => v.id === CURRENT_VERSION) ?? VERSIONS[0];

  return (
    <div className="ver" ref={rootRef} data-placement={placement}>
      <button
        type="button"
        ref={triggerRef}
        className="navbtn ver__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        {current.label}
        <span className="ver__caret">
          <Icon name="chevron" size={14} strokeWidth={2.2} />
        </span>
      </button>

      <div className="ver__panel" id={panelId} hidden={!open}>
        <span className="ver__head">Portfolio version</span>
        <ul className="ver__list">
          {VERSIONS.map((version) => (
            <VersionRow key={version.id} version={version} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* One line of the list: a link when the version has somewhere to go, a
   plain row when it is the build you are on or a record only. */
function VersionRow({ version }) {
  const isCurrent = version.id === CURRENT_VERSION;

  const body = (
    <>
      <span className="ver__id">{version.label}</span>
      <span className="ver__note">{version.note}</span>
      {isCurrent && <span className="ver__flag ver__flag--now">current</span>}
      {version.external && (
        <>
          <span className="ver__flag">new tab</span>
          <Icon name="arrowUpRight" size={14} strokeWidth={2.2} />
        </>
      )}
      {version.archived && <span className="ver__flag ver__flag--off">archived</span>}
      <span className="sr-only">{version.detail}</span>
    </>
  );

  return (
    <li className="ver__item">
      {version.href ? (
        <a
          className="ver__row"
          href={version.href}
          {...(version.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {body}
        </a>
      ) : (
        <span
          className={`ver__row${isCurrent ? " ver__row--now" : ""}${
            version.archived ? " ver__row--off" : ""
          }`}
          aria-current={isCurrent ? "true" : undefined}
        >
          {body}
        </span>
      )}
    </li>
  );
}

/*
  versions.js — every published build of this portfolio, newest first.

  The nav dropdown, the mobile menu and docs all read from here, so shipping
  a new version is a one-line edit:

    CURRENT_VERSION = "v4"                       ← this repo now serves v4
    VERSIONS.unshift({ id: "v4", … })            ← and v4 goes to the top

  Row semantics:
    href: null          you are already here (current) or it is only a record
    external: true      different deployment → new tab, rel="noopener"
    archived: true      deliberately not a link, shown greyed with a reason
*/

export const CURRENT_VERSION = "v3";

export const VERSIONS = [
  {
    id: "v3",
    label: "v3",
    note: "This build",
    detail: "the build you are browsing now.",
  },
  {
    id: "v2",
    label: "v2",
    note: "Previous version",
    detail: "the earlier static site — opens in a new tab.",
    href: "https://portfolio-amera-mohammed.vercel.app/",
    external: true,
  },
  {
    id: "v1",
    label: "v1",
    note: "First design",
    detail: "archived, kept for the record — there is no link.",
    archived: true,
  },
];

/*
  Icon — the inline SVG set used across the site. Server-safe (no client JS).
  Sizes/stroke widths match the originals per usage site, overridable via props.
*/

const PATHS = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <path d="M12 4v12M6 10l6 6 6-6M5 20h14" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
};

export function Icon({ name, size = 18, strokeWidth = 2 }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

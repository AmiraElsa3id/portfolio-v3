/* principles.js — "How I work": three sticky cards with proof.
   Each `top` is 26px lower than the previous card's so they stack. */

export const PRINCIPLES = [
  {
    kicker: "01 / SPEED",
    title: "Fast",
    copy: "At Ave Events I cut average page load by 25% with server caching, query tuning and removing plugins nobody needed.",
    art: "streaks",
    style: { top: "96px", background: "var(--accent)", color: "var(--on-accent)" },
  },
  {
    kicker: "02 / SECURITY",
    title: "Secure",
    copy: "Logins, permissions and rate limits go in on day one, not after launch. I've patched 15+ critical issues within 24 hours of finding them.",
    art: "rings",
    style: { top: "122px", background: "var(--ink)", color: "var(--ground)" },
  },
  {
    kicker: "03 / TEACHING",
    title: "Explain it",
    copy: "If I can't explain my code, it isn't done. My code reviews cut repeated mistakes across two semesters of students by about 40%.",
    art: "dots",
    muted: true,
    style: {
      top: "148px",
      background: "var(--ground-2)",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--line)",
    },
  },
];

/* About sentence: each word is its own span so it can brighten on scroll.
   Words wrapped in { em } use the accent colour. */
export const ABOUT = [
  { w: "My" },
  { w: "graduation" },
  { w: "project" },
  { w: "was" },
  { w: "D-Pathy,", em: true },
  { w: "an" },
  { w: "app" },
  { w: "that" },
  { w: "screens" },
  { w: "eye" },
  { w: "scans" },
  { w: "for" },
  { w: "diabetic" },
  { w: "retinopathy." },
  { w: "Since" },
  { w: "then" },
  { w: "I've" },
  { w: "shipped" },
  { w: "Laravel," },
  { w: "Django" },
  { w: "and" },
  { w: "Node" },
  { w: "back" },
  { w: "ends," },
  { w: "React" },
  { w: "and" },
  { w: "Next.js" },
  { w: "front" },
  { w: "ends," },
  { w: "and" },
  { w: "a" },
  { w: "model" },
  { w: "that" },
  { w: "forecasts" },
  { w: "restaurant" },
  { w: "demand." },
];

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/* stats.js — the four proof points. Numbers come straight from the CV.
   `value` drives the CSS count-up (--v); `sr` carries the accessible text. */

export const STATS = [
  {
    lead: true,
    value: "1st",
    text: "out of everyone on ITI's 9-month Open Source track",
  },
  {
    value: 20,
    suffix: "+",
    sr: "20+",
    text: "developers mentored every week",
  },
  {
    value: 30,
    suffix: "+",
    sr: "30+",
    text: "live workshops taught",
  },
  {
    prefix: "−",
    value: 25,
    suffix: "%",
    sr: "25% faster",
    text: "page load time at Ave Events",
  },
];

/* The tilted stack band. Written once; the marquee renders a second,
   aria-hidden copy for the seamless loop. */
export const STACK = ["Laravel", "Django", "Node.js", "React", "Next.js", "TypeScript", "MongoDB"];

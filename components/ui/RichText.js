/*
  RichText — renders content strings where **double asterisks** mark a bold
  span. Used for the experience bullets, which came from HTML like
  "... in <b>React</b> on top of <b>Node.js</b> APIs."
*/
export function RichText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    // Odd indices are the captured (bold) groups.
    i % 2 === 1 ? <b key={i}>{part}</b> : part,
  );
}

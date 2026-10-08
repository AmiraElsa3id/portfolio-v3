import { STACK } from "@/content/stats";

/* StackBand — the tilted marquee. Items are listed twice so the loop is
   seamless; the second copy is hidden from screen readers. */
export function StackBand() {
  return (
    <section className="stackband" aria-label="Core stack">
      <div className="band">
        <div className="marquee">
          {STACK.map((item) => (
            <span className="mq" key={item}>
              {item} <span aria-hidden="true">/</span>
            </span>
          ))}
          {STACK.map((item) => (
            <span className="mq" key={`dup-${item}`} aria-hidden="true">
              {item} /
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

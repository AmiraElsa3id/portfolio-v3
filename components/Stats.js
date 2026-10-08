import { STATS } from "@/content/stats";

/* Stats — the four proof points. .stat counts up via CSS (--v); the sibling
   .sr-only carries the real value for screen readers. */
export function Stats() {
  return (
    <section className="stats container" aria-label="Highlights">
      <div className="statgrid">
        {STATS.map((stat) => (
          <div className={`statcell${stat.lead ? " statcell--lead" : ""}`} key={stat.text}>
            <span className="statcell__num">
              {stat.lead ? (
                stat.value
              ) : (
                <>
                  {stat.prefix}
                  <span className="stat" style={{ "--v": String(stat.value) }} aria-hidden="true" />
                  {stat.suffix}
                  <span className="sr-only">{stat.sr}</span>
                </>
              )}
            </span>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

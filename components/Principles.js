import { PRINCIPLES } from "@/content/principles";

/* Principles — three sticky cards that stack while scrolling. */
export function Principles() {
  return (
    <section className="principles container" aria-labelledby="principles-title">
      <div className="section-head" style={{ marginBottom: 64 }}>
        <h2 id="principles-title" className="h2 wipe">
          How I
          <br />
          work
        </h2>
        <span className="label">(03) — Three habits, with proof</span>
      </div>

      {PRINCIPLES.map((principle) => (
        <article className="scard" key={principle.title} style={principle.style}>
          <div className="scard__text">
            <span
              className="scard__kicker"
              style={principle.muted ? { color: "var(--muted)" } : undefined}
            >
              {principle.kicker}
            </span>
            <h3 className="scard__title">{principle.title}</h3>
            <p
              className="scard__copy"
              style={principle.muted ? { color: "var(--muted)" } : undefined}
            >
              {principle.copy}
            </p>
          </div>
          <div
            className="scard__art"
            style={principle.art === "dots" ? { color: "var(--accent)" } : undefined}
          >
            <PrincipleArt art={principle.art} />
          </div>
        </article>
      ))}
    </section>
  );
}

const DOT_DELAYS = [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7];

function PrincipleArt({ art }) {
  if (art === "streaks") {
    return (
      <div className="streaks" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }
  if (art === "rings") {
    return (
      <div className="rings" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b />
      </div>
    );
  }
  return (
    <div className="dots" aria-hidden="true">
      {DOT_DELAYS.map((d, i) => (
        <i key={i} style={{ "--d": String(d) }} />
      ))}
    </div>
  );
}

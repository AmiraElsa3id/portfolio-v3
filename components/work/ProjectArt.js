import { Icon } from "@/components/ui/Icon";

/*
  ProjectArt — the illustration inside each featured card.
  Switches on project.art, ported 1:1 from index.html. If a project has an
  `image` (a real screenshot in public/projects/), that wins and the CSS
  illustration is skipped.
*/

const ROOM_DELAYS = [0, 3, 1, 5, 2, 7, 4, 9, 6, 1, 8, 3, 10, 2, 11, 5, 0, 7];

export function ProjectArt({ project }) {
  const { art, image, title } = project;

  if (image) {
    return (
      <div className="art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${title} screenshot`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  switch (art) {
    case "forecast":
      return (
        <div className="art">
          <svg
            width="78%"
            viewBox="0 0 360 200"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M0 190H360" strokeWidth={1} opacity=".4" />
            <polyline points="0,160 45,140 90,150 135,104 180,116 225,80" />
            <polyline className="art-dash" points="225,80 270,62 315,44 360,22" />
            <circle cx="225" cy="80" r="7" fill="currentColor" />
          </svg>
          <span
            className="mono"
            style={{
              position: "absolute",
              right: 20,
              bottom: 16,
              fontSize: 12,
              letterSpacing: ".08em",
            }}
          >
            DEMAND FORECAST →
          </span>
        </div>
      );

    case "chat":
      return (
        <div
          className="art"
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 12,
            padding: "48px 40px",
          }}
          aria-hidden="true"
        >
          <span
            className="bubble"
            style={{
              alignSelf: "flex-end",
              background: "var(--accent)",
              color: "var(--on-accent)",
            }}
          >
            Summarise this PDF, then draw it as a poster
          </span>
          <span
            className="bubble"
            style={{
              alignSelf: "flex-start",
              background: "rgba(127,127,127,.22)",
              animationDelay: ".5s",
            }}
          >
            Streaming… here are the 3 key points
          </span>
          <span
            className="bubble"
            style={{
              alignSelf: "flex-start",
              background: "rgba(127,127,127,.22)",
              animationDelay: "1s",
            }}
          >
            <span className="typing">
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>
      );

    case "rooms":
      return (
        <div className="art" style={{ flexDirection: "column", gap: 22 }}>
          <div className="rooms" aria-hidden="true">
            {ROOM_DELAYS.map((d, i) => (
              <i key={i} style={{ "--d": String(d) }} />
            ))}
          </div>
          <span
            className="mono"
            style={{ fontSize: 12, letterSpacing: ".08em", color: "var(--muted)" }}
          >
            FLOOR 03 · 4 ROLES · STRIPE
          </span>
        </div>
      );

    case "bag":
      return (
        <div className="art">
          <svg
            className="float"
            width={160}
            height={160}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          <span
            className="display"
            style={{
              position: "absolute",
              left: 22,
              bottom: 14,
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: "-.05em",
              lineHeight: 0.9,
            }}
          >
            Fresh
            <br />
            Cart
          </span>
        </div>
      );

    case "terminal":
      return (
        <div className="art">
          <div className="term" aria-hidden="true">
            <span className="term-line">
              <span style={{ color: "var(--accent)" }}>$</span> POST /api/posts
            </span>
            <span className="term-line" style={{ animationDelay: ".9s" }}>
              → 401 missing token
            </span>
            <span className="term-line" style={{ animationDelay: "1.8s" }}>
              → 201 created · role: moderator
            </span>
            <span className="term-line" style={{ animationDelay: "2.7s" }}>
              → 429 slow down <span className="caret" />
            </span>
          </div>
        </div>
      );

    case "eye":
      return (
        <div className="art" style={{ color: "var(--accent)" }}>
          <div className="eye" aria-hidden="true">
            <b>
              <i />
            </b>
            <span className="scan" />
          </div>
        </div>
      );

    default:
      return (
        <div className="art">
          <Icon name="arrowUpRight" size={48} strokeWidth={1.5} />
        </div>
      );
  }
}

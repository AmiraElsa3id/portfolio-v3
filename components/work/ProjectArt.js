import { Icon } from "@/components/ui/Icon";

/*
  ProjectArt — one bespoke illustration per project (keyed by id).
  Each entry returns the full `.art` element so it can choose its own layout,
  exactly like the originals in index.html. Everything draws in `currentColor`
  (the card's visual colour) plus `--accent`/`--ground`, so it recolours with
  the active palette.

  The six featured projects now use real screenshots staged by ProjectVisual,
  so their arts below are a fallback rather than the default. The remaining
  entries are the "More builds" hover previews.
*/

export function ProjectArt({ project }) {
  const render = ARTS[project.id] || ARTS[project.art];
  if (render) return render(project);

  if (project.image) {
    return (
      <div className="art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div className="art">
      <Icon name="arrowUpRight" size={48} strokeWidth={1.5} />
    </div>
  );
}

const Svg = ({ children, viewBox = "0 0 200 200", width = "60%", ...rest }) => (
  <svg
    width={width}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const ARTS = {
  /* ---------- Featured six (from index.html) ---------------------- */
  restomind: () => (
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
      <span className="mono art-cap">DEMAND FORECAST →</span>
    </div>
  ),

  "ai-chat-clone": () => (
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
        style={{ alignSelf: "flex-end", background: "var(--accent)", color: "var(--on-accent)" }}
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
  ),

  "hotel-management": () => (
    <div className="art" style={{ flexDirection: "column", gap: 22 }}>
      <div className="rooms" aria-hidden="true">
        {[0, 3, 1, 5, 2, 7, 4, 9, 6, 1, 8, 3, 10, 2, 11, 5, 0, 7].map((d, i) => (
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
  ),

  freshcart: () => (
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
  ),

  "node-posts": () => (
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
  ),

  "d-pathy": () => (
    <div className="art" style={{ color: "var(--accent)" }}>
      <div className="eye" aria-hidden="true">
        <b>
          <i />
        </b>
        <span className="scan" />
      </div>
    </div>
  ),

  /* ---------- More builds ----------------------------------------- */
  cosmos: () => (
    <div className="art" style={{ color: "var(--accent)" }}>
      <Svg width="72%" viewBox="0 0 240 180">
        <circle cx="120" cy="90" r="30" fill="currentColor" stroke="none" opacity=".15" />
        <circle cx="120" cy="90" r="24" />
        <ellipse cx="120" cy="90" rx="88" ry="32" strokeDasharray="6 9" className="art-dash" />
        <circle cx="208" cy="90" r="5" fill="currentColor" stroke="none" />
      </Svg>
      <span className="mono art-cap">NASA · SPACEDEVS</span>
    </div>
  ),

  wanderlust: () => (
    <div className="art">
      <Svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="66" />
        <ellipse cx="100" cy="100" rx="66" ry="26" opacity=".55" />
        <ellipse cx="100" cy="100" rx="26" ry="66" opacity=".55" />
        <path d="M34 100h132" opacity=".55" />
        <path d="M122 44c-14 10-14 28 0 38s14 28 0 38" strokeDasharray="5 7" className="art-dash" />
      </Svg>
      <span className="mono art-cap">90+ COUNTRIES</span>
    </div>
  ),

  mudabbir: () => (
    <div className="art" style={{ flexDirection: "column", gap: 18 }}>
      <div className="art-bars" aria-hidden="true">
        <i style={{ height: "42%" }} />
        <i style={{ height: "72%" }} />
        <i style={{ height: "54%" }} />
        <i style={{ height: "90%" }} />
        <i style={{ height: "66%" }} />
        <i style={{ height: "100%" }} />
      </div>
      <span className="mono art-cap" lang="ar">
        مدبّر · RTL
      </span>
    </div>
  ),

  quizmaster: () => (
    <div className="art">
      <Svg width="64%" viewBox="0 0 200 170" strokeWidth={2.6}>
        <rect x="24" y="16" width="152" height="138" rx="14" />
        <path d="M44 120h58M44 136h92" opacity=".45" />
        <circle cx="100" cy="66" r="30" opacity=".25" />
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fontSize="46"
          fontWeight="800"
          fill="currentColor"
          stroke="none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ?
        </text>
      </Svg>
      <span className="mono art-cap">XP SCORING</span>
    </div>
  ),

  "ux-review": () => (
    <div className="art" style={{ flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
      <span
        className="display"
        style={{ fontSize: 72, fontWeight: 800, lineHeight: 0.85, letterSpacing: "-.06em" }}
      >
        UX
      </span>
      <div className="art-brutal" aria-hidden="true">
        <i style={{ width: "70%" }} />
        <i style={{ width: "46%" }} />
        <i style={{ width: "88%" }} />
      </div>
    </div>
  ),

  cafeteria: () => (
    <div className="art">
      <Svg width="58%" viewBox="0 0 180 200">
        <path d="M50 24h80v140l-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8z" />
        <path d="M66 54h48M66 74h48M66 94h30" opacity=".5" />
        <path d="M66 124h48" strokeDasharray="4 7" />
      </Svg>
      <span className="mono art-cap">PHP · MVC</span>
    </div>
  ),

  "whatsapp-clone": () => (
    <div className="art">
      <Svg width="52%" viewBox="0 0 180 200" strokeWidth={2.4}>
        <rect x="46" y="20" width="88" height="160" rx="18" />
        <path d="M82 28h16" opacity=".6" />
        <rect
          x="60"
          y="60"
          width="46"
          height="20"
          rx="10"
          fill="currentColor"
          stroke="none"
          opacity=".85"
        />
        <rect x="74" y="90" width="46" height="20" rx="10" opacity=".45" />
        <rect
          x="60"
          y="120"
          width="34"
          height="20"
          rx="10"
          fill="currentColor"
          stroke="none"
          opacity=".85"
          className="art-pulse"
        />
      </Svg>
      <span className="mono art-cap">SOCKET.IO</span>
    </div>
  ),

  "smart-notes": () => (
    <div className="art">
      <Svg width="66%" viewBox="0 0 200 180">
        <rect
          x="30"
          y="30"
          width="64"
          height="64"
          rx="9"
          fill="currentColor"
          stroke="none"
          opacity=".2"
        />
        <rect
          x="56"
          y="56"
          width="64"
          height="64"
          rx="9"
          fill="currentColor"
          stroke="none"
          opacity=".38"
        />
        <rect
          x="82"
          y="82"
          width="64"
          height="64"
          rx="9"
          fill="currentColor"
          stroke="none"
          opacity=".9"
        />
        <path d="M96 106h36M96 120h24" stroke="var(--ground)" strokeWidth={3.5} opacity=".85" />
      </Svg>
      <span className="mono art-cap">MARKDOWN · SEARCH</span>
    </div>
  ),

  clinic: () => (
    <div className="art">
      <Svg width="64%" viewBox="0 0 200 180">
        <rect x="28" y="42" width="144" height="118" rx="12" />
        <path d="M28 74h144" />
        <path d="M58 30v24M142 30v24" />
        <path d="M92 106h16M100 98v16" strokeWidth={4} />
        <circle cx="58" cy="96" r="3" fill="currentColor" stroke="none" opacity=".5" />
        <circle cx="142" cy="96" r="3" fill="currentColor" stroke="none" opacity=".5" />
        <circle cx="58" cy="128" r="3" fill="currentColor" stroke="none" opacity=".5" />
        <circle cx="142" cy="128" r="3" fill="currentColor" stroke="none" opacity=".5" />
      </Svg>
      <span className="mono art-cap">DJANGO · DRF</span>
    </div>
  ),

  bloghub: () => (
    <div className="art" style={{ flexDirection: "column", gap: 18 }}>
      <span className="mono" style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-.02em" }}>
        &lt;/&gt;
      </span>
      <div className="art-lines" aria-hidden="true" style={{ width: "78%" }}>
        <i style={{ width: "82%" }} />
        <i style={{ width: "58%" }} />
        <i style={{ width: "70%" }} />
      </div>
    </div>
  ),

  "linked-posts": () => (
    <div className="art" style={{ flexDirection: "column", gap: 14 }}>
      <Svg width="74%" viewBox="0 0 200 160">
        <rect x="30" y="16" width="140" height="48" rx="10" opacity=".5" />
        <rect x="30" y="74" width="140" height="48" rx="10" />
        <circle cx="52" cy="40" r="9" fill="currentColor" stroke="none" opacity=".5" />
        <path d="M72 34h68M72 48h42" opacity=".55" />
        <path d="M118 98c9-11 24-2 0 13-24-15-9-24 0-13z" fill="currentColor" stroke="none" />
      </Svg>
    </div>
  ),

  "arabic-portfolio": () => (
    <div
      className="art"
      style={{ flexDirection: "column", alignItems: "flex-end", gap: 14, padding: "0 44px" }}
    >
      <span className="display" lang="ar" style={{ fontSize: 46, fontWeight: 800, lineHeight: 1 }}>
        عربي
      </span>
      <div className="art-lines" dir="rtl" aria-hidden="true" style={{ width: "100%" }}>
        <i style={{ width: "86%", marginInlineStart: "auto" }} />
        <i style={{ width: "64%", marginInlineStart: "auto" }} />
        <i style={{ width: "74%", marginInlineStart: "auto" }} />
      </div>
    </div>
  ),

  "fresh-cart-spa": () => (
    <div className="art">
      <Svg width="62%" viewBox="0 0 200 180" strokeWidth={2.6}>
        <path d="M28 40h20l16 78h80l16-58H60" />
        <circle cx="82" cy="146" r="9" />
        <circle cx="134" cy="146" r="9" />
        <path d="M98 64h34M98 86h22" opacity=".5" />
      </Svg>
    </div>
  ),
};

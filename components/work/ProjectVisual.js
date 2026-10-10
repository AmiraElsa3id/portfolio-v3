import { ProjectArt } from "./ProjectArt";

/*
  ProjectVisual — the staged screenshot inside a featured card's
  `.pcard__visual`. Ported from the static site's §13b ("Screenshot card
  variants"): every project shows its real screenshot, but each is framed
  differently so the gallery doesn't read as a row of identical cards.

    shot    RestoMind  tilted browser window, straightens on hover
    bleed   AI Chat    window runs off the card edge + floating bubbles
    key     Hotel      dark window on brass + a room key card in front
    peek    FreshCart  store rises out of the bottom edge
    layers  Node API   docs window + a floating terminal (layered depth)
    device  D-Pathy    phone mockup with a scanning line

  The variant-specific copy (URL labels, captions, bubble text) lives here,
  keyed by variant, exactly as the static markup hard-coded it. Projects
  without a variant fall back to ProjectArt, and the CSS lives in
  app/styles/projects.css.
*/

export function ProjectVisual({ project }) {
  const render = VARIANTS[project.variant];
  if (!render) return <ProjectArt project={project} />;
  return render(project);
}

const Screenshot = (project, width, height) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={project.image}
    width={width}
    height={height}
    alt={project.imageAlt || ""}
    loading="lazy"
    decoding="async"
  />
);

const VARIANTS = {
  /* 01 · RestoMind — tilted browser window over the page, with a caption. */
  shot: (project) => (
    <div className="art" style={{ flexDirection: "column", gap: 18, paddingTop: 34 }}>
      <div className="shot">
        <span className="shot__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="shot__url">RestoMind</span>
        </span>
        {Screenshot(project, 1600, 732)}
      </div>
      <span className="mono" style={{ fontSize: 12, letterSpacing: ".08em" }}>
        AI DEMAND FORECAST · ARABIC / ENGLISH
      </span>
    </div>
  ),

  /* 02 · AI Chat Clone — the window bleeds past the card edge. */
  bleed: (project) => (
    <div className="art art--static">
      <div className="v-bleed">
        <span className="v-bar">
          <i />
          <i />
          <i />
        </span>
        {Screenshot(project, 1280, 634)}
      </div>
      <span className="v-bubble" aria-hidden="true">
        Summarise this PDF, then draw it as a poster
      </span>
      <span className="v-bubble v-bubble--reply" aria-hidden="true">
        <span className="typing">
          <i />
          <i />
          <i />
        </span>
      </span>
    </div>
  ),

  /* 03 · Hotel — dark window on the hotel's brass + a room key card.
     No `.art` wrapper: the pieces sit directly on the visual. */
  key: (project) => (
    <>
      <div className="v-hwin">
        <span className="v-bar">
          <i />
          <i />
          <i />
          <span className="v-url">haven-hotel.app</span>
        </span>
        <div className="v-hwin__img">{Screenshot(project, 1280, 616)}</div>
      </div>
      <div className="v-key" aria-hidden="true">
        <span className="v-key__brand">Haven</span>
        <span className="v-key__chip" />
        <span className="v-key__room">ROOM 304 · 3 NIGHTS</span>
        <span className="v-key__paid">✓ PAID VIA STRIPE</span>
      </div>
      <span className="v-caption">4 ROLES · STRIPE</span>
    </>
  ),

  /* 04 · FreshCart — the store rises out of the bottom edge, word behind. */
  peek: (project) => (
    <div className="art art--static">
      <span className="v-word" aria-hidden="true">
        Fresh
        <br />
        Cart
      </span>
      <div className="v-peek">
        <span className="v-bar v-bar--light">
          <i />
          <i />
          <i />
          <span className="v-url">freshcart-route.vercel.app</span>
        </span>
        {Screenshot(project, 1280, 800)}
      </div>
    </div>
  ),

  /* 05 · Node Posts API — API docs window + a live-looking terminal. */
  layers: (project) => (
    <div className="art art--static">
      <div className="v-docs">
        <span className="v-bar">
          <i />
          <i />
          <i />
          <span className="v-url">localhost:3000/docs</span>
        </span>
        {Screenshot(project, 1600, 802)}
      </div>
      <div className="v-term" aria-hidden="true">
        <span className="term-line">
          <span style={{ color: "var(--accent)" }}>$</span> POST /api/posts
        </span>
        <span className="term-line" style={{ animationDelay: ".9s" }}>
          → 401 missing token
        </span>
        <span className="term-line" style={{ animationDelay: "1.8s" }}>
          → 201 created
        </span>
        <span className="term-line" style={{ animationDelay: "2.7s" }}>
          → 429 slow down <span className="caret" />
        </span>
      </div>
    </div>
  ),

  /* 06 · D-Pathy — the real app in a phone that straightens on hover. */
  device: (project) => (
    <div className="art art--static" style={{ justifyContent: "flex-end", paddingRight: "16%" }}>
      <div className="v-phone">
        {Screenshot(project, 373, 780)}
        <span className="v-scan" aria-hidden="true" />
      </div>
      <span className="v-side">
        AI RETINA
        <br />
        SCREENING
        <br />· MOBILE APP
      </span>
    </div>
  ),
};

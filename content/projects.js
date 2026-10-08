/*
  projects.js — featured work + "more builds".
  Ported from index.html. To add a real screenshot, set `image` to a file in
  public/projects/ (e.g. "/projects/restomind.webp"); ProjectArt then renders
  the <img> instead of the CSS illustration. Counters update automatically.
*/

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} href        primary link (drives the whole card)
 * @property {string} description
 * @property {string[]} tags
 * @property {{label:string, href:string}[]} links
 * @property {string} [badge]
 * @property {"forecast"|"chat"|"rooms"|"bag"|"terminal"|"eye"} art
 * @property {"accent"|"ink"|"surface"|"accent2"|"terminal"} visual
 * @property {string} [image]
 */

/** @type {Project[]} */
export const FEATURED_PROJECTS = [
  {
    id: "restomind",
    title: "RestoMind",
    href: "https://github.com/AmiraElsa3id/prediction-model",
    description:
      "A restaurant platform that predicts how busy tomorrow will be. Next.js front end, NestJS and MongoDB back end, Python FastAPI model.",
    tags: ["Next.js", "NestJS", "MongoDB", "FastAPI"],
    links: [
      { label: "Model", href: "https://github.com/AmiraElsa3id/prediction-model" },
      { label: "Frontend", href: "https://github.com/AhmedMohO/restomind-app" },
      { label: "Backend", href: "https://github.com/KhaledAlmorse/RestoMindAPI" },
    ],
    badge: "ITI GRAD PROJECT",
    art: "forecast",
    visual: "accent",
  },
  {
    id: "ai-chat-clone",
    title: "AI Chat Clone",
    href: "https://github.com/AmiraElsa3id/Ai-Chat-Clone",
    description:
      "Five chat modes, replies that stream in word by word, voice input with Whisper, file uploads and image generation.",
    tags: ["React", "Express", "Hugging Face", "Supabase"],
    links: [
      {
        label: "Demo",
        href: "https://www.linkedin.com/posts/amera-mohammed_built-an-ai-chat-clone-part-of-my-vibe-ugcPost-7467582877506113537-QdiQ/",
      },
      { label: "Code", href: "https://github.com/AmiraElsa3id/Ai-Chat-Clone" },
    ],
    art: "chat",
    visual: "ink",
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    href: "https://github.com/AhmedMohO/hotel-system",
    description:
      "Bookings, room and floor allocation, and Stripe payments, with separate dashboards for admins, managers, receptionists and guests.",
    tags: ["Laravel", "Vue", "Inertia.js", "Stripe"],
    links: [
      {
        label: "Demo",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7449488338350133248/",
      },
      { label: "Code", href: "https://github.com/AhmedMohO/hotel-system" },
    ],
    art: "rooms",
    visual: "surface",
  },
  {
    id: "freshcart",
    title: "FreshCart",
    href: "https://freshcart-route.vercel.app/",
    description:
      "A full Next.js store: categories, brands, cart, wishlist, sign-in and checkout. Built live in front of a class.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    links: [{ label: "Live demo", href: "https://freshcart-route.vercel.app/" }],
    badge: "TAUGHT LIVE",
    art: "bag",
    visual: "accent2",
  },
  {
    id: "node-posts",
    title: "Node Posts API",
    href: "https://github.com/AmiraElsa3id/Node-Posts",
    description:
      "A REST API built like it's going to production: logins, three permission levels, donations through Kashier with signed webhooks, and rate limiting.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    links: [{ label: "Code", href: "https://github.com/AmiraElsa3id/Node-Posts" }],
    art: "terminal",
    visual: "terminal",
  },
  {
    id: "d-pathy",
    title: "D-Pathy",
    href: "https://youtu.be/3Zspp3XEy4o",
    description:
      "My BSc graduation project: an app that checks eye scans for diabetic retinopathy using AI.",
    tags: ["AI / ML", "Mobile app"],
    links: [{ label: "Demo video", href: "https://youtu.be/3Zspp3XEy4o" }],
    badge: "GRADED EXCELLENT",
    art: "eye",
    visual: "surface",
    // TODO: the CV's D-Pathy [Code] link points at AmiraElsa3id/ITI-Blog, which
    // looks like a copy-paste slip. Add the real repo here when known, e.g.
    // links: [{ label: "Code", href: "https://github.com/AmiraElsa3id/d-pathy" }, ...]
  },
];

/**
 * @typedef {Object} MoreBuild
 * @property {string} id
 * @property {string} num
 * @property {string} name
 * @property {string} summary  one-line description (hidden on small screens)
 * @property {string} stack    e.g. "React · REST"
 * @property {string} href
 * @property {string} cta      "Live demo ↗" | "Code on GitHub ↗"
 * @property {string} brief    paragraph shown in the hover preview
 * @property {{bg:string, color:string, name:string, lang?:string}} shot
 */

/** @type {MoreBuild[]} */
export const MORE_BUILDS = [
  {
    id: "cosmos",
    num: "07",
    name: "Cosmos",
    summary: "Space dashboard on NASA & SpaceDevs data",
    stack: "React · REST",
    href: "https://cosmos-space-dashboard-route.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "NASA's picture of the day and SpaceDevs launch data in one dashboard, plus a planet explorer and comparison table.",
    shot: { bg: "#0A0B14", color: "#EDEEE8", name: "Cosmos" },
  },
  {
    id: "wanderlust",
    num: "08",
    name: "Wanderlust",
    summary: "Trip planner covering 90+ countries",
    stack: "React · REST",
    href: "https://city-specs-route.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "Holidays, events, 7-day weather, a long-weekend finder and live currency for 90+ countries.",
    shot: { bg: "var(--ink)", color: "var(--ground)", name: "Wanderlust" },
  },
  {
    id: "mudabbir",
    num: "09",
    name: "Mudabbir",
    summary: "Arabic, right-to-left finance dashboard",
    stack: "React · Chart.js",
    href: "https://mudabbir.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "Balances, budgets, bills and weekly cash flow, built right-to-left for Arabic readers with Chart.js.",
    shot: { bg: "var(--ground-2)", color: "var(--accent)", name: "مدبّر", lang: "ar" },
  },
  {
    id: "quizmaster",
    num: "10",
    name: "QuizMaster",
    summary: "Trivia game with XP scoring",
    stack: "React · REST",
    href: "https://quiz-master-route.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "Pick a category, difficulty and rounds. Questions come from a live trivia API and earn XP.",
    shot: { bg: "var(--accent)", color: "var(--on-accent)", name: "Quiz" },
  },
  {
    id: "ux-review",
    num: "11",
    name: "The UX Review",
    summary: "Brutalist editorial blog",
    stack: "React · Vite",
    href: "https://the-ux-review-blog.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "An editorial blog with a loud brutalist identity, built from reusable content components.",
    shot: { bg: "#0B0B0B", color: "#EDEEE8", name: "UX" },
  },
  {
    id: "cafeteria",
    num: "12",
    name: "Cafeteria System",
    summary: "PHP on a hand-written MVC framework",
    stack: "PHP · MySQL",
    href: "https://github.com/AhmedMohO/cafeteria-project",
    cta: "Code on GitHub ↗",
    brief:
      "Ordering and admin system on a hand-written PHP MVC framework, with PDO and Composer autoloading.",
    shot: { bg: "var(--accent-2)", color: "var(--on-accent-2)", name: "PHP" },
  },
];

export const FEATURED_COUNT = FEATURED_PROJECTS.length;

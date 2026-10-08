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
    image: "/images/restomind.webp",
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
    image: "/images/ai-chat-clone.webp",
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
    image: "/images/Hotel.webp",
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
    image: "/images/freshcart-next.webp",
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
    image: "/images/node-posts-docs.webp",
  },
  {
    id: "d-pathy",
    title: "D-Pathy",
    href: "https://youtu.be/3Zspp3XEy4o",
    description:
      "My BSc graduation project: an app that checks eye scans for diabetic retinopathy using AI.",
    tags: ["AI / ML", "Mobile app"],
    links: [
      { label: "Code", href: "https://github.com/nadareda12001/D-pthy" },
      { label: "API", href: "https://github.com/AmiraElsa3id/flask-app" },
      { label: "Demo video", href: "https://youtu.be/3Zspp3XEy4o" },
    ],
    badge: "GRADED EXCELLENT",
    art: "eye",
    visual: "surface",
    image: "/images/d-pathy.webp",
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
 * @property {{label:string, href:string, variant?:"solid"|"ghost"}[]} [links]
 *            links shown in the detail modal; falls back to the single cta link
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
    image: "/images/cosmos-space.webp",
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
    image: "/images/city-specs.webp",
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
    image: "/images/mudabbir.webp",
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
    image: "/images/quiz-master.webp",
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
    image: "/images/ux-review.webp",
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
    image: "/images/Cafe.webp",
  },
  {
    id: "arabic-portfolio",
    num: "13",
    name: "Arabic Portfolio",
    summary: "RTL Arabic single-page portfolio",
    stack: "React · Tailwind",
    href: "https://portfolio-route.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "RTL Arabic single-page portfolio — hero, about, skills, a filterable project gallery, experience timeline, testimonials and a contact form, with live theme and font customisation.",
    shot: { bg: "var(--ground-2)", color: "var(--accent)", name: "عربي", lang: "ar" },
    image: "/images/portfolio-route.webp",
  },
  {
    id: "whatsapp-clone",
    num: "14",
    name: "WhatsApp Clone",
    summary: "Real-time chat over WebSockets",
    stack: "React · Socket.IO",
    href: "https://github.com/AmiraElsa3id/whatsapp-clone",
    cta: "Code on GitHub ↗",
    brief:
      "Real-time chat with private and group messaging over Socket.IO, instant username join (no sign-up), live online users and session-based history.",
    shot: { bg: "#0B141A", color: "#25D366", name: "Chat" },
    image: "/images/whatsapp-clone.webp",
  },
  {
    id: "smart-notes",
    num: "15",
    name: "Smart Notes",
    summary: "Full-stack notes app: markdown & search",
    stack: "React · Node · MongoDB",
    href: "https://github.com/AmiraElsa3id/smart-notes-workspace",
    cta: "Code on GitHub ↗",
    links: [
      {
        label: "Video demo",
        href: "https://drive.google.com/file/d/1oDVvvpkFYGTyySpinmodgiIdkLMcUvUS/view?usp=sharing",
        variant: "solid",
      },
      { label: "Code on GitHub", href: "https://github.com/AmiraElsa3id/smart-notes-workspace" },
    ],
    brief:
      "JWT auth and CRUD notes with categories, tags, pinning and archiving; markdown rendering, debounced full-text search, avatar uploads and a Swagger-documented API.",
    shot: { bg: "var(--accent-2)", color: "var(--on-accent-2)", name: "Notes" },
    image: "/images/smart-note.webp",
  },
  {
    id: "clinic",
    num: "16",
    name: "Clinic Appointments",
    summary: "Multi-role Django booking platform",
    stack: "Django · DRF · MySQL",
    href: "https://github.com/AmiraElsa3id/Clinic-Appointment-System",
    cta: "Code on GitHub ↗",
    brief:
      "Multi-role platform with RBAC for 4 roles, automated slot generation, an appointment state machine, queue management, an EMR and a Chart.js analytics dashboard.",
    shot: { bg: "var(--ink)", color: "var(--ground)", name: "Clinic" },
    image: "/images/clinic.webp",
  },
  {
    id: "bloghub",
    num: "17",
    name: "BlogHub",
    summary: "Laravel API behind a Vue SPA",
    stack: "Laravel · Vue · MySQL",
    href: "https://github.com/AmiraElsa3id/ITI-Blog",
    cta: "Code on GitHub ↗",
    brief:
      "RESTful API with JWT auth, CRUD and nested comments on a normalised schema, consumed by a Vue.js SPA using Eloquent relationships and API resource controllers.",
    shot: { bg: "#0B0B0B", color: "#EDEEE8", name: "Blog" },
    image: "/images/iti-blog.webp",
  },
  {
    id: "linked-posts",
    num: "18",
    name: "Linked Posts",
    summary: "Social feed on the Next.js App Router",
    stack: "Next.js · TypeScript",
    href: "https://linked-posts-alpha.vercel.app/",
    cta: "Live demo ↗",
    brief:
      "Social platform built with the Next.js App Router — timeline feed, posts, nested comments, likes, bookmarks, notifications, and profiles with follow/unfollow.",
    shot: { bg: "var(--accent)", color: "var(--on-accent)", name: "Feed" },
    image: "/images/linked-posts.webp",
  },
  {
    id: "fresh-cart-spa",
    num: "19",
    name: "Fresh Cart (SPA)",
    summary: "React e-commerce SPA with Stripe",
    stack: "React · Tailwind · Stripe",
    href: "https://fresh-cart-ecommerce-site.vercel.app",
    cta: "Live demo ↗",
    brief:
      "Production-ready e-commerce SPA with product browsing, category filtering, cart and wishlist, and Stripe checkout, optimised for Core Web Vitals.",
    shot: { bg: "var(--accent-2)", color: "var(--on-accent-2)", name: "Cart" },
    image: "/images/fresh-cart.webp",
  },
];

export const FEATURED_COUNT = FEATURED_PROJECTS.length;

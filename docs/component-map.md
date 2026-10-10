# Next.js component map

How the static site maps onto the React app. The CSS is **kept global** (no
Tailwind, no CSS Modules yet) so the visuals are byte-for-byte identical. This
table is the plan for splitting it into CSS Modules later, if you want to.

## Stylesheets

| Static file | In the app | Notes |
|---|---|---|
| `assets/css/fonts.css` | `app/fonts.js` | replaced by `next/font/local` (same 10 woff2, CSS vars `--font-syne/manrope/jetbrains`) |
| `assets/css/tokens.css` | `app/globals.css` | verbatim, except the 3 font-family tokens now read the next/font vars |
| `assets/css/base.css` | `app/globals.css` | verbatim |
| `assets/css/components.css` | `app/styles/components.css` | verbatim |
| `assets/css/sections.css` | `app/styles/sections.css` | verbatim |
| `assets/css/responsive.css` | `app/styles/responsive.css` | verbatim |
| — | `app/styles/nextjs-additions.css` | the **only** deltas: `<dialog>` styling + flexible gallery height + `.ver` version switcher |
| — | `app/styles/projects.css` | app-only: per-project card art (incl. the §13b screenshot variants) + the project detail modal |

All five global stylesheets are imported in order in `app/layout.js`.

## components.css → components

| CSS block | React component |
|---|---|
| 1. `.btn` | `components/ui/Button` usage inside sections (inline `<a className="btn …">`) |
| 2. `.navbtn`, `.burger` | `components/nav/Nav.js`, `components/nav/MobileMenu.js`, `components/nav/VersionMenu.js` |
| 3. `.roll` | `components/nav/Nav.js`, `components/Contact.js` (back-to-top) |
| 4. `.pulse` | *(not currently used on the page)* |
| 5. `.chip` / `.tag` / `.badge` | `components/hero/Hero.js`, `components/work/ProjectCard.js` |
| 6. `.sublink` | `components/work/ProjectCard.js` |
| 7. `.iconbtn` | `components/nav/MobileMenu.js`, `components/summary/SummaryModal.js` |
| 8. `.progress` | `app/page.js` |
| 9. `.cursor` | `app/page.js` + `components/interactions/PointerVars.js` |
| 10. `.mag` | `components/ui/Magnetic.js` |
| 11. `.band` / `.marquee` | `components/StackBand.js` |
| 12. `.stat` | `components/Stats.js` |
| 13. `.pcard` + card art | `components/work/Gallery.js`, `ProjectCard.js` (visual roles), `ProjectVisual.js` (staged screenshot per `variant`), `ProjectArt.js` (fallback illustration), `ProjectModal.js`, `ProjectProvider.js` |
| 14. `.mrow` + `.mprev` | `components/MoreBuilds.js`, `components/MoreRow.js` (hover preview: mini browser frame + real screenshot, per §14 in the new static) |
| 15. `.scard` + art | `components/Principles.js` |
| 16. `.box` / `.medal` / `.lbar` / `.rank` | `components/Education.js` |
| 17. `.skcell` | `components/Skills.js` |
| 18. `.copy` | `components/contact/CopyEmail.js` |
| 19. `.social` | `components/Contact.js` |
| 20. `.swatch` | `components/theme/ThemeSwatches.js` |
| 21. `.fab` / `.chat` / `.msg` / `.qchip` | `components/chat/ChatWidget.js` *(Phase 4)* |
| 22. `.scrim` / `.modal` / `.tgrid` | `components/summary/SummaryModal.js` (native `<dialog class="modal">`) |
| 23. `.menu` | `components/nav/MobileMenu.js` (native `<dialog class="menu">`) |
| — `.ver` *(new in the rebuild)* | `components/nav/VersionMenu.js` — see §4 of `nextjs-additions.css` |

## sections.css → components

| CSS section | React component |
|---|---|
| 1. Nav | `components/nav/Nav.js` (+ `nav/VersionMenu.js`) |
| 2. Hero | `components/hero/Hero.js` (+ `hero/AsciiField.js`) |
| 3. Stack band | `components/StackBand.js` |
| 4. Stats | `components/Stats.js` |
| 5. About | `components/About.js` |
| 6. Featured work | `components/work/Gallery.js` |
| 7. More builds | `components/MoreBuilds.js` |
| 8. How I work | `components/Principles.js` |
| 9. Experience | `components/Experience.js` |
| 10. Education | `components/Education.js` |
| 11. Skills | `components/Skills.js` |
| 12. Contact + footer | `components/Contact.js` |

## JS → React

| Static file | React |
|---|---|
| `themes.js` | `components/theme/ThemeProvider.js` + `theme-store.js` + `theme/ThemeSwatches.js` |
| `hero-ascii.js` | `components/hero/AsciiField.js` *(Phase 3)* |
| `chat.js` | `components/chat/ChatWidget.js` + `content/chat-kb.js` *(Phase 4)* |
| `main.js` §1 pointer | `components/interactions/PointerVars.js` |
| `main.js` §2 magnetic | `components/ui/Magnetic.js` |
| `main.js` §3 menu | `components/nav/MobileMenu.js` (native `<dialog>`) |
| `main.js` §4 modal | `components/summary/SummaryModal.js` (native `<dialog>`) |
| `main.js` §5 copy email | `components/contact/CopyEmail.js` |
| `main.js` §6 clock | `components/interactions/LocalClock.js` |
| `main.js` §7 console hello | `components/interactions/ConsoleHello.js` |

## Content

| Data | File |
|---|---|
| name, links, location, hero copy | `content/profile.js` |
| portfolio versions (v3 current, v2, v1 archived) | `content/versions.js` |
| featured + more builds | `content/projects.js` (featured cards carry `variant` + `image`/`imageAlt`) |
| themes | `content/themes.js` |
| stats + stack band | `content/stats.js` |
| experience | `content/experience.js` |
| education, honours, languages | `content/education.js` |
| skills | `content/skills.js` |
| about words, principles, nav links | `content/principles.js` |
| chat KB + rules | `content/chat-kb.js` *(Phase 4)* |

## Later: splitting into CSS Modules

Once the visuals are locked, each row above becomes `Component.module.css`
holding only its selectors, and the global imports in `layout.js` shrink. Watch
out for selectors that cross components (`.container`, `.label`, `.h2`, the
shared `@keyframes`, and `body.is-locked`) — those stay global in `globals.css`.

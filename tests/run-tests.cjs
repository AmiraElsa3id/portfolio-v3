/* =====================================================================
   tests/run-tests.cjs — AUTOMATED CHECKS (Playwright + Chromium)
   ---------------------------------------------------------------------
   Ported from the static site's test suite to run against the Next.js app.

   Run:
     npm i -D playwright
     npx playwright install chromium   # once (or set CHROMIUM_PATH)
     npm run build
     node tests/run-tests.cjs          # starts `next start` itself

   Or point it at an already-running server:
     BASE_URL=http://127.0.0.1:3000 node tests/run-tests.cjs

   What it checks, at 5 widths (320, 390, 768, 1280, 1440):
     • no JavaScript errors in the console
     • no horizontal scrolling / elements spilling past the viewport
     • fonts loaded, WebGL hero compiled
     • tap targets (WCAG 2.2 minimum 24x24 px)
     • nav: links on desktop, burger + working <dialog> menu on mobile
     • summary modal (<dialog>) opens / Esc closes / ✕ closes
     • chat opens, chips answer, free text answers, Esc closes
     • copy-email feedback
     • palette switch + persistence after reload
     • reduced-motion mode (gallery un-pins, no errors)
     • colour contrast of every theme's token pairs (WCAG AA)
   Writes: tests/out/results.json, tests/out/REPORT.md, tests/out/screenshots/
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { startServer, ROOT } = require("./_server.cjs");

const OUT = path.join(__dirname, "out");
const OUT_SHOTS = path.join(OUT, "screenshots");
fs.mkdirSync(OUT_SHOTS, { recursive: true });

/* ---------- contrast maths (WCAG 2.x) ------------------------------- */
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    })
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
function tokensFromCss() {
  const css = fs.readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");
  const themes = {};
  const re = /html\[data-theme="([a-z-]+)"\]\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const t = {};
    m[2].replace(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})/g, (_, k, v) => {
      t[k] = v;
    });
    themes[m[1]] = t;
  }
  return themes;
}

const VIEWPORTS = [
  { name: "phone-320", width: 320, height: 640, mobile: true },
  { name: "phone-390", width: 390, height: 844, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "laptop-1280", width: 1280, height: 800, mobile: false },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
];
const noSmooth = (page) => page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const SECTIONS = [
  ".nav",
  ".hero",
  ".stackband",
  ".stats",
  "#about",
  "#work",
  ".more",
  ".principles",
  "#experience",
  "#education",
  "#skills",
  "#contact",
];

(async () => {
  const server = await startServer();
  const base = server.base;

  const launch = {};
  if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch({
    ...launch,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });

  const results = {
    date: new Date().toISOString(),
    viewports: [],
    contrast: [],
    summary: { pass: 0, fail: 0, warn: 0 },
  };
  const rec = (vp, name, ok, detail, level) => {
    const lv = ok ? "pass" : level || "fail";
    vp.checks.push({ name, status: lv, detail: detail || "" });
    results.summary[lv]++;
  };

  try {
    for (const v of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: v.width, height: v.height },
        isMobile: v.mobile,
        hasTouch: v.mobile,
        deviceScaleFactor: 1,
      });
      await ctx.grantPermissions(["clipboard-read", "clipboard-write"], {
        origin: base.slice(0, -1),
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      const vp = { name: v.name, width: v.width, checks: [] };
      results.viewports.push(vp);

      await page.goto(base, { waitUntil: "networkidle" });
      await noSmooth(page);
      await page.waitForTimeout(800);

      // fonts + webgl
      const fonts = await page.evaluate(async () => {
        await document.fonts.ready;
        const family = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return "";
          return getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim();
        };
        const families = {
          display: family(".nav__logo"),
          body: family("body"),
          mono: family(".label"),
        };
        // Trigger loading (JetBrains Mono isn't preloaded), then verify.
        await Promise.all([
          document.fonts.load(`800 20px "${families.display}"`),
          document.fonts.load(`400 16px "${families.body}"`),
          document.fonts.load(`500 12px "${families.mono}"`),
        ]);
        const checks = [
          document.fonts.check(`800 20px "${families.display}"`),
          document.fonts.check(`400 16px "${families.body}"`),
          document.fonts.check(`500 12px "${families.mono}"`),
        ];
        return { checks, families };
      });
      rec(
        vp,
        "Fonts loaded (Syne, Manrope, JetBrains Mono)",
        fonts.checks.every(Boolean),
        JSON.stringify(fonts.families),
      );
      const gl = await page.getAttribute('[data-js="ascii"]', "data-ready");
      rec(
        vp,
        "WebGL hero compiled",
        gl === "true",
        gl === "true" ? "" : "canvas fell back to dotted grid",
        "warn",
      );

      // sections present
      for (const s of SECTIONS) {
        const ok = await page.locator(s).first().count();
        rec(vp, `Section present: ${s}`, ok > 0);
      }

      // horizontal overflow
      const overflow = await page.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const doc = document.documentElement.scrollWidth;
        const skip = (el) =>
          el.closest(
            ".band, .track, .hero__canvas, .mprev, .cursor, .menu, .chat, .modal, dialog, .sr-only, [hidden]",
          );
        const off = [];
        document.querySelectorAll("body *").forEach((el) => {
          if (skip(el)) return;
          const r = el.getBoundingClientRect();
          if (r.width && (r.right > W + 1 || r.left < -1))
            off.push(
              (el.className && el.className.baseVal === undefined ? el.className : el.tagName) +
                " →" +
                Math.round(r.right),
            );
        });
        return { W, doc, off: off.slice(0, 12), count: off.length };
      });
      rec(
        vp,
        "No horizontal page scroll",
        overflow.doc <= overflow.W + 1,
        `scrollWidth ${overflow.doc} vs ${overflow.W}`,
      );
      rec(
        vp,
        "No element spills past the viewport",
        overflow.count === 0,
        overflow.off.join(" | "),
        "warn",
      );

      // headings must fit inside their own box (Syne is very wide)
      const clipped = await page.evaluate(() => {
        const out = [];
        document
          .querySelectorAll("h1, h2, h3, .hero__name .line, .scard__title, .contact__title .line")
          .forEach((el) => {
            if (el.closest("[hidden], dialog:not([open])")) return;
            if (el.scrollWidth > el.clientWidth + 1)
              out.push(`${el.textContent.trim().slice(0, 18)} ${el.scrollWidth}>${el.clientWidth}`);
          });
        return out;
      });
      rec(
        vp,
        "Headings fit their box (no clipped text)",
        clipped.length === 0,
        clipped.join(" | "),
      );

      // tap targets
      const targets = await page.evaluate(() => {
        const small24 = [];
        const small44 = [];
        document.querySelectorAll("a[href], button").forEach((el) => {
          if (el.closest("[hidden], .sr-only, dialog:not([open])")) return;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const label = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 28);
          if (r.width < 24 || r.height < 24)
            small24.push(`${label} ${Math.round(r.width)}×${Math.round(r.height)}`);
          else if (r.height < 44 && r.width < 44) small44.push(label);
        });
        return { small24, small44 };
      });
      rec(
        vp,
        "Tap targets ≥ 24×24 (WCAG 2.2 AA)",
        targets.small24.length === 0,
        targets.small24.join(" | "),
      );

      // nav behaviour
      const linksVisible = await page.locator(".nav__links").isVisible();
      const burgerVisible = await page.locator(".burger").isVisible();
      if (v.width > 900) {
        rec(vp, "Desktop nav links visible, burger hidden", linksVisible && !burgerVisible);
      } else {
        rec(vp, "Mobile: links hidden, burger visible", !linksVisible && burgerVisible);
        await page.click(".burger");
        await page.waitForTimeout(500);
        const menuOpen = await page.locator("#menu").isVisible();
        rec(vp, "Mobile menu opens", menuOpen);
        const locked = await page.evaluate(() => document.body.classList.contains("is-locked"));
        rec(vp, "Page scroll locked while menu open", locked);
        const menuClip = await page.evaluate(() =>
          [...document.querySelectorAll(".menu__links a")]
            .filter((a) => a.scrollWidth > a.clientWidth + 1)
            .map((a) => a.textContent.trim()),
        );
        rec(vp, "Menu links fit the screen", menuClip.length === 0, menuClip.join(", "));
        await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-menu.png`) });
        await page.click('#menu [href="#experience"]');
        await page.waitForTimeout(1200);
        const after = await page.evaluate(() => ({
          open: document.getElementById("menu").open,
          top: Math.round(document.getElementById("experience").getBoundingClientRect().top),
        }));
        rec(
          vp,
          "Menu link closes menu and jumps to section",
          !after.open && Math.abs(after.top) < 160,
          `section top ${after.top}px`,
        );
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);
      }

      // nav background after scroll
      const navBg = await page.evaluate(async () => {
        const bar = document.querySelector(".nav__bar");
        const top = getComputedStyle(bar).backgroundColor;
        window.scrollTo(0, 600);
        await new Promise((r) => setTimeout(r, 300));
        const scrolled = getComputedStyle(bar).backgroundColor;
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 300));
        return { top, scrolled };
      });
      rec(
        vp,
        "Nav gets a solid background after scrolling",
        navBg.scrolled !== "rgba(0, 0, 0, 0)" && navBg.scrolled !== "transparent",
        `top=${navBg.top} scrolled=${navBg.scrolled}`,
      );

      await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-hero.png`) });

      // summary modal (native <dialog class="modal">)
      if (v.width > 600) {
        await page.click('.nav [data-js="open-summary"]');
        await page.waitForTimeout(400);
        rec(vp, "Summary modal opens", await page.locator('[data-js="summary"]').isVisible());
        await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-summary.png`) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
        rec(
          vp,
          "Summary modal closes on Esc",
          !(await page.locator('[data-js="summary"]').isVisible()),
        );
      } else {
        await page.click(".burger");
        await page.waitForTimeout(400);
        await page.click('#menu [data-js="open-summary"]');
        await page.waitForTimeout(400);
        rec(
          vp,
          "Summary modal opens from the mobile menu",
          await page.locator('[data-js="summary"]').isVisible(),
        );
        await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-summary.png`) });
        await page.click('[data-js="close-summary"]');
        await page.waitForTimeout(300);
        rec(
          vp,
          "Summary modal closes with ✕",
          !(await page.locator('[data-js="summary"]').isVisible()),
        );
      }

      // chat
      await page.click(".fab");
      await page.waitForTimeout(400);
      rec(vp, "Chat opens", await page.locator("#chat").isVisible());
      await page.locator(".qchip").first().click();
      await page.waitForTimeout(3200);
      const last1 = await page.locator(".msg--bot").last().textContent();
      rec(vp, "Chip question gets the right answer", /Laravel/.test(last1), last1.slice(0, 60));
      await page.fill("#chat-input", "are you open to relocation?");
      await page.press("#chat-input", "Enter");
      await page.waitForTimeout(3000);
      const last2 = await page.locator(".msg--bot").last().textContent();
      rec(vp, "Typed question gets the right answer", /Mansoura/.test(last2), last2.slice(0, 60));
      await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-chat.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      rec(vp, "Chat closes on Esc", !(await page.locator("#chat").isVisible()));

      // copy email
      await page.locator('[data-js="copy-email"]').scrollIntoViewIfNeeded();
      await page.click('[data-js="copy-email"]');
      await page.waitForTimeout(300);
      rec(
        vp,
        "Copy email shows feedback",
        (await page.textContent('[data-js="copy-email"]')).includes("Copied"),
      );

      // theme switch + persistence
      await page.click('[data-theme-id="bone"]');
      await page.waitForTimeout(300);
      const themeNow = await page.evaluate(() => [
        document.documentElement.dataset.theme,
        getComputedStyle(document.body).backgroundColor,
      ]);
      rec(
        vp,
        "Palette switch applies",
        themeNow[0] === "bone" && themeNow[1] === "rgb(239, 237, 230)",
        themeNow.join(" "),
      );
      await page.reload({ waitUntil: "networkidle" });
      await noSmooth(page);
      const persisted = await page.evaluate(() => document.documentElement.dataset.theme);
      rec(vp, "Palette persists after reload", persisted === "bone", persisted);
      await page.screenshot({ path: path.join(OUT_SHOTS, `${v.name}-hero-bone.png`) });
      await page.evaluate(() => localStorage.removeItem("amera-theme"));
      await page.reload({ waitUntil: "networkidle" });
      await noSmooth(page);
      await page.waitForTimeout(600);

      const relevantErrors = errors.filter((e) => !/Download the React DevTools/.test(e));
      rec(
        vp,
        "No console / page errors",
        relevantErrors.length === 0,
        relevantErrors.slice(0, 5).join(" | "),
      );
      await ctx.close();
    }

    // reduced motion
    {
      const ctx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        reducedMotion: "reduce",
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.goto(base, { waitUntil: "networkidle" });
      const h = await page.evaluate(() =>
        Math.round(document.querySelector(".gallery").getBoundingClientRect().height),
      );
      const vp = { name: "reduced-motion-1280", width: 1280, checks: [] };
      results.viewports.push(vp);
      rec(vp, "Gallery un-pins (height auto)", h < 2000, `gallery height ${h}px`);
      rec(vp, "No errors with reduced motion", errors.length === 0, errors.join(" | "));
      await ctx.close();
    }

    // contrast
    const themes = tokensFromCss();
    const pairs = [
      ["ink", "ground", 4.5],
      ["muted", "ground", 4.5],
      ["ink", "ground-2", 4.5],
      ["muted", "ground-2", 4.5],
      ["on-accent", "accent", 4.5],
      ["on-accent-2", "accent-2", 4.5],
      ["accent", "ground", 3],
    ];
    for (const [id, t] of Object.entries(themes)) {
      for (const [fg, bg, min] of pairs) {
        if (!t[fg] || !t[bg]) continue;
        const r = ratio(t[fg], t[bg]);
        results.contrast.push({
          theme: id,
          pair: `${fg} on ${bg}`,
          fg: t[fg],
          bg: t[bg],
          ratio: +r.toFixed(2),
          min,
          pass: r >= min,
        });
        results.summary[r >= min ? "pass" : "fail"]++;
      }
    }
  } finally {
    await browser.close();
    server.stop();
  }

  /* ---------- write report ------------------------------------------- */
  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
  const icon = { pass: "✅", fail: "❌", warn: "⚠️" };
  let md = `# Test report\n\nGenerated ${results.date} by \`node tests/run-tests.cjs\` (Playwright + Chromium, Next.js app).\n\n`;
  md += `**${results.summary.pass} passed · ${results.summary.fail} failed · ${results.summary.warn} warnings**\n\n`;
  for (const vp of results.viewports) {
    md += `## ${vp.name} (${vp.width}px)\n\n| Check | Result | Detail |\n|---|---|---|\n`;
    for (const c of vp.checks)
      md += `| ${c.name} | ${icon[c.status]} | ${String(c.detail).replace(/\|/g, "/").slice(0, 160)} |\n`;
    md += "\n";
  }
  md += `## Colour contrast (WCAG 2.x)\n\nText needs 4.5:1; the accent used as large text/graphics needs 3:1.\n\n| Theme | Pair | Colours | Ratio | Min | Result |\n|---|---|---|---|---|---|\n`;
  for (const c of results.contrast)
    md += `| ${c.theme} | ${c.pair} | \`${c.fg}\` / \`${c.bg}\` | ${c.ratio}:1 | ${c.min}:1 | ${c.pass ? "✅" : "❌"} |\n`;
  fs.writeFileSync(path.join(OUT, "REPORT.md"), md);
  console.log(
    `Done: ${results.summary.pass} pass, ${results.summary.fail} fail, ${results.summary.warn} warn`,
  );
  process.exit(results.summary.fail ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});

/* =====================================================================
   tests/screenshots.cjs — SECTION-BY-SECTION SCREENSHOTS (Next.js app)
   ---------------------------------------------------------------------
   Full-page captures distort sticky/pinned layouts, so this script scrolls
   to each section and captures the viewport instead.
   Run: npm run build && node tests/screenshots.cjs
        (or BASE_URL=http://127.0.0.1:3000 node tests/screenshots.cjs)
   Writes: tests/out/screenshots/sections/*.png
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { startServer } = require("./_server.cjs");

const OUT = path.join(__dirname, "out", "screenshots", "sections");
fs.mkdirSync(OUT, { recursive: true });

const SHOTS = [
  ["01-hero", ".hero", 0],
  ["02-band-stats", ".stackband", -40],
  ["03-about", "#about", 0],
  ["04-work-start", "#work", 0],
  ["05-work-mid", "#work", 1400],
  ["06-more-builds", ".more", 0],
  ["07-principles", ".principles", 0],
  ["08-principles-stacked", ".principles", 900],
  ["09-experience", "#experience", 0],
  ["10-education", "#education", 0],
  ["11-skills", "#skills", 0],
  ["12-contact", "#contact", 0],
  ["13-footer", ".footer", -500],
];
const VIEWPORTS = [
  { name: "phone", width: 390, height: 844, mobile: true },
  { name: "tablet", width: 768, height: 1024, mobile: true },
  { name: "desktop", width: 1440, height: 900, mobile: false },
];

(async () => {
  const server = await startServer();
  const browser = await chromium.launch({
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });

  try {
    for (const v of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: v.width, height: v.height },
        isMobile: v.mobile,
        hasTouch: v.mobile,
      });
      await page.goto(server.base, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
      await page.waitForTimeout(700);

      for (const [name, sel, extra] of SHOTS) {
        await page.evaluate(
          ([s, e]) => {
            const el = document.querySelector(s);
            const y = el.getBoundingClientRect().top + window.scrollY + e;
            window.scrollTo(0, Math.max(0, y));
          },
          [sel, extra],
        );
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(OUT, `${v.name}-${name}.png`) });
      }

      if (!v.mobile) {
        await page.evaluate(() => window.scrollTo(0, document.querySelector(".more").offsetTop));
        await page.waitForTimeout(300);
        const row = page.locator(".mrow").nth(1);
        const box = await row.boundingBox();
        await page.mouse.move(box.x + box.width * 0.35, box.y + box.height / 2, { steps: 4 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `${v.name}-14-more-builds-hover.png`) });

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);
        await page.hover('.nav [data-js="open-summary"]');
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(OUT, `${v.name}-15-nav-hover.png`),
          clip: { x: 0, y: 0, width: v.width, height: 90 },
        });
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.stop();
  }
  console.log("screenshots written to", OUT);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});

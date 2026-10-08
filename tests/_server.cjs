/* tests/_server.cjs — shared helper for the test scripts.
   Either uses an already-running server (set BASE_URL) or starts `next start`
   on PORT (default 3123) against the production build in .next. */
const path = require("path");
const http = require("http");
const fs = require("fs");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

function waitFor(url, timeoutMs = 60000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - started > timeoutMs) reject(new Error(`Server not reachable at ${url}`));
        else setTimeout(attempt, 400);
      });
    };
    attempt();
  });
}

async function startServer() {
  if (process.env.BASE_URL) {
    await waitFor(process.env.BASE_URL);
    return { base: process.env.BASE_URL, stop() {} };
  }

  if (!fs.existsSync(path.join(ROOT, ".next"))) {
    throw new Error("No production build found. Run `npm run build` first (or set BASE_URL).");
  }

  const port = Number(process.env.PORT || 3123);
  const base = `http://127.0.0.1:${port}/`;
  const nextBin = require.resolve("next/dist/bin/next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: ROOT,
    stdio: "ignore",
  });

  await waitFor(base);

  return {
    base,
    stop() {
      try {
        child.kill();
      } catch {
        /* ignore */
      }
    },
  };
}

module.exports = { startServer, waitFor, ROOT };

// Shared helpers: a tiny static file server + Playwright browser plumbing.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
};

/** Start a static server rooted at the repo on an OS-assigned port. */
export async function serveSite() {
  const server = createServer(async (req, res) => {
    try {
      const rel = decodeURIComponent(req.url.split("?")[0]);
      const buf = await readFile(join(ROOT, rel));
      res.writeHead(200, {
        "content-type": MIME[extname(rel)] || "application/octet-stream",
      });
      res.end(buf);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  await new Promise((r) => server.listen(0, r));
  const { port } = server.address();
  return {
    origin: `http://127.0.0.1:${port}`,
    close: () => new Promise((r) => server.close(r)),
  };
}

/**
 * Open a page at the given app path, wait for fonts + network idle, run `fn`,
 * then tear everything down. `viewport` = {width, height, deviceScaleFactor}.
 */
export async function withPage(appPath, viewport, fn) {
  const site = await serveSite();
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height ?? 900 },
      deviceScaleFactor: viewport.deviceScaleFactor ?? 2,
    });
    const page = await context.newPage();
    const url = appPath.startsWith("http")
      ? appPath
      : `${site.origin}/${appPath.replace(/^\//, "")}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    return await fn(page);
  } finally {
    await browser.close();
    await site.close();
  }
}

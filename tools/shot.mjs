#!/usr/bin/env node
// ============================================================
// shot.mjs — deterministic screenshots via Playwright + Chromium.
//
// Waits for web fonts + network idle automatically — no FOUT, no fl\icker.
//
// Usage:
//   node tools/shot.mjs <path|url> <out.png> [width] [height|full] [scale]
//   node tools/shot.mjs <path|url> <out.png> --clip <selector> [width] [scale]
//
// Examples:
//   node tools/shot.mjs index.html /tmp/d.png 1440 full        # full page
//   node tools/shot.mjs index.html /tmp/m.png 375 1650         # fixed height
//   node tools/shot.mjs index.html /tmp/hero.png --clip .hero 1440
// ============================================================
import { withPage } from "./lib.mjs";

const argv = process.argv.slice(2);
const appPath = argv[0];
const out = argv[1];
if (!appPath || !out) {
  console.error(
    "usage: node tools/shot.mjs <path|url> <out.png> [w] [h|full] [scale]\n" +
      "       node tools/shot.mjs <path|url> <out.png> --clip <selector> [w] [scale]",
  );
  process.exit(1);
}

let width = 1440,
  height = 900,
  scale = 2,
  fullPage = false,
  clipSel = null;

if (argv[2] === "--clip") {
  clipSel = argv[3];
  width = Number(argv[4]) || 1440;
  scale = Number(argv[5]) || 2;
  fullPage = false;
} else {
  width = Number(argv[2]) || 1440;
  if (argv[3] === "full" || argv[3] === undefined) {
    fullPage = true;
    height = 900;
  } else {
    height = Number(argv[3]);
  }
  scale = Number(argv[4]) || 2;
}

const t0 = Date.now();
await withPage(appPath, { width, height, deviceScaleFactor: scale }, async (page) => {
  if (clipSel) {
    await page.locator(clipSel).first().screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage });
  }
});
console.log(
  `✓ ${out}  (w=${width}${clipSel ? ` clip=${clipSel}` : fullPage ? " full" : `x${height}`} @${scale}x)  ${Date.now() - t0}ms`,
);
process.exit(0);

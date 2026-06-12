#!/usr/bin/env node
// ============================================================
// inspect.mjs — numerical pixel-perfect verification.
//
// Loads a spec module, opens the page at each viewport, and compares
// getComputedStyle + getBoundingClientRect against the Figma values.
// Prints a pass/fail table; exits non-zero if anything is off.
//
// Usage:
//   node tools/inspect.mjs [spec.mjs]        (default: tools/specs/page.spec.mjs)
//   node tools/inspect.mjs --only "Hero"     filter checks by name substring
// ============================================================
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { serveSite, ROOT } from "./lib.mjs";

const args = process.argv.slice(2);
let specPath = "tools/specs/lp1.spec.mjs";
let only = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--only") only = args[++i];
  else specPath = args[i];
}

const spec = (await import(pathToFileURL(resolve(ROOT, specPath)).href)).default;

// match: expected may be a string (exact), RegExp (test), or {approx, tol}
function matches(actual, expected) {
  if (expected instanceof RegExp) return expected.test(actual);
  if (expected && typeof expected === "object" && "approx" in expected) {
    return Math.abs(parseFloat(actual) - expected.approx) <= (expected.tol ?? 1);
  }
  return String(actual) === String(expected);
}
function fmt(v) {
  if (v instanceof RegExp) return v.toString();
  if (v && typeof v === "object" && "approx" in v)
    return `≈${v.approx}±${v.tol ?? 1}`;
  return String(v);
}

const site = await serveSite();
const browser = await chromium.launch();

let total = 0,
  passed = 0;
const rows = [];

try {
  for (const [vpName, vp] of Object.entries(spec.viewports)) {
    const checks = spec.checks.filter(
      (c) => c.viewport === vpName && (!only || c.name.includes(only)),
    );
    if (!checks.length) continue;

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height ?? 2000 },
      deviceScaleFactor: vp.deviceScaleFactor ?? 1,
    });
    const page = await context.newPage();
    const url = `${site.origin}/${(spec.appPath || "index.html").replace(/^\//, "")}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    for (const check of checks) {
      const el = page.locator(check.selector).first();
      const count = await page.locator(check.selector).count();
      if (count === 0) {
        rows.push({ vp: vpName, name: check.name, prop: "(selector)", ok: false, exp: check.selector, act: "NOT FOUND" });
        total++;
        continue;
      }
      const data = await el.evaluate((node, wantStyle) => {
        const cs = getComputedStyle(node);
        const r = node.getBoundingClientRect();
        const style = {};
        for (const k of wantStyle) style[k] = cs[k];
        return { style, rect: { width: r.width, height: r.height, x: r.x, y: r.y } };
      }, Object.keys(check.style || {}));

      for (const [prop, exp] of Object.entries(check.style || {})) {
        const act = data.style[prop];
        const ok = matches(act, exp);
        rows.push({ vp: vpName, name: check.name, prop, ok, exp: fmt(exp), act });
        total++;
        if (ok) passed++;
      }
      for (const [prop, exp] of Object.entries(check.rect || {})) {
        const act = data.rect[prop];
        const ok = matches(act, exp);
        rows.push({ vp: vpName, name: check.name, prop: `rect.${prop}`, ok, exp: fmt(exp), act: Math.round(act * 100) / 100 });
        total++;
        if (ok) passed++;
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  await site.close();
}

// ---- report ----
let lastKey = "";
for (const r of rows) {
  const key = `${r.vp} │ ${r.name}`;
  if (key !== lastKey) {
    console.log(`\n\x1b[1m${key}\x1b[0m`);
    lastKey = key;
  }
  const mark = r.ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  const detail = r.ok ? `${r.prop} = ${r.act}` : `${r.prop}: expected ${r.exp}, got \x1b[31m${r.act}\x1b[0m`;
  console.log(`  ${mark} ${detail}`);
}
console.log(
  `\n${passed === total ? "\x1b[32m" : "\x1b[31m"}${passed}/${total} checks passed\x1b[0m`,
);
process.exit(passed === total ? 0 : 1);

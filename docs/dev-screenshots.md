# Pixel-perfect verification (Playwright + Chromium)

Two tools verify each section against Figma. **Numerical inspection is the
primary check** — comparing real numbers beats eyeballing screenshots.

Setup is already done (`npm install` + `npx playwright install chromium`).
Both tools auto-start a static server and tear it down — nothing to manage.

## 1. Numerical inspection (primary)

Compares `getComputedStyle` + `getBoundingClientRect` against the Figma values
declared in [`tools/specs/lp1.spec.mjs`](../tools/specs/lp1.spec.mjs).

```bash
node tools/inspect.mjs                 # run every check (desktop + mobile)
node tools/inspect.mjs --only "Hero"   # only checks whose name contains "Hero"
```

Output is a per-element pass/fail table; exit code is non-zero if anything is
off. **Workflow: build a section → add its block to the spec → run inspect →
fix until green.** This catches wrong font-size / line-height / color / gap /
dimension instantly, with exact "expected vs got" values.

Spec value types:

- string → exact match (`fontSize: "40px"`)
- RegExp → test (`fontFamily: /Albert Sans/`)
- `{approx, tol}` → numeric within tolerance (`{approx: 850, tol: 1}`)

Remember computed values are resolved: `line-height: 1.2` on 40px → `"48px"`;
`#303030` → `"rgb(48, 48, 48)"`; flex `gap` → `rowGap`/`columnGap`.

## 2. Screenshots (visual diff)

Deterministic — Playwright waits for fonts + network idle, so no FOUT.

```bash
node tools/shot.mjs lp1/index.html /tmp/d.png 1440 full      # full page, desktop
node tools/shot.mjs lp1/index.html /tmp/m.png 375 full       # full page, mobile
node tools/shot.mjs lp1/index.html /tmp/x.png 1440 1350 2    # fixed height @2x
node tools/shot.mjs lp1/index.html /tmp/hero.png --clip .hero 1440   # one section
```

`--clip <selector>` screenshots just that element — the fast way to compare a
single section against the Figma `get_screenshot` of the same node.

Then `Read` the PNG and compare to Figma. For a numeric diff against a saved
Figma reference, `pixelmatch` + `pngjs` are installed.

## Conventions

- **Viewports:** desktop `1440`, mobile `375` (the Figma frame widths).
- **Content column:** `850px` desktop / `343px` mobile (full-bleed 375 with
  16px insets), centred.
- `deviceScaleFactor: 1` for inspection (rects are CSS px); `2` for crisp shots.

## Why this replaced raw `chrome --headless --screenshot`

That path wasted time: ~5s cold launch each call, silent profile-lock failures
on concurrent runs, and FOUT (capture before fonts loaded → false "overflow").
Playwright launches fast, auto-waits for fonts, and runs synchronously.

## Possible future improvement

Self-host **Albert Sans** / **Raleway** (`woff2`) instead of Google Fonts —
fully deterministic renders and a faster production page.

# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Overview

`atanycost` is a **single-page, dependency-free static website** — a work of dark
satire framed as a corporate annual report ("AT ANY COST™: Annual Report to the
Deserving"). It is content plus scroll-driven interactive vignettes. There is no
backend, no API, no CLI, no package manager, and no build step.

Live at <https://neverprepared.github.io/atanycost/> (GitHub Pages).

## Architecture

Three files at the repo root, loaded directly by the browser — no bundler, no
modules, no `package.json`:

| File | Role |
| --- | --- |
| `index.html` | All content and structure (~680 lines). Ticker, hero, and 15 `<section>` blocks, each with a stable `id` used for deep links and JS hooks. |
| `styles.css` | All styling (~1200 lines). Brutalist bone / ink / blood-red palette. |
| `script.js` | All behaviour (~470 lines). One IIFE in `"use strict"`, no exports. |
| `assets/og-image.png`, `assets/og-image.svg` | 1200×630 Open Graph share card. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |

### `script.js` structure

A single IIFE containing independent blocks. Every block is **defensively
guarded** — it looks its elements up by `id` and no-ops if they are absent, so
sections can be removed from `index.html` without breaking the script. Blocks:

- **Reveal-on-scroll** — `IntersectionObserver` adds `.is-visible` to `.reveal`
  elements; falls back to revealing everything when the API is missing. Every
  observer-driven block has the same non-observer fallback.
- **Hours-to-margin counter** (`#counterValue`) — `requestAnimationFrame` meter.
- **Winners' circle** (`#brag` / `#bragAttr`) — rotates a hardcoded `BRAGS`
  array on a 4.2s interval.
- **Market share** (`#market`) — consumes `#seg1`–`#seg4` into `#segUs` on
  scroll-in, stepping `#marketFoot` through the `FOOTS` strings.
- **Comfort ceiling** (`#comfort`) — a security meter that asymptotes toward 86%
  and is periodically knocked back down by a random `EVENTS` string.
- **The river** (`#riverViz`) — dams on scroll-in, then meters a dollar toll.
- **Perceived-value decay** (`#decay`) — animates a bar from 100% to 4%.
- **Curriculum flip cards** (`#lieCards .flip`) — click toggles `.is-flipped`
  and keeps `aria-pressed` in sync.
- **P.S. toggle** (`#psToggle` / `#psNote`).
- **Share affordances** — `copyText()` (Clipboard API with a `execCommand`
  fallback for insecure contexts) plus `flash()`. Powers the thesis copy button
  (`#copyBtn`), per-card "copy this lie + tell" buttons injected around each
  `.flip`, and `#`-anchor copy buttons injected into every `.section-label`.

### Canonical URL

`SITE_URL` in `script.js` is read from `<link rel="canonical">` in
`index.html`. **When the custom domain lands, update the canonical `href` plus
the two absolute `og:url` / `og:image` URLs in the `<head>` — nothing in
`script.js` needs to change.**

## Commands

There is **no build, no test suite, no linter, and no package manager** in this
repo. Do not invent `npm run` scripts; there is no `package.json`.

Local preview — open `index.html` directly, or:

```sh
python3 -m http.server 8000   # then http://localhost:8000
```

Verification is manual: load the page and exercise the scroll-triggered
sections, the flip cards, and the copy buttons. Clipboard writes need a secure
context (`localhost` counts).

## CI / Deployment

`.github/workflows/deploy.yml` publishes the repo root to GitHub Pages on every
push to `main` (and via `workflow_dispatch`). It uses
`configure-pages@v5` → `upload-pages-artifact@v3` → `deploy-pages@v4` with
least-privilege permissions and no build step.

**Note:** the workflow only runs on `main`. Pull requests get **no automated
checks at all** — there is nothing to lint or test them against. If a build or
bundler is ever introduced, add the build job to this workflow.

## Conventions

- **No dependencies.** Keep it vanilla HTML/CSS/JS. Do not add a framework, a
  bundler, a CSS preprocessor, or a tracker/analytics script.
- **Guard every DOM lookup.** New `script.js` blocks must follow the existing
  `if (el) { ... }` pattern so a missing section never throws.
- **Stable section `id`s.** Section ids are public deep-link targets (the anchor
  copy buttons emit them). Renaming one breaks shared links.
- **CSS variables in `:root`.** Colors and fonts (`--ink`, `--bone`,
  `--bone-dim`, `--blood`, `--blood-deep`, `--ash`, `--mono`, `--sans`) are
  defined once — use them rather than hardcoding values.
- **Accessibility.** Keep `aria-pressed`/`aria-label`/`aria-hidden` accurate on
  interactive and decorative elements. `styles.css` honours
  `prefers-reduced-motion: reduce` (disables animations, force-reveals
  `.reveal`); note that the `requestAnimationFrame` meters in `script.js` do
  **not** currently check that media query.
- **`kit/` is gitignored on purpose** — the launch/marketing material stays
  local and must not be committed to this public repo.
- **Tone.** The content is deliberate satire that ends on one sincere note. Match
  the existing voice; don't sand it down.

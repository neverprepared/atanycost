# atanycost

A single-page, dependency-free work of dark satire framed as a corporate
"annual report" that keeps accidentally confessing. It walks the mechanics of
exploitative work: profit at any cost, executives applauding each other for
others' failure, monopoly and the enclosure of the commons, manufactured
precarity, the lies we're taught, and the way the whole pattern eventually
self-installs across generations. It ends on one sincere note: refuse the
binary, and keep talking.

## Stack

Static HTML/CSS/JS. No frameworks, no build step, no trackers.

- `index.html` — content and structure
- `styles.css` — brutalist bone / ink / blood-red styling
- `script.js` — scroll reveals and the interactive meters (market share,
  the river toll, perceived-value decay, the security ceiling)

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the
site to GitHub Pages. There is no build step; add one to the workflow if a
bundler or static-site generator is ever introduced.

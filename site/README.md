# Bench 08

A static showcase for the eight-run, eight-task creative benchmark in `../results/`.

## Open it

The pages use iframes for the HTML artifacts, so serve the folder rather than opening the file directly:

```bash
cd site
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Pages

- `index.html` — overview, findings, runs and featured work
- `results.html` — all 128 results, filterable by task, model and variant
- `compare.html` — pick a task and two runs, side by side
- `artifact.html` — one artifact with its run metadata and technical note
- `method.html` — the brief, run conditions, timings and caveats

Text artifacts (explanation, fiction and code review) include a **Listen** button that uses the browser's speech synthesis. Each result also carries the subagent's start-to-finish time.

## Rebuild

The page shells and `data.js` are generated from `../results/` by `build.mjs`:

```bash
node build.mjs
```

`build.mjs` copies the 128 artifacts into `site/artifacts/`, computes word counts, line counts, finding counts, timing chips and note chips, and writes the HTML pages. Prompt timings are read from `timings.json`. The visual layer lives in `assets/style.css` and `assets/app.js`.

The results-card previews in `thumbs/` are captured from the HTML artifacts. If you change an artifact, regenerate them while a local server is running:

```bash
python -m http.server 8080
# in another shell
node thumbs.mjs
```

If a preview is missing, the card falls back to a live iframe.

## Editorial rules

- Creative work is presented without a score.
- The parser and code-review tasks carry a short technical note.
- Every card names the model and the run.
- Run caveats (tool use, skill use, trimmed or unfenced artifacts) are visible on the card and in the method page.

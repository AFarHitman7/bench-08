# Bench 08

**A small creative benchmark across six models and eight runs.**

Eight tasks, each in a thin and a thick variant: a poster, an interface, a critique, a motion title, an explainer, a short story, a duration parser, and a code review. One hundred and twenty-eight artifacts in total.

**Live showcase:** <https://afarhitman7.github.io/bench-08/>

## What the showcase contains

- **Overview** — the headline findings, the eight runs, featured work and the task index.
- **Results** — every artifact, filterable by task, model and variant.
- **Compare** — pick a task and two runs, then inspect them side by side.
- **Artifact** — one result at full scale, with its run metadata and technical note.
- **Method** — the brief, run conditions, fidelity table and limitations.

Creative work is presented without a score. The parser and code-review tasks carry a short editorial note because those tasks have verifiable failure modes.

## Findings

- **Code review separated the field.** Most runs found the two planted defects in the limiter. DeepSeek's thick review missed the bigger one: `prune` compares an object to a number, so it never runs. It caught the `reset` bug, but not the type mismatch.
- **Two runs are not directly comparable.** Muse Spark's saved files were rewritten, not copied: four artifacts in run 1 and seven in run 2. They are included for transparency and marked “Not comparable”.
- **The cleanest runs were the quietest.** HY4 Flash and Claude Haiku 5.5 (run 2) used no subagent tools and saved every file exactly. DeepSeek's subagents made 363 tool calls, browser screenshots included; GPT's loaded 29 skills.

## Repository layout

```text
results/              the original saved artifacts and per-run pages
site/                 the showcase (built static site)
  artifacts/          copies of the 128 artifacts used by the showcase
  thumbs/             static previews for the results cards
  build.mjs           regenerates the pages and data.js
  thumbs.mjs          regenerates the preview images
prompt.md             the benchmark's master prompt
```

## Run the showcase locally

The compare and detail pages render the HTML artifacts in iframes, so serve the folder:

```bash
cd site
python -m http.server 8080
```

Open <http://localhost:8080>.

## Rebuild

```bash
node site/build.mjs
```

To regenerate the HTML previews, keep a local server running and use:

```bash
cd site
node thumbs.mjs
```

Details are in [`site/README.md`](site/README.md).

## Caveats

- This is eight runs, not a statistically meaningful sample. Claude Haiku 5.5 and Muse Spark 1.3 have two runs each.
- The runs are not identical. DeepSeek's subagents used a browser; GPT's loaded skills; GLM had one CSS line repaired after saving; Haiku run 1 accepted one unfenced review.
- Muse Spark's two runs are process demos, not byte-faithful model output.
- Creative work is deliberately unscored.

The benchmark prompt is in [`prompt.md`](prompt.md).

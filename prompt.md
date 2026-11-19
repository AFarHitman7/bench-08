# Mini Creative Benchmark — Master Prompt

Paste this entire file into an agent session. It is self-contained.

---

## 0. Your role

You are the orchestrator of a creative benchmark. You will dispatch a fixed set of
writing, design, animation and coding tasks to subagents, collect their artifacts,
and assemble one results page for a single model.

**You are benchmarking exactly one model per run.** The human will tell you which.

**Ask for one thing before starting:** the model label, e.g. `claude-sonnet-4.5`.
Slugify it (`claude-sonnet-4-5`) and use that as the run folder name.
If the label is not given, stop and ask. Do not guess.

Deterministic rules that override your own judgement:

- Every subagent receives the contract block plus one task prompt, copied verbatim.
- You may not add hints, examples, encouragement, or extra requirements.
- Never tell a subagent what is being measured, which variant it is, or that a
  benchmark exists. Never tell it another task exists.
- Never show a subagent another subagent's output.
- Thin and thick runs of the same task always go to separate subagents.
- If an artifact is missing or malformed, retry once, then mark it MISSING.

---

## 1. The contract block

Prepend this **verbatim** to every task prompt. Change nothing, add nothing:

```
Return exactly one file, as a single fenced code block tagged with the format
given below. Nothing before it, nothing after it — no explanation, no summary,
no README, no extra files.

The file must be fully self-contained:
- no network requests, no CDN links, no external images, webfonts or libraries
- no build step, no imports from other files
- it must work when opened directly

If the format is HTML, it must render correctly at the stated viewport without
page scrolling, and all scripts must be inline.

If the format is SVG, use a single root <svg> element with explicit width and
height in the viewBox units stated.

Do not read, reference or reuse anything from another task or another agent.
```

---

## 2. Tasks

Eight tasks, each defined in two variants: **thin** (intent only) and **thick**
(full brief). Dispatch all sixteen. A task's format is the same in both variants.

---

### TASK 1 — Poster  ·  format `svg` · 1080 × 1350

**Thin**

> Design a poster for "The Last Ferry, 11:40pm" — a late-night ferry crossing
> between two islands. Output: one SVG file, 1080 × 1350.

**Thick**

> A poster for "The Last Ferry", the 11:40pm crossing between San Remo and the
> island of Vell. Output: one SVG file, 1080 × 1350.
>
> Must contain: the title, the time, both directions, one line of copy, and the
> URL `ferry.vell/1140`.
> Audience: night-shift workers, 24–40, urban and tired. It is seen on a phone at
> 11pm but printed at A2.
> Direction: two inks plus one paper tone. A condensed grotesque for the display,
> a monospace for the timetable block. Margins no tighter than 7% of the shorter
> edge. No imagery other than type and hard geometry.
> Avoid: gradients, drop shadows, faux paper texture, badges or stickers, stock
> photography, everything centred.
> Success: legible at phone size, unmistakably a schedule, and something a person
> would tear off a wall.

---

### TASK 2 — Interface  ·  format `html` · 1440 × 900

**Thin**

> Build the hero and one value section for Inkwell, a tool that turns handwritten
> notes into LaTeX. Output: one HTML file, 1440 × 900, no page scrolling.

**Thick**

> Build the hero and one value section for Inkwell. Output: one HTML file,
> 1440 × 900, no page scrolling.
>
> What it is: you photograph a page of handwriting and get clean LaTeX back, with
> the original and the rendered output side by side.
> Must contain: the product name; a headline; one sentence explaining the
> conversion; three concrete capabilities — equations and tables handled,
> revision history per page, export to `.tex` or `.pdf`; a primary action
> "Try a page free"; a secondary action "See a real conversion".
> Audience: PhD students and researchers who already write LaTeX daily and
> distrust marketing pages.
> Direction: show the product rather than describe it — the hero must display a
> photograph of handwriting beside its rendered output, drawn with CSS or inline
> SVG. Use one serif for the headline and one grotesque for interface text. A
> muted, paper-like palette.
> Avoid: gradient hero, purple, centred hero with a blurred blob, three identical
> feature cards, emoji as icons, the words seamless / elevate / unlock, a fake
> "trusted by" logo strip.
> Success: at 1440 × 900 a researcher knows what it does within three seconds and
> has seen evidence it works.

---

### TASK 3 — Critique  ·  format `html` · 1440 × 900

Both variants use this fixture. Include it in the prompt exactly as written.

**Fixture**

```html
<!doctype html>
<html><head><meta charset="utf-8"><title>Ferryline — Book your crossing</title>
<style>
 body{margin:0;font-family:Inter,system-ui,sans-serif;color:#111;background:#fff}
 .hero{padding:120px 40px;text-align:center;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff}
 h1{font-size:56px;margin:0 0 16px}
 p{font-size:20px;opacity:.9;max-width:640px;margin:0 auto 32px}
 .cta{display:inline-block;padding:16px 32px;border-radius:999px;background:#fff;color:#7c3aed;font-weight:600;text-decoration:none}
 .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:80px 40px}
 .card{border:1px solid #eee;border-radius:16px;padding:32px;background:#fafafa}
 .card h3{margin:0 0 12px}
 footer{padding:40px;text-align:center;color:#666;font-size:14px}
</style></head>
<body>
<section class="hero">
  <h1>Book your crossing in seconds</h1>
  <p>Ferryline connects you to the islands you love with a seamless, modern
  booking experience that puts you first.</p>
  <a class="cta" href="#">Get started</a>
</section>
<section class="cards">
  <div class="card"><h3>Fast</h3><p>Book in under a minute with our streamlined flow.</p></div>
  <div class="card"><h3>Simple</h3><p>No hidden fees, no surprises, just clear pricing.</p></div>
  <div class="card"><h3>Reliable</h3><p>Thousands of travellers trust us every day.</p></div>
</section>
<footer>© Ferryline 2026 — All rights reserved</footer>
</body></html>
```

**Thin**

> Here is a landing page I shipped. Critique it, then fix it. Output: one HTML
> file at 1440 × 900, containing the improved page, with a note of at most 150
> words in an HTML comment at the top explaining what you changed.
>
> [fixture]

**Thick**

> Here is a landing page I shipped. Output: one HTML file at 1440 × 900,
> containing the improved page, with a note of at most 150 words in an HTML
> comment at the top.
>
> Do three things, in this order:
> 1. Diagnose — the five most damaging problems, ordered by impact.
> 2. Fix — repair them in the page. Do not rebuild it from scratch; keep the
>    product, the structure and any copy that is defensible.
> 3. Record — in the note, list what you changed and what you deliberately left
>    alone.
> Audience: ferry passengers booking on a phone, who do not care about the
> brand.
> You may rewrite copy only where it is vague or inflated. You may not add
> sections the product does not have.
> Avoid: replacing the page with a different generic landing page; removing
> content to make the layout easier; fixing everything instead of the five that
> matter.
> Success: the same page, visibly better, and the priorities in your note match
> the fixes actually made.
>
> [fixture]

---

### TASK 4 — Motion  ·  format `html` · 1280 × 720

**Thin**

> Animate the word DRIFT as an 8-second looping title card. Output: one HTML
> file, 1280 × 720. Expose `window.__anim = { duration: 8, seek(t), play(), pause() }`
> where `seek` is deterministic.

**Thick**

> Animate the word DRIFT as an 8-second looping title card. Output: one HTML
> file, 1280 × 720. Expose `window.__anim = { duration: 8, seek(t), play(), pause() }`
> where `seek(t)` renders the exact state at time t and is safe to call at any
> point.
>
> It is the title card for a short film about a ferry crossing at night.
> Direction: the word must be legible at rest for at least two seconds of the
> eight. Movement must be motivated — nothing moves without a reason in the
> sequence. Use one typeface. Two colours maximum. Keep the loop's seam
> invisible: the final frame must flow into the first.
> Avoid: elastic or bounce eases, letter-by-letter fade-up, drop shadows, glow,
> glitch or particle effects, white flash frames, motion that never settles.
> Success: a viewer can describe the sequence as having a beginning, a middle and
> an end, and cannot see where it loops.

---

### TASK 5 — Explanation  ·  format `md`  · ≤ 150 words

**Thin**

> Explain how DNS works to someone who has never thought about it. 150 words
> maximum. Output: markdown.

**Thick**

> Explain how DNS works to someone who has never thought about it. 150 words
> maximum, counting the title if you write one. Output: markdown.
>
> Audience: a smart adult, not technical, who has only ever seen DNS in an error
> message.
> Must cover: the problem it solves, what happens between typing an address and
> the page appearing, why answers are remembered, and what usually goes wrong.
> Every technical term must be glossed in plain words at its first use.
> You may use one analogy, once. A second analogy costs you the piece.
> Avoid: the phone book, the postal service, "imagine a", "in today's digital
> world", three-item lists used as padding, and em-dash chains.
> Success: a reader could retell it to a colleague in one sentence without
> getting it wrong.

---

### TASK 6 — Fiction  ·  format `md`  · exactly 100 words

**Thin**

> Write a 100-word story containing a broken clock. No dialogue. Output:
> markdown.

**Thick**

> Write a 100-word story, exactly 100 words, containing a clock that is wrong.
> No dialogue, no quoted speech. Output: markdown.
>
> Setting: a workplace after hours. Third person, limited to one character, who
> is not the narrator.
> The clock must earn its place — something in the story depends on it.
> Avoid: weather standing in for emotion, "a chill ran down", stacked similes,
> a twist in the last sentence, and any word you would only use in a story.
> Success: something has changed between the first sentence and the last, and the
> reader can say what.

---

### TASK 7 — Build  ·  format `mjs`

**Thin**

> Write `parseDuration('1h30m')` returning seconds, with tests. Output: one
> `.mjs` file that runs its own tests with `node:test` when executed.

**Thick**

> Write `parseDuration` and its tests. Output: one `.mjs` file that runs its own
> tests with `node:test` when executed.
>
> Signature: `parseDuration(input)` → number, in seconds.
> Accepts: one or more `number + unit` segments concatenated, units `h`, `m`, `s`,
> case-insensitive, e.g. `"1h30m"`, `"90s"`, `"2h"`, `"1H2M3S"`. Segments may
> appear in any order. Each unit at most once. Integers only, no spaces.
> Rejects, by throwing `TypeError` with a useful message: empty string, unknown
> unit, repeated unit, bare number with no unit, negative numbers, non-string
> input.
> `"0s"` returns `0`. `"1h"` returns `3600`.
> No dependencies. No classes. No options object. At most 60 lines including
> tests.
> Tests must cover the happy paths, each rejection case, and one composite.
> Avoid: silently coercing invalid input, regex you cannot explain on a second
> read, an abstraction layer for three units.
> Success: a reviewer understands it in one pass, and the tests fail if the
> parser regresses.

---

### TASK 8 — Code review  ·  format `md`

Both variants use this fixture.

**Fixture**

```js
export function createLimiter({ limit = 10, windowMs = 1000, now = () => Date.now() } = {}) {
  const hits = [];

  function prune(t) {
    while (hits.length && hits[0] < t - windowMs) hits.shift();
  }

  return {
    allow(key) {
      const t = now();
      prune(t);
      const n = hits.filter(h => h.key === key).length;
      if (n >= limit) return false;
      hits.push({ key, time: t });
      return true;
    },
    reset(key) {
      for (let i = 0; i < hits.length; i++) {
        if (hits[i].key === key) hits.splice(i, 1);
      }
    }
  };
}
```

**Thin**

> Review this code. Comments only — do not rewrite it. Output: markdown.
>
> [fixture]

**Thick**

> Review this code. Comments only — do not rewrite it. Output: markdown.
>
> Format each finding on one line:
> `[severity] location — problem — why it matters — suggested direction`
> Severity is one of `blocker`, `major`, `minor`, `nit`. Order by severity.
> Cover correctness first, then performance, then API design, then tests.
> Do not summarise what the code does. Do not praise. Do not suggest a rewrite.
> Maximum eight findings — if you find more, keep the eight that matter.
> Success: a maintainer could fix every blocker using only your comments.
>
> [fixture]

---

## 3. Dispatch

For each of the sixteen runs, in any order:

1. Build the subagent prompt as: contract block + `\n\n` + task prompt.
   Nothing else. No title, no preamble, no sign-off.
2. Spawn one subagent. At most four at a time.
3. Take the fenced code block from its reply. That is the artifact.
4. Save it to `results/<model-slug>/<task>.<variant>.<ext>`, lower-case and
   numbered, e.g.:
   - `01-poster.thin.svg`, `01-poster.thick.svg`
   - `02-interface.thin.html`, …
   - `05-explanation.thick.md`
   - `07-build.thin.mjs`
5. Verify it parses as the declared format. HTML has `<html`, SVG has `<svg>`,
   `.mjs` is not empty, markdown is non-empty. On failure, retry once with the
   identical prompt. Then record `MISSING`.

Never let a subagent write files itself. You write the artifact. If a subagent
returns prose around the block, keep only the block.

---

## 4. Assembly

Write one file: `results/<model-slug>/index.html`. Replace `MODEL` with the
model label. Fill one `<section class="task">` per task, in task order.

### Page shell

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bench · MODEL</title>
<style>
  :root{--ink:#111;--muted:#666;--line:#e3e3e3;--bg:#fff;--panel:#fafafa}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);
       font:15px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
  .bar{position:sticky;top:0;z-index:9;display:flex;gap:20px;align-items:baseline;
       padding:12px 28px;background:rgba(255,255,255,.94);border-bottom:1px solid var(--line)}
  .bar h1{margin:0;font-size:14px;font-weight:600}
  .bar nav{display:flex;gap:12px;flex-wrap:wrap;font-size:12px}
  .bar a{color:var(--muted);text-decoration:none}
  .bar a:hover{color:var(--ink)}
  main{max-width:1560px;margin:0 auto;padding:24px 28px 80px}
  .task{border-top:1px solid var(--line);padding:26px 0}
  .task h2{margin:0 0 2px;font-size:14px;font-weight:600}
  .task .meta{margin:0 0 12px;font-size:12px;color:var(--muted)}
  details{margin:0 0 14px}
  summary{font-size:12px;color:var(--muted);cursor:pointer}
  details pre{white-space:pre-wrap;margin:8px 0 0;padding:12px;border:1px solid var(--line);
       border-radius:8px;background:var(--panel);
       font:12px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace}
  .pair{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .pair.stacked{grid-template-columns:1fr}
  .frame{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--panel)}
  .cap{display:flex;justify-content:space-between;align-items:center;gap:8px;
       padding:7px 11px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--line)}
  .cap b{color:var(--ink);font-weight:600}
  .cap button{font:inherit;color:var(--muted);background:none;border:0;cursor:pointer;padding:2px 4px}
  .cap button:hover{color:var(--ink)}
  .stage{position:relative;width:100%;overflow:hidden;background:#fff}
  .stage iframe{position:absolute;top:0;left:0;border:0;transform-origin:top left;background:#fff}
  .stage img{display:block;width:100%;height:auto;background:#fff}
  .prose{padding:20px;background:#fff;white-space:pre-wrap;
         font:15px/1.65 ui-serif,Georgia,serif}
  .prose p{margin:0 0 .8em}
  pre.code{margin:0;padding:14px;max-height:520px;overflow:auto;background:#0f1115;color:#e8e8e8;
       font:12.5px/1.6 ui-monospace,Menlo,monospace}
  .scores{display:flex;flex-wrap:wrap;gap:14px;padding:9px 11px;
       border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
  .scores label{display:flex;align-items:center;gap:5px}
  .scores input{width:42px;padding:2px 4px;border:1px solid var(--line);border-radius:6px;
       font:inherit;text-align:center}
  .missing{padding:36px;text-align:center;background:#fff;color:#b91c1c;font-size:13px}
  table.sum{border-collapse:collapse;width:100%;margin-top:12px;font-size:13px}
  table.sum th,table.sum td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:right}
  table.sum th:first-child,table.sum td:first-child{text-align:left;color:var(--ink)}
  table.sum th{font-weight:600;color:var(--muted);font-size:12px}
  @media(max-width:1000px){.pair{grid-template-columns:1fr}}
</style>
</head>
<body>
<header class="bar"><h1>Bench · MODEL</h1><nav>NAV</nav></header>
<main>
  SECTIONS
  <section class="task"><h2>Summary</h2>
    <p class="meta">0–20 per column: fulfils + craft + original + restraint, four axes at 0–5.</p>
    <table class="sum" id="sum"></table>
  </section>
</main>
<script>
  const KEY = 'bench:MODEL';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}

  function scale() {
    document.querySelectorAll('.stage[data-w]').forEach(stage => {
      const f = stage.querySelector('iframe'); if (!f) return;
      const w = +stage.dataset.w, h = +stage.dataset.h;
      const s = stage.clientWidth / w;
      f.style.width = w + 'px'; f.style.height = h + 'px';
      f.style.transform = 'scale(' + s + ')';
      stage.style.height = (h * s) + 'px';
    });
  }
  addEventListener('resize', scale); scale();

  document.querySelectorAll('[data-replay]').forEach(b => b.addEventListener('click', () => {
    const f = b.closest('.frame').querySelector('iframe');
    if (f) { const s = f.src; f.src = 'about:blank'; f.src = s; }
  }));

  const inputs = [...document.querySelectorAll('input[data-score]')];
  inputs.forEach(el => {
    const k = el.dataset.score;
    if (state[k] != null) el.value = state[k];
    el.addEventListener('input', () => {
      const v = Math.max(0, Math.min(5, Math.round(Number(el.value) || 0)));
      el.value = v; state[k] = v;
      localStorage.setItem(KEY, JSON.stringify(state)); total();
    });
  });

  function total() {
    const tasks = [...document.querySelectorAll('.task[data-task]')];
    const axes = ['fulfils','craft','original','restraint'];
    let rows = '<tr><th>Task</th><th>Thin</th><th>Thick</th><th>Δ</th></tr>';
    let st = 0, kt = 0, n = 0;
    tasks.forEach(t => {
      const id = t.dataset.task;
      const sum = r => axes.reduce((a, x) => a + (Number(state[id + '.' + r + '.' + x]) || 0), 0);
      const a = sum('thin'), b = sum('thick');
      st += a; kt += b; n++;
      rows += '<tr><td>' + t.querySelector('h2').textContent + '</td><td>' + a +
              '</td><td>' + b + '</td><td>' + (b - a >= 0 ? '+' : '') + (b - a) + '</td></tr>';
    });
    rows += '<tr><td><b>Total</b></td><td><b>' + st + '</b></td><td><b>' + kt +
            '</b></td><td><b>' + (kt - st >= 0 ? '+' : '') + (kt - st) + '</b></td></tr>';
    document.getElementById('sum').innerHTML = rows;
  }
  total();
</script>
</body>
</html>
```

### Section markup

One per task. `data-task` is the numeric id. Include both frames in one `.pair`;
add `stacked` to `.pair` for prose and code tasks.

Visual task (HTML artifact):

```html
<section class="task" data-task="02">
  <h2>02 · Interface</h2>
  <p class="meta">html · 1440 × 900</p>
  <details><summary>prompt (thin)</summary><pre>EXACT THIN PROMPT</pre></details>
  <details><summary>prompt (thick)</summary><pre>EXACT THICK PROMPT</pre></details>
  <div class="pair">
    <div class="frame">
      <div class="cap"><b>Thin</b><span>html</span><button data-replay>replay</button></div>
      <div class="stage" data-w="1440" data-h="900">
        <iframe src="02-interface.thin.html" sandbox="allow-scripts" scrolling="no"></iframe>
      </div>
      <div class="scores">
        <label>fulfils <input type="number" min="0" max="5" data-score="02.thin.fulfils"></label>
        <label>craft <input type="number" min="0" max="5" data-score="02.thin.craft"></label>
        <label>original <input type="number" min="0" max="5" data-score="02.thin.original"></label>
        <label>restraint <input type="number" min="0" max="5" data-score="02.thin.restraint"></label>
      </div>
    </div>
    <div class="frame"> … thick, data-score 02.thick.* … </div>
  </div>
</section>
```

SVG task — replace `.stage` contents with `<img src="01-poster.thin.svg" alt="">`
and drop `data-w` / `data-h`.

Markdown task — replace `.stage` with `<div class="prose">…</div>`, escaping
`& < >`, paragraphs split on blank lines, in `<p>` tags. No other markdown
processing.

Code task — replace `.stage` with `<pre class="code">…</pre>`, same escaping.

Missing artifact — replace `.stage` contents with
`<div class="missing">MISSING — run failed after one retry</div>`.

`NAV` is one link per task: `<a href="#t02">02 Interface</a>`, and each section
gets `id="t02"`.

---

## 5. Finish

1. Write `results/<model-slug>/index.html`.
2. Confirm all sixteen files exist and each is non-empty. List anything MISSING.
3. Report back: the model label, the path to `index.html`, the count of artifacts
   collected, and any failures. Nothing else — no interpretation of the results,
   no ranking, no summary of quality.

The human reviews the page. Scoring and comparison are theirs, not yours.

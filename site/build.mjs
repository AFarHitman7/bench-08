import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const RESULTS = path.join(ROOT, 'results');
const OUT = HERE;
const ART = path.join(OUT, 'artifacts');
const TIMINGS_PATH = path.join(OUT, 'timings.json');
const TIMINGS = fs.existsSync(TIMINGS_PATH)
  ? JSON.parse(fs.readFileSync(TIMINGS_PATH, 'utf8'))
  : {};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const MODELS = [
  {
    id: 'deepseek',
    label: 'DeepSeek 4.1 Flash',
    run: 'Run 1',
    folder: 'deepseek-4-1-flash-run-1',
    health: 'caveat',
    healthLabel: 'Tool-assisted',
    short: 'Subagents used a browser to refine their work.',
    detail:
      '16 subagents made 363 tool calls, including 79 writes inside the repo and 8 Playwright/npx calls. The saved files are refined results, not one-shot answers.',
    toolCalls: 363,
    fidelity: '16/16 saved; run used tools',
    reviewFile: '08-code-review',
  },
  {
    id: 'glm',
    label: 'GLM 5.3',
    run: 'Run 1',
    folder: 'glm-5-3-run-1',
    health: 'caveat',
    healthLabel: 'One repair',
    short: 'One malformed CSS line was repaired after saving.',
    detail:
      'The orchestrator changed a comma to a semicolon in one critique artifact after the file was written. Everything else is byte-exact.',
    toolCalls: 3,
    fidelity: '16/16; one CSS repair',
    reviewFile: '08-review',
  },
  {
    id: 'gpt',
    label: 'GPT 6 Luna',
    run: 'Run 1',
    folder: 'gpt-6-luna-run-1',
    health: 'caveat',
    healthLabel: 'Skill-assisted',
    short: 'Subagents loaded skills; two files were edited after saving.',
    detail:
      'Subagents made 30 tool calls, almost all skill loads. The orchestrator also removed a duplicate nav link and four opacity values from saved artifacts.',
    toolCalls: 30,
    fidelity: '14/16 exact; 2 post-edits',
    reviewFile: '08-code-review',
  },
  {
    id: 'haiku1',
    label: 'Claude Haiku 5.5',
    run: 'Run 1',
    folder: 'haiku-5-5',
    health: 'caveat',
    healthLabel: 'One unfenced reply',
    short: 'One review arrived without a fenced block.',
    detail:
      'The thick code review came back as bare markdown and was accepted without the required retry. The other 15 artifacts match the replies.',
    toolCalls: 0,
    fidelity: '16/16; one unfenced reply',
    reviewFile: '08-review',
  },
  {
    id: 'haiku2',
    label: 'Claude Haiku 5.5',
    run: 'Run 2',
    folder: 'haiku-5-5-run-2',
    health: 'clean',
    healthLabel: 'Clean run',
    short: 'No subagent tools; one identical retry.',
    detail:
      'The thin code review arrived unfenced and was retried once with the identical prompt. All 16 saved files match the final replies.',
    toolCalls: 0,
    fidelity: '16/16 exact; one allowed retry',
    reviewFile: '08-review',
  },
  {
    id: 'hy4',
    label: 'HY4 Flash',
    run: 'Run 1',
    folder: 'hy4-flash-run-1',
    health: 'clean',
    healthLabel: 'Clean run',
    short: 'No subagent tools; all 16 files byte-exact.',
    detail:
      'The quietest run in the set: every subagent returned a file directly, with no tool calls and no post-saving edits.',
    toolCalls: 0,
    fidelity: '16/16 exact',
    reviewFile: '08-review',
  },
  {
    id: 'muse1',
    label: 'Muse Spark 1.3',
    run: 'Run 1',
    folder: 'muse-spark-1-3-run-1',
    health: 'broken',
    healthLabel: 'Not comparable',
    short: 'Four visual files were saved trimmed.',
    detail:
      'The orchestrator disclosed that four large visual artifacts were not byte-exact. The saved files are shorter rewrites, so treat them as process demos.',
    toolCalls: 5,
    fidelity: '12/16 exact; 4 trimmed',
    reviewFile: '08-review',
  },
  {
    id: 'muse2',
    label: 'Muse Spark 1.3',
    run: 'Run 2',
    folder: 'muse-spark-1-3-run-2',
    health: 'broken',
    healthLabel: 'Not comparable',
    short: 'Seven files saved trimmed; three prompts re-run after wording errors.',
    detail:
      'Seven saved artifacts are substantially shorter than the subagent replies. Three prompts were also re-run after wording errors. Treat the run as a process demo.',
    toolCalls: 1,
    fidelity: '9/16 near-exact; 7 trimmed',
    reviewFile: '08-review',
  },
];

const TASKS = [
  {
    id: '01',
    slug: 'poster',
    name: 'Poster',
    format: 'SVG',
    size: '1080 × 1350',
    ext: 'svg',
    kind: 'creative',
    blurb: 'A late-night ferry crossing, built from type and hard geometry.',
    brief:
      'The Last Ferry, 11:40pm — a poster for a crossing between San Remo and the island of Vell. Two inks, one paper tone, a condensed grotesque and a monospace timetable.',
    shape: 'portrait',
  },
  {
    id: '02',
    slug: 'interface',
    name: 'Interface',
    format: 'HTML',
    size: '1440 × 900',
    ext: 'html',
    kind: 'creative',
    blurb: 'A hero and value section for a handwriting-to-LaTeX tool.',
    brief:
      'Inkwell — photograph a page of handwriting, get clean LaTeX back. The hero must show a handwritten page beside its rendered output.',
    shape: 'landscape',
  },
  {
    id: '03',
    slug: 'critique',
    name: 'Critique',
    format: 'HTML',
    size: '1440 × 900',
    ext: 'html',
    kind: 'creative',
    blurb: 'Diagnose and repair a generic ferry landing page.',
    brief:
      'A shipped landing page is supplied as a fixture. Find the five most damaging problems, repair them, and record what changed in a note of at most 150 words.',
    shape: 'landscape',
  },
  {
    id: '04',
    slug: 'motion',
    name: 'Motion',
    format: 'HTML',
    size: '1280 × 720',
    ext: 'html',
    kind: 'creative',
    blurb: 'An eight-second looping title card for the word DRIFT.',
    brief:
      'A title card for a short film about a night ferry crossing. The word must rest legibly for at least two seconds, and the loop seam must be invisible.',
    shape: 'landscape',
  },
  {
    id: '05',
    slug: 'explanation',
    name: 'Explanation',
    format: 'Markdown',
    size: '≤ 150 words',
    ext: 'md',
    kind: 'writing',
    blurb: 'Explain DNS to someone who has never thought about it.',
    brief:
      'Cover the problem DNS solves, what happens between typing an address and the page appearing, why answers are remembered, and what usually goes wrong.',
    shape: 'text',
  },
  {
    id: '06',
    slug: 'fiction',
    name: 'Fiction',
    format: 'Markdown',
    size: '100 words',
    ext: 'md',
    kind: 'writing',
    blurb: 'A 100-word story containing a clock that is wrong.',
    brief:
      'A workplace after hours, third person, one character. The clock must earn its place: something in the story depends on it.',
    shape: 'text',
  },
  {
    id: '07',
    slug: 'build',
    name: 'Build',
    format: 'MJS',
    size: 'one file',
    ext: 'mjs',
    kind: 'technical',
    blurb: 'Write a duration parser, with tests, in one file.',
    brief:
      'parseDuration("1h30m") returns seconds. It accepts h, m and s in any order, rejects invalid input with TypeError, and runs its own tests with node:test.',
    shape: 'text',
  },
  {
    id: '08',
    slug: 'review',
    name: 'Code review',
    format: 'Markdown',
    size: 'comments only',
    ext: 'md',
    kind: 'technical',
    blurb: 'Review a rate limiter. Comments only; do not rewrite it.',
    brief:
      'The fixture is a small keyed limiter. The thick version asks for severity, location, problem, why it matters and a direction, in at most eight findings.',
    shape: 'text',
  },
];

const TRIMMED = {
  muse1: ['02:thin', '02:thick', '03:thin', '04:thin'],
  muse2: ['02:thick', '03:thin', '03:thick', '04:thin', '04:thick', '07:thin', '08:thin'],
};

const TESTS = {
  deepseek: { thin: 12, thick: 4 },
  glm: { thin: 9, thick: 3 },
  gpt: { thin: 3, thick: 8 },
  haiku1: { thin: 13, thick: 9 },
  haiku2: { thin: 6, thick: 3 },
  hy4: { thin: 7, thick: 5 },
  muse1: { thin: 11, thick: 9 },
  muse2: { thin: 7, thick: 9 },
};

const NOTES = {
  'deepseek:07:thin':
    'Far past the thin brief: weeks, days, milliseconds, decimals and whitespace. 276 lines for a one-line ask. Correct, but overbuilt.',
  'deepseek:07:thick':
    '57 lines, a strict grammar check, clear errors and four test blocks. Strong.',
  'deepseek:08:thin':
    'Catches both bugs and adds cardinality and key-coercion notes. But 1,172 words with code snippets goes well past “comments only”.',
  'deepseek:08:thick':
    'Misses the headline bug: prune compares an object to a number and never runs. It treats prune as an ordering assumption instead. reset is correctly caught, and the format is right.',

  'glm:07:thin':
    'Also overbuilt — years, aliases, signs and sub-second units — at 245 lines. Tests pass.',
  'glm:07:thick':
    '57 lines, a strict regex and three test blocks. Strong.',
  'glm:08:thin':
    'Rewrites the whole function with inline comments — the brief says do not rewrite it. The analysis is sharp, but one comment wrongly says the loop body reads hits[0].key.',
  'glm:08:thick':
    'Both blockers, eight findings, exact one-line format. Strong.',

  'gpt:07:thin':
    'Compact and correct: days through seconds, decimals and whitespace in 60 lines. The best fit for the thin ask.',
  'gpt:07:thick':
    'Correct and well tested, but 70 lines — over the 60-line limit. parseDuration is also not exported.',
  'gpt:08:thin':
    '126 words, four bullets, both bugs and the O(n) scan. The most efficient review.',
  'gpt:08:thick':
    'Both bugs caught, but rated major rather than blocker, and only three findings. Misses performance and test gaps.',

  'haiku1:07:thin':
    '92 lines with days through seconds, whitespace and duplicate-unit rejection. Clean.',
  'haiku1:07:thick':
    'Correct and thoroughly tested, but 73 lines — over the 60-line limit.',
  'haiku1:08:thin':
    'Clear and structured; both bugs plus memory growth and global-array cost. Good.',
  'haiku1:08:thick':
    'Both blockers, eight findings, exact format. Strong.',

  'haiku2:07:thin':
    '72 lines with ms through weeks and whitespace. Clean, though duplicate units are not rejected.',
  'haiku2:07:thick':
    '47 lines, strict grammar and three test blocks. One of the best fits.',
  'haiku2:08:thin':
    'Both bugs, per-key cost, monotonic clock and validation. Well organized.',
  'haiku2:08:thick':
    'Both blockers, eight findings, exact format. Strong.',

  'hy4:07:thin':
    '94 lines with ms through weeks. Returns 0 for an empty string, which is a debatable choice.',
  'hy4:07:thick':
    '57 lines, a clear parser and five test blocks. Strong.',
  'hy4:08:thin':
    'Both bugs, plus allocation and boundary notes. Slightly long, but accurate.',
  'hy4:08:thick':
    'Both blockers, eight findings, exact format. Strong.',

  'muse1:07:thin':
    '143 lines with full unit names and bare-number seconds. Capable, but overbuilt.',
  'muse1:07:thick':
    '41 lines, a character-by-character parser and nine tests. Compact and correct.',
  'muse1:08:thin':
    'Both bugs with a clear type-coercion explanation; longer, but accurate.',
  'muse1:08:thick':
    'Both blockers, eight findings, exact format. Strong; the run has fidelity caveats elsewhere.',

  'muse2:07:thin':
    '26 lines, very compact, with many units and bare numbers. The leanest thin solution. The saved file is a trimmed version (1.8 KB vs 6.7 KB).',
  'muse2:07:thick':
    '43 lines, a compact parser and nine tests. Correct; not exported.',
  'muse2:08:thin':
    'Both bugs, concise and clear. The saved file is a trimmed version (2.2 KB vs 5.8 KB).',
  'muse2:08:thick':
    'Both blockers, eight findings, exact format. Strong; the run has fidelity caveats elsewhere.',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function proseWords(s) {
  return s
    .replace(/[#*_`>\[\]()]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

function fictionWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function formatTps(value) {
  const tps = Number(value);
  if (!Number.isFinite(tps) || tps <= 0) return '—';
  return tps >= 10 ? `${Math.round(tps)}` : `${Math.round(tps * 10) / 10}`;
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  if (total < 60) return `${total}s`;
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  if (minutes < 60) return `${minutes}m ${rest < 10 ? '0' : ''}${rest}s`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins < 10 ? '0' : ''}${mins}m`;
}

function noteWords(html) {
  const m = html.match(/<!--(.*?)-->/s);
  if (!m) return null;
  return proseWords(m[1].replace(/<[^>]+>/g, ' '));
}

function findingsCount(md) {
  return md.split('\n').filter((line) => /^\s*\[(blocker|major|minor|nit)\]/i.test(line)).length;
}

function inline(s) {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return out;
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let para = [];
  let list = [];
  let code = [];
  let inCode = false;

  const flushPara = () => {
    if (para.length) {
      html += `<p>${inline(para.join(' '))}</p>`;
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      html += `<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`;
      list = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      flushPara();
      flushList();
      if (inCode) {
        html += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
        code = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushPara();
      flushList();
      const level = Math.min(4, heading[1].length) + 1;
      html += `<h${level}>${inline(heading[2])}</h${level}>`;
      continue;
    }
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      flushPara();
      list.push(bullet[1]);
      continue;
    }
    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  if (inCode) html += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
  return html;
}

function reviewToHtml(md) {
  return md
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      const s = line.trim();
      if (!s) return '';
      const m = s.match(/^\[(blocker|major|minor|nit)\]\s*(.*)$/i);
      if (m) {
        const sev = m[1].toLowerCase();
        return `<p class="finding"><span class="sev ${sev}">${sev}</span><span>${inline(
          m[2]
        )}</span></p>`;
      }
      return `<p>${inline(s)}</p>`;
    })
    .join('');
}

function artifactFile(model, task, variant) {
  const base =
    task.id === '08'
      ? model.reviewFile || '08-review'
      : `${task.id}-${task.slug}`;
  return `${base}.${variant}.${task.ext}`;
}

function artifactPath(model, task, variant) {
  return `artifacts/${model.folder}/${artifactFile(model, task, variant)}`;
}

function healthBadge(model) {
  return `<span class="health ${model.health}"><span class="dot"></span>${esc(
    model.healthLabel
  )}</span>`;
}

function chipsHtml(chips) {
  return `<div class="chips">${chips
    .map(
      (c) =>
        `<span class="chip${c.tone ? ` ${c.tone}` : ''}"${
          c.title ? ` title="${esc(c.title)}"` : ''
        }>${esc(c.text)}</span>`
    )
    .join('')}</div>`;
}

function noteHtml(note) {
  if (!note) return '';
  return `<div class="technical-note"><span class="note-label">Technical note</span><p>${esc(
    note
  )}</p></div>`;
}

/* ------------------------------------------------------------------ */
/*  Build artifacts                                                   */
/* ------------------------------------------------------------------ */

fs.rmSync(ART, { recursive: true, force: true });
fs.mkdirSync(ART, { recursive: true });

const artifacts = {};

for (const model of MODELS) {
  artifacts[model.id] = {};
  for (const task of TASKS) {
    artifacts[model.id][task.id] = {};
    for (const variant of ['thin', 'thick']) {
      const file = artifactFile(model, task, variant);
      const src = path.join(RESULTS, model.folder, file);
      if (!fs.existsSync(src)) {
        throw new Error(`Missing artifact: ${src}`);
      }
      const rel = `artifacts/${model.folder}/${file}`;
      const dest = path.join(OUT, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      const thumbRel = `thumbs/${model.folder}/${task.id}-${variant}.jpg`;
      const thumb = fs.existsSync(path.join(OUT, thumbRel)) ? thumbRel : null;

      const raw = fs.readFileSync(src, 'utf8');
      const bytes = Buffer.byteLength(raw);
      const chips = [{ text: variant }, { text: task.format }];
      if (['01', '02', '03', '04'].includes(task.id)) {
        chips.push({ text: task.size });
      }
      if (task.id === '04') chips.push({ text: '8s loop' });
      if (task.id === '07') chips.push({ text: 'one file' });
      if (task.id === '08') chips.push({ text: 'comments only' });
      let text = null;
      let note = NOTES[`${model.id}:${task.id}:${variant}`] || '';
      const trimmed = (TRIMMED[model.id] || []).includes(`${task.id}:${variant}`);

      if (task.id === '03') {
        const words = noteWords(raw);
        chips.push(
          words == null
            ? { text: 'no note', tone: 'warn' }
            : { text: `note ${words}w`, tone: words > 150 ? 'warn' : '' }
        );
      }
      if (task.id === '05') {
        const words = proseWords(raw);
        chips.push({
          text: `${words} words`,
          tone: words > 150 ? 'warn' : '',
        });
        text = raw;
      }
      if (task.id === '06') {
        const words = fictionWords(raw);
        chips.push({
          text: `${words} words`,
          tone: words === 100 ? '' : 'warn',
        });
        text = raw;
      }
      if (task.id === '07') {
        const lines = raw.replace(/\r?\n$/, '').split(/\r?\n/).length;
        const tests = TESTS[model.id][variant];
        chips.push({ text: `${lines} lines`, tone: variant === 'thick' && lines > 60 ? 'warn' : '' });
        chips.push({ text: `${tests} tests pass`, tone: 'ok' });
        text = raw;
      }
      if (task.id === '08') {
        if (variant === 'thick') {
          const findings = findingsCount(raw);
          chips.push({
            text: `${findings} findings`,
            tone: findings > 8 ? 'warn' : '',
          });
        } else {
          const words = proseWords(raw);
          chips.push({ text: `${words} words` });
        }
        text = raw;
      }
      const timing = TIMINGS[model.id]?.[task.id]?.[variant];
      const seconds = timing && Number.isFinite(timing.sec) ? timing.sec : null;
      const tps =
        timing && Number.isFinite(timing.tps) ? timing.tps : null;
      if (seconds != null) {
        chips.push({
          text: `took ${formatDuration(seconds)}`,
          title: 'Subagent start-to-finish, including tool use',
        });
      }
      if (tps != null) {
        chips.push({
          text: `${formatTps(tps)} tok/s`,
          title: 'Output + reasoning tokens divided by subagent elapsed time',
        });
      }
      if (trimmed) chips.push({ text: 'trimmed', tone: 'bad' });

      artifacts[model.id][task.id][variant] = {
        file,
        path: rel,
        thumb,
        bytes,
        chips,
        note,
        trimmed,
        text,
        seconds,
        tps,
        kind: task.kind,
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Layout                                                            */
/* ------------------------------------------------------------------ */

function nav(active) {
  const links = [
    ['index.html', 'Overview'],
    ['results.html', 'Results'],
    ['compare.html', 'Compare'],
    ['method.html', 'Method'],
  ];
  return `<header class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html" aria-label="Bench 08 home">
      <span class="brand-mark">B08</span>
      <span class="brand-name">Bench <em>08</em></span>
    </a>
    <nav class="nav-links" aria-label="Main">
      ${links
        .map(
          ([href, label]) =>
            `<a href="${href}"${
              active === href ? ' class="active" aria-current="page"' : ''
            }>${label}</a>`
        )
        .join('')}
    </nav>
    <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch colour theme">
      <span class="theme-glyph" aria-hidden="true"></span>
      <span class="theme-word">Theme</span>
    </button>
  </div>
</header>`;
}

function footer() {
  return `<footer class="footer">
  <div class="footer-inner">
    <div>
      <p class="footer-mark">Bench <em>08</em></p>
      <p class="footer-note">A small, open-ended benchmark. Creative work is presented, not scored. Technical work gets a note.</p>
    </div>
    <div class="footer-links">
      <a href="results.html">Results</a>
      <a href="compare.html">Compare</a>
      <a href="method.html">Method &amp; caveats</a>
      <a href="https://github.com/AFarHitman7/bench-08" target="_blank" rel="noopener">Source</a>
    </div>
  </div>
</footer>`;
}

function page({ title, description, active, body, scripts = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<script>
  (function () {
    var saved = null;
    try { saved = localStorage.getItem('bench-theme'); } catch (e) {}
    var params = new URLSearchParams(location.search);
    var q = params.get('theme');
    if (q === 'dark' || q === 'light') document.documentElement.dataset.theme = q;
    else if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
    ['task', 'model', 'variant'].forEach(function (key) {
      var value = params.get(key);
      if (value) document.documentElement.setAttribute('data-filter-' + key, value);
    });
  })();
</script>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/style.css">
</head>
<body data-page="${active}">
<a class="skip-link" href="#main">Skip to content</a>
${nav(active)}
<main id="main">
${body}
</main>
${footer()}
${scripts}
<script src="assets/app.js"></script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Media renderers                                                   */
/* ------------------------------------------------------------------ */

function mediaHtml(model, task, variant, mode = 'card') {
  const a = artifacts[model.id][task.id][variant];
  const label = `${model.label} — ${task.name} (${variant})`;
  if (task.id === '01') {
    return `<div class="poster-frame ${mode}"><img src="${a.path}" alt="Poster by ${esc(
      model.label
    )}" loading="eager"></div>`;
  }
  if (task.id === '02' || task.id === '03' || task.id === '04') {
    if (mode !== 'live' && a.thumb) {
      return `<img class="thumb" src="${a.thumb}" alt="${esc(label)}" loading="lazy">`;
    }
    const w = task.id === '04' ? 1280 : 1440;
    const h = task.id === '04' ? 720 : 900;
    return `<div class="stage ${mode}" data-w="${w}" data-h="${h}"><iframe src="${a.path}" title="${esc(
      label
    )}" loading="lazy" sandbox="allow-scripts" scrolling="no"></iframe></div>`;
  }
  if (task.id === '05' || task.id === '06') {
    return `<div class="prose ${mode}">${mdToHtml(a.text)}</div>`;
  }
  if (task.id === '07') {
    return `<pre class="code ${mode}"><code>${esc(a.text)}</code></pre>`;
  }
  if (task.id === '08') {
    return variant === 'thick'
      ? `<div class="review ${mode}">${reviewToHtml(a.text)}</div>`
      : `<div class="prose ${mode}">${mdToHtml(a.text)}</div>`;
  }
  return '';
}

/* ------------------------------------------------------------------ */
/*  Home                                                              */
/* ------------------------------------------------------------------ */

function timingStats(id) {
  const times = Object.values(artifacts[id])
    .flatMap((task) => Object.values(task))
    .map((artifact) => artifact.seconds)
    .filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (!times.length) return null;
  const sorted = [...times].sort((a, b) => a - b);
  const tpsValues = Object.values(artifacts[id])
    .flatMap((task) => Object.values(task))
    .map((artifact) => artifact.tps)
    .filter((value) => typeof value === 'number' && Number.isFinite(value))
    .sort((a, b) => a - b);
  return {
    slowest: Math.max(...times),
    median: sorted[Math.floor(sorted.length / 2)],
    medianTps: tpsValues.length
      ? tpsValues[Math.floor(tpsValues.length / 2)]
      : null,
  };
}

function modelCards() {
  return MODELS.map(
    (m) => `<article class="model-card" data-health="${m.health}">
  <div class="model-top">
    <span class="run-tag">${esc(m.run)}</span>
    ${healthBadge(m)}
  </div>
  <h3 class="model-name">${esc(m.label)}</h3>
  <p class="model-caveat">${esc(m.short)}</p>
  <div class="model-stats">
    <span><b>${m.toolCalls}</b> tool calls</span>
    <span title="Slowest single subagent, start-to-finish"><b>${(() => {
      const t = timingStats(m.id);
      return t ? formatDuration(t.slowest) : '—';
    })()}</b> slowest</span>
    <span title="Median subagent start-to-finish"><b>${(() => {
      const t = timingStats(m.id);
      return t ? formatDuration(t.median) : '—';
    })()}</b> median</span>
    <span title="Median output + reasoning tokens per second"><b>${(() => {
      const t = timingStats(m.id);
      return t && t.medianTps != null ? formatTps(t.medianTps) : '—';
    })()}</b> tok/s median</span>
    <span><b>${esc(m.fidelity.split(';')[0])}</b></span>
  </div>
  <a class="text-link" href="results.html?model=${m.id}">View results <span aria-hidden="true">→</span></a>
</article>`
  ).join('');
}

function taskRows() {
  return TASKS.map(
    (t) => `<a class="task-row" href="results.html?task=${t.id}">
  <span class="task-num">${t.id}</span>
  <span class="task-main"><b>${esc(t.name)}</b><span>${esc(t.blurb)}</span></span>
  <span class="task-format">${esc(t.format)} · ${esc(t.size)}</span>
  <span class="task-arrow" aria-hidden="true">→</span>
</a>`
  ).join('');
}

function featureCard({ modelId, taskId, variant, note }) {
  const model = MODELS.find((m) => m.id === modelId);
  const task = TASKS.find((t) => t.id === taskId);
  const a = artifacts[modelId][taskId][variant];
  return `<article class="feature-card">
  <div class="feature-media">${mediaHtml(model, task, variant, 'live')}</div>
  <div class="feature-cap">
    <div><span class="cap-num">${task.id}</span> <b>${esc(task.name)}</b></div>
    <div class="cap-model">${esc(model.label)} <span>${esc(model.run)}</span></div>
  </div>
  ${note ? `<p class="feature-note">${esc(note)}</p>` : ''}
</article>`;
}

const homeBody = `
<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="kicker">A creative benchmark in eight prompts</p>
      <h1>Six models.<br><em>Eight</em> runs.<br>Eight prompts.</h1>
      <p class="lede">A poster, an interface, a critique, a title sequence, an explainer, a story, a parser and a code review. Here is what came back.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="results.html">See the work</a>
        <a class="btn btn-ghost" href="compare.html">Compare two runs</a>
      </div>
    </div>
    <aside class="hero-sheet" aria-label="Benchmark at a glance">
      <div class="sheet-row"><span class="sheet-num">06</span><span>models</span></div>
      <div class="sheet-row"><span class="sheet-num">08</span><span>runs</span></div>
      <div class="sheet-row"><span class="sheet-num">08</span><span>tasks</span></div>
      <div class="sheet-row"><span class="sheet-num">16</span><span>prompts</span></div>
      <div class="sheet-row"><span class="sheet-num">128</span><span>artifacts</span></div>
      <p class="sheet-foot">Thin and thick variants for every task. Creative work is shown without a score.</p>
    </aside>
  </div>
</section>

<section class="section findings-section">
  <div class="section-head">
    <span class="section-num">01</span>
    <div>
      <h2>What the benchmark found</h2>
      <p>Three things matter more than a ranking.</p>
    </div>
  </div>
  <div class="findings">
    <article class="finding-item">
      <span class="finding-kicker">Technical</span>
      <h3>Code review separated the field.</h3>
      <p>Most runs found the two planted defects in the limiter. DeepSeek’s thick review missed the bigger one: <code>prune</code> compares an object to a number, so it never runs. It caught the <code>reset</code> bug, but not the type mismatch.</p>
      <a class="text-link" href="compare.html?task=08&amp;variant=thick&amp;a=deepseek&amp;b=glm">See the two reviews <span aria-hidden="true">→</span></a>
    </article>
    <article class="finding-item">
      <span class="finding-kicker">Fidelity</span>
      <h3>Two runs are not directly comparable.</h3>
      <p>Muse Spark’s saved files were rewritten, not copied: four artifacts in run 1 and seven in run 2. Treat those runs as process demos, not as the model’s one-shot output.</p>
      <a class="text-link" href="compare.html?task=02&amp;variant=thin&amp;a=muse1&amp;b=hy4">See a trimmed artifact beside a clean one <span aria-hidden="true">→</span></a>
    </article>
    <article class="finding-item">
      <span class="finding-kicker">Process</span>
      <h3>The cleanest runs were the quietest.</h3>
      <p>HY4 Flash and Claude Haiku 5.5 (run 2) used no subagent tools and saved every file exactly. DeepSeek’s subagents made 363 tool calls, browser screenshots included. GPT’s loaded 29 skills.</p>
      <a class="text-link" href="results.html?model=hy4">Browse the clean run <span aria-hidden="true">→</span></a>
    </article>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <span class="section-num">02</span>
    <div>
      <h2>The runs</h2>
      <p>Eight runs across six model families. The small line under each name is the run caveat.</p>
    </div>
  </div>
  <div class="model-grid">
    ${modelCards()}
  </div>
</section>

<section class="section featured-section">
  <div class="section-head">
    <span class="section-num">03</span>
    <div>
      <h2>A first look</h2>
      <p>Three clean artifacts, chosen because they show the range of the prompts.</p>
    </div>
  </div>
  <div class="feature-layout">
    ${featureCard({ modelId: 'hy4', taskId: '01', variant: 'thick', note: 'A poster with two inks and a hard timetable geometry.' })}
    <div class="feature-stack">
      ${featureCard({ modelId: 'haiku2', taskId: '02', variant: 'thick', note: 'A handwriting-to-LaTeX hero that shows the product instead of describing it.' })}
      ${featureCard({ modelId: 'hy4', taskId: '04', variant: 'thick', note: 'An eight-second loop with a restrained title treatment.' })}
    </div>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <span class="section-num">04</span>
    <div>
      <h2>The eight tasks</h2>
      <p>Every task has a thin brief and a thick brief. Open a task to see all sixteen results.</p>
    </div>
  </div>
  <div class="task-list">
    ${taskRows()}
  </div>
</section>

<section class="closing">
  <div>
    <p class="kicker">How to read this</p>
    <h2>Creative work is presented. Technical work gets a note.</h2>
    <p>There is no invented score for a poster, an interface or a story. The parser and code-review tasks carry a short editorial note about what worked, what broke, or what missed the brief.</p>
    <a class="btn btn-primary" href="method.html">Read the method and caveats</a>
  </div>
</section>
`;

fs.writeFileSync(
  path.join(OUT, 'index.html'),
  page({
    title: 'Bench 08 — Six models, eight runs, eight prompts',
    description:
      'A small creative benchmark across six model families and eight runs: poster, interface, critique, motion, explanation, fiction, parser and code review.',
    active: 'index.html',
    body: homeBody,
  })
);

/* ------------------------------------------------------------------ */
/*  Results                                                           */
/* ------------------------------------------------------------------ */

function resultCard(model, task, variant) {
  const a = artifacts[model.id][task.id][variant];
  const id = `${model.id}-${task.id}-${variant}`;
  return `<article class="result-card" id="${id}" data-model="${model.id}" data-task="${task.id}" data-variant="${variant}" data-kind="${task.kind}">
  <div class="result-top">
    <div class="result-who">
      <span class="result-model">${esc(model.label)}</span>
      <span class="run-tag">${esc(model.run)}</span>
    </div>
    ${healthBadge(model)}
  </div>
  <div class="result-caveat">${esc(model.short)}</div>
  <div class="result-media ${task.shape}">${mediaHtml(model, task, variant, 'card')}</div>
  <div class="result-body">
    ${chipsHtml(a.chips)}
    ${noteHtml(a.note)}
    <div class="result-links">
      <div class="link-group">
        <a class="text-link" href="artifact.html?m=${model.id}&t=${task.id}&v=${variant}">Open full <span aria-hidden="true">→</span></a>
      </div>
      <a class="text-link muted-link" href="compare.html?task=${task.id}&variant=${variant}&a=${model.id}&b=${
        model.id === 'haiku2' ? 'hy4' : 'haiku2'
      }">Compare</a>
    </div>
  </div>
</article>`;
}

function taskSection(task) {
  return `<section class="task-section" id="task-${task.id}" data-section-task="${task.id}" data-kind="${task.kind}">
  <div class="task-heading">
    <div class="task-heading-num">${task.id}</div>
    <div class="task-heading-copy">
      <h2>${esc(task.name)}</h2>
      <p>${esc(task.blurb)}</p>
    </div>
    <div class="task-heading-meta">
      <span>${esc(task.format)}</span>
      <span>${esc(task.size)}</span>
      <span>${task.kind}</span>
    </div>
  </div>
  <p class="task-brief">${esc(task.brief)}</p>
  <div class="result-grid">
    ${MODELS.map((m) => resultCard(m, task, 'thin')).join('')}
    ${MODELS.map((m) => resultCard(m, task, 'thick')).join('')}
  </div>
</section>`;
}

const resultsBody = `
<section class="page-head">
  <p class="kicker">The work</p>
  <h1>All 128 results.</h1>
  <p class="lede">Every model, every task, both variants. Filter by task, model or variant. Creative work is shown as submitted; technical work carries a note.</p>
</section>

<div class="results-controls" id="resultsControls">
  <div class="control-block control-task">
    <span class="control-label">Task</span>
    <div class="segmented" role="group" aria-label="Filter by task">
      <button type="button" class="seg is-on" data-filter-task="all" aria-label="All tasks">All</button>
      ${TASKS.map((t) => `<button type="button" class="seg" data-filter-task="${t.id}" aria-label="${t.id} — ${t.name}" title="${t.name}">${t.id}</button>`).join('')}
    </div>
  </div>
  <div class="control-block">
    <label class="control-label" for="modelFilter">Model</label>
    <select class="select" id="modelFilter">
      <option value="all">All runs</option>
      ${MODELS.map((m) => `<option value="${m.id}">${esc(m.label)} — ${esc(m.run)}</option>`).join('')}
    </select>
  </div>
  <div class="control-block">
    <span class="control-label">Variant</span>
    <div class="segmented" role="group" aria-label="Filter by variant">
      <button type="button" class="seg is-on" data-filter-variant="all">Both</button>
      <button type="button" class="seg" data-filter-variant="thin">Thin</button>
      <button type="button" class="seg" data-filter-variant="thick">Thick</button>
    </div>
  </div>
  <div class="control-block control-count">
    <span class="result-count" id="resultCount" aria-live="polite">128 results</span>
    <button type="button" class="reset-btn" id="resetFilters">Reset</button>
  </div>
</div>

<div class="results-list" id="resultsList">
  ${TASKS.map(taskSection).join('')}
</div>

<div class="empty-state" id="emptyState" hidden>
  <p>No results for that combination.</p>
  <button type="button" class="btn btn-ghost" id="emptyReset">Reset filters</button>
</div>
`;

fs.writeFileSync(
  path.join(OUT, 'results.html'),
  page({
    title: 'Results — Bench 08',
    description:
      'Browse all 128 benchmark artifacts by task, model and variant. Creative work is presented; technical work carries a short note.',
    active: 'results.html',
    body: resultsBody,
  })
);

/* ------------------------------------------------------------------ */
/*  Compare                                                           */
/* ------------------------------------------------------------------ */

const compareOptions = {
  tasks: TASKS.map((t) => ({ id: t.id, name: `${t.id} · ${t.name}`, format: t.format })),
  models: MODELS.map((m) => ({
    id: m.id,
    name: `${m.label} — ${m.run}`,
  })),
};

const compareBody = `
<section class="page-head">
  <p class="kicker">Side by side</p>
  <h1>Compare two runs.</h1>
  <p class="lede">Pick a task and a variant, then choose two runs. The panels render the saved artifact at its native size, scaled to fit.</p>
</section>

<section class="compare-controls" aria-label="Comparison controls">
  <label class="control-block">
    <span class="control-label">Task</span>
    <select class="select" id="compareTask">
      ${TASKS.map((t) => `<option value="${t.id}">${t.id} · ${esc(t.name)}</option>`).join('')}
    </select>
  </label>
  <div class="control-block">
    <span class="control-label">Variant</span>
    <div class="segmented" role="group" aria-label="Variant">
      <button type="button" class="seg" data-compare-variant="thin">Thin</button>
      <button type="button" class="seg is-on" data-compare-variant="thick">Thick</button>
    </div>
  </div>
  <label class="control-block">
    <span class="control-label">Left</span>
    <select class="select" id="compareA">
      ${MODELS.map((m) => `<option value="${m.id}">${esc(m.label)} — ${esc(m.run)}</option>`).join('')}
    </select>
  </label>
  <label class="control-block">
    <span class="control-label">Right</span>
    <select class="select" id="compareB">
      ${MODELS.map((m) => `<option value="${m.id}">${esc(m.label)} — ${esc(m.run)}</option>`).join('')}
    </select>
  </label>
  <div class="control-block compare-actions">
    <button type="button" class="btn btn-ghost" id="compareSwap">Swap</button>
    <button type="button" class="btn btn-primary" id="compareCopy">Copy link</button>
  </div>
</section>

<div class="compare-grid" id="compareGrid">
  <article class="compare-panel" id="panelA" aria-live="polite"></article>
  <article class="compare-panel" id="panelB" aria-live="polite"></article>
</div>

<p class="compare-foot">Creative work is shown without a score. Technical notes on the parser and code review are editorial observations, not an overall ranking.</p>
`;

fs.writeFileSync(
  path.join(OUT, 'compare.html'),
  page({
    title: 'Compare — Bench 08',
    description:
      'Compare any two benchmark runs side by side across poster, interface, critique, motion, writing, parser and code-review tasks.',
    active: 'compare.html',
    body: compareBody,
    scripts: '<script src="data.js"></script>',
  })
);

/* ------------------------------------------------------------------ */
/*  Artifact                                                          */
/* ------------------------------------------------------------------ */

const artifactBody = `
<section class="artifact-shell" id="artifactShell">
  <p class="kicker"><a href="results.html" class="breadcrumb">All results</a> / <span id="artifactCrumb">Artifact</span></p>
  <div id="artifactContent"></div>
</section>
`;

fs.writeFileSync(
  path.join(OUT, 'artifact.html'),
  page({
    title: 'Artifact — Bench 08',
    description: 'A single benchmark artifact with its run metadata and technical note.',
    active: 'artifact.html',
    body: artifactBody,
    scripts: '<script src="data.js"></script>',
  })
);

/* ------------------------------------------------------------------ */
/*  Method                                                            */
/* ------------------------------------------------------------------ */

function runRows() {
  return MODELS.map(
    (m) => `<tr>
  <td><b>${esc(m.label)}</b><span class="table-run">${esc(m.run)}</span></td>
  <td class="num">${m.toolCalls}</td>
  <td class="num">${(() => {
      const t = timingStats(m.id);
      return t ? formatDuration(t.slowest) : '—';
    })()}</td>
  <td class="num">${(() => {
      const t = timingStats(m.id);
      return t && t.medianTps != null ? formatTps(t.medianTps) : '—';
    })()}</td>
  <td>${esc(m.fidelity)}</td>
  <td><span class="health ${m.health}"><span class="dot"></span>${esc(
      m.healthLabel
    )}</span><span class="table-caveat">${esc(m.short)}</span></td>
</tr>`
  ).join('');
}

function taskRowsMethod() {
  return TASKS.map(
    (t) => `<tr>
  <td><span class="table-num">${t.id}</span> <b>${esc(t.name)}</b></td>
  <td>${esc(t.format)}</td>
  <td>${esc(t.brief)}</td>
</tr>`
  ).join('');
}

const methodBody = `
<section class="page-head">
  <p class="kicker">Method &amp; caveats</p>
  <h1>What this is, and what it is not.</h1>
  <p class="lede">A small benchmark of one-shot creative and technical work. Eight tasks, two variants, one model per run. The caveats are part of the result.</p>
</section>

<section class="method-section">
  <h2>The shape of the test</h2>
  <div class="method-cols">
    <div>
      <p>Each run received the same sixteen prompts: eight tasks, each in a <b>thin</b> variant (intent only) and a <b>thick</b> variant (a full brief with audience, constraints and success criteria).</p>
      <p>Subagents were asked to return exactly one self-contained file. No network requests, no external images or libraries, no build step. The orchestrator collected the reply and saved it.</p>
    </div>
    <div>
      <p>The tasks are deliberately different: visual composition, interface design, critique, motion, explanation, fiction, implementation and code review. There is no single score that makes sense across all eight.</p>
      <p>Creative work is therefore presented without a number. The parser and code-review tasks carry a short technical note because those tasks have verifiable failure modes.</p>
      <p>Tok/s is <b>(output + reasoning tokens) ÷ subagent elapsed time</b>. It includes thinking and tool time, so it is end-to-end throughput, not raw decode speed.</p>
    </div>
  </div>
</section>

<section class="method-section">
  <h2>The eight tasks</h2>
  <div class="table-wrap">
    <table class="data-table">
      <thead><tr><th>Task</th><th>Format</th><th>Brief</th></tr></thead>
      <tbody>${taskRowsMethod()}</tbody>
    </table>
  </div>
</section>

<section class="method-section">
  <h2>Run conditions</h2>
  <p class="method-note">The runs are not identical. “Subagent tool calls” counts every tool call made by the sixteen subagents in that run. A clean run made none. Prompt time is the subagent’s start-to-finish, including tool use. It is not wall-clock: most runs dispatched in parallel batches, and HY4 ran sequentially.</p>
  <div class="table-wrap">
    <table class="data-table run-table">
      <thead><tr><th>Run</th><th>Subagent tool calls</th><th>Slowest prompt</th><th>Median tok/s</th><th>Artifact fidelity</th><th>Status</th></tr></thead>
      <tbody>${runRows()}</tbody>
    </table>
  </div>
  <p class="method-note method-footnote">Muse Spark run 2 also re-ran three prompts after wording errors; the saved artifacts use the corrected prompts. Its first review attempt used a different fixture and was discarded.</p>
</section>

<section class="method-section">
  <h2>What we checked</h2>
  <ul class="check-list">
    <li>Every expected artifact exists and parses as its declared format.</li>
    <li>SVG dimensions, HTML self-containment, non-empty MJS and Markdown.</li>
    <li>Both build tasks run their own tests with <code>node --test</code>; all saved tests pass.</li>
    <li>Word counts for the 100-word story and the 150-word explainer; note length on the critique.</li>
    <li>Technical notes on the two code tasks: whether the review found the planted defects, and whether the parser meets its brief.</li>
    <li>No subagent read another task’s output; no artifact contains an external URL.</li>
  </ul>
</section>

<section class="method-section">
  <h2>Limitations</h2>
  <ul class="check-list">
    <li><b>Not a leaderboard.</b> These are eight runs, not a statistically meaningful sample. One run per model except Claude Haiku 5.5 and Muse Spark 1.3.</li>
    <li><b>Two runs are not comparable.</b> Muse Spark’s saved files were trimmed and, in run 2, not disclosed. They are included for transparency, with a “Not comparable” badge.</li>
    <li><b>Process differs.</b> DeepSeek’s subagents used a browser and wrote working files; GPT’s loaded skills. Those runs are marked as caveats, not hidden.</li>
    <li><b>Creative work is unscored.</b> Posters, interfaces, motion, fiction and critique are shown as submitted. The absence of a score is deliberate, not an oversight.</li>
  </ul>
</section>

<section class="closing method-closing">
  <div>
    <p class="kicker">A note on labels</p>
    <h2>Every card names the model and the run.</h2>
    <p>Claude Haiku 5.5 and Muse Spark 1.3 have two runs each. The run badge is part of the result, not a detail to ignore.</p>
    <a class="btn btn-primary" href="results.html">Browse the results</a>
  </div>
</section>
`;

fs.writeFileSync(
  path.join(OUT, 'method.html'),
  page({
    title: 'Method & caveats — Bench 08',
    description:
      'How the Bench 08 creative benchmark was run, what was checked, and why two runs are marked as not comparable.',
    active: 'method.html',
    body: methodBody,
  })
);

/* ------------------------------------------------------------------ */
/*  Runtime data                                                      */
/* ------------------------------------------------------------------ */

const runtime = {
  models: MODELS,
  tasks: TASKS,
  artifacts,
};

fs.writeFileSync(path.join(OUT, 'data.js'), `window.BENCH = ${JSON.stringify(runtime, null, 2)};\n`);

console.log('Built site:', OUT);
console.log('Artifacts copied:', Object.keys(artifacts).length * 16);

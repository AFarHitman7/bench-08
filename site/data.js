window.BENCH = {
  "models": [
    {
      "id": "deepseek",
      "label": "DeepSeek 4.1 Flash",
      "run": "Run 1",
      "folder": "deepseek-4-1-flash-run-1",
      "health": "caveat",
      "healthLabel": "Tool-assisted",
      "short": "Subagents used a browser to refine their work.",
      "detail": "16 subagents made 363 tool calls, including 79 writes inside the repo and 8 Playwright/npx calls. The saved files are refined results, not one-shot answers.",
      "toolCalls": 363,
      "fidelity": "16/16 saved; run used tools",
      "reviewFile": "08-code-review"
    },
    {
      "id": "glm",
      "label": "GLM 5.3",
      "run": "Run 1",
      "folder": "glm-5-3-run-1",
      "health": "caveat",
      "healthLabel": "One repair",
      "short": "One malformed CSS line was repaired after saving.",
      "detail": "The orchestrator changed a comma to a semicolon in one critique artifact after the file was written. Everything else is byte-exact.",
      "toolCalls": 3,
      "fidelity": "16/16; one CSS repair",
      "reviewFile": "08-review"
    },
    {
      "id": "gpt",
      "label": "GPT 6 Luna",
      "run": "Run 1",
      "folder": "gpt-6-luna-run-1",
      "health": "caveat",
      "healthLabel": "Skill-assisted",
      "short": "Subagents loaded skills; two files were edited after saving.",
      "detail": "Subagents made 30 tool calls, almost all skill loads. The orchestrator also removed a duplicate nav link and four opacity values from saved artifacts.",
      "toolCalls": 30,
      "fidelity": "14/16 exact; 2 post-edits",
      "reviewFile": "08-code-review"
    },
    {
      "id": "haiku1",
      "label": "Claude Haiku 5.5",
      "run": "Run 1",
      "folder": "haiku-5-5",
      "health": "caveat",
      "healthLabel": "One unfenced reply",
      "short": "One review arrived without a fenced block.",
      "detail": "The thick code review came back as bare markdown and was accepted without the required retry. The other 15 artifacts match the replies.",
      "toolCalls": 0,
      "fidelity": "16/16; one unfenced reply",
      "reviewFile": "08-review"
    },
    {
      "id": "haiku2",
      "label": "Claude Haiku 5.5",
      "run": "Run 2",
      "folder": "haiku-5-5-run-2",
      "health": "clean",
      "healthLabel": "Clean run",
      "short": "No subagent tools; one identical retry.",
      "detail": "The thin code review arrived unfenced and was retried once with the identical prompt. All 16 saved files match the final replies.",
      "toolCalls": 0,
      "fidelity": "16/16 exact; one allowed retry",
      "reviewFile": "08-review"
    },
    {
      "id": "hy4",
      "label": "HY4 Flash",
      "run": "Run 1",
      "folder": "hy4-flash-run-1",
      "health": "clean",
      "healthLabel": "Clean run",
      "short": "No subagent tools; all 16 files byte-exact.",
      "detail": "The quietest run in the set: every subagent returned a file directly, with no tool calls and no post-saving edits.",
      "toolCalls": 0,
      "fidelity": "16/16 exact",
      "reviewFile": "08-review"
    },
    {
      "id": "muse1",
      "label": "Muse Spark 1.3",
      "run": "Run 1",
      "folder": "muse-spark-1-3-run-1",
      "health": "broken",
      "healthLabel": "Not comparable",
      "short": "Four visual files were saved trimmed.",
      "detail": "The orchestrator disclosed that four large visual artifacts were not byte-exact. The saved files are shorter rewrites, so treat them as process demos.",
      "toolCalls": 5,
      "fidelity": "12/16 exact; 4 trimmed",
      "reviewFile": "08-review"
    },
    {
      "id": "muse2",
      "label": "Muse Spark 1.3",
      "run": "Run 2",
      "folder": "muse-spark-1-3-run-2",
      "health": "broken",
      "healthLabel": "Not comparable",
      "short": "Seven files saved trimmed; three prompts re-run after wording errors.",
      "detail": "Seven saved artifacts are substantially shorter than the subagent replies. Three prompts were also re-run after wording errors. Treat the run as a process demo.",
      "toolCalls": 1,
      "fidelity": "9/16 near-exact; 7 trimmed",
      "reviewFile": "08-review"
    }
  ],
  "tasks": [
    {
      "id": "01",
      "slug": "poster",
      "name": "Poster",
      "format": "SVG",
      "size": "1080 × 1350",
      "ext": "svg",
      "kind": "creative",
      "blurb": "A late-night ferry crossing, built from type and hard geometry.",
      "brief": "The Last Ferry, 11:40pm — a poster for a crossing between San Remo and the island of Vell. Two inks, one paper tone, a condensed grotesque and a monospace timetable.",
      "shape": "portrait"
    },
    {
      "id": "02",
      "slug": "interface",
      "name": "Interface",
      "format": "HTML",
      "size": "1440 × 900",
      "ext": "html",
      "kind": "creative",
      "blurb": "A hero and value section for a handwriting-to-LaTeX tool.",
      "brief": "Inkwell — photograph a page of handwriting, get clean LaTeX back. The hero must show a handwritten page beside its rendered output.",
      "shape": "landscape"
    },
    {
      "id": "03",
      "slug": "critique",
      "name": "Critique",
      "format": "HTML",
      "size": "1440 × 900",
      "ext": "html",
      "kind": "creative",
      "blurb": "Diagnose and repair a generic ferry landing page.",
      "brief": "A shipped landing page is supplied as a fixture. Find the five most damaging problems, repair them, and record what changed in a note of at most 150 words.",
      "shape": "landscape"
    },
    {
      "id": "04",
      "slug": "motion",
      "name": "Motion",
      "format": "HTML",
      "size": "1280 × 720",
      "ext": "html",
      "kind": "creative",
      "blurb": "An eight-second looping title card for the word DRIFT.",
      "brief": "A title card for a short film about a night ferry crossing. The word must rest legibly for at least two seconds, and the loop seam must be invisible.",
      "shape": "landscape"
    },
    {
      "id": "05",
      "slug": "explanation",
      "name": "Explanation",
      "format": "Markdown",
      "size": "≤ 150 words",
      "ext": "md",
      "kind": "writing",
      "blurb": "Explain DNS to someone who has never thought about it.",
      "brief": "Cover the problem DNS solves, what happens between typing an address and the page appearing, why answers are remembered, and what usually goes wrong.",
      "shape": "text"
    },
    {
      "id": "06",
      "slug": "fiction",
      "name": "Fiction",
      "format": "Markdown",
      "size": "100 words",
      "ext": "md",
      "kind": "writing",
      "blurb": "A 100-word story containing a clock that is wrong.",
      "brief": "A workplace after hours, third person, one character. The clock must earn its place: something in the story depends on it.",
      "shape": "text"
    },
    {
      "id": "07",
      "slug": "build",
      "name": "Build",
      "format": "MJS",
      "size": "one file",
      "ext": "mjs",
      "kind": "technical",
      "blurb": "Write a duration parser, with tests, in one file.",
      "brief": "parseDuration(\"1h30m\") returns seconds. It accepts h, m and s in any order, rejects invalid input with TypeError, and runs its own tests with node:test.",
      "shape": "text"
    },
    {
      "id": "08",
      "slug": "review",
      "name": "Code review",
      "format": "Markdown",
      "size": "comments only",
      "ext": "md",
      "kind": "technical",
      "blurb": "Review a rate limiter. Comments only; do not rewrite it.",
      "brief": "The fixture is a small keyed limiter. The thick version asks for severity, location, problem, why it matters and a direction, in at most eight findings.",
      "shape": "text"
    }
  ],
  "artifacts": {
    "deepseek": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/deepseek-4-1-flash-run-1/01-poster.thin.svg",
          "thumb": null,
          "bytes": 33865,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/deepseek-4-1-flash-run-1/01-poster.thick.svg",
          "thumb": null,
          "bytes": 3189,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/02-interface.thin.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/02-thin.jpg",
          "bytes": 22367,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/02-interface.thick.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/02-thick.jpg",
          "bytes": 28219,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/03-critique.thin.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/03-thin.jpg",
          "bytes": 18250,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 132w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/03-critique.thick.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/03-thick.jpg",
          "bytes": 17510,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 127w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/04-motion.thin.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/04-thin.jpg",
          "bytes": 14970,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/deepseek-4-1-flash-run-1/04-motion.thick.html",
          "thumb": "thumbs/deepseek-4-1-flash-run-1/04-thick.jpg",
          "bytes": 4591,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/05-explanation.thin.md",
          "thumb": null,
          "bytes": 830,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "142 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nEvery website has an address made of numbers, like `142.250.72.14`. Computers need that number to find the server. People are bad at remembering numbers, so we give them names: `google.com`.\n\nDNS is the system that turns a name into a number, automatically, in milliseconds. It works like a contacts app for the whole internet.\n\nWhen you type a name, your computer asks a resolver — usually run by your internet provider or a company like Cloudflare. If the resolver doesn't already know the answer, it asks further up the chain: the root servers, then the servers for `.com`, then the servers for the site itself. Someone finally answers with the number, and it's cached so the next request is instant.\n\nThink of it as directory assistance: you know the name, not the number, and something looks it up for you.",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/05-explanation.thick.md",
          "thumb": null,
          "bytes": 866,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "149 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS works\n\nComputers find each other by number, not by name. DNS (the domain name system) is the lookup service that turns a name you type, like example.com, into the number that locates it, its IP address.\n\nYour browser asks your internet provider's resolver, a computer whose only job is to answer this question. The resolver asks other computers, each holding a slice of the list, until one returns the number. The browser then loads the page from that address.\n\nAnswers are cached (copied and kept) because names rarely change and repeating the whole search each time would be slow.\n\nIt usually fails when that saved copy expires and the server holding the real answer can't be reached, or your device is pointed at a broken resolver, giving you \"DNS server not responding.\"\n\nThink of a librarian who doesn't know the answer but knows which shelf to check.",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/06-fiction.thin.md",
          "thumb": null,
          "bytes": 537,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The clock above the stairs stopped at 4:17, and nobody wound it again. Mara noticed the silence before the dust: a held breath where the house used to tick. For years that sound had measured her evenings. Now the brass hands held nothing, patient as stones. She climbed past without looking, though her body kept its old rhythm, pausing at the landing as if waiting for the hour to be named. Some things break quietly and keep their shape. In November she took it down, and the wall held a pale circle where it had been, a ghost of 4:17.",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/06-fiction.thick.md",
          "thumb": null,
          "bytes": 559,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "At 6:40 the wall clock above the copier still said the workday had twenty minutes left, so Mira kept sorting invoices without hurry. She had promised her daughter she would leave by seven. The clock was an hour slow, had been since spring, and she had learned to add the hour without thinking. Tonight she forgot. At 7:05 she stacked the last folder, pleased, and reached for her coat. Her phone lit up: three missed calls from her daughter, and the time, 8:14. The recital had started at eight. She stood in the empty office holding her coat, adding nothing.",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/deepseek-4-1-flash-run-1/07-build.thin.mjs",
          "thumb": null,
          "bytes": 7166,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "276 lines",
              "tone": ""
            },
            {
              "text": "12 tests pass",
              "tone": "ok"
            }
          ],
          "note": "Far past the thin brief: weeks, days, milliseconds, decimals and whitespace. 276 lines for a one-line ask. Correct, but overbuilt.",
          "trimmed": false,
          "text": "/**\n * parseDuration — convert a human-readable duration such as \"1h30m\" to seconds.\n *\n * Grammar (units are case-insensitive; whitespace may separate components):\n *\n *   duration  := component component*\n *   component := number unit\n *   number    := digits [ \".\" digits ] | \".\" digits\n *   unit      := \"ms\" | \"w\" | \"d\" | \"h\" | \"m\" | \"s\"\n *\n * Units: w = weeks, d = days, h = hours, m = minutes, s = seconds, ms = milliseconds.\n *\n *   parseDuration(\"1h30m\")     // 5400\n *   parseDuration(\"2d 4h\")     // 187200\n *   parseDuration(\"1.5h\")      // 5400\n *   parseDuration(\"1s 250ms\")  // 1.25\n *\n * A bare number (\"90\") is rejected because its unit would be guesswork. Unknown\n * units, repeated units, negative values and trailing text are rejected too.\n * The result is rounded to nanosecond precision to strip binary float noise.\n *\n * Run the tests:\n *   node parse-duration.mjs\n *   node --test parse-duration.mjs\n *\n * Requires Node.js 18+ (node:test).\n */\n\nimport assert from 'node:assert/strict';\nimport test from 'node:test';\n\n/** Number of seconds in one of each supported unit. */\nconst SECONDS_PER_UNIT = Object.freeze({\n  w: 7 * 24 * 60 * 60,\n  d: 24 * 60 * 60,\n  h: 60 * 60,\n  m: 60,\n  s: 1,\n  ms: 1 / 1000,\n});\n\n/** Results are rounded to this many decimal places' worth of precision. */\nconst RESULT_PRECISION = 1e9;\n\n/**\n * Parse a duration string into a number of seconds.\n *\n * @param {string} input Duration such as \"1h30m\", \"2d 4h\" or \"1.5h\".\n * @returns {number} The duration in seconds.\n * @throws {TypeError} If `input` is not a string.\n * @throws {SyntaxError} If `input` is not a valid duration.\n */\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    const received = input === null ? 'null' : typeof input;\n    throw new TypeError(`parseDuration expected a string, received ${received}`);\n  }\n\n  const source = input.trim();\n  if (source === '') {\n    throw new SyntaxError('parseDuration received an empty string');\n  }\n\n  // Fresh regex per call: no shared lastIndex state between calls.\n  const componentPattern = /(\\d+(?:\\.\\d+)?|\\.\\d+)(ms|w|d|h|m|s)/gi;\n  const seen = new Set();\n  let total = 0;\n  let cursor = 0;\n  let components = 0;\n\n  for (\n    let match = componentPattern.exec(source);\n    match !== null;\n    match = componentPattern.exec(source)\n  ) {\n    const gap = source.slice(cursor, match.index);\n    if (gap.trim() !== '') {\n      throw unexpectedChunk(input, gap);\n    }\n\n    const amount = Number(match[1]);\n    const unit = match[2].toLowerCase();\n\n    if (!Number.isFinite(amount)) {\n      throw new SyntaxError(\n        `parseDuration cannot represent the amount ${quote(match[1])} in ${quote(input)}`,\n      );\n    }\n    if (seen.has(unit)) {\n      throw new SyntaxError(\n        `parseDuration found the unit ${quote(unit)} more than once in ${quote(input)}`,\n      );\n    }\n\n    seen.add(unit);\n    total += amount * SECONDS_PER_UNIT[unit];\n    cursor = componentPattern.lastIndex;\n    components += 1;\n  }\n\n  if (components === 0) {\n    throw unexpectedChunk(input, source);\n  }\n\n  const rest = source.slice(cursor);\n  if (rest.trim() !== '') {\n    throw unexpectedChunk(input, rest);\n  }\n\n  if (!Number.isFinite(total)) {\n    throw new SyntaxError(`parseDuration produced a non-finite result for ${quote(input)}`);\n  }\n\n  return Math.round(total * RESULT_PRECISION) / RESULT_PRECISION;\n}\n\nexport default parseDuration;\n\n/** Render a value as a quoted string for error messages. */\nfunction quote(value) {\n  return JSON.stringify(value);\n}\n\n/** Build a SyntaxError for a fragment the parser could not consume. */\nfunction unexpectedChunk(input, chunk) {\n  return new SyntaxError(\n    `parseDuration could not parse ${quote(chunk.trim())} in ${quote(input)}; ` +\n      'expected components such as 1w, 2d, 3h, 4m, 5s or 250ms',\n  );\n}\n\n// ---------------------------------------------------------------------------\n// Tests\n// ---------------------------------------------------------------------------\n\ntest('parses the documented example', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n});\n\ntest('returns a number', () => {\n  assert.equal(typeof parseDuration('1h30m'), 'number');\n});\n\ntest('parses single units', () => {\n  const cases = [\n    ['0s', 0],\n    ['45s', 45],\n    ['2m', 120],\n    ['3h', 10800],\n    ['4d', 345600],\n    ['1w', 604800],\n    ['250ms', 0.25],\n  ];\n\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, input);\n  }\n});\n\ntest('parses mixed units in any order', () => {\n  const cases = [\n    ['1h30m', 5400],\n    ['30m1h', 5400],\n    ['1w2d3h4m5s', 788645],\n    ['2d4h', 187200],\n    ['1d12h', 129600],\n    ['1h1m1s', 3661],\n    ['1s500ms', 1.5],\n  ];\n\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, input);\n  }\n});\n\ntest('accepts fractional amounts', () => {\n  const cases = [\n    ['1.5h', 5400],\n    ['.5h', 1800],\n    ['2.5m', 150],\n    ['1.25s', 1.25],\n    ['1.234567s', 1.234567],\n    ['1500ms', 1.5],\n  ];\n\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, input);\n  }\n});\n\ntest('rounds away binary floating-point noise', () => {\n  assert.equal(parseDuration('0.1h'), 360);\n  assert.equal(parseDuration('1.1h'), 3960);\n});\n\ntest('ignores whitespace around and between components', () => {\n  assert.equal(parseDuration('1h 30m'), 5400);\n  assert.equal(parseDuration('  1h   30m  '), 5400);\n  assert.equal(parseDuration('1h\\t30m'), 5400);\n  assert.equal(parseDuration('1h\\n30m'), 5400);\n  assert.equal(parseDuration('1w 2d 3h 4m 5s'), 788645);\n});\n\ntest('treats units case-insensitively', () => {\n  assert.equal(parseDuration('1H30M'), 5400);\n  assert.equal(parseDuration('2D'), 172800);\n  assert.equal(parseDuration('1S500MS'), 1.5);\n});\n\ntest('is stateless across calls, including failed ones', () => {\n  assert.equal(parseDuration('1h'), 3600);\n  assert.throws(() => parseDuration('1x'), SyntaxError);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('1h30m'), 5400);\n});\n\ntest('rejects malformed durations with a SyntaxError', () => {\n  const invalid = [\n    '',\n    '   ',\n    '1',\n    '90',\n    'h',\n    'ms',\n    '1h30',\n    '1x',\n    '1hour',\n    '1h 30m!',\n    '1h,30m',\n    '1:30',\n    '1..5h',\n    '1.5.5h',\n    '1e3s',\n    '-1h',\n    '+1h',\n    '1h2h',\n    '1h 2H',\n    '1s 2s',\n    '1 h',\n    '1h 30 m',\n    'NaNh',\n    'Infinitys',\n    '1'.repeat(400) + 'h',\n  ];\n\n  for (const input of invalid) {\n    assert.throws(\n      () => parseDuration(input),\n      SyntaxError,\n      `expected ${JSON.stringify(input)} to throw`,\n    );\n  }\n});\n\ntest('rejects non-string input with a TypeError', () => {\n  const invalid = [null, undefined, 42, {}, [], true];\n\n  for (const input of invalid) {\n    assert.throws(\n      () => parseDuration(input),\n      TypeError,\n      `expected ${String(input)} to throw`,\n    );\n  }\n});\n\ntest('names the offending input in its error message', () => {\n  assert.throws(\n    () => parseDuration('1h nope'),\n    (error) => {\n      assert.ok(error instanceof SyntaxError);\n      assert.match(error.message, /\"1h nope\"/);\n      return true;\n    },\n  );\n});",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/deepseek-4-1-flash-run-1/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2211,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "57 lines",
              "tone": ""
            },
            {
              "text": "4 tests pass",
              "tone": "ok"
            }
          ],
          "note": "57 lines, a strict grammar check, clear errors and four test blocks. Strong.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst SECONDS_PER_UNIT = { h: 3600, m: 60, s: 1 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError(`parseDuration: expected a string, got ${typeof input}`);\n  }\n  if (input === '') throw new TypeError('parseDuration: empty string');\n  // Every \"<digits><unit>\" token must reassemble the input exactly; this one\n  // check rejects spaces, signs, decimals, bare numbers and unknown units.\n  const segments = input.match(/\\d+[hms]/gi) ?? [];\n  if (segments.join('') !== input) {\n    throw new TypeError(`parseDuration: invalid duration \"${input}\"; expected segments like \"1h30m\"`);\n  }\n  const seen = new Set();\n  let total = 0;\n  for (const segment of segments) {\n    const unit = segment.at(-1).toLowerCase();\n    if (seen.has(unit)) throw new TypeError(`parseDuration: unit \"${unit}\" repeated in \"${input}\"`);\n    seen.add(unit);\n    total += Number(segment.slice(0, -1)) * SECONDS_PER_UNIT[unit];\n  }\n  return total;\n}\n\ntest('single segments', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('2h'), 7200);\n});\n\ntest('multiple segments, any order, any case', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('30m1h'), 5400);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n});\n\ntest('composite', () => {\n  assert.equal(parseDuration('1h2m3s'), 3723);\n  assert.equal(parseDuration('2m1h3s'), 3723);\n});\n\ntest('rejections', () => {\n  assert.throws(() => parseDuration(''), /empty/);\n  assert.throws(() => parseDuration('1d'), /invalid duration/);\n  assert.throws(() => parseDuration('1h2H'), /repeated/);\n  assert.throws(() => parseDuration('90'), /invalid duration/);\n  assert.throws(() => parseDuration('-5s'), /invalid duration/);\n  assert.throws(() => parseDuration('1.5h'), /invalid duration/);\n  assert.throws(() => parseDuration('1h 30m'), /invalid duration/);\n  assert.throws(() => parseDuration(42), TypeError);\n  assert.throws(() => parseDuration(null), TypeError);\n  assert.throws(() => parseDuration(undefined), TypeError);\n});",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-code-review.thin.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/08-code-review.thin.md",
          "thumb": null,
          "bytes": 7163,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "1117 words"
            }
          ],
          "note": "Catches both bugs and adds cardinality and key-coercion notes. But 1,172 words with code snippets goes well past “comments only”.",
          "trimmed": false,
          "text": "# Review: `createLimiter`\n\nOverall shape is clean and the injected `now` is a good call for testability, but there is one defect that makes the limiter not work as designed, plus a second that corrupts state on reset.\n\n## Critical\n\n**1. `prune` never removes anything — it compares an object to a number.**\n\n```js\nwhile (hits.length && hits[0] < t - windowMs) hits.shift();\n```\n\n`hits[0]` is `{ key, time }`, not a timestamp. `<` coerces it via `ToPrimitive` → `\"[object Object]\"` → `NaN`, and `NaN < anything` is `false`. The loop body is unreachable dead code.\n\nConsequences:\n\n- `hits` grows monotonically for the lifetime of the limiter; nothing is ever expired.\n- The limiter silently degrades from a sliding window into a **lifetime quota**: after a key accumulates `limit` hits, it is blocked forever.\n- `reset(key)` is the only way to recover a key, which is almost certainly not the intent.\n- Unbounded array growth is a memory-exhaustion vector on a public-facing endpoint.\n\nThe stored `time` field being otherwise unused is the tell that `prune` was meant to read `.time`:\n\n```js\nwhile (hits.length && hits[0].time < t - windowMs) hits.shift();\n```\n\n**2. `reset(key)` skips entries.**\n\n```js\nfor (let i = 0; i < hits.length; i++) {\n  if (hits[i].key === key) hits.splice(i, 1);\n}\n```\n\n`i` advances after the splice, so the element that shifts into position `i` is never examined. Two consecutive hits for the same key → only the first is removed. With the critical bug above unfixed this is hard to notice; once `prune` works, `reset` will leave residue behind and the key will still be rate-limited (or be limited sooner than expected).\n\nIterate backwards, or compact once:\n\n```js\nfor (let i = hits.length - 1; i >= 0; i--) {\n  if (hits[i].key === key) hits.splice(i, 1);\n}\n```\n\n## High\n\n**3. Complexity and memory are O(total hits) per call, not O(per-key hits).**\n\nEvery `allow` call does a full `hits.filter(...)` over *all* keys, and each pruned entry costs an O(n) `Array.prototype.shift`. Under load this is O(n²) in the number of events in the window, on the hot path, for every request.\n\nThe structure also conflates tenants: one noisy key makes every other key's `allow` slower. Since the whole point of a keyed limiter is per-key isolation, consider a `Map<key, bucket>`, with each bucket a ring buffer or a small array plus a head index, and delete buckets when empty. Amortize pruning with an index that advances instead of `shift()`.\n\n**4. Unbounded cardinality is a DoS surface.**\n\nNothing limits the number of distinct keys. An attacker rotating keys (IPs, tokens, user-agents) fills `hits` without ever tripping any single key's limit. Even with pruning fixed, the array holds one entry per unique key per window and is re-scanned per call. A cap on tracked keys, an LRU, or a coarse fallback bucket is worth adding.\n\n## Medium\n\n**5. Non-primitive and `NaN` keys never match themselves.**\n\n`hits.filter(h => h.key === key)` uses strict equality. A `NaN` key (or an object key that is recreated per call) never equals itself, so `n` stays 0, `allow` always returns `true`, and a fresh entry is pushed every call — an unbounded push loop that bypasses the limit entirely. Either normalize keys (`String(key)`) or validate/normalize at the boundary.\n\n**6. The documented contract silently depends on a monotonic clock.**\n\n`prune` inspects only `hits[0]`, which is correct only if insertions are time-ordered. If the injected `now` returns a value lower than a previous call (a fake clock in tests that gets rewound, NTP step, or a test that stubs `now` per-case), the head is newer than its successor, pruning stops early, and stale entries behind it are retained indefinitely. Either state the invariant explicitly in a comment/JSDoc, or scan instead of peeking at index 0.\n\n**7. Window boundary is strict, so the effective window is longer than `windowMs`.**\n\n`hits[0].time < t - windowMs` keeps an entry whose timestamp is exactly `t - windowMs`. An event at `t = 0` still counts against a call at `t = 1000` with `windowMs = 1000`. Depending on the semantics you want, `<=` may be the honest comparison. Whichever you pick, it should be deliberate and commented, because it changes the observable limit at the boundary.\n\n**8. No argument validation.**\n\n- `limit = 0` blocks every call; `limit < 0` likewise. May be intended, but worth a guard or a documented assert.\n- `limit = NaN` makes `n >= limit` always false → limiter always allows. A config typo silently disables rate limiting.\n- `windowMs = NaN` makes `t - windowMs` NaN → `prune` never fires → unbounded growth.\n- Negative `windowMs` grows the array faster than calls arrive.\n\nValidate once at construction and throw, rather than failing open under a typo.\n\n**9. Rejected attempts are not recorded.**\n\nThis is a legitimate sliding-window-log design (only admitted events consume budget), but it means a caller hammering the endpoint never extends its own lockout, and it differs from the intuition many reviewers have. Worth a one-line comment on `allow`, since the difference matters for abuse handling.\n\n**10. Reentrancy through `now`.**\n\n`now()` is called while `hits` is in a known-good state, but it is user-supplied and could call back into `allow`/`reset` synchronously. Low probability, but if you keep the injection point, either document that `now` must be pure or compute `t` outside the mutable region. (Minor, listed for completeness.)\n\n## Low / API polish\n\n**11. No visibility into the decision.** `allow` returns a bare boolean, so callers cannot emit `Retry-After` / `X-RateLimit-Remaining`. Returning `{ allowed, remaining, resetAt }` (or adding a `remaining(key)` accessor) costs little and is usually needed by the HTTP layer immediately.\n\n**12. `reset` returns nothing.** Returning the number of entries removed is useful for logs and tests, and makes the \"skips entries\" bug above testable.\n\n**13. Naming.** `hits` holds `{ key, time }` records, not just hits — `events` or `log` reads better against `hits.filter`. Minor, but the current name obscures that it is a per-key log.\n\n**14. Scope is per-instance only.** If this is constructed per request or per worker, the limit is not global across a multi-process / multi-instance deployment. Not a code defect, but it should be stated so nobody assumes distributed enforcement. A shared store (Redis, etc.) is required for that.\n\n**15. Missing tests for the exact bugs above.** Worth adding before fixing:\n- hits at `t = 0`, then calls throughout `0 < t < windowMs`, then a call at `t = windowMs + 1` must be allowed.\n- two consecutive allowed calls, then `reset(key)`, then `limit` fresh calls must all be allowed (catches bug 2).\n- `now` returning identical timestamps for many calls.\n- key `NaN` / object key must not bypass the limit.\n\n## Suggested order of work\n\n1. Fix `prune` (`hits[0].time`) and `reset` (iterate backwards) — smallest diff that makes the module behave as advertised.\n2. Add argument validation and key normalization.\n3. Replace the global array with per-key buckets once correctness is locked in; that change is invisible to callers and can land separately.",
          "kind": "technical"
        },
        "thick": {
          "file": "08-code-review.thick.md",
          "path": "artifacts/deepseek-4-1-flash-run-1/08-code-review.thick.md",
          "thumb": null,
          "bytes": 2913,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Misses the headline bug: prune compares an object to a number and never runs. It treats prune as an ordering assumption instead. reset is correctly caught, and the format is right.",
          "trimmed": false,
          "text": "[blocker] `reset` loop, lines 17–21 — `hits.splice(i, 1)` pulls the next hit into index `i` and the loop's `i++` then skips it, so only every other same-key hit is removed and the key stays half-spent — after a \"reset\" `allow` still returns `false`, which is the whole point of the method — iterate downward (`for (let i = hits.length - 1; i >= 0; i--)`) or rebuild the array with a filter.\n[major] `prune`, line 5 — it only inspects `hits[0]`, so it assumes the array is time-sorted, but `now` is injectable and nothing enforces monotonicity; a backward clock step (common in tests and NTP corrections) leaves expired entries stranded behind newer ones forever — the key stays exhausted and the array grows without bound — prune by scanning for all entries older than `t - windowMs`, or keep per-key buckets pruned from their own timestamps, and document whether `now` must be monotonic.\n[major] `allow`, lines 12–13 and 5 — `hits.filter(...)` walks every key's hits on each call while `prune` removes one element per `shift()` (O(n) each), so per-call cost grows with the whole window and a burst is O(n²) on a hot path — store a `Map<key, timestamps[]>` and count/prune only the caller's bucket.\n[major] `hits` array, lines 2 and 14 — retention is bounded per key (`limit`) but not across keys, so a limiter keyed by IP or token accumulates up to `limit × distinct keys` live entries in a window and a high-cardinality source grows it without limit — cap tracked keys with an LRU/eviction policy or state explicitly that key cardinality must be bounded by the caller.\n[major] `allow` return value, lines 13–15 — a bare boolean gives no `remaining` or `retryAfterMs`, so callers cannot emit `Retry-After` or feedback without guessing, and there is no side-effect-free way to inspect state (a probe records a hit) — return `{ allowed, remaining, retryAfterMs }` and add a non-mutating `peek(key)`.\n[minor] `prune` comparison, line 5 — strict `hits[0] < t - windowMs` keeps a hit recorded exactly `windowMs` ago, so the effective window is `windowMs` plus clock granularity and the boundary is unspecified — document inclusive vs exclusive and use `<=` if the window must be exact.\n[minor] options destructuring, line 1 — `limit`, `windowMs` and `now` are unvalidated: `limit: 0` silently denies everything, `windowMs: 0` collapses the window to one millisecond, negative/`NaN`/`Infinity` pass straight through, and a `now` returning a non-number corrupts every comparison — validate or clamp at construction and document what `0` means.\n[minor] module tests — there are none, and no assertion-accessible state; the injected `now` is the only seam and nothing pins partial reset (see the blocker), per-key isolation, the exact-limit boundary (`n >= limit` allows precisely `limit`), or the line-5 boundary — add tests driven by a manual clock covering those four cases.",
          "kind": "technical"
        }
      }
    },
    "glm": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/glm-5-3-run-1/01-poster.thin.svg",
          "thumb": null,
          "bytes": 15572,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/glm-5-3-run-1/01-poster.thick.svg",
          "thumb": null,
          "bytes": 4663,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/glm-5-3-run-1/02-interface.thin.html",
          "thumb": "thumbs/glm-5-3-run-1/02-thin.jpg",
          "bytes": 16351,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/glm-5-3-run-1/02-interface.thick.html",
          "thumb": "thumbs/glm-5-3-run-1/02-thick.jpg",
          "bytes": 27646,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/glm-5-3-run-1/03-critique.thin.html",
          "thumb": "thumbs/glm-5-3-run-1/03-thin.jpg",
          "bytes": 23294,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 120w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/glm-5-3-run-1/03-critique.thick.html",
          "thumb": "thumbs/glm-5-3-run-1/03-thick.jpg",
          "bytes": 9225,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 141w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/glm-5-3-run-1/04-motion.thin.html",
          "thumb": "thumbs/glm-5-3-run-1/04-thin.jpg",
          "bytes": 12649,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/glm-5-3-run-1/04-motion.thick.html",
          "thumb": "thumbs/glm-5-3-run-1/04-thick.jpg",
          "bytes": 5805,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/glm-5-3-run-1/05-explanation.thin.md",
          "thumb": null,
          "bytes": 890,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "141 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nWhen you type a website name like `example.com`, your computer doesn't actually know where that site lives. Computers find each other using numeric addresses (IP addresses, like `93.184.216.34`), not names.\n\nDNS — the **Domain Name System** — is the internet's phone book. It translates human-friendly names into machine-friendly numbers.\n\nHere's the journey when you visit a site:\n\n1. **Your device** asks a DNS resolver (usually run by your internet provider or a service like Google's) for the address.\n2. **The resolver** asks a chain of servers: first a root server (which points the way), then a server managing `.com` addresses, then the site's own DNS server.\n3. **That server replies** with the IP address.\n4. **Your computer connects** to that address and loads the page.\n\nThe answer is cached, so next time it's instant. All of this happens in milliseconds.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/glm-5-3-run-1/05-explanation.thick.md",
          "thumb": null,
          "bytes": 816,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "139 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS works\n\nDNS (the Domain Name System) is the internet's way of turning names into numbers. Every website lives at a numeric address, called an IP address, like 172.217.14.206. People remember names; computers need the numbers.\n\nWhen you type an address, your computer asks a DNS server (a lookup computer, usually run by your internet provider) for the number matching that name. The answer comes back, your computer uses it to fetch the page, and the page appears.\n\nThat answer is remembered, in a cache (a saved copy of recent answers), so your next visit skips the question and loads faster.\n\nWhen something goes wrong, usually the lookup fails: the DNS server can't be reached, or a remembered answer has gone stale. Your browser then reports it can't find the site, even though the site itself is fine.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/glm-5-3-run-1/06-fiction.thin.md",
          "thumb": null,
          "bytes": 603,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The station clock stopped at 4:17 on a Tuesday, and nobody ever came to fix it. Mara passed beneath it each morning, watching pigeons claim the unmoving hands as perches. Seasons changed around the frozen face while travelers glanced up, frowned, and quietly checked their phones. One evening she brought a chair, climbed, and opened the glass case. Dust had caked the gears into stillness. With a bent hairpin and patience, she coaxed one tooth forward. The minute hand shuddered, then swept onward. Below, the platform exhaled. Time, it turned out, had only been waiting for someone willing to climb.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/glm-5-3-run-1/06-fiction.thick.md",
          "thumb": null,
          "bytes": 536,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Priya stayed late to close the quarter file, trusting the wall clock; her phone was dead. It read 9:50. Its battery had been dying for months. Facilities had taped a warning underneath; she never read it. The last train left at 11:45; the numbers needed an hour. She finished when the clock said 11:10 and reached the platform with the file under her arm. The station clock said 12:52. The last train had gone. She sat on a bench until the first bus, file on her knees. At the office she read the warning twice and took the clock down.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/glm-5-3-run-1/07-build.thin.mjs",
          "thumb": null,
          "bytes": 7517,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "245 lines",
              "tone": ""
            },
            {
              "text": "9 tests pass",
              "tone": "ok"
            }
          ],
          "note": "Also overbuilt — years, aliases, signs and sub-second units — at 245 lines. Tests pass.",
          "trimmed": false,
          "text": "/**\n * parse-duration.mjs — parse human-readable duration strings into seconds.\n *\n *   parseDuration('1h30m')  // -> 5400\n *\n * Grammar (case-insensitive; whitespace is optional between number and unit\n * and between components; a leading +/- applies to the whole duration):\n *\n *   duration  := [sign] component { [whitespace] component }\n *   component := number [whitespace] unit\n *   number    := digits [ \".\" digits ]\n *   unit      := ns | us | µs | ms\n *              | s | sec | secs | second | seconds\n *              | m | min | mins | minute | minutes\n *              | h | hr | hrs | hour | hours\n *              | d | day | days\n *              | w | week | weeks\n *              | y | year | years        (1 y = 365 d)\n *\n * Sub-second units yield fractional seconds. \"-1h30m\" is -5400 (the sign\n * applies to the whole duration, not just the first component).\n * Throws TypeError for non-string input, RangeError for unparseable strings.\n *\n * Self-test: node parse-duration.mjs\n * (The suite runs whenever this module is loaded or executed.)\n */\n\nimport { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\n// Seconds per unit, keyed lowercase. A Map (not a plain object) so that\n// strings like \"constructor\" or \"toString\" cannot leak from Object.prototype.\n// Note: String#toLowerCase maps U+00B5 (µ, micro sign) to U+03BC (μ, greek\n// mu), so both spellings of \"microsecond\" are kept as keys.\nconst UNIT_SECONDS = new Map([\n  ['ns', 1e-9],\n  ['us', 1e-6],\n  ['\\u00B5s', 1e-6],\n  ['\\u03BCs', 1e-6],\n  ['ms', 1e-3],\n  ['s', 1], ['sec', 1], ['secs', 1], ['second', 1], ['seconds', 1],\n  ['m', 60], ['min', 60], ['mins', 60], ['minute', 60], ['minutes', 60],\n  ['h', 3600], ['hr', 3600], ['hrs', 3600], ['hour', 3600], ['hours', 3600],\n  ['d', 86400], ['day', 86400], ['days', 86400],\n  ['w', 604800], ['week', 604800], ['weeks', 604800],\n  ['y', 31536000], ['year', 31536000], ['years', 31536000],\n]);\n\n// One component at the start of `rest`: number, optional space, unit\n// (ASCII letters plus µ/μ/Μ), optional trailing space.\nconst COMPONENT_RE = /^(\\d+(?:\\.\\d+)?)\\s*([a-zA-Z\\u00B5\\u03BC\\u039C]+)\\s*/;\n\n/**\n * Parse a duration string and return the total seconds.\n *\n * @param {string} input - e.g. '1h30m', '1.5h', '500ms', '- 1h 30m'\n * @returns {number} seconds (fractional for sub-second units)\n * @throws {TypeError} if input is not a string\n * @throws {RangeError} if the string is empty or not a valid duration\n */\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError(\n      `parseDuration expects a string, got ${input === null ? 'null' : typeof input}`\n    );\n  }\n\n  let rest = input.trim();\n  if (rest === '') {\n    throw new RangeError('parseDuration: empty duration string');\n  }\n\n  let sign = 1;\n  if (rest[0] === '+' || rest[0] === '-') {\n    if (rest[0] === '-') sign = -1;\n    rest = rest.slice(1).trim();\n  }\n\n  let seconds = 0;\n  let components = 0;\n  while (rest !== '') {\n    const match = COMPONENT_RE.exec(rest);\n    if (match === null) {\n      throw new RangeError(`parseDuration: invalid duration near \"${rest}\"`);\n    }\n    const unitSeconds = UNIT_SECONDS.get(match[2].toLowerCase());\n    if (unitSeconds === undefined) {\n      throw new RangeError(`parseDuration: unknown unit \"${match[2]}\"`);\n    }\n    seconds += Number(match[1]) * unitSeconds;\n    components += 1;\n    rest = rest.slice(match[0].length);\n  }\n\n  if (components === 0) {\n    throw new RangeError('parseDuration: no duration components found');\n  }\n\n  const total = sign * seconds;\n  return total === 0 ? 0 : total; // normalize -0 to 0\n}\n\ntest('headline example: parseDuration(\"1h30m\") -> 5400 seconds', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n});\n\ntest('single components convert to seconds', () => {\n  const cases = [\n    ['0s', 0],\n    ['1s', 1],\n    ['90s', 90],\n    ['1sec', 1],\n    ['90secs', 90],\n    ['1m', 60],\n    ['1min', 60],\n    ['5mins', 300],\n    ['1minute', 60],\n    ['2 minutes', 120],\n    ['1h', 3600],\n    ['1hr', 3600],\n    ['2hrs', 7200],\n    ['1hour', 3600],\n    ['3 hours', 10800],\n    ['1d', 86400],\n    ['2 days', 172800],\n    ['1w', 604800],\n    ['1 week', 604800],\n    ['1y', 31536000],\n    ['1 year', 31536000],\n  ];\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);\n  }\n});\n\ntest('combined components sum up, in any order', () => {\n  const cases = [\n    ['2m30s', 150],\n    ['1h30m0s', 5400],\n    ['30m1h', 5400],\n    ['1d12h', 129600],\n    ['1w2d', 777600],\n    ['1w2d3h4m5s', 788645],\n    ['1y1w1d1h1m1s', 32230861],\n    ['1 hour 30 minutes', 5400],\n    ['1d 2h 3m', 93780],\n    ['15m15m', 1800],\n    ['0h0m30s', 30],\n    ['01h', 3600],\n  ];\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);\n  }\n});\n\ntest('units are case-insensitive', () => {\n  const cases = [\n    ['1H30M', 5400],\n    ['1Hr', 3600],\n    ['1MIN', 60],\n    ['2 Days', 172800],\n    ['1WEEK', 604800],\n  ];\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);\n  }\n});\n\ntest('whitespace is optional and tolerated everywhere', () => {\n  const cases = [\n    ['1h 30m', 5400],\n    ['1 h 30 m', 5400],\n    ['\\t1h30m\\n', 5400],\n    ['   1h   30m   ', 5400],\n    ['1 h\\t30\\nm', 5400],\n  ];\n  for (const [input, expected] of cases) {\n    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);\n  }\n});\n\ntest('a leading sign applies to the whole duration', () => {\n  assert.equal(parseDuration('-1h30m'), -5400);\n  assert.equal(parseDuration('- 1h30m'), -5400);\n  assert.equal(parseDuration('+1h30m'), 5400);\n  assert.equal(parseDuration('-30s'), -30);\n  assert.equal(parseDuration('-0h30m'), -1800);\n  assert.equal(parseDuration('+0s'), 0);\n  assert.equal(parseDuration('-0s'), 0);\n  assert.ok(Object.is(parseDuration('-0s'), 0), 'must not return -0');\n});\n\ntest('fractional and sub-second components', () => {\n  const cases = [\n    ['1.5h', 5400],\n    ['0.5h', 1800],\n    ['1.25m', 75],\n    ['0.5s', 0.5],\n    ['90.5s', 90.5],\n    ['0.001s', 0.001],\n    ['1h30.5m', 5430],\n    ['500ms', 0.5],\n    ['1000ms', 1],\n    ['1500ms', 1.5],\n    ['1ns', 1e-9],\n    ['1us', 1e-6],\n    ['1\\u00B5s', 1e-6], // µ, micro sign\n    ['1\\u00B5S', 1e-6], // µS — lowercases to greek-mu + s\n    ['1\\u03BCs', 1e-6], // μ, greek mu\n  ];\n  for (const [input, expected] of cases) {\n    const actual = parseDuration(input);\n    const eps = Math.abs(expected) * 1e-12 + 1e-15;\n    assert.ok(\n      Math.abs(actual - expected) <= eps,\n      `parseDuration(${JSON.stringify(input)}) -> ${actual}, expected ~${expected}`\n    );\n  }\n});\n\ntest('unparseable strings throw RangeError', () => {\n  const bad = [\n    '', '   ', '\\t\\n',\n    '-', '+', '- ', '+-1h',\n    'h', 'ms', 'sec', '90', '1.5', 'foo', 'Infinity',\n    '1x', '1e3ms', 'PT1H30M',\n    '1h30', '1 h 30', '1.5.5h', '1 m s',\n    '1h - 30m', '1 h -30m', '1h+',\n    '1 constructor', '1toString',\n  ];\n  for (const input of bad) {\n    assert.throws(\n      () => parseDuration(input),\n      RangeError,\n      `parseDuration(${JSON.stringify(input)})`\n    );\n  }\n});\n\ntest('non-string input throws TypeError', () => {\n  const bad = [undefined, null, 0, 90, 1.5, NaN, true, false, {}, ['1h'], () => '1h', Symbol('1h')];\n  for (const input of bad) {\n    assert.throws(() => parseDuration(input), TypeError);\n  }\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/glm-5-3-run-1/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2224,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "57 lines",
              "tone": ""
            },
            {
              "text": "3 tests pass",
              "tone": "ok"
            }
          ],
          "note": "57 lines, a strict regex and three test blocks. Strong.",
          "trimmed": false,
          "text": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\n\n// parseDuration(\"1h30m\") -> 5400. Accepts concatenated <digits><h|m|s>\n// segments, case-insensitive, any order, each unit at most once.\n// Anything else throws a TypeError naming the problem.\nexport function parseDuration(input) {\n  if (typeof input !== \"string\") {\n    throw new TypeError(`parseDuration: expected a string, got ${typeof input}`);\n  }\n  if (input === \"\") {\n    throw new TypeError(\"parseDuration: empty string\");\n  }\n  // The whole input must be one or more <digits><unit> blocks; this single\n  // check rejects unknown units, bare numbers, negatives, spaces, decimals.\n  if (!/^(?:\\d+(?:h|m|s))+$/i.test(input)) {\n    throw new TypeError(\n      `parseDuration: expected <digits><h|m|s> segments like \"1h30m\", got ${JSON.stringify(input)}`,\n    );\n  }\n  const secondsPerUnit = { h: 3600, m: 60, s: 1 };\n  const seen = new Set();\n  let total = 0;\n  // The shape check above guarantees every character belongs to exactly one\n  // <digits><unit> block, so matchAll walks those blocks with nothing left.\n  for (const [, digits, unit] of input.matchAll(/(\\d+)(h|m|s)/gi)) {\n    const key = unit.toLowerCase();\n    if (seen.has(key)) {\n      throw new TypeError(`parseDuration: unit \"${key}\" repeated in ${JSON.stringify(input)}`);\n    }\n    seen.add(key);\n    total += Number(digits) * secondsPerUnit[key];\n  }\n  return total;\n}\n\ntest(\"happy paths\", () => {\n  assert.equal(parseDuration(\"1h\"), 3600);\n  assert.equal(parseDuration(\"2h\"), 7200);\n  assert.equal(parseDuration(\"30m\"), 1800);\n  assert.equal(parseDuration(\"90s\"), 90);\n  assert.equal(parseDuration(\"0s\"), 0);\n});\n\ntest(\"case-insensitive, any order, composite\", () => {\n  assert.equal(parseDuration(\"1H2M3S\"), 3723);\n  assert.equal(parseDuration(\"3S2m1H\"), 3723);\n  assert.equal(parseDuration(\"1h30m\"), 5400);\n});\n\ntest(\"rejects invalid input with TypeError\", () => {\n  for (const bad of [\"\", \"1d\", \"1h30m15m\", \"90\", \"-1h\", 90, null]) {\n    assert.throws(() => parseDuration(bad), TypeError, `must reject ${JSON.stringify(bad)}`);\n  }\n  // The message must stay useful, not just present.\n  assert.throws(() => parseDuration(\"1h1h\"), /parseDuration: unit \"h\" repeated/);\n});\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/glm-5-3-run-1/08-review.thin.md",
          "thumb": null,
          "bytes": 6207,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "841 words"
            }
          ],
          "note": "Rewrites the whole function with inline comments — the brief says do not rewrite it. The analysis is sharp, but one comment wrongly says the loop body reads hits[0].key.",
          "trimmed": false,
          "text": "export function createLimiter({ limit = 10, windowMs = 1000, now = () => Date.now() } = {}) {\n  // [BUG, severity: critical] Type confusion between numbers and objects.\n  // `allow` pushes objects `{ key, time: t }`, but `prune` reads `hits[0]` as a\n  // raw timestamp and compares it to a number. `hits[0] < t - windowMs` coerces\n  // the object (valueOf → NaN), so the comparison is always false and the\n  // while-loop never runs. Pruning is therefore dead code in practice:\n  //   - the window never slides — old entries are never evicted;\n  //   - `hits` grows without bound for the lifetime of the limiter (memory leak);\n  //   - once the fix is attempted naively (`hits[0].time`), note that the\n  //     current loop body (`hits[0].key`) would also throw a TypeError — the\n  //     intended read is `hits[0].time`.\n  //\n  // The intended line is almost certainly:\n  //   while (hits.length && hits[0].time < t - windowMs) hits.shift();\n  //\n  // [PERF] `hits.shift()` is O(n) per eviction. Fine for small loads; if this\n  // limiter is hot, consider a head index or per-key deques.\n\n  const hits = [];\n\n  function prune(t) {\n    // [BUG, severity: critical] See above: `hits[0]` is an object, not a\n    // timestamp. This comparison never succeeds, so nothing is ever pruned.\n    while (hits.length && hits[0] < t - windowMs) hits.shift();\n  }\n\n  return {\n    allow(key) {\n      const t = now();\n      // [OK] Pruning on every call is the right place for it — it keeps\n      // eviction amortized into the hot path without a timer.\n      prune(t);\n\n      // [PERF] O(total hits across ALL keys), not O(hits for this key), and\n      // allocates a throwaway array via `filter`. With pruning broken this is\n      // O(∞). Even when fixed, one very active key degrades `allow` for every\n      // other key. A `Map<key, times[]>` (or per-key ring buffer) makes the\n      // per-key work O(1) amortized and removes the cross-key interference.\n      const n = hits.filter(h => h.key === key).length;\n\n      // [DESIGN] With the pruning bug, `n` counts hits from the beginning of\n      // time, so after the first `limit` calls per key, `allow` returns false\n      // forever — the limiter becomes a permanent denier, not a rate limiter.\n      if (n >= limit) return false;\n\n      // [BUG, severity: critical, same root cause] Pushes an object into an\n      // array that `prune` treats as a flat number array. This is the line that\n      // creates the type mismatch.\n      hits.push({ key, time: t });\n\n      // [DESIGN] On rejection, consider returning metadata (e.g. the timestamp\n      // when the key next becomes eligible, `hits[0].time + windowMs`) so\n      // callers can implement `Retry-After` behavior. A bare `false` forces\n      // them to poll.\n      return true;\n    },\n\n    reset(key) {\n      // [BUG, severity: major] Classic mutate-while-iterating-forward bug.\n      // `splice(i, 1)` shifts the next element into index `i`, then `i++`\n      // skips it. Any run of consecutive hits for the same key leaves every\n      // second entry behind — `reset` is idempotent only if called repeatedly.\n      // The backward loop (`for (let i = hits.length - 1; i >= 0; i--)`) or a\n      // rebuild (`hits = hits.filter(...)` with the array exposed differently)\n      // is the standard fix.\n      for (let i = 0; i < hits.length; i++) {\n        if (hits[i].key === key) hits.splice(i, 1);\n      }\n      // [BUG, severity: minor] `reset()` with no argument silently does\n      // nothing useful: it deletes entries whose key is `undefined`, which\n      // `allow(undefined)` could actually create (see below). A bare `reset()`\n      // should probably clear all state; currently it's a no-op trap.\n    },\n\n    // [API, minor] `allow(undefined)` and `allow(null)` all share one bucket\n    // (and create `{ key: undefined }` entries). Either coerce/validate the\n    // key or document that `undefined` is a single shared identity.\n    //\n    // [API, minor] No input validation: `limit = 0` makes the limiter reject\n    // everything (defensible, but should be documented); negative `limit` or\n    // non-finite `windowMs` produce nonsense. JSDoc on the factory would also\n    // pin down the semantics below.\n    //\n    // [DOCS, minor] The windowing semantics are \"fixed window measured\n    // backwards from now\" (a true sliding window), not wall-clock-aligned\n    // buckets and not a token bucket. Consequences worth documenting:\n    //   - a client may pass `limit` requests at the very end of one window and\n    //     another `limit` at the start of the next, i.e. up to `2 × limit`\n    //     requests inside a span shorter than `windowMs` (the classic\n    //     fixed-window boundary burst — here it applies per-key because the\n    //     boundary is the caller's own first hit);\n    //   - the window is per-key-from-latest-hit only in the sense of `now`;\n    //     entries expire exactly `windowMs` after their own timestamp, which\n    //     is the correct sliding behavior once pruning is fixed.\n    //\n    // [OK, praise] The `now` injection point is exactly right — deterministic\n    // tests without monkey-patching `Date`. Keep that pattern.\n  };\n}\n\n// Summary of defects, ordered by severity:\n// 1. CRITICAL — `prune` reads `hits[0]` as a number but `allow` stores objects\n//    (`hits[0].time` intended). Pruning never happens: unbounded memory growth\n//    and keys become permanently blocked after `limit` total hits.\n// 2. MAJOR — `reset` splices while iterating forward; consecutive same-key\n//    entries are skipped, leaving residue behind.\n// 3. MINOR — bare `reset()` is a silent no-op instead of clearing all state.\n// 4. PERF — per-key counting scans the global array (O(all hits)); one hot key\n//    taxes every other key. A `Map<key, times[]>` fixes both this and the\n//    cross-key scanning.\n// 5. API/DOCS — no JSDoc, no key validation, no retry-after information, and\n//    the sliding-window burst semantics are undocumented.\n// Praise: `now` injection for testability is the right call; pruning on each\n// `allow` (rather than a timer) is also the correct structure — it's only the\n// number-vs-object mismatch that defeats it.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/glm-5-3-run-1/08-review.thick.md",
          "thumb": null,
          "bytes": 3226,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact one-line format. Strong.",
          "trimmed": false,
          "text": "[blocker] prune — the guard reads `hits[0] < t - windowMs`, but `allow` stores `{ key, time }` objects, so the object coerces to NaN, the comparison is always false, and nothing is ever pruned — once a key reaches `limit` hits it is denied forever and the `hits` array grows without bound, turning the limiter into a permanent counter with a memory leak — compare against the stored timestamp: `hits[0].time < t - windowMs`\n[blocker] reset — splicing at `i` inside a forward loop skips the entry that shifts into slot `i`, so consecutive same-key entries survive (`[A, A, A]` leaves one `A` behind) — reset silently fails on exactly the repeated-key pattern this limiter produces, and since prune never removes anything the leftovers keep the key throttled despite an explicit reset — iterate backwards from `hits.length - 1`, decrement `i` after each splice, or rebuild the array with `filter`\n[major] allow — `hits.filter(h => h.key === key)` scans every stored hit of every key on every call, denials included — per-call cost is O(total hits), so the limiter gets slower as overall traffic grows instead of staying proportional to the single key being checked — bucket hits per key (e.g. a `Map` from key to that key's own timestamps) so `allow` only touches its own bucket\n[minor] createLimiter — `limit <= 0` makes `allow` deny unconditionally, and `windowMs <= 0` (once prune works) degenerates the window, with no error at construction — a silent misconfiguration produces a limiter doing the opposite of its job, which is hard to spot in production traffic — validate at construction: throw, or clamp with a warning, on non-positive or non-finite `limit` and `windowMs`\n[minor] prune — `hits.shift()` inside the while loop is O(n) per removal, so draining a large backlog is O(n²) — a burst that floods the window stalls the next `allow` call at exactly the moment traffic is heaviest — remove from the end with `pop`, or keep a start index and drop the stale prefix in one splice\n[minor] reset — calling it without an argument silently matches entries keyed `undefined`, and there is no way to clear all keys at once — a missing argument fails silently, and callers cannot reinitialize shared state (tests, reconfig, shutdown) — accept a no-argument form that clears everything, or throw when `key` is omitted or `undefined`\n[minor] module (tests) — the injectable `now` exists precisely to make time behavior testable, but nothing exercises expiry past `windowMs`, denial at exactly `limit`, or `reset` over back-to-back same-key hits — both blockers above would pass a casual smoke test, so nothing will catch them before production — add fake-clock tests: expire a hit just past `windowMs`, deny the `limit + 1`-th call, then reset a key with consecutive hits and assert it is empty\n[nit] prune — a hit exactly `windowMs` old is kept (`<`, not `<=`), so the effective window is closed on the old edge and that boundary is undocumented — an off-by-one window is invisible until someone tunes `windowMs` against an external quota and the counts differ by one — state the interval in a comment, or switch to `<=` if the intent is \"drop strictly older than the window\"\n",
          "kind": "technical"
        }
      }
    },
    "gpt": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/gpt-6-luna-run-1/01-poster.thin.svg",
          "thumb": null,
          "bytes": 7700,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/gpt-6-luna-run-1/01-poster.thick.svg",
          "thumb": null,
          "bytes": 4123,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/gpt-6-luna-run-1/02-interface.thin.html",
          "thumb": "thumbs/gpt-6-luna-run-1/02-thin.jpg",
          "bytes": 18616,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/gpt-6-luna-run-1/02-interface.thick.html",
          "thumb": "thumbs/gpt-6-luna-run-1/02-thick.jpg",
          "bytes": 15233,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/gpt-6-luna-run-1/03-critique.thin.html",
          "thumb": "thumbs/gpt-6-luna-run-1/03-thin.jpg",
          "bytes": 20603,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 65w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/gpt-6-luna-run-1/03-critique.thick.html",
          "thumb": "thumbs/gpt-6-luna-run-1/03-thick.jpg",
          "bytes": 8396,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 126w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/gpt-6-luna-run-1/04-motion.thin.html",
          "thumb": "thumbs/gpt-6-luna-run-1/04-thin.jpg",
          "bytes": 5302,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/gpt-6-luna-run-1/04-motion.thick.html",
          "thumb": "thumbs/gpt-6-luna-run-1/04-thick.jpg",
          "bytes": 4382,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/gpt-6-luna-run-1/05-explanation.thin.md",
          "thumb": null,
          "bytes": 707,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "118 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "DNS is the internet’s address book. People remember names like `example.com`; computers send data to numerical addresses called IP addresses.\n\nWhen you enter a website name, your device first checks whether it already knows the address. If not, it asks a DNS resolver, usually provided by your internet provider or network. The resolver looks up the answer: it may ask a series of servers, moving from the internet’s general directory to the servers responsible for that website.\n\nOnce it gets the IP address, your browser uses it to contact the website. The answer is often saved temporarily, so the next visit is faster.\n\nIn short: DNS turns a name you can remember into an address computers can use.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/gpt-6-luna-run-1/05-explanation.thick.md",
          "thumb": null,
          "bytes": 789,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "129 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "DNS (Domain Name System) turns a website name, like example.com, into an IP address (a number computers use to reach the site). When you type the name, your browser (the app showing websites) checks whether your device has a recent answer saved. If not, it asks a DNS resolver (a service that looks up names), which gets the answer from DNS servers (computers that store website-name details). Your browser then contacts that address and requests the page.\n\nYour device remembers answers briefly to make repeat visits faster; saved answers expire so changes can take effect.\n\nDNS errors usually mean the name was mistyped, the site's details are wrong or outdated, or the lookup service is temporarily unavailable or unreachable. DNS finds the site's address; it doesn't provide the page.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/gpt-6-luna-run-1/06-fiction.thin.md",
          "thumb": null,
          "bytes": 611,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "At the edge of winter stood Mara’s inn with a broken clock above its door. Every night, the hands stopped at eleven seventeen, though the town had forgotten why. Mara wound it anyway, listening for the small click that once summoned travelers home. During the first snowstorm, a stranger’s lantern appeared beyond the bridge, then vanished. She crossed the drifted road and found her brother’s old brass key beneath the clock tower. At midnight, the key turned by itself. The clock shuddered, releasing a year of trapped bells into the dark. Windows brightened across town as dawn opened quietly outside.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/gpt-6-luna-run-1/06-fiction.thick.md",
          "thumb": null,
          "bytes": 571,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "At 9:17, Mara found the office empty after hours; the wall clock insisted it was 8:42. Her last train home left at 9:30, and the night lock engaged at nine. She had to submit Friday's payroll corrections before the server closed its daily batch. The screen showed seven minutes remaining, according to her laptop. She checked the printer's timestamp; it showed the same wrong minute. The clock's battery had died weeks ago; the printer had kept its own time. Mara sent the file, then reset the clock to 9:17. At 9:30, she left with payroll corrected and the clock right.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/gpt-6-luna-run-1/07-build.thin.mjs",
          "thumb": null,
          "bytes": 1776,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "60 lines",
              "tone": ""
            },
            {
              "text": "3 tests pass",
              "tone": "ok"
            }
          ],
          "note": "Compact and correct: days through seconds, decimals and whitespace in 60 lines. The best fit for the thin ask.",
          "trimmed": false,
          "text": "import test from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst UNIT_SECONDS = { s: 1, m: 60, h: 3600, d: 86400 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError('Duration must be a string');\n  }\n\n  const source = input.trim();\n  if (!source) throw new SyntaxError('Duration must not be empty');\n\n  let index = 0;\n  let total = 0;\n  const seenUnits = new Set();\n  const token = /(\\d+(?:\\.\\d+)?)\\s*([smhd])/iy;\n\n  while (index < source.length) {\n    while (/\\s/.test(source[index] ?? '')) index++;\n    if (index === source.length) break;\n\n    token.lastIndex = index;\n    const match = token.exec(source);\n    if (!match) throw new SyntaxError(`Invalid duration: ${input}`);\n\n    const value = Number(match[1]);\n    const unit = match[2].toLowerCase();\n    if (!Number.isFinite(value)) {\n      throw new SyntaxError(`Invalid duration: ${input}`);\n    }\n    if (seenUnits.has(unit)) {\n      throw new SyntaxError(`Repeated duration unit: ${unit}`);\n    }\n\n    seenUnits.add(unit);\n    total += value * UNIT_SECONDS[unit];\n    index = token.lastIndex;\n  }\n\n  return total;\n}\n\ntest('parses combined and individual units into seconds', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('2d 3h 4m 5s'), 183845);\n  assert.equal(parseDuration('45s'), 45);\n});\n\ntest('supports decimals, spaces, and case-insensitive units', () => {\n  assert.equal(parseDuration('1.5H'), 5400);\n  assert.equal(parseDuration(' 1h  30m '), 5400);\n});\n\ntest('rejects empty, malformed, and repeated-unit durations', () => {\n  for (const value of ['', '1h30', 'abc', '1h 2h', '-1m']) {\n    assert.throws(() => parseDuration(value), SyntaxError);\n  }\n  assert.throws(() => parseDuration(null), TypeError);\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/gpt-6-luna-run-1/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2148,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "70 lines",
              "tone": "warn"
            },
            {
              "text": "8 tests pass",
              "tone": "ok"
            }
          ],
          "note": "Correct and well tested, but 70 lines — over the 60-line limit. parseDuration is also not exported.",
          "trimmed": false,
          "text": "import assert from 'node:assert/strict';\nimport test from 'node:test';\n\nfunction parseDuration(input) {\n  if (typeof input !== 'string') throw new TypeError('Duration must be a string');\n  if (input.length === 0) throw new TypeError('Duration cannot be empty');\n\n  const secondsPerUnit = { h: 3600, m: 60, s: 1 };\n  const seen = new Set();\n  let seconds = 0;\n  let index = 0;\n\n  while (index < input.length) {\n    const rest = input.slice(index);\n    if (/^-\\d/.test(rest)) throw new TypeError('Negative durations are not supported');\n\n    const match = /^(\\d+)([a-z])/i.exec(rest);\n    if (!match) {\n      if (/^\\d+$/.test(rest)) throw new TypeError('Bare number has no unit');\n      throw new TypeError(`Invalid duration segment at position ${index}`);\n    }\n\n    const unit = match[2].toLowerCase();\n    if (!Object.hasOwn(secondsPerUnit, unit)) {\n      throw new TypeError(`Unknown duration unit: ${match[2]}`);\n    }\n    if (seen.has(unit)) throw new TypeError(`Repeated duration unit: ${unit}`);\n\n    seen.add(unit);\n    seconds += Number(match[1]) * secondsPerUnit[unit];\n    index += match[0].length;\n  }\n\n  return seconds;\n}\n\ntest('parses supported units, zero, and case-insensitive input', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n});\n\ntest('parses segments in any order', () => {\n  assert.equal(parseDuration('3s1h2m'), 3723);\n});\n\ntest('rejects an empty string', () => {\n  assert.throws(() => parseDuration(''), { name: 'TypeError' });\n});\n\ntest('rejects an unknown unit', () => {\n  assert.throws(() => parseDuration('1d'), /Unknown duration unit/);\n});\n\ntest('rejects a repeated unit', () => {\n  assert.throws(() => parseDuration('1h2H'), /Repeated duration unit/);\n});\n\ntest('rejects a bare number', () => {\n  assert.throws(() => parseDuration('12'), /Bare number/);\n});\n\ntest('rejects negative numbers', () => {\n  assert.throws(() => parseDuration('-2m'), /Negative durations/);\n});\n\ntest('rejects non-string input', () => {\n  assert.throws(() => parseDuration(90), { name: 'TypeError' });\n});\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-code-review.thin.md",
          "path": "artifacts/gpt-6-luna-run-1/08-code-review.thin.md",
          "thumb": null,
          "bytes": 805,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "125 words"
            }
          ],
          "note": "126 words, four bullets, both bugs and the O(n) scan. The most efficient review.",
          "trimmed": false,
          "text": "- **`prune` (line 5):** `hits[0]` is an object, so comparing it with a number coerces it to `NaN`. Expired entries are never removed; compare `hits[0].time` instead. This can cause stale hits to block requests indefinitely and the array to grow without bound.\n- **`reset` (lines 19–21):** Splicing while iterating forward skips adjacent matching entries after the first removal. Iterate backward or filter the array so all hits for the key are removed.\n- **`allow` (line 11):** Counting with `filter` scans the full array on every call. With the pruning bug, this cost grows over time; even after fixing pruning, large limits or high traffic may make this a bottleneck.\n- **Configuration:** `limit` and `windowMs` are not validated. Negative, zero, or non-finite values can produce surprising behavior.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-code-review.thick.md",
          "path": "artifacts/gpt-6-luna-run-1/08-code-review.thick.md",
          "thumb": null,
          "bytes": 773,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "3 findings",
              "tone": ""
            }
          ],
          "note": "Both bugs caught, but rated major rather than blocker, and only three findings. Misses performance and test gaps.",
          "trimmed": false,
          "text": "[major] `prune(t)` — compares the hit object `hits[0]` to a number instead of comparing its timestamp — pruning never removes expired hits, so the limiter eventually rejects a key permanently and retains hits indefinitely — compare `hits[0].time` with the cutoff.\n\n[major] `reset(key)` — splicing while incrementing the index skips consecutive matching hits — reset can leave some of the key’s hits behind, so subsequent calls may still be denied — remove matches without advancing the index, or filter the array.\n\n[minor] `allow(key)` — counts hits at exactly `t - windowMs` as active — a hit on the window boundary can cause an extra rejection — clarify the boundary convention and prune timestamps at or before the cutoff if the window is exclusive.\n",
          "kind": "technical"
        }
      }
    },
    "haiku1": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/haiku-5-5/01-poster.thin.svg",
          "thumb": null,
          "bytes": 5462,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/haiku-5-5/01-poster.thick.svg",
          "thumb": null,
          "bytes": 3220,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/haiku-5-5/02-interface.thin.html",
          "thumb": "thumbs/haiku-5-5/02-thin.jpg",
          "bytes": 6919,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/haiku-5-5/02-interface.thick.html",
          "thumb": "thumbs/haiku-5-5/02-thick.jpg",
          "bytes": 11345,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/haiku-5-5/03-critique.thin.html",
          "thumb": "thumbs/haiku-5-5/03-thin.jpg",
          "bytes": 3529,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 138w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/haiku-5-5/03-critique.thick.html",
          "thumb": "thumbs/haiku-5-5/03-thick.jpg",
          "bytes": 2744,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 157w",
              "tone": "warn"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/haiku-5-5/04-motion.thin.html",
          "thumb": "thumbs/haiku-5-5/04-thin.jpg",
          "bytes": 2704,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/haiku-5-5/04-motion.thick.html",
          "thumb": "thumbs/haiku-5-5/04-thick.jpg",
          "bytes": 2861,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/haiku-5-5/05-explanation.thin.md",
          "thumb": null,
          "bytes": 818,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "133 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nComputers find each other using numbers called IP addresses, like `142.250.80.46`. Humans prefer names like `google.com`. **DNS (Domain Name System)** is the internet's phone book that translates names into numbers.\n\nWhen you type a name into your browser, your computer asks a **DNS resolver** (usually run by your internet provider or a company like Google or Cloudflare) for the matching address. If the resolver doesn't already know it, it asks a chain of authoritative servers: first the root servers, then the server for the domain's extension (like `.com`), and finally the server that holds the domain's actual records.\n\nThe answer comes back as an IP address, which your computer caches for a while so the next lookup is faster. Then your browser connects to that address and loads the page.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/haiku-5-5/05-explanation.thick.md",
          "thumb": null,
          "bytes": 822,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "138 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS works\n\nComputers find each other by number, like 93.184.216.34, but people prefer names like example.com. DNS (Domain Name System) is the lookup service that turns names into numbers.\n\nWhen you type a name, your computer asks a resolver, a helper server usually run by your internet provider. The resolver checks a chain of servers: first those that handle the ending, such as \".com\", then those that hold the exact name's entry, called a record. The record gives the number, and your browser connects to it.\n\nAnswers are remembered, a practice called caching, so repeat visits skip the chain. Each record has an expiry time, so changes eventually spread.\n\nThings usually go wrong when a record is outdated, misspelled, or its server is down. Then the name fails to resolve, even though the site itself is fine.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/haiku-5-5/06-fiction.thin.md",
          "thumb": null,
          "bytes": 581,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "98 words",
              "tone": "warn"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The clock in the hallway stopped at 3:17 the winter Dana's father left. Nobody wound it after that. Dust settled on the brass pendulum, and the hands held their small, stubborn silence.\n\nEvery morning Dana walked past it on her way to the kitchen. Every morning she glanced up, expecting nothing, and found herself checking the time anyway.\n\nYears passed. She moved out, moved back, moved on again.\n\nThen one gray afternoon she climbed the stepladder, opened the glass, and gently nudged the pendulum.\n\nTick.\n\nTock.\n\nThe house, for the first time in years, began to breathe again.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/haiku-5-5/06-fiction.thick.md",
          "thumb": null,
          "bytes": 550,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Ruth had watched the break-room clock all evening long, waiting for it to say six. It ran nine minutes slow every day, a fact everyone knew and nobody bothered to fix, because payroll read the office server, not the wall. Her son's school bus came at six-fifteen, and she had promised, that evening, to be standing at the stop. For years she had let that clock decide when she could leave, and never once checked it against anything. Tonight she checked her phone, saw how late it really was, and ran for the stop without looking at the clock again.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/haiku-5-5/07-build.thin.mjs",
          "thumb": null,
          "bytes": 2862,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "92 lines",
              "tone": ""
            },
            {
              "text": "13 tests pass",
              "tone": "ok"
            }
          ],
          "note": "92 lines with days through seconds, whitespace and duplicate-unit rejection. Clean.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst UNIT_SECONDS = { d: 86400, h: 3600, m: 60, s: 1 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') throw new TypeError('duration must be a string');\n  const text = input.trim();\n  if (text === '') throw new SyntaxError('empty duration');\n\n  const part = /\\s*(\\d+(?:\\.\\d+)?)\\s*([dhms])/iy;\n  const seen = new Set();\n  let total = 0;\n  let pos = 0;\n\n  while (pos < text.length) {\n    part.lastIndex = pos;\n    const match = part.exec(text);\n    if (!match) throw new SyntaxError(`invalid duration: ${JSON.stringify(input)}`);\n    const unit = match[2].toLowerCase();\n    if (seen.has(unit)) throw new SyntaxError(`duplicate unit \"${unit}\" in ${JSON.stringify(input)}`);\n    seen.add(unit);\n    total += Number(match[1]) * UNIT_SECONDS[unit];\n    pos = part.lastIndex;\n  }\n\n  return Math.round(total * 1000) / 1000;\n}\n\ntest('parses a combined hours and minutes duration', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n});\n\ntest('parses single units', () => {\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('2m'), 120);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('1d'), 86400);\n});\n\ntest('parses all units together with whitespace', () => {\n  assert.equal(parseDuration('2h 15m 10s'), 8110);\n  assert.equal(parseDuration('1d 1h 1m 1s'), 90061);\n  assert.equal(parseDuration('1h 30m'), 5400);\n});\n\ntest('parses decimal amounts', () => {\n  assert.equal(parseDuration('1.5h'), 5400);\n  assert.equal(parseDuration('0.5m'), 30);\n});\n\ntest('accepts zero and uppercase units', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('1H30M'), 5400);\n});\n\ntest('ignores surrounding whitespace', () => {\n  assert.equal(parseDuration('  1h30m  '), 5400);\n});\n\ntest('accepts units in any order', () => {\n  assert.equal(parseDuration('30m1h'), 5400);\n});\n\ntest('rejects empty and whitespace-only input', () => {\n  assert.throws(() => parseDuration(''), SyntaxError);\n  assert.throws(() => parseDuration('   '), SyntaxError);\n});\n\ntest('rejects numbers without a unit', () => {\n  assert.throws(() => parseDuration('30'), SyntaxError);\n  assert.throws(() => parseDuration('1h30'), SyntaxError);\n});\n\ntest('rejects unknown units and garbage', () => {\n  assert.throws(() => parseDuration('abc'), SyntaxError);\n  assert.throws(() => parseDuration('1x'), SyntaxError);\n  assert.throws(() => parseDuration('1h foo'), SyntaxError);\n});\n\ntest('rejects negative values', () => {\n  assert.throws(() => parseDuration('-5m'), SyntaxError);\n});\n\ntest('rejects duplicate units', () => {\n  assert.throws(() => parseDuration('1h1h'), SyntaxError);\n});\n\ntest('rejects non-string input', () => {\n  assert.throws(() => parseDuration(90), TypeError);\n  assert.throws(() => parseDuration(null), TypeError);\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/haiku-5-5/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2317,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "73 lines",
              "tone": "warn"
            },
            {
              "text": "9 tests pass",
              "tone": "ok"
            }
          ],
          "note": "Correct and thoroughly tested, but 73 lines — over the 60-line limit.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst UNIT_SECONDS = { h: 3600, m: 60, s: 1 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError(`parseDuration expects a string, got ${typeof input}`);\n  }\n  if (input === '') throw new TypeError('parseDuration: empty string');\n\n  const segment = /(\\d+)([hms])/iy;\n  const seen = new Set();\n  let total = 0;\n  while (segment.lastIndex < input.length) {\n    const pos = segment.lastIndex;\n    const match = segment.exec(input);\n    if (!match) {\n      throw new TypeError(`parseDuration: expected number + h/m/s at position ${pos} in \"${input}\"`);\n    }\n    const unit = match[2].toLowerCase();\n    if (seen.has(unit)) throw new TypeError(`parseDuration: unit \"${unit}\" repeated in \"${input}\"`);\n    seen.add(unit);\n    total += Number(match[1]) * UNIT_SECONDS[unit];\n  }\n  return total;\n}\n\ntest('happy paths', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('2h'), 7200);\n});\n\ntest('composite segments, any order, any case', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n  assert.equal(parseDuration('3s2h1m'), 7263);\n});\n\ntest('rejects empty string', () => {\n  assert.throws(() => parseDuration(''), TypeError);\n});\n\ntest('rejects unknown unit', () => {\n  assert.throws(() => parseDuration('5d'), TypeError);\n});\n\ntest('rejects repeated unit', () => {\n  assert.throws(() => parseDuration('1h1h'), TypeError);\n  assert.throws(() => parseDuration('1m2M'), TypeError);\n});\n\ntest('rejects bare number with no unit', () => {\n  assert.throws(() => parseDuration('90'), TypeError);\n  assert.throws(() => parseDuration('1h30'), TypeError);\n});\n\ntest('rejects negative numbers', () => {\n  assert.throws(() => parseDuration('-5m'), TypeError);\n});\n\ntest('rejects spaces and non-integers', () => {\n  assert.throws(() => parseDuration('1h 30m'), TypeError);\n  assert.throws(() => parseDuration('1.5h'), TypeError);\n});\n\ntest('rejects non-string input', () => {\n  assert.throws(() => parseDuration(90), TypeError);\n  assert.throws(() => parseDuration(null), TypeError);\n  assert.throws(() => parseDuration(undefined), TypeError);\n});\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/haiku-5-5/08-review.thin.md",
          "thumb": null,
          "bytes": 2429,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "395 words"
            }
          ],
          "note": "Clear and structured; both bugs plus memory growth and global-array cost. Good.",
          "trimmed": false,
          "text": "## Review: `createLimiter`\n\n### Bugs\n\n1. **`prune` never removes anything.** `hits` holds `{ key, time }` objects, but `prune` compares `hits[0]` directly to a number. The object coerces to `NaN`, so `NaN < t - windowMs` is always false. Use `hits[0].time`.\n\n2. **Once a key hits the limit, it is blocked permanently.** Because pruning is broken, old timestamps stay in `hits` forever. `allow` keeps counting them, so `n >= limit` stays true until `reset(key)` is called. This is the most serious problem: the limiter behaves like a lifetime quota, not a sliding window.\n\n3. **Unbounded memory growth.** Every allowed call pushes an entry that is never removed, so `hits` grows without limit.\n\n4. **`reset` skips entries.** `splice(i, 1)` inside a forward `for` loop shifts the next element into index `i`, then `i++` skips it. Two consecutive matching entries means the second survives. Iterate backwards, or rebuild the array with `filter`, e.g. `hits = hits.filter(h => h.key !== key)`. Note that `hits` is `const` in this case, so mutate it in place or change the declaration to `let`.\n\n### Design issues\n\n5. **Shared global array makes everything O(n).** `prune` runs on every call and `shift()` is O(n). `allow` then does a full `filter` over all keys to count one key. A `Map` from key to an array of timestamps (or a queue with a head index) gives per-key work proportional only to that key's hits.\n\n6. **Keys leak.** Even after the fix, a `Map` keeps an entry for every key ever seen. Delete a key's entry when its timestamps are all pruned, or prune stale keys periodically.\n\n7. **Clock assumptions.** Pruning assumes `now()` is monotonic. If the injected clock moves backwards, `t - windowMs` moves backwards too and old hits are kept longer than intended. Consider `Math.max` against the last seen time, or document the requirement.\n\n8. **No input validation.** `limit <= 0` silently rejects every request. `windowMs <= 0` or non-numeric values produce confusing behavior. Validate the options and throw a clear error, or document the accepted range.\n\n### Minor\n\n9. `allow` is O(n) per call because of `filter`. This is covered by item 5 but is worth noting separately for the hot path.\n\n10. There are no tests covering the window boundary (`t - windowMs` exactly), the limit being reached, or recovery after the window passes. A test that advances a fake `now()` past `windowMs` would have caught bug 1 immediately.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/haiku-5-5/08-review.thick.md",
          "thumb": null,
          "bytes": 1977,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact format. Strong.",
          "trimmed": false,
          "text": "[blocker] `prune`, `hits[0] < t - windowMs` — `hits[0]` is a `{ key, time }` object, so the comparison against a number is always false and nothing is ever pruned. Once a key has made `limit` calls in total, `allow` returns false forever regardless of `windowMs`, and the array grows without bound. Compare `hits[0].time` instead.\n\n[major] `reset`, `hits.splice(i, 1)` followed by `i++` — the entry that shifts into the removed slot is skipped, so consecutive matching entries survive. `reset(key)` silently leaves some of that key's hits behind. Iterate backwards or filter in place.\n\n[major] `allow`, `hits.filter(h => h.key === key)` — every call scans the hits for all keys, so cost grows with total traffic rather than with that key's usage. Keep a per-key timestamp queue in a `Map` so counting and pruning touch only the relevant key.\n\n[major] `prune`, `hits.shift()` — `shift` is O(n) on arrays and runs once per expired entry, and `reset`'s `splice` is also O(n) per removal. Under load this is quadratic. Use a head index or per-key queues.\n\n[minor] `createLimiter` options — `limit`, `windowMs` and `now` are not validated. `limit: 0`, negative values, `NaN`, or a non-function `now` are accepted silently and produce always-deny or never-expire behaviour. Validate at construction and throw.\n\n[minor] `allow` return value — it returns a bare boolean, so callers cannot set `Retry-After` or `X-RateLimit-Remaining` without re-implementing the window math. Return a result object (allowed, remaining, reset time) or expose a separate query method.\n\n[minor] Tests — none are included, and a single test that advances the injected `now` past `windowMs` would have caught the blocker above. Add tests for window expiry, per-key isolation, and `reset` on consecutive keys.\n\n[nit] `prune`, `< t - windowMs` — a hit exactly `windowMs` old still counts, so the effective window is inclusive at one boundary. Decide on the intended semantics and document it.\n",
          "kind": "technical"
        }
      }
    },
    "haiku2": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/haiku-5-5-run-2/01-poster.thin.svg",
          "thumb": null,
          "bytes": 5837,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/haiku-5-5-run-2/01-poster.thick.svg",
          "thumb": null,
          "bytes": 2688,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/haiku-5-5-run-2/02-interface.thin.html",
          "thumb": "thumbs/haiku-5-5-run-2/02-thin.jpg",
          "bytes": 8313,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/haiku-5-5-run-2/02-interface.thick.html",
          "thumb": "thumbs/haiku-5-5-run-2/02-thick.jpg",
          "bytes": 11269,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/haiku-5-5-run-2/03-critique.thin.html",
          "thumb": "thumbs/haiku-5-5-run-2/03-thin.jpg",
          "bytes": 5730,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 145w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/haiku-5-5-run-2/03-critique.thick.html",
          "thumb": "thumbs/haiku-5-5-run-2/03-thick.jpg",
          "bytes": 2756,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 141w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/haiku-5-5-run-2/04-motion.thin.html",
          "thumb": "thumbs/haiku-5-5-run-2/04-thin.jpg",
          "bytes": 4671,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/haiku-5-5-run-2/04-motion.thick.html",
          "thumb": "thumbs/haiku-5-5-run-2/04-thick.jpg",
          "bytes": 2921,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/haiku-5-5-run-2/05-explanation.thin.md",
          "thumb": null,
          "bytes": 768,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "131 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nComputers find each other using numbers called IP addresses, like `93.184.216.34`. People prefer names like `example.com`. DNS, the Domain Name System, is the phone book that translates one into the other.\n\nWhen you type a website name, your computer asks a DNS resolver, usually run by your internet provider or a service like Google or Cloudflare. If the resolver doesn't already know the answer, it asks a chain of servers: first a root server, which points to the right top-level server (for `.com`), which points to the server that holds the site's own records. That final server replies with the IP address.\n\nYour computer then connects to that address and loads the page. The answer is cached for a set time, so the next lookup is much faster.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/haiku-5-5-run-2/05-explanation.thick.md",
          "thumb": null,
          "bytes": 801,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "144 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS works\n\nComputers find each other by numbers, such as 142.250.80.46, but people remember names like example.com. DNS, the Domain Name System, is the directory that turns a name into its number.\n\nWhen you type a name, your computer first checks its own short-term memory, called a cache. If the answer is not there, it asks a resolver, a helper computer usually run by your internet provider. The resolver asks a root server, which points it to the server for the ending (such as .com), which points it to the server that holds the name's number.\n\nAnswers are kept for a set time, called the TTL (time to live), so repeat visits are fast.\n\nProblems usually come from an outdated cache, a mistyped name, or a server that is down. A \"DNS error\" means the name could not be turned into a number.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/haiku-5-5-run-2/06-fiction.thin.md",
          "thumb": null,
          "bytes": 627,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "121 words",
              "tone": "warn"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The clock in the hallway stopped at 4:17 the winter my father moved out. Nobody wound it after that. Each morning I walked past it on my way to the kitchen, and each morning it still said 4:17, as if that afternoon had decided to stay.\n\nI told myself I would fix it on the weekend. The weekend came and went. Dust settled on the glass face, and the brass hands grew dull.\n\nThen one spring I found the key in a drawer, the little wooden one with the chipped handle. I turned it slowly, feeling the old spring tighten. The pendulum swung. Tick. Tock. I stood there a long time, listening, not yet ready to know what time it was.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/haiku-5-5-run-2/06-fiction.thick.md",
          "thumb": null,
          "bytes": 545,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Dana had always believed the wall clock ran slow. It said 6:40 while her phone said 7:05, so she left at six and trusted the difference would take care of itself. Tonight she stayed, drafting the resignation she had rehearsed for three years. She printed it, signed it, and carried it down the corridor to Mr. Hale's office. His door stood open. Behind his desk hung a clock that matched her phone exactly. Dana looked at it for a moment, then back at the page in her hand, and understood that the wrong clock had given her permission to leave.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/haiku-5-5-run-2/07-build.thin.mjs",
          "thumb": null,
          "bytes": 2303,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "72 lines",
              "tone": ""
            },
            {
              "text": "6 tests pass",
              "tone": "ok"
            }
          ],
          "note": "72 lines with ms through weeks and whitespace. Clean, though duplicate units are not rejected.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst UNIT_MS = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000, w: 604800000 };\nconst TOKEN = /(\\d+(?:\\.\\d+)?)\\s*(ms|w|d|h|m|s)/y;\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError('duration must be a string');\n  }\n  const src = input.trim().toLowerCase();\n  if (src === '') {\n    throw new SyntaxError('empty duration');\n  }\n\n  let totalMs = 0;\n  let pos = 0;\n  while (pos < src.length) {\n    TOKEN.lastIndex = pos;\n    const match = TOKEN.exec(src);\n    if (!match) {\n      throw new SyntaxError(`invalid duration: \"${input}\"`);\n    }\n    totalMs += Number(match[1]) * UNIT_MS[match[2]];\n    pos = TOKEN.lastIndex;\n    while (pos < src.length && /\\s/.test(src[pos])) {\n      pos++;\n    }\n  }\n  return totalMs / 1000;\n}\n\ntest('parses compound durations into seconds', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('2h'), 7200);\n  assert.equal(parseDuration('1d'), 86400);\n  assert.equal(parseDuration('1w2d'), 604800 + 2 * 86400);\n});\n\ntest('parses single units', () => {\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('5m'), 300);\n  assert.equal(parseDuration('0s'), 0);\n});\n\ntest('parses milliseconds and fractional values', () => {\n  assert.equal(parseDuration('500ms'), 0.5);\n  assert.equal(parseDuration('1.5h'), 5400);\n  assert.equal(parseDuration('1.5s'), 1.5);\n});\n\ntest('tolerates whitespace and case', () => {\n  assert.equal(parseDuration('1h 30m'), 5400);\n  assert.equal(parseDuration('  1H30M  '), 5400);\n  assert.equal(parseDuration('1 h 30 m'), 5400);\n});\n\ntest('sums repeated units', () => {\n  assert.equal(parseDuration('1h1h'), 7200);\n});\n\ntest('rejects invalid input', () => {\n  assert.throws(() => parseDuration(''), SyntaxError);\n  assert.throws(() => parseDuration('   '), SyntaxError);\n  assert.throws(() => parseDuration('30'), SyntaxError);\n  assert.throws(() => parseDuration('abc'), SyntaxError);\n  assert.throws(() => parseDuration('1h-30m'), SyntaxError);\n  assert.throws(() => parseDuration('-5s'), SyntaxError);\n  assert.throws(() => parseDuration('1x'), SyntaxError);\n  assert.throws(() => parseDuration(90), TypeError);\n  assert.throws(() => parseDuration(null), TypeError);\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/haiku-5-5-run-2/07-build.thick.mjs",
          "thumb": null,
          "bytes": 1981,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "47 lines",
              "tone": ""
            },
            {
              "text": "3 tests pass",
              "tone": "ok"
            }
          ],
          "note": "47 lines, strict grammar and three test blocks. One of the best fits.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst UNIT_SECONDS = { h: 3600, m: 60, s: 1 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') throw new TypeError(`parseDuration expects a string, got ${typeof input}`);\n  const text = input.toLowerCase();\n  if (text === '') throw new TypeError('parseDuration received an empty string');\n  if (text.includes('-')) throw new TypeError(`parseDuration does not accept negative values: \"${input}\"`);\n  if (!/^(\\d+[hms])+$/.test(text)) {\n    throw new TypeError(`parseDuration cannot parse \"${input}\": expected segments like \"1h30m\" (units h, m, s; integers only)`);\n  }\n  const seen = new Set();\n  let total = 0;\n  for (const [, digits, unit] of text.matchAll(/(\\d+)([hms])/g)) {\n    if (seen.has(unit)) throw new TypeError(`parseDuration repeats unit \"${unit}\" in \"${input}\"`);\n    seen.add(unit);\n    total += Number(digits) * UNIT_SECONDS[unit];\n  }\n  return total;\n}\n\ntest('parses single units', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('2h'), 7200);\n});\n\ntest('parses composites in any order and case-insensitively', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n  assert.equal(parseDuration('3s2m1h'), 3723);\n});\n\ntest('rejects invalid input with TypeError', () => {\n  assert.throws(() => parseDuration(''), TypeError);\n  assert.throws(() => parseDuration(42), TypeError);\n  assert.throws(() => parseDuration(null), TypeError);\n  assert.throws(() => parseDuration('90'), /expected segments/);\n  assert.throws(() => parseDuration('1d'), /expected segments/);\n  assert.throws(() => parseDuration('1h1h'), /repeats unit \"h\"/);\n  assert.throws(() => parseDuration('-5s'), /negative/);\n  assert.throws(() => parseDuration('1h 30m'), TypeError);\n  assert.throws(() => parseDuration('1.5h'), TypeError);\n});\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/haiku-5-5-run-2/08-review.thin.md",
          "thumb": null,
          "bytes": 2621,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "419 words"
            }
          ],
          "note": "Both bugs, per-key cost, monotonic clock and validation. Well organized.",
          "trimmed": false,
          "text": "# Review: `createLimiter`\n\n## Critical\n\n1. **`prune()` never removes anything.** `hits` holds objects like `{ key, time }`, but `prune` compares `hits[0] < t - windowMs`. An object compared to a number yields `NaN`, so the comparison is always `false` and the loop never runs. Expired hits accumulate forever. Fix: compare `hits[0].time`.\n\n2. **Limiting breaks once the bug above is fixed?** Not exactly, but the current behavior is wrong. Because nothing is ever pruned, `allow()` counts every hit ever recorded for a key. After `limit` calls in total, the key is blocked permanently, regardless of `windowMs`. This is a memory leak and a correctness failure.\n\n3. **`reset(key)` skips elements.** Calling `splice` inside a forward `for` loop shifts the next element into the current index, and the loop then increments past it. Consecutive matching entries are left behind. Iterate backwards or rebuild the array with `filter` in place.\n\n## Important\n\n4. **Per-call cost is O(n).** `allow()` runs `hits.filter` over every recorded hit across all keys, and `prune` uses `shift()`, which is also O(n). Under load this degrades quickly. A `Map` from key to an array of timestamps (or a queue per key) would make each check proportional to that key's own hits.\n\n5. **Pruning assumes `now()` is monotonic.** The early-exit prune only works if timestamps are non-decreasing. If `now` is injected with a clock that goes backwards, expired entries near the tail are never removed.\n\n6. **Window boundary is inconsistent.** `prune` keeps entries where `time >= t - windowMs`, so an entry exactly `windowMs` old still counts. Decide whether the window is `[t - windowMs, t]` or `(t - windowMs, t]` and document it.\n\n7. **No input validation.** `limit <= 0` silently denies everything. Negative or non-finite `windowMs` and `limit` values are accepted without error. Consider throwing a `RangeError` for invalid options.\n\n## Minor\n\n8. **Denied requests are not recorded.** This is probably intended, but it means a client that keeps retrying is never penalized further. If that is the desired behavior, document it.\n\n9. **`reset` has no return value.** Returning the number of removed entries or nothing at all would be a reasonable choice, but be consistent with the rest of the API.\n\n10. **No tests shown.** The bugs above (1 and 3 especially) would be caught by a basic test that makes a few calls, advances the fake `now`, and checks `allow` again.\n\n## Suggested direction\n\nStore timestamps per key, prune only the calling key's queue on each `allow`, and use a fake `now` in tests. This fixes items 1, 2, 3, 4, and 5 together.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/haiku-5-5-run-2/08-review.thick.md",
          "thumb": null,
          "bytes": 2028,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact format. Strong.",
          "trimmed": false,
          "text": "[blocker] prune(), hits[0] comparison — `hits[0] < t - windowMs` compares an object `{ key, time }` to a number, which is always false, so nothing is ever pruned — entries never expire, the limit is permanent after `limit` hits per process, and `hits` grows without bound — compare `hits[0].time` instead.\n[major] reset(key), for loop — after `splice(i, 1)` the loop still increments `i`, so the entry that slides into index `i` is skipped; consecutive matching entries survive and `reset` leaves the key partly limited — iterate backwards or use `filter` to rebuild the array.\n[major] allow(key), `hits.filter(...)` — every call scans the whole global array (all keys) and `shift()` in prune is O(n) per removal, so cost grows with total traffic across all keys, not with this key's hits — keep a per-key queue or Map of timestamps with a head index.\n[minor] createLimiter options — `limit`, `windowMs` and `now` are not validated; `limit: 0`, negative, `NaN`, or a non-function `now` fail silently or block everything — validate on construction and throw a clear error.\n[minor] prune(t), window boundary — the cutoff is `< t - windowMs`, so a hit exactly `windowMs` old still counts; the window semantics are undocumented and differ from common sliding-window conventions — state the boundary in a comment or doc and test it.\n[minor] API surface — `allow` returns only a boolean, with no remaining count or retry-after time, so callers cannot set `Retry-After` headers or back off — return a richer result or add a companion method.\n[minor] allow/reset, missing tests — nothing covers window expiry, the per-key separation, the limit boundary, or the reset loop bug that a single test would have caught — add tests with an injected `now` for expiry, multi-key isolation, and reset of consecutive entries.\n[nit] reset(key) — the name suggests clearing all state, but it only clears hits for one key and the global `hits` array is still shared; a clearer name or a doc line would prevent misuse.\n",
          "kind": "technical"
        }
      }
    },
    "hy4": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/hy4-flash-run-1/01-poster.thin.svg",
          "thumb": null,
          "bytes": 12409,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/hy4-flash-run-1/01-poster.thick.svg",
          "thumb": null,
          "bytes": 3923,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/hy4-flash-run-1/02-interface.thin.html",
          "thumb": "thumbs/hy4-flash-run-1/02-thin.jpg",
          "bytes": 17758,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/hy4-flash-run-1/02-interface.thick.html",
          "thumb": "thumbs/hy4-flash-run-1/02-thick.jpg",
          "bytes": 14527,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/hy4-flash-run-1/03-critique.thin.html",
          "thumb": "thumbs/hy4-flash-run-1/03-thin.jpg",
          "bytes": 16241,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 117w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/hy4-flash-run-1/03-critique.thick.html",
          "thumb": "thumbs/hy4-flash-run-1/03-thick.jpg",
          "bytes": 4872,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 115w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/hy4-flash-run-1/04-motion.thin.html",
          "thumb": "thumbs/hy4-flash-run-1/04-thin.jpg",
          "bytes": 8617,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/hy4-flash-run-1/04-motion.thick.html",
          "thumb": "thumbs/hy4-flash-run-1/04-thick.jpg",
          "bytes": 3789,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/hy4-flash-run-1/05-explanation.thin.md",
          "thumb": null,
          "bytes": 808,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "129 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nThink of the internet as a giant city. Every website lives at a specific address called an **IP address** (like `192.168.1.1`), but humans prefer names like `google.com`.\n\n**DNS** (Domain Name System) is the internet's phone book. When you type a website name, your computer asks a DNS server: \"What IP address matches this name?\"\n\nThe lookup happens in steps:\n\n- Your device checks its own memory cache first.\n- It asks a **resolver**, usually run by your internet provider.\n- The resolver asks **root servers**, which point to **top-level domain** servers (`.com`, `.org`).\n- Those point to the site's **authoritative server**, which gives the final IP.\n\nYour browser then connects to that IP and loads the page. All of this happens in milliseconds, invisibly, every time you visit a site.",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/hy4-flash-run-1/05-explanation.thick.md",
          "thumb": null,
          "bytes": 672,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "119 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# DNS: How a Name Becomes a Page\n\nComputers reach each other using numbers, but people prefer names. DNS is the system that turns a name you type into the number a computer needs.\n\nWhen you enter an address, your device asks a resolver, a helper that hunts for answers. The resolver checks nearby, then asks a series of directory servers, each knowing one piece of the name, until it finds the right number and hands it back. Your browser then connects to that number and the page appears.\n\nAnswers are kept briefly in a cache, a short-term memory, so the next visit skips the hunt.\n\nTrouble usually means a typo, a stale cache, or the directory servers being unreachable.",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/hy4-flash-run-1/06-fiction.thin.md",
          "thumb": null,
          "bytes": 557,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "101 words",
              "tone": "warn"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The hallway clock had stopped at 3:14 years ago, its hands frozen like a held breath. Mara passed it each morning and evening, pretending not to notice the silence. Dust dulled its face; a single crack ran from the four down to the center. She liked to think it had chosen that moment on purpose — the afternoon rain fell, the letters came, the house went quiet. Each morning she wound it anyway, out of habit or hope, listening for the tick that never came. The mechanism, she imagined, had simply grown tired of measuring hours that moved on without it.",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/hy4-flash-run-1/06-fiction.thick.md",
          "thumb": null,
          "bytes": 498,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "The wall clock had stopped at 6:05, and Mara kept it that way. After the last analyst left, she sat at her desk clearing the ticket queue and told herself the hour on the face was true, which meant the 5:30 bus had already gone and there was no point leaving. At 6:40 her phone showed the real time. She had missed the bus by an hour. Mara set down her headset, put on her coat, and took the stairs. She caught the 7:15. On the train she watched the lights pass by and did not reach for her laptop.",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/hy4-flash-run-1/07-build.thin.mjs",
          "thumb": null,
          "bytes": 2772,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "94 lines",
              "tone": ""
            },
            {
              "text": "7 tests pass",
              "tone": "ok"
            }
          ],
          "note": "94 lines with ms through weeks. Returns 0 for an empty string, which is a debatable choice.",
          "trimmed": false,
          "text": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fileURLToPath } from 'node:url';\nimport { resolve } from 'node:path';\n\nconst UNIT_SECONDS = {\n  ms: 0.001,\n  s: 1,\n  m: 60,\n  h: 3600,\n  d: 86400,\n  w: 604800,\n};\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string') {\n    throw new TypeError('parseDuration expects a string');\n  }\n\n  const text = input.trim();\n  if (text === '') return 0;\n\n  let total = 0;\n  let matched = false;\n  let lastIndex = 0;\n  const pattern = /(\\d+(?:\\.\\d+)?)\\s*(ms|s|m|h|d|w)/g;\n  let match;\n\n  while ((match = pattern.exec(text)) !== null) {\n    const gap = text.slice(lastIndex, match.index).trim();\n    if (gap !== '') {\n      throw new SyntaxError(`Unexpected token \"${gap}\" in duration \"${input}\"`);\n    }\n    total += Number(match[1]) * UNIT_SECONDS[match[2]];\n    matched = true;\n    lastIndex = match.index + match[0].length;\n  }\n\n  if (!matched) {\n    throw new SyntaxError(`Invalid duration: \"${input}\"`);\n  }\n\n  const trailing = text.slice(lastIndex).trim();\n  if (trailing !== '') {\n    throw new SyntaxError(`Unexpected token \"${trailing}\" in duration \"${input}\"`);\n  }\n\n  return total;\n}\n\nif (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {\n  test('parses the headline example 1h30m', () => {\n    assert.equal(parseDuration('1h30m'), 5400);\n  });\n\n  test('parses single units', () => {\n    assert.equal(parseDuration('45s'), 45);\n    assert.equal(parseDuration('2m'), 120);\n    assert.equal(parseDuration('1h'), 3600);\n    assert.equal(parseDuration('1d'), 86400);\n    assert.equal(parseDuration('1w'), 604800);\n  });\n\n  test('parses multiple units in any order', () => {\n    assert.equal(parseDuration('30m1h'), 5400);\n    assert.equal(parseDuration('1w2d3h4m5s'), 788645);\n  });\n\n  test('supports decimals and milliseconds', () => {\n    assert.equal(parseDuration('1.5h'), 5400);\n    assert.equal(parseDuration('1500ms'), 1.5);\n    assert.equal(parseDuration('0.5m'), 30);\n  });\n\n  test('tolerates surrounding and inner whitespace', () => {\n    assert.equal(parseDuration('  1h 30m  '), 5400);\n    assert.equal(parseDuration('1 h 30 m'), 5400);\n  });\n\n  test('empty string is zero', () => {\n    assert.equal(parseDuration(''), 0);\n    assert.equal(parseDuration('   '), 0);\n  });\n\n  test('rejects invalid input', () => {\n    assert.throws(() => parseDuration(42), TypeError);\n    assert.throws(() => parseDuration(null), TypeError);\n    assert.throws(() => parseDuration('60'), SyntaxError);\n    assert.throws(() => parseDuration('abc'), SyntaxError);\n    assert.throws(() => parseDuration('1x'), SyntaxError);\n    assert.throws(() => parseDuration('1h30'), SyntaxError);\n    assert.throws(() => parseDuration('1h@@30m'), SyntaxError);\n  });\n}\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/hy4-flash-run-1/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2029,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "57 lines",
              "tone": ""
            },
            {
              "text": "5 tests pass",
              "tone": "ok"
            }
          ],
          "note": "57 lines, a clear parser and five test blocks. Strong.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst SECONDS_PER = { h: 3600, m: 60, s: 1 };\n\nexport function parseDuration(input) {\n  if (typeof input !== 'string')\n    throw new TypeError('parseDuration: input must be a string');\n  if (input === '')\n    throw new TypeError('parseDuration: input must not be empty');\n  if (input[0] === '-')\n    throw new TypeError('parseDuration: negative numbers are not allowed');\n\n  let total = 0;\n  let end = 0;\n  const used = new Set();\n  const segment = /(\\d+)([a-z])/gi; // digits, then one unit letter; /g walks segments, /i allows H/M/S.\n  let m;\n  while ((m = segment.exec(input)) !== null) {\n    if (m.index !== end)\n      throw new TypeError(`parseDuration: unexpected text \"${input.slice(end, m.index)}\"`);\n    const unit = m[2].toLowerCase();\n    if (!(unit in SECONDS_PER))\n      throw new TypeError(`parseDuration: unknown unit \"${m[2]}\"`);\n    if (used.has(unit))\n      throw new TypeError(`parseDuration: repeated unit \"${unit}\"`);\n    used.add(unit);\n    total += Number(m[1]) * SECONDS_PER[unit];\n    end = segment.lastIndex;\n  }\n  if (end !== input.length)\n    throw new TypeError(`parseDuration: cannot parse \"${input.slice(end)}\"`);\n  return total;\n}\n\ntest('single units', () => {\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('1m'), 60);\n  assert.equal(parseDuration('1s'), 1);\n});\ntest('zero and multi-digit', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('90s'), 90);\n});\ntest('composite and case-insensitive', () => {\n  assert.equal(parseDuration('1h30m'), 5400);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n  assert.equal(parseDuration('30m1h'), 5400);\n});\ntest('rejects invalid strings', () => {\n  for (const bad of ['', '5d', '1h1h', '90', '-5s', '1.5h', '1h 2m'])\n    assert.throws(() => parseDuration(bad), TypeError);\n});\ntest('rejects non-string input', () => {\n  for (const bad of [123, null, undefined, {}])\n    assert.throws(() => parseDuration(bad), TypeError);\n});\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/hy4-flash-run-1/08-review.thin.md",
          "thumb": null,
          "bytes": 4265,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "650 words"
            }
          ],
          "note": "Both bugs, plus allocation and boundary notes. Slightly long, but accurate.",
          "trimmed": false,
          "text": "# Code Review — `createLimiter`\n\n## Summary\nA sliding-window rate limiter keyed by an arbitrary `key`. The overall shape is reasonable (injected clock, per-key counts, reset), but there is one correctness bug that breaks the core feature entirely, plus a second iteration bug and several secondary concerns.\n\n## Critical\n\n1. **`prune` compares objects to numbers — eviction never happens.**\n   `hits.push({ key, time: t })` stores **objects**, but `prune` tests `hits[0] < t - windowMs`. Comparing an object with `<` coerces it via `ToPrimitive` to `\"[object Object]\"`, then to `NaN`; `NaN < anything` is `false`. So the `while` loop body never runs and **nothing is ever evicted**. Consequences:\n   - The limiter becomes a fixed-count limiter over all time, not a sliding window: once a key reaches `limit`, it is blocked forever (until `reset`).\n   - `hits` grows without bound → unbounded memory growth.\n   The comparison needs to target the timestamp, e.g. `hits[0].time < t - windowMs`.\n\n2. **`reset` mutates the array while iterating it and skips entries.**\n   `for (let i = 0; i < hits.length; i++) { if (hits[i].key === key) hits.splice(i, 1); }` — when a match is spliced out at index `i`, every later element shifts left by one, but `i` still increments. Adjacent/duplicate matches for the same key are therefore skipped. Example: `hits = [k, k, k]` all with key `k` → after the loop one `k` remains. `reset` does not reliably clear a key. Iterate backwards, or filter into a new array, or decrement `i` after a splice.\n\n## Significant\n\n3. **`prune` assumes `hits` is sorted by time.**\n   It only inspects `hits[0]` and stops at the first non-expired element. This holds only if timestamps are pushed in non-decreasing order. `now()` defaults to `Date.now()`, which is **not monotonic** — NTP adjustments / clock rollbacks can push an older timestamp at the end, so expired entries at the tail are never reached because the head blocks the loop. Either enforce monotonic time or don't rely on head-only pruning.\n\n4. **Off-by-one / boundary semantics are undefined.** `hits[0] < t - windowMs` keeps entries exactly at `t - windowMs` (uses `<`, not `<=`), and `allow` blocks at `n >= limit`. Document the intended window boundary (`(t - windowMs, t]` vs `[t - windowMs, t]`) and make the comparison consistent.\n\n5. **No input validation.** `limit`, `windowMs`, and `now` are unchecked. `limit = 0` or negative makes `allow` always return `false`; `windowMs <= 0` produces contradictory behavior; a `now` returning `NaN` or a non-number breaks comparisons and `filter`. Consider validating/normalizing these at construction.\n\n## Performance / design notes\n\n6. **`hits.shift()` is O(n)**; doing it in a loop makes pruning O(n²) in the worst case (many expired entries). Combined with (1) it currently never runs, but once fixed it becomes a hot path. A head index/pointer, a deque, or periodic compaction avoids repeated shifting.\n\n7. **`hits.filter(...)` allocates a new array on every `allow()` call** just to count matches, scanning all entries. That is O(n) time and garbage per request even though only a count is needed — a simple counted loop avoids the allocation.\n\n8. **Unbounded `hits` array by design.** Even with pruning fixed, there is no cap when traffic stops but `allow`/`reset` are not called; cleanup is lazy (only on `allow`). That is acceptable for a log-based limiter but worth noting for long-lived, sparse keys.\n\n9. **`reset` has no return value** and silently does nothing for unknown keys. Fine if intentional, but callers get no feedback.\n\n10. **Key comparison uses `===`.** Object keys are compared by reference, and `NaN` keys never match. Document that keys should be primitives, or use a `Map`/`Set`-based structure if identity/edge cases matter.\n\n11. **Concurrency:** each `allow` is fully synchronous, so within a single JS event loop there is no interleaving race. No issue here, but note that state is per-instance and in-memory only (not shared across processes/workers).\n\n## Recommended priority\nFix (1) and (2) before any use — they are functional blockers (window never slides; reset leaks entries). Then address (3)/(4) for correctness under real clocks, and consider (6)/(7) if this runs on a hot path.",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/hy4-flash-run-1/08-review.thick.md",
          "thumb": null,
          "bytes": 1949,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact format. Strong.",
          "trimmed": false,
          "text": "[blocker] prune() — compares the hit object (`hits[0]`) against `t - windowMs` instead of `hits[0].time` — `hits[0] < number` coerces to NaN so the loop body never executes; expired hits are never removed, memory grows without bound, and once `limit` is reached `allow()` denies that key forever — compare `hits[0].time < t - windowMs`.\n[blocker] reset() — splices the array while iterating forward with `i++` — removing at index `i` shifts the next matching hit into `i`, which is then skipped, so consecutive hits for the same key survive the reset — iterate from the end backwards or rebuild with `filter`.\n[minor] allow()/prune() — `hits.filter(...)` allocates a fresh array on every `allow()` and repeated `hits.shift()` is O(n), so cost grows quadratically as hits accumulate — keep per-key queues in a Map and remove expired entries from the front in place.\n[minor] prune() — assumes `hits[0]` is the oldest, which only holds if `now()` is monotonic; a clock that moves backwards leaves stale hits unpruned — document/validate the monotonic-clock requirement or locate the minimum time explicitly.\n[minor] allow() — uses strict `< t - windowMs`, so a hit exactly at the boundary is retained — confirm whether the window is inclusive or exclusive; likely want `<=` for a true sliding window.\n[minor] API — `reset(key)` returns nothing and is a no-op for unknown keys, and `allow()` exposes no remaining quota or retry-after value — callers cannot confirm the reset worked or know when to retry — return status/metadata.\n[nit] allow()/reset() — key matching uses `===`, so object keys only match by identity — document that keys should be primitives or accept a comparator.\n[minor] tests — no tests accompany the module; the injectable `now()` makes deterministic coverage straightforward — add cases for sliding-window expiry, exact boundary time, multiple keys, and reset with consecutive duplicate hits.",
          "kind": "technical"
        }
      }
    },
    "muse1": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/muse-spark-1-3-run-1/01-poster.thin.svg",
          "thumb": null,
          "bytes": 9886,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/muse-spark-1-3-run-1/01-poster.thick.svg",
          "thumb": null,
          "bytes": 3290,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/muse-spark-1-3-run-1/02-interface.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/02-thin.jpg",
          "bytes": 5718,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/muse-spark-1-3-run-1/02-interface.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/02-thick.jpg",
          "bytes": 10347,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/muse-spark-1-3-run-1/03-critique.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/03-thin.jpg",
          "bytes": 3554,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 67w",
              "tone": ""
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/muse-spark-1-3-run-1/03-critique.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/03-thick.jpg",
          "bytes": 3891,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 79w",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/muse-spark-1-3-run-1/04-motion.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/04-thin.jpg",
          "bytes": 2758,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/muse-spark-1-3-run-1/04-motion.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-1/04-thick.jpg",
          "bytes": 4205,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/muse-spark-1-3-run-1/05-explanation.thin.md",
          "thumb": null,
          "bytes": 605,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "102 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# DNS: The Internet's Address Book\n\nEvery website lives at a number called an IP address, like `142.250.72.14`. Nobody wants to memorize those, so we use names like `google.com`.\n\nDNS translates names into numbers.\n\n1. You type `google.com`.\n2. Your computer asks a DNS resolver: \"What's the address?\"\n3. If it doesn't know, it asks down a chain: root servers, then `.com` servers, then Google's own servers.\n4. It gets back the correct IP address and saves it for next time.\n5. Your browser connects to that number and loads the site.\n\nIt all happens in milliseconds — you just see the website appear.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/muse-spark-1-3-run-1/05-explanation.thick.md",
          "thumb": null,
          "bytes": 753,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "127 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Why Typing a Name Finds a Website\n\nComputers find each other by numbers, but people remember by names. DNS (the system that matches names to those numbers) bridges that gap.\n\nWhen you type an address (the name you see, such as example.com) your browser (the program showing web pages) asks a chain of servers (other computers that answer questions). One points to the next until one returns the matching number, called an IP address (the computer's actual location). Your browser then visits that location to get the page.\n\nAnswers are remembered for a short time, called caching (reusing a recent answer instead of asking again), because asking every time would be slow.\n\nMost failures are typing mistakes or a server that is off or cannot be reached.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/muse-spark-1-3-run-1/06-fiction.thin.md",
          "thumb": null,
          "bytes": 630,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Mara inherited the house on Linden Street with its leaning porch and dusty attic full of forgotten winters. She kept everything except time itself, which pooled in corners like water. The broken clock above the fireplace had stopped at 3:17 decades ago, its hands rusted together in stubborn agreement. Each morning she wound other clocks, polished their glass, listened to their ticking fill empty rooms. Yet evenings drew her back to the silent one. It asked nothing, promised nothing, remembered her father napping beneath it. Some things, she understood, are truer stopped than moving endlessly forward without rest or mercy.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/muse-spark-1-3-run-1/06-fiction.thick.md",
          "thumb": null,
          "bytes": 574,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Mara stayed late in the accounting office to finish payroll before the audit.\nShe kept glancing at the wall clock above the door, which showed half past seven.\nShe matched each total against paper receipts, initialed each page, and stacked them for scanning.\nAt what she took for eight, she sent the files and shut down her computer.\nTired, she reached for her phone and saw the screen read nearly ten.\nThe wall clock had stopped during the afternoon without her noticing.\nShe gathered her bag, turned off the lights, and left the office determined to check the time twice.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/muse-spark-1-3-run-1/07-build.thin.mjs",
          "thumb": null,
          "bytes": 4064,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "143 lines",
              "tone": ""
            },
            {
              "text": "11 tests pass",
              "tone": "ok"
            }
          ],
          "note": "143 lines with full unit names and bare-number seconds. Capable, but overbuilt.",
          "trimmed": false,
          "text": "export function parseDuration(input) {\n  if (typeof input !== \"string\") {\n    throw new TypeError(\"parseDuration expects a string\");\n  }\n  const s = input.trim();\n  if (s === \"\") {\n    throw new Error(\"parseDuration: empty string\");\n  }\n\n  const UNITS = {\n    ms: 0.001,\n    millisecond: 0.001,\n    milliseconds: 0.001,\n    s: 1,\n    sec: 1,\n    secs: 1,\n    second: 1,\n    seconds: 1,\n    m: 60,\n    min: 60,\n    mins: 60,\n    minute: 60,\n    minutes: 60,\n    h: 3600,\n    hr: 3600,\n    hrs: 3600,\n    hour: 3600,\n    hours: 3600,\n    d: 86400,\n    day: 86400,\n    days: 86400,\n    w: 604800,\n    week: 604800,\n    weeks: 604800,\n  };\n\n  // Bare number means seconds, e.g. \"45\" -> 45, \"1.5\" -> 1.5\n  if (/^[+-]?\\d+(?:\\.\\d+)?$/.test(s)) {\n    return Number(s);\n  }\n\n  const re = /([+-]?\\d+(?:\\.\\d+)?)\\s*([a-zA-Z]+)/g;\n  let total = 0;\n  let matched = \"\";\n  let count = 0;\n  let m;\n  while ((m = re.exec(s)) !== null) {\n    const value = Number(m[1]);\n    const unit = m[2].toLowerCase();\n    if (!Number.isFinite(value)) {\n      throw new Error(`parseDuration: invalid number in ${JSON.stringify(input)}`);\n    }\n    if (!(unit in UNITS)) {\n      throw new Error(`parseDuration: unknown unit ${JSON.stringify(m[2])} in ${JSON.stringify(input)}`);\n    }\n    total += value * UNITS[unit];\n    matched += m[0];\n    count += 1;\n  }\n\n  if (count === 0) {\n    throw new Error(`parseDuration: invalid duration ${JSON.stringify(input)}`);\n  }\n\n  // Ensure the whole string was consumed (allowing whitespace between parts)\n  const stripped = s.replace(/\\s+/g, \"\");\n  const consumed = matched.replace(/\\s+/g, \"\");\n  if (stripped !== consumed) {\n    throw new Error(`parseDuration: invalid duration ${JSON.stringify(input)}`);\n  }\n\n  return total;\n}\n\nimport test, { describe, it } from \"node:test\";\nimport assert from \"node:assert/strict\";\n\ndescribe(\"parseDuration\", () => {\n  it(\"parses '1h30m' to 5400 seconds\", () => {\n    assert.equal(parseDuration(\"1h30m\"), 5400);\n  });\n\n  it(\"parses single units\", () => {\n    assert.equal(parseDuration(\"90s\"), 90);\n    assert.equal(parseDuration(\"30m\"), 1800);\n    assert.equal(parseDuration(\"1h\"), 3600);\n    assert.equal(parseDuration(\"1d\"), 86400);\n    assert.equal(parseDuration(\"1w\"), 604800);\n  });\n\n  it(\"parses multi-part durations\", () => {\n    assert.equal(parseDuration(\"1m30s\"), 90);\n    assert.equal(parseDuration(\"2h45m10s\"), 2 * 3600 + 45 * 60 + 10);\n    assert.equal(parseDuration(\"1w2d3h4m5s\"), 604800 + 2 * 86400 + 3 * 3600 + 4 * 60 + 5);\n  });\n\n  it(\"parses decimals\", () => {\n    assert.equal(parseDuration(\"1.5h\"), 5400);\n    assert.equal(parseDuration(\"0.5m\"), 30);\n    assert.equal(parseDuration(\"1.5m30s\"), 120);\n  });\n\n  it(\"parses milliseconds to fractional seconds\", () => {\n    assert.equal(parseDuration(\"1500ms\"), 1.5);\n    assert.equal(parseDuration(\"1s500ms\"), 1.5);\n  });\n\n  it(\"ignores whitespace and case\", () => {\n    assert.equal(parseDuration(\"1h 30m\"), 5400);\n    assert.equal(parseDuration(\"  1H30M  \"), 5400);\n    assert.equal(parseDuration(\"1h30m\"), parseDuration(\"1H 30M\"));\n  });\n\n  it(\"supports long unit names\", () => {\n    assert.equal(parseDuration(\"1 hour 30 minutes\"), 5400);\n    assert.equal(parseDuration(\"2 days\"), 172800);\n    assert.equal(parseDuration(\"45 seconds\"), 45);\n  });\n\n  it(\"treats a bare number as seconds\", () => {\n    assert.equal(parseDuration(\"45\"), 45);\n    assert.equal(parseDuration(\"1.5\"), 1.5);\n  });\n\n  it(\"parses zero\", () => {\n    assert.equal(parseDuration(\"0s\"), 0);\n    assert.equal(parseDuration(\"0h0m0s\"), 0);\n  });\n\n  it(\"throws on invalid input\", () => {\n    assert.throws(() => parseDuration(\"\"), /empty/);\n    assert.throws(() => parseDuration(\"abc\"));\n    assert.throws(() => parseDuration(\"10x\"));\n    assert.throws(() => parseDuration(\"1h30\"), /invalid/);\n    assert.throws(() => parseDuration(\"--5s\"));\n  });\n\n  it(\"throws TypeError on non-string\", () => {\n    assert.throws(() => parseDuration(90), TypeError);\n    assert.throws(() => parseDuration(null), TypeError);\n    assert.throws(() => parseDuration(undefined), TypeError);\n  });\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/muse-spark-1-3-run-1/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2089,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "41 lines",
              "tone": ""
            },
            {
              "text": "9 tests pass",
              "tone": "ok"
            }
          ],
          "note": "41 lines, a character-by-character parser and nine tests. Compact and correct.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\nexport function parseDuration(input) {\n  if (typeof input !== 'string') throw new TypeError('parseDuration: input must be a string');\n  if (input === '') throw new TypeError('parseDuration: empty string');\n  const secs = { h: 3600, m: 60, s: 1 };\n  const seen = new Set();\n  let total = 0;\n  let digits = '';\n  for (const ch of input) {\n    if (ch >= '0' && ch <= '9') { digits += ch; continue; }\n    if (ch === '-') throw new TypeError('parseDuration: negative numbers not allowed');\n    const u = ch.toLowerCase();\n    if (!(u in secs)) throw new TypeError(`parseDuration: unknown unit '${ch}'`);\n    if (digits === '') throw new TypeError(`parseDuration: missing number before '${ch}'`);\n    if (seen.has(u)) throw new TypeError(`parseDuration: repeated unit '${u}'`);\n    seen.add(u);\n    total += Number(digits) * secs[u];\n    digits = '';\n  }\n  if (digits !== '') throw new TypeError('parseDuration: bare number with no unit');\n  if (seen.size === 0) throw new TypeError('parseDuration: no segments found');\n  return total;\n}\ntest('happy paths', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('2h'), 7200);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n});\ntest('composite out of order', () => {\n  assert.equal(parseDuration('30s1h10m'), 4230);\n});\ntest('rejects empty', () => { assert.throws(() => parseDuration(''), TypeError); });\ntest('rejects unknown unit', () => { assert.throws(() => parseDuration('5x'), TypeError); });\ntest('rejects repeated unit', () => { assert.throws(() => parseDuration('1h2H'), TypeError); });\ntest('rejects bare number', () => { assert.throws(() => parseDuration('123'), TypeError); });\ntest('rejects negative', () => { assert.throws(() => parseDuration('-5s'), TypeError); });\ntest('rejects non-string', () => { assert.throws(() => parseDuration(90), TypeError); });\ntest('rejects spaces', () => { assert.throws(() => parseDuration('1h 30m'), TypeError); });\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/muse-spark-1-3-run-1/08-review.thin.md",
          "thumb": null,
          "bytes": 5288,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "753 words"
            }
          ],
          "note": "Both bugs with a clear type-coercion explanation; longer, but accurate.",
          "trimmed": false,
          "text": "# Code Review: `createLimiter`\n\n## Summary\n\nIntent is a per-key fixed/sliding window rate limiter with injectable clock. The implementation is small and readable, but it has at least two correctness bugs that break core behavior, plus validation, performance, and API-clarity gaps.\n\n## Critical Defects — Must Fix\n\n### 1. Sliding-window expiry never fires — `prune()` compares the wrong type\n\n- `hits` stores objects shaped `{ key, time }`.\n- `prune(t)` tests `hits[0] < t - windowMs`.\n- An object compared to a number does not yield its `time` field, so the `while` condition is never true in the intended way.\n- Effect: old entries are never evicted. The window grows without bound, `allow()` eventually denies everything once a key reaches `limit` total hits, and memory leaks.\n- Comment only: the comparison needs to inspect the stored timestamp property, and the inclusive vs. exclusive boundary at exactly `t - windowMs` should be decided and documented.\n\n### 2. `reset(key)` skips entries — mutating while iterating forward\n\n- The loop is `for (let i = 0; i < hits.length; i++)` with `hits.splice(i, 1)` on match and no index adjustment.\n- After a removal, all later elements shift left by one, then `i++` advances past the element that just moved into position `i`.\n- Effect: with two or more consecutive entries for the same `key`, every other one survives. `reset()` therefore does not reliably reset.\n- Comment only: this needs a backwards iteration, an index correction after splice, or a non-mutating rebuild. Also confirm whether `reset()` should prune expired entries first.\n\n## Correctness / Edge Cases\n\n### 3. Time ordering assumption is undocumented and fragile\n\n- `prune()` assumes `hits` is chronologically ordered because it only inspects `hits[0]`.\n- The injected `now()` can move backwards in tests or with clock skew, and nothing enforces monotonic time.\n- Comment: document whether non-monotonic clocks are supported, and what happens on backwards jumps.\n\n### 4. Window boundary semantics are implicit\n\n- With `<` versus `<=`, an entry timestamped exactly at `t - windowMs` is either kept or dropped.\n- Comment: choose and document inclusive/exclusive behavior, especially since tests with a fake `now()` will hit the exact boundary.\n\n### 5. No input validation\n\n- No checks on `limit`, `windowMs`, or `key`.\n- Consider: `limit = 0`, negative or fractional `limit`, `windowMs <= 0`, `NaN`, missing `key`, or non-string keys.\n- Currently `allow(undefined)` would record a bucket under `undefined`, which is almost certainly not intended but is silently accepted.\n- Comment: validate constructor options and decide whether invalid input throws, clamps, or is ignored.\n\n### 6. `reset()` contract for missing / absent key is unclear\n\n- `reset(key)` with no argument, with `undefined`, or with a never-seen key silently does nothing (apart from the bug above).\n- Comment: document whether `reset()` with no key should clear all buckets, and whether resetting an unknown key is a no-op.\n\n## Performance / Scalability\n\n### 7. `allow()` is O(n) per call\n\n- Every call runs `hits.filter(h => h.key === key).length`, scanning all keys' histories.\n- Comment: this is fine for tiny use but degrades with many keys or high throughput. A per-key queue / `Map<key, timestamps[]>` would isolate buckets.\n\n### 8. `shift()` in a loop is O(n) per eviction\n\n- Repeated `shift()` reindexes the array.\n- Comment: for a high-volume limiter, prefer a start-index pointer with periodic compaction or per-key queues.\n\n### 9. Unbounded cardinality\n\n- Expired entries are meant to be pruned globally, which helps, but live state still grows with distinct-key count within the window.\n- Comment: document expected key cardinality and whether eviction of idle keys is needed.\n\n## API / Observability\n\n### 10. Minimal return value limits usability\n\n- `allow()` returns only boolean. Callers building `429` responses typically need remaining quota, limit, reset time, or retry delay.\n- Comment: consider whether the API should expose that metadata or keep the minimal contract and document the limitation.\n\n### 11. No introspection for tests or monitoring\n\n- No way to read current count, bucket size, or total stored entries.\n- Combined with the injectable `now()`, which is good for testability, the lack of introspection makes the expiry bug harder to catch.\n- Comment: document how callers should test expiry and reset.\n\n## Style / Maintainability\n\n### 12. Missing contract documentation\n\n- No JSDoc for parameters, return shape, window semantics, per-key isolation, or thread/reentrancy expectations.\n- Comment: a short contract would prevent divergent assumptions about `reset()`, boundary handling, and `now()` monotonicity.\n\n### 13. Test suggestions (no code changes proposed here)\n\n- Expiry: fill to limit, advance clock past `windowMs`, expect allowance again.\n- Boundary: hit exactly at `t - windowMs`.\n- Reset with interleaved keys: `a, b, a, a`, reset `a`, verify `b` untouched and `a` fully cleared.\n- Reset with consecutive same-key entries specifically, to catch the splice-skip.\n- Storage growth: many expired entries followed by time advance, verify internal size does not grow without bound.\n- Invalid options and missing keys.\n- Backwards clock movement, if supported.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/muse-spark-1-3-run-1/08-review.thick.md",
          "thumb": null,
          "bytes": 2029,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact format. Strong; the run has fidelity caveats elsewhere.",
          "trimmed": false,
          "text": "[blocker] prune() — `hits[0] < t - windowMs` compares an entry object to a number so it is always false and nothing is ever evicted — limiter never slides and permanently denies after `limit` hits — compare `hits[0].time` against the cutoff.\n[blocker] reset(key) — forward loop with `hits.splice(i, 1)` advances past the shifted element so consecutive entries for the key are skipped — reset leaves stale hits and the key stays blocked — iterate backwards or decrement `i` after splicing.\n[major] allow()/prune() — `hits.filter()` scans all keys per call and `shift()` in a loop makes eviction quadratic — throughput collapses and memory grows with total traffic — store per-key timestamp queues in a `Map` with a head index.\n[major] createLimiter({limit, windowMs}) — no validation of zero/negative/NaN/Infinity values — invalid config silently yields always-deny or never-expire behavior — throw `RangeError` for `limit < 1` non-integer and `windowMs <= 0` non-finite.\n[major] allow(key)/reset(key) — any `key` type is accepted with no normalization — `undefined`/object keys collide or never match so quota isolation breaks silently — validate key type or use `Map` key semantics and document them.\n[minor] prune() cutoff uses `<` with no specified boundary — entry exactly `windowMs` old is retained, making the window inclusive and edge counts ambiguous — pin behavior with a test using exact-boundary timestamps and choose `<` vs `<=` explicitly.\n[minor] `now()` is assumed monotonic — clock skew or a mock moving backwards inserts out-of-order `time` values that head-only global `prune` cannot evict — stale entries linger or fresh entries expire early — clamp `t` to last-seen time or document a monotonic-clock requirement.\n[minor] tests — no coverage for window slide, per-key isolation, consecutive-entry reset, or invalid options — both loop bugs pass a single happy-path check — add cases for expiry boundary, multi-key counts, back-to-back reset, and rejected config.\n",
          "kind": "technical"
        }
      }
    },
    "muse2": {
      "01": {
        "thin": {
          "file": "01-poster.thin.svg",
          "path": "artifacts/muse-spark-1-3-run-2/01-poster.thin.svg",
          "thumb": null,
          "bytes": 14964,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "01-poster.thick.svg",
          "path": "artifacts/muse-spark-1-3-run-2/01-poster.thick.svg",
          "thumb": null,
          "bytes": 4488,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "SVG"
            },
            {
              "text": "1080 × 1350"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        }
      },
      "02": {
        "thin": {
          "file": "02-interface.thin.html",
          "path": "artifacts/muse-spark-1-3-run-2/02-interface.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/02-thin.jpg",
          "bytes": 7892,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            }
          ],
          "note": "",
          "trimmed": false,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "02-interface.thick.html",
          "path": "artifacts/muse-spark-1-3-run-2/02-interface.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/02-thick.jpg",
          "bytes": 6585,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        }
      },
      "03": {
        "thin": {
          "file": "03-critique.thin.html",
          "path": "artifacts/muse-spark-1-3-run-2/03-critique.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/03-thin.jpg",
          "bytes": 5180,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 30w",
              "tone": ""
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "03-critique.thick.html",
          "path": "artifacts/muse-spark-1-3-run-2/03-critique.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/03-thick.jpg",
          "bytes": 2255,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1440 × 900"
            },
            {
              "text": "note 54w",
              "tone": ""
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        }
      },
      "04": {
        "thin": {
          "file": "04-motion.thin.html",
          "path": "artifacts/muse-spark-1-3-run-2/04-motion.thin.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/04-thin.jpg",
          "bytes": 2416,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        },
        "thick": {
          "file": "04-motion.thick.html",
          "path": "artifacts/muse-spark-1-3-run-2/04-motion.thick.html",
          "thumb": "thumbs/muse-spark-1-3-run-2/04-thick.jpg",
          "bytes": 2280,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "HTML"
            },
            {
              "text": "1280 × 720"
            },
            {
              "text": "8s loop"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "",
          "trimmed": true,
          "text": null,
          "kind": "creative"
        }
      },
      "05": {
        "thin": {
          "file": "05-explanation.thin.md",
          "path": "artifacts/muse-spark-1-3-run-2/05-explanation.thin.md",
          "thumb": null,
          "bytes": 627,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "103 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# How DNS Works\n\nComputers find each other using numbers called IP addresses, like 142.250.72.14. Humans prefer names like example.com. DNS translates names to numbers.\n\nWhen you type a web address:\n\n1. Your computer asks a resolver, usually run by your internet provider.\n2. If it recently looked up that name, it answers from memory.\n3. Otherwise it asks around: the root directory, then the directory for `.com`, then the site's own directory.\n4. That final directory gives the correct number.\n5. Your computer uses it to connect.\n\nThe result is saved briefly, so the next visit is faster. All this happens in milliseconds.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "05-explanation.thick.md",
          "path": "artifacts/muse-spark-1-3-run-2/05-explanation.thick.md",
          "thumb": null,
          "bytes": 761,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "124 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "# Where Names Become Places\n\nDNS (the system that turns typed names into computer locations) exists because people remember words while computers connect using numbers.\n\nWhen you type an address (the words you enter, such as example.com) your browser (the program that shows web pages) asks a resolver (a helper computer that already knows where to start looking) for the matching number. That helper checks with the computers in charge of each part of the name until one returns the current number. Your browser then contacts that number and the page appears.\n\nAnswers are remembered for a set lifetime (a short reuse period) so repeat visits skip the search and load faster.\n\nMost failures are simple: a mistyped name or the helper being briefly unreachable.\n",
          "kind": "writing"
        }
      },
      "06": {
        "thin": {
          "file": "06-fiction.thin.md",
          "path": "artifacts/muse-spark-1-3-run-2/06-fiction.thin.md",
          "thumb": null,
          "bytes": 670,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Mara inherited the old farmhouse after her grandmother passed, accepting dust, mice, and silence without complaint. In the hallway hung a broken clock, its hands frozen at midnight, its chime forever swallowed. She never repaired it, preferring time softened and unmeasured. Mornings she baked bread, evenings she tended roses climbing the porch rails. Seasons turned outside while inside remained still, gentle, unhurried. Neighbors called her strange for living beside stopped time, yet she felt freed. Without ticking hours, memories lingered longer, grief eased slower, joy deepened. At night she touched the glass, grateful that some moments refuse to pass onward.\n",
          "kind": "writing"
        },
        "thick": {
          "file": "06-fiction.thick.md",
          "path": "artifacts/muse-spark-1-3-run-2/06-fiction.thick.md",
          "thumb": null,
          "bytes": 605,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "100 words",
              "tone": ""
            }
          ],
          "note": "",
          "trimmed": false,
          "text": "Mara stayed late to finish quarterly reports alone in the empty office. The wall clock above the copier read seven forty, giving her confidence she could still catch the eight fifteen bus downtown. She worked steadily through spreadsheets, checking totals twice and printing pages for review tomorrow. When she finally saved everything and shut her computer down, she noticed her phone showed nine oh six. The old clock had stopped hours earlier. She missed her bus and felt anger rising. She gathered her bag slowly and settled onto the couch to wait for the next morning departure in quiet frustration.\n",
          "kind": "writing"
        }
      },
      "07": {
        "thin": {
          "file": "07-build.thin.mjs",
          "path": "artifacts/muse-spark-1-3-run-2/07-build.thin.mjs",
          "thumb": null,
          "bytes": 1805,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "26 lines",
              "tone": ""
            },
            {
              "text": "7 tests pass",
              "tone": "ok"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "26 lines, very compact, with many units and bare numbers. The leanest thin solution. The saved file is a trimmed version (1.8 KB vs 6.7 KB).",
          "trimmed": true,
          "text": "import { describe, it } from \"node:test\";\nimport assert from \"node:assert/strict\";\nexport function parseDuration(input) {\n  if (typeof input !== \"string\") throw new TypeError(\"parseDuration expects a string\");\n  let s = input.trim();\n  if (s === \"\") throw new Error(\"parseDuration: empty string\");\n  let factor = 1;\n  if (s[0] === \"-\" || s[0] === \"+\") { factor = s[0] === \"-\" ? -1 : 1; s = s.slice(1).trim(); }\n  if (/^\\d+(?:\\.\\d+)?$/.test(s)) return factor * parseFloat(s);\n  const per = { ms: 0.001, s: 1, sec: 1, secs: 1, second: 1, seconds: 1, m: 60, min: 60, mins: 60, minute: 60, minutes: 60, h: 3600, hr: 3600, hrs: 3600, hour: 3600, hours: 3600, d: 86400, w: 604800, y: 31536000 };\n  const re = /(\\d+(?:\\.\\d+)?)\\s*(ms|milliseconds?|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|y)/gi;\n  let total = 0, count = 0, m; const used = [];\n  while ((m = re.exec(s)) !== null) { total += parseFloat(m[1]) * (per[m[2].toLowerCase()] ?? 1); count++; used.push(m[0]); }\n  if (count === 0) throw new Error(`parseDuration: invalid duration \"${input}\"`);\n  return factor * total;\n}\nexport default parseDuration;\ndescribe(\"parseDuration\", () => {\n  it(\"parses '1h30m' as 5400\", () => { assert.equal(parseDuration(\"1h30m\"), 5400); });\n  it(\"parses singles\", () => { assert.equal(parseDuration(\"45s\"), 45); assert.equal(parseDuration(\"2h\"), 7200); });\n  it(\"multi-component\", () => { assert.equal(parseDuration(\"1d2h3m4s\"), 86400 + 7200 + 180 + 4); });\n  it(\"spaces + case\", () => { assert.equal(parseDuration(\"1H 30M\"), 5400); });\n  it(\"bare number\", () => { assert.equal(parseDuration(\"90\"), 90); });\n  it(\"throws empty\", () => { assert.throws(() => parseDuration(\"\"), /empty/); });\n  it(\"throws TypeError non-string\", () => { assert.throws(() => parseDuration(90), TypeError); });\n});\n",
          "kind": "technical"
        },
        "thick": {
          "file": "07-build.thick.mjs",
          "path": "artifacts/muse-spark-1-3-run-2/07-build.thick.mjs",
          "thumb": null,
          "bytes": 2095,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "MJS"
            },
            {
              "text": "one file"
            },
            {
              "text": "43 lines",
              "tone": ""
            },
            {
              "text": "9 tests pass",
              "tone": "ok"
            }
          ],
          "note": "43 lines, a compact parser and nine tests. Correct; not exported.",
          "trimmed": false,
          "text": "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\nfunction parseDuration(input) {\n  if (typeof input !== 'string') throw new TypeError('input must be a string');\n  if (input === '') throw new TypeError('input must not be empty');\n  if (input.includes(' ')) throw new TypeError('spaces are not allowed');\n  const seen = {};\n  let total = 0;\n  let i = 0;\n  while (i < input.length) {\n    if (input[i] === '-') throw new TypeError('negative numbers are not allowed');\n    let j = i;\n    while (j < input.length && input[j] >= '0' && input[j] <= '9') j++;\n    if (j === i) throw new TypeError(`expected digits at index ${i}, got \"${input[i]}\"`);\n    if (j >= input.length) throw new TypeError('bare number with no unit at end');\n    const u = input[j].toLowerCase();\n    if (u !== 'h' && u !== 'm' && u !== 's') throw new TypeError(`unknown unit \"${input[j]}\"`);\n    if (seen[u]) throw new TypeError(`repeated unit \"${input[j]}\"`);\n    seen[u] = true;\n    const n = Number(input.slice(i, j));\n    total += n * (u === 'h' ? 3600 : u === 'm' ? 60 : 1);\n    i = j + 1;\n  }\n  return total;\n}\ntest('happy paths', () => {\n  assert.equal(parseDuration('0s'), 0);\n  assert.equal(parseDuration('1h'), 3600);\n  assert.equal(parseDuration('90s'), 90);\n  assert.equal(parseDuration('2h'), 7200);\n  assert.equal(parseDuration('1H2M3S'), 3723);\n});\ntest('composite any order', () => {\n  assert.equal(parseDuration('30s1h'), 3630);\n  assert.equal(parseDuration('1h30m'), 5400);\n});\ntest('rejects empty', () => assert.throws(() => parseDuration(''), TypeError));\ntest('rejects unknown unit', () => assert.throws(() => parseDuration('5x'), TypeError));\ntest('rejects repeated unit', () => assert.throws(() => parseDuration('1h2h'), TypeError));\ntest('rejects bare number', () => assert.throws(() => parseDuration('90'), TypeError));\ntest('rejects negative', () => assert.throws(() => parseDuration('-5s'), TypeError));\ntest('rejects non-string', () => assert.throws(() => parseDuration(90), TypeError));\ntest('rejects spaces', () => assert.throws(() => parseDuration('1h 30m'), TypeError));\n",
          "kind": "technical"
        }
      },
      "08": {
        "thin": {
          "file": "08-review.thin.md",
          "path": "artifacts/muse-spark-1-3-run-2/08-review.thin.md",
          "thumb": null,
          "bytes": 2241,
          "chips": [
            {
              "text": "thin"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "311 words"
            },
            {
              "text": "trimmed",
              "tone": "bad"
            }
          ],
          "note": "Both bugs, concise and clear. The saved file is a trimmed version (2.2 KB vs 5.8 KB).",
          "trimmed": true,
          "text": "# Code Review: `createLimiter`\n\n> Scope: comments only — no rewrites.\n\n## Critical — correctness bugs\n\n### 1. `prune()` never prunes — type mismatch on timestamp\n- `hits` stores objects shaped `{ key, time }`.\n- `prune()` compares `hits[0] < t - windowMs`, i.e. `object < number`.\n- An object-to-number comparison here yields `NaN`, so the `<` test is always `false` and the `while` loop never executes.\n- Consequence: the window never slides; once a `key` accumulates `limit` entries, `allow(key)` denies forever.\n\n### 2. `reset(key)` skips entries — splice-while-iterating-forward\n- The loop increments `i` unconditionally, but `splice(i, 1)` shifts the element at `i + 1` down into slot `i`.\n- That shifted element is never examined, so consecutive matching entries are skipped.\n- Consequence: with 3 stored hits for the same `key`, one `reset(key)` call removes only 2, leaving stale quota consumed.\n\n## Major — design / API concerns\n\n### 3. Single shared `hits` array for all keys\n- Every key's records live in one array, and `allow()` does `hits.filter(h => h.key === key).length` on every call.\n- That makes `allow()` O(total hits across all keys) plus an allocation per call.\n\n### 4. `prune()` uses `shift()` in a loop\n- `Array.prototype.shift()` is O(n) per call; pruning `k` expired entries is O(k·n).\n\n### 5. Global prune assumes monotonically increasing `now()`\n- Correctness of the `while (hits[0] ...)` early-exit depends on `hits` being sorted by `time`, which only holds if injected `now()` never goes backward.\n\n### 6. Window boundary semantics are implicit\n- The prune condition uses strict `<` against `t - windowMs`, so an entry timestamped exactly at the boundary is retained.\n\n## Moderate — validation and edge cases\n\n### 7. No validation of `limit` / `windowMs`\n- Negative, zero, `NaN`, non-integer, `Infinity` values are accepted silently.\n\n### 8. No validation / documentation of `key`\n- `allow()` accepts anything, including `undefined`. Object keys compare by reference, a potential quota-bypass footgun.\n\n### 9. `reset(key)` API is ambiguous\n- Unclear whether `reset()` with no argument should clear everything or be a no-op. Current behavior only removes entries whose key is literally `undefined`.\n",
          "kind": "technical"
        },
        "thick": {
          "file": "08-review.thick.md",
          "path": "artifacts/muse-spark-1-3-run-2/08-review.thick.md",
          "thumb": null,
          "bytes": 2159,
          "chips": [
            {
              "text": "thick"
            },
            {
              "text": "Markdown"
            },
            {
              "text": "comments only"
            },
            {
              "text": "8 findings",
              "tone": ""
            }
          ],
          "note": "Both blockers, eight findings, exact format. Strong; the run has fidelity caveats elsewhere.",
          "trimmed": false,
          "text": "[blocker] prune() — compares `hits[0]` (an object `{key,time}`) directly against `t - windowMs` instead of `hits[0].time` — comparison is always false so nothing is ever evicted, memory grows unboundedly and keys stay blocked forever — compare `hits[0].time < t - windowMs`\n[blocker] reset(key) — `hits.splice(i, 1)` inside a forward `for` loop without adjusting `i` skips the element that shifts into index `i` — every second matching entry survives so a reset key can remain rate-limited — decrement `i` after splice or iterate backwards\n[major] prune() window boundary — uses `< t - windowMs` so an entry exactly `windowMs` old is retained and the effective window is `windowMs + 1ms` — requests at the boundary are inconsistently allowed/denied — decide inclusive vs exclusive expiry and pin it with a test at `t + windowMs`\n[major] allow(key) — scans the global `hits` array with `filter(h => h.key === key)` on every call and evicts with repeated `shift()` — cost is O(total hits across all keys) per request and O(n²) on bulk expiry — store a per-key timestamp queue in a `Map`\n[major] createLimiter({limit, windowMs, now}) — no validation of `limit`, `windowMs`, `now`, or `key` — zero/negative/NaN/Infinity values silently disable limiting or throw obscurely — validate finite non-negative numbers and callable `now`, throw `RangeError`/`TypeError` otherwise\n[minor] prune() ordering assumption — only inspects `hits[0]` so it assumes insertion order equals time order — if injected `now()` goes backwards entries behind the head are never evicted — either enforce monotonic time or prune by full scan per key\n[minor] reset(key) API — calling `reset()` with no argument or an unknown key silently clears nothing and there is no way to clear all state or query remaining quota — document whether `reset(undefined)` is a no-op and add `resetAll`/`getRemaining` for operability\n[nit] allow(key)/reset(key) key handling — key type and treatment of `undefined`/`null`/object keys is unspecified and objects compare by identity — document that keys are compared with `===` and whether missing keys should throw\n",
          "kind": "technical"
        }
      }
    }
  }
};

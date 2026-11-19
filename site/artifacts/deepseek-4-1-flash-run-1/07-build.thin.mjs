/**
 * parseDuration — convert a human-readable duration such as "1h30m" to seconds.
 *
 * Grammar (units are case-insensitive; whitespace may separate components):
 *
 *   duration  := component component*
 *   component := number unit
 *   number    := digits [ "." digits ] | "." digits
 *   unit      := "ms" | "w" | "d" | "h" | "m" | "s"
 *
 * Units: w = weeks, d = days, h = hours, m = minutes, s = seconds, ms = milliseconds.
 *
 *   parseDuration("1h30m")     // 5400
 *   parseDuration("2d 4h")     // 187200
 *   parseDuration("1.5h")      // 5400
 *   parseDuration("1s 250ms")  // 1.25
 *
 * A bare number ("90") is rejected because its unit would be guesswork. Unknown
 * units, repeated units, negative values and trailing text are rejected too.
 * The result is rounded to nanosecond precision to strip binary float noise.
 *
 * Run the tests:
 *   node parse-duration.mjs
 *   node --test parse-duration.mjs
 *
 * Requires Node.js 18+ (node:test).
 */

import assert from 'node:assert/strict';
import test from 'node:test';

/** Number of seconds in one of each supported unit. */
const SECONDS_PER_UNIT = Object.freeze({
  w: 7 * 24 * 60 * 60,
  d: 24 * 60 * 60,
  h: 60 * 60,
  m: 60,
  s: 1,
  ms: 1 / 1000,
});

/** Results are rounded to this many decimal places' worth of precision. */
const RESULT_PRECISION = 1e9;

/**
 * Parse a duration string into a number of seconds.
 *
 * @param {string} input Duration such as "1h30m", "2d 4h" or "1.5h".
 * @returns {number} The duration in seconds.
 * @throws {TypeError} If `input` is not a string.
 * @throws {SyntaxError} If `input` is not a valid duration.
 */
export function parseDuration(input) {
  if (typeof input !== 'string') {
    const received = input === null ? 'null' : typeof input;
    throw new TypeError(`parseDuration expected a string, received ${received}`);
  }

  const source = input.trim();
  if (source === '') {
    throw new SyntaxError('parseDuration received an empty string');
  }

  // Fresh regex per call: no shared lastIndex state between calls.
  const componentPattern = /(\d+(?:\.\d+)?|\.\d+)(ms|w|d|h|m|s)/gi;
  const seen = new Set();
  let total = 0;
  let cursor = 0;
  let components = 0;

  for (
    let match = componentPattern.exec(source);
    match !== null;
    match = componentPattern.exec(source)
  ) {
    const gap = source.slice(cursor, match.index);
    if (gap.trim() !== '') {
      throw unexpectedChunk(input, gap);
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();

    if (!Number.isFinite(amount)) {
      throw new SyntaxError(
        `parseDuration cannot represent the amount ${quote(match[1])} in ${quote(input)}`,
      );
    }
    if (seen.has(unit)) {
      throw new SyntaxError(
        `parseDuration found the unit ${quote(unit)} more than once in ${quote(input)}`,
      );
    }

    seen.add(unit);
    total += amount * SECONDS_PER_UNIT[unit];
    cursor = componentPattern.lastIndex;
    components += 1;
  }

  if (components === 0) {
    throw unexpectedChunk(input, source);
  }

  const rest = source.slice(cursor);
  if (rest.trim() !== '') {
    throw unexpectedChunk(input, rest);
  }

  if (!Number.isFinite(total)) {
    throw new SyntaxError(`parseDuration produced a non-finite result for ${quote(input)}`);
  }

  return Math.round(total * RESULT_PRECISION) / RESULT_PRECISION;
}

export default parseDuration;

/** Render a value as a quoted string for error messages. */
function quote(value) {
  return JSON.stringify(value);
}

/** Build a SyntaxError for a fragment the parser could not consume. */
function unexpectedChunk(input, chunk) {
  return new SyntaxError(
    `parseDuration could not parse ${quote(chunk.trim())} in ${quote(input)}; ` +
      'expected components such as 1w, 2d, 3h, 4m, 5s or 250ms',
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test('parses the documented example', () => {
  assert.equal(parseDuration('1h30m'), 5400);
});

test('returns a number', () => {
  assert.equal(typeof parseDuration('1h30m'), 'number');
});

test('parses single units', () => {
  const cases = [
    ['0s', 0],
    ['45s', 45],
    ['2m', 120],
    ['3h', 10800],
    ['4d', 345600],
    ['1w', 604800],
    ['250ms', 0.25],
  ];

  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, input);
  }
});

test('parses mixed units in any order', () => {
  const cases = [
    ['1h30m', 5400],
    ['30m1h', 5400],
    ['1w2d3h4m5s', 788645],
    ['2d4h', 187200],
    ['1d12h', 129600],
    ['1h1m1s', 3661],
    ['1s500ms', 1.5],
  ];

  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, input);
  }
});

test('accepts fractional amounts', () => {
  const cases = [
    ['1.5h', 5400],
    ['.5h', 1800],
    ['2.5m', 150],
    ['1.25s', 1.25],
    ['1.234567s', 1.234567],
    ['1500ms', 1.5],
  ];

  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, input);
  }
});

test('rounds away binary floating-point noise', () => {
  assert.equal(parseDuration('0.1h'), 360);
  assert.equal(parseDuration('1.1h'), 3960);
});

test('ignores whitespace around and between components', () => {
  assert.equal(parseDuration('1h 30m'), 5400);
  assert.equal(parseDuration('  1h   30m  '), 5400);
  assert.equal(parseDuration('1h\t30m'), 5400);
  assert.equal(parseDuration('1h\n30m'), 5400);
  assert.equal(parseDuration('1w 2d 3h 4m 5s'), 788645);
});

test('treats units case-insensitively', () => {
  assert.equal(parseDuration('1H30M'), 5400);
  assert.equal(parseDuration('2D'), 172800);
  assert.equal(parseDuration('1S500MS'), 1.5);
});

test('is stateless across calls, including failed ones', () => {
  assert.equal(parseDuration('1h'), 3600);
  assert.throws(() => parseDuration('1x'), SyntaxError);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('1h30m'), 5400);
});

test('rejects malformed durations with a SyntaxError', () => {
  const invalid = [
    '',
    '   ',
    '1',
    '90',
    'h',
    'ms',
    '1h30',
    '1x',
    '1hour',
    '1h 30m!',
    '1h,30m',
    '1:30',
    '1..5h',
    '1.5.5h',
    '1e3s',
    '-1h',
    '+1h',
    '1h2h',
    '1h 2H',
    '1s 2s',
    '1 h',
    '1h 30 m',
    'NaNh',
    'Infinitys',
    '1'.repeat(400) + 'h',
  ];

  for (const input of invalid) {
    assert.throws(
      () => parseDuration(input),
      SyntaxError,
      `expected ${JSON.stringify(input)} to throw`,
    );
  }
});

test('rejects non-string input with a TypeError', () => {
  const invalid = [null, undefined, 42, {}, [], true];

  for (const input of invalid) {
    assert.throws(
      () => parseDuration(input),
      TypeError,
      `expected ${String(input)} to throw`,
    );
  }
});

test('names the offending input in its error message', () => {
  assert.throws(
    () => parseDuration('1h nope'),
    (error) => {
      assert.ok(error instanceof SyntaxError);
      assert.match(error.message, /"1h nope"/);
      return true;
    },
  );
});
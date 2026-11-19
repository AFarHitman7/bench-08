/**
 * parse-duration.mjs — parse human-readable duration strings into seconds.
 *
 *   parseDuration('1h30m')  // -> 5400
 *
 * Grammar (case-insensitive; whitespace is optional between number and unit
 * and between components; a leading +/- applies to the whole duration):
 *
 *   duration  := [sign] component { [whitespace] component }
 *   component := number [whitespace] unit
 *   number    := digits [ "." digits ]
 *   unit      := ns | us | µs | ms
 *              | s | sec | secs | second | seconds
 *              | m | min | mins | minute | minutes
 *              | h | hr | hrs | hour | hours
 *              | d | day | days
 *              | w | week | weeks
 *              | y | year | years        (1 y = 365 d)
 *
 * Sub-second units yield fractional seconds. "-1h30m" is -5400 (the sign
 * applies to the whole duration, not just the first component).
 * Throws TypeError for non-string input, RangeError for unparseable strings.
 *
 * Self-test: node parse-duration.mjs
 * (The suite runs whenever this module is loaded or executed.)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

// Seconds per unit, keyed lowercase. A Map (not a plain object) so that
// strings like "constructor" or "toString" cannot leak from Object.prototype.
// Note: String#toLowerCase maps U+00B5 (µ, micro sign) to U+03BC (μ, greek
// mu), so both spellings of "microsecond" are kept as keys.
const UNIT_SECONDS = new Map([
  ['ns', 1e-9],
  ['us', 1e-6],
  ['\u00B5s', 1e-6],
  ['\u03BCs', 1e-6],
  ['ms', 1e-3],
  ['s', 1], ['sec', 1], ['secs', 1], ['second', 1], ['seconds', 1],
  ['m', 60], ['min', 60], ['mins', 60], ['minute', 60], ['minutes', 60],
  ['h', 3600], ['hr', 3600], ['hrs', 3600], ['hour', 3600], ['hours', 3600],
  ['d', 86400], ['day', 86400], ['days', 86400],
  ['w', 604800], ['week', 604800], ['weeks', 604800],
  ['y', 31536000], ['year', 31536000], ['years', 31536000],
]);

// One component at the start of `rest`: number, optional space, unit
// (ASCII letters plus µ/μ/Μ), optional trailing space.
const COMPONENT_RE = /^(\d+(?:\.\d+)?)\s*([a-zA-Z\u00B5\u03BC\u039C]+)\s*/;

/**
 * Parse a duration string and return the total seconds.
 *
 * @param {string} input - e.g. '1h30m', '1.5h', '500ms', '- 1h 30m'
 * @returns {number} seconds (fractional for sub-second units)
 * @throws {TypeError} if input is not a string
 * @throws {RangeError} if the string is empty or not a valid duration
 */
export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError(
      `parseDuration expects a string, got ${input === null ? 'null' : typeof input}`
    );
  }

  let rest = input.trim();
  if (rest === '') {
    throw new RangeError('parseDuration: empty duration string');
  }

  let sign = 1;
  if (rest[0] === '+' || rest[0] === '-') {
    if (rest[0] === '-') sign = -1;
    rest = rest.slice(1).trim();
  }

  let seconds = 0;
  let components = 0;
  while (rest !== '') {
    const match = COMPONENT_RE.exec(rest);
    if (match === null) {
      throw new RangeError(`parseDuration: invalid duration near "${rest}"`);
    }
    const unitSeconds = UNIT_SECONDS.get(match[2].toLowerCase());
    if (unitSeconds === undefined) {
      throw new RangeError(`parseDuration: unknown unit "${match[2]}"`);
    }
    seconds += Number(match[1]) * unitSeconds;
    components += 1;
    rest = rest.slice(match[0].length);
  }

  if (components === 0) {
    throw new RangeError('parseDuration: no duration components found');
  }

  const total = sign * seconds;
  return total === 0 ? 0 : total; // normalize -0 to 0
}

test('headline example: parseDuration("1h30m") -> 5400 seconds', () => {
  assert.equal(parseDuration('1h30m'), 5400);
});

test('single components convert to seconds', () => {
  const cases = [
    ['0s', 0],
    ['1s', 1],
    ['90s', 90],
    ['1sec', 1],
    ['90secs', 90],
    ['1m', 60],
    ['1min', 60],
    ['5mins', 300],
    ['1minute', 60],
    ['2 minutes', 120],
    ['1h', 3600],
    ['1hr', 3600],
    ['2hrs', 7200],
    ['1hour', 3600],
    ['3 hours', 10800],
    ['1d', 86400],
    ['2 days', 172800],
    ['1w', 604800],
    ['1 week', 604800],
    ['1y', 31536000],
    ['1 year', 31536000],
  ];
  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);
  }
});

test('combined components sum up, in any order', () => {
  const cases = [
    ['2m30s', 150],
    ['1h30m0s', 5400],
    ['30m1h', 5400],
    ['1d12h', 129600],
    ['1w2d', 777600],
    ['1w2d3h4m5s', 788645],
    ['1y1w1d1h1m1s', 32230861],
    ['1 hour 30 minutes', 5400],
    ['1d 2h 3m', 93780],
    ['15m15m', 1800],
    ['0h0m30s', 30],
    ['01h', 3600],
  ];
  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);
  }
});

test('units are case-insensitive', () => {
  const cases = [
    ['1H30M', 5400],
    ['1Hr', 3600],
    ['1MIN', 60],
    ['2 Days', 172800],
    ['1WEEK', 604800],
  ];
  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);
  }
});

test('whitespace is optional and tolerated everywhere', () => {
  const cases = [
    ['1h 30m', 5400],
    ['1 h 30 m', 5400],
    ['\t1h30m\n', 5400],
    ['   1h   30m   ', 5400],
    ['1 h\t30\nm', 5400],
  ];
  for (const [input, expected] of cases) {
    assert.equal(parseDuration(input), expected, `parseDuration(${JSON.stringify(input)})`);
  }
});

test('a leading sign applies to the whole duration', () => {
  assert.equal(parseDuration('-1h30m'), -5400);
  assert.equal(parseDuration('- 1h30m'), -5400);
  assert.equal(parseDuration('+1h30m'), 5400);
  assert.equal(parseDuration('-30s'), -30);
  assert.equal(parseDuration('-0h30m'), -1800);
  assert.equal(parseDuration('+0s'), 0);
  assert.equal(parseDuration('-0s'), 0);
  assert.ok(Object.is(parseDuration('-0s'), 0), 'must not return -0');
});

test('fractional and sub-second components', () => {
  const cases = [
    ['1.5h', 5400],
    ['0.5h', 1800],
    ['1.25m', 75],
    ['0.5s', 0.5],
    ['90.5s', 90.5],
    ['0.001s', 0.001],
    ['1h30.5m', 5430],
    ['500ms', 0.5],
    ['1000ms', 1],
    ['1500ms', 1.5],
    ['1ns', 1e-9],
    ['1us', 1e-6],
    ['1\u00B5s', 1e-6], // µ, micro sign
    ['1\u00B5S', 1e-6], // µS — lowercases to greek-mu + s
    ['1\u03BCs', 1e-6], // μ, greek mu
  ];
  for (const [input, expected] of cases) {
    const actual = parseDuration(input);
    const eps = Math.abs(expected) * 1e-12 + 1e-15;
    assert.ok(
      Math.abs(actual - expected) <= eps,
      `parseDuration(${JSON.stringify(input)}) -> ${actual}, expected ~${expected}`
    );
  }
});

test('unparseable strings throw RangeError', () => {
  const bad = [
    '', '   ', '\t\n',
    '-', '+', '- ', '+-1h',
    'h', 'ms', 'sec', '90', '1.5', 'foo', 'Infinity',
    '1x', '1e3ms', 'PT1H30M',
    '1h30', '1 h 30', '1.5.5h', '1 m s',
    '1h - 30m', '1 h -30m', '1h+',
    '1 constructor', '1toString',
  ];
  for (const input of bad) {
    assert.throws(
      () => parseDuration(input),
      RangeError,
      `parseDuration(${JSON.stringify(input)})`
    );
  }
});

test('non-string input throws TypeError', () => {
  const bad = [undefined, null, 0, 90, 1.5, NaN, true, false, {}, ['1h'], () => '1h', Symbol('1h')];
  for (const input of bad) {
    assert.throws(() => parseDuration(input), TypeError);
  }
});

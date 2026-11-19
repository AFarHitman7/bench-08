import { test } from 'node:test';
import assert from 'node:assert/strict';

const SECONDS_PER = { h: 3600, m: 60, s: 1 };

export function parseDuration(input) {
  if (typeof input !== 'string')
    throw new TypeError('parseDuration: input must be a string');
  if (input === '')
    throw new TypeError('parseDuration: input must not be empty');
  if (input[0] === '-')
    throw new TypeError('parseDuration: negative numbers are not allowed');

  let total = 0;
  let end = 0;
  const used = new Set();
  const segment = /(\d+)([a-z])/gi; // digits, then one unit letter; /g walks segments, /i allows H/M/S.
  let m;
  while ((m = segment.exec(input)) !== null) {
    if (m.index !== end)
      throw new TypeError(`parseDuration: unexpected text "${input.slice(end, m.index)}"`);
    const unit = m[2].toLowerCase();
    if (!(unit in SECONDS_PER))
      throw new TypeError(`parseDuration: unknown unit "${m[2]}"`);
    if (used.has(unit))
      throw new TypeError(`parseDuration: repeated unit "${unit}"`);
    used.add(unit);
    total += Number(m[1]) * SECONDS_PER[unit];
    end = segment.lastIndex;
  }
  if (end !== input.length)
    throw new TypeError(`parseDuration: cannot parse "${input.slice(end)}"`);
  return total;
}

test('single units', () => {
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('1m'), 60);
  assert.equal(parseDuration('1s'), 1);
});
test('zero and multi-digit', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('90s'), 90);
});
test('composite and case-insensitive', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('1H2M3S'), 3723);
  assert.equal(parseDuration('30m1h'), 5400);
});
test('rejects invalid strings', () => {
  for (const bad of ['', '5d', '1h1h', '90', '-5s', '1.5h', '1h 2m'])
    assert.throws(() => parseDuration(bad), TypeError);
});
test('rejects non-string input', () => {
  for (const bad of [123, null, undefined, {}])
    assert.throws(() => parseDuration(bad), TypeError);
});

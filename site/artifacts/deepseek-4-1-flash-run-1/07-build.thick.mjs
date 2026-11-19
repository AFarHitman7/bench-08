import { test } from 'node:test';
import assert from 'node:assert/strict';

const SECONDS_PER_UNIT = { h: 3600, m: 60, s: 1 };

export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`parseDuration: expected a string, got ${typeof input}`);
  }
  if (input === '') throw new TypeError('parseDuration: empty string');
  // Every "<digits><unit>" token must reassemble the input exactly; this one
  // check rejects spaces, signs, decimals, bare numbers and unknown units.
  const segments = input.match(/\d+[hms]/gi) ?? [];
  if (segments.join('') !== input) {
    throw new TypeError(`parseDuration: invalid duration "${input}"; expected segments like "1h30m"`);
  }
  const seen = new Set();
  let total = 0;
  for (const segment of segments) {
    const unit = segment.at(-1).toLowerCase();
    if (seen.has(unit)) throw new TypeError(`parseDuration: unit "${unit}" repeated in "${input}"`);
    seen.add(unit);
    total += Number(segment.slice(0, -1)) * SECONDS_PER_UNIT[unit];
  }
  return total;
}

test('single segments', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('2h'), 7200);
});

test('multiple segments, any order, any case', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('30m1h'), 5400);
  assert.equal(parseDuration('1H2M3S'), 3723);
});

test('composite', () => {
  assert.equal(parseDuration('1h2m3s'), 3723);
  assert.equal(parseDuration('2m1h3s'), 3723);
});

test('rejections', () => {
  assert.throws(() => parseDuration(''), /empty/);
  assert.throws(() => parseDuration('1d'), /invalid duration/);
  assert.throws(() => parseDuration('1h2H'), /repeated/);
  assert.throws(() => parseDuration('90'), /invalid duration/);
  assert.throws(() => parseDuration('-5s'), /invalid duration/);
  assert.throws(() => parseDuration('1.5h'), /invalid duration/);
  assert.throws(() => parseDuration('1h 30m'), /invalid duration/);
  assert.throws(() => parseDuration(42), TypeError);
  assert.throws(() => parseDuration(null), TypeError);
  assert.throws(() => parseDuration(undefined), TypeError);
});
import { test } from 'node:test';
import assert from 'node:assert/strict';

const UNIT_SECONDS = { h: 3600, m: 60, s: 1 };

export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`parseDuration expects a string, got ${typeof input}`);
  }
  if (input === '') throw new TypeError('parseDuration: empty string');

  const segment = /(\d+)([hms])/iy;
  const seen = new Set();
  let total = 0;
  while (segment.lastIndex < input.length) {
    const pos = segment.lastIndex;
    const match = segment.exec(input);
    if (!match) {
      throw new TypeError(`parseDuration: expected number + h/m/s at position ${pos} in "${input}"`);
    }
    const unit = match[2].toLowerCase();
    if (seen.has(unit)) throw new TypeError(`parseDuration: unit "${unit}" repeated in "${input}"`);
    seen.add(unit);
    total += Number(match[1]) * UNIT_SECONDS[unit];
  }
  return total;
}

test('happy paths', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('2h'), 7200);
});

test('composite segments, any order, any case', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('1H2M3S'), 3723);
  assert.equal(parseDuration('3s2h1m'), 7263);
});

test('rejects empty string', () => {
  assert.throws(() => parseDuration(''), TypeError);
});

test('rejects unknown unit', () => {
  assert.throws(() => parseDuration('5d'), TypeError);
});

test('rejects repeated unit', () => {
  assert.throws(() => parseDuration('1h1h'), TypeError);
  assert.throws(() => parseDuration('1m2M'), TypeError);
});

test('rejects bare number with no unit', () => {
  assert.throws(() => parseDuration('90'), TypeError);
  assert.throws(() => parseDuration('1h30'), TypeError);
});

test('rejects negative numbers', () => {
  assert.throws(() => parseDuration('-5m'), TypeError);
});

test('rejects spaces and non-integers', () => {
  assert.throws(() => parseDuration('1h 30m'), TypeError);
  assert.throws(() => parseDuration('1.5h'), TypeError);
});

test('rejects non-string input', () => {
  assert.throws(() => parseDuration(90), TypeError);
  assert.throws(() => parseDuration(null), TypeError);
  assert.throws(() => parseDuration(undefined), TypeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';

const UNIT_SECONDS = { h: 3600, m: 60, s: 1 };

export function parseDuration(input) {
  if (typeof input !== 'string') throw new TypeError(`parseDuration expects a string, got ${typeof input}`);
  const text = input.toLowerCase();
  if (text === '') throw new TypeError('parseDuration received an empty string');
  if (text.includes('-')) throw new TypeError(`parseDuration does not accept negative values: "${input}"`);
  if (!/^(\d+[hms])+$/.test(text)) {
    throw new TypeError(`parseDuration cannot parse "${input}": expected segments like "1h30m" (units h, m, s; integers only)`);
  }
  const seen = new Set();
  let total = 0;
  for (const [, digits, unit] of text.matchAll(/(\d+)([hms])/g)) {
    if (seen.has(unit)) throw new TypeError(`parseDuration repeats unit "${unit}" in "${input}"`);
    seen.add(unit);
    total += Number(digits) * UNIT_SECONDS[unit];
  }
  return total;
}

test('parses single units', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('2h'), 7200);
});

test('parses composites in any order and case-insensitively', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('1H2M3S'), 3723);
  assert.equal(parseDuration('3s2m1h'), 3723);
});

test('rejects invalid input with TypeError', () => {
  assert.throws(() => parseDuration(''), TypeError);
  assert.throws(() => parseDuration(42), TypeError);
  assert.throws(() => parseDuration(null), TypeError);
  assert.throws(() => parseDuration('90'), /expected segments/);
  assert.throws(() => parseDuration('1d'), /expected segments/);
  assert.throws(() => parseDuration('1h1h'), /repeats unit "h"/);
  assert.throws(() => parseDuration('-5s'), /negative/);
  assert.throws(() => parseDuration('1h 30m'), TypeError);
  assert.throws(() => parseDuration('1.5h'), TypeError);
});

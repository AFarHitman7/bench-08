import assert from 'node:assert/strict';
import test from 'node:test';

function parseDuration(input) {
  if (typeof input !== 'string') throw new TypeError('Duration must be a string');
  if (input.length === 0) throw new TypeError('Duration cannot be empty');

  const secondsPerUnit = { h: 3600, m: 60, s: 1 };
  const seen = new Set();
  let seconds = 0;
  let index = 0;

  while (index < input.length) {
    const rest = input.slice(index);
    if (/^-\d/.test(rest)) throw new TypeError('Negative durations are not supported');

    const match = /^(\d+)([a-z])/i.exec(rest);
    if (!match) {
      if (/^\d+$/.test(rest)) throw new TypeError('Bare number has no unit');
      throw new TypeError(`Invalid duration segment at position ${index}`);
    }

    const unit = match[2].toLowerCase();
    if (!Object.hasOwn(secondsPerUnit, unit)) {
      throw new TypeError(`Unknown duration unit: ${match[2]}`);
    }
    if (seen.has(unit)) throw new TypeError(`Repeated duration unit: ${unit}`);

    seen.add(unit);
    seconds += Number(match[1]) * secondsPerUnit[unit];
    index += match[0].length;
  }

  return seconds;
}

test('parses supported units, zero, and case-insensitive input', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('1H2M3S'), 3723);
});

test('parses segments in any order', () => {
  assert.equal(parseDuration('3s1h2m'), 3723);
});

test('rejects an empty string', () => {
  assert.throws(() => parseDuration(''), { name: 'TypeError' });
});

test('rejects an unknown unit', () => {
  assert.throws(() => parseDuration('1d'), /Unknown duration unit/);
});

test('rejects a repeated unit', () => {
  assert.throws(() => parseDuration('1h2H'), /Repeated duration unit/);
});

test('rejects a bare number', () => {
  assert.throws(() => parseDuration('12'), /Bare number/);
});

test('rejects negative numbers', () => {
  assert.throws(() => parseDuration('-2m'), /Negative durations/);
});

test('rejects non-string input', () => {
  assert.throws(() => parseDuration(90), { name: 'TypeError' });
});

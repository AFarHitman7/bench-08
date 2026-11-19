import { test } from 'node:test';
import assert from 'node:assert/strict';

const UNIT_MS = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000, w: 604800000 };
const TOKEN = /(\d+(?:\.\d+)?)\s*(ms|w|d|h|m|s)/y;

export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError('duration must be a string');
  }
  const src = input.trim().toLowerCase();
  if (src === '') {
    throw new SyntaxError('empty duration');
  }

  let totalMs = 0;
  let pos = 0;
  while (pos < src.length) {
    TOKEN.lastIndex = pos;
    const match = TOKEN.exec(src);
    if (!match) {
      throw new SyntaxError(`invalid duration: "${input}"`);
    }
    totalMs += Number(match[1]) * UNIT_MS[match[2]];
    pos = TOKEN.lastIndex;
    while (pos < src.length && /\s/.test(src[pos])) {
      pos++;
    }
  }
  return totalMs / 1000;
}

test('parses compound durations into seconds', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('2h'), 7200);
  assert.equal(parseDuration('1d'), 86400);
  assert.equal(parseDuration('1w2d'), 604800 + 2 * 86400);
});

test('parses single units', () => {
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('5m'), 300);
  assert.equal(parseDuration('0s'), 0);
});

test('parses milliseconds and fractional values', () => {
  assert.equal(parseDuration('500ms'), 0.5);
  assert.equal(parseDuration('1.5h'), 5400);
  assert.equal(parseDuration('1.5s'), 1.5);
});

test('tolerates whitespace and case', () => {
  assert.equal(parseDuration('1h 30m'), 5400);
  assert.equal(parseDuration('  1H30M  '), 5400);
  assert.equal(parseDuration('1 h 30 m'), 5400);
});

test('sums repeated units', () => {
  assert.equal(parseDuration('1h1h'), 7200);
});

test('rejects invalid input', () => {
  assert.throws(() => parseDuration(''), SyntaxError);
  assert.throws(() => parseDuration('   '), SyntaxError);
  assert.throws(() => parseDuration('30'), SyntaxError);
  assert.throws(() => parseDuration('abc'), SyntaxError);
  assert.throws(() => parseDuration('1h-30m'), SyntaxError);
  assert.throws(() => parseDuration('-5s'), SyntaxError);
  assert.throws(() => parseDuration('1x'), SyntaxError);
  assert.throws(() => parseDuration(90), TypeError);
  assert.throws(() => parseDuration(null), TypeError);
});

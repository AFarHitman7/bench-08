import { test } from 'node:test';
import assert from 'node:assert/strict';

const UNIT_SECONDS = { d: 86400, h: 3600, m: 60, s: 1 };

export function parseDuration(input) {
  if (typeof input !== 'string') throw new TypeError('duration must be a string');
  const text = input.trim();
  if (text === '') throw new SyntaxError('empty duration');

  const part = /\s*(\d+(?:\.\d+)?)\s*([dhms])/iy;
  const seen = new Set();
  let total = 0;
  let pos = 0;

  while (pos < text.length) {
    part.lastIndex = pos;
    const match = part.exec(text);
    if (!match) throw new SyntaxError(`invalid duration: ${JSON.stringify(input)}`);
    const unit = match[2].toLowerCase();
    if (seen.has(unit)) throw new SyntaxError(`duplicate unit "${unit}" in ${JSON.stringify(input)}`);
    seen.add(unit);
    total += Number(match[1]) * UNIT_SECONDS[unit];
    pos = part.lastIndex;
  }

  return Math.round(total * 1000) / 1000;
}

test('parses a combined hours and minutes duration', () => {
  assert.equal(parseDuration('1h30m'), 5400);
});

test('parses single units', () => {
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('2m'), 120);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('1d'), 86400);
});

test('parses all units together with whitespace', () => {
  assert.equal(parseDuration('2h 15m 10s'), 8110);
  assert.equal(parseDuration('1d 1h 1m 1s'), 90061);
  assert.equal(parseDuration('1h 30m'), 5400);
});

test('parses decimal amounts', () => {
  assert.equal(parseDuration('1.5h'), 5400);
  assert.equal(parseDuration('0.5m'), 30);
});

test('accepts zero and uppercase units', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1H30M'), 5400);
});

test('ignores surrounding whitespace', () => {
  assert.equal(parseDuration('  1h30m  '), 5400);
});

test('accepts units in any order', () => {
  assert.equal(parseDuration('30m1h'), 5400);
});

test('rejects empty and whitespace-only input', () => {
  assert.throws(() => parseDuration(''), SyntaxError);
  assert.throws(() => parseDuration('   '), SyntaxError);
});

test('rejects numbers without a unit', () => {
  assert.throws(() => parseDuration('30'), SyntaxError);
  assert.throws(() => parseDuration('1h30'), SyntaxError);
});

test('rejects unknown units and garbage', () => {
  assert.throws(() => parseDuration('abc'), SyntaxError);
  assert.throws(() => parseDuration('1x'), SyntaxError);
  assert.throws(() => parseDuration('1h foo'), SyntaxError);
});

test('rejects negative values', () => {
  assert.throws(() => parseDuration('-5m'), SyntaxError);
});

test('rejects duplicate units', () => {
  assert.throws(() => parseDuration('1h1h'), SyntaxError);
});

test('rejects non-string input', () => {
  assert.throws(() => parseDuration(90), TypeError);
  assert.throws(() => parseDuration(null), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';

const UNIT_SECONDS = { s: 1, m: 60, h: 3600, d: 86400 };

export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Duration must be a string');
  }

  const source = input.trim();
  if (!source) throw new SyntaxError('Duration must not be empty');

  let index = 0;
  let total = 0;
  const seenUnits = new Set();
  const token = /(\d+(?:\.\d+)?)\s*([smhd])/iy;

  while (index < source.length) {
    while (/\s/.test(source[index] ?? '')) index++;
    if (index === source.length) break;

    token.lastIndex = index;
    const match = token.exec(source);
    if (!match) throw new SyntaxError(`Invalid duration: ${input}`);

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();
    if (!Number.isFinite(value)) {
      throw new SyntaxError(`Invalid duration: ${input}`);
    }
    if (seenUnits.has(unit)) {
      throw new SyntaxError(`Repeated duration unit: ${unit}`);
    }

    seenUnits.add(unit);
    total += value * UNIT_SECONDS[unit];
    index = token.lastIndex;
  }

  return total;
}

test('parses combined and individual units into seconds', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('2d 3h 4m 5s'), 183845);
  assert.equal(parseDuration('45s'), 45);
});

test('supports decimals, spaces, and case-insensitive units', () => {
  assert.equal(parseDuration('1.5H'), 5400);
  assert.equal(parseDuration(' 1h  30m '), 5400);
});

test('rejects empty, malformed, and repeated-unit durations', () => {
  for (const value of ['', '1h30', 'abc', '1h 2h', '-1m']) {
    assert.throws(() => parseDuration(value), SyntaxError);
  }
  assert.throws(() => parseDuration(null), TypeError);
});

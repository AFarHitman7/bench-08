import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const UNIT_SECONDS = {
  ms: 0.001,
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
};

export function parseDuration(input) {
  if (typeof input !== 'string') {
    throw new TypeError('parseDuration expects a string');
  }

  const text = input.trim();
  if (text === '') return 0;

  let total = 0;
  let matched = false;
  let lastIndex = 0;
  const pattern = /(\d+(?:\.\d+)?)\s*(ms|s|m|h|d|w)/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const gap = text.slice(lastIndex, match.index).trim();
    if (gap !== '') {
      throw new SyntaxError(`Unexpected token "${gap}" in duration "${input}"`);
    }
    total += Number(match[1]) * UNIT_SECONDS[match[2]];
    matched = true;
    lastIndex = match.index + match[0].length;
  }

  if (!matched) {
    throw new SyntaxError(`Invalid duration: "${input}"`);
  }

  const trailing = text.slice(lastIndex).trim();
  if (trailing !== '') {
    throw new SyntaxError(`Unexpected token "${trailing}" in duration "${input}"`);
  }

  return total;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  test('parses the headline example 1h30m', () => {
    assert.equal(parseDuration('1h30m'), 5400);
  });

  test('parses single units', () => {
    assert.equal(parseDuration('45s'), 45);
    assert.equal(parseDuration('2m'), 120);
    assert.equal(parseDuration('1h'), 3600);
    assert.equal(parseDuration('1d'), 86400);
    assert.equal(parseDuration('1w'), 604800);
  });

  test('parses multiple units in any order', () => {
    assert.equal(parseDuration('30m1h'), 5400);
    assert.equal(parseDuration('1w2d3h4m5s'), 788645);
  });

  test('supports decimals and milliseconds', () => {
    assert.equal(parseDuration('1.5h'), 5400);
    assert.equal(parseDuration('1500ms'), 1.5);
    assert.equal(parseDuration('0.5m'), 30);
  });

  test('tolerates surrounding and inner whitespace', () => {
    assert.equal(parseDuration('  1h 30m  '), 5400);
    assert.equal(parseDuration('1 h 30 m'), 5400);
  });

  test('empty string is zero', () => {
    assert.equal(parseDuration(''), 0);
    assert.equal(parseDuration('   '), 0);
  });

  test('rejects invalid input', () => {
    assert.throws(() => parseDuration(42), TypeError);
    assert.throws(() => parseDuration(null), TypeError);
    assert.throws(() => parseDuration('60'), SyntaxError);
    assert.throws(() => parseDuration('abc'), SyntaxError);
    assert.throws(() => parseDuration('1x'), SyntaxError);
    assert.throws(() => parseDuration('1h30'), SyntaxError);
    assert.throws(() => parseDuration('1h@@30m'), SyntaxError);
  });
}

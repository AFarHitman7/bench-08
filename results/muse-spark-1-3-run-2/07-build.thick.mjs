import { test } from 'node:test';
import assert from 'node:assert/strict';
function parseDuration(input) {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  if (input === '') throw new TypeError('input must not be empty');
  if (input.includes(' ')) throw new TypeError('spaces are not allowed');
  const seen = {};
  let total = 0;
  let i = 0;
  while (i < input.length) {
    if (input[i] === '-') throw new TypeError('negative numbers are not allowed');
    let j = i;
    while (j < input.length && input[j] >= '0' && input[j] <= '9') j++;
    if (j === i) throw new TypeError(`expected digits at index ${i}, got "${input[i]}"`);
    if (j >= input.length) throw new TypeError('bare number with no unit at end');
    const u = input[j].toLowerCase();
    if (u !== 'h' && u !== 'm' && u !== 's') throw new TypeError(`unknown unit "${input[j]}"`);
    if (seen[u]) throw new TypeError(`repeated unit "${input[j]}"`);
    seen[u] = true;
    const n = Number(input.slice(i, j));
    total += n * (u === 'h' ? 3600 : u === 'm' ? 60 : 1);
    i = j + 1;
  }
  return total;
}
test('happy paths', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('2h'), 7200);
  assert.equal(parseDuration('1H2M3S'), 3723);
});
test('composite any order', () => {
  assert.equal(parseDuration('30s1h'), 3630);
  assert.equal(parseDuration('1h30m'), 5400);
});
test('rejects empty', () => assert.throws(() => parseDuration(''), TypeError));
test('rejects unknown unit', () => assert.throws(() => parseDuration('5x'), TypeError));
test('rejects repeated unit', () => assert.throws(() => parseDuration('1h2h'), TypeError));
test('rejects bare number', () => assert.throws(() => parseDuration('90'), TypeError));
test('rejects negative', () => assert.throws(() => parseDuration('-5s'), TypeError));
test('rejects non-string', () => assert.throws(() => parseDuration(90), TypeError));
test('rejects spaces', () => assert.throws(() => parseDuration('1h 30m'), TypeError));

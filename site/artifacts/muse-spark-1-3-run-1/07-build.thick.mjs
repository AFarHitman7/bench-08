import { test } from 'node:test';
import assert from 'node:assert/strict';
export function parseDuration(input) {
  if (typeof input !== 'string') throw new TypeError('parseDuration: input must be a string');
  if (input === '') throw new TypeError('parseDuration: empty string');
  const secs = { h: 3600, m: 60, s: 1 };
  const seen = new Set();
  let total = 0;
  let digits = '';
  for (const ch of input) {
    if (ch >= '0' && ch <= '9') { digits += ch; continue; }
    if (ch === '-') throw new TypeError('parseDuration: negative numbers not allowed');
    const u = ch.toLowerCase();
    if (!(u in secs)) throw new TypeError(`parseDuration: unknown unit '${ch}'`);
    if (digits === '') throw new TypeError(`parseDuration: missing number before '${ch}'`);
    if (seen.has(u)) throw new TypeError(`parseDuration: repeated unit '${u}'`);
    seen.add(u);
    total += Number(digits) * secs[u];
    digits = '';
  }
  if (digits !== '') throw new TypeError('parseDuration: bare number with no unit');
  if (seen.size === 0) throw new TypeError('parseDuration: no segments found');
  return total;
}
test('happy paths', () => {
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration('90s'), 90);
  assert.equal(parseDuration('2h'), 7200);
  assert.equal(parseDuration('1H2M3S'), 3723);
});
test('composite out of order', () => {
  assert.equal(parseDuration('30s1h10m'), 4230);
});
test('rejects empty', () => { assert.throws(() => parseDuration(''), TypeError); });
test('rejects unknown unit', () => { assert.throws(() => parseDuration('5x'), TypeError); });
test('rejects repeated unit', () => { assert.throws(() => parseDuration('1h2H'), TypeError); });
test('rejects bare number', () => { assert.throws(() => parseDuration('123'), TypeError); });
test('rejects negative', () => { assert.throws(() => parseDuration('-5s'), TypeError); });
test('rejects non-string', () => { assert.throws(() => parseDuration(90), TypeError); });
test('rejects spaces', () => { assert.throws(() => parseDuration('1h 30m'), TypeError); });

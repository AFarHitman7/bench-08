import { test } from "node:test";
import assert from "node:assert/strict";

// parseDuration("1h30m") -> 5400. Accepts concatenated <digits><h|m|s>
// segments, case-insensitive, any order, each unit at most once.
// Anything else throws a TypeError naming the problem.
export function parseDuration(input) {
  if (typeof input !== "string") {
    throw new TypeError(`parseDuration: expected a string, got ${typeof input}`);
  }
  if (input === "") {
    throw new TypeError("parseDuration: empty string");
  }
  // The whole input must be one or more <digits><unit> blocks; this single
  // check rejects unknown units, bare numbers, negatives, spaces, decimals.
  if (!/^(?:\d+(?:h|m|s))+$/i.test(input)) {
    throw new TypeError(
      `parseDuration: expected <digits><h|m|s> segments like "1h30m", got ${JSON.stringify(input)}`,
    );
  }
  const secondsPerUnit = { h: 3600, m: 60, s: 1 };
  const seen = new Set();
  let total = 0;
  // The shape check above guarantees every character belongs to exactly one
  // <digits><unit> block, so matchAll walks those blocks with nothing left.
  for (const [, digits, unit] of input.matchAll(/(\d+)(h|m|s)/gi)) {
    const key = unit.toLowerCase();
    if (seen.has(key)) {
      throw new TypeError(`parseDuration: unit "${key}" repeated in ${JSON.stringify(input)}`);
    }
    seen.add(key);
    total += Number(digits) * secondsPerUnit[key];
  }
  return total;
}

test("happy paths", () => {
  assert.equal(parseDuration("1h"), 3600);
  assert.equal(parseDuration("2h"), 7200);
  assert.equal(parseDuration("30m"), 1800);
  assert.equal(parseDuration("90s"), 90);
  assert.equal(parseDuration("0s"), 0);
});

test("case-insensitive, any order, composite", () => {
  assert.equal(parseDuration("1H2M3S"), 3723);
  assert.equal(parseDuration("3S2m1H"), 3723);
  assert.equal(parseDuration("1h30m"), 5400);
});

test("rejects invalid input with TypeError", () => {
  for (const bad of ["", "1d", "1h30m15m", "90", "-1h", 90, null]) {
    assert.throws(() => parseDuration(bad), TypeError, `must reject ${JSON.stringify(bad)}`);
  }
  // The message must stay useful, not just present.
  assert.throws(() => parseDuration("1h1h"), /parseDuration: unit "h" repeated/);
});

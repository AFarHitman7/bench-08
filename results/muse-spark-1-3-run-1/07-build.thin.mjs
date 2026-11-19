export function parseDuration(input) {
  if (typeof input !== "string") {
    throw new TypeError("parseDuration expects a string");
  }
  const s = input.trim();
  if (s === "") {
    throw new Error("parseDuration: empty string");
  }

  const UNITS = {
    ms: 0.001,
    millisecond: 0.001,
    milliseconds: 0.001,
    s: 1,
    sec: 1,
    secs: 1,
    second: 1,
    seconds: 1,
    m: 60,
    min: 60,
    mins: 60,
    minute: 60,
    minutes: 60,
    h: 3600,
    hr: 3600,
    hrs: 3600,
    hour: 3600,
    hours: 3600,
    d: 86400,
    day: 86400,
    days: 86400,
    w: 604800,
    week: 604800,
    weeks: 604800,
  };

  // Bare number means seconds, e.g. "45" -> 45, "1.5" -> 1.5
  if (/^[+-]?\d+(?:\.\d+)?$/.test(s)) {
    return Number(s);
  }

  const re = /([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z]+)/g;
  let total = 0;
  let matched = "";
  let count = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    const value = Number(m[1]);
    const unit = m[2].toLowerCase();
    if (!Number.isFinite(value)) {
      throw new Error(`parseDuration: invalid number in ${JSON.stringify(input)}`);
    }
    if (!(unit in UNITS)) {
      throw new Error(`parseDuration: unknown unit ${JSON.stringify(m[2])} in ${JSON.stringify(input)}`);
    }
    total += value * UNITS[unit];
    matched += m[0];
    count += 1;
  }

  if (count === 0) {
    throw new Error(`parseDuration: invalid duration ${JSON.stringify(input)}`);
  }

  // Ensure the whole string was consumed (allowing whitespace between parts)
  const stripped = s.replace(/\s+/g, "");
  const consumed = matched.replace(/\s+/g, "");
  if (stripped !== consumed) {
    throw new Error(`parseDuration: invalid duration ${JSON.stringify(input)}`);
  }

  return total;
}

import test, { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("parseDuration", () => {
  it("parses '1h30m' to 5400 seconds", () => {
    assert.equal(parseDuration("1h30m"), 5400);
  });

  it("parses single units", () => {
    assert.equal(parseDuration("90s"), 90);
    assert.equal(parseDuration("30m"), 1800);
    assert.equal(parseDuration("1h"), 3600);
    assert.equal(parseDuration("1d"), 86400);
    assert.equal(parseDuration("1w"), 604800);
  });

  it("parses multi-part durations", () => {
    assert.equal(parseDuration("1m30s"), 90);
    assert.equal(parseDuration("2h45m10s"), 2 * 3600 + 45 * 60 + 10);
    assert.equal(parseDuration("1w2d3h4m5s"), 604800 + 2 * 86400 + 3 * 3600 + 4 * 60 + 5);
  });

  it("parses decimals", () => {
    assert.equal(parseDuration("1.5h"), 5400);
    assert.equal(parseDuration("0.5m"), 30);
    assert.equal(parseDuration("1.5m30s"), 120);
  });

  it("parses milliseconds to fractional seconds", () => {
    assert.equal(parseDuration("1500ms"), 1.5);
    assert.equal(parseDuration("1s500ms"), 1.5);
  });

  it("ignores whitespace and case", () => {
    assert.equal(parseDuration("1h 30m"), 5400);
    assert.equal(parseDuration("  1H30M  "), 5400);
    assert.equal(parseDuration("1h30m"), parseDuration("1H 30M"));
  });

  it("supports long unit names", () => {
    assert.equal(parseDuration("1 hour 30 minutes"), 5400);
    assert.equal(parseDuration("2 days"), 172800);
    assert.equal(parseDuration("45 seconds"), 45);
  });

  it("treats a bare number as seconds", () => {
    assert.equal(parseDuration("45"), 45);
    assert.equal(parseDuration("1.5"), 1.5);
  });

  it("parses zero", () => {
    assert.equal(parseDuration("0s"), 0);
    assert.equal(parseDuration("0h0m0s"), 0);
  });

  it("throws on invalid input", () => {
    assert.throws(() => parseDuration(""), /empty/);
    assert.throws(() => parseDuration("abc"));
    assert.throws(() => parseDuration("10x"));
    assert.throws(() => parseDuration("1h30"), /invalid/);
    assert.throws(() => parseDuration("--5s"));
  });

  it("throws TypeError on non-string", () => {
    assert.throws(() => parseDuration(90), TypeError);
    assert.throws(() => parseDuration(null), TypeError);
    assert.throws(() => parseDuration(undefined), TypeError);
  });
});

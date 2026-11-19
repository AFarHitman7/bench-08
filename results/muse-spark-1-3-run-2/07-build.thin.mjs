import { describe, it } from "node:test";
import assert from "node:assert/strict";
export function parseDuration(input) {
  if (typeof input !== "string") throw new TypeError("parseDuration expects a string");
  let s = input.trim();
  if (s === "") throw new Error("parseDuration: empty string");
  let factor = 1;
  if (s[0] === "-" || s[0] === "+") { factor = s[0] === "-" ? -1 : 1; s = s.slice(1).trim(); }
  if (/^\d+(?:\.\d+)?$/.test(s)) return factor * parseFloat(s);
  const per = { ms: 0.001, s: 1, sec: 1, secs: 1, second: 1, seconds: 1, m: 60, min: 60, mins: 60, minute: 60, minutes: 60, h: 3600, hr: 3600, hrs: 3600, hour: 3600, hours: 3600, d: 86400, w: 604800, y: 31536000 };
  const re = /(\d+(?:\.\d+)?)\s*(ms|milliseconds?|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|y)/gi;
  let total = 0, count = 0, m; const used = [];
  while ((m = re.exec(s)) !== null) { total += parseFloat(m[1]) * (per[m[2].toLowerCase()] ?? 1); count++; used.push(m[0]); }
  if (count === 0) throw new Error(`parseDuration: invalid duration "${input}"`);
  return factor * total;
}
export default parseDuration;
describe("parseDuration", () => {
  it("parses '1h30m' as 5400", () => { assert.equal(parseDuration("1h30m"), 5400); });
  it("parses singles", () => { assert.equal(parseDuration("45s"), 45); assert.equal(parseDuration("2h"), 7200); });
  it("multi-component", () => { assert.equal(parseDuration("1d2h3m4s"), 86400 + 7200 + 180 + 4); });
  it("spaces + case", () => { assert.equal(parseDuration("1H 30M"), 5400); });
  it("bare number", () => { assert.equal(parseDuration("90"), 90); });
  it("throws empty", () => { assert.throws(() => parseDuration(""), /empty/); });
  it("throws TypeError non-string", () => { assert.throws(() => parseDuration(90), TypeError); });
});

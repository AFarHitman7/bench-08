# Code Review — `createLimiter`

## Summary
A sliding-window rate limiter keyed by an arbitrary `key`. The overall shape is reasonable (injected clock, per-key counts, reset), but there is one correctness bug that breaks the core feature entirely, plus a second iteration bug and several secondary concerns.

## Critical

1. **`prune` compares objects to numbers — eviction never happens.**
   `hits.push({ key, time: t })` stores **objects**, but `prune` tests `hits[0] < t - windowMs`. Comparing an object with `<` coerces it via `ToPrimitive` to `"[object Object]"`, then to `NaN`; `NaN < anything` is `false`. So the `while` loop body never runs and **nothing is ever evicted**. Consequences:
   - The limiter becomes a fixed-count limiter over all time, not a sliding window: once a key reaches `limit`, it is blocked forever (until `reset`).
   - `hits` grows without bound → unbounded memory growth.
   The comparison needs to target the timestamp, e.g. `hits[0].time < t - windowMs`.

2. **`reset` mutates the array while iterating it and skips entries.**
   `for (let i = 0; i < hits.length; i++) { if (hits[i].key === key) hits.splice(i, 1); }` — when a match is spliced out at index `i`, every later element shifts left by one, but `i` still increments. Adjacent/duplicate matches for the same key are therefore skipped. Example: `hits = [k, k, k]` all with key `k` → after the loop one `k` remains. `reset` does not reliably clear a key. Iterate backwards, or filter into a new array, or decrement `i` after a splice.

## Significant

3. **`prune` assumes `hits` is sorted by time.**
   It only inspects `hits[0]` and stops at the first non-expired element. This holds only if timestamps are pushed in non-decreasing order. `now()` defaults to `Date.now()`, which is **not monotonic** — NTP adjustments / clock rollbacks can push an older timestamp at the end, so expired entries at the tail are never reached because the head blocks the loop. Either enforce monotonic time or don't rely on head-only pruning.

4. **Off-by-one / boundary semantics are undefined.** `hits[0] < t - windowMs` keeps entries exactly at `t - windowMs` (uses `<`, not `<=`), and `allow` blocks at `n >= limit`. Document the intended window boundary (`(t - windowMs, t]` vs `[t - windowMs, t]`) and make the comparison consistent.

5. **No input validation.** `limit`, `windowMs`, and `now` are unchecked. `limit = 0` or negative makes `allow` always return `false`; `windowMs <= 0` produces contradictory behavior; a `now` returning `NaN` or a non-number breaks comparisons and `filter`. Consider validating/normalizing these at construction.

## Performance / design notes

6. **`hits.shift()` is O(n)**; doing it in a loop makes pruning O(n²) in the worst case (many expired entries). Combined with (1) it currently never runs, but once fixed it becomes a hot path. A head index/pointer, a deque, or periodic compaction avoids repeated shifting.

7. **`hits.filter(...)` allocates a new array on every `allow()` call** just to count matches, scanning all entries. That is O(n) time and garbage per request even though only a count is needed — a simple counted loop avoids the allocation.

8. **Unbounded `hits` array by design.** Even with pruning fixed, there is no cap when traffic stops but `allow`/`reset` are not called; cleanup is lazy (only on `allow`). That is acceptable for a log-based limiter but worth noting for long-lived, sparse keys.

9. **`reset` has no return value** and silently does nothing for unknown keys. Fine if intentional, but callers get no feedback.

10. **Key comparison uses `===`.** Object keys are compared by reference, and `NaN` keys never match. Document that keys should be primitives, or use a `Map`/`Set`-based structure if identity/edge cases matter.

11. **Concurrency:** each `allow` is fully synchronous, so within a single JS event loop there is no interleaving race. No issue here, but note that state is per-instance and in-memory only (not shared across processes/workers).

## Recommended priority
Fix (1) and (2) before any use — they are functional blockers (window never slides; reset leaks entries). Then address (3)/(4) for correctness under real clocks, and consider (6)/(7) if this runs on a hot path.
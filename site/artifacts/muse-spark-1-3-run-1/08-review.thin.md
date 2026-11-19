# Code Review: `createLimiter`

## Summary

Intent is a per-key fixed/sliding window rate limiter with injectable clock. The implementation is small and readable, but it has at least two correctness bugs that break core behavior, plus validation, performance, and API-clarity gaps.

## Critical Defects — Must Fix

### 1. Sliding-window expiry never fires — `prune()` compares the wrong type

- `hits` stores objects shaped `{ key, time }`.
- `prune(t)` tests `hits[0] < t - windowMs`.
- An object compared to a number does not yield its `time` field, so the `while` condition is never true in the intended way.
- Effect: old entries are never evicted. The window grows without bound, `allow()` eventually denies everything once a key reaches `limit` total hits, and memory leaks.
- Comment only: the comparison needs to inspect the stored timestamp property, and the inclusive vs. exclusive boundary at exactly `t - windowMs` should be decided and documented.

### 2. `reset(key)` skips entries — mutating while iterating forward

- The loop is `for (let i = 0; i < hits.length; i++)` with `hits.splice(i, 1)` on match and no index adjustment.
- After a removal, all later elements shift left by one, then `i++` advances past the element that just moved into position `i`.
- Effect: with two or more consecutive entries for the same `key`, every other one survives. `reset()` therefore does not reliably reset.
- Comment only: this needs a backwards iteration, an index correction after splice, or a non-mutating rebuild. Also confirm whether `reset()` should prune expired entries first.

## Correctness / Edge Cases

### 3. Time ordering assumption is undocumented and fragile

- `prune()` assumes `hits` is chronologically ordered because it only inspects `hits[0]`.
- The injected `now()` can move backwards in tests or with clock skew, and nothing enforces monotonic time.
- Comment: document whether non-monotonic clocks are supported, and what happens on backwards jumps.

### 4. Window boundary semantics are implicit

- With `<` versus `<=`, an entry timestamped exactly at `t - windowMs` is either kept or dropped.
- Comment: choose and document inclusive/exclusive behavior, especially since tests with a fake `now()` will hit the exact boundary.

### 5. No input validation

- No checks on `limit`, `windowMs`, or `key`.
- Consider: `limit = 0`, negative or fractional `limit`, `windowMs <= 0`, `NaN`, missing `key`, or non-string keys.
- Currently `allow(undefined)` would record a bucket under `undefined`, which is almost certainly not intended but is silently accepted.
- Comment: validate constructor options and decide whether invalid input throws, clamps, or is ignored.

### 6. `reset()` contract for missing / absent key is unclear

- `reset(key)` with no argument, with `undefined`, or with a never-seen key silently does nothing (apart from the bug above).
- Comment: document whether `reset()` with no key should clear all buckets, and whether resetting an unknown key is a no-op.

## Performance / Scalability

### 7. `allow()` is O(n) per call

- Every call runs `hits.filter(h => h.key === key).length`, scanning all keys' histories.
- Comment: this is fine for tiny use but degrades with many keys or high throughput. A per-key queue / `Map<key, timestamps[]>` would isolate buckets.

### 8. `shift()` in a loop is O(n) per eviction

- Repeated `shift()` reindexes the array.
- Comment: for a high-volume limiter, prefer a start-index pointer with periodic compaction or per-key queues.

### 9. Unbounded cardinality

- Expired entries are meant to be pruned globally, which helps, but live state still grows with distinct-key count within the window.
- Comment: document expected key cardinality and whether eviction of idle keys is needed.

## API / Observability

### 10. Minimal return value limits usability

- `allow()` returns only boolean. Callers building `429` responses typically need remaining quota, limit, reset time, or retry delay.
- Comment: consider whether the API should expose that metadata or keep the minimal contract and document the limitation.

### 11. No introspection for tests or monitoring

- No way to read current count, bucket size, or total stored entries.
- Combined with the injectable `now()`, which is good for testability, the lack of introspection makes the expiry bug harder to catch.
- Comment: document how callers should test expiry and reset.

## Style / Maintainability

### 12. Missing contract documentation

- No JSDoc for parameters, return shape, window semantics, per-key isolation, or thread/reentrancy expectations.
- Comment: a short contract would prevent divergent assumptions about `reset()`, boundary handling, and `now()` monotonicity.

### 13. Test suggestions (no code changes proposed here)

- Expiry: fill to limit, advance clock past `windowMs`, expect allowance again.
- Boundary: hit exactly at `t - windowMs`.
- Reset with interleaved keys: `a, b, a, a`, reset `a`, verify `b` untouched and `a` fully cleared.
- Reset with consecutive same-key entries specifically, to catch the splice-skip.
- Storage growth: many expired entries followed by time advance, verify internal size does not grow without bound.
- Invalid options and missing keys.
- Backwards clock movement, if supported.

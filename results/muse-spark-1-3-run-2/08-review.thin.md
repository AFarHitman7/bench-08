# Code Review: `createLimiter`

> Scope: comments only — no rewrites.

## Critical — correctness bugs

### 1. `prune()` never prunes — type mismatch on timestamp
- `hits` stores objects shaped `{ key, time }`.
- `prune()` compares `hits[0] < t - windowMs`, i.e. `object < number`.
- An object-to-number comparison here yields `NaN`, so the `<` test is always `false` and the `while` loop never executes.
- Consequence: the window never slides; once a `key` accumulates `limit` entries, `allow(key)` denies forever.

### 2. `reset(key)` skips entries — splice-while-iterating-forward
- The loop increments `i` unconditionally, but `splice(i, 1)` shifts the element at `i + 1` down into slot `i`.
- That shifted element is never examined, so consecutive matching entries are skipped.
- Consequence: with 3 stored hits for the same `key`, one `reset(key)` call removes only 2, leaving stale quota consumed.

## Major — design / API concerns

### 3. Single shared `hits` array for all keys
- Every key's records live in one array, and `allow()` does `hits.filter(h => h.key === key).length` on every call.
- That makes `allow()` O(total hits across all keys) plus an allocation per call.

### 4. `prune()` uses `shift()` in a loop
- `Array.prototype.shift()` is O(n) per call; pruning `k` expired entries is O(k·n).

### 5. Global prune assumes monotonically increasing `now()`
- Correctness of the `while (hits[0] ...)` early-exit depends on `hits` being sorted by `time`, which only holds if injected `now()` never goes backward.

### 6. Window boundary semantics are implicit
- The prune condition uses strict `<` against `t - windowMs`, so an entry timestamped exactly at the boundary is retained.

## Moderate — validation and edge cases

### 7. No validation of `limit` / `windowMs`
- Negative, zero, `NaN`, non-integer, `Infinity` values are accepted silently.

### 8. No validation / documentation of `key`
- `allow()` accepts anything, including `undefined`. Object keys compare by reference, a potential quota-bypass footgun.

### 9. `reset(key)` API is ambiguous
- Unclear whether `reset()` with no argument should clear everything or be a no-op. Current behavior only removes entries whose key is literally `undefined`.

# Review: `createLimiter`

## Critical

1. **`prune()` never removes anything.** `hits` holds objects like `{ key, time }`, but `prune` compares `hits[0] < t - windowMs`. An object compared to a number yields `NaN`, so the comparison is always `false` and the loop never runs. Expired hits accumulate forever. Fix: compare `hits[0].time`.

2. **Limiting breaks once the bug above is fixed?** Not exactly, but the current behavior is wrong. Because nothing is ever pruned, `allow()` counts every hit ever recorded for a key. After `limit` calls in total, the key is blocked permanently, regardless of `windowMs`. This is a memory leak and a correctness failure.

3. **`reset(key)` skips elements.** Calling `splice` inside a forward `for` loop shifts the next element into the current index, and the loop then increments past it. Consecutive matching entries are left behind. Iterate backwards or rebuild the array with `filter` in place.

## Important

4. **Per-call cost is O(n).** `allow()` runs `hits.filter` over every recorded hit across all keys, and `prune` uses `shift()`, which is also O(n). Under load this degrades quickly. A `Map` from key to an array of timestamps (or a queue per key) would make each check proportional to that key's own hits.

5. **Pruning assumes `now()` is monotonic.** The early-exit prune only works if timestamps are non-decreasing. If `now` is injected with a clock that goes backwards, expired entries near the tail are never removed.

6. **Window boundary is inconsistent.** `prune` keeps entries where `time >= t - windowMs`, so an entry exactly `windowMs` old still counts. Decide whether the window is `[t - windowMs, t]` or `(t - windowMs, t]` and document it.

7. **No input validation.** `limit <= 0` silently denies everything. Negative or non-finite `windowMs` and `limit` values are accepted without error. Consider throwing a `RangeError` for invalid options.

## Minor

8. **Denied requests are not recorded.** This is probably intended, but it means a client that keeps retrying is never penalized further. If that is the desired behavior, document it.

9. **`reset` has no return value.** Returning the number of removed entries or nothing at all would be a reasonable choice, but be consistent with the rest of the API.

10. **No tests shown.** The bugs above (1 and 3 especially) would be caught by a basic test that makes a few calls, advances the fake `now`, and checks `allow` again.

## Suggested direction

Store timestamps per key, prune only the calling key's queue on each `allow`, and use a fake `now` in tests. This fixes items 1, 2, 3, 4, and 5 together.

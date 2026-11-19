## Review: `createLimiter`

### Bugs

1. **`prune` never removes anything.** `hits` holds `{ key, time }` objects, but `prune` compares `hits[0]` directly to a number. The object coerces to `NaN`, so `NaN < t - windowMs` is always false. Use `hits[0].time`.

2. **Once a key hits the limit, it is blocked permanently.** Because pruning is broken, old timestamps stay in `hits` forever. `allow` keeps counting them, so `n >= limit` stays true until `reset(key)` is called. This is the most serious problem: the limiter behaves like a lifetime quota, not a sliding window.

3. **Unbounded memory growth.** Every allowed call pushes an entry that is never removed, so `hits` grows without limit.

4. **`reset` skips entries.** `splice(i, 1)` inside a forward `for` loop shifts the next element into index `i`, then `i++` skips it. Two consecutive matching entries means the second survives. Iterate backwards, or rebuild the array with `filter`, e.g. `hits = hits.filter(h => h.key !== key)`. Note that `hits` is `const` in this case, so mutate it in place or change the declaration to `let`.

### Design issues

5. **Shared global array makes everything O(n).** `prune` runs on every call and `shift()` is O(n). `allow` then does a full `filter` over all keys to count one key. A `Map` from key to an array of timestamps (or a queue with a head index) gives per-key work proportional only to that key's hits.

6. **Keys leak.** Even after the fix, a `Map` keeps an entry for every key ever seen. Delete a key's entry when its timestamps are all pruned, or prune stale keys periodically.

7. **Clock assumptions.** Pruning assumes `now()` is monotonic. If the injected clock moves backwards, `t - windowMs` moves backwards too and old hits are kept longer than intended. Consider `Math.max` against the last seen time, or document the requirement.

8. **No input validation.** `limit <= 0` silently rejects every request. `windowMs <= 0` or non-numeric values produce confusing behavior. Validate the options and throw a clear error, or document the accepted range.

### Minor

9. `allow` is O(n) per call because of `filter`. This is covered by item 5 but is worth noting separately for the hot path.

10. There are no tests covering the window boundary (`t - windowMs` exactly), the limit being reached, or recovery after the window passes. A test that advances a fake `now()` past `windowMs` would have caught bug 1 immediately.

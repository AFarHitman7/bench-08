# Review: `createLimiter`

Overall shape is clean and the injected `now` is a good call for testability, but there is one defect that makes the limiter not work as designed, plus a second that corrupts state on reset.

## Critical

**1. `prune` never removes anything — it compares an object to a number.**

```js
while (hits.length && hits[0] < t - windowMs) hits.shift();
```

`hits[0]` is `{ key, time }`, not a timestamp. `<` coerces it via `ToPrimitive` → `"[object Object]"` → `NaN`, and `NaN < anything` is `false`. The loop body is unreachable dead code.

Consequences:

- `hits` grows monotonically for the lifetime of the limiter; nothing is ever expired.
- The limiter silently degrades from a sliding window into a **lifetime quota**: after a key accumulates `limit` hits, it is blocked forever.
- `reset(key)` is the only way to recover a key, which is almost certainly not the intent.
- Unbounded array growth is a memory-exhaustion vector on a public-facing endpoint.

The stored `time` field being otherwise unused is the tell that `prune` was meant to read `.time`:

```js
while (hits.length && hits[0].time < t - windowMs) hits.shift();
```

**2. `reset(key)` skips entries.**

```js
for (let i = 0; i < hits.length; i++) {
  if (hits[i].key === key) hits.splice(i, 1);
}
```

`i` advances after the splice, so the element that shifts into position `i` is never examined. Two consecutive hits for the same key → only the first is removed. With the critical bug above unfixed this is hard to notice; once `prune` works, `reset` will leave residue behind and the key will still be rate-limited (or be limited sooner than expected).

Iterate backwards, or compact once:

```js
for (let i = hits.length - 1; i >= 0; i--) {
  if (hits[i].key === key) hits.splice(i, 1);
}
```

## High

**3. Complexity and memory are O(total hits) per call, not O(per-key hits).**

Every `allow` call does a full `hits.filter(...)` over *all* keys, and each pruned entry costs an O(n) `Array.prototype.shift`. Under load this is O(n²) in the number of events in the window, on the hot path, for every request.

The structure also conflates tenants: one noisy key makes every other key's `allow` slower. Since the whole point of a keyed limiter is per-key isolation, consider a `Map<key, bucket>`, with each bucket a ring buffer or a small array plus a head index, and delete buckets when empty. Amortize pruning with an index that advances instead of `shift()`.

**4. Unbounded cardinality is a DoS surface.**

Nothing limits the number of distinct keys. An attacker rotating keys (IPs, tokens, user-agents) fills `hits` without ever tripping any single key's limit. Even with pruning fixed, the array holds one entry per unique key per window and is re-scanned per call. A cap on tracked keys, an LRU, or a coarse fallback bucket is worth adding.

## Medium

**5. Non-primitive and `NaN` keys never match themselves.**

`hits.filter(h => h.key === key)` uses strict equality. A `NaN` key (or an object key that is recreated per call) never equals itself, so `n` stays 0, `allow` always returns `true`, and a fresh entry is pushed every call — an unbounded push loop that bypasses the limit entirely. Either normalize keys (`String(key)`) or validate/normalize at the boundary.

**6. The documented contract silently depends on a monotonic clock.**

`prune` inspects only `hits[0]`, which is correct only if insertions are time-ordered. If the injected `now` returns a value lower than a previous call (a fake clock in tests that gets rewound, NTP step, or a test that stubs `now` per-case), the head is newer than its successor, pruning stops early, and stale entries behind it are retained indefinitely. Either state the invariant explicitly in a comment/JSDoc, or scan instead of peeking at index 0.

**7. Window boundary is strict, so the effective window is longer than `windowMs`.**

`hits[0].time < t - windowMs` keeps an entry whose timestamp is exactly `t - windowMs`. An event at `t = 0` still counts against a call at `t = 1000` with `windowMs = 1000`. Depending on the semantics you want, `<=` may be the honest comparison. Whichever you pick, it should be deliberate and commented, because it changes the observable limit at the boundary.

**8. No argument validation.**

- `limit = 0` blocks every call; `limit < 0` likewise. May be intended, but worth a guard or a documented assert.
- `limit = NaN` makes `n >= limit` always false → limiter always allows. A config typo silently disables rate limiting.
- `windowMs = NaN` makes `t - windowMs` NaN → `prune` never fires → unbounded growth.
- Negative `windowMs` grows the array faster than calls arrive.

Validate once at construction and throw, rather than failing open under a typo.

**9. Rejected attempts are not recorded.**

This is a legitimate sliding-window-log design (only admitted events consume budget), but it means a caller hammering the endpoint never extends its own lockout, and it differs from the intuition many reviewers have. Worth a one-line comment on `allow`, since the difference matters for abuse handling.

**10. Reentrancy through `now`.**

`now()` is called while `hits` is in a known-good state, but it is user-supplied and could call back into `allow`/`reset` synchronously. Low probability, but if you keep the injection point, either document that `now` must be pure or compute `t` outside the mutable region. (Minor, listed for completeness.)

## Low / API polish

**11. No visibility into the decision.** `allow` returns a bare boolean, so callers cannot emit `Retry-After` / `X-RateLimit-Remaining`. Returning `{ allowed, remaining, resetAt }` (or adding a `remaining(key)` accessor) costs little and is usually needed by the HTTP layer immediately.

**12. `reset` returns nothing.** Returning the number of entries removed is useful for logs and tests, and makes the "skips entries" bug above testable.

**13. Naming.** `hits` holds `{ key, time }` records, not just hits — `events` or `log` reads better against `hits.filter`. Minor, but the current name obscures that it is a per-key log.

**14. Scope is per-instance only.** If this is constructed per request or per worker, the limit is not global across a multi-process / multi-instance deployment. Not a code defect, but it should be stated so nobody assumes distributed enforcement. A shared store (Redis, etc.) is required for that.

**15. Missing tests for the exact bugs above.** Worth adding before fixing:
- hits at `t = 0`, then calls throughout `0 < t < windowMs`, then a call at `t = windowMs + 1` must be allowed.
- two consecutive allowed calls, then `reset(key)`, then `limit` fresh calls must all be allowed (catches bug 2).
- `now` returning identical timestamps for many calls.
- key `NaN` / object key must not bypass the limit.

## Suggested order of work

1. Fix `prune` (`hits[0].time`) and `reset` (iterate backwards) — smallest diff that makes the module behave as advertised.
2. Add argument validation and key normalization.
3. Replace the global array with per-key buckets once correctness is locked in; that change is invisible to callers and can land separately.
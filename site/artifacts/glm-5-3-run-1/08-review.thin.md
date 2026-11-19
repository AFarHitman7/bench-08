export function createLimiter({ limit = 10, windowMs = 1000, now = () => Date.now() } = {}) {
  // [BUG, severity: critical] Type confusion between numbers and objects.
  // `allow` pushes objects `{ key, time: t }`, but `prune` reads `hits[0]` as a
  // raw timestamp and compares it to a number. `hits[0] < t - windowMs` coerces
  // the object (valueOf → NaN), so the comparison is always false and the
  // while-loop never runs. Pruning is therefore dead code in practice:
  //   - the window never slides — old entries are never evicted;
  //   - `hits` grows without bound for the lifetime of the limiter (memory leak);
  //   - once the fix is attempted naively (`hits[0].time`), note that the
  //     current loop body (`hits[0].key`) would also throw a TypeError — the
  //     intended read is `hits[0].time`.
  //
  // The intended line is almost certainly:
  //   while (hits.length && hits[0].time < t - windowMs) hits.shift();
  //
  // [PERF] `hits.shift()` is O(n) per eviction. Fine for small loads; if this
  // limiter is hot, consider a head index or per-key deques.

  const hits = [];

  function prune(t) {
    // [BUG, severity: critical] See above: `hits[0]` is an object, not a
    // timestamp. This comparison never succeeds, so nothing is ever pruned.
    while (hits.length && hits[0] < t - windowMs) hits.shift();
  }

  return {
    allow(key) {
      const t = now();
      // [OK] Pruning on every call is the right place for it — it keeps
      // eviction amortized into the hot path without a timer.
      prune(t);

      // [PERF] O(total hits across ALL keys), not O(hits for this key), and
      // allocates a throwaway array via `filter`. With pruning broken this is
      // O(∞). Even when fixed, one very active key degrades `allow` for every
      // other key. A `Map<key, times[]>` (or per-key ring buffer) makes the
      // per-key work O(1) amortized and removes the cross-key interference.
      const n = hits.filter(h => h.key === key).length;

      // [DESIGN] With the pruning bug, `n` counts hits from the beginning of
      // time, so after the first `limit` calls per key, `allow` returns false
      // forever — the limiter becomes a permanent denier, not a rate limiter.
      if (n >= limit) return false;

      // [BUG, severity: critical, same root cause] Pushes an object into an
      // array that `prune` treats as a flat number array. This is the line that
      // creates the type mismatch.
      hits.push({ key, time: t });

      // [DESIGN] On rejection, consider returning metadata (e.g. the timestamp
      // when the key next becomes eligible, `hits[0].time + windowMs`) so
      // callers can implement `Retry-After` behavior. A bare `false` forces
      // them to poll.
      return true;
    },

    reset(key) {
      // [BUG, severity: major] Classic mutate-while-iterating-forward bug.
      // `splice(i, 1)` shifts the next element into index `i`, then `i++`
      // skips it. Any run of consecutive hits for the same key leaves every
      // second entry behind — `reset` is idempotent only if called repeatedly.
      // The backward loop (`for (let i = hits.length - 1; i >= 0; i--)`) or a
      // rebuild (`hits = hits.filter(...)` with the array exposed differently)
      // is the standard fix.
      for (let i = 0; i < hits.length; i++) {
        if (hits[i].key === key) hits.splice(i, 1);
      }
      // [BUG, severity: minor] `reset()` with no argument silently does
      // nothing useful: it deletes entries whose key is `undefined`, which
      // `allow(undefined)` could actually create (see below). A bare `reset()`
      // should probably clear all state; currently it's a no-op trap.
    },

    // [API, minor] `allow(undefined)` and `allow(null)` all share one bucket
    // (and create `{ key: undefined }` entries). Either coerce/validate the
    // key or document that `undefined` is a single shared identity.
    //
    // [API, minor] No input validation: `limit = 0` makes the limiter reject
    // everything (defensible, but should be documented); negative `limit` or
    // non-finite `windowMs` produce nonsense. JSDoc on the factory would also
    // pin down the semantics below.
    //
    // [DOCS, minor] The windowing semantics are "fixed window measured
    // backwards from now" (a true sliding window), not wall-clock-aligned
    // buckets and not a token bucket. Consequences worth documenting:
    //   - a client may pass `limit` requests at the very end of one window and
    //     another `limit` at the start of the next, i.e. up to `2 × limit`
    //     requests inside a span shorter than `windowMs` (the classic
    //     fixed-window boundary burst — here it applies per-key because the
    //     boundary is the caller's own first hit);
    //   - the window is per-key-from-latest-hit only in the sense of `now`;
    //     entries expire exactly `windowMs` after their own timestamp, which
    //     is the correct sliding behavior once pruning is fixed.
    //
    // [OK, praise] The `now` injection point is exactly right — deterministic
    // tests without monkey-patching `Date`. Keep that pattern.
  };
}

// Summary of defects, ordered by severity:
// 1. CRITICAL — `prune` reads `hits[0]` as a number but `allow` stores objects
//    (`hits[0].time` intended). Pruning never happens: unbounded memory growth
//    and keys become permanently blocked after `limit` total hits.
// 2. MAJOR — `reset` splices while iterating forward; consecutive same-key
//    entries are skipped, leaving residue behind.
// 3. MINOR — bare `reset()` is a silent no-op instead of clearing all state.
// 4. PERF — per-key counting scans the global array (O(all hits)); one hot key
//    taxes every other key. A `Map<key, times[]>` fixes both this and the
//    cross-key scanning.
// 5. API/DOCS — no JSDoc, no key validation, no retry-after information, and
//    the sliding-window burst semantics are undocumented.
// Praise: `now` injection for testability is the right call; pruning on each
// `allow` (rather than a timer) is also the correct structure — it's only the
// number-vs-object mismatch that defeats it.

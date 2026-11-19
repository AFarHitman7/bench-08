[blocker] `prune`, `hits[0] < t - windowMs` — `hits[0]` is a `{ key, time }` object, so the comparison against a number is always false and nothing is ever pruned. Once a key has made `limit` calls in total, `allow` returns false forever regardless of `windowMs`, and the array grows without bound. Compare `hits[0].time` instead.

[major] `reset`, `hits.splice(i, 1)` followed by `i++` — the entry that shifts into the removed slot is skipped, so consecutive matching entries survive. `reset(key)` silently leaves some of that key's hits behind. Iterate backwards or filter in place.

[major] `allow`, `hits.filter(h => h.key === key)` — every call scans the hits for all keys, so cost grows with total traffic rather than with that key's usage. Keep a per-key timestamp queue in a `Map` so counting and pruning touch only the relevant key.

[major] `prune`, `hits.shift()` — `shift` is O(n) on arrays and runs once per expired entry, and `reset`'s `splice` is also O(n) per removal. Under load this is quadratic. Use a head index or per-key queues.

[minor] `createLimiter` options — `limit`, `windowMs` and `now` are not validated. `limit: 0`, negative values, `NaN`, or a non-function `now` are accepted silently and produce always-deny or never-expire behaviour. Validate at construction and throw.

[minor] `allow` return value — it returns a bare boolean, so callers cannot set `Retry-After` or `X-RateLimit-Remaining` without re-implementing the window math. Return a result object (allowed, remaining, reset time) or expose a separate query method.

[minor] Tests — none are included, and a single test that advances the injected `now` past `windowMs` would have caught the blocker above. Add tests for window expiry, per-key isolation, and `reset` on consecutive keys.

[nit] `prune`, `< t - windowMs` — a hit exactly `windowMs` old still counts, so the effective window is inclusive at one boundary. Decide on the intended semantics and document it.

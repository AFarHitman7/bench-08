[major] `prune(t)` — compares the hit object `hits[0]` to a number instead of comparing its timestamp — pruning never removes expired hits, so the limiter eventually rejects a key permanently and retains hits indefinitely — compare `hits[0].time` with the cutoff.

[major] `reset(key)` — splicing while incrementing the index skips consecutive matching hits — reset can leave some of the key’s hits behind, so subsequent calls may still be denied — remove matches without advancing the index, or filter the array.

[minor] `allow(key)` — counts hits at exactly `t - windowMs` as active — a hit on the window boundary can cause an extra rejection — clarify the boundary convention and prune timestamps at or before the cutoff if the window is exclusive.

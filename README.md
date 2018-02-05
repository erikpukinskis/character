**creature** is an in-memory store for tracking sets of memories of characters in a virtual world:

```javascript
var creature = require("creature")

creature("dr", "Doctor Rabbit")
creature.see("dr", "bird", "the bird has brown wings and a floofy head")
creature("ted", "Tod Blosby")
creature.see("ted", "bird", "get away from me bird")

var bird = creature.see("dr", "bird")
// Returns "the bird has brown wings and a floofy head"
```

### Persisting memories in a log

Creature is designed to use only simple function calls so that they can be logged by [a-wild-universe-appeared](https://github.com/erikpukinskis/a-wild-universe-appeared):

```javascript
var creature = require("creature")
var aWildUniverseAppeared = require("a-wild-universe-appeared")

var doctors = aWildUniverseAppeared("memories of various doctors", {creature: "creature"})

doctors.do("creature", "dr", "Doctor Rabbit")
doctors.do("creature.see", "dr", "bird", "the bird has brown wings and a floofy head")

var bird = creature.see("dr", "bird")
// Wont return anything because creature.see hasn't been called yet

doctors.playItBack()
bird = creature.see("dr", "bird")
// Now it returns "the bird has brown wings..."
```

### Why

It's just a key/value store. Granted. It does go two levels deep, so it forces you to namespace. That's so we always know which creature owns a key.

We could namespace in a normal key-value store, but the point of creature is that every key belongs to _someone_.

And because creature's API is all function calls, and is amenable to use for event-sourcing, that means we can shard the store up into multiple different realities, which makes it natural to only have a subset of the global store at any given time. It makes it easier to merge multiple stores too.

Everything being namespaced to a single creature will tend to help with that too. Although sometimes different universes will have different opinions about what a given creature has seen, for the most part, it will tend to work out.
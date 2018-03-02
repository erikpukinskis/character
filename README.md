```javascript
var creature = require("creature")
```
**creature** is an in-memory store for tracking sets of memories of characters in a virtual world:

```javascript
creature("dr", "Doctor Rabbit")
creature.see("dr", "bird", "the bird has brown wings and a floofy head")
```
That creates a creature named "Doctor Rabbit" with the ID "dr" and notes that they saw something named "bird".

Another creature might see a different thing at the same place in the namespace:
```javascript
creature("ted", "Tod Blosby")
creature.see("ted", "bird", "get away from me bird")
```
Either of those creatures could then remember the bird:
```javascript
var bird = creature.remember("dr", "bird")
// Returns "the bird has brown wings and a floofy head"
```
### Why would I ever want to do that?
The above is a contrived example, but if you're a more pragmatic person, you can think of these as cookies, or user-relative values in a key value store. User "f901j3" with the name "Joe Schmoe" might see "session-id" "139jf013" for example:

```javascript
creature("f901j3", "Joe Schmoe")
creature.see("f901j3", "session-id", "139jf013")
```
Then later on we might remember that to make a request:
```javascript
var makeRequest = require("make-request")

makeRequest({
  method: "get",
  url: "http://my-very-practical-web-site.com/important-secret-stuff",
  headers: {
    "Session-Id": creature.remember("f901j3", "session-id"),
  },
})
```

### Persisting memories in a log

Creature is designed to use only simple function calls so that they can be logged by [a-wild-universe-appeared](https://github.com/erikpukinskis/a-wild-universe-appeared):

```javascript
var creature = require("creature")
var aWildUniverseAppeared = require("a-wild-universe-appeared")

var doctors = aWildUniverseAppeared("memories of various doctors", {creature: "creature"})

doctors.do("creature", "dr", "Doctor Rabbit")
doctors.do("creature.see", "dr", "bird", "the bird has brown wings and a floofy head")

var bird = creature.remember("dr", "bird")
// Wont return anything because creature.see hasn't been called yet

doctors.playItBack()
bird = creature.remember("dr", "bird")
// Now it returns "the bird has brown wings..."
```

### Why not use one of many existing key-values stores?

It's slightly more constrictive than a typical key-value store, in that it does go two levels deep, so it forces you to namespace. That's so we always know which creature owns a key.

We could namespace in a normal key-value store, but the point of creature is that every key belongs to _someone_.

Because creature's API is all function calls, and is amenable to use for event-sourcing, that means we can shard the store up into multiple different realities, which makes it natural to only have a subset of the global store at any given time.

Everything being namespaced to a specific creature helps make those shards more mergeable. Although sometimes different universes will have different opinions about what a given creature has seen, for the most part, any given creatures memories will tend to be localized and internally consistent, with lower probability of namespace conflict with other creatures logs.

var library = require("module-library")(require)

module.exports = library.export(
  "creature",
  ["identifiable"],
  function(identifiable) {
    var names = {}
    var sightsByCreatureId = {}

    function creature(id, name) {
      if (typeof name == "undefined") {
        throw new Error("No name")
      }
      if (!id) {
        id = identifiable.assignId(names)
      }
      names[id] = name
      return id
    }

    creature.see = function(id, key, value) {
      var sights = sightsByCreatureId[id]
      if (!sights) {
        sights = sightsByCreatureId[id] = {}
      }
      sights[key] = value
    }

    creature.remember = function(id, key) {
      var sights = sightsByCreatureId[id]
      if (!sights) { return }
      return sights[key]      
    }

    creature.getName = identifiable.getFrom(names, "creature name")

    return creature
  }
)
var library = require("module-library")(require)

module.exports = library.export(
  "character",
  ["identifiable"],
  function(identifiable) {
    var names = {}
    var avatars = {}
    var sightsByCharacterId = {}

    function character(id, name) {
      if (typeof name == "undefined") {
        throw new Error("No name")
      }
      if (!id) {
        id = identifiable.assignId(names, name)
      }
      names[id] = name
      avatars[id] = avatar
      return id
    }

    character.see = function(id, key, value) {
      var sights = sightsByCharacterId[id]
      if (!sights) {
        sights = sightsByCharacterId[id] = {}
      }
      sights[key] = value
    }

    character.remember = function(id, key) {
      var sights = sightsByCharacterId[id]
      if (!sights) { return }
      return sights[key]      
    }

    character.getPicture = identifiable.getFrom(avatars, "avatar")

    character.getName = identifiable.getFrom(names, "character name")

    return character
  }
)
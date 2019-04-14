var library = require("module-library")(require)

module.exports = library.export(
  "creature",
  ["identifiable"],
  function(identifiable) {
    var names = {}
    var sightsByCreatureId = {}
    var said = []

    function creature(id, name) {
      if (typeof name != "undefined") {
        names[id] = name
      }
      if (!id) {
        id = identifiable.assignId(names)
      }
      return id
    }

    creature.see = function(id, key, value) {
      var sights = sightsByCreatureId[id]
      if (!sights) {
        sights = sightsByCreatureId[id] = {}
      }
      sights[key] = value
    }

    creature.ensureOn = function(request, response, universe) {
      var meId = request.cookies.meId
     
      if (!meId) {
        meId = creature(null, "anonymous")
        universe.do("creature", meId, "anonymous")
        response.cookie(
          "meId",
          meId,{
          maxAge: 10*years})
      }

      return meId
    }

    var minutes = 60
    var hours = 60*minutes
    var days = 24*hours
    var years = 365*days
    
    creature.say = function(id, text) {
      if (text) {
        said.push(text)
      }
    }

    creature.everythingSaid = function() {
      return said
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
nextId = 1

# assign runtime-unique Id to objects
module.exports = class Unique
  @nextUniqueObjectId: nextUniqueObjectId = -> "object_" + nextId++

  @objectId: objectId = (o) ->
    if o.hasOwnProperty "__uniqueId"
      o.__uniqueId ||= nextUniqueObjectId()
    else
      Object.defineProperty o, "__uniqueId",
        enumerable: false
        value: nextUniqueObjectId()
      o.__uniqueId

  # all possible values for key resolve to a unique Id
  @id: (key) ->
    if typeof key == "object" || typeof key == "function"
      if key
        if typeof key.getUniqueId == "function" then key.getUniqueId() else objectId key
      else
        "null"
    else if typeof key == "number" then "" + key
    else if typeof key == "symbol" then key.toString()
    else if typeof key == "string" then "string_" + key
    else if typeof key == "boolean" then (if key then "true" else "false")
    else if key == undefined then "undefined"
    else "#{typeof key}_#{key}"

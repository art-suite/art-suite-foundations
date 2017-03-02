###
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
###

Map = require "./Map"

Unique  = require './Unique'
{inspect} = require './Inspect'

uniquePropertyName = Unique.PropertyName

clonedMap = null
byStructure = false
byProperties = false
topObject = null

# in perf tests using array.slice instead of array.push to build up the new array is:
#   10-element array - slightly faster
#   100-element array - 1.6x faster
#   1000+ - about 2x faster
# (Test array contained only numbers and copied them by-value in both cases - no function calls, no conditionals).

module.exports = class Clone

  cloneArray = (array) ->
    clonedArray = clonedMap.set array, array.slice()
    clonedArray[index] = clone value for value, index in clonedArray
    clonedArray

  cloneObject = (obj) ->
    clonedObject = clonedMap.set obj, emptyClone obj

    if (obj!=topObject || !byProperties) && obj.populateClone
      obj.populateClone clonedObject
    else
      clonedObject[k] = clone v for k, v of obj

    clonedObject

  # clone the object "type", but none of its properties.
  @emptyClone: emptyClone = (obj) ->
    if obj.constructor == Array then [] # the next line works with Arrays in all ways except in Chrome 30 the resulting array object makes the "length" property enumerable whereas normally it is not. You must add at least one element ot the array to make "length" appear.
    else Object.create Object.getPrototypeOf obj

  # Primatives are ALWAYS copied by value.
  # modes:
  #   "byProperties" - on the topmost cloned object, don't use custom clones; clone "by properties"
  #   "byStructure" - only clone pure Arrays and Objects. Any other derived object, just copy by-reference.
  @clone: clone = (obj, mode) ->
    switch mode
      when "byStructure"  then byStructure = true
      when "byProperties" then byProperties = true

    # return any primatives by-value
    return obj if obj == null || obj == undefined || typeof obj != "object"

    # if cloning byStructure and this is not a structural object, return it as-is
    return obj if byStructure && (obj.constructor != Array && obj.constructor != Object)

    if clonedMap
      return got if got = clonedMap.get obj # return previous clone if already cloned
    else
      topObject = obj
      clonedMap = new Map

    clonedObject = if obj.constructor == Array then cloneArray obj
    else                                            cloneObject obj

    if topObject == obj
      byStructure = false
      byProperties = false
      topObject = null
      clonedMap = null

    clonedObject

  @cloneByProperties: cloneByProperties = (obj) -> clone obj, "byProperties"
  @cloneByStructure:  cloneByStructure = (obj) -> clone obj, "byStructure"

"use strict"
###
2018-07-27 SBD Notes

I want to move towards:

  clone: is a combination of stuctural clone and calling .clone, if available. Otherwise, it doesn't do what I'm calling invasive-cloning.
    invasiveCloning: false
    customCloning: true
    recusiveSafe: fully
    Note: ArtAtomic objects have .clones that return new objects, however, ArtAtomic objects are designed to be used in a read-only way,
      so this is a waste most of the time. UNLESS you intend to modify the cloned object, which sometimes you do need to do.
      So, that's why cloneStructure is often the right answer - it won't clone non-plain-objects

  cloneStructure: clone only plain-object and arrays. Everything else is just a simple assignment.
    invasiveCloning: false
    customCloning: false
    recusiveSafe: stack - (See below)

  invasiveClone:
    invasiveCloning: false
    customCloning: false
    recusiveSafe: full
    (cloneByProperties basically did this)
    Deeply clone everything, manually cloning objects regardless if they have a .clone method.

---
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
{isPlainObject, isArray, isFunction} = require './Core/Types'

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
    clonedMap.set array, clonedArray = array.slice()
    clonedArray[index] = _clone value for value, index in clonedArray
    clonedArray

  cloneObject = (obj) ->
    clonedMap.set obj, clonedObject = emptyClone obj

    if (obj!=topObject || !byProperties) && obj.populateClone
      obj.populateClone clonedObject
    else
      clonedObject[k] = _clone v for k, v of obj

    clonedObject

  # clone the object "type", but none of its properties.
  @emptyClone: emptyClone = (obj) ->
    if isArray obj then [] # the next line works with Arrays in all ways except in Chrome 30 the resulting array object makes the "length" property enumerable whereas normally it is not. You must add at least one element ot the array to make "length" appear.
    else Object.create Object.getPrototypeOf obj

  # Primatives are ALWAYS copied by value.
  # modes:
  #   "byProperties" - on the topmost cloned object, don't use custom clones; clone "by properties"
  #   "byStructure" - only clone pure Arrays and Objects. Any other derived object, just copy by-reference.
  @_clone: _clone = (obj, mode) ->
    switch mode
      when "byStructure"  then byStructure = true
      when "byProperties" then byProperties = true

    # return any primatives by-value
    return obj if obj == null || obj == undefined || typeof obj != "object"

    # if cloning byStructure and this is not a structural object, return it as-is
    return obj if byStructure && !(isArray obj || isPlainObject obj)

    if clonedMap
      return got if got = clonedMap.get obj # return previous clone if already cloned
    else
      topObject = obj
      clonedMap = new Map

    cloned = switch
      when isFunction obj.clone then obj.clone()
      when isArray obj          then cloneArray obj
      when isPlainObject obj    then cloneObject obj

    if topObject == obj
      byStructure   = false
      byProperties  = false
      topObject     = null
      clonedMap     = null

    cloned

  @clone: (obj, mode) ->
    # console.log clone: {obj, mode, where: new Error}
    if mode?
      console.error "2018-07-27: clone mode-param is DEPRICATED. Partial solution, see: cloneStructure"
    _clone obj, mode

  @cloneByProperties: cloneByProperties = (obj) ->
    console.error "2018-07-27: cloneByProperties is DEPRICATED. Partial solution, see: cloneStructure"
    _clone obj, "byProperties"

  @cloneByStructure:  cloneByStructure  = (obj) ->
    console.error "2018-07-27: cloneByStructure is DEPRICATED. Use: cloneStructure"
    _clone obj, "byStructure"


  isStructural: isStructural = (obj) -> isPlainObject(obj) || isArray obj
  ###
  clones plain objects and arrays, but not any other type

  FEATURES
    - no allocations beyond the newly crearted object and arrays

  recursiveSafe: uses a stack
    This means:
      NO two objects or arrays in the output structure will be "==="
      UNLESS they were in a (grand)parent/(grand)child relationship in the source.

      This means if you have the same (===) object/array more than once in the structure,
      in a non (grand)parent/(grand)child way, each use will get a separate cloned output
      in the new structure. In other words

    This as a nice advantage: the output is JSON-compatible.

    This is mostly a performance optimization. It allows us to avoid any extra object allocations.
    Once we can safely use the new ES6 Map everywhere, we might perf-test again to see if full
    recursion-safety isn't just as fast.
    But then we lose JSON-compatible output guarantees...
  ###
  @cloneStructure: cloneStructure = (inValue) ->
    cloningStructurePushed = false

    if isPlainObject(inValue) || isA = isArray inValue
      _cloneStructure inValue, isA
    else inValue


  ########################
  # PRIVATE
  cloneStructureFromStack = []
  cloneStructureToStack = []
  cloneStructurePush = (inValue, outValue) ->
    cloneStructureFromStack.push inValue
    cloneStructureToStack.push outValue
    true

  cloneSturcturePop = ->
    cloneStructureFromStack.pop()
    cloneStructureToStack.pop()

  _cloneStructure = (inObjOrArray, inputIsArray) ->
    if 0 <= i = cloneStructureFromStack?.indexOf inObjOrArray
      cloneStructureToStack[i]

    else
      pushed = false
      outValue = null

      if inputIsArray
        outValue = []
        for v in inObjOrArray
          outValue.push if isPlainObject(v) || vIsArray = isArray v
            pushed ||= cloneStructurePush inObjOrArray, outValue
            _cloneStructure v, vIsArray
          else
            v

      else
        outValue = {}
        for k, v of inObjOrArray
          outValue[k] = if isPlainObject(v) || vIsArray = isArray v
            pushed ||= cloneStructurePush inObjOrArray, outValue
            _cloneStructure v, vIsArray
          else
            v

      cloneSturcturePop() if pushed

      outValue
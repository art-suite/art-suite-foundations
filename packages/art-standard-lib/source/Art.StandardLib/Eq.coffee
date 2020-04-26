{remove}              = require './ArrayExtensions'
{objectKeyCount}      = require './ObjectExtensions'
{floatTrue0}          = require './MathExtensions'
{isString, isNumber}  = require './TypesExtended'
{min} = Math

# TODO: (BUG?) I think that just "returning true" if a or b is in testing will have some false positives.
# TODO: (PERF TEST) I'd like to do a dumb, unsafe recursive comparator that doesn't use testing.
# TODO: (PERF TEST) We may also want the dumb version not to do the undefined test if "hasOwnProperty" is slow.
# TODO: (PERF TEST) Object.keys is slower than iterating over the keys in objects < 100 properties. AND, Since we are iterating anyway...
# TODO: (PERF TEST) When testing for a.eq, is (typeof(a.eq) == "function") as-fast? If so, use that, else, stick with what we've got.
module.exports = class Eq
  ###
  IN: see @compare
  OUT:
    true: if a and b are structurally equal
    false: otherwise
  ###
  @eq:  (a, b, compareFunctionsAsStrings) => a == b || 0 == @compare a, b, true, compareFunctionsAsStrings
  @neq: (a, b, compareFunctionsAsStrings) =>
    if a == b
      false
    else
      0 != @compare a, b, true, compareFunctionsAsStrings

  @fastEq:  (a, b) => a == b || 0 == @compare a, b, false
  @fastNeq: (a, b) =>
    if a == b
      false
    else
      0 != @compare a, b, false

  # recursively compares all elements with indexs < min a.length, b.length
  # If all are equal, returns a.length - b.length
  @_compareArray: (a, b, recursionBlockArray, compareFunctionsAsStrings) =>
    aLength = a.length
    bLength = b.length

    for i in [0...Math.min aLength, bLength] by 1
      av = a[i]
      bv = b[i]
      return val if 0 != val = @_compare av, bv, recursionBlockArray, compareFunctionsAsStrings

    aLength - bLength

  # recursively compares all properties in both a and b
  # If all are equal, returns a.length - b.length
  @_compareObject: (a, b, recursionBlockArray, compareFunctionsAsStrings) =>
    aLength = 0
    compared = 0

    for k, av of a
      aLength++
      av = a[k]
      bv = b[k]
      if bv != undefined || b.hasOwnProperty k
        compared++
        return val if 0 != val = @_compare av, bv, recursionBlockArray, compareFunctionsAsStrings

    if aLength == compared && compared == objectKeyCount b
      0
    else
      NaN

  ###
  compare is recursive. However, it only recurses for 'plain' objects and arrays.

  If you want to compare custom objects deeply, you must add an .eq or .compare function to your custom objects.
    signature: a.eq b, recursionBlockArray => truthy if a equals b
    signature: a.compare b, recursionBlockArray => NaN / <0 / 0 / >0 for incomparable / a<b / a==b / a>b respectively
    IN:
      a: => this/@
      b: compared with a
      recursionBlockArray: an array of objects already on the stack being tested, pass this to
    It is an array of every object recursively currently being tested - don't test an object in this array
    recursionBlockArray can be altered, but should be returned in its original state. It may be null.

  IN:
    a and b: compare a and b
    recursionBlockEnabled:
      truthy: recursive structures will be handled correctly
      falsey: (default) faster, but recursive structures result in infinite recursion
  OUT:
    NaN:
      a and b are different types
      a and b are otherwise not comparable

    <0: a < b
    0:  a == b
    >0: a > b

  TODO:
    recursionBlockArray could be reused.
    Further, depth == 1 checks could be safely skipped to make
    even slow-compare fast for simple objects. Only if we
    have an object/array inside another object/array do we need
    to start checking.
  ###
  @compare: (a, b, recursionBlockEnabled, compareFunctionsAsStrings) =>
    @_compare a, b, recursionBlockEnabled && [], compareFunctionsAsStrings

  @_compare: (a, b, recursionBlockArray, compareFunctionsAsStrings) =>
    return 0 if a == b

    if a? && b? && a.constructor == _constructor = b.constructor
      return a.localeCompare b if isString a
      return floatTrue0 a - b if isNumber a

      # recursion block
      if recursionBlockArray
        return 0 if a in recursionBlockArray || b in recursionBlockArray
        recursionBlockArray.push a
        recursionBlockArray.push b

      # use a.compare if available
      return a.compare b, recursionBlockArray if a.compare

      # recurse on plain objects and arrays
      return @_compareArray  a, b, recursionBlockArray, compareFunctionsAsStrings if _constructor == Array
      return @_compareObject a, b, recursionBlockArray, compareFunctionsAsStrings if _constructor == Object
      return ("#{a}").localeCompare("#{b}")            if compareFunctionsAsStrings && _constructor == Function

      # fallback to .eq
      return 0 if a.eq && a.eq b, recursionBlockArray

      if recursionBlockArray
        remove recursionBlockArray, recursionBlockArray.length - 2, 2

    NaN

  @plainObjectsDeepEqArray: (a, b) =>

    return false if a.length != b.length

    for av, i in a when !_plainObjectsDeepEq av, b[i]
      return false

    true

  @plainObjectsDeepEqObject: (a, b) =>

    aLength = 0

    for k, av of a
      aLength++
      bv = b[k]
      unless (bv != undefined || b.hasOwnProperty(k)) && _plainObjectsDeepEq av, bv
        return false

    aLength == objectKeyCount b

  compareStack = []
  @plainObjectsDeepEq: (a, b) ->
    try
      _plainObjectsDeepEq a, b
    finally
      compareStack = []

  _plainObjectsDeepEq = (a, b) =>
    if a == b
      true
    else if (a in compareStack) || (b in compareStack)
      false
    else if a && b && a.constructor == _constructor = b.constructor

      if a.eq || (_isA = _constructor == Array) || (_isB = _constructor == Object)
        try
          compareStack.push a
          compareStack.push b

          switch
            when _isA then @plainObjectsDeepEqArray  a, b
            when _isB then @plainObjectsDeepEqObject a, b
            else a.eq b

        finally
          compareStack.pop()
          compareStack.pop()
      else false

    else
      false

  # alias - ArtReact, ArtFlux and ArtEry were all making this local alias
  # This standardizes the alias.
  # 2016-09-27 SBd
  @propsEq: @plainObjectsDeepEq

  @plainObjectsDeepDiffArray: (before, after) =>

    res = null
    len = min before.length, after.length
    for i in [0...len] when diff = plainObjectsDeepDiff before[i], after[i]
      res ||= {}
      res[i] = diff

    if len < before.length
      for i in [len...before.length]
        res ||= {}
        res[i] = removed: before[i]

    if len < after.length
      for i in [len...after.length]
        res ||= {}
        res[i] = added: after[i]

    res

  @plainObjectsDeepDiffObject: (before, after) =>
    res = null

    for k, beforeV of before
      if after.hasOwnProperty k
        if diff = plainObjectsDeepDiff beforeV, after[k]
          res ||= {}
          res[k] = diff
      else
        res ||= {}
        res[k] = removed: beforeV

    for k, afterV of after when !before.hasOwnProperty k
      res ||= {}
      res[k] = added: afterV

    res

  @plainObjectsDeepDiff: plainObjectsDeepDiff = (before, after) =>
    if before == after
      null
    else if before && after && before.constructor == _constructor = after.constructor
      if before.eq
        if before.eq after
          null
        else
          before: before
          after: after
      else if _constructor == Array  then @plainObjectsDeepDiffArray  before, after
      else if _constructor == Object then @plainObjectsDeepDiffObject before, after
      else
        before: before
        after: after
    else
      before: before
      after: after

  # alias - it's so often the right diff, I'm trying it out as just "diff"
  # 2016-09-27 SBD
  @diff: plainObjectsDeepDiff

  # test with == and, failing that, use a's eq
  @shallowEq: (a, b) => a == b || (a && b && a.eq && a.eq b)

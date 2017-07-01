module.exports = class ObjectDiff
  defaultEq = (a, b) -> a == b
  ###
  SBD this has been thouroughly benchmarked on Safari and Chrome as of 2015-11-06
  This is as fast as I could make it.

  IN:
    newObj:   the changed-to object   (must be set)
    oldObj:   the changed-from object (default: {})
    added:    (key, newValue) -> null
              called for each key in newObj that was not in oldObj
    removed:  (key, oldValue) -> null
              called for each key in oldObj that is not in newObj
    changed:  (key, newValue, oldValue) -> null
              called for each key in both where the value changed
    noChange: (key, value) -> null
              called for each key in both where the value stayed the same
    eq:       (a, b) -> true if a is equal to b
              DEFAULT: use javascript ===
              provided for custom concepts of equality
    oldObjKeyCount: null or a the number of keys in oldObj
      This last field provides an opportunity for further performance improvement.
      If you have previously computed the number of keys in oldObj, pass it in.
      Counting the number of keys in an object can be slow. If we know the number
      of keys this routine can be more efficient.

      NOTE that this function returns the key-count of the new object. That way if you
      are calling objecfDiff several times over a sequence of object changes, can you keep
      the results from this function, you already have the oldObjKeyCount for the next call.

  OUT: newObjKeyCount - number of keys in the new object
  ###
  @objectDiff: (newObj, oldObj, added, removed, changed, noChange, eq = defaultEq, oldObjKeyCount) ->
    newObjKeyCount = 0
    unless oldObj
      for k, newValue of newObj
        newObjKeyCount++
        added k, newValue
      return newObjKeyCount

    oldObjKeyCountIsAtLeast = 0
    for k, newValue of newObj
      newObjKeyCount++
      if typeof (oldValue = oldObj[k]) != "undefined" || oldObj.hasOwnProperty k
        oldObjKeyCountIsAtLeast++
        if !eq newValue, oldValue
          changed k, newValue, oldValue
        else
          noChange? k, newValue
      else
        added k, newValue

    if !(oldObjKeyCount?) || oldObjKeyCountIsAtLeast != oldObjKeyCount
      for k of oldObj
        removed k, oldObj[k] unless typeof newObj[k] != "undefined" || newObj.hasOwnProperty k

    newObjKeyCount

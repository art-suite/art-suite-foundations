{compactFlatten} = require "./ArrayCompactFlatten"
{isPlainObject} = require './Types'

module.exports = class Merge
  ###

  merge "flattens" its args and then adds all keys from all objects in
  the list into a new object which is returned.

  return: new object

  The first object's keys are added first. If two or more objects have the same
  keys, the value set in the result is the last object's in the list with that key.

  ###
  @merge: merge = (all...) -> mergeInto {}, all

  @mergeWithoutNulls: (all...) -> mergeIntoWithNullDeletes {}, all

  @mergeWithSelf: (all...) ->
    mergeInto {}, @, all

  ###
  The same as 'merge' with one difference:

  Instead of a new object, all objects are merged into the first object in the list.

  return: first object in the flattened list
  return: null if no source objects
  ###
  @mergeInto: mergeInto = (all...) ->
    sources = compactFlatten all
    return null if sources.length == 0
    result = sources[0] || {}
    for source in sources when source != result
      result[k] = v for k, v of source when v != undefined
    result

  @mergeIntoWithNullDeletes: mergeIntoWithNullDeletes = (all...)->
    sources = compactFlatten all
    return null if sources.length == 0
    result = sources[0] || {}
    for source in sources when source != result
      for k, v of source
        switch
          when v?         then result[k] = v
          when v == null  then delete result[k]
    result

  ###
  Just like mergeInfo except only merge into the result object
  UNLESS 'result' already has that property with a non-undefined value.

  if
    mergeInfo a, b is just like merge a, b except it modifies and returns a instead of returning a new object
  then
    mergeIntoUnless b, a is just like merge a, b except it modifies and returns b instead of returning a new object

  Note: mergeIntoUnless a, b, c, d, e, f is like merge f, e, d, c, b, a
  ###
  @mergeIntoUnless: (all...)->
    sources = compactFlatten all
    return null if sources.length == 0
    result = sources[0] || {}
    for i in [1...sources.length] by 1
      source = sources[i]
      for k, v of source when result[k] == undefined
        result[k] = v
    result

  @deepMerge: deepMerge = (all...) ->
    for k, v of out = merge array = compactFlatten all
      if isPlainObject v
        out[k] = _deepMerge (val[k] for val in array)
    out

  _deepMerge = (array) ->
    for k, v of out = merge array = compactFlatten array
      if isPlainObject v
        out[k] = _deepMerge (val[k] for val in array)
    out

  # true if o2 has all the properties of o1 (possibly more, and possibly with different values including undefined or nul)
  @hasAllProps: (o1, o2) ->
    for k, v of o1
      return false unless o2.hasOwnProperty k
    true

  # Like merge, it doesn't alter any of the inputs
  # Unlike merge, it returns o2 without creating a new object if the result would be identical to o2.
  # if o1 or o2 is null/undefined, return the other
  # if both are unll/undefined, return o2
  # the name "pureMerge" comes from pure-functional-merge - as in this is how you'd implement
  # merge if you were asuming o1, o2 and the result of pureMerge were never modified.
  # TODO: a better name may be leanMerge - since it is ligher weight than "merge".
  @pureMerge: pureMerge = (all...)=>
    sources = compactFlatten all
    return null if sources.length == 0
    return sources[0] if sources.length == 1

    # only apply merge if the last object is missing a key from another object
    last = sources[sources.length - 1]
    for source in sources when source != last
      return @merge sources unless @hasAllProps source, last
    last

  ###
  I might consider adding "o" - which works like Object-Tree constructors:
    First, it compact-flattens args
    Second, it gathers up and merges all plain-objects in its args list
    Last, all remaining items get added to the "children" list
  The question is, what does it return? Options:

    OPTION: If only plain-objects after compact-flatten, just return the merged object ELSE:

  Options if both objects and non-object values are present:
    a. return compactFlatten [plainObject, nonObjectValues]
    b. return merge plainObject, children: nonObjectValues
    c. return new MClass plainObject, nonObjectValues
      class MClass extends BaseObject
        @properties "props children"
        constructor: (@props, @children) ->
  ###
  @m: pureMerge

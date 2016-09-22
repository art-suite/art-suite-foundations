module.exports = class ArrayCompactFlatten

  ######################
  # PUBLIC
  ######################
  @isArguments: isArguments = (o) ->
    o.constructor == Object &&
    (typeof o.callee is "function") &&
    (typeof o.length is "number")

  @isArrayOrArguments: isArrayOrArguments = (o) ->
    o && (o.constructor == Array || isArguments o)

  @needsFlatteningOrCompacting: needsFlatteningOrCompacting = (array, keepTester) ->
    for a in array when isArrayOrArguments(a) || !keepTester a
      return true
    false

  @keepUnlessNullOrUndefined: keepUnlessNullOrUndefined = (a) -> a != null && a != undefined

  ###
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output

  OUT: array where all elements test true to keepTester
  NOTE: NOT recursive - just does a shallow pass
  ###
  @compact: compact = (array, keepTester = keepUnlessNullOrUndefined) =>
    for a in array
      unless keepTester a
        # needs compacting
        return (a for a in array when keepTester a)

    # already compact
    array

  ###
  IN: accepts any number of arguments
  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
    to the top level (flatten)

  ###
  @flatten: flatten = (firstArg)->
    compactFlattenIfNeeded if arguments.length == 1
      if isArrayOrArguments firstArg
        firstArg
      else
        [firstArg]
    else
      arguments

  ###
  IN: array: any object that has a length

  EFFECT:
    itterates over array and recurse over any element which isArrayOrArguments
    invokes f on every element that is not isArrayOrArguments
  OUT: array (same as passed in)
  ###
  @deepArrayEach: deepArrayEach = (array, f) ->
    for el in array
      if isArrayOrArguments el
        deepArrayEach el, f
      else
        f el
    array

  ###
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output

  OUT: array where all elements test true to keepTester
  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
    to the top level (flatten)
  ###
  @compactFlatten: (array, keepTester = keepUnlessNullOrUndefined)->
    compactFlattenIfNeeded array, keepTester

  ####################
  # PRIVATE
  ####################
  arraySlice = Array.prototype.slice

  doFlattenInternal = (array, keepTester) ->
    output = []
    deepArrayEach array, (el) ->
      output.push el if keepTester el
    output

  keepAll = -> true
  compactFlattenIfNeeded = (array, keepTester = keepAll)->
    if needsFlatteningOrCompacting array, keepTester
      doFlattenInternal array, keepTester
    else if array.constructor != Array
      arraySlice.call array
    else
      array


"use strict"

{isArray} = require '@art-suite/art-core-types'

needsFlatteningOrCompacting = (inputArray, keepTester) ->
  for a in inputArray when isArray(a) || !keepTester a
    return true
  false

keepAll                   = -> true
keepUnlessNullOrUndefined = (a) -> a?

####################
# PRIVATE
####################
doFlattenInternal = (inputArray, output, keepTester) ->
  for el in inputArray
    if isArray el then doFlattenInternal el, output, keepTester
    else                          output.push el if keepTester el
  output

compactFlattenIfNeeded = (inputArray, keepTester)->
  switch
    when !inputArray? then inputArray
    when !isArray(inputArray) then [inputArray]
    when needsFlatteningOrCompacting(inputArray, keepTester) || !isArray inputArray
      doFlattenInternal inputArray, [], keepTester
    else inputArray

####################
# PRIVATE - FAST
####################
doFlattenInternalFast = (inputArray, output) ->
  for el in inputArray
    if isArray el then doFlattenInternalFast el, output
    else if el?   then output.push el
  output

needsFlatteningOrCompactingFast = (inputArray) ->
  for el in inputArray when !el? || isArray el
    return true
  false

compactFlattenIfNeededFast = (inputArray)->
  if needsFlatteningOrCompactingFast inputArray
    doFlattenInternalFast inputArray, []

  else inputArray

########################
# PRIVATE - FAST CUSTOM
########################
doFlattenInternalFastCustom = (inputArray, output, keepTester) ->
  for el in inputArray
    if isArray el then  doFlattenInternalFastCustom el, output, keepTester
    else                output.push el if keepTester el
  output

needsFlatteningOrCompactingFastCustom = (inputArray, keepTester) ->
  for a in inputArray when isArray(a) || !keepTester a
    return true
  false

compactFlattenIfNeededFastCustom = (inputArray, keepTester)->
  if needsFlatteningOrCompactingFastCustom inputArray, keepTester
    doFlattenInternalFastCustom inputArray, [], keepTester

  else inputArray

module.exports = class ArrayCompactFlatten

  ######################
  # PUBLIC
  ######################

  @keepUnlessNullOrUndefined: (a) ->
    console.warn "DEPRICATED: keepUnlessNullOrUndefined"
    a?

  ###
  IN:
    inputArray: inputArray or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output

  OUT: inputArray where all elements test true to keepTester
  NOTE: NOT recursive - just does a shallow pass
  ###
  @compact: compact = (inputArray, keepTester) =>
    if keepTester
      for a in inputArray when !keepTester a
        # needs compacting
        return (a for a in inputArray when keepTester a)
    else
      for a in inputArray when !a?
        # needs compacting
        return (a for a in inputArray when a?)

    # already compact
    inputArray

  ### flatten
    IN: accepts any number of arguments
    NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
      to the top level (flatten)
  ###
  @flatten: flatten = (args...)->
    compactFlattenIfNeeded(
      if args.length == 1
        args[0]
      else
        args
      keepAll
    )

  ### compactFlatten
    IN:
      inputArray: inputArray or arguments-object
      keepTester: (value) -> true/false
        OUT: return true if that element should be in the output

    OUT: inputArray where all elements test true to keepTester
    NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
      to the top level (flatten)
  ###
  @compactFlatten: (inputArray)->
    compactFlattenIfNeeded inputArray, keepUnlessNullOrUndefined

  @customCompactFlatten: (inputArray, customKeepTester) -> compactFlattenIfNeeded inputArray, customKeepTester
  @compactFlattenAll: (all...) -> compactFlattenIfNeededFast all

  ####################
  # vFast: Arrays only for performance
  ####################
  @compactFlattenFast: (inputArray )-> compactFlattenIfNeededFast inputArray
  @compactFlattenIntoFast: (into, inputArray) -> doFlattenInternalFast inputArray, into
  @customCompactFlattenFast: (inputArray, customKeepTester) -> compactFlattenIfNeededFastCustom inputArray, customKeepTester
  @customCompactFlattenIntoFast: (into, inputArray, customKeepTester) -> doFlattenInternalFastCustom inputArray, into, customKeepTester

  ### deepArrayEach
    IN: inputArray: any object that has a length

    EFFECT:
      iterates over inputArray and recurse over any element which isArray
      invokes f on every element that is not isArray
    OUT: inputArray (same as passed in)
  ###
  @deepArrayEach: deepArrayEach = (inputArray, f) ->
    for el in inputArray
      if isArray el
        deepArrayEach el, f
      else
        f el
    inputArray

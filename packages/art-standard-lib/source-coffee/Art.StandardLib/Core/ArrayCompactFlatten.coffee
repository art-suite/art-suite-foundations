"use strict"

{isArray} = require './Types'

module.exports = class ArrayCompactFlatten

  ######################
  # PUBLIC
  ######################
  @isArrayOrArguments: isArrayOrArguments = (o) ->
    isArray(o) ||
    if typeof o?.length == "number" && o.toString() == '[object Arguments]'
      console.error "DEPRICATED compactFlatten* no longer supports Arguments objects"
      true
    else false

  @needsFlatteningOrCompacting: (array, keepTester) ->
    console.warn "DEPRICATED - needsFlatteningOrCompacting"
    needsFlatteningOrCompacting array, keepTester

  @keepUnlessNullOrUndefined: (a) ->
    console.warn "DEPRICATED: keepUnlessNullOrUndefined"
    a?

  needsFlatteningOrCompacting = (array, keepTester) ->
    for a in array when isArrayOrArguments(a) || !keepTester a
      return true
    false

  keepAll                   = -> true
  keepUnlessNullOrUndefined = (a) -> a?

  ###
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output

  OUT: array where all elements test true to keepTester
  NOTE: NOT recursive - just does a shallow pass
  ###
  @compact: compact = (array, keepTester) =>
    if keepTester
      for a in array when !keepTester a
        # needs compacting
        return (a for a in array when keepTester a)
    else
      for a in array when !a?
        # needs compacting
        return (a for a in array when a?)

    # already compact
    array

  ###
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

  ###
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output

  OUT: array where all elements test true to keepTester
  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
    to the top level (flatten)
  ###
  @compactFlatten: (array, keepTester )->
    if keepTester
      throw new Error "DEPRICATED ArtStandardLib.ArrayCompactFlatten.compactFlatten: keepTester param; use customCompactFlatten"
    compactFlattenIfNeeded array, keepUnlessNullOrUndefined

  @customCompactFlatten: (array, customKeepTester) ->
    compactFlattenIfNeeded array, customKeepTester

  @compactFlattenAll: (all...) =>
    compactFlattenIfNeededFast all

  ####################
  # vFast: Arrays only for performance
  ####################
  @compactFlattenFast: (array )->
    compactFlattenIfNeededFast array

  @compactFlattenIntoFast: (into, array) ->
    doFlattenInternalFast array, into

  @customCompactFlattenFast: (array, customKeepTester) ->
    compactFlattenIfNeededFastCustom array, customKeepTester

  @customCompactFlattenIntoFast: (into, array, customKeepTester) ->
    doFlattenInternalFastCustom array, into, customKeepTester

  # DEPRICATED - can just use compactFlattenAll
  @compactFlattenAllFast: (all...) =>
    compactFlattenIfNeededFast all

  @deepArrayEachFast: deepArrayEachFast = (array, f) ->
    for el in array
      if isArray el
        deepArrayEachFast el, f
      else
        f el
    array

  ####################
  # EXTRA
  ####################
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

  ####################
  # PRIVATE
  ####################
  doFlattenInternal = (array, output, keepTester) ->
    for el in array
      if isArrayOrArguments el then doFlattenInternal el, output, keepTester
      else                          output.push el if keepTester el
    output

  compactFlattenIfNeeded = (array, keepTester)->
    switch
      when !array? then array
      when !isArrayOrArguments(array) then [array]
      when needsFlatteningOrCompacting(array, keepTester) || !isArray array
        doFlattenInternal array, [], keepTester
      else array

  ####################
  # PRIVATE - FAST
  ####################
  doFlattenInternalFast = (array, output) ->
    for el in array
      if isArray el then doFlattenInternalFast el, output
      else if el?   then output.push el
    output

  needsFlatteningOrCompactingFast = (array) ->
    for el in array when !el? || isArray el
      return true
    false

  compactFlattenIfNeededFast = (array)->
    if needsFlatteningOrCompactingFast array
      doFlattenInternalFast array, []

    else array

  ########################
  # PRIVATE - FAST CUSTOM
  ########################
  doFlattenInternalFastCustom = (array, output, keepTester) ->
    for el in array
      if isArray el then  doFlattenInternalFastCustom el, output, keepTester
      else                output.push el if keepTester el
    output

  needsFlatteningOrCompactingFastCustom = (array, keepTester) ->
    for a in array when isArray(a) || !keepTester a
      return true
    false

  compactFlattenIfNeededFastCustom = (array, keepTester)->
    if needsFlatteningOrCompactingFastCustom array, keepTester
      doFlattenInternalFastCustom array, [], keepTester

    else array

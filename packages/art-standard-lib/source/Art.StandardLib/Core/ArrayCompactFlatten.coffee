"use strict"

{isArray} = require './Types'

module.exports = class ArrayCompactFlatten

  ######################
  # PUBLIC
  ######################
  @isArguments: isArguments = (o) ->
    o? &&
    typeof o.length == "number" &&
    o.toString() == '[object Arguments]'

  @isArrayOrArguments: isArrayOrArguments = (o) ->
    o? &&
    typeof o.length == "number" &&
    (o.constructor == Array || o.toString() == '[object Arguments]')

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
      firstArg
    else
      arguments

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
      log.warn "DEPRICATED ArtStandardLib.ArrayCompactFlatten.compactFlatten: keepTester param; use customCompactFlatten"
    compactFlattenIfNeeded array, keepTester ? keepUnlessNullOrUndefined

  @customCompactFlatten: (array, customKeepTester) ->
    compactFlattenIfNeeded array, customKeepTester

  @compactFlattenAll: (all...) =>
    compactFlattenIfNeeded all, keepUnlessNullOrUndefined


  ####################
  # vFast: Arrays only for performance
  ####################
  @compactFlattenFast: (array )->
    compactFlattenIfNeededFastBasic array

  @compactFlattenIntoFast: (into, array) ->
    doFlattenInternalFastBasic array, into

  @customCompactFlattenFast: (array, customKeepTester) ->
    compactFlattenIfNeededFast array, customKeepTester

  @customCompactFlattenIntoFast: (into, array, customKeepTester) ->
    doFlattenInternalFast array, into, customKeepTester

  @compactFlattenAllFast: (all...) =>
    compactFlattenIfNeededFastBasic all

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
  arraySlice = Array.prototype.slice

  doFlattenInternal = (array, output, keepTester) ->
    for el in array
      if isArrayOrArguments el then doFlattenInternal el, output, keepTester
      else                          output.push el if keepTester el
    output

  keepAll = -> true
  compactFlattenIfNeeded = (array, keepTester = keepAll)->
    return array unless array?
    return [array] if array? && !isArrayOrArguments array
    if needsFlatteningOrCompacting array, keepTester
      doFlattenInternal array, [], keepTester
    else if array.constructor != Array
      arraySlice.call array
    else array

  doFlattenInternalFast = (array, output, keepTester) ->
    for el in array
      if isArray el then  doFlattenInternalFast el, output, keepTester
      else                output.push el if keepTester el
    output

  needsFlatteningOrCompactingFast = (array, keepTester) ->
    for a in array when isArray(a) || !keepTester a
      return true
    false

  compactFlattenIfNeededFast = (array, keepTester)->
    if needsFlatteningOrCompactingFast array, keepTester
      doFlattenInternalFast array, [], keepTester

    else array

  doFlattenInternalFastBasic = (array, output) ->
    for el in array
      if isArray el then doFlattenInternalFastBasic el, output
      else if el?   then output.push el
    output

  needsFlatteningOrCompactingFastBasic = (array) ->
    for el in array when !el? || isArray el
      return true
    false

  compactFlattenIfNeededFastBasic = (array)->
    if needsFlatteningOrCompactingFastBasic array
      doFlattenInternalFastBasic array, []

    else array

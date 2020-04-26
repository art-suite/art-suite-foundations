{compactFlatten, deepArrayEach, isArrayOrArguments, mergeInto} = require './Core'
{isPlainObject, isObject, isFunction, isPlainArray} = require './TypesExtended'

log = (args...)->
  Neptune.Art.StandardLib.log args...

module.exports = class Iteration
  returnFirst = (a) -> a
  returnSecond = (a, b) -> b
  arrayIterableTest = (source) -> source?.length >= 0
  emptyOptions = {}

  ###
  COMMON API:

  IN: (source, withBlock = returnFirst) ->
  IN: (source, options) ->
  IN: (source, into, withBlock = returnFirst) ->
  IN: (source, into, options) ->

  source:
    array-like (see arrayIterableTest)
      use indexes to iterate

    non-null

  options:
    with: withBlock
    when: whenBlock
    into: into

  withBlock: (value, key, into, whenBlockResult) -> value
    Generally, this generates the 'value' used for each part of the iteration.
    When constructing a new collection, this is the value for each entry.
    'find' and 'reduce' use this differently.

  OUT: into

  TODO:
    - support ES6 iterables and iterators
    - flatten: true - if source is an array, recurse into any sub-arrays
    - compact: effectively `when: (v) -> v?` except you can also have your own when-function in addition, run after this one.
    - skip: N - skip the first N values
    - short: N - stop short N values
    - until: () -> T/F - same args as withBlock, loop stops when true, executed after first withBlock
    - while: () -> T/F - same args as withBlock, loop stops when false, executed before first whenBlock
    - by: N -
        N>0: only stop at every Nth value
        N<0: iterate in reverse order, only stop at every abs(N)th value
  ###

  ###
  each differences from the common-api:

  1) into defaults to source
  ###
  @each: (source, a, b) -> invokeNormalizedIteration normalizedEach, source, a, b
  normalizedEach = (source, into, withBlock, options) ->

    into = source if into == undefined

    if options
      whenBlock = options.when

    if arrayIterableTest source
      if whenBlock then withBlock v, k, into, w for v, k in source when w = whenBlock v, k
      else              withBlock v, k, into    for v, k in source
    else if source?
      if whenBlock then withBlock v, k, into, w for k, v of source when w = whenBlock v, k
      else              withBlock v, k, into    for k, v of source

    into

  ###
  eachWhile differences from the common-api:

  1) into defaults to source
  2) stops when withBlock returns false
  ###
  @eachWhile: (source, a, b) -> invokeNormalizedIteration normalizedEachWhile, source, a, b
  normalizedEachWhile = (source, into, withBlock, options) ->

    into = source if into == undefined

    if options
      whenBlock = options.when

    if arrayIterableTest source
      if whenBlock
        for v, k in source when w = whenBlock v, k
          break unless withBlock v, k, into, w
      else
        for v, k in source
          break unless withBlock v, k, into
    else if source?
      if whenBlock
        for k, v of source when w = whenBlock v, k
          break unless withBlock v, k, into, w
      else
        for k, v of source
          break unless withBlock v, k, into

    into

  ###
  reduce differences from the common-api:

  1) The with-block has a different argument order. Into is passed first instead of last:
    with: (into, value, key, whenReturnValue) ->
    This allows you to drop-in functions that take two args and reduce them to one like:
      Math.max
      add = (a, b) -> a + b

    The default with-block still returns value (which is now the second argument).

  1) if into starts out undefined:
    for v = the first value (if whenBlock is present, the first value when whenBlock is true)
      into = v
      skip: withBlock

  2) when withBlock is executed, into is updated:
    into = withBlock()
  ###
  @reduce: (source, a, b) -> invokeNormalizedIteration normalizedInject, source, a, b
  normalizedInject = (source, into, withBlock, options) ->
    return into unless source?

    normalizedEach source,
      undefined,
      if intoSet = into != undefined
            (v, k, __, w)-> into = withBlock into, v, k, w
      else  (v, k, __, w)-> into = if intoSet then withBlock into, v, k, w else intoSet = true; v
      options

    into

  ###
  object differences from the common-api:

  IN:
    options.key: (value, key, into, whenBlockResult) -> value

  1) into defaults to a new object ({}) (if into == undefined)

  2) when withBlock is executed, into is updated:
    if source is array-like:
      into[v] = withBlock()
    else
      into[k] = withBlock()
  ###
  @object: (source, a, b) -> invokeNormalizedIteration normalizedObject, source, a, b
  normalizedObject = (source, into, withBlock, options) ->

    keyFunction = options.key || options.withKey || if arrayIterableTest source
      returnFirst
    else
      returnSecond

    normalizedEach source,
      into ? {}
      (v, k, into, w) -> into[keyFunction v, k, into, w] = withBlock v, k, into, w
      options

  ###
  array differences from the common-api:

  1) into defaults to a new array ([]) (if into == undefined)

  2) when withBlock is executed, into is updated:
    into.push withBlock()
  ###
  @array: (source, a, b) -> invokeNormalizedIteration normalizedArray, source, a, b
  normalizedArray = (source, into, withBlock, options) ->

    normalizedEach source,
      into ? []
      (v, k, into, w) -> into.push withBlock v, k, into, w
      options

  ##########################
  # find
  ##########################
  ###
  differs from common api:

  1) returns the last value returned by withBlock or undefined if withBlock was never executed
  2) stops if
    a) whenBlock?:  and it returned true (stops after withBlock is evaluated)
    b) !whenBlock?: withBlock returns a truish value
  ###
  @find: (source, a, b) -> invokeNormalizedIteration normalizedFind, source, a, b
  normalizedFind = (source, into, withBlock, options) ->

    normalizedEachWhile source,
      found = undefined
      if options.whenBlock then (v, k, into, w) -> found   = withBlock v, k, null, w; false
      else                      (v, k, into, w) -> !(found = withBlock v, k, null, w)
      options

    found

  #####################
  # PRIVATE
  #####################
  ###
  Normalizes input params for the 'iteration' function.
  Since this normalizes multile params, and therefor would need to return
  an new array or new object otherwise, we pass IN the iteration function
  and pass the params directly to it. This keeps the computed params on the
  stack and doesn't create new objects.

  IN signature 1: (iteration, source, into, withBlock) ->
  IN signature 2: (iteration, source, into, options) ->
  IN signature 3: (iteration, source, withBlock) ->
  IN signature 4: (iteration, source, options) ->
  IN signature 5: (iteration, source) ->

  IN:
    iteration: (source, into, withBlock, options) -> out

      The iteration function is invoked last with the computed args.
      Its retults are returned.

      IN:
        source:     passed directly through from inputs
        into:       passed directly through from inputs OR from options.into
        withBlock:  passed directly through from inputs OR from options.with
        options:    passed direftly through from inputs OR {}
                    (guaranteed to be set and a plainObject)

    source: the source collection to be iterated over. Passed streight through.

    into:       passed through to 'iteration'
    withBlock:  passed through to 'iteration'
    options:    passed through to 'iteration' AND:

      into:     set 'into' from the options object
      with:     set 'withBlock' from the options object

  OUT: out
  ###
  invokeNormalizedIteration = (iteration, source, a, b) ->
    options = if b then into = a; b else a

    if isPlainObject options
      into      ?= options.into
      withBlock = options.with
    else
      withBlock = options if isFunction options
      options = emptyOptions

    iteration source, into, withBlock || returnFirst, options

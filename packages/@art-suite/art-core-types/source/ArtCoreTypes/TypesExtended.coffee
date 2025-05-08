{isPlainObject, mergeInto, isString, isFunction, isObject, isPlainArray, isJsonAtomicType} = Core = require './Types'

module.exports = class Types

  throwInequalityError = (a, b) ->
    throw new Error "Value types are not compatible for inequality tests. a: #{a?.constructor.name}, b: #{b?.constructor.name}"

  # 12-2017 TODO: Performance test: I think these should be as performant as just the direct operators for the normal cases.
  #   If so, we can replace them for all operators in CaffeineScript and get operator overloading.
  #   NOTE: a.constructor == b.constructor doesn't work across JavaScript zones (that's not the right word. but in browser, iFrames)
  #     We may want to use: typeof a == typeof b, but that needs perf-tested too.

  # TODO: perfTest
  #   Compare:
  #     a.constructor == b.constructor
  #   with
  #     typeof a == typeof b

  # https://run.perf.zone/view/compare-type-equality-1514486807306
  # Results: safari sucks for constructor comparison. Chrome, FF and Safarai are very fast for sameType

  # Safari, FF and Chrome are all full-speed
  # Edge doesn't perform at all well, but even with the simplest function it's almost the same ((a, b) -> a > b is terrible in Edge)
  #   I think it may be a testing glitch
  # https://run.perf.zone/view/operator-overloading-optimized-1514491281013

  # GRR - in my realworld tests, even a simplified version still is way slow in all browsers
  # https://run.perf.zone/view/operator-overloading-optimized-1514494600425
  ###
  # simplified - as simple as I can make it
  # sacrifices some semantics
  gt = (a, b)->
    if (o = a > b) || a <= b
      return o
    a.gt b

  # just a tad more complex and only sacrifices clear errors
  gt = (a, b)->
    if typeof a == typeof b
      if (o = a > b) || a <= b
        return o
    a.gt b
  ###

  tEq = (a, b) -> typeof a == typeof b

  @gt:  (a, b)->  if a? && b? then s = tEq a, b; (s && a >  b) || (if (s && a <= b) then false else a.gt  b) else throwInequalityError a, b
  @lt:  (a, b)->  if a? && b? then s = tEq a, b; (s && a <  b) || (if (s && a >= b) then false else a.lt  b) else throwInequalityError a, b
  @gte: (a, b)->  if a? && b? then s = tEq a, b; (s && a >= b) || (if (s && a <  b) then false else a.gte b) else throwInequalityError a, b
  @lte: (a, b)->  if a? && b? then s = tEq a, b; (s && a <= b) || (if (s && a >  b) then false else a.lte b) else throwInequalityError a, b

  ###
  like RubyOnRails#present:
    "An object is present if it's not blank."

  basic:
    present null, undefined, false or "" returns false (or whatever returnIfNotPresent is set to)
    all other values return something truish - generally themselves

    Yes, in ruby/rails, present(false) == false. Though logically true, I've also found it lead
    to unexpected results in production code. I had a false-value where I was expecting a string due
    to a corrupted database value.

    Possible argment for present(false) == false: It's easy to accidentally return false when you
    meant to return null or undefined. I think this is how my database got the corrupted false-instead-of
    null-value.

    Another argument: present(x) should always be false if x is false.

  custom:
    for bar where isFunction bar.present
      present bar returns bar.present()

  special-case truish results:
    present 0 or false returns true

  for any other value foo,
    present foo returns foo

  IN:
    obj:
      object tested for presence
    returnIfNotPresent: [false]
      what to return if not present

  OUT:
    returnIfNotPresent, true, or the value passed in

  If 'obj' has method: obj.present() => obj.present()
  ###
  @present: (obj, returnIfNotPresent = false) ->
    present = if isFunction obj?.getPresent
      obj.getPresent()
    else if isFunction obj?.present
      obj.present()
    else if isString obj
      stringIsPresent obj
    else
      (obj != undefined && obj != null && obj != false)

    if present then obj || true else returnIfNotPresent

  @stringIsPresent: stringIsPresent = (str) ->
    isString(str) && !/^(\s+|)$/.test str

  @functionName: functionName = (f) ->
    (f.name || ((matched = "#{f}".match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function")

  @objectName: objectName = (obj) ->
    if !obj then "" + obj
    else if a = obj.getNamespacePath?() then a
    else if a = obj.classPathName then a
    else if obj.constructor == Object then "Object"
    else if isFunction obj then functionName obj
    else if isString(name = obj.constructor?.name) && name.length > 0 then name
    else if obj instanceof Object then "(anonymous instanceof Object)"
    else "(objectName unknown)"

  @isBrowserObject: (obj) =>
    return false unless @isObject obj
    name = @objectName obj
    name.slice(0,4)=="HTML" || name.slice(0,22) == "CanvasRenderingContext"


{isPlainObject, mergeInto, isString, isFunction, isObject, isPlainArray, isJsonAtomicType} = Core = require './Core'

module.exports = class Types
  mergeInto @, Core.Types

  @gt:  (a, b) -> if isFunction a.gt  then a.gt b else a > b
  @lt:  (a, b) -> if isFunction a.lt  then a.lt b else a < b
  @gte: (a, b) -> if isFunction a.gte then a.gte b else a >= b
  @lte: (a, b) -> if isFunction a.lte then a.lte b else a <= b

  ###
  like RubyOnRails#present:
    "An object is present if it's not blank."

  basic:
    present null, undefined or "" returns false (or whatever returnIfNotPresent is set to)
    all other values return something truish - generally themselves

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
      !obj.match /^\s*$/
    else
      obj != undefined && obj != null
    if present then obj || true else returnIfNotPresent

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

  ######################
  # Plain Data
  ######################

  ###
  IN:
    f: (value, [key]) ->
      f is called on every non-plainObject and non-plainArray reachable by traversing
      the plainObject/plainArray structure
      If f is called on a propery of a plainObject, the key for that property is also passed in.
  OUT: value
  ###
  @deepEach: deepEach = (v, f, key) ->
    if isPlainArray v
      deepEach subV, f for subV in v
    else if isPlainObject v
      deepEach subV, f, k for k, subV of v
    else
      f v, key
    v

  ###
  deepEachAll: just like deepEach except 'f' gets called on every value found including the initial value.
  ###
  @deepEachAll: deepEachAll = (v, f, key) ->
    f v, key
    if isPlainArray v
      deepEachAll subV, f for subV in v
    else if isPlainObject v
      deepEachAll subV, f, k for k, subV of v
    else

    v

  ###
  only creates a new array if the children changed
  ###
  deepMapArray = (array, mapper, options) ->
    res = null
    for v, i in array
      r = deepMap v, mapper, options
      if r!=v
        res ||= array.slice()
        res[i] = r
    res ||= array
    if p = options?.postprocessArray
      p res
    else
      res

  cloneObjectUpToKey = (obj, k) ->
    res = {}
    for k2, v of obj
      break if k2 == k
      res[k2] = v
    res

  deepMapObject = (obj, mapper, options) ->
    res = null
    for k, v of obj
      r = deepMap v, mapper, options
      if r!=v || res
        res ||= cloneObjectUpToKey obj, k
        res[k] = r

    res ||= obj
    if p = options?.postprocessObject
      p res
    else
      res

  noopMapper = (v) -> v
  ###
  Applies "f" to every -value- in a nested structure of plain arrays and objects.
  Pure functional efficient:
    If an array or object, and all its sub values, didn't change, the original array/object is reused.

  NOTE: deepMap only yields values to 'mapper' which are NOT plain arrays nor plain objects.
  ###
  @deepMap: deepMap = (v, mapper, options) ->
    arrayMapper  = options?.arrays  || noopMapper
    objectMapper = options?.objects || noopMapper
    mapper ||= noopMapper

    if isPlainArray v       then deepMapArray  arrayMapper(v),  mapper, options
    else if isPlainObject v then deepMapObject objectMapper(v), mapper, options
    else mapper v

  # convert structure to only built-in types.
  # functions are left untouched
  # Non-PlainObjects are converted to their objectName string
  @toPlainStructure: (o) ->
    deepMap o, (o) ->
      if isObject o
        if o.toPlainStructure
          o.toPlainStructure()
        else
          objectName o
      else o

  ###
  similar to toPlainStructure, except all non-JSON types are converted to strings
  ###
  @toJsonStructure: toJsonStructure = (o) ->
    deepMap o, (o) ->
      if isObject o
        if o.toJsonStructure
          o.toJsonStructure()
        else
          toJsonStructure if o.toPlainStructure
            o.toPlainStructure()
          else
            "#{o}"
      else if isJsonAtomicType o
        o
      else
        "#{o}"

  #https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
  @toPostMessageStructure: toPostMessageStructure = (o) ->
    deepMap o, (o) ->
      switch o.constructor
        when ArrayBuffer, Date, RegExp, Blob, File, FileList, ImageData, Boolean, String
          o
        else
          if isObject o
            if o.toPostMessageStructure
              o.toPostMessageStructure()
            else
              if o.toPlainStructure
                toPostMessageStructure o.toPlainStructure()
              else
                "#{o}"
          else
            "#{o}"

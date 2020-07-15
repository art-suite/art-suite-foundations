Map = require "../Map"

{escapeJavascriptString} = require '../StringExtensions'
{
  objectName
  isString, isArray, isFunction, isObject, isClass, isBrowserObject
  isPlainObject, isPlainArray
} = require '../TypesExtended'

module.exports = class Inspector
  @unquotablePropertyRegex: /^([0-9]+|[_a-zA-Z][_0-9a-zA-Z]*)$/

  # Note = we never want to use a custom inspection function for function objects (which may be classes)
  @customInspectable: (obj) => obj.inspect && !(typeof obj == "function")

  @parentString: (distance) =>
    switch distance
      when 0 then "parent"
      when 1 then "grandparent"
      when 2 then "great grandparent"
      else "great^#{distance-1} grandparent"


  constructor: (options = {})->
    @maxLength = options.maxLength || 10000
    @allowCustomInspectors = !options.noCustomInspectors
    @maxDepth = if options.maxDepth? then options.maxDepth else 10
    @outArray = []
    @length = 0
    @depth = 0
    @inspectingMap = new Map
    @done = false

  @inspect: inspect = (obj, options = {}) ->
    return Neptune.Base.inspect.call @ if @ && @ != global

    inspector = new Inspector options
    inspector.inspect obj
    inspector.getResult()

  # a non-recursive inspect
  @shallowInspect: (obj) =>
    if !obj?                                then ""+obj
    else if @customInspectable obj          then @inspect obj
    else if isString obj                    then escapeJavascriptString obj
    else if isArray obj                     then "<<Array length: #{obj.length}>>"
    else if isFunction(obj) && obj.name=="" then "<<function args: #{obj.length}>>"
    else                                         "<<#{typeof obj}: #{obj.name || obj}>>"

  # strips enclosing '{}' or '[]' from plainObjects and plainArrays
  # options:
  #    anything @inspect accepts
  #    forArgs: true # never include [] around the top-level array
  @inspectLean: (object, options) =>
    fullInspect = inspect object, options
    if !isFunction(object?.inspect) && (isPlainObject(object) || (isPlainArray(object) && (object.length > 1 || options?.forArgs)))
      match = fullInspect.match /^\[(.+)\]$|^\{(.+)\}$/
      if match then match[1] || match[2] || match[3] else fullInspect
    else
      fullInspect

  put: (s) ->
    return if @done

    if @length + s.length > @maxLength
      @done = true
      remaining = @maxLength - @length
      s = "#{s.slice 0, remaining}<... first #{remaining}/#{s.length}>"

    @length += s.length
    @outArray.push s
    s

  getResult: -> @outArray.join ""

  maxDepthOutput: (obj) ->
    switch typeof obj
      when "string", "number", "boolean", "undefined" then @inspectInternal obj
      when "function"
        @put objectName obj
      when "object"
        @put if obj == null
          "null"
        else if isArray obj
          "[#{obj.length} elements]"
        else
          keys = Object.keys obj
          name = objectName obj
          if name == "Object"
            "{#{keys.length} keys}"
          else if keys.length > 0
            "{#{name} #{keys.length} keys}"
          else
            name

  inspectArray: (array) =>
    @put "["
    first = true
    for obj in array
      @put ", " unless first
      @inspect obj
      first = false
    @put "]"

  inspectObject: (obj) =>
    attributes = []
    keys = Object.keys obj
    name = objectName obj
    if isFunction(obj) and keys.length == 0
      @put name + "()"
    else if isBrowserObject obj
      @put "{#{name}}"
    else
      @put "{"
      @put "#{name} " unless obj.constructor == Object

      first = true
      for k in keys when k != "__uniqueId"
        @put ", " unless first
        v = obj[k]
        if Inspector.unquotablePropertyRegex.test k
          @put k
        else
          @inspect k
        @put ": "
        @inspect v
        first = false

      @put "}"

  inspectInternal: (obj) =>
    if !obj?                                  then @put "#{obj}"
    else if isString obj                      then @put escapeJavascriptString obj
    else if isArray obj                       then @inspectArray obj
    else if isClass(obj)                      then @put objectName(obj)
    else if @allowCustomInspectors && Inspector.customInspectable obj
      if obj.inspect.length > 0
        obj.inspect @
      else
        @put obj.inspect()
    else if obj instanceof RegExp             then @put "#{obj}"
    else if isObject(obj) || isFunction(obj)  then @inspectObject obj
    else if isFunction(obj?.toString)         then @put obj.toString()
    else                                      @put "#{obj}"

  inspect: (obj) =>
    return if @done

    if objDepth = @inspectingMap.get obj
      @put "<#{Inspector.parentString @depth - objDepth}>"
      return null

    if @depth >= @maxDepth
      @maxDepthOutput obj
    else
      @depth++
      @inspectingMap.set obj, @depth
      @inspectInternal obj
      @inspectingMap.delete obj
      @depth--

    null

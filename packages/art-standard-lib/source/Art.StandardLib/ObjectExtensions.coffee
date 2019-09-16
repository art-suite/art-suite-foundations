{compactFlatten, deepArrayEach, isArrayOrArguments, mergeInto} = require './Core'
{isPlainObject, isString, isObject, isFunction, isPlainArray, present} = require './TypesExtended'
{object} = require './Iteration'

module.exports = class ObjectExtensions
  # http://jsperf.com/counting-object-properties/3
  @countKeys: (o) ->
    Object.keys(o).length

  @objectKeyCount: objectKeyCount = (o) ->
    count = 0
    count++ for k, v of o
    count

  @objectHasKeys: (o) ->
    return true for k, b of o
    false
    # Caf: find o with true

  @objectLength: objectKeyCount

  _vivifyObjectPathList = (obj, path, setValue) ->
    for field, i in path when field?
      obj = switch
        when setValue? && i == path.length - 1  then obj[field] = setValue
        when isString field                     then obj[field] ?= {}
        else throw new Error "Expecting string or array or null/undefined"
    obj

  # OUT: obj
  @vivifyObjectPath: vivifyObjectPath = (obj, path...) ->
    throw new Error "obj must be an object" unless isPlainObject obj
    _vivifyObjectPathList obj, path

  # OUT: the last parameter passed in
  @vivifyObjectPathAndSet: (obj, path...) ->
    throw new Error "obj must be an object" unless isPlainObject obj
    [path..., value] = path
    _vivifyObjectPathList obj, path, value
    value


  ###
  NOTE:
    null and undefined keys are NOT SUPPORTED

    They should be converted to strings, first,
    which is what they would become anyway.

  IN: 0 or more args
    out = {}
    list = args

    for element in list
      objects: merge into out
      arrays or args lists: recurse using element as the list
      null or undefined: skip
      else out[element] = next element (or undefined if none)

  OUT: plain object
  ###
  toObjectInternal = (list, out) ->
    key = null
    for element in list
      if key
        out[key] = element
        key = null
      else if isPlainObject element
        mergeInto out, element
      else if isArrayOrArguments element
        toObjectInternal element, out
      else if element?
        key = element
    out[key] = undefined if key

  @toObject: (all...)->
    out = {}
    toObjectInternal all, out
    out

  ###
  IN:
    inputArray: any array
    transformFunction: (element) -> [key, value]
      default: transforms an array of the form: [[key1, value1], [key2, value2], etc...]
  ###
  @arrayToMap: (inputArray, transformFunction = (element) -> element) ->
    outputMap = {}
    for element in inputArray
      [key, value] = transformFunction element
      outputMap[key] = value
    outputMap


  ###
  IN:
    obj: the object to select fields from

    2nd argument can be:
      selectFunction: (value, key) -> true / false

    OR obj can be followed by any number of strings or arrays in any nesting, possibly with null fields
  ###
  @select: (obj, args...) ->
    return {} unless obj
    result = {}
    if isFunction a = args[0]
      if a.length == 1
        result[k] = v for k, v of obj when a v
      else
        result[k] = v for k, v of obj when a k, v
    else
      properties = compactFlatten args
      result[prop] = v for prop in properties when (v = obj[prop])? || obj.hasOwnProperty prop
    result

  # same as select, but ignore hasOwnProperty test
  @selectAll: (obj, properties...) ->
    return {} unless obj
    result = {}
    result[prop] = obj[prop] for prop in compactFlatten properties
    result

  @objectWithDefinedValues:   (obj) -> object obj, when: (v) -> v != undefined
  @objectWithExistingValues:  (obj) -> object obj, when: (v) -> v?
  @objectWithPresentValues:   (obj) -> object obj, when: (v) -> present v

  @objectWith: (obj, k, v) ->
    o = {}
    o[_k] = _v for _k, _v of obj
    o[k] = v
    o

  @objectWithout: (obj, properties...) ->
    return {} unless obj
    properties = properties[0] if properties.length == 1 && !(typeof properties[0] is "string")
    anythingToDo = false
    for prop in properties
      if obj.hasOwnProperty prop
        anythingToDo = true
        break
    if anythingToDo
      result = {}
      result[prop] = v for prop, v of obj when prop not in properties
      result
    else
      obj

  @propertyIsPathed: propertyIsPathed = (key) -> !!key.match /[\s\.\/]/

  @withPropertyPath: withPropertyPath = (obj, propertyPath, action) ->
    propertyPath = propertyPath.match /[^\s\.\/]+/g
    for key, i in propertyPath
      if i == propertyPath.length - 1
        action obj, key
      else
        obj = obj[key]||={}
    obj

  @setPathedProperty: setPathedProperty = (obj, propertyPath, value) ->
    withPropertyPath obj, propertyPath, (o, k) -> o[k] = value
    obj

  @expandPathedProperties: expandPathedProperties = (obj, into = {}, pathExpansionEnabled = true) ->
    for k, v of obj
      if pathExpansionEnabled && propertyIsPathed k
        withPropertyPath into, k, (o, finalKey) ->
          if isPlainObject v
            expandPathedProperties v, o[finalKey] ||= {}, true
          else
            o[finalKey] = v
      else if isPlainObject v
          expandPathedProperties v, into[k] ||= {}, false
      else
        into[k] = v

    into
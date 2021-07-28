MinimalBaseObject = require "../MinimalBaseObject"
Map =               require "../Map"
Inspected =         require "./Inspected"

{escapeJavascriptString} = require '../StringExtensions'
{
  isString, isArray, isFunction, isObject, isPlainObject, isClass, isDate, isRegExp, objectName, isBrowserObject
} = require '../TypesExtended'

isHTMLImageElement = if self.HTMLImageElement
  (obj) -> obj instanceof HTMLImageElement
else
  -> false

parentString = (distance) =>
  switch distance
    when 0 then "parent"
    when 1 then "grandparent"
    when 2 then "great grandparent"
    else "great^#{distance-1} grandparent"

module.exports = class Inspector2 extends MinimalBaseObject

  constructor: (options = {})->
    @withImages = options.withImages
    @maxLength = options.maxLength || 1000
    @allowCustomInspectors = !options.noCustomInspectors
    @maxDepth = if options.maxDepth? then options.maxDepth else 10
    @outArray = []
    @length = 0
    @depth = 0
    @inspectingMap = new Map

  inspectArray: (array) =>
    new Inspected.Array(@inspectInternal(a) for a in array)

  inspectHTMLImageElement: (obj) =>
    res = new Inspected.Object {}, "HTMLImageElement", obj

    unless (res.image = obj).complete
      @addPendingTask()
      obj.onload = => @completePendingTask()
    res

  inspectWithToImage: (obj) =>
    name = objectName obj
    name = obj.classPathName if typeof obj.classPathName == "string"
    name = null if name == "Object"

    res = new Inspected.Object {}, name, obj
    @addPendingTask()
    obj.toImage()
    .then (image) =>
      res.image = image
      @completePendingTask()
    res

  inspectObject: (obj, recurse = true) =>
    attributes = []
    keys = Object.keys obj
    name = objectName obj

    if isFunction(obj) and keys.length == 0
      new Inspected.Core name + "()"
    else

      name = obj.classPathName if typeof obj.classPathName == "string"
      name = null if name == "Object"

      result = {}
      if recurse
        result[k] = @inspectInternal obj[k] for k in keys
      res = new Inspected.Object result, name, obj

      res.inspected = obj.inspect() if isFunction obj.inspect
      res

  addPendingTask: ->
    @pendingTasks++

  completePendingTask: ->
    @pendingTasks--
    @completionCallBack() if @pendingTasks == 0

  inspectByType: (obj) ->
    obj = obj.getInspectedObjects() if isFunction obj?.getInspectedObjects
    if obj == null ||
        obj == undefined ||
        obj == true ||
        obj == false ||
        typeof obj == "number"
      new Inspected.Core obj
    else if obj == self then new Inspected.Core "self"
    else if isRegExp obj            then new Inspected.Core obj.toString()
    else if isString obj            then new Inspected.String obj
    else if isArray obj             then @inspectArray obj
    else if isClass obj             then new Inspected.Core objectName obj
    # else if isFunction obj
    #   if isFunction obj.getNamespacePath
    #     new Inspected.Core obj.getNamespacePath()
    #   else
    #     new Inspected.Core objectName obj
    else if isHTMLImageElement obj  then @inspectHTMLImageElement obj
    else if isDate obj              then new Inspected.Core obj.toString()
    else if isBrowserObject obj     then new Inspected.Core objectName obj
    else if @withImages && typeof obj.toImage == "function" && !isFunction obj then @inspectWithToImage obj
    else if isPlainObject(obj) || isFunction(obj) then @inspectObject obj
    else if isObject obj            then @inspectObject obj, false
    else new Inspected.Core objectName obj

  inspectInternal: (obj) ->
    if objDepth = @inspectingMap.get obj
      new Inspected.Core "<#{parentString @depth - objDepth}>"
    else if @depth >= @maxDepth
      new Inspected.Core "<maxDepth reached: #{@maxDepth}>"
    else
      @depth++
      @inspectingMap.set obj, @depth
      res = @inspectByType obj
      @inspectingMap.delete obj
      @depth--
      res

  inspect: (obj, callBack) ->
    @pendingTasks = 0
    throw new Error "callBack required if withImages requested" if @withImages and typeof callBack != "function"
    @completionCallBack = => callBack && callBack res
    res = @inspectInternal obj
    @completionCallBack() if @pendingTasks == 0
    res

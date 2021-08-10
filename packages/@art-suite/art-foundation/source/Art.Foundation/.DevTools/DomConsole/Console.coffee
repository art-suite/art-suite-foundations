
###
To customize how an object shows up in the DOM console, add
getInspectedObjects member method. For more info, see base_object.coffee
###

require "./style.css" if self.document

Foundation = require 'art-foundation'
Atomic = require 'art-atomic'
ToolBar = require './ToolBar'

{isColorOrColorString, rgbColor, Color, point, point0} = Atomic
{
  BaseObject, inspect, clone, merge, nextTick, timeout, flatten,
  isArray, isString, isFunction
  isNumber
  createWithPostCreate
  colorRegExp
  Promise
  containsPromises
  deepAll
  toInspectedObjects
  isPlainArray
  isPlainObject
  hasProperties
  objectKeyCount
  InspectedObjectLiteral
  deepEach
  deepMap
  inspectLean
  escapeJavascriptString
  findColorRegExp
} = Foundation

{containsImages, resolveImages, isHTMLImageElement, imgToDom} = require './Images'
{Div, Pre, Span, Img, Li, Ul} = Foundation.Browser.DomElementFactories
htmlEscape = (str) -> str

insertBetweenEveryElement = (array, el) ->
  res = []
  first = true
  for v in array
    if first
      first = false
    else
      res.push el
    res.push v
  res

domConsoleId = 'artDomConsole'

packageLogArgs = (args) ->
  if args.length == 1
    args[0]
  else args

module.exports = createWithPostCreate class Console extends BaseObject
  @singletonClass()

  @postCreate: ->
    self.domConsole = @singleton
    super

  constructor: ->
    window.domConsole = @
    @_width = 500
    @initDom()

  reset: -> @domContainer.innerHTML = ""
  hide: -> @domConsoleParent.style.display = "none"
  show: -> @domConsoleParent.style.display = "block"

  increaseWidth: -> @width+=25
  decreaseWidth: -> @width-=25

  @getter
    shown: -> @domContainer.style.display == "block"

  toggleCollapsable = (el) ->
    child.style.display = "block" for child in el.parentElement.children
    el.style.display = "none"

  @setter
    width: (w) ->
      @_width = w
      @domConsoleParent.style.width = "#{w}px"
  @getter "width"

  initDom: ->
    mocha = document.getElementById "mocha"
    bodyChildren = (child for child in document.body.childNodes)
    document.body.appendChild Div null,
      Div
        style:
          display: "flex"
          flexDirection: "row"
          position: "fixed"
          left: "0"
          right: "0"
          top: "0"
          bottom: "0"
        Div
          id: "#{domConsoleId}Area"
          style:
            flex: "1 1 auto"
            overflow: "scroll"
          bodyChildren

        @domConsoleParent = Div
          style:
            overflow: "auto"
            backgroundColor: "white"
            top: "0"
            bottom: "0"
            paddingTop: "25px"
            flex: "0 0 auto"
            width: "#{@_width}px"
            borderLeft: "1px solid #aaa"
          @domContainer = Div
            class: "domConsole"
            style:
              padding: "5px"
            on: click: ({target})=>
              while target
                if target.className.match "collapsable"
                  toggleCollapsable target
                  break;
                target = target.parentElement
      ToolBar()

    # leave space for mocha-stats bar
    if mocha
      maxAttempts = 8
      delay = 125/2
      fixMochaStats = ->
        unless maxAttempts--
          console.log "domConsoleMocha fixMochaStats... giving up; sorry for the ugly screen"
          return
        delay *= 2

        if ms = document.getElementById "mocha-stats"
          ms.style.position = "relative"
        else
          console.log "domConsoleMocha fixMochaStats... (waiting #{delay}ms for #mocha-stats div to appear: #{maxAttempts})"
          timeout delay, fixMochaStats
      timeout delay, fixMochaStats

  appendLog: (domElement)->
    @domContainer.appendChild Div class:"logLine", domElement
    nextTick =>
      @domConsoleParent.scrollTop = @domConsoleParent.scrollHeight

  # always returned the last argument passed in. That way you can:
  #     bar = foo # log foo's value in the middle of an expression, along with other values, without altering the rest of the expression
  #     bar = @log 1, 2, 3, foo
  log: (args...) ->
    @logCore packageLogArgs(args)
    args[args.length-1]

  logF: (options) ->
    @logCore options.log, null, null, options
    options.log

  format: (domEl, options) ->
    {label, labelColor, backgroundColor} = options
    # domEl = wrapDomElement domEl, "<#{options.tag}/>" if options && options.tag
    if label
      domEl = Div
        style: backgroundColor: backgroundColor
        Div label, style: color: labelColor, fontWeight: "bold"
        Div
          style: paddingLeft: "10px"
          domEl
    domEl

  arrayKidsToDomArray: (arrayOfInspectedObjects, Factory, options, addCommasAndBrackets) ->
    options.maxDepth--
    kids = for child, i in arrayOfInspectedObjects
      break if i > 50
      if i == 50
        Factory class:"value", "array length: #{arrayOfInspectedObjects.length} (showing the first #{i})"
      else
        Factory class:"value", @toDom child, options
    options.maxDepth++
    if addCommasAndBrackets
      kids = @addCommasAndBrackets kids, "[", "]"
    kids

  arrayToDomBasic: (arrayOfInspectedObjects, options) ->
    if options.maxDepth == 0
      return Span class:"array maxdepth #{options.class}", if arrayOfInspectedObjects.length == 0
        "[]"
      else if arrayOfInspectedObjects.length <= 5 && (l = inspectLean arrayOfInspectedObjects).length <= 30
        "[#{l}]"
      else
        "[... #{arrayOfInspectedObjects.length}]"

    Span
      class: "array #{options.class}"
      @arrayKidsToDomArray arrayOfInspectedObjects, Span, options, true


  arrayToDom: (arrayOfInspectedObjects, options) ->
    if options.treeView
      @arrayToDomTreeView arrayOfInspectedObjects, options
    else
      @arrayToDomBasic arrayOfInspectedObjects, options

  addCommasAndBrackets: (kids, leftBracket, rightBracket, typeName) ->
    for kid, i in kids when i + 1 < kids.length
      kid.appendChild Span ", "
    flatten leftBracket, typeName, kids, rightBracket

  mapKidsToDomArray: (inspectedObject, Factory, options, addCommasAndBrackets) ->
    options.maxDepth--
    kids = for k, v of inspectedObject
      Factory null,
        Span class:"key", k + ": "
        Span class:"value", @toDom v, options

    options.maxDepth++
    if addCommasAndBrackets
      @addCommasAndBrackets kids, "{", "}"
    else
      kids

  objectToDomBasic: (inspectedObject, options) ->
    if options.maxDepth == 0
      length = objectKeyCount inspectedObject
      inside = if length == 0 then ""
      else if length <= 5
        if (l = inspectLean inspectedObject).length <= 40
          l
        else
          Object.keys(inspectedObject).join ' '
      else "#{length}"
      return Span class:"object maxdepth #{options.class}", "{#{inside}}"

    Span
      class:"object"
      @mapKidsToDomArray inspectedObject, Span, options, true

  treeViewCollapsable: (collapsablePair, options) ->
    collapsablePair[if options.collapsed then 0 else 1].style.display = "none"
    collapsablePair

  # instanceOfDomElement: (inspectedObject, inside) ->
  #   Span class:"object maxdepth", "<#{inspectedObject.instanceOf}#{inside || ""}>"

  arrayToDomTreeView: (arrayOfInspectedObjects, options) ->

    if arrayOfInspectedObjects.length == 0
      return Span class:"array", "[]"

    @treeViewCollapsable [
      Ul class:"array collapsable open",   @arrayKidsToDomArray arrayOfInspectedObjects, Li, options
      Ul class:"array collapsable closed", @arrayToDomBasic arrayOfInspectedObjects, merge options, maxDepth:1, treeView:false
    ], options

  objectToDomTreeView: (inspectedObject, options) ->
    unless hasProperties inspectedObject
      # return if inspectedObject.instanceOf
      #   @instanceOfDomElement inspectedObject
      # else
      return Span class: "object", "{}"

    @treeViewCollapsable [
      Ul class:"object collapsable open",   @mapKidsToDomArray inspectedObject, Li, options
      Ul class:"object collapsable closed", @objectToDomBasic inspectedObject, merge options, maxDepth:1, treeView:false
    ], options

  objectToDom: (inspectedObject, options) ->
    if options.treeView
      @objectToDomTreeView inspectedObject, options
    else
      @objectToDomBasic inspectedObject, options

  # if there are new-lines in the literal, show with PRE instead of SPAN
  literalToDomHelper = (classes, literalString) ->
    Factory = if literalString.match /\s\s+|\n/
      Pre
    else
      Span
    Factory class: classes, literalString

  literalToDom: (inspectedObject) ->

    literalToDomHelper "literal", if isString inspectedObject
        escapeJavascriptString inspectedObject
      else
        "#{inspectedObject}"

  errorLiteralToDom: (inspectedObject) ->
    literalToDomHelper "errorLiteral", inspectedObject.toString()

  warningLiteralToDom: (inspectedObject) ->
    literalToDomHelper "warningLiteral", inspectedObject.toString()

  # literalWithInspectedToDom: (inspectedObject) ->
  #   literalToDomHelper "inspected literal", inspectedObject.inspected

  colorToDom: (clr) ->
    displayString = if isString clrString = clr
      [c] = clr.match findColorRegExp
      clr = rgbColor c
      clrString
    else
      clr.inspect?() ? clr.toString()

    Span
      class: "inspected"
      style:
        backgroundColor:  clr
        padding:          "0 5px"
        color:            if clr.perceptualLightness < .8 && clr.a > .25 then 'white' else 'black'
      "#{displayString}"

  toDom: (inspectedObject, options={}) ->
    unless inspectedObject? then @literalToDom inspectedObject
    else if inspectedObject instanceof InspectedObjectLiteral
      if isColorOrColorString inspectedObject.literal then @colorToDom inspectedObject.literal
      else if inspectedObject.isError
        console.error inspectedObject.literal
        @errorLiteralToDom inspectedObject.literal
      else if inspectedObject.isWarning
        console.warn inspectedObject.literal
        @warningLiteralToDom inspectedObject.literal
      else
        literalToDomHelper "literal", inspectedObject.literal
    else if isHTMLImageElement inspectedObject then imgToDom inspectedObject
    else if isColorOrColorString inspectedObject then @colorToDom inspectedObject
    else if isPlainArray  inspectedObject then @arrayToDom inspectedObject, options
    else if isPlainObject inspectedObject then @objectToDom inspectedObject, options
    else
      @literalToDom inspectedObject

      # else
      #   @literalWithInspectedToDom inspectedObject

  logSerializer = new Promise.Serializer
  logCount = 1
  noOptions = {}
  logCore: (m, callStack, options = noOptions) ->
    formatSystemMessage = (params) ->
      {success, failure, pending, warning} = params

      backgroundColor: switch
        when failure then "#fee"
        when warning then "#ffe"

      labelColor: switch
        when success then "green"
        when failure then "#a00"
        when pending then "blue"
        when warning then "#aa0"

      label: "#{success || failure || pending || warning}: (log ##{localLogCount})"

    localLogCount = logCount
    if hasPromises = containsPromises m
      options = merge options, formatSystemMessage pending: "RESOLVING PROMISES"

    if options.isError
      options = merge options, formatSystemMessage failure: "ERROR"

    if options.isWarning
      options = merge options, formatSystemMessage warning: "WARNING"

    ret = logSerializer.then =>

      options.treeView = true
      {maxDepth} = options
      maxDepth = 20 unless isNumber maxDepth

      if typeof m is "string" && !colorRegExp.test m
        @appendLog @format Pre(m), options
      else
        Promise.then =>
          if containsImages inspected = toInspectedObjects m
            resolveImages inspected
          else inspected
        .then (inspected) =>
          domEl = @toDom inspected, options
          @appendLog @format domEl, options

    logSerializer.catch (e) ->
      console.error "Error in DomConsole.Console", e

    if hasPromises
      deepAll m, (promiseResult) -> 'promise.then': promiseResult
      .then (resolvedM) =>
        @logCore resolvedM, callStack, merge options, formatSystemMessage success: "ALL PROMISES RESOLVED"
      .catch (rejected) =>
        @logCore rejected, callStack, merge options, formatSystemMessage failure: "ONE OR MORE PROMISES WERE REJECTED"
    logCount++
    ret

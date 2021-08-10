StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'

{cloneByStructure, removeFirstMatch, eq, inspect, rubyTrue}  = StandardLib
{BaseObject} = ClassSystem

module.exports = class SingleObjectTransaction extends BaseObject

  # "a" can be an Array in this format:
  #   [object, options]
  # OR just
  #   object
  # options can can be (all optional):
  #   properties: [] # list of property names
  #   from: {} # map from property names to initial values
  #   to: {} # map from property names to final values
  constructor: (a) ->
    super
    @object = if a.constructor == Array
      throw new Error "new SingleObjectTransaction: expected length-2 array like: [obj, optionsMap]" unless a.length == 2
      @options = a[1]
      a[0]
    else
      @options = {}
      a
    throw new Error "object must not be null or undefined" unless @object?
    @props = []
    @from = {}

    options = @options
    @addProperties options.properties if options.properties
    @addProp options.property if options.property
    @addFromValues options.from if options.from
    @addToValues options.to if options.to

  toString: ->
    "#{inspect @object, 0} from:#{inspect @from,1} to:#{inspect @to,1}"

  inspect: (inspector)->
    return ClassSystem.Inspect.inspect @ unless inspector
    inspector.put "#{@object.classPathName}:"
    for k in @props
      inspector.put "\n    #{k}: "
      inspector.inspect @from[k], 1 if rubyTrue @from && @from[k]
      inspector.put " ... "
      inspector.inspect @to[k], 1 if rubyTrue @to && @to[k]

  @getter
    properties: -> @props
    hasToValues: -> !!@to
    valuesChanged: ->
      for k,fromValue of @from
        toValue = @to[k]
        return true unless eq fromValue, toValue
      false

  addFromValues: (from) ->
    for k,v of from
      @addProp k
      @from[k] = v
    @object.preprocessProperties? @from

  addToValues: (to) ->
    @to ||= {}
    for k,v of to
      @addProp k
      @to[k] = v
    @object.preprocessProperties? @to

  addProperties: (props) ->
    if props.constructor == Array then @addProp prop for prop in props
    else                               @addProp prop for prop, v of props

  addProp: (propName) -> @props.push propName unless propName in @props
  deleteProp: (propName) ->
    removeFirstMatch @props, propName
    delete @from[propName]
    delete @to[propName]

  saveValues: (saveTo) ->
    @clearOptimizations()
    metaProperties = @object.metaProperties
    for prop in @props when !saveTo.hasOwnProperty prop
      value = saveTo[prop] = cloneByStructure if getterName = metaProperties?[prop]?.getterName
        @object[getterName]()
      else
        @object[prop]

    null

  saveFromValues: -> @saveValues @from ||= {}
  saveToValues:   -> @saveValues @to ||= {}

  @_setValues = setValues = (o, values, f) ->
    metaProperties = o.metaProperties
    for prop, v of values
      v = f prop, v if f
      if setterName = metaProperties?[prop]?.setterName
        o[setterName] v
      else
        o[prop] = v
    null

  rollBack:    -> setValues @object, @from
  rollForward: -> setValues @object, @to

  clearOptimizations: ->
    @numberDeltas = @interpolateToObjects = null

  optimizeInterpolation: ->
    @numberDeltas = {}
    @interpolateToObjects = {}
    @nonInterpolatingFields = to: {}, from: {}
    for field, from of @from
      to = @to[field]
      if typeof from is "number"
        @numberDeltas[field] = to - from
      else if typeof from?.interpolate is "function"
        @interpolateToObjects[field] = to
      else
        @nonInterpolatingFields.from[field] = from
        @nonInterpolatingFields.to[field] = to

  interpolateNumberFields: (p)->
    setValues @object, @numberDeltas, (field, delta) => @from[field] + delta * p

  interpolateObjectFields: (p) ->
    try
      setValues @object, @interpolateToObjects, (field, toObject) => @from[field].interpolate toObject, p
    catch e
      @log "Art.Foundation.Transaction#interpolateObjectFields(p=#{p}): error #{e}
        deltas: #{inspect @interpolateToObjects}
        from:   #{inspect @from}
        to:     #{inspect @to}"
      throw e

  # TODO: test this
  setNonInterpolatingFields: (p) ->
    setValues @object, @nonInterpolatingFields[if p >= 1 then "to" else "from"]

  interpolate: (p)->
    @optimizeInterpolation() unless @numberDeltas

    @interpolateNumberFields p
    @interpolateObjectFields p
    @setNonInterpolatingFields p

  @getter noChanges: -> @props.length == 0

  optimizeProperties: ->
    @clearOptimizations()
    for prop in @props
      if !@from.hasOwnProperty(prop) || !@to.hasOwnProperty(prop) || eq(@from[prop], @to[prop])
        @deleteProp prop

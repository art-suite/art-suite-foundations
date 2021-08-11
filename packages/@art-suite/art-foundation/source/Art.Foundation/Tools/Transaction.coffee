###
Transaction provides a manual, yet easy way to log the before and after values
of fields over many objects.

It is "manual" in that you must:

  Pre-specify all objects you wish to track.
  Specify the properties you wish to track for all objects and/or uniquely for each object.
  Pass in the "from" values or call saveFromValues
  Pass in the "to" values or call saveToValues

Once you have capture the "from" and "to" values of the transaction, you can:

  rollBack and set all properties to their "from" values
  rollForward and set all properties to their "to" values
  interpolate(p) and set all properties to their linearly interpolated value
    between their saved "from" (p=0) and "to" (p=1) values.
    If you use interpolate:
      to/from values should be pair-wise the same type
      only to/from values of the following types will be interpolated:
        numbers
        objects implementing: a.add(b), a.sub(b) and a.mul(number)
      Non-interpolatable types are handled as follows:
        switch p
          when 0 then set to "from" values
          when 1 then set to "to" values
          else left unchanged

Example initializers:

  # example-a: track obj's "foo" and "bar" properties
  new Transaction obj, properties: ["foo", "bar"]

  # same as example-a, but also initialize obj's from-values as obj.foo=1 and obj.bar=2
  new Transaction obj, from: foo:1, bar:2

  # same as example-a, but also initialize obj's to-values as obj.foo=1 and obj.bar=2
  new Transaction obj, to: foo:1, bar:2

  # track obj1 and obj2's "foo" and "bar" properties
  new Transaction [obj1, obj2], properties: ["foo", "bar"]

  # track:
  #   obj1's foo, bar, noo and mar properties, with both from and to values initialized
  #   obj2's goo, har, noo and mar properties, with both from and to values initialized
  new Transaction [
      [obj1,
        from: foo:1, bar:2
        to:   foo:2, bar:3
      ],
      [obj2,
        from: goo:1, har:2
        to:   goo:2, har:3
      ]
    ],
    from: noo:4, mar:5
    to:   noo:4, mar:5
###

{
  rubyTrue, eq, inspect, Map, cloneByStructure, mapToKeysArray, mapToValuesArray
} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'
SingleObjectTransaction = require './SingleObjectTransaction'

module.exports = class Transaction extends BaseClass
  @SingleObjectTransaction: SingleObjectTransaction

  # "objects" can be:
  #   1) object
  #   2) [object1, object2, ...]
  #   3) [[object1, objectOneOptions], [object2, objectTwoOptions], ... ]
  #   4) [[object1, objectOneOptions], object2, ... ] # or a mix of 3 and 4
  # for objectOneOptions options see SingleObjectTransaction#constructor
  #
  # "options" can be any options allowed for SingleObjectTransaction#constructor
  #   Each SingleObjectTransaction option is applied to every object in "objects"
  constructor: (objects, options={}) ->
    super
    @_objects = new Map
    if objects.constructor == Array then @addObjects objects
    else                                 @addObject objects

    @addProperties options.properties if options.properties
    @addProperties [options.property] if options.property
    @addFromValues options.from if options.from
    @addToValues options.to if options.to
    @saveFromValues()

  inspect: (inspector)->
    return ClassSystem.Inspect.inspect @ unless inspector
    inspector.put "#{@classPathName}:"
    @inspectParts inspector

  inspectParts: (inspector)->
    @_objects.each (k,v) =>
      inspector.put "\n  "
      inspector.inspect v

  ###########################################
  # PUBLIC API
  ###########################################

  # return array of objects in the transaction
  @getter objects: -> mapToKeysArray @_objects

  # return the properties, from or two values for a specific object
  properties: (obj) -> @_objects.get(obj).properties
  from:       (obj) -> @_objects.get(obj).from
  to:         (obj) -> @_objects.get(obj).to

  # set all values using "from" values
  rollBack:         -> @_objects.forEach (oi) => oi.rollBack()

  # set all values using "to" values
  rollForward:      -> @_objects.forEach (oi) => oi.rollForward()

  # set all values according to this formula: (to - from) * p + from
  interpolate: (p)  -> @_objects.forEach (oi) => oi.interpolate p

  # remove any non-changing properties and non-changing objects
  optimize: ->
    @optimizeProperties()
    @optimizeObjects()

  # returns true if at least one object has to-values set
  @getter
    hasToValues: ->
      result = false
      @_objects.forEach (oi) => result = true if oi.hasToValues
      result

    valuesChanged: ->
      result = false
      @_objects.forEach (object) =>
        result = true if object.valuesChanged
      result

  toString: ->
    "#{@className}\n  " + (@_objects.map (obj, single) -> single.toString()).join "  \n"

  ###########################################
  # PRIVATE API
  ###########################################

  addFromValues: (from)       -> @_objects.forEach (oi) => oi.addFromValues from
  addToValues:   (to)         -> @_objects.forEach (oi) => oi.addToValues to
  addProperties: (properties) -> @_objects.forEach (oi) => oi.addProperties properties

  addObject: (obj) ->
    oi = new SingleObjectTransaction obj
    @_objects.set oi.object, oi

  addObjects: (objects) -> @addObject obj for obj in objects

  saveFromValues:       -> @_objects.forEach (oi) => oi.saveFromValues()
  saveToValues:         -> @_objects.forEach (oi) => oi.saveToValues()

  # call this after saving To and From values to eliminate any non-changing properties
  optimizeProperties:   -> @_objects.forEach (oi) => oi.optimizeProperties()

  # removes any objects with no property changes
  optimizeObjects: ->
    objs = @_objects
    @_objects = new Map
    objs.forEach (oi) =>
      @_objects.set oi.object, oi unless oi.noChanges

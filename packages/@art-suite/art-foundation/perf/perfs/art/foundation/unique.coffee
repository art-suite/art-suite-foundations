{Foundation} = Neptune.Art
{inspect, log, time, eq, plainObjectsDeepEq, shallowEq, Unique, BaseObject} = Foundation

suite "Art.Foundation.Unique", ->
  @timeout 100000
  suite "Object", ->
    benchmark "Unique.id new object", -> Unique.id {}
    existingObject = {}
    benchmark "Unique.id existing object", -> Unique.id existingObject

  suite "BaseObject", ->
    existingBaseObject = new BaseObject
    benchmark "baseObject.getUniqueId()", -> existingBaseObject.getUniqueId()
    benchmark "Unique.id baseObject", -> Unique.id existingBaseObject

  suite "Simple Values", ->
    benchmark "Unique.id null", -> Unique.id null
    benchmark "Unique.id undefined", -> Unique.id undefined
    benchmark "Unique.id true", -> Unique.id true
    benchmark "Unique.id 0",    -> Unique.id 0
    benchmark "Unique.id 123",  -> Unique.id 123
    benchmark "Unique.id 'hi'", -> Unique.id 'hi'
    myFunc = ->
    benchmark "Unique.id function()", -> Unique.id myFunc



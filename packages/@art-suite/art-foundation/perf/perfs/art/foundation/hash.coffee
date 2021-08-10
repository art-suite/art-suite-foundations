{Foundation} = Neptune.Art
{inspect, log, time, eq, plainObjectsDeepEq, shallowEq, floatEq, objectKeyCount} = Foundation

myFunction = ->
myNumber = 1
myString = "hi"
smallObject = a:1, b:2
emptyObject = {}
largeObject = {}
for i in [1..100]
  largeObject[i] = i*123

suite "Art.Foundation.Hash", ->
  @timeout 100000

  benchmark "Object.keys(emptyObject).length", ->
    Object.keys(emptyObject).length

  benchmark "objectKeyCount emptyObject", ->
    objectKeyCount emptyObject

  benchmark "Object.keys(smallObject).length", ->
    Object.keys(smallObject).length

  benchmark "objectKeyCount smallObject", ->
    objectKeyCount smallObject


  benchmark "Object.keys(largeObject).length", ->
    Object.keys(largeObject).length

  benchmark "objectKeyCount largeObject", ->
    objectKeyCount largeObject

{Foundation} = Neptune.Art
{inspect, log, time, eq, plainObjectsDeepEq, shallowEq, floatEq} = Foundation

point = (x, y) ->
  p = x:x, y:y
  p.eq = (b) -> floatEq(x, b.x) && floatEq(y, b.y)

complexStructure =
  a: [1, [2, 3], [], {}, null]
  b: undefined
  c: "hi"
  d: 1.23
  e: null
  f: false
  g: true
  h: point 123, 456
  i: {}
  j: foo:1, bar:2

differentComplexStructure =
  a: [1, [2, 3], [], {}, 0]
  b: undefined
  c: "hi"
  d: 1.23
  e: null
  f: false
  g: true
  h: point 123, 456
  i: {}
  j: foo:1, bar:2

sameComplexStructure =
  a: [1, [2, 3], [], {}, null]
  b: undefined
  c: "hi"
  d: 1.23
  e: null
  f: false
  g: true
  h: point 123, 456
  i: {}
  j: foo:1, bar:2

testObject =
  a: 1
  b: 2
  c: 3
  e: 4
  f: 5

sameTestObject =
  a: 1
  b: 2
  c: 3
  e: 4
  f: 5

suite "Art.Foundation.Eq", ->
  @timeout 100000

  benchmark "eq 123, 123", ->
    eq 123, 123

  benchmark "shallowEq complexStructure, sameComplexStructure", ->
    shallowEq complexStructure, sameComplexStructure

  benchmark "plainObjectsDeepEq complexStructure, sameComplexStructure", ->
    plainObjectsDeepEq complexStructure, sameComplexStructure

  benchmark "eq complexStructure, sameComplexStructure", ->
    eq complexStructure, sameComplexStructure

  benchmark "plainObjectsDeepEq testObject, sameTestObject", ->
    plainObjectsDeepEq testObject, sameTestObject

  benchmark "eq testObject, sameTestObject", ->
    eq testObject, sameTestObject

  benchmark "plainObjectsDeepEq complexStructure, differentComplexStructure", ->
    plainObjectsDeepEq complexStructure, differentComplexStructure

  benchmark "eq complexStructure, differentComplexStructure", ->
    eq complexStructure, differentComplexStructure

  benchmark "shallowEq complexStructure, complexStructure", ->
    shallowEq complexStructure, complexStructure

  benchmark "plainObjectsDeepEq complexStructure, complexStructure", ->
    plainObjectsDeepEq complexStructure, complexStructure

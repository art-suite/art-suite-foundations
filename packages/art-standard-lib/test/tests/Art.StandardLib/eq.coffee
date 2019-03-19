
{StandardLib} = Neptune.Art
{neq, clone, eq, shallowEq, inspect, plainObjectsDeepEq, plainObjectsDeepDiff, compare,
  float64Precision,  floatTrue0
  formattedInspect
} = StandardLib
# 'lib/art/atomic'
# {point} = Atomic

complexStructure =
  a: [1, [2, 3], [], {}, null]
  b: undefined
  c: "hi"
  d: 1.23
  e: null
  f: false
  g: true
  # h: point 123, 456
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
  # h: point 123, 456
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
  # h: point 123, 456
  i: {}
  j: foo:1, bar:2

module.exports = suite:
  eqAndNeq: ->
    assertEq = (truth, a, b) ->
      assert.equal !!truth, eq a, b
      assert.equal !truth, neq a, b

    testEq = (a, b) ->
      test "eq #{formattedInspect a}, #{formattedInspect a}", ->
        assertEq true,  a, b

    testNeq = (a, b) ->
      test "neq #{formattedInspect a}, #{formattedInspect a}", ->
        assertEq false,  a, b

    testEq 1, 1
    testNeq 1, 2
    testEq {a:1}, {a:1}
    testEq [1], [1]
    testEq null, null
    testEq undefined, undefined
    testNeq undefined, null
    testNeq null, undefined
    testNeq 0, null
    testNeq null, 0
    testNeq undefined, 0
    testNeq 0, undefined
    testEq "hi", "hi"
    testNeq "hi", "bi"

    a = -> 1
    b = -> 1
    testEq a, a
    testNeq a, b

    testEq  [1, 2, 3], [1, 2, 3]
    testNeq [1, 2, 3, 4], [1, 2, 3]
    testNeq [1, 2, 3], [1, 2, 3, 4]
    testNeq [1, 2, 3], [1, 3, 3]

    testEq  {a:1, b:2}, {a:1, b:2}
    testNeq {a:1, b:2}, {a:1, b:2, c:3}
    testNeq {a:1, b:2, c:3}, {a:1, b:2}
    testNeq {a:1, b:3}, {a:1, b:2}
    testEq  {a:1, b:2}, {b:2, a:1}

    test "!eq instances of different classes", ->
      class AClass
      class BClass

      a = new AClass
      b = new BClass

      assertEq false, a, b

    test "!eq two otherwise identical instances of same class", ->
      class AClass

      a = new AClass
      b = new AClass

      assertEq false, a, b

    test "two otherwise identical instances of same class with custom eq", ->
      class AClass
        eq: (b)-> b.constructor == AClass

      a = new AClass
      b = new AClass

      assertEq true, a, b
      assertEq false, a, 123

    test "objects with undefined values tricky case", ->
      a = foo: undefined
      b = bar: 123
      assertEq false, a, b

    test "recursive", ->
      a = {}
      a.x = a
      assertEq true, a, a

    test "neq recursive", ->
      a = {}
      b = {}
      a.x = a
      a.y = b

      b.y = a
      b.z = b
      assertEq false, a, b

  compare: ->
    test "numbers", ->
      assert.equal 0, compare 1, 1
      assert.ok 0 > compare 1, 2
      assert.ok 0 < compare 2, 1

    test "strings", ->
      assert.equal 0, compare "abc", "abc"
      assert.ok 0 > compare "abc", "abd"
      assert.ok 0 < compare "abd", "abc"
      assert.ok 0 > compare "abc", "abcd"
      assert.ok 0 < compare "abcd", "abc"

    test "arrays", ->
      _ = []
      _1 = [1]
      _123 = [1,2,3]
      _1234 = [1,2,3,4]
      _124 = [1,2,4]
      assert.equal 0, compare [1,2,3], [1,2,3]
      assert.ok 0 > compare _123, _124
      assert.ok 0 < compare _124, _123
      assert.ok 0 > compare _123, _1234
      assert.ok 0 < compare _1234, _123
      assert.ok 0 > compare _, _1
      assert.ok 0 == compare _, []

    test "objects", ->
      _123 = {a:1,b:2,c:3}
      _1234 = {a:1,b:2,c:3,d:4}
      _124 = {a:1,b:2,c:4}
      assert.equal 0, compare [1,2,3], [1,2,3]
      assert.ok 0 > compare _123, _124
      assert.ok 0 < compare _124, _123
      assert.ok isNaN compare _123, _1234
      assert.ok isNaN compare _1234, _123

    test "different types", ->
      assert.ok isNaN compare 0, "0"
      assert.ok isNaN compare 0, null
      assert.ok isNaN compare 0, undefined
      assert.ok isNaN compare undefined, null
      assert.ok isNaN compare 0, {}
      assert.ok isNaN compare 0, []
      assert.ok isNaN compare {}, []

    # test "points", ->
    #   p12 = point 1, 2
    #   p13 = point 1, 3
    #   p23 = point 2, 3
    #   p21 = point 2, 1
    #   assert.ok isNaN compare p12, p21
    #   assert.ok 0 == compare p12, point 1, 2
    #   assert.ok 0 > compare p12, p13
    #   assert.ok 0 < compare p13, p12
    #   assert.ok 0 > compare p12, p23
    #   assert.ok 0 < compare p23, p12

  plainObjectsDeepEq: ->
    test "plainObjectsDeepEq objects with undefined values tricky case", ->
      a = foo: undefined
      b = bar: 123
      assert.equal false, plainObjectsDeepEq a, b

    test "plainObjectsDeepEq matching false values", ->
      assert.equal true, plainObjectsDeepEq null, null
      assert.equal true, plainObjectsDeepEq undefined, undefined
      assert.equal true, plainObjectsDeepEq false, false
      assert.equal true, plainObjectsDeepEq 0, 0

    test "plainObjectsDeepEq non false values", ->
      assert.equal false, plainObjectsDeepEq null, undefined
      assert.equal false, plainObjectsDeepEq undefined, false
      assert.equal false, plainObjectsDeepEq false, 0
      assert.equal false, plainObjectsDeepEq 0, null

    test "plainObjectsDeepEq numbers", ->
      assert.equal true, plainObjectsDeepEq 1, 1
      assert.equal false, plainObjectsDeepEq 1, 2
      assert.equal false, plainObjectsDeepEq 1, "1"

    test "plainObjectsDeepEq strings", ->
      assert.equal false, plainObjectsDeepEq "1", "01"
      assert.equal true, plainObjectsDeepEq "hi", "hi"

    # test "plainObjectsDeepEq object with eq", ->
    #   assert.equal true, plainObjectsDeepEq point(1, 2), point(1, 2)
    #   assert.equal false, plainObjectsDeepEq point(1, 2), point(1, 3)

    test "plainObjectsDeepEq object without eq", ->
      class Thing
        constructor: (@a, @b) ->

      thing = (a, b) -> new Thing a, b

      aThing = thing 1, 2
      assert.equal true,  plainObjectsDeepEq aThing, aThing
      assert.equal false, plainObjectsDeepEq thing(1, 2), thing(1, 2)
      assert.equal false, plainObjectsDeepEq thing(1, 2), thing(1, 3)

    test "plainObjectsDeepEq plain object vs MyObject", ->
      class MyObject
      instance = new MyObject
      assert.equal false,  plainObjectsDeepEq {}, instance
      assert.equal false,  plainObjectsDeepEq instance, {}
      assert.equal true,   plainObjectsDeepEq instance, instance
      assert.equal true,   plainObjectsDeepEq {}, {}

    test "plainObjectsDeepEq simple arrays", ->
      assert.equal true, plainObjectsDeepEq [1,2,3], [1,2,3]
      assert.equal false, plainObjectsDeepEq [1,2,3,4], [1,2,3]
      assert.equal false, plainObjectsDeepEq [1,2,3], [1,2,3,4]
      assert.equal false, plainObjectsDeepEq [1,2,3], [1,3,2]

    test "plainObjectsDeepEq simple objects equal", ->
      assert.eq true, plainObjectsDeepEq {a:1, b:2}, {a:1, b:2}
      assert.eq true, plainObjectsDeepEq {a:1, b:2}, {b:2, a:1}

    test "plainObjectsDeepEq simple objects not equal", ->
      assert.eq false, plainObjectsDeepEq {a:1, b:2, c:3}, {a:1, b:2}
      assert.eq false, plainObjectsDeepEq {a:1, b:2}, {a:1, b:2, c:3}
      assert.eq false, plainObjectsDeepEq {a:1, b:2}, {a:1, c:2}
      assert.eq false, plainObjectsDeepEq {a:1, b:2}, {a:1, b:3}

    test "plainObjectsDeepEq complexStructure", ->
      assert.eq true, plainObjectsDeepEq complexStructure, sameComplexStructure
      assert.eq false, plainObjectsDeepEq complexStructure, differentComplexStructure

    test "eq uses floatTrue0 for comparing numbers", ->
      assert.notEqual 0, float64Precision / 2
      assert.equal 0, floatTrue0 float64Precision / 2
      assert.eq 0, float64Precision / 2


  plainObjectsDeepDiff: ->

    test "plainObjectsDeepDiff 1, 1", ->
      assert.eq plainObjectsDeepDiff(1, 1), null

    test "plainObjectsDeepDiff 1, 2", ->
      assert.eq plainObjectsDeepDiff(1, 2), before: 1, after: 2

    # test "plainObjectsDeepDiff point(1), point(1)", ->
    #   assert.eq plainObjectsDeepDiff(point(1), point(1)), null

    # test "plainObjectsDeepDiff point(1), point(2)", ->
    #   assert.eq plainObjectsDeepDiff(point(1), point(2)), before: point(1), after: point 2

    test "plainObjectsDeepDiff {}, {}", -> assert.eq plainObjectsDeepDiff({}, {}), null
    test "plainObjectsDeepDiff [], []", -> assert.eq plainObjectsDeepDiff([], []), null
    test "plainObjectsDeepDiff [], {}", -> assert.eq plainObjectsDeepDiff([], {}), before: [], after: {}

    test "plainObjectsDeepDiff {a:1}, {a:1}", -> assert.eq plainObjectsDeepDiff({a:1}, {a:1}), null
    test "plainObjectsDeepDiff {a:1}, {a:2}", -> assert.eq plainObjectsDeepDiff({a:1}, {a:2}), a: before: 1, after: 2
    test "plainObjectsDeepDiff {}, {a:1}", -> assert.eq plainObjectsDeepDiff({}, {a:1}), a: added: 1
    test "plainObjectsDeepDiff {a:1}, {}", -> assert.eq plainObjectsDeepDiff({a:1}, {}), a: removed: 1
    test "plainObjectsDeepDiff {a:1}, {b:1}", -> assert.eq plainObjectsDeepDiff({a:1}, {b:1}), a: {removed: 1}, b: added:1

    test "plainObjectsDeepDiff [1, 2], [1, 2]", -> assert.eq plainObjectsDeepDiff([1, 2], [1, 2]), null
    test "plainObjectsDeepDiff [1, 2], [1, 3]", -> assert.eq plainObjectsDeepDiff([1, 2], [1, 3]), 1: before: 2, after: 3
    test "plainObjectsDeepDiff [1, 2], [1]", -> assert.eq plainObjectsDeepDiff([1, 2], [1]), 1: removed: 2
    test "plainObjectsDeepDiff [1], [1, 2]", -> assert.eq plainObjectsDeepDiff([1], [1, 2]), 1: added: 2
    test "plainObjectsDeepDiff [1, 2], [2, 1]", -> assert.eq plainObjectsDeepDiff([1, 2], [2, 1]), 0: {before: 1, after: 2}, 1: before: 2, after: 1

  # neq: ->
  #   test "neq same objects", ->
  #     assert.false neq {a:1}, {a:1}

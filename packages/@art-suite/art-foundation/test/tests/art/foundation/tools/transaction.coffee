
{Foundation} = Neptune.Art
  # 'lib/art/atomic'
  # point = Atomic.point
clone = Foundation.Clone.clone
eq = Foundation.Eq.eq
inspect = Foundation.Inspect.inspect
{nextTick} = Foundation
Transaction = Foundation.Transaction

suite "Art.Foundation.Tools.Transaction", ->
  test "new Transaction", ()->
    ot = new Transaction a={}
    assert.eq ot.objects, [a]
    assert.eq ot.properties(a), []

  test "new Transaction with properties", ()->
    ot = new Transaction a={}, properties: ["foo"]
    assert.eq ot.objects, [a]
    assert.eq ot.properties(a), ["foo"]

  test "new Transaction with per-object properties", ()->
    ot = new Transaction [
      [a={}, properties:["foo", "baz"]]
      [b={}, property:"bar"]
    ]
    assert.eq ot.objects, [a, b]
    assert.eq ot.properties(a), ["foo", "baz"]
    assert.eq ot.properties(b), ["bar"]

  test "new Transaction with per-object and shared properties", ()->
    ot = new Transaction [
      [a={}, properties:["foo"]]
      [b={}, properties:["bar"]]
    ], properties: ["baz"]
    assert.eq ot.objects, [a, b]
    assert.eq ot.properties(a), ["foo", "baz"]
    assert.eq ot.properties(b), ["bar", "baz"]

  test "new Transaction with 'from' pre-set", ()->
    ot = new Transaction [
      [a={}, from: foo:1]
      [b={}, from: bar:2]
    ], from: baz:3
    assert.eq ot.objects, [a, b]
    assert.eq ot.from(a), foo:1, baz:3
    assert.eq ot.from(b), bar:2, baz:3

  test "new Transaction with 'to' pre-set", ()->
    ot = new Transaction [
      [a={}, to: foo:1]
      [b={}, to: bar:2]
    ], to: baz:3
    assert.eq ot.objects, [a, b]
    assert.eq ot.to(a), foo:1, baz:3
    assert.eq ot.to(b), bar:2, baz:3

  test "saveFromValues basic", ()->
    ot = new Transaction [
      a = foo: 1
      b = foo: 2
    ], properties: ["foo"]
    assert.eq ot.objects, [a, b]
    assert.eq ot.properties(a), ["foo"]
    assert.eq ot.properties(b), ["foo"]
    assert.eq ot.from(a), foo: 1
    assert.eq ot.from(b), foo: 2

  test "saveToValues", ()->
    ot = new Transaction [
      a = {}
      b = {}
    ], properties: ["foo"]
    a.foo = 123
    b.foo = 234
    ot.saveToValues()
    assert.eq ot.to(a), foo: 123
    assert.eq ot.to(b), foo: 234

  test "rollback / rollForward", ()->
    ot = new Transaction [
      a = foo:1
      b = foo:2
    ], properties: ["foo"]
    ot.saveFromValues()
    a.foo = 123
    b.foo = 234
    ot.saveToValues()

    ot.rollBack()
    assert.eq a, foo:1
    assert.eq b, foo:2

    ot.rollForward()
    assert.eq a, foo:123
    assert.eq b, foo:234

  test "values are saved using cloneByStructure", ()->
    class Element
      constructor: (name) -> @name

    a = {children:[new Element("Alice"), new Element "Bill"]}
    aFromChildren = a.children
    ot = new Transaction a, to: children: [aFromChildren[1], aFromChildren[0], aFromChildren[1]]

    ot.rollBack()
    assert.equal a.children[0], aFromChildren[0]
    assert.equal a.children[1], aFromChildren[1]
    assert.eq a.children.length, 2
    assert.notEqual a.children, aFromChildren

    ot.rollForward()
    assert.equal a.children[0], aFromChildren[1]
    assert.equal a.children[1], aFromChildren[0]
    assert.equal a.children[2], aFromChildren[1]
    assert.eq a.children.length, 3
    assert.notEqual a.children, aFromChildren

  test "interpolate numbers", ()->
    ot = new Transaction [
      a = foo:100
      b = foo:20
    ], properties: ["foo"]
    ot.saveFromValues()
    a.foo = 200
    b.foo = 40
    ot.saveToValues()

    ot.interpolate .25
    assert.eq a, foo:125
    assert.eq b, foo:25

    ot.interpolate 0
    assert.eq a, foo:100
    assert.eq b, foo:20

    ot.interpolate 1
    assert.eq a, foo:200
    assert.eq b, foo:40

  # test "interpolate complex objects", ()->
  #   ot = new Transaction [
  #     a = foo: point 1, 2
  #     b = foo: point 20, 30
  #   ], properties: ["foo"]
  #   ot.saveFromValues()
  #   a.foo = point 2, 0
  #   b.foo = point 100, 90
  #   ot.saveToValues()

  #   ot.interpolate 0
  #   assert.eq a, foo: point 1, 2
  #   assert.eq b, foo: point 20, 30

  #   ot.interpolate .25
  #   assert.eq a, foo: point 1.25, 1.5
  #   assert.eq b, foo: point 40, 45

  #   ot.interpolate 1
  #   assert.eq a, foo: point 2, 0
  #   assert.eq b, foo: point 100, 90

  test "saveFromValues should be non-destructive, even for null and undefined values", ()->
    ot = new Transaction (obj={a:1, b:2, c:3, d:4, e:5, f:6}),
      properties: ["e", "f"]

      from:
        a: null
        b: undefined
        c: 0
        d: "defined"

    assert.eq obj, {a:1, b:2, c:3, d:4, e:5, f:6}
    assert.eq ot.from(obj), {a:null, b:undefined, c:0, d:"defined", e:5, f:6}

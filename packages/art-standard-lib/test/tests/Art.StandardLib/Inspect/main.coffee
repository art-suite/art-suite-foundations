
{StandardLib} = Neptune.Art
clone = StandardLib.Clone.clone
{inspect, inspectLean} = StandardLib.Inspect

suite "Art.StandardLib.Inspect.inspectLean.basics work like inspect", ->
  test "inspectLean 1", -> assert.equal "1", inspectLean 1
  test "inspectLean ->", -> assert.equal "function()", inspectLean ->
  test "inspectLean 'hi'", -> assert.equal '"hi"', inspectLean "hi"
  test "inspectLean null", -> assert.equal "null", inspectLean null
  test "inspectLean undefined", -> assert.equal "undefined", inspectLean undefined

suite "Art.StandardLib.Inspect.inspectLean.plain arrays - brackets are stripped for length >= 2", ->
  test "inspectLean []", -> assert.equal "[]", inspectLean []
  test "inspectLean [123]", -> assert.equal "[123]", inspectLean [123]
  test "inspectLean [123, 456]", -> assert.equal "123, 456", inspectLean [123, 456]

suite "Art.StandardLib.Inspect.inspectLean.plain objects - curlies are stripped for length >= 1", ->
  test "inspectLean {}", -> assert.equal "{}", inspectLean {}
  test "inspectLean {a:123}", -> assert.equal "a: 123", inspectLean {a:123}
  test "inspectLean {inspect:->'hi'}", -> assert.equal "hi", inspectLean inspect: -> "hi"
  test "inspectLean {inspect:->'{}'}", -> assert.equal "{}", inspectLean inspect: -> "{}"

suite "Art.StandardLib.Inspect.inspectLean.custom inspector overrides inspectLean", ->
  test "inspectLean {inspect:->'{a:b}'}", -> assert.equal "{a:b}", inspectLean inspect: -> "{a:b}"

suite "Art.StandardLib.Inspect.basic", ->
  test "inspect []", -> assert.equal "[]", inspect []
  test "inspect 1", -> assert.equal "1", inspect 1
  test "inspect 'hi'", -> assert.equal '"hi"', inspect 'hi'
  test "inspect 'hi'", -> assert.equal "\"\\u0000\\b\\f\\n\\r\\t\\u000b\"", inspect "\0\b\f\n\r\t\v"
  test "inspect null", -> assert.equal "null", inspect null
  test "inspect undefined", -> assert.equal "undefined", inspect undefined
  test "inspect [1, 2, 3]", -> assert.equal "[1, 2, 3]", inspect [1,2,3]
  test "inspect {a:1, b:2}", -> assert.equal "{a: 1, b: 2}", inspect {a:1, b:2}
  test "inspect {'a thing':1, b:2}", -> assert.equal "{\"a thing\": 1, b: 2}", inspect {"a thing":1, b:2}
  test "inspect function()", -> assert.equal "function()", inspect ->
  test "inspect function Foo()", ->
    class Foo
    assert.equal "Foo()", inspect Foo

  test "inspect array with null", ->
    assert.equal "[null, null]", inspect [null, null]

  test "inspect array with undefined", ->
    assert.equal "[undefined, undefined]", inspect [undefined, undefined]

  test "inspect maxLength", ->
    assert.eq '["foo", "b<... first 2/5>', inspect ["foo", "bar", "is", "good"], maxLength: 10

  test "inspect maxDepth", ->
    a =
      foo:
        food:
          foodie: 1
          fooded: "two"
        fooy:
          fooyed: 1
          fooyer: 2
      bar:
        bard:
          barded: 1
          barding: {two:2}
        barf:
          barfing: 1
          barfed: 2

    assert.eq "1", inspect 1, maxDepth: 0
    assert.eq '"one"', inspect "one", maxDepth: 0
    assert.eq "{2 keys}", inspect a, maxDepth: 0
    assert.eq "[3 elements]", inspect [1, 2, 3], maxDepth: 0
    assert.eq "{foo: {2 keys}, bar: {2 keys}}", inspect a, maxDepth: 1
    assert.eq "{foo: {food: {2 keys}, fooy: {2 keys}}, bar: {bard: {2 keys}, barf: {2 keys}}}", inspect a, maxDepth: 2
    assert.eq "{foo: {food: {foodie: 1, fooded: \"two\"}, fooy: {fooyed: 1, fooyer: 2}}, bar: {bard: {barded: 1, barding: {1 keys}}, barf: {barfing: 1, barfed: 2}}}", inspect a, maxDepth: 3
    assert.eq "{foo: {food: {foodie: 1, fooded: \"two\"}, fooy: {fooyed: 1, fooyer: 2}}, bar: {bard: {barded: 1, barding: {two: 2}}, barf: {barfing: 1, barfed: 2}}}", inspect a

  test "inspect recursive", ->
    foo = a:1, b:2
    bar = c:3, d:4
    foo.bar = bar
    bar.foo = foo

    assert.equal '{a: 1, b: 2, bar: {c: 3, d: 4, foo: <grandparent>}}', inspect foo

  test "inspect recursive parent", ->
    foo = {}
    foo.bar = foo
    assert.equal '{bar: <parent>}', inspect foo

  test "inspect recursive grandparent", ->
    foo = {}
    foo.bar = {}
    foo.bar.baz = foo
    assert.equal '{bar: {baz: <grandparent>}}', inspect foo

  test "inspect recursive great grandparent", ->
    foo = {}
    foo.bar = {}
    foo.bar.baz = {}
    foo.bar.baz.bomb = foo
    assert.equal '{bar: {baz: {bomb: <great grandparent>}}}', inspect foo

  test "inspect recursive great^2 grandparent", ->
    foo = {}
    foo.bar = {}
    foo.bar.baz = {}
    foo.bar.baz.bomb = {}
    foo.bar.baz.bomb.com = foo
    assert.equal '{bar: {baz: {bomb: {com: <great^2 grandparent>}}}}', inspect foo


  test "inspect class", ->
    class Foo
      @bar: 1
      @baz: 2

    assert.eq (inspect Foo), "Foo"

  test "inspected twice", ->
    foo = a:1, b:1
    bar = c:3, d:4
    foo.bar1 = bar
    foo.bar2 = bar

    assert.equal '{a: 1, b: 1, bar1: {c: 3, d: 4}, bar2: {c: 3, d: 4}}', inspect foo

  test "inspect recursive with arrays", ->
    foo = a:1, b:2
    bar = c:3, d:4
    foo.bar = bar
    bar.foo = [foo]
    assert.equal '{a: 1, b: 2, bar: {c: 3, d: 4, foo: [<great grandparent>]}}', inspect foo

suite "Art.StandardLib.Inspect.custom inspect", ->
  test "custom signature: inspect: (inspector) -> ", ->
    class Point
      constructor: (x,y) ->
        @x = x
        @y = y
      inspect: (inspector) -> inspector.put "(#{@x}, #{@y})"

    assert.equal "(4, 5)", inspect (new Point(4,5))
    assert.equal "{area: (4, 5)}", inspect {area: new Point(4,5)}
    assert.equal "{area: [(4, 5)]}", inspect {area: [new Point(4,5)]}

  test "custom signature: inspect: -> ", ->
    class Point
      constructor: (x,y) ->
        @x = x
        @y = y
      inspect: -> "(#{@x}, #{@y})"

    assert.equal "(4, 5)", inspect (new Point(4,5))
    assert.equal "{area: (4, 5)}", inspect {area: new Point(4,5)}
    assert.equal "{area: [(4, 5)]}", inspect {area: [new Point(4,5)]}

  test "no custom inspectors", ->
    class Point
      constructor: (x,y) ->
        @x = x
        @y = y
      inspect: (inspector) -> inspector.put "(#{@x}, #{@y})"

    assert.equal "{Point x: 4, y: 5}", inspect (new Point(4,5)), noCustomInspectors: true
    assert.equal "{area: {Point x: 4, y: 5}}", inspect {area: new Point(4,5)}, noCustomInspectors: true
    assert.equal "{area: [{Point x: 4, y: 5}]}", inspect {area: [new Point(4,5)]}, noCustomInspectors: true

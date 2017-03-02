
{Foundation} = Neptune.Art
{
  newObjectFromEach
  clone
  eq
  inspect
  merge
  mergeInto
  pureMerge
  objectWithout
  objectKeyCount
  compact
  plainObjectsDeepEq
  deepMerge
  toObject
  select
  inject
  setPathedProperty
  expandPathedProperties
  log
} = Foundation

module.exports = suite:
  merge: ->

    test "merge a, b", ->
      a = foo:1
      b = bar:2
      res = merge a, b
      assert.eq res, foo: 1, bar: 2
      assert.eq a, foo:1
      assert.eq b, bar:2
      assert.neq a, res
      assert.neq b, res

    test "merge a, b, c", ->
      a = foo:1
      b = foo:2
      c = foo:3
      res = merge a, b, c
      assert.eq res, foo:3

    test "merge a, [b, c]", ->
      a = foo:1
      b = foo:2
      c = foo:3
      res = merge a, [b, c]
      assert.eq res, foo:3

    test "merge a, null, c", ->
      a = foo:1
      b = null
      c = foo:3
      res = merge a, b, c
      assert.eq res, foo:3

    test "merge()", ->
      res = merge()
      assert.eq res, {}

    test "merge [a, b]", ->
      a = foo:1
      b = bar:2
      res = merge [a, b]
      assert.eq res, foo: 1, bar: 2

  mergeInto: ->
    test "mergeInto()", ->
      assert.eq null, mergeInto()

    test "mergeInto null, b", ->
      assert.eq bar: 2, mergeInto null, bar: 2

    test "mergeInto a, b", ->
      a = foo:1
      b = bar:2
      res = mergeInto a, b
      assert.eq res, foo: 1, bar: 2
      assert.eq a, res
      assert.eq b, bar:2

  pureMerge: ->

    test "pureMerge()", ->
      assert.eq null, pureMerge()

    test "pureMerge a", ->
      a = foo:1
      res = pureMerge a
      assert.eq true, res == a

    test "pureMerge(a, b) when b shadows a", ->
      a = foo:1
      b = foo:2
      res = pureMerge a, b
      assert.eq true, res == b

    test "pureMerge(a, b) when b doesn't shadow a", ->
      a = foo:1
      b = bar:2
      res = pureMerge a, b
      assert.eq res, foo:1, bar:2
      assert.neq a, res
      assert.neq b, res

  objectWithout: ->

    test "objectWithout", ->
      a = foo:1, bar:2, fooz:3, baz:4
      b = objectWithout a, "bar", "baz"
      assert.eq b,
        foo: 1
        fooz: 3

    test "objectWithout with nothing to do returns original object", ->
      a = foo:1, bar:2, fooz:3, baz:4
      b = objectWithout a, "cat", "frog"
      assert.eq true, a == b

  toObject: ->
    test "simple key-value", ->
      assert.eq
        123: "foo"
      , toObject 123, "foo"

    test "two key-values", ->
      assert.eq
        123: "foo"
        456: "bar"
      , toObject 123, "foo", 456, "bar"

    test "missing value for key becomes undefined", ->
      assert.eq
        foo: undefined
      , toObject "foo"

    test "null values", ->
      assert.eq
        1: null
        2: false
        3: undefined
        4: 0
        456: "foo"
      ,
        toObject 1, null, 2, false, 3, undefined, 4, 0, null, undefined, 456, "foo"

    test "objects in the list get merged in", ->
      assert.eq
        foo: 1
        bar: 2
        bob: 3
        123: "foo"
      , toObject
        foo: 1
        bar: 2
        [123, "foo"]
        bob: 3

    test "array of pairs", ->
      assert.eq
        foo: 1
        bar: 2
        baz: 3
        bat: 4
      , toObject [
        ["baz", 3]
        ["foo", 1]
        ["bat", 4]
        ["bar", 2]
      ]

    test "last value for same key sticks", ->
      assert.eq
        foo: 1
        bar: 2
        baz: 3
        bat: 5
      , toObject [
        ["baz", 3]
        ["foo", 1]
        ["bat", 4]
        ["bat", 5]
        ["bar", 2]
      ]

    test "compactFlatten IN DA HOUSE", ->
      assert.eq
        foo: 1
        bar: 2
        baz: 3
        bat: 4
      , toObject [
        null
        ["baz", 3]
        [
          ["foo", 1]
          ["bat", 4]
        ]
        undefined
        [[["bar", 2]]]
      ]

    test "toObject 'myKey', x: 1, y: 2", ->
      assert.eq
        myKey: x: 1, y: 2
      , toObject 'myKey', x: 1, y: 2

    test "toObject 'myKey', [1, 2]", ->
      assert.eq
        myKey: [1, 2]
      , toObject 'myKey', [1, 2]

  objectKeyCount: ->
    test "objectKeyCount {}"        , -> assert.eq 0, objectKeyCount {}
    test "objectKeyCount a:1"       , -> assert.eq 1, objectKeyCount a:1
    test "objectKeyCount a:1, b:2"  , -> assert.eq 2, objectKeyCount a:1, b:2

  select: ->
    test "select()", -> assert.eq select(), {}
    test "select foo: 0, 'foo'", -> assert.eq select(foo: 0, 'foo'), foo: 0
    test "select foo: 1, bar: 2, 'foo'", -> assert.eq foo: 1, select foo: 1, bar: 2, 'foo'
    test "select bar: 2, 'foo'", -> assert.eq {}, select bar: 2, 'foo'
    test "select foo: 1, bar: 2, baz: 3, 'foo', 'bar'", ->
      assert.eq
        foo: 1, bar: 2
        select foo: 1, bar: 2, baz: 3, 'foo', 'bar'

    test "select foo: 1, bar: 2, baz: 3, (k, v)->", ->
      assert.eq
        baz: 3, bar: 2
        select foo: 1, bar: 2, baz: 3, (k, v) -> k.match /^b/

    test "select foo: 1, bar: 2, baz: 3, (v)->", ->
      assert.eq
        foo: 1, bar: 2
        select foo: 1, bar: 2, baz: 3, (v) -> v <= 2

    test "select foo: null, bar: false, baz: undefined, -> true", ->
      assert.eq
        foo: null, bar: false, baz: undefined
        select foo: null, bar: false, baz: undefined, -> true

  deepMerge: ->
    test "same as merge", ->
      a = foo: 1, bar: 2
      b = bar: 3, baz: 4
      assert.eq deepMerge(a, b), merge(a, b)

    test "nested objects with the same key get merged", ->
      a = foo: 1, bar: {one: 1, two: 2}
      b = bad: "wolf"
      c = bar: {two: 200, three: 3}, baz: 4
      assert.neq deepMerge(a, b, c), merge(a, b, c)
      assert.eq deepMerge(a, b, c),
        foo: 1
        bar: one: 1, two: 200, three: 3
        baz: 4
        bad: "wolf"


    test "three level test", ->
      a = bad: "wolf"
      b = foo: 1, bar: baz: a: 123
      c = foo: 1, bar: baz: b: 123
      assert.neq deepMerge(a, b, c), merge(a, b, c)
      assert.eq deepMerge(a, b, c),
        bad: "wolf"
        foo: 1
        bar: baz: a: 123, b: 123

  pathedProperties: ->
    test "setPathedProperty not really pathed", ->
      assert.eq
        b: 123
        setPathedProperty {}, "b", 123

    test "setPathedProperty 'b.c'", ->
      assert.eq
        b: c: 123
        setPathedProperty {}, "b.c", 123

    test "setPathedProperty 'b c'", ->
      assert.eq
        b: c: 123
        setPathedProperty {}, "b c", 123

    test "setPathedProperty 'b/c'", ->
      assert.eq
        b: c: 123
        setPathedProperty {}, "b/c", 123

    test "setPathedProperty two overlapping paths", ->
      assert.eq
        b:
          c: 123
          d: 456
        setPathedProperty
          b: c: 123
          "b.d", 456

    test "setPathedProperty two non-overlapping paths", ->
      assert.eq
        b: c: 123
        d: c: 456
        setPathedProperty
          b: c: 123
          "d.c", 456

  expandPathedProperties: ->
    test "a: 1", ->
      assert.eq
        a: 1
        expandPathedProperties a: 1

    test "a.b: 1", ->
      assert.eq
        a:b: 1
        expandPathedProperties "a.b": 1

    test "a: b.c: 1", ->
      assert.eq
        a: "b.c": 1
        expandPathedProperties a: "b.c": 1

    test "a.b.c: 1", ->
      assert.eq
        a:b:c: 1
        expandPathedProperties "a.b.c": 1

    test "a.b: c.d: 1", ->
      assert.eq
        a:b:c:d: 1
        expandPathedProperties "a.b": "c.d": 1

    test "realworld", ->
      assert.eq
        verbose: true
        Art:
          Imikimi:
            Auth:
              Server:
                testAuthEmail:  "special@imikimi.com"
                testAuthCode:   "107734"

        expandPathedProperties
          verbose: true
          "Art.Imikimi.Auth.Server":
            testAuthEmail: "special@imikimi.com"
            testAuthCode: "107734"

    test "nested objects are merged-into, not replaced", ->
      a =
        c:
          a:    "abc"

      b =
        c:
          a:    "def"
          foo:  "123"

      c = expandPathedProperties a, clone b
      # log {a, b, c}
      assert.eq c.c.foo, "123"
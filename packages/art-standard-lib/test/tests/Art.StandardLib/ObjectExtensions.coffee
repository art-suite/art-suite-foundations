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
  mergeIntoUnless
  vivifyObjectPath
  vivifyObjectPathAndSet
} = require './StandardImport'

module.exports = suite:
  vivifyObjectPath: ->
    test "vivifyObjectPath {}", ->
      assert.eq {}, vivifyObjectPath {}

    test "vivifyObjectPath {}, 'a'", ->
      assert.eq {}, vivifyObjectPath input = {}, 'a'
      assert.eq input, a: {}

    test "vivifyObjectPath null, 'a', 'b'", ->
      assert.eq {}, vivifyObjectPath input = {}, 'a', 'b'
      assert.eq input,
        a: b: {}

    test "vivifyObjectPath {c: 123}, 'a', 'b'", ->
      assert.eq {}, vivifyObjectPath input = {c: 123}, 'a', 'b'
      assert.eq input,
        a: b: {}
        c: 123

    test "vivifyObjectPath {a: c: 123}, 'a', 'b'", ->
      assert.eq {}, vivifyObjectPath input = {a: origA = c: 123}, 'a', 'b'
      assert.eq input,
        a:
          b: {}
          c: 123

      assert.equal input.a, origA

  vivifyObjectPathAndSet: ->
    test "vivifyObjectPathAndSet {}, 'a', 'b'", ->
      assert.eq 'b', vivifyObjectPathAndSet input = {}, 'a', 'b'
      assert.eq input, a: 'b'

    test "vivifyObjectPathAndSet {}, 'a', 'b', 'c'", ->
      assert.eq 'c', vivifyObjectPathAndSet input = {}, 'a', 'b', 'c'
      assert.eq input, a: b: 'c'

    test "vivifyObjectPathAndSet {c: 123}, 'a', 'b'", ->
      assert.eq 'b', vivifyObjectPathAndSet input = {c: 123}, 'a', 'b'
      assert.eq input,
        a: 'b'
        c: 123

    test "vivifyObjectPathAndSet {a: c: 123}, 'a', 'b'", ->
      assert.eq 'b', vivifyObjectPathAndSet input = {a: origA = c: 123}, 'a', 'b'
      assert.eq input, a: 'b'

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
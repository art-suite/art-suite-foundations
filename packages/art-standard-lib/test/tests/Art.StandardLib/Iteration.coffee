{
  log
  object
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
  toPlainObjects
  select
  reduce
  setPathedProperty
  expandPathedProperties
  each
  eachWhile
  find
  array
} = Neptune.Art.StandardLib

module.exports = suite:
  each:
    basic: ->
      test "objects", ->
        values = 0
        keys = ""
        each a: 1, b: 2, (v, k) -> values += v; keys += k
        assert.eq values, 3
        assert.eq keys, "ab"

      test "arrays", ->
        keys = values = 0
        each [3, 4], (v, k) -> values += v; keys += k
        assert.eq values, 7
        assert.eq keys, 1

    empty: ->
      test "array null", ->
        assert.eq [], array null, (v, k) ->

      test "each null", ->
        count = 0
        each null, (v, k) -> count++
        assert.eq 0, count

    when: ->
      test "objects", ->
        values = 0
        each {a: 1, b: 2, c: 3, d: 4},
          when: (v, k) -> v % 2 == 0
          with: (v) -> values += v
        assert.eq values, 6

      test "arrays", ->
        values = 0
        each [1,2,3,4],
          when: (v, k) -> v % 2 == 0
          with: (v) -> values += v
        assert.eq values, 6

      test "when return value", ->
        out = []
        each [{a:"foo"},{},{a:"bar"},{}],
          when: ({a}) -> a
          with: (v, k, o, whenResult) ->
            out.push whenResult

        assert.eq out, ["foo", "bar"]

    eachWhile: ->
      test "objects", ->
        values = 0
        eachWhile {a: 1, b: 2, c: 0, d: 4}, (v) -> values += v; v
        assert.eq values, 3

      test "arrays", ->
        values = 0
        eachWhile [1,2,0,4], (v) -> values += v; v
        assert.eq values, 3

  find: ->
    source = [1, 2, 9, 3, 4]
    test "when",      -> assert.eq 9,   find source, when: (v) -> v % 3 == 0
    test "with",      -> assert.eq 90,  find source, (v) -> if v % 3 == 0 then v * 10
    test "when with", -> assert.eq 45,  find source,
      when: (v) -> v % 3 == 0
      with: (v) -> v * 5

  reduce: ->
    add = (a, b) -> a + b
    injectMerge = (obj, v, k) -> obj[k] = v; obj
    mySelect = (obj, v, k) -> obj[k] = v if v >= 2; obj
    {max} = Math

    test "[1, 2, 3, 4], add", -> assert.eq 10, reduce [1, 2, 3, 4], add
    test "[5, 2, 0, 3], max", -> assert.eq 5, reduce [5, 2, 0, 3], (a, b) -> max a, b
    test "[1, 2, 3, 4], 100, add", -> assert.eq 110, reduce [1, 2, 3, 4], 100, add
    test "[1, 2, 3, 4], into: 100, with: add", -> assert.eq 110, reduce [1, 2, 3, 4], into: 100, with: add
    test "a: 1, b: 2, c: 3, d: 4, add",      -> assert.eq 10,  reduce a: 1, b: 2, c: 3, d: 4, add
    test "a: 1, b: 2, c: 3, d: 4, 100, add", -> assert.eq 110, reduce a: 1, b: 2, c: 3, d: 4, 100, add
    test "a: 1, b: 2, c: 3, d: 4, {foo:1, bar: 2}, injectMerge", ->
      assert.eq
        foo: 1
        bar: 2
        a:   1
        b:   2
        c:   3
        d:   4
        reduce a: 1, b: 2, c: 3, d: 4, {foo:1, bar: 2}, injectMerge

    test "[11, 22, 33, 44], {foo:1, bar: 2}, injectMerge", ->
      assert.eq
        foo: 1
        bar: 2
        0:   11
        1:   22
        2:   33
        3:   44
        reduce [11, 22, 33, 44], {foo:1, bar: 2}, injectMerge

    test "a: 1, b: 2, c: 3, d: 4, {foo:1, bar: 2}, mySelect", ->
      assert.eq
        foo: 1
        bar: 2
        b:   2
        c:   3
        d:   4
        reduce a: 1, b: 2, c: 3, d: 4, {foo:1, bar: 2}, mySelect

    test "[1, 2, 3, 4], {foo:1, bar: 2}, mySelect", ->
      assert.eq
        foo: 1
        bar: 2
        1:   2
        2:   3
        3:   4
        reduce [1, 2, 3, 4], {foo:1, bar: 2}, mySelect

  object:
    objects: ->
      test "no function, empty object", ->
        b = object a = {}
        assert.eq a, b
        assert.notSame a, b

      test "no function, non-empty object", ->
        b = object a = a: 1, b: 2
        assert.eq a, b
        assert.notSame a, b

      test "0-arg function: -> 123", ->
        assert.eq a: 123, b: 123, object a = a: 1, b: 2, -> 123

      test "1-arg function: (v) -> v + 1", ->
        assert.eq a: 2, b: 3, object a: 1, b: 2, (v) -> v + 1

      test "2-arg function: (v, k) -> k + v", ->
        assert.eq a: "a1", b: "b2", object a: 1, b: 2, (v, k) -> k + v

      test "3-arg function: (v, k, map) -> map[k+v] = v", ->
        source = a: 1, b: 2
        assert.eq a1: 1, b2: 2,             each   source, into = {}, (v, k) -> into[k+v] = v
        assert.eq a1: 1, a: 1, b2: 2, b: 2, object source,            (v, k, into) -> into[k+v] = v

      test "when", ->
        assert.eq b: 2, d: 4, object {a: 1, b: 2, c: 3, d: 4}, when: (v) -> v % 2 == 0

      test "key", ->
        assert.eq
          101: 1
          202: 2
          303: 3
          404: 4
          object {a: 1, b: 2, c: 3, d: 4},
            key: (v) -> v * 101

      test "key - all values passed through", ->
        assert.eq
          array: [1, 2, 3, 4]
          a102: 1
          b204: 2
          c306: 3
          d408: 4
          object {a: 1, b: 2, c: 3, d: 4},
            when: (v) -> v * 2
            key: (v, k, into, w) ->
              (into.array ||= []).push v
              "#{k}#{v * 100 + w}"

    arrays: ->
      test "0-arg function: -> true", ->
        assert.eq a: true, b: true, object ["a", "b"], -> true

      test "1-arg function: (v) -> v + v", ->
        assert.eq a: "aa", b: "bb", object ["a", "b"], (v) -> v+v

      test "2-arg function: (v, k) -> map[k+v] = v", ->
        assert.eq a: "0a", b: "1b", object ["a", "b"], (v, k) -> k+v

      test "3-arg function: (v, k, map) -> map[k+v] = v", ->
        assert.eq "0a": "a", a: "a", "1b": "b", b: "b", object ["a", "b"], (v, k, map) -> map[k+v] = v

  array:
    objects: ->
      test "no function, empty object", ->
        assert.eq [], array {}

      test "no function, non-empty object", ->
        assert.eq [1, 2], array a: 1, b: 2

      test "0-arg function: -> 123", ->
        assert.eq [123, 123], array a: 1, b: 2, -> 123

      test "1-arg function: (v) -> v + v", ->
        assert.eq ["aa", "bb"], array ["a", "b"], (v) -> v+v

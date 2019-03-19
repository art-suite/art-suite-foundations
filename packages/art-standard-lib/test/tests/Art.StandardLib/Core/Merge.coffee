{
  merge
  mergeWithoutNulls
  mergeInto
  mergeIntoUnless
  pureMerge
  deepMerge
} = require './StandardImport'
module.exports = suite:
  mergeWithoutNulls: ->
    test "vs normal merge", ->
      assert.eq
        a: 1, c: 3
        mergeWithoutNulls
          a: 1
          b: 2
          {
            b: null
            c: 3
          }

      assert.eq
        a: 1, b: null, c: 3
        merge
          a: 1
          b: 2
          {
            b: null
            c: 3
          }


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

    test "merge a:123, {a: undefined}", ->
      assert.eq a: 123, merge a:123, {a: undefined}

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

  mergeIntoUnless: ->
    test "{a: undefined}, a: 123", ->
      out = mergeIntoUnless v = {a: undefined}, a: 123
      assert.equal v, out
      assert.eq v, a: 123

    test "{a: 456}, a: 123", ->
      out = mergeIntoUnless v = {a: 456}, a: 123
      assert.equal v, out
      assert.eq v, a: 456

    test "{a: 456}, b: 123", ->
      out = mergeIntoUnless v = {a: 456}, b: 123
      assert.equal v, out
      assert.eq v, a: 456, b: 123

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

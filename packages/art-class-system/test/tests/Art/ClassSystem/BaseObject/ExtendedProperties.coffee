
{Foundation} = Neptune.Art
{log, BaseObject, clone, eq, inspect, nextTick} = Foundation

module.exports = suite:
  "getters don't extend": ->
    test "[]", ->
      a = null
      class Foo extends BaseObject
        @extendableProperty list: a = ["foo"]

      assert.eq a, Foo.getList()
      assert.eq a, (new Foo).getList()

    test "{}", ->
      a = null
      class Foo extends BaseObject
        @extendableProperty list: a = foo: 1

      assert.eq a, Foo.getList()
      assert.eq a, (new Foo).getList()

  "extend methods": ->
    test "[]", ->
      class Foo extends BaseObject
        @extendableProperty list: ["foo"]

      Foo.extendList "bar"
      assert.eq Foo.getList(), ["foo", "bar"]

      Foo.extendList ["bat"]
      assert.eq Foo.getList(), ["foo", "bar", "bat"]

      Foo.extendList ["bay", "baz"]
      assert.eq Foo.getList(), ["foo", "bar", "bat", "bay", "baz"]

      Foo.extendList bazzzz: 1
      assert.eq Foo.getList(), ["foo", "bar", "bat", "bay", "baz", bazzzz: 1]

    test "{}", ->
      class Foo extends BaseObject
        @extendableProperty map: foo: 1

      assert.throws -> Foo.extendMap 1
      assert.eq Foo.getMap(), foo: 1

      Foo.extendMap bar: 2
      assert.eq Foo.getMap(), foo: 1, bar: 2

      Foo.extendMap "baz", 3
      assert.eq Foo.getMap(), foo: 1, bar: 2, baz: 3

  "extend methods on instances": ->
    test "[]", ->
      class Foo extends BaseObject
        @extendableProperty list: ["foo"]

      Foo.extendList "bar"
      assert.eq Foo.getList(), ["foo", "bar"]

      foo = new Foo
      foo.extendList "baz"
      assert.eq Foo.getList(), ["foo", "bar"]
      assert.eq foo.getList(), ["foo", "bar", "baz"]

      foo2 = new Foo
      foo2.extendList "bat"
      assert.eq Foo.getList(), ["foo", "bar"]
      assert.eq foo.getList(), ["foo", "bar", "baz"]
      assert.eq foo2.getList(), ["foo", "bar", "bat"]

    test "{}", ->
      class Foo extends BaseObject
        @extendableProperty map: foo: 1

      Foo.extendMap bar: 2
      assert.eq Foo.getMap(), foo: 1, bar: 2

      foo = new Foo
      foo.extendMap baz: 3
      assert.eq Foo.getMap(), foo: 1, bar: 2
      assert.eq foo.getMap(), foo: 1, bar: 2, baz: 3

      foo2 = new Foo
      foo2.extendMap bat: 4
      assert.eq Foo.getMap(), foo: 1, bar: 2
      assert.eq foo.getMap(), foo: 1, bar: 2, baz: 3
      assert.eq foo2.getMap(), foo: 1, bar: 2, bat: 4

      foo2.extendMap "bummer", 5
      assert.eq foo2.getMap(), foo: 1, bar: 2, bat: 4, bummer: 5

  "later changes in parent don't effect children": ->
    test "[]", ->
      class Foo extends BaseObject
        @extendableProperty list: ["foo"]

      class Bar extends Foo
        @extendList "bar"

      Foo.extendList "baz"
      assert.eq Foo.getList(), ["foo", "baz"]
      assert.eq Bar.getList(), ["foo", "bar"]

    test "{}", ->
      class Foo extends BaseObject
        @extendableProperty map: foo: 1

      class Bar extends Foo
        @extendMap bar: 2

      Foo.extendMap baz: 3
      assert.eq Foo.getMap(), foo: 1, baz: 3
      assert.eq Bar.getMap(), foo: 1, bar: 2



  # getPrototypePropertyExtendedByInheritance:
  #   basic: ->
  #     test "[]", ->
  #       class Foo extends BaseObject
  #         @getList: -> @getPrototypePropertyExtendedByInheritance "list", []
  #         @getList().push "foo"

  #       class Bar extends Foo
  #         @getList().push "bar"

  #       assert.eq Foo.getList(), ["foo"]
  #       assert.eq Bar.getList(), ["foo", "bar"]

  #     test "{}", ->
  #       class Foo extends BaseObject
  #         @getMap: -> @getPrototypePropertyExtendedByInheritance "list", {}
  #         @getMap().foo = 1

  #       class Bar extends Foo
  #         @getMap().bar = 2

  #       assert.eq Foo.getMap(), foo: 1
  #       assert.eq Bar.getMap(), foo: 1, bar: 2

  #   "are later changes in parent reflected in children?": ->
  #     test "alter parent [] DOESN'T affect children", ->
  #       class Foo extends BaseObject
  #         @getList: -> @getPrototypePropertyExtendedByInheritance "list", []
  #         @getList().push "foo"

  #       class Bar extends Foo
  #         @getList().push "bar"

  #       Foo.getList().push "baz"
  #       assert.eq Foo.getList(), ["foo", "baz"]
  #       assert.eq Bar.getList(), ["foo", "bar"]

  #     test "alter parent [] DOES affect children", ->
  #       class Foo extends BaseObject
  #         @getMap: -> @getPrototypePropertyExtendedByInheritance "list", {}
  #         @getMap().foo = 1

  #       class Bar extends Foo
  #         @getMap().bar = 2

  #       Foo.getMap().baz = 3
  #       assert.eq Foo.getMap(), foo: 1, baz: 3
  #       assert.eq Bar.getMap(), foo: 1, bar: 2, baz: 3

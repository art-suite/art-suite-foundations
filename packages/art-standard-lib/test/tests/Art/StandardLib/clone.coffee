
{StandardLib} = Neptune.Art
{log, clone, cloneStructure, isPlainObject, isArray} = Neptune.Art.StandardLib

clone = StandardLib.Clone.clone
inspect = StandardLib.Inspect.inspect
Unique = StandardLib.Unique

module.exports = suite:
  cloneStructure: ->
    testBasicCloneStructure = (value, name) ->
      test "cloneStructure #{name ? value}", ->
        cloned = cloneStructure value
        assert.eq value, cloned
        assert.notEqual value, cloned if isPlainObject(value) || isArray(value)

    testBasicCloneStructure null
    testBasicCloneStructure undefined
    testBasicCloneStructure 1
    testBasicCloneStructure true
    testBasicCloneStructure false
    testBasicCloneStructure "string", '"string"'
    testBasicCloneStructure [1,2,3], "[1,2,3]"
    testBasicCloneStructure a: 1, b: 2, "a: 1, b: 2"
    testBasicCloneStructure a: [1,2], b: 2, "a: [1,2], b: 2"

    test "cloneStructure recursive-safe []", ->
      a = []
      a.push a
      b = cloneStructure a
      assert.eq a, b
      assert.notEqual a, b
      assert.notEqual a[0], b[0]
      assert.equal a, a[0]
      assert.equal b, b[0]

    test "cloneStructure recursive-safe {}", ->
      a = {}
      a.v = a
      b = cloneStructure a
      assert.eq a, b
      assert.notEqual a, b
      assert.notEqual a.v, b.v
      assert.equal a, a.v
      assert.equal b, b.v

    test "cloneStructure recursive-safe {[]}", ->
      a = {}
      a.v = a2 = []
      a2.push a
      b = cloneStructure a
      assert.eq a, b
      assert.notEqual a, b
      assert.notEqual a.v[0], b.v[0]
      assert.equal a, a.v[0]
      assert.equal b, b.v[0]

    ###
    cloneStructure duplicates each sub-branch separately, which means
    when the exact-same-object appears more than once, in a non-parent-child relationship,
    each instance will be duplicated separately.
    This is mostly a performance optimization. It allows us to use a stack rather than
    a full map.
    It also means the result is JSON-safe even if the source isn't.
    ###
    test "cloneStructure separate-branches-duplicated-separately", ->
      a = {}
      a.v = a2 = []
      a.w = a2
      b = cloneStructure a
      assert.eq a, b
      assert.equal a.v, a.w
      assert.notEqual b.v, b.w

  clone: ->

    test "clone null", ->
      assert.equal null, clone(null)

    test "clone undefined", ->
      assert.equal undefined, clone(undefined)

    test "clone 123", ->
      assert.equal 123, clone(123)

    test "clone 'hi'", ->
      assert.equal 'hi', clone('hi')

    test "clone f()", ->
      f = (x)-> x*x
      assert.equal f, clone(f)

    test "clone [1, 2, 3] is the same contents", ->
      c = clone(a=[1, 2, 3])
      assert.eq [1, 2, 3], c

    test "clone [1, 2, 3] is not the same object", ->
      a = [1, 2, 3]
      b = clone a
      a[3] = 4
      assert.notDeepEqual a, b

    test "clone {a:1, b:2} is the same contents", ->
      assert.deepEqual {a:1, b:2}, clone({a:1, b:2})

    test "clone {a:1, b:2} is not the same object", ->
      a = {a:1, b:2}
      b = clone a
      a.c = 3
      assert.notDeepEqual a, b

    test "clone recursive", ->
      foo = a:1, b:2
      bar = c:3, d:4
      foo.bar = bar
      bar.foo = foo

      assert.equal inspect(foo), inspect(clone(foo))

    test "clone and Unique", ->
      foo = {}
      bar = clone foo
      assert.neq Unique.id(foo), Unique.id(bar)

    test "clone recursive arrays", ->
      foo = [1, 2]
      foo[2] = foo
      bar = clone foo
      assert.equal foo[2], foo
      assert.equal bar[2], bar

    test "clone same object twice", ->
      foo = a:1, b:2
      bar = c:3, d:4
      foo.bar = bar
      foo.baz = bar

      cloned = clone foo
      assert.equal inspect(foo), inspect(cloned)

      assert.equal foo.bar, foo.baz
      foo.bar.c = 100
      assert.equal 100, foo.baz.c

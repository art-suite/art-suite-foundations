
{Foundation} = Neptune.Art
clone = Foundation.Clone.clone
cloneByProperties = Foundation.Clone.cloneByProperties
cloneByStructure = Foundation.Clone.cloneByStructure
inspect = Foundation.Inspect.inspect
Unique = Foundation.Unique

suite "Art.Foundation.Clone", ->

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

  test "custom populateClone", ->
    class Foo
      constructor: -> @bar = 1

      populateClone: (clonedObject) ->
        clonedObject.bar = @bar + 1
        clonedObject.far = clone @far

    a = new Foo
    a.far = new Foo
    b = clone a
    assert.equal a.bar, 1
    assert.equal a.far.bar, 1
    assert.equal b.bar, 2
    assert.equal b.far.bar, 2

  test "cloneByProperties bypasses custom populateClone, but only at the top", ->
    class Foo
      constructor: -> @bar = 1

      populateClone: (clonedObject) ->
        clonedObject.bar = @bar + 1
        clonedObject.far = clone @far

    a = new Foo
    a.far = new Foo
    b = cloneByProperties a
    assert.equal a.bar, 1
    assert.equal a.far.bar, 1
    assert.equal b.bar, 1
    assert.equal b.far.bar, 2

  test "byStructure creates a unique clone of 100% primative structure", ->
    a = [{a:1}, {b:2}]
    b = cloneByStructure a
    assert.deepEqual a, b
    assert.notEqual a, b
    assert.notEqual a[0], b[0]
    assert.notEqual a[1], b[1]

  test "byStructure doesn't clone non-primative objects", ->
    class Foo
    a = [{a:1}, new Foo]
    b = cloneByStructure a
    assert.deepEqual a, b
    assert.notEqual a, b
    assert.notEqual a[0], b[0]
    assert.equal a[1], b[1]

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

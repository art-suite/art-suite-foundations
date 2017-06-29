BuildFakeNeptune = ->
  class FakeNeptune extends Runtime.NamespaceBaseClass
    @Base: Runtime.NamespaceBaseClass
    @namespacePath: "FakeNeptune"
    @namespace: null
    @isNamespace: (klass) -> klass?.prototype instanceof NamespaceBaseClass
    @isNode: require 'detect-node'
  FakeNeptune._init "FakeNeptune"

suite "NeptuneNamespaces.Runtime.NamespaceBaseClass.includeInNamespace", ->
  for value in [false, true, null, undefined]
    do (value) ->
      test "#{value}: #{value}", ->
        class MyNamespace extends Runtime.NamespaceBaseClass
          @includeInNamespace "#{value}": value

        key = "#{value}"

        if value?
          assert.ok MyNamespace.hasOwnProperty key
          assert.eq MyNamespace[key], value
        else
          assert.ok !MyNamespace.hasOwnProperty key

suite "NeptuneNamespaces.Runtime.NamespaceBaseClass.addNamespace", ->
  test "basic", ->
    FakeNeptune = BuildFakeNeptune()
    FakeNeptune.addNamespace("AddNamespaceTest", class AddNamespaceTest extends Runtime.NamespaceBaseClass)
    AddNamespaceTest.addNamespace("Bar", class Bar extends Runtime.NamespaceBaseClass)

    # console.log FakeNeptune.getInspectedObjects()
    assert.eq AddNamespaceTest.Bar, Bar
    assert.eq AddNamespaceTest.namespaces.Bar, Bar

  test "pathed", ->
    FakeNeptune = BuildFakeNeptune()
    FakeNeptune.addNamespace("Art.AddNamespaceTest", class AddNamespaceTest extends Runtime.NamespaceBaseClass)

    # console.log FakeNeptune.getInspectedObjects()
    assert.eq AddNamespaceTest.namespacePath, "FakeNeptune.Art.AddNamespaceTest"
    assert.eq FakeNeptune.Art.AddNamespaceTest, AddNamespaceTest

  test "two same pathed", ->
    FakeNeptune = BuildFakeNeptune()
    FakeNeptune.addNamespace("Art.Foo", class Foo extends Runtime.NamespaceBaseClass)
    FakeNeptune.addNamespace("Art.Bar", class Bar extends Runtime.NamespaceBaseClass)

    assert.eq FakeNeptune.Art.Foo, Foo
    assert.eq FakeNeptune.Art.Bar, Bar

  test "versioned", ->
    FakeNeptune = BuildFakeNeptune()
    Foo1 = FakeNeptune.addNamespace "Foo", class Foo extends Runtime.NamespaceBaseClass
      @version: 1
    Foo2 = FakeNeptune.addNamespace "Foo", class Foo extends Runtime.NamespaceBaseClass
      @version: 2

    assert.eq FakeNeptune.Foo, Foo1
    assert.eq FakeNeptune.Foo.versions,
      1: Foo1
      2: Foo2

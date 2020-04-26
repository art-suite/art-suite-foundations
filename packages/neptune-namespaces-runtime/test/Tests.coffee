require '../source/Neptune'
{Namespace, PackageNamespace} = Neptune
{assert} = require 'chai'

BuildFakeNeptune = ->
  class FakeNeptune extends Namespace
    @Base: Namespace
    @namespacePath: "FakeNeptune"
    @namespace: null
    @isNamespace: (klass) -> klass?.prototype instanceof Namespace
    @isNode: require 'detect-node'
  FakeNeptune._init "FakeNeptune"
  FakeNeptune

suite "NeptuneNamespacesRuntime", ->
  suite "Namespace", ->
    suite "includeInNamespace", ->
      for value in [false, true, null, undefined]
        do (value) ->
          test "#{value}: #{value}", ->
            class MyNamespace extends Namespace
              @includeInNamespace "#{value}": value

            key = "#{value}"

            if value?
              assert.ok MyNamespace.hasOwnProperty key
              assert.equal MyNamespace[key], value
            else
              assert.ok !MyNamespace.hasOwnProperty key

    suite "addNamespace", ->
      test "basic", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace("AddNamespaceTest", class AddNamespaceTest extends Namespace)
        AddNamespaceTest.addNamespace("Bar", class Bar extends Namespace)

        # console.log FakeNeptune.getInspectedObjects()
        assert.equal AddNamespaceTest.Bar, Bar
        assert.equal AddNamespaceTest.namespaces.Bar, Bar

      test "pathed", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace("Art.AddNamespaceTest", class AddNamespaceTest extends Namespace)

        # console.log FakeNeptune.getInspectedObjects()
        assert.equal AddNamespaceTest.namespacePath, "FakeNeptune.Art.AddNamespaceTest"
        assert.equal FakeNeptune.Art.AddNamespaceTest, AddNamespaceTest

      test "two same pathed", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace("Art.Foo", class Foo extends Namespace)
        FakeNeptune.addNamespace("Art.Bar", class Bar extends Namespace)

        assert.equal FakeNeptune.Art.Foo, Foo
        assert.equal FakeNeptune.Art.Bar, Bar

      test "versioned", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace "Foo",
          class Foo1 extends PackageNamespace
          ._configureNamespace version: 1
        FakeNeptune.addNamespace "Foo",
          class Foo2 extends PackageNamespace
          ._configureNamespace version: 2

        assert.equal FakeNeptune.Foo, Foo1
        assert.equal FakeNeptune.versionedNamespaces.Foo[1], Foo1
        assert.equal FakeNeptune.versionedNamespaces.Foo[2], Foo2

      test "add PathedNamespace after PackageNamespace", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace "Foo",
          class Foo extends PackageNamespace
          ._configureNamespace version: 1

        FakeNeptune.addNamespace "Foo.Bar",
          class Bar extends PackageNamespace
          ._configureNamespace version: 2

        assert.equal FakeNeptune.Foo, Foo
        assert.equal FakeNeptune.Foo.Bar, Bar

        assert.equal FakeNeptune.Foo.version, 1
        assert.equal FakeNeptune.Foo.Bar.version, 2

      test "can't add PathedNamespace after PackageNamespace", ->
        FakeNeptune = BuildFakeNeptune()
        FakeNeptune.addNamespace "Foo.Bar",
          class Bar extends PackageNamespace
          ._configureNamespace version: 2

        assert.throws ->
          FakeNeptune.addNamespace "Foo",
            class Foo extends PackageNamespace
            ._configureNamespace version: 1

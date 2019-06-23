{NamespaceStructure, MiniFoundation} = require '../StandardImport'

{log, formattedInspect} = MiniFoundation
{shouldNotAutoload, shouldNotNamespace} = NamespaceStructure

suite "NeptuneNamespaces.NamespaceStructure.MiniFoundation", ->
  test "shouldNotAutoload '.foo.coffee'", ->
    assert.equal true, shouldNotAutoload '.foo.coffee'

suite "NeptuneNamespaces.NamespaceStructure", ->
  test "one file", ->
    ns = new NamespaceStructure root: "art", files: ["art/foo.coffee"]
    assert.eq ns.getInspectedObjects(),
      'Neptune.Art':
        namespaceName: "Art"
        namespacePath: "Neptune.Art"
        path: "art"
        parentNamespacePath: "Neptune"
        files:
          namespaced:
            Foo: "foo.coffee"

  testEquivelentFileNames = (filename) ->
    test "equivelent file name: #{formattedInspect filename}", ->
      ns = new NamespaceStructure root: "art", files: ["art/#{filename}.coffee"]
      assert.eq ns.getInspectedObjects()['Neptune.Art'].files.namespaced,
        MyFileName: "#{filename}.coffee"

  testEquivelentFileNames "myFileName"
  testEquivelentFileNames "MyFileName"
  testEquivelentFileNames "my_file_name"
  testEquivelentFileNames "my file name"

  test "zero files", ->
    ns = new NamespaceStructure root: "art", files: []
    assert.eq ns.getInspectedObjects(), {}

  test "ignored file", ->
    ns = new NamespaceStructure root: "art", files: ["art/.foo.coffee"]
    assert.eq ns.getInspectedObjects()['Neptune.Art'].files.ignored, [".foo.coffee"]

  test "not namespaced file", ->
    ns = new NamespaceStructure root: "art", files: ["art/-foo.coffee"]
    assert.eq ns.getInspectedObjects()['Neptune.Art'].files.notNamespaced, ["-foo.coffee"]

  test "ignored dir", ->
    ns = new NamespaceStructure root: "art", files: ["art/.foo/bar.coffee"]
    assert.eq ns.getInspectedObjects()['Neptune.Art'].subdirs.ignored, [".foo"]

  test "not namespaced dir", ->
    ns = new NamespaceStructure root: "art", files: ["art/-foo/bar.coffee"]
    assert.eq ns.getInspectedObjects()['Neptune.Art'].subdirs.notNamespaced, ["-foo"]

  test "two files", ->
    ns = new NamespaceStructure root: "art", files: ["art/foo.coffee", "art/bar.coffee"]
    assert.eq ns.getInspectedObjects()['Neptune.Art'].files.namespaced,
      Foo: "foo.coffee"
      Bar: "bar.coffee"

  test "includeInNamespace", ->
    ns = new NamespaceStructure root: "art", files: ["art/_art.coffee"]
    assert.eq ns.getInspectedObjects(),
      "Neptune.Art":
        namespaceName: "Art"
        namespacePath: "Neptune.Art"
        path: "art"
        parentNamespacePath: "Neptune"
        includeInNamespace: "_art.coffee"

  test "one subdir with a file", ->
    ns = new NamespaceStructure root: "art", files: ["art/foo/bar.coffee"]
    assert.eq ns.getInspectedObjects(),
      'Neptune.Art':
        namespaceName: "Art"
        namespacePath: "Neptune.Art"
        path: "art"
        parentNamespacePath: "Neptune"
        subdirs:
          namespaced:
            Foo: "foo"
      'Neptune.Art.Foo':
        namespaceName: "Foo"
        namespacePath: "Neptune.Art.Foo"
        path: "art/foo"
        parentNamespacePath: "Neptune.Art"
        files:
          namespaced:
            Bar: "bar.coffee"

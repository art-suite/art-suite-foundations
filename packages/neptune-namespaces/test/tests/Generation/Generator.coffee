{Generator, MiniFoundation} = Generation

{log} = MiniFoundation

suite "NeptuneNamespaces.Generation.Basics", ->
  test "basic", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.match generatedFiles["source/Foo/index.coffee"], /File.*require.*\.\/file/
      assert.match generatedFiles["source/Foo/namespace.coffee"], /class Foo/

  test "file comment should be relative to source/Foo's parent", ->
    generator = new Generator root = "/Users/alice/dev/src/MyApp", pretend: true, quiet: true
    generator.generateFromFiles [
        "#{root}/Module.coffee"
        "#{root}/SubNamespace/SubModule.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      for file, contents of generatedFiles
        assert.match contents, "# file: MyApp", file

  test "file name same as parent namespace", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/MyNamespace/my_namespace.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      # log ((v for k, v of generatedFiles).join "\n\n")
      assert.match generatedFiles["source/Foo/MyNamespace/index.coffee"], /includeInNamespace.*my_namespace/

  test "special file names", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/.file1.coffee"
        "source/Foo/Foo.coffee"
        "source/Foo/file4.coffee"
        "source/Foo/0file3.coffee"
        "source/Foo/-file2.coffee"
        "source/Foo/_file5.coffee"
        "source/Foo/aSubmodule/foo.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      # log generatedFiles
      assert.match generatedFiles["source/Foo/index.coffee"],
        ///
        file2
        (.|\n)*

        module.exports .* namespace
        (.|\n)*

        includeInNamespace .* Foo
        (.|\n)*

        addModules
        (.|\n)*

        File5: .* _file5
        (.|\n)*

        File3: .* 0file3
        (.|\n)*

        File4: .* file4
        (.|\n)*

        \nrequire .* aSubmodule
        ///
      # file1 not included
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], /file1/
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/aSubmodule/index.coffee"
        "source/Foo/aSubmodule/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]

  test "subnamespace", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/MyNamespace/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/MyNamespace/index.coffee"
        "source/Foo/MyNamespace/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/MyNamespace/namespace.coffee"], /require.*\.\/namespace/
      assert.match generatedFiles["source/Foo/namespace.coffee"], /require.*neptune-namespaces/
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], "addModules"
      assert.match generatedFiles["source/Foo/index.coffee"], "MyNamespace"

  test ".namespaces are optional", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/.MyNamespace/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/.MyNamespace/index.coffee"
        "source/Foo/.MyNamespace/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/.MyNamespace/namespace.coffee"], /require.*\.\/namespace/
      assert.match generatedFiles["source/Foo/namespace.coffee"], /require.*neptune-namespaces/
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], "addModules"
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], "MyNamespace"


  test "non-dot-namespaces with same-name-dot-file are not optional", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/MyNamespace/file.coffee"
        "source/Foo/.my_namespace.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/MyNamespace/index.coffee"
        "source/Foo/MyNamespace/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/MyNamespace/namespace.coffee"], /require.*\.\/namespace/
      assert.match generatedFiles["source/Foo/namespace.coffee"], /require.*neptune-namespaces/
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], "addModules"
      assert.match generatedFiles["source/Foo/index.coffee"], "MyNamespace"

  test "only file is required if directory and file have same name", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/MyNamespace/file.coffee"
        "source/Foo/my_namespace.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/MyNamespace/index.coffee"
        "source/Foo/MyNamespace/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/MyNamespace/namespace.coffee"], /require.*\.\/namespace/
      assert.match generatedFiles["source/Foo/namespace.coffee"], /require.*neptune-namespaces/
      assert.match generatedFiles["source/Foo/index.coffee"], "addModules"
      assert.doesNotMatch generatedFiles["source/Foo/index.coffee"], /(^|\n)require.*MyNamespace/


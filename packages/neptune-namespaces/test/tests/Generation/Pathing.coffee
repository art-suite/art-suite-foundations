{Generator, MiniFoundation} = require '../StandardImport'

{log} = MiniFoundation

suite "NeptuneNamespaces.Generation.Pathing", ->
  test "pathed explicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.js"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.js"
        "source/Foo/Alpha.Beta/namespace.js"
        "source/Foo/index.js"
        "source/Foo/namespace.js"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.js"], /// addNamespace (.|\n)* Alpha\.Beta (.|\n)* class\ Beta ///
      assert.match generatedFiles["source/Foo/index.js"], /// require.*\./Alpha\.Beta ///
      assert.match generatedFiles["source/Foo/namespace.js"], /// require.*\./Alpha\.Beta ///

  test "pathed implicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha/Beta/file.js"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha/Beta/index.js"
        "source/Foo/Alpha/Beta/namespace.js"
        "source/Foo/Alpha/index.js"
        "source/Foo/Alpha/namespace.js"
        "source/Foo/index.js"
        "source/Foo/namespace.js"
      ]
      assert.match generatedFiles["source/Foo/Alpha/namespace.js"], /// vivifySubnamespace.*Alpha ///

  test "pathed both ways", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/Gamma/file.js"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/Gamma/index.js"
        "source/Foo/Alpha.Beta/Gamma/namespace.js"
        "source/Foo/Alpha.Beta/index.js"
        "source/Foo/Alpha.Beta/namespace.js"
        "source/Foo/index.js"
        "source/Foo/namespace.js"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/Gamma/namespace.js"],  /// require .* '\.\./namespace'     .* addNamespace       (.|\n)* Gamma       ///
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.js"],        /// require .* '\.\./namespace'     .* vivifySubnamespace .* Alpha\.Beta ///
      assert.match generatedFiles["source/Foo/namespace.js"],                   /// require .* 'neptune-namespaces' .* vivifySubnamespace .* Foo ///

  test "pathed explicitly with includeInNamespace", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.js"
        "source/Foo/Alpha.Beta/Beta.js"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.js"
        "source/Foo/Alpha.Beta/namespace.js"
        "source/Foo/index.js"
        "source/Foo/namespace.js"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/index.js"], /// includeInNamespace .* \.\/Beta ///

  test "regression A", ->
    generator = new Generator "test/tests", pretend: true, quiet: true
    generator.generateFromFiles [
        "test/tests/Art.ClassSystem/SingletonClass.caf"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "test/tests/Art.ClassSystem/index.js"
        "test/tests/Art.ClassSystem/namespace.js"
        "test/tests/index.js"
        "test/tests/namespace.js"
      ]
      assert.notMatch generatedFiles["test/tests/Art.ClassSystem/namespace.js"], /// neptune-namespaces ///

  test "regression B", ->
    generator = new Generator "source/Art", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Art/React/React.caf"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Art/React/index.js"
        "source/Art/React/namespace.js"
        "source/Art/index.js"
        "source/Art/namespace.js"
      ]
      assert.match generatedFiles["source/Art/React/namespace.js"], /// addNamespace ///

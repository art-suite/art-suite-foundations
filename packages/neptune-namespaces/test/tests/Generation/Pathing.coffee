{Generator, MiniFoundation} = Generation

{log} = MiniFoundation

suite "NeptuneNamespaces.Generation.Pathing", ->
  test "pathed explicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.coffee"], /// addNamespace .* Alpha\.Beta .* class\ Beta ///
      assert.match generatedFiles["source/Foo/index.coffee"], /// require.*\./Alpha\.Beta ///
      assert.match generatedFiles["source/Foo/namespace.coffee"], /// require.*\./Alpha\.Beta ///

  test "pathed implicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha/Beta/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha/Beta/index.coffee"
        "source/Foo/Alpha/Beta/namespace.coffee"
        "source/Foo/Alpha/index.coffee"
        "source/Foo/Alpha/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha/namespace.coffee"], /// vivifySubnamespace.*Alpha ///

  test "pathed both ways", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/Gamma/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/Gamma/index.coffee"
        "source/Foo/Alpha.Beta/Gamma/namespace.coffee"
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/Gamma/namespace.coffee"],  /// require .* '\.\./namespace'     .* addNamespace       .* Gamma       ///
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.coffee"],        /// require .* '\.\./namespace'     .* vivifySubnamespace .* Alpha\.Beta ///
      assert.match generatedFiles["source/Foo/namespace.coffee"],                   /// require .* 'neptune-namespaces' .* vivifySubnamespace .* Foo ///

  test "pathed explicitly with includeInNamespace", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.coffee"
        "source/Foo/Alpha.Beta/Beta.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/index.coffee"], /// includeInNamespace .* \.\/Beta ///

  test "regression A", ->
    generator = new Generator "test/tests", pretend: true, quiet: true
    generator.generateFromFiles [
        "test/tests/Art.ClassSystem/SingletonClass.caf"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "test/tests/Art.ClassSystem/index.coffee"
        "test/tests/Art.ClassSystem/namespace.coffee"
        "test/tests/index.coffee"
        "test/tests/namespace.coffee"
      ]
      assert.notMatch generatedFiles["test/tests/Art.ClassSystem/namespace.coffee"], /// neptune-namespaces ///

  test "regression B", ->
    generator = new Generator "source/Art", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Art/React/React.caf"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Art/React/index.coffee"
        "source/Art/React/namespace.coffee"
        "source/Art/index.coffee"
        "source/Art/namespace.coffee"
      ]
      assert.match generatedFiles["source/Art/React/namespace.coffee"], /// addNamespace ///

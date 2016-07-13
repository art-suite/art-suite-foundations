Generator = require "../generator"
{assert} = require 'chai'
{log} = require '../src/Generation/MiniFoundation'

suite "NeptuneNamespaces.Generator", ->
  test "basic", ->
    generator = new Generator "root", pretend: true, quiet: true
    generator.generateFromFiles [
        "root/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.match generatedFiles["root/index.coffee"], /File.*require.*\.\/file/
      assert.match generatedFiles["root/namespace.coffee"], /class Root/

  test "special file names", ->
    generator = new Generator "root", pretend: true, quiet: true
    generator.generateFromFiles [
        "root/.file1.coffee"
        "root/root.coffee"
        "root/file3.coffee"
        "root/0file4.coffee"
        "root/-file2.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      # correct order: -file2, file3, 0file4
      assert.match generatedFiles["root/index.coffee"], ///
        \./-file2
        (.|\n)*
        includeInNamespace.*\./root
        (.|\n)*
        addModules
        (.|\n)*
        \./file3
        (.|\n)*
        \./0file4
        ///
      # file1 not included
      assert.ok !generatedFiles["root/index.coffee"].match /file1/

  test "subnamespace", ->
    generator = new Generator "root", pretend: true, quiet: true
    generator.generateFromFiles [
        "root/my namespace/file.coffee"
        "root/file2.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.match generatedFiles["root/my namespace/namespace.coffee"], /require.*\.\/namespace/
      assert.match generatedFiles["root/namespace.coffee"], /require.*neptune-namespaces/

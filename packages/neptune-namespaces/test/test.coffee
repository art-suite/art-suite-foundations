Generator = require "../src/generator"
{upperCamelCase} = require '../src/tools'
{assert} = require 'chai'

suite "NeptuneNamespaces.Generator", ->
  for dir in ["my_module", "my_module_directories", "my_module_with_both"]
    do (dir) ->
      root = "test/sorting_semantics/#{dir}"
      relative = "./sorting_semantics/#{dir}"
      modName = upperCamelCase dir
      test "generate #{root} -> #{modName}", ->
        Generator.generate root, force: true, silent: true
        .then ->
          mod = require relative
          assert.equal Neptune[modName], mod
          assert.ok Neptune.isNamespace mod

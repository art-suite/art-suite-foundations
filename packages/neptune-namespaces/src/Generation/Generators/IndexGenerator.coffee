{
  compactFlatten
  log
} = require '../MiniFoundation'
{
  generatedByString
  neptuneBaseClass
} = require '../Helper'

Path = require "path"
requirePath = (filenameWithExtension) ->
  "./" + Path.parse(filenameWithExtension).name

module.exports = class NamespaceGenerator
  @generate: (namespace) ->
    {path, includeInNamespace} = namespace

    contents = compactFlatten [
      generatedByString
      "# file: #{path}/index.coffee"
      ""
      "require '#{requirePath name}'" for name in namespace.getAllNonNamespacedRequires().sort()
      "(module.exports = require './namespace')"
      includeInNamespace && ".includeInNamespace(require '#{requirePath includeInNamespace}')"
      ".addModules"
      "  #{name}: require '#{requirePath map[name]}'" for name in Object.keys(map = namespace.fileSet.namespaced).sort()
      "  #{name}: require '#{requirePath map[name]}'" for name in Object.keys(map = namespace.subdirSet.namespaced).sort()
    ]

    contents.join "\n"

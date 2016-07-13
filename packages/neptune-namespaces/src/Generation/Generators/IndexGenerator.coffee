{
  compactFlatten
  log
  getRelativePath
  pad
} = require '../MiniFoundation'
{
  generatedByString
  neptuneBaseClass
} = require '../Helper'
{max} = Math

Path = require "path"
requirePath = (filenameWithExtension) ->
  "./" + Path.parse(filenameWithExtension).name

alignColumns = ->
  listOfLists = []
  listOfLists = listOfLists.concat el for el in arguments

  maxLengths = []
  for line in listOfLists
    for cell, i in line
      maxLengths[i] = max (maxLengths[i] || 0), cell.length

  maxLengths[maxLengths - 1] = 0 # don't pad last column

  for line in listOfLists
    paddedCells = for cell, i in line
      pad cell, maxLengths[i]
    paddedCells.join ' '

module.exports = class NamespaceGenerator
  @generate: (namespace, relativeFilePath) ->
    {path, includeInNamespace} = namespace

    generateNamespacedList = (set) ->
      items = for namespaceName, path of set.namespaced
        namespaceName: namespaceName
        path: path

      for item in items.sort((a, b) -> a.path.localeCompare b.path)
        [" ", item.namespaceName + ":", "require '#{requirePath item.path}'"]

    contents = compactFlatten [
      generatedByString
      "# file: #{relativeFilePath || path}/index.coffee"
      ""
      "require '#{requirePath name}'" for name in namespace.getAllNonNamespacedRequires().sort()
      "module.exports = require './namespace'"
      includeInNamespace && ".includeInNamespace require '#{requirePath includeInNamespace}'"
      ".addModules"
      alignColumns(
        generateNamespacedList namespace.fileSet
        generateNamespacedList namespace.subdirSet
      )
    ]

    contents.join "\n"

{
  upperCamelCase, peek, pushIfUnique, log, merge
  arrayWithoutLast
  fileWithoutExtension
} = require "./MiniFoundation"

{
  globalNamespaceName
  shouldIgnore
  shouldNotNamespace
  shouldIncludeInNamespace
  toFilename
  toModuleName
} = require './Helper'
{basename} = require 'path'

class NamespaceSet
  constructor: (items) ->
    @ignored = []
    @notNamespaced = []
    @namespaced = {}

    @addItem item for item in items || []

  containsNormalizedItemName: (itemName) -> !!@namespaced[toModuleName itemName]

  addItem: (item) ->
    itemName =  peek item.split '/'
    return @ignored.push "#{basename item}" if shouldIgnore itemName
    return @notNamespaced.push "#{basename item}" if shouldNotNamespace itemName
    @namespaced[toModuleName itemName] = item

  getInspectedObjects: ->
    out = {}
    out.namespaced = @namespaced if Object.keys(@namespaced).length > 0
    out.notNamespaced = @notNamespaced if @notNamespaced.length > 0
    out.ignored = @ignored if @ignored.length > 0
    out

class Namespace
  constructor: ({@namespaceName, @path, @namespacePath, @files, @subdirs, @parent, @includeInNamespace})->
    @fileSet = new NamespaceSet @files
    @subdirSet = new NamespaceSet @subdirs

  getInspectedObjects: ->
    out =
      namespaceName: @namespaceName
      namespacePath: @namespacePath
      path: @path
    out.includeInNamespace = @includeInNamespace if @includeInNamespace
    out.parentNamespacePath = @parent.namespacePath if @parent
    out.files = @fileSet.getInspectedObjects() if @files?.length > 0
    out.subdirs = @subdirSet.getInspectedObjects() if @subdirs?.length > 0
    out

  getModuleNames: ->
    Object.keys(@fileSet.namespaced).sort()

  getAllNonNamespacedRequires: ->
    out = []
    @fileSet && (out.push v for v in @fileSet.notNamespaced)
    @subdirSet && (out.push v for v in @subdirSet.notNamespaced)
    out.sort()

  getAllNamespacedSubdirRequires: ->
    out = []
    if @subdirSet
      for k, v of @subdirSet.namespaced when !@fileSet.containsNormalizedItemName k
        out.push v
    out.sort()

class NamespaceDir
  constructor: ({pathArray, @path, parent}) ->
    @files = []
    @subdirs = []
    @namespaceName = upperCamelCase peek pathArray
    @namespacePath = "#{parent?.namespacePath || globalNamespaceName}.#{@namespaceName}"

  addFile: (file)     ->
    file && if shouldIncludeInNamespace file, @namespaceName
      @includeInNamespace = file
    else
      pushIfUnique @files, file
  addSubdir: (subdir) -> subdir && pushIfUnique @subdirs, subdir

module.exports = class NamespaceStructure

  @shouldIgnore: shouldIgnore
  @shouldNotNamespace: shouldNotNamespace

  constructor: ({@root, @files}) ->
    @_dirs = {}
    @_addSourcePathArrayAndFile file: file for file in @files
    @namespaces = @_generateNamespaces @_dirs

  getInspectedObjects: ->
    out = {}
    for k, namespace of @namespaces
      out[k] = namespace.getInspectedObjects()
    out

  # out: namespacePath
  _addSourcePathArrayAndFile: ({pathArray, file, subdir}) ->
    unless pathArray
      fileWithPathArray = file.split "/"
      pathArray = arrayWithoutLast fileWithPathArray
      file = peek fileWithPathArray
    path = pathArray.join '/'

    dir = @_dirs[path] ||= new NamespaceDir
      pathArray: pathArray
      path: path
      parent: if @root != path
        @_addSourcePathArrayAndFile
          pathArray:  arrayWithoutLast pathArray
          subdir:     peek pathArray

    dir.addFile file
    dir.addSubdir subdir

    dir

  _generateNamespaces: (dirs) ->
    namespaces = {}
    globalNamespace = new Namespace
      namespaceName: globalNamespaceName
      path: 'neptune-namespaces'
      namespacePath: globalNamespaceName

    for name, info of dirs
      namespaces[info.namespacePath] = new Namespace info
    for namespacePath, namespace of namespaces
      parentNamespacePath = arrayWithoutLast(namespacePath.split('.')).join '.'
      namespace.parent = namespaces[parentNamespacePath] || globalNamespace

    namespaces

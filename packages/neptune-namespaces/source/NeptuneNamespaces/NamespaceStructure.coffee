{
  upperCamelCase, peek, pushIfUnique, log, merge
  arrayWithoutLast
  fileWithoutExtension
} = require "./MiniFoundation"

{
  globalNamespaceName
  shouldNotAutoload
  shouldNotNamespace
  shouldIncludeInNamespace
  toFilename
  toModuleName
} = require './Helper'
{basename} = require 'path'

{isPathedNamespace} = Neptune

class NamespaceSet
  ###
  @length: number of non-ignored items
  ###
  constructor: (items) ->
    @ignored = []
    @notNamespaced = []
    @namespaced = {}

    @length = 0
    if items
      @addItem item for item in items

  containsNormalizedItemName: (itemName) -> !!@namespaced[toModuleName itemName]

  addItem: (item) ->
    itemName =  peek item.split '/'
    return @ignored.push "#{basename item}" if shouldNotAutoload itemName
    @length++
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
    @isPathNamespace = @fileSet.length == 0 && !@includeInNamespace && @subdirSet.length <= 1
    @isPackageNamespace = !@isPathNamespace

  getIsRootPackageNamespace: ->
    !@parent || !@parent.getIsInsidePackageNamespace()

  getIsInsidePackageNamespace: ->
    @isPackageNamespace || @parent?.getIsInsidePackageNamespace()

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

normalizeNamespaceName = (name) ->
  if isPathedNamespace name
    parts = for part in name.split '.' when part.length > 0
      upperCamelCase part
    parts.join '.'
  else
    upperCamelCase name

class NamespaceDir
  constructor: ({namespaceName, @path, @parent}) ->
    @files = []
    @subdirs = []
    @namespaceName = normalizeNamespaceName namespaceName
    @namespacePath = "#{@parent?.namespacePath || globalNamespaceName}.#{@namespaceName}"

  addFile: (file)     ->
    file && if shouldIncludeInNamespace file, @namespaceName
      @includeInNamespace = file
    else
      pushIfUnique @files, file

  addSubdir: (subdir) -> subdir && pushIfUnique @subdirs, subdir

  getInspectedObjects: ->
    "#{@path}": {
      @namespaceName, @namespacePath, @files, @subdirs
      parent: @parent?.namespacePath
    }

module.exports = class NamespaceStructure

  @shouldNotAutoload: shouldNotAutoload
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
      [pathArray..., file] = file.split "/"
    path = pathArray.join '/'

    [namespacePath..., namespaceName] = pathArray

    dir = @_dirs[path] ||= new NamespaceDir
      namespaceName: namespaceName
      path: path
      parent: if @root != path
        @_addSourcePathArrayAndFile
          pathArray:  namespacePath
          subdir:     namespaceName

    dir.addFile file
    dir.addSubdir subdir

    dir

  addNamespace = (namespaces, dir) ->
    if dir
      namespaces[dir.namespacePath] ||= new Namespace merge dir,
        parent: addNamespace namespaces, dir.parent
    else
      new Namespace
        namespaceName:  globalNamespaceName
        namespacePath:  globalNamespaceName
        path:           'neptune-namespaces'

  _generateNamespaces: (dirs) ->
    namespaces = {}

    for name, dir of dirs
      addNamespace namespaces, dir

    namespaces

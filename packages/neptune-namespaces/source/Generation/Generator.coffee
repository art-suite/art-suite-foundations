colors = require "colors"
glob = require "glob-promise"
fsp = require "fs-extra"
{
  upperCamelCase, peek, pushIfUnique, indent, pad, withoutTrailingSlash, promiseSequence, merge
  getRelativePath
  getAbsPath
  getParentPath
  log
} = require "./MiniFoundation"
Path = require "path"
NamespaceStructure = require './NamespaceStructure'

{IndexGenerator, NamespaceGenerator} = require './Generators'

module.exports = class Generator

  @standardRoots: [
    "source"
    "test"
    "performance"
    "src"
    "perf"
  ]

  @generate: (globRoot, options = {}) ->
    glob globRoot
    .then (roots) ->
      filePromiseGenerators = for root in roots when fsp.statSync(root).isDirectory()
        do (root) ->
          ->
            generator = new Generator root, options

            generator.generate()
            .then ->
              Generator.watch root, merge options, lastGenerator: generator if options.watch
            .catch (error) ->
              log "Error: ".red, foo

      promiseSequence filePromiseGenerators

  @watch: (root, options = {}) ->
    @log root, "watching...".green
    generator = null
    fsp.watch root, {persistent: options.persistent, recursive: true}, (event, filename) =>
      if event != "change" && !filename.match /(^|\/)(namespace|index)\.coffee$/
        @log root, "watch event: ".bold.yellow + "#{event} #{filename.yellow}"

        options.lastGenerator = generator if generator
        generator = new Generator root, options
        generator.generate()

  @log: (root, args...) ->
    root = Path.basename root
    args = args.join()
    args = args.split "\n"
    for arg in args
      console.log if arg == ""
        ""
      else
        "Neptune.#{upperCamelCase root}: ".grey + arg

  log: (args...) -> Generator.log @getRelativePath(), args.join() unless @quiet

  constructor: (@root, options = {}) ->
    throw new Error "root required" unless typeof @root == "string"
    {@pretend, @verbose, @lastGenerator, @force, @quiet} = options
    @rootPrefix = getParentPath @root

  generateHelper: ({name, code}) ->
    if @pretend
      @log "\ngenerated: #{@getRelativePath(name).yellow}"
      @log indent code.green
    @generatedFiles[name] = code

  getRelativePath: (path = @root) ->
    getRelativePath @rootPrefix, path

  writeFiles: ->
    filesWritten = 0
    filesTotal = 0
    promises = for name, code of @generatedFiles
      do (name, code) =>
        filesTotal++
        if @lastGenerator?.generatedFiles[name] == code
          @log "no change: #{@getRelativePath(name)}".grey if @verbose
        else
          p = if fsp.existsSync name
            fsp.readFile name, 'utf8'
          else Promise.resolve null

          p.then (currentContents) =>
            if @force || currentContents != code
              filesWritten++
              @log "writing: #{@getRelativePath(name).yellow}"
              fsp.writeFile name, code
            # else
              # @log "already current: #{@getRelativePath(name)}".grey if @verbose
          , (error) =>
            @log "error reading #{@getRelativePath(name)}".red, error

    Promise.all promises
    .then =>
      @log "#{filesTotal - filesWritten}/#{filesTotal} files current" if filesWritten < filesTotal
      @log "#{filesWritten}/#{filesTotal} files #{if @lastGenerator then 'changed' else 'written'}" if filesWritten > 0

  generateFiles: (namespaces) ->
    @generatedFiles = {}
    for namespacePath, namespace of namespaces
      {path} = namespace

      @generateHelper
        name: "#{path}/namespace.coffee"
        code: NamespaceGenerator.generate namespace, @getRelativePath path

      @generateHelper
        name: "#{path}/index.coffee"
        code: IndexGenerator.generate namespace, @getRelativePath path

  showNamespaceStructure: (namespaces) ->
    @log "generating namespace structure:"
    @log "  Neptune".yellow
    for namespacePath in Object.keys(namespaces).sort()
      @log "  #{namespacePath}".yellow
      for moduleName in namespaces[namespacePath].getModuleNames()
        @log "    #{moduleName}".grey

  ###
  Input is a list of files with fill paths
  ###
  generateFromFiles: (files) =>
    {namespaces} = nss = new NamespaceStructure root: @root, files: files

    @showNamespaceStructure namespaces if @verbose

    @generateFiles namespaces

    if @pretend
      Promise.resolve
        generatedFiles: @generatedFiles
        namespaces: namespaces
    else
      @writeFiles()

  generate: ->
    @log "\nscanning root: #{@root.yellow}" if @verbose
    glob "#{@root}/**/*.{js,coffee,caffeine,caf}", dot: true
    .then (files) =>
      if files.length == 0
        error = "no .coffee files found"
        @log error.yellow.bold
      else
        @generateFromFiles files

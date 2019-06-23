colors = require "colors"
glob = require "glob-promise"
fsp = require "fs-extra"
CoffeeScript = require 'coffee-script'
{
  upperCamelCase, peek, pushIfUnique, indent, pad, withoutTrailingSlash, promiseSequence, merge
  getRelativePath
  getAbsPath
  getParentPath
  log
  normalizeDirectory
} = require "./MiniFoundation"
Path = require "path"
{generatedByStringBare} = require './Helper'
NamespaceStructure = require './NamespaceStructure'

{IndexGenerator, NamespaceGenerator} = require './Generators'
{getPackageRoot} = require './PackageRoot'

module.exports = class Generator

  @standardRoots: [
    "source"
    "test"
    "performance"
    "src"
    "perf"
  ]

  @findVersionFile: (path) ->
    if packageRoot = getPackageRoot path
      Path.join packageRoot, "package.json"

  @generate: (globRoot, options = {}) ->
    Klass = @
    glob globRoot
    .then (roots) ->
      filePromiseGenerators = for root in roots when fsp.statSync(root).isDirectory()
        do (root) ->
          ->
            generator = new Klass root, options

            generator.generate()
            .then ->
              Generator.watch root, merge options, lastGenerator: generator if options.watch
            .catch (error) ->
              log error.stack

      promiseSequence filePromiseGenerators

  @watch: (root, options = {}) ->
    @infoLog root, "watching...".green
    generator = null
    fsp.watch root, {persistent: options.persistent, recursive: true}, (event, filename) =>
      if event != "change" && !filename.match /(^|\/)(namespace|index)\.(coffee|js)$/
        @infoLog root, "watch event: ".bold.yellow + "#{event} #{filename.yellow}"

        options.lastGenerator = generator if generator
        generator = new Generator root, options
        generator.generate()

  @infoLog: (root, args...) ->
    root = Path.basename root
    args = args.join()
    args = args.split "\n"
    for arg in args
      console.log if arg == ""
        ""
      else
        "Neptune.#{upperCamelCase root}: ".grey + arg

  constructor: (@root, options = {}) ->
    throw new Error "root required" unless typeof @root == "string"
    {@pretend, @verbose, @lastGenerator, @force, @quiet, @js, @cleanup} = options
    @versionFile = Generator.findVersionFile @root

    @rootPrefix = getParentPath @root

  generateHelper: ({path, relativePath, name, code}) ->
    if @pretend
      @infoLog "\ngenerated: #{@getLogFileString(name).yellow}"
      @infoLog indent code.green

    if @js
      name = name.replace /\.coffee$/, ".js"
      code = """
        // #{generatedByStringBare}
        // file: #{relativePath}/#{name}

        #{CoffeeScript.compile code, bare: true}
      """

    else
      code = """
        # #{generatedByStringBare}
        # file: #{relativePath}/#{name}

        #{code}
      """

    @generatedFiles["#{path}/#{name}"] = code

  getRelativePath: (path = @root) ->
    getRelativePath @rootPrefix, path

  getLogFileString: (file) ->
    getRelativePath process.cwd(), file

  writeFiles: ->
    filesWritten = 0
    filesTotal = 0
    promises = for name, code of @generatedFiles
      do (name, code) =>
        filesTotal++
        if @lastGenerator?.generatedFiles[name] == code
          @infoLog "no change: #{@getLogFileString(name)}".grey if @verbose
        else
          p = if fsp.existsSync name
            fsp.readFile name, 'utf8'
          else Promise.resolve null

          p.then (currentContents) =>
            if @force || currentContents != code
              filesWritten++
              @infoLog "writing: #{@getLogFileString(name).yellow}"
              fsp.writeFile name, code
          , (error) =>
            @infoLog "error reading #{@getLogFileString(name)}".red, error

    Promise.all promises
    .then =>
      @infoLog "#{filesTotal - filesWritten}/#{filesTotal} files current" if filesWritten < filesTotal
      @infoLog "#{filesWritten}/#{filesTotal} files #{if @lastGenerator then 'changed' else 'written'}" if filesWritten > 0

  generateFiles: (namespaces) ->
    @generatedFiles = {}
    for namespacePath, namespace of namespaces
      {path} = namespace

      relativePath = @getRelativePath path

      if @versionFile
        relativeVersionFile = Path.relative normalizeDirectory(path), @versionFile

      @generateHelper
        relativePath: relativePath
        path: path
        name: "namespace.coffee"
        code: NamespaceGenerator.generate namespace, relativeVersionFile

      @generateHelper
        relativePath: relativePath
        path: path
        name: "index.coffee"
        code: IndexGenerator.generate namespace

  showNamespaceStructure: (namespaces) ->
    @infoLog "generating namespace structure:"
    @infoLog "  Neptune".yellow
    for namespacePath in Object.keys(namespaces).sort()
      @infoLog "  #{namespacePath}".yellow
      for moduleName in namespaces[namespacePath].getModuleNames()
        @infoLog "    #{moduleName}".grey

  ###
    Input is a list of files with fill paths
  ###
  generateFromFiles: (files) ->
    if @cleanup
      regex = ///($|\/)(index|namespace).#{if @js then "coffee" else "js"}$///
      for file in files when regex.test file
        contents = (fsp.readFileSync file).toString()
        if /generated by neptune namespaces/i.test contents
          log "rm #{file}"
          fsp.unlinkSync file

    {namespaces} = nss = new NamespaceStructure root: @root, files: files

    @showNamespaceStructure namespaces if @verbose

    @generateFiles namespaces

    if @pretend
      Promise.resolve
        generatedFiles: @generatedFiles
        namespaces: namespaces
    else
      @writeFiles()

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

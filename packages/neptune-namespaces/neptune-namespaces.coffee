colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
fs = require 'fs'
Generator = require "./src/Generation/Generator"
{version} = require './package.json'


{
  upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash
  promiseSequence
} = require "./src/Generation/MiniFoundation"

standardRoots = ["src/*", "test/*", "perf/*"]

NomNom = require "nomnom"

{root, watch, verbose, force, quiet, std} = opts = NomNom
.option 'root',
  abbr: 'r'
  list: true
  help: 'list one or more --root arguments'
.option 'watch',
  abbr: 'w'
  flag: true
  help: 'stay running, watch for changes, and automatically update'
.option 'verbose',
  abbr: 'v'
  flag: true
  help: 'enable verbose output'
.option 'quiet',
  abbr: 'q'
  flag: true
  help: 'suppress all output'
.option 'force',
  abbr: 'f'
  flag: true
  help: 'overwrite all index and namespace files'
.option 'std',
  flag: true
  help: "include the standard roots: #{standardRoots.join ', '}"
.option 'version',
  flag: true
  help: "show current version and exit"
.help """
  neptune-namespaces version: #{version}

  Generates 'namespace.coffee' and 'index.coffee' files to bind each specified --root
  to the global Neptune namespace at runtime.
  """
.nocolors()
.parse()

root ||= []
root = root.concat standardRoots if std

{max} = Math

if opts.version
  console.log version
  process.exit()

run = (targetPaths) ->

  todoList = for targetPath in targetPaths
    do (targetPath) ->
      targetPath = withoutTrailingSlash targetPath

      doWork = ->
        Generator.generate targetPath,
          verbose: verbose
          force: force
          quiet: quiet
          watch: watch
          persistent: true

      doWork

  promiseSequence todoList

console.error "no roots specified (run with -h for help)" if root.length == 0
run root

colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
fs = require 'fs'
Generator = require "./src/generator"

{
  upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash
  promiseSequence
} = require "./src/tools"

NomNom = require "nomnom"

{root, watch, verbose, force, silent} = opts = NomNom
.option 'root',
  abbr: 'r'
  list: true
  required: true
  help: 'list one or more --root arguments'
.option 'watch',
  abbr: 'w'
  flag: true
  help: 'stay running, watch for changes, and automatically update'
.option 'verbose',
  abbr: 'v'
  flag: true
  help: 'enable verbose output'
.option 'silent',
  abbr: 's'
  flag: true
  help: 'suppress all output'
.option 'force',
  abbr: 'f'
  flag: true
  help: 'overwrite all index and namespace files'
.help """
  Generates 'namespace.coffee' and 'index.coffee' files to bind each specified --root
  to the global Neptune namespace at runtime.
  """
.nocolors()
.parse()

{max} = Math

run = (targetPaths) ->

  todoList = for targetPath in targetPaths
    do (targetPath) ->
      targetPath = withoutTrailingSlash targetPath

      doWork = ->
        Generator.generate targetPath,
          verbose: verbose
          force: force
          silent: silent
          watch: watch
          persistent: true

      doWork

  promiseSequence todoList

run root

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

{root, watch, prefix} = opts = NomNom
.option 'watch',
  abbr: 'w'
  flag: true
  help: 'stay running, watch for changes, and automatically update'
.option 'root',
  abbr: 'r'
  list: true
  required: true
  help: 'list one or more --root arguments'
.option 'prefix',
  abbr: 'p'
  help: 'path to prefix to every root'
.help """
  Generates 'namespace.coffee' and 'index.coffee' files to bind each specified --root
  to the global Neptune namespace at runtime.
  """
.nocolors()
.parse()

{max} = Math

# log "opts", opts

# [nodePath, neptuneNamespacesPath, targetPaths...] = process.argv

run = (targetPaths) ->

  todoList = for targetPath in targetPaths
    do (targetPath) ->
      targetPath = withoutTrailingSlash targetPath

      doWork = ->
        Generator.generate targetPath, verbose: true, watch: watch, rootPrefix:prefix

      doWork

  promiseSequence todoList

run root

{
  log, withoutTrailingSlash, promiseSequence, compactFlatten
} = require "./source/NeptuneNamespaces/MiniFoundation"

Generator = require "./source/NeptuneNamespaces/Generator"
{version} = require './package.json'

standardRoots = for root in Generator.standardRoots
  "#{root}/*"

Commander = require "commander"
.version version
.usage  '[options] <root ...>'
.option '-r, --root',       'list one or more --root arguments'
.option '-w, --watch',      'stay running, watch for changes, and automatically update'
.option '-v, --verbose',    'enable verbose output'
.option '-q, --quiet',      'suppress all output'
.option '-j, --js',         'output .js files instead of .coffee (experimental)'
.option '--cleanup',        'cleanup .coffee files if generating .js or visa-versa'
.option '-f, --force',      'overwrite all index and namespace files'
.option '-s, --std',        "include the standard roots: #{standardRoots.join ', '}"
.on "--help", ->
  console.log "
    Generates 'namespace.(js|coffee)' and 'index.(js|coffee)' files to bind each specified root
    to the global Neptune namespace at runtime.
    \n\nRun with -v to see everything NN is doing.
    "
.parse process.argv

run = (targetPaths, {watch, verbose, quiet, force, js, cleanup}) ->
  if verbose
    console.log """
      neptune-namespaces (#{version})

      roots: #{targetPaths.join ', '}
      """
    log {watch, verbose, quiet, force, js, cleanup}

  todoList = for targetPath in targetPaths
    do (targetPath) ->
      targetPath = withoutTrailingSlash targetPath

      doWork = ->
        Generator.generate targetPath, {
          verbose
          force
          quiet
          watch
          cleanup
          js
          persistent: true
        }

      doWork

  promiseSequence todoList


root = Commander.args || []
root = root.concat standardRoots if Commander.std
if root.length == 0
  console.error "no roots specified (run with -h for help)"
else
  run root, Commander

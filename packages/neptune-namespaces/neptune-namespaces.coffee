
{
  log, withoutTrailingSlash, promiseSequence, compactFlatten
} = require "./src/Generation/MiniFoundation"

Generator = require "./src/Generation/Generator"
{version} = require './package.json'

standardRoots = ["src/*", "test/*", "perf/*"]

Commander = require "commander"
.version version
.usage  '[options] <root ...>'
.option '-r, --root',     'list one or more --root arguments'
.option '-w, --watch',    'stay running, watch for changes, and automatically update'
.option '-v, --verbose',  'enable verbose output'
.option '-q, --quiet',    'suppress all output'
.option '-f, --force',    'overwrite all index and namespace files'
.option '-s, --std',      "include the standard roots: #{standardRoots.join ', '}"
.on "--help", ->
  console.log "
    Generates 'namespace.coffee' and 'index.coffee' files to bind each specified root
    to the global Neptune namespace at runtime.
    \n\nRun with -v to see everything NN is doing.
    "
.parse process.argv

run = (targetPaths, {watch, verbose, quiet, force}) ->
  if verbose
    console.log """
      neptune-namespaces (#{version})

      roots: #{targetPaths.join ', '}
      """
    verbose && log verbose: true
    force   && log force:   true
    quiet   && log quiet:   true
    watch   && log watch:   true

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


root = Commander.args || []
root = root.concat standardRoots if Commander.std
if root.length == 0
  console.error "no roots specified (run with -h for help)"
else
  run root, Commander

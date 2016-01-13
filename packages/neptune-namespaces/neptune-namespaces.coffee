colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
Generator = require "./src/generator"

{
  upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash
} = require "./src/tools"

{max} = Math

[nodePath, neptineicPath, targetPaths...] = process.argv

unless targetPaths.length >= 1
  log "usage: #{neptineicPath} target_paths"
  return

promiseGeneratingFunctions = for targetPath in targetPaths
  do (targetPath) ->
    targetPath = withoutTrailingSlash targetPath

    ->
      console.log "\nscanning root: #{targetPath.yellow}"
      new Generator(targetPath, verbose:true).generate()

promiseGeneratingFunctions = promiseGeneratingFunctions.reverse()
resolveNextPromise = ->
  if promiseGeneratingFunctions.length > 0
    promiseGeneratingFunctions.pop()()
    .then -> resolveNextPromise()

resolveNextPromise()

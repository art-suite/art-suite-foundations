colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
Generator = require "./generator"
{upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash} = require "./tools"
{max} = Math

[nodePath, neptineicPath, targetPath] = process.argv
log
  nodePath: nodePath
  neptineicPath: neptineicPath
  targetPath: targetPath

unless targetPath
  log "usage: #{neptineicPath} target_path"
  return

generator = new Generator(withoutTrailingSlash targetPath).generate()

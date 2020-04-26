path = require 'path'
fs = require 'fs-extra'

{normalizeDirectory} = require './MiniFoundation'

module.exports = class PackageRoot

  @getPackageRoot: (directory) =>
    @_findRootR normalizeDirectory directory

  ######################
  # PRIVATE
  ######################

  # map from directories to their known-packageRoots
  @_knownPackageRoots: {}

  ###
  IN:
    directory: must be a normalized string pointing at an actual directory
  OUT:
    string representing the first parent directory that contains package.json
    OR false if none found
  ###
  @_findRootR: (directory) ->
    if knownSourceRoot = @_knownPackageRoots[directory]
      knownSourceRoot
    else
      if fs.existsSync path.join directory, "package.json"
        directory
      else if directory != "/" && directory.length > 0
        @_knownPackageRoots[directory] = @_findRootR path.dirname directory
      else
        false

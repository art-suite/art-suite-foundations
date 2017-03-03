{
  defineModule
  isPlainObject
  deepMerge
  consistentJsonStringify
} = require 'art-standard-lib'

fs = require 'fs'

{BaseClass} = require 'art-class-system'

{StandardPackageJson} = require './Data'

defineModule module, class ConfigurePackageJson extends BaseClass

  ###
  IN:
  ###
  @get: (options) =>
    deepMerge StandardPackageJson.get(), options

  ###
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
  ###
  @write: (packageConfig) =>
    contents = consistentJsonStringify packageConfig, "  "
    fs.writeFileSync "package.json", contents + "\n"

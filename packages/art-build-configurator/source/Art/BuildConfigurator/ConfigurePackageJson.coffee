{
  defineModule
  isPlainObject
  deepMerge
  consistentJsonStringify
} = require 'art-standard-lib'

fs = require 'fs'
path = require 'path'

{BaseClass} = require 'art-class-system'

{StandardPackageJson} = require './Data'

BuildConfigurator = require './namespace'

defineModule module, class ConfigurePackageJson extends BaseClass
  @outFileName: "package.json"

  ###
  IN:
  ###
  @get: (options) =>
    deepMerge StandardPackageJson.get(), options

  ###
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
  ###
  @write: (npmRoot, packageConfig) =>
    contents = consistentJsonStringify packageConfig, "  "
    BuildConfigurator.updateFile path.join(npmRoot, "package.json"), contents + "\n"

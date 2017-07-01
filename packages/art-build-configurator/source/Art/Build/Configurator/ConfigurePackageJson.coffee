{
  defineModule
  isPlainObject
  deepMerge
  consistentJsonStringify
  isFunction
} = require 'art-standard-lib'

fs = require 'fs'
path = require 'path'

{BaseClass} = require 'art-class-system'

{StandardPackageJson} = require './Data'

Configurator = require './namespace'

defineModule module, class ConfigurePackageJson extends BaseClass
  @outFileName: "package.json"

  ###
  IN:
  ###
  @get: (npmRoot, abcConfig) =>
    if isFunction npmConfig = abcConfig.npm
      npmConfig StandardPackageJson.get abcConfig
    else
      deepMerge StandardPackageJson.get(abcConfig), npmConfig

  ###
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
  ###
  @writeConfig: (npmRoot, abcConfig) =>
    packageConfig = @get npmRoot, abcConfig
    contents = consistentJsonStringify packageConfig, "  "
    Configurator.updateFile path.join(npmRoot, "package.json"), contents + "\n"

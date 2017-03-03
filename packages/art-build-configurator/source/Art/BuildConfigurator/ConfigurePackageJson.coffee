{
  defineModule
  isPlainObject
  deepMerge
} = require 'art-standard-lib'

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
    log "generating and writing: ".gray + "package.json".green

    contents = consistentJsonStringify packageConfig, "  "
    fs.writeFileSync "package.json", contents + "\n"

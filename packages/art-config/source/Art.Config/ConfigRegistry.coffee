{
  defineModule
  log
  Promise
  inspect
  formattedInspect
  merge
  deepMerge
  mergeInto
  parseQuery
  pushIfNotPresent
  isPlainObject
  isString
  upperCamelCase
  expandPathedProperties
  clone
  compactFlatten
} = require 'art-standard-lib'
{BaseObject} = require 'art-class-system'

defineModule module, class ConfigRegistry extends BaseObject

  @configurables: []
  @configs: {}

  @registerConfig: (name, config) =>
    throw new Error "config must be a plain object" unless isPlainObject config
    @configs[name] = config

  @registerConfigurable: (configurable) => pushIfNotPresent @configurables, configurable

  @configure: (args...) ->
    console.error "DEPRICATED: use Art.Config.configure"
    Neptune.Art.Config.configure args...
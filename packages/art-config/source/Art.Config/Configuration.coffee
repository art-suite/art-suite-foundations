{
  defineModule
  log
  merge
  mergeInto
  deepMerge
} = require 'art-standard-lib'
{BaseObject} = require 'art-class-system'

ConfigRegistry = require './ConfigRegistry'

defineModule module, class Configuration extends BaseObject
  @abstractClass()

  @register: -> ConfigRegistry.registerConfig @getName(), @getProps()

  @postCreateConcreteClass: ({hotReloaded}) ->
    if superclass = @getSuperclass()
      @deepMergeInDefaults superclass.getConcretePrototypeProperties()
    @register()
    ConfigRegistry.reload() if hotReloaded
    super

  @getProps: ->
    @getConcretePrototypeProperties()

  @deepMergeInDefaults: (defaults) ->
    mergeInto @prototype, deepMerge defaults, @getProps()

  @deepMergeInConfig: (config) ->
    mergeInto @prototype, deepMerge @getProps(), config

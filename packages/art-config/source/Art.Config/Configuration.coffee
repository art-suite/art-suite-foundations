{
  defineModule
  log
  merge
} = require 'art-standard-lib'
{BaseObject} = require 'art-class-system'

ConfigRegistry = require './ConfigRegistry'

defineModule module, class Configuration extends BaseObject
  @abstractClass()

  @register: -> ConfigRegistry.registerConfig @getName(), @getProps()

  @postCreateConcreteClass: ({hotReloaded}) ->
    @register()
    ConfigRegistry.reload() if hotReloaded
    super

  @getProps: ->
    @getConcretePrototypeProperties()

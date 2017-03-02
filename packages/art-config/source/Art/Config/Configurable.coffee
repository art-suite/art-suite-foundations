{
  defineModule
  log
  merge
  isPlainObject
  mergeInto
} = require 'art-standard-lib'
{BaseObject} = require 'art-class-system'

ConfigRegistry = require './ConfigRegistry'

#####################################
###

TO USE:
1) Inherit from Configurable and
2) OPTIONAL: call @defaults to set configuration defaults
3) OPTIONAL, override one of:
  @configure
  @preprocessConfig
  @configured

###
#####################################

defineModule module, class Configurable extends BaseObject
  @abstractClass()

  # call this to initialize default values for your config
  @defaults: (defaults...) ->
    @defaultConfig = merge defaults...

  @getDefaults: -> @defaultConfig

  # reset @config
  # NOTE: Intentionally doesn't replace @config. Instead, it leaves all direct references to @config intact. It just updates the @config object.
  @reset: ->
    if @config
      delete @config[k] for k, v of @config
    else
      @config = {}
    mergeInto @config, @defaultConfig if @defaultConfig
    @namespace?.config = @config
    @config

  @getInspectedObjects: ->
    "#{@getConfigurationPath().join '.'}": @config

  # updates config
  @configure: (config) ->
    @reset()
    for k, v of @getPathedConfiguration config when k.match /^[^A-Z]/
      @config[k] = v

  #####################################
  # OVERRIDES
  #####################################

  # called after @config has been updated
  @configured: ->

  #####################################
  # HELPERS
  #####################################

  @getConfigurationPath: ->
    [_Neptune, path..., _Configurable] = @getNamespacePath().split '.'
    path

  @getPathedConfiguration: (globalConfig) ->
    globalConfig = globalConfig?[el] for el in @getConfigurationPath()
    globalConfig

  #####################################
  # PRIVATE
  #####################################
  @_register: ->
    @reset()
    ConfigRegistry.registerConfigurable @

  @postCreateConcreteClass: ({hotReloaded}) ->
    if hotReloaded
      ConfigRegistry.reload()
    else
      # only register once
      @_register()
    super

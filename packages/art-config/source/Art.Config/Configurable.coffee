{
  defineModule
  log
  merge
  isPlainObject
  mergeInto
  deepMerge
  isPlainObject
  ErrorWithInfo
  neq
} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

namespace = require './namespace'

ConfigRegistry = require './ConfigRegistry'

{EventedMixin} = require 'art-events'

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

defineModule module, class Configurable extends EventedMixin BaseClass
  @abstractClass()

  @declarable
    defaults: {}

  # backward compatibility
  @getDefaultConfig: -> @getDefaults()

  # NOTE: writing our own extendConfig instead of BaseClass's extendProperty
  # BECAUSE: we want a working, inheritable, classGetter - but CoffeeScript 1.x can't do that.
  # SO, instead, we actually name the prop @config, not @_config
  # Would work in: ES6 / CoffeeScript 2.0 / CaffeineScript - we just need to update EVERYTHING :)
  @extendConfig: ->
    if @hasOwnProperty "config"
      @config
    else
      @config = {}

  # reset @config
  # NOTE: Intentionally doesn't replace @config. Instead, it leaves all direct references to @config intact. It just updates the @config object.
  @reset: ->
    defaults = @getDefaults()
    config = @extendConfig()
    delete config[k] for k, v of config when !defaults[k]?
    mergeInto config, defaults

    if @namespace != namespace
      @namespace?.config ||= config
    config

  @getInspectedObjects: ->
    "#{@getConfigurationPathString()}": @config

  @getPathedDefaultConfig: ->
    "#{@getConfigurationPathString()}": @getDefaults()

  # updates config
  @configure: (globalConfig) ->
    globalConfig.verbose && log Configurable: "#{@getConfigurationPathString()}": @getConfigurationFromPath globalConfig
    mergeInto @reset(), @getConfigurationFromPath globalConfig

  @getConfigSave: ->
    out = {}
    defaults = @getDefaults()
    count = 0
    for k, v of @config ? {} when  neq v, defaults[k]
      count++
      out[k] = v

    if count > 0
      "#{@getConfigurationPathString()}": out

  #####################################
  # OVERRIDES
  #####################################

  @on: (a...) ->
    @getSingleton().on a...

  # called after @config has been updated
  @configured: ->
    @getSingleton().handleEvent "configured", {@config}

  #####################################
  # HELPERS
  #####################################

  @getConfigurationPath: ->
    [_Neptune, path..., _Configurable] = @getNamespacePath().split '.'
    path

  @getConfigurationPathString: -> @getConfigurationPath().join '.'

  @getConfigurationFromPath: (config, path = @getConfigurationPath()) ->
    config = config?[el] for el in path
    config

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

    # TODO: just return @config with any @hasOwnProperty values bound and mixed in
    # WHY?: Because, then we can just do &MyConfig.configValue - much nicer than &MyConfig.config.configValue
    # @config.config = @config # for backward compatability

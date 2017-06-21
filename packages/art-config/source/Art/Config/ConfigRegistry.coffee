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
} = require 'art-standard-lib'
{BaseObject} = require 'art-class-system'

defineModule module, class ConfigRegistry extends BaseObject

  @artConfigName: defaultArtConfigName = "Development"
  @artConfig: {}

  @configurables: []
  @configs: {}

  @registerConfig: (name, config) =>
    throw new Error "config must be a plain object" unless isPlainObject config
    @configs[name] = config

  @registerConfigurable: (configurable) => pushIfNotPresent @configurables, configurable

  ###
  IN: configureOptions:
    artConfigName: string
      can be passed in:
        as an argument
        via process.env
        via the browser query string

      default: "Development"

      EFFECT:
        @artConfigName =
          externalEnvironment.artConfigName ||
          artConfigName

    artConfig: JSON string OR plain object structure
      can be passed in:
        as an argument
        via process.env
        via the browser query string

      default: {}

      EFFECT:
        mergeInto @artConfig, deepMerge
          @configs[artConfigName]
          global.artConfig
          artConfig
          externalEnvironment.artConfig

    IF artConfig IS NOT SET:
      artConfig is set to a clone of configureOptions with artConfigName removed.

  EFFECTS:
    callback @artConfig for callback in @configurables

  Note the priority order of artConfig sources:

  Priority:
    #1. externalEnvironment.artConfig
    #2. the artConfig passed into configure


  EXAMPLES:
    # artConfig = verbose: true
    ConfigRegistry.configure
      verbose: true

    # artConfig = verbose: true
    # artConfigName = "Production"
    ConfigRegistry.configure
      artConfigName: "Production"
      verbose: true

    # artConfig = verbose: true
    # artConfigName = "Production"
    ConfigRegistry.configure
      artConfigName: "Production"
      artConfig: verbose: true

  TEST INPUTS: the second and third inputs are env and
    queryString, and are only there as mocks for testing.
  ###
  @configure: (configureOptions...) =>
    {artConfigName: artConfigNameArgument, artConfig: artConfigArgument, __testEnv, __testQueryString} = @configureOptions = deepMerge configureOptions...

    unless artConfigArgument
      artConfigArgument = merge @configureOptions
      delete artConfigArgument.artConfigName

    artConfigGlobal = global.artConfig

    externalEnvironment = @getExternalEnvironment __testEnv, __testQueryString

    @artConfigName = externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
    @artConfigName = @normalizeArtConfigName @artConfigName

    throw new Error "no config registered with name: #{@artConfigName}" if @artConfigName && !@configs[@artConfigName]

    @artConfigName ||= defaultArtConfigName

    Neptune.Art.configName = @artConfigName
    Neptune.Art.config     = @artConfig

    @resetCurrentConfig()

    for conf in [
        @configs[@artConfigName]
        artConfigGlobal
        artConfigArgument
        externalEnvironment.artConfig
      ]
      expandPathedProperties conf, @artConfig

    @artConfigInput = clone @artConfig

    {verbose} = @artConfig
    if verbose
      log "------------- ConfigRegistry: inputs"
      log
        ConfigRegistry:
          configs: Object.keys @configs
          configurables: (c.namespacePath for c in @configurables)

          artConfigName:
            algorithm: "select first non-null"
            inputs:
              fromExternalEnvironment: externalEnvironment.artConfigName
              fromArguments:           artConfigNameArgument
              default:                 defaultArtConfigName

          artConfig:
            algorithm: "deep merge all, last has priority"
            inputs:
              selected_config:      "#{@artConfigName}":   @configs[@artConfigName]
              "global.artConfig":   artConfigGlobal
              arguments:            artConfigArgument
              environment:          externalEnvironment.artConfig

    verbose && log "------------- ConfigRegistry: combined config"
    verbose && log ConfigRegistry: {@artConfigName, @artConfig}

    verbose && log "------------- ConfigRegistry: configuring Configurables..."
    @_configureAllConfigurables()

    verbose && log "------------- ConfigRegistry: Configurables configured"
    if verbose
      for {name, config} in @configurables
        log "#{name}": config

    verbose && log "------------- ConfigRegistry: done"

  @resetCurrentConfig: => delete @artConfig[k] for k, v of @artConfig

  @reload: => @configure @configureOptions

  ###############################
  # HELPERS
  ###############################
  # arguments are there for testing purposes
  @getExternalEnvironment: (env = global.process?.env, queryString = global.location?.search)->
    {artConfig, artConfigName} = externalEnvironment = merge env, parseQuery queryString

    artConfig = if isPlainObject artConfig
      artConfig
    else if isString artConfig
      try
        JSON.parse artConfig
      catch e
        log.error """

          Invalid 'artConfig' from externalEnvironment. Must be valid JSON.

          #{formattedInspect externalEnvironment: externalEnvironment}

          artConfig: #{formattedInspect artConfig}

          error: #{e}

          """
        null

    {artConfig, artConfigName}

  ###
  normalized:
    map standard aliases (dev and prod)
    upperCamelCase
  ###
  @normalizeArtConfigName: (artConfigName)->
    switch artConfigName
      when "dev" then "Development"
      when "prod" then "Production"
      else artConfigName && upperCamelCase artConfigName

  ###############################
  # PRIVATE
  ###############################
  @_configureAllConfigurables: ->
    configurable.configure @artConfig for configurable in @configurables

    for configurable in @configurables
      configurable.configured()


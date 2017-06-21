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
    log "ConfigRegistry#configure start..."
    {artConfigName: artConfigNameArgument, artConfig: artConfigArgument, __testEnv, __testQueryString} = @configureOptions = deepMerge configureOptions...

    externalEnvironment = @getExternalEnvironment __testEnv, __testQueryString

    @artConfigName = externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
    @artConfigName = @normalizeArtConfigName @artConfigName

    throw new Error "no config registered with name: #{@artConfigName}" if @artConfigName && !@configs[@artConfigName]

    @artConfigName ||= defaultArtConfigName

    log "ConfigRegistry#configure here..."
    log ConfigRegistry: configure: setGlobals:
      "Neptune.Art.configName": @artConfigName
      "Neptune.Art.config":     @artConfig

    Neptune.Art.configName = @artConfigName
    Neptune.Art.config     = @artConfig

    @resetCurrentConfig()

    for conf in compactFlatten [
        # Configurables' defaultConfigs
        configurable.getPathedDefaultConfig() for configurable in @configurables

        # Config selected by artConfigName
        @configs[@artConfigName]

        # Config from global.artConfig
        global.artConfig

        # Config passed into this function's params: artConfig: {}
        artConfigArgument

        # Config from the environment ('artConfig' from: BROWSER: query-string, NODE: shell environment)
        externalEnvironment.artConfig
      ]
      expandPathedProperties conf, @artConfig

    {verbose} = @artConfig
    if verbose
      log "------------- ConfigRegistry: inputs"
      log
        ConfigRegistry:
          configNames: Object.keys @configs
          configurables: (c.namespacePath for c in @configurables)

          setConfigName:
            algorithm: "select LAST non-null"
            inputs:
              defaultArtConfigName:         defaultArtConfigName
              "global.artConfigName":       global.artConfigName
              "arguments.artConfigName":    artConfigNameArgument
              "environment.artConfigName":  externalEnvironment.artConfigName

          setConfig:
            algorithm: "deep, pathed merge-all, LAST has priority"
            inputs:
              defaultConfigs:
                configurable.getPathedDefaultConfig() for configurable in @configurables
              "configs.#{@artConfigName}":  @configs[@artConfigName]
              "global.artConfig":           global.artConfig
              "arguments.artConfig":        artConfigArgument
              "environment.artConfig":      externalEnvironment.artConfig

    verbose && log "------------- ConfigRegistry: configuring Configurables..."
    @_configureAllConfigurables()

    verbose && log "------------- ConfigRegistry: configured"
    verbose && log Art: configName: @artConfigName, config: @artConfig
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
    @_notifyConfigurablesConfigured()

  @_notifyConfigurablesConfigured: ->
    for configurable in @configurables
      configurable.configured()


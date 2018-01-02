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
{BaseClass} = require 'art-class-system'
ConfigRegistry = require './ConfigRegistry'
{normalizeArtConfigName, getExternalEnvironment} = require './Lib'
ArtConfig = require './namespace'

defineModule module, class Main extends BaseClass

  @classGetter
    artConfigName:  -> ArtConfig.configName
    artConfig:      -> ArtConfig.config

  ###
  IN: configureOptions:
    artConfigName: string
      can be passed in:
        as an argument
        via process.env
        via the browser query string

      default: "Development"

      EFFECT:
        ArtConfig.configName =
          externalEnvironment.artConfigName ||
          artConfigName

    artConfig: JSON string OR plain object structure
      can be passed in:
        as an argument
        via process.env
        via the browser query string

      default: {}

      EFFECT:
        mergeInto ArtConfig.config, deepMerge
          ConfigRegistry.configs[artConfigName]
          global.artConfig
          artConfig
          externalEnvironment.artConfig

  EFFECTS:
    callback @artConfig for callback in ConfigRegistry.configurables

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
    {artConfigName: artConfigNameArgument, artConfig: artConfigArgument, __testEnv} = @configureOptions = deepMerge configureOptions...

    externalEnvironment = getExternalEnvironment __testEnv

    ArtConfig.configName = if normalizeArtConfigName externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
      configName = normalizeArtConfigName externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
      if configName && !ConfigRegistry.configs[configName]
        throw new Error "no config registered with name: #{configName}"
      configName
    else
      ArtConfig.defaultArtConfigName

    @resetCurrentConfig()

    for conf in compactFlatten [
        # Configurables' defaultConfigs
        configurable.getPathedDefaultConfig() for configurable in ConfigRegistry.configurables

        # Config selected by artConfigName
        ConfigRegistry.configs[@artConfigName]

        # Config from global.artConfig
        global.artConfig

        # Config passed into this function's params: artConfig: {}
        artConfigArgument

        # Config from the environment ('artConfig' from: BROWSER: query-string, NODE: shell environment)
        externalEnvironment.artConfig
      ]
      expandPathedProperties conf, @artConfig

    {verbose} = @artConfig
    verbose ||= @configureOptions?.verbose
    if verbose
      log "------------- ConfigRegistry: inputs"
      log
        ConfigRegistry:
          configNames: Object.keys ConfigRegistry.configs
          configurables: (c.namespacePath for c in ConfigRegistry.configurables)

          setConfigName:
            algorithm: "select LAST non-null"
            inputs:
              defaultArtConfigName:         ArtConfig.defaultArtConfigName
              "global.artConfigName":       global.artConfigName
              "arguments.artConfigName":    artConfigNameArgument
              "environment.artConfigName":  externalEnvironment.artConfigName

          setConfig:
            algorithm: "deep, pathed merge-all, LAST has priority"
            inputs:
              defaultConfigs:
                configurable.getPathedDefaultConfig() for configurable in ConfigRegistry.configurables
              "configs.#{@artConfigName}":  ConfigRegistry.configs[@artConfigName]
              "global.artConfig":           global.artConfig
              "arguments.artConfig":        artConfigArgument
              "environment.artConfig":      externalEnvironment.artConfig

      log "------------- ConfigRegistry: configuring Configurables..."
    @_configureAllConfigurables()

    if verbose
      log "------------- ConfigRegistry: configured"
      log Art: configName: @artConfigName, config: @artConfig
      log "------------- ConfigRegistry: done"

  @resetCurrentConfig: => delete @artConfig[k] for k, v of @artConfig

  @reload: => @configure @configureOptions

  ###############################
  # PRIVATE
  ###############################
  @_configureAllConfigurables: ->
    configurable.configure @artConfig for configurable in ConfigRegistry.configurables
    @_notifyConfigurablesConfigured()

  @_notifyConfigurablesConfigured: ->
    for configurable in ConfigRegistry.configurables
      configurable.configured()


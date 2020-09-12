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
ConfigRegistry = require './ConfigRegistry'
{normalizeArtConfigName, getExternalEnvironment} = require './Lib'

defineModule module, class Main

  @getArtConfigName       : getArtConfigName        = -> Neptune.Art.Config.configName
  @getArtConfig           : getArtConfig            = -> Neptune.Art.Config.config
  @getDefaultArtConfigName: getDefaultArtConfigName = -> Neptune.Art.Config.defaultArtConfigName

  ### getArtConfigSave
    OUT: artConfig, but only the non-default values
  ###
  @getArtConfigSave: ->
    out = {}
    for configurable in ConfigRegistry.configurables
      if saveConfig = configurable.getConfigSave()
        mergeInto out, saveConfig

    out

  setArtConfigName        = (name) -> Neptune.Art.Config.configName = name
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

    onConfig: (config) ->
      gets called as soon as config completes with the final config

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
    {artConfigName: artConfigNameArgument, artConfig: artConfigArgument, __testEnv, onConfig} = @configureOptions = deepMerge configureOptions...

    externalEnvironment = getExternalEnvironment __testEnv
    config = getArtConfig()
    defaultArtConfigName = getDefaultArtConfigName()

    configName = if normalizeArtConfigName externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
      configName = normalizeArtConfigName externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName
      if configName && !ConfigRegistry.configs[configName]
        log.warn "ArtConfig.configure: no config registered with name: '#{configName}'"
      configName
    else
      defaultArtConfigName

    setArtConfigName configName

    @resetCurrentConfig()

    for conf in compactFlatten [
        # Configurables' defaultConfigs
        configurable.getPathedDefaultConfig() for configurable in ConfigRegistry.configurables

        # Config selected by artConfigName
        ConfigRegistry.configs[configName]

        # Config from global.artConfig
        global.artConfig

        # Config passed into this function's params: artConfig: {}
        artConfigArgument

        # Config from the environment ('artConfig' from: BROWSER: query-string, NODE: shell environment)
        externalEnvironment.artConfig
      ]
      expandPathedProperties conf, config

    {verbose} = config
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
              defaultArtConfigName:         defaultArtConfigName
              "global.artConfigName":       global.artConfigName
              "arguments.artConfigName":    artConfigNameArgument
              "environment.artConfigName":  externalEnvironment.artConfigName

          setConfig:
            algorithm: "deep, pathed merge-all, LAST has priority"
            inputs:
              defaultConfigs:
                configurable.getPathedDefaultConfig() for configurable in ConfigRegistry.configurables
              "configs.#{configName}":      ConfigRegistry.configs[configName]
              "global.artConfig":           global.artConfig
              "arguments.artConfig":        artConfigArgument
              "environment.artConfig":      externalEnvironment.artConfig

      log "------------- ConfigRegistry: configuring Configurables..."
    @_configureAllConfigurables()

    if verbose
      log "------------- ConfigRegistry: configured"
      log Art: {configName, config}
      log "------------- ConfigRegistry: done"

    onConfig? config

    global.artConfig      = config
    global.artConfigName  = configName

    config

  @resetCurrentConfig: => config = getArtConfig(); delete config[k] for k, v of config
  @reload:             => @configure @configureOptions

  ###############################
  # PRIVATE
  ###############################
  @_configureAllConfigurables: ->
    configurable.configure getArtConfig() for configurable in ConfigRegistry.configurables
    @_notifyConfigurablesConfigured()

  @_notifyConfigurablesConfigured: ->
    for configurable in ConfigRegistry.configurables
      configurable.configured()


fsp = require 'fs-promise'
path = require 'path'

realRequire = eval 'require'

recursiveCopy = require 'recursive-copy'

ConfigureWebpack = require './ConfigureWebpack'
ConfigurePackageJson = require './ConfigurePackageJson'
{formattedInspect, log, Promise, merge} = require 'art-standard-lib'

module.exports = class BuildConfigurator

  ###
  Ex:
    module.exports =
      npm: # or package:
        description: "my description"

      webpack:
        common: # common config for all targets
        targets: # default: index: {}
          index: # target 'index' specific config
  ###
  @configFileName: "art.build.config.coffee"

  @standardConfigFileContents:
    """
    module.exports =
      webpack:
        common: {}
        targets:
          index: {}

    """

  @registerLoaders: (npmRoot, vivify = false) =>
    file = path.join npmRoot, @registerLoadersFileName
    fsp.exists file
    .then (exists) =>
      if exists
        realRequire file
      else
        if vivify
          @updateFile @registerLoadersFileName, """
            require('coffee-script/register');
            require('caffeine-script/register');
          """
        {}

  @loadConfig: (npmRoot, vivifyConfigFile = false)=>
    file = path.join npmRoot, @configFileName
    fsp.exists file
    .then (exists) =>
      if exists
        realRequire file
      else
        if vivifyConfigFile
          @updateFile @configFileName, @standardConfigFileContents
        {}
    .then (config) =>
      config.npm ||= config.package
      p = if config.npm
        Promise.resolve config.npm
      else
        fsp.exists packageFile = path.join npmRoot, ConfigurePackageJson.outFileName
        .then (exists) =>
          if exists
            realRequire packageFile
          else
            {}
      p.then (finalNpm) =>
        merge config, npm: finalNpm

  @updateFile: (fileName, contents) ->
    if fsp.existsSync fileName
      oldContents = fsp.readFileSync(fileName).toString()

    if oldContents != contents
      log "generating and writing: ".gray + fileName.green
      fsp.writeFileSync fileName, contents
    else
      log "no change: #{fileName}".gray

  @go: (npmRoot, {pretend, configure, init, force}) =>
    log "PRETEND".red if pretend
    Promise.then =>
      if init
        @init {npmRoot, pretend, force} if init
      else
        @loadConfig npmRoot, configure
        .then (abcConfig) =>

          if pretend
            @pretend npmRoot, abcConfig
          else
            @writeConfig npmRoot, abcConfig

  @init: (options) ->
    log init: {options}
    require('./DefaultFiles').getInitStructure(options).write options

  @pretend: (npmRoot, abcConfig) ->
    log formattedInspect
      npm:
        out: "package.json": ConfigurePackageJson.get npmRoot, abcConfig

      webpack:
        configGeneratedOnDemand:  ConfigureWebpack.get npmRoot, abcConfig
        out: "webpack.config.js": ConfigureWebpack.standardWebpackConfigJs
    , color: true

  @writeConfig: (npmRoot, abcConfig) ->
    ConfigurePackageJson.writeConfig npmRoot, abcConfig
    ConfigureWebpack.writeConfig npmRoot, abcConfig

  # TODO: this should call: nn -s
  @getWebpackConfig: (npmRoot) =>
    @loadConfig(npmRoot)
    .then (abcConfig) =>
      ConfigureWebpack.get npmRoot, abcConfig

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

  @go: (npmRoot, {pretend, configure, init}) =>
    log "PRETEND".red if pretend
    Promise.then =>
      @init npmRoot, {pretend} if init
    .then => @loadConfig(npmRoot, configure)
    .then (abcConfig) =>

      if pretend
        @pretend npmRoot, abcConfig
      else
        @writeConfig npmRoot, abcConfig

  @init: (npmRoot, {pretend}) ->
    src = path.join __dirname, "../../../init-files"
    dst = npmRoot
    log "cp standard files from: ".gray + src.green
    recursiveCopy src, dst, dot: true unless pretend

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

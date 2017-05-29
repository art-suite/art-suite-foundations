fsp = require 'fs-extra'
glob = require 'glob-promise'
path = require 'path'

realRequire = eval 'require'

recursiveCopy = require 'recursive-copy'

ConfigureWebpack = require './ConfigureWebpack'
ConfigurePackageJson = require './ConfigurePackageJson'
{formattedInspect, log, Promise, merge, compactFlatten} = require 'art-standard-lib'

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
  @configFilename: "art.build.config.caf"
  @configBasename: "art.build.config"
  @registerLoadersFilename: 'register.js'

  @standardConfigFileContents:
    """
    webpack:
      common: {}
      targets:
        index: {}
    """

  @registerLoaders: (npmRoot, vivify = false) =>
    file = path.join npmRoot, @registerLoadersFilename
    fsp.exists file
    .then (exists) =>
      if exists
        realRequire file
      else
        if vivify
          @updateFile @registerLoadersFilename, """
            require('coffee-script/register');
            require('caffeine-script/register');
          """
        {}

  @loadConfig: (npmRoot, vivifyConfigFile = false)=>
    @registerLoaders npmRoot, vivifyConfigFile
    .then =>
      configFilepath = path.join process.cwd(), @configBasename
      glob configFilepath + "*"
      .then ([found]) =>
        if found
          realRequire configFilepath
        else
          if vivifyConfigFile
            @updateFile @configFilename, @standardConfigFileContents
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
      log "same: #{fileName}".gray

  @go: (npmRoot, options) =>
    {pretend, configure, init, force} = options
    log "PRETEND".red if pretend
    Promise.then =>
      @init npmRoot, options if init
      @loadAndWriteConfig npmRoot, options

  @init: (npmRoot, options) ->
    wrote = compactFlatten require('./DefaultFiles').getDefaultFiles(npmRoot, options).write options
    log "init: wrote #{wrote.length} files"

  @pretend: (npmRoot, abcConfig) ->
    log formattedInspect
      npm:
        out: "package.json": ConfigurePackageJson.get npmRoot, abcConfig

      webpack:
        configGeneratedOnDemand:  ConfigureWebpack.get npmRoot, abcConfig
        out: "webpack.config.js": ConfigureWebpack.standardWebpackConfigJs
    , color: true

  @loadAndWriteConfig: (npmRoot, options) ->
    {pretend, configure} = options

    @loadConfig npmRoot, configure
    .then (abcConfig) =>
      if pretend
        @pretend npmRoot, abcConfig
      else
        @writeConfig npmRoot, abcConfig


  @writeConfig: (npmRoot, abcConfig) ->
    ConfigurePackageJson.writeConfig npmRoot, abcConfig
    ConfigureWebpack.writeConfig npmRoot, abcConfig

  # TODO: this should call: nn -s
  @getWebpackConfig: (npmRoot) =>
    @loadConfig(npmRoot)
    .then (abcConfig) =>
      @writeConfig npmRoot, abcConfig
      ConfigureWebpack.get npmRoot, abcConfig

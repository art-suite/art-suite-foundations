# https://webpack.js.org/concepts/configuration/


nodeExternals = null

{
  defineModule
  isPlainObject
  array
  object
  deepMerge
} = require 'art-standard-lib'

# webpack-merge tries to be "smart" - I prefer deepMerge
webpackMerge = require 'webpack-merge'
webpackNodeExternals = require 'webpack-node-externals'

{BaseClass} = require 'art-class-system'
fs = require 'fs'
path = require 'path'

BuildConfigurator = require './namespace'

{StandardWebpackConfig} = require './Data'

defineModule module, class ConfigureWebpack extends BaseClass

  ###
  IN:
    common: webpack config shared
    targets:
      myEntry: my target's overrides
  ###
  @get: (npmRoot, config = {}) =>
    {common, targets} = config
    standard = StandardWebpackConfig.get npmRoot, config
    baseConfig = webpackMerge standard, common
    targets ||= index: {}
    array @normalizeTargets(targets), (targetConfig) =>
      @normalizeTargetConfig webpackMerge baseConfig, targetConfig

  @normalizeTargetConfig: (targetConfig) ->
    if targetConfig.target == "node"
      targetConfig = webpackMerge
        output: libraryTarget: "commonjs2"

        # this CAN work, but webpackNodeExternals is actually pretty stupid about what files it searches for
        externals: [nodeExternals ||= webpackNodeExternals(modulesFromFile: true)]
        targetConfig

    targetConfig

  @normalizeTargets: (targets = {}) ->
    throw new Error "targets must be an object" unless isPlainObject targets
    object targets, (targetConfig, targetName) ->
      webpackMerge
        entry: "#{targetName}": ["./#{targetName}"]
        targetConfig

  @outFileName: "webpack.config.js"

  @standardWebpackConfigJs: """
    require('coffee-script/register');
    module.exports = require("art-build-configurator").getWebpackConfig(__dirname);

    """

  @write: (npmRoot) =>
    BuildConfigurator.updateFile path.join(npmRoot, @outFileName), @standardWebpackConfigJs

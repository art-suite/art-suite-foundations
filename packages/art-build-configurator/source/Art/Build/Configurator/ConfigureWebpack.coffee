# https://webpack.js.org/concepts/configuration/


nodeExternals = null

{
  defineModule
  isPlainObject
  array
  object
  deepMerge
  log
  compactFlatten
  objectKeyCount
  merge
} = require 'art-standard-lib'

# webpack-merge tries to be "smart" - I prefer deepMerge
webpackMerge = require 'webpack-merge'
webpackNodeExternals = require 'webpack-node-externals'

{BaseClass} = require 'art-class-system'
fs = require 'fs'
path = require 'path'

Configurator = require './namespace'

{StandardWebpackConfig} = require './Data'

defineModule module, class ConfigureWebpack extends BaseClass

  ###
  IN:
    common: webpack config shared
    targets:
      myEntry: my target's overrides
  ###
  @get: (npmRoot, abcConfig = {}) =>
    config = abcConfig.webpack ||= {}
    {common, targets} = config
    standard = StandardWebpackConfig.get npmRoot, abcConfig
    baseConfig = webpackMerge standard, common
    targets ||= index: {}

    # entries with the same config should be clustered together, otherwise weppack
    # will duplicate work - benchmark: 5 highly related entries took 12+ seconds clustered and 56+ seconds unclusered
    # FIRST PASS: cluster the ones that only use the common config.
    entriesWithNoOverrides = null

    compactFlatten array @normalizeTargets(targets), (targetConfig) =>
      if !entriesWithNoOverrides || keys = 1 < objectKeyCount targetConfig
        webpackEntry = webpackMerge baseConfig, targetConfig
        webpackEntry.target ||= "node" if abcConfig.target?.node
        config = @normalizeTargetConfig webpackEntry
        entriesWithNoOverrides = config unless keys
        config
      else
        entriesWithNoOverrides.entry = merge entriesWithNoOverrides.entry, targetConfig.entry
        null


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
        entry: "#{targetName}": "./#{targetName}"
        targetConfig

  @outFileName: "webpack.config.js"

  @standardWebpackConfigJs: StandardWebpackConfig.js

  @writeConfig: (npmRoot) =>
    Configurator.updateFile path.join(npmRoot, @outFileName), @standardWebpackConfigJs

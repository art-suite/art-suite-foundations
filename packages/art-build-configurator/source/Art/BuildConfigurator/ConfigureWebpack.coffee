# https://webpack.js.org/concepts/configuration/

webpackMerge = require 'webpack-merge'

{
  defineModule
  isPlainObject
} = require 'art-standard-lib'

{BaseClass} = require 'art-class-system'

{StandardWebpackConfig} = require './Data'

defineModule module, class ConfigureWebpack extends BaseClass

  ###
  IN:
    common: webpack config shared
    targets:
      myEntry: my target's overrides
  ###
  @get: ({common, targets}) =>
    standard = StandardWebpackConfig.get options
    baseConfig = webpackMerge standard, common
    array @normalizeTargets(targets), (targetConfig) ->
      webpackMerge baseConfig, targetConfig

  @normalizeTargets: (targets = {}) ->
    throw new Error "targets must be an object" unless isPlainObject targets
    object targets, (targetConfig, targetName) ->
      webpackMerge
        entry: "#{targetName}": ["./#{targetName}"]
        targetConfig

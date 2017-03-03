# https://webpack.js.org/concepts/configuration/

webpackMerge = require 'webpack-merge'

{
  defineModule
  isPlainObject
  array
  object
} = require 'art-standard-lib'

{BaseClass} = require 'art-class-system'
fs = require 'fs'
path = require 'path'

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
    array @normalizeTargets(targets), (targetConfig) ->
      webpackMerge baseConfig, targetConfig

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
    fs.writeFileSync path.join(npmRoot, @outFileName), @standardWebpackConfigJs + "\n"


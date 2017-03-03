fsp = require 'fs-promise'
path = require 'path'

realRequire = eval 'require'

ConfigureWebpack = require './ConfigureWebpack'
ConfigurePackageJson = require './ConfigurePackageJson'
{log} = require 'art-standard-lib'

module.exports = class BuildConfigurator

  @configFileName: "art.build.config.coffee"

  @loadConfig: (npmRoot)=>
    file = path.join npmRoot, @configFileName
    fsp.exists file
    .then (exists) =>
      if exists
        realRequire file
      else
        {}

  @go: (npmRoot, {pretend, all}) =>
    @loadConfig(npmRoot)
    .then ({npm, webpack}) ->

      packageConfig = ConfigurePackageJson.get npm
      if pretend
        log "package.json": packageConfig
      else if all
        log "generating and writing: ".gray + ConfigurePackageJson.outFileName.green
        ConfigurePackageJson.write npmRoot, packageConfig

      webpackConfig = ConfigureWebpack.get npmRoot, webpack
      if pretend
        log webpack:
          configGeneratedOnDemand: webpackConfig
          "webpack.config.js": ConfigureWebpack.standardWebpackConfigJs
      else
        log "generating and writing: ".gray + ConfigureWebpack.outFileName.green
        ConfigureWebpack.write npmRoot

  @getWebpackConfig: (npmRoot) =>
    @loadConfig(npmRoot)
    .then ({webpack}) ->
      ConfigureWebpack.get npmRoot, webpack

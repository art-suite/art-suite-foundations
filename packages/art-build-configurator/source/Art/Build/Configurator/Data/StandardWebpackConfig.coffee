CaseSensitivePathsPlugin = require 'case-sensitive-paths-webpack-plugin'
path = require 'path'

module.exports = class StandardWebpackConfig
  @get: (npmRoot, abcConfig) ->
    options = abcConfig.webpack
    {outputPath = "build"} = options

    resolve:
      # prefer .coffee OVER .js
      # in this way we can have index.js files which NODE priorizes over index.coffee
      # These index.js files can point to webpack-compiled builds
      # But the .coffee files point to the individual files, for webpack to make sense out of.
      extensions: [".webpack.js", ".web.js", ".coffee", ".caf", ".caffeine", ".js", ".json"]

    output:
      path:       path.join npmRoot, outputPath
      filename:   "[name].js"

    plugins: [
      new CaseSensitivePathsPlugin
    ]

    module:
      rules: [
        { test: /\.caf(feine)?$/,             use: loader: "caffeine-mc/webpack-loader", options: prettier: true}
        { test: /\.coffee$/,                  use: loader: "coffee-loader" }
        { test: /\.(coffee\.md|litcoffee)$/,  use: loader: "coffee-loader?literate" }
        { test: /\.css$/,                     use: [ 'style-loader', 'css-loader' ] }
        { test: /\.png$/,                     use: loader: "url-loader?limit=100000" }
        { test: /\.jpg$/,                     use: loader: "file-loader" }
        # { test: /\.json$/,                    use: loader: "json-loader" }
      ]

  @js:
    """
    module.exports = require("art-build-configurator").getWebpackConfig(__dirname);

    """
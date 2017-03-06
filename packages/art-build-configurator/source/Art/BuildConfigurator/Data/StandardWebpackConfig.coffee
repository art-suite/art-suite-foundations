CaseSensitivePathsPlugin = require 'case-sensitive-paths-webpack-plugin'
path = require 'path'

module.exports = class StandardWebpackConfig
  @get: (npmRoot, options) ->
    {outputPath = "build"} = options

    resolve:
      # prefer .coffee OVER .js
      # in this way we can have index.js files which NODE priorizes over index.coffee
      # These index.js files can point to webpack-compiled builds
      # But the .coffee files point to the individual files, for webpack to make sense out of.
      extensions: [".webpack.js", ".web.js", ".coffee", ".js", ".json"]

    output:
      path:       path.join npmRoot, outputPath
      filename:   "[name].js"

    plugins: [
      new CaseSensitivePathsPlugin
    ]

    module:
      rules: [
        { test: /\.coffee$/,                  loader: "coffee-loader" }
        { test: /\.(coffee\.md|litcoffee)$/,  loader: "coffee-loader?literate" }
        { test: /\.css$/,                     loader: "style-loader!css-loader" }
        { test: /\.png$/,                     loader: "url-loader?limit=100000" }
        { test: /\.jpg$/,                     loader: "file-loader" }
        { test: /\.json$/,                    loader: "json-loader" }
      ]
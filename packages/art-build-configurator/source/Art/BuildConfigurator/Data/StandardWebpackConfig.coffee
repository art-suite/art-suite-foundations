CaseSensitivePathsPlugin = require 'case-sensitive-paths-webpack-plugin'
path = require 'path'

module.exports = class StandardWebpackConfig
  @get: (npmRoot, options) ->
    {outputPath = "build"} = options

    resolve:
      extensions: [".webpack.js", ".web.js", ".js", ".coffee"]

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
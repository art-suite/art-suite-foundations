###
TODO

1) convert this file into a generic ArtStuite configuration tool.
    webpack.config.js and package.json are just two of the outputs.
    Since webpack.config.js is executed code, we don't need to pre-build it.
    We can still just return the generated config like we do in this file.
    BUT, this file could be executed independently to generate package.json and
    anything else we need to generate.

    Possible new files: caffeine.config.caf

    Mostly this change will be just in-name at first, but I am currently
    running this script more and more just to configure package.json - separate
    from webpack.

2) I want to re-think how I geneate webpack "entries"

  a. There should be a global set of defaults for all entries.
  b. Each entry can override those defaults individually.
  c. Not all entries are built by default. There could be a default set,
      but WEBPACK_ENTRIES should be used to select other entries or entry-sets.
  d. WEBPACK_ENTRIES can be used to define entries not explicitly in the config.
    The defaults are just used.

3) I'd like to create a command-line tool which effectively supersceeds 'npm' for
  my common use-cases:

  a. running defined-scripts should be top-level. Isn't there a RAKE equiv for javascript?
  b. 'myNpm version' should just show the current npm's version
  c. 'myNpm list' should not only list the installed packages and their versions - not the dependency tree
###




{defineModule, inspect, peek, deepMerge, consistentJsonStringify, log, merge} = require 'art-standard-lib'

[executable, firstArg] = process.argv
isWebpackDevServer = !!(executable.match(/\/node$/) &&
  firstArg?.match /webpack-dev-server/)

fs = require 'fs'
path = require "path"
runNeptuneNamespaces = require './standard_neptune_namespace_generators'
CaseSensitivePathsPlugin = require 'case-sensitive-paths-webpack-plugin'

getStandardNpmPackageProps = ->
  license: 'ISC'
  name: peek process.cwd().split("/")
  version: JSON.parse(fs.readFileSync("package.json").toString()).version
  author: "Shane Brinkman-Davis Delamore, Imikimi LLC"
  dependencies:
    'neptune-namespaces':                   '^1.9.1'
    'art-suite-test':                       '^1.0.0'
    'art-standard-lib':                     '^1.0.0'
    'coffee-loader':                        '^0.7.2'
    'coffee-script':                        '^1.12.3'
    'css-loader':                           '^0.26.1'
    'json-loader':                          '^0.5.4'
    'script-loader':                        '^0.7.0'
    'sourcemapped-stacktrace':              '^1.1.5'
    'style-loader':                         '^0.13.1'
    'webpack':                              '^2.2.1'
    'webpack-dev-server':                   '^2.3.0'
    'case-sensitive-paths-webpack-plugin':  '^1.1.4'
  scripts:
    # https://docs.npmjs.com/misc/scripts#description
    # standard life-cycle scripts
    test:     'webpack-dev-server --progress'
    start:    'webpack-dev-server --hot --inline --progress'

    # ArtSuite scripts
    # nodeTest: 'nn -s; mocha -u tdd --compilers coffee:coffee-script/register'
    build:    'webpack --progress'
    # dev:      'nn -s; webpack-dev-server -d --progress'
    # hot:      'nn -s; webpack-dev-server --hot --inline --progress'
    # nn:       'nn -s'

class ArtWebpackConfigurator

  ###################
  # PRIVATE
  ###################
  @_selectEntries: (entries) ->
    if selectedEntries = process.env.WEBPACK_ENTRIES
      log """
        Configuring webpack to build entries selected in: WEBPACK_ENTRIES=#{selectedEntries}
        """
      ret = {}

      for entry in selectedEntries.split ','
        log "  building: #{entry}"
        ret[entry] = entries[entry]
      for k, v of entries
        log "  skipping: #{k}" unless ret[k]
      ret
    else
      log """
        webpack entries: #{Object.keys(entries).join(', ').green}

          NOTE: Webpack is slower if building more entries.
            To only build specific entries, use the following command-line pattern.
            (this is an art-foundation configure-webpack feature, not a webpack-feature)

            $ WEBPACK_ENTRIES=myEntry1,myEntry2 webpack[-dev-server]
        """.gray
      entries

  @_transformEntries: (entries) ->
    entryConfig = {}
    if typeof entries == "string"
      entries = (process.env.WEBPACK_ENTRIES || entries).split /[,\s]+/

    for entry in entries
      entryConfig[entry] = ["./#{entry}"]
    @_selectEntries entryConfig

createPackageJson = (npmPackage) ->
  npmPackage = deepMerge getStandardNpmPackageProps(), npmPackage
  if npmPackage.exclusiveDependencies
    npmPackage.dependencies = npmPackage.exclusiveDependencies
    delete npmPackage.exclusiveDependencies

  contents = consistentJsonStringify npmPackage, "  "
  log "generating and writing: ".gray + "package.json".green
  # log npmPackage: npmPackage, contents: contents
  fs.writeFileSync "package.json", contents + "\n"

createWebpackConfig = (options) ->
  {dirname, outputPath, output, rest, entry, target, externals, resolve} = options
  log "generating and returning: ".gray + "webpack.config".green
  result = merge {
    entry
    target
    externals

    resolve: deepMerge
      extensions: [".webpack.js", ".web.js", ".js", ".coffee"]
      resolve

    output: merge output,
      path: path.join dirname, outputPath
      filename: "[name].js"
      # pathinfo: true - use --output-pathinfo commandline option

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
  }

  if rest.length > 0
    [result].concat rest
  else
    result

module.exports = (options, rest...) ->
  {entries, outputPath, dirname, noNeptuneNamespaces} = options
  dirname ||= process.cwd()
  outputPath ||= "build"
  log "\n-------------------------------------------------------------------------".gray
  log "configuring webpack in: ".gray + dirname.green
  log "-------------------------------------------------------------------------".gray

  entry = ArtWebpackConfigurator._transformEntries entries

  log ""
  if npmPackage = options.package
    createPackageJson npmPackage

  # NOTE: webpack is fine with us returning a promise from config, but webpack-dev-server ISN'T
  # DETAILS: https://github.com/webpack/webpack-dev-server/pull/419
  #   looks like it's in the upcoming 2.0 release, but not in 1.x - which is the current stable release
  # if isWebpackDevServer
  #   runNeptuneNamespaces dirname, isWebpackDevServer
  #   createWebpackConfig webpackOptions
  # else
  p = if noNeptuneNamespaces
    Promise.resolve()
  else
    runNeptuneNamespaces dirname, isWebpackDevServer
  p.then ->
    config = createWebpackConfig merge options,
      dirname: dirname
      outputPath: outputPath
      entry: entry
      rest: rest

    log "ArtFoundation webpackConfig": config
    config

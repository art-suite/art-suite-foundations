fs = require 'fs'
{peek, deepMerge} = require 'art-standard-lib'

module.exports = class StandardPackageJson
  @get: (abcConfig)->
    license:      'ISC'
    name:         peek process.cwd().split("/")
    version:
      if fs.existsSync "package.json"
        JSON.parse(fs.readFileSync("package.json").toString()).version
      else
        "0.0.1"
    author:       "Shane Brinkman-Davis Delamore, Imikimi LLC"
    dependencies: require './StandardDependencies'
    scripts:
      # https://docs.npmjs.com/misc/scripts#description
      # standard life-cycle scripts
      test:
        if abcConfig?.target?.node
          "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"
        else
          'webpack-dev-server --progress'
      start:    'webpack-dev-server --hot --inline --progress'

      testInBrowser:  'webpack-dev-server --progress'

      # ArtSuite scripts
      # nodeTest: 'nn -s; mocha -u tdd --compilers coffee:coffee-script/register'
      build:    'webpack --progress'
      # dev:      'nn -s; webpack-dev-server -d --progress'
      # hot:      'nn -s; webpack-dev-server --hot --inline --progress'
      # nn:       'nn -s'


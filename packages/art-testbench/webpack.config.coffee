module.exports = (require "art-build-configurator/configure_webpack")
  entries: "index"
  target: "node"
  output: libraryTarget: "commonjs2"
  externals: [
    "bluebird/js/browser/bluebird.core"
    "bluebird/js/browser/bluebird.core.min"
  ]

  package:
    description: 'Art-Suite Testing tools. Right now, wrapper & extensions for Mocha & Chai'
    dependencies:
      bluebird:           "^3.4.6"

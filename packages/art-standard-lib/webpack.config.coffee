module.exports = (require "art-build-configurator/configure_webpack")
  entries: "index Core"
  target: "node"
  output: libraryTarget: "commonjs2"
  externals: [
    "bluebird/js/browser/bluebird.core"
    "bluebird/js/browser/bluebird.core.min"
  ]

  package:
    description: 'The Standard Library for JavaScript that aught to be.'
    dependencies:
      bluebird:           "^3.4.6"

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"


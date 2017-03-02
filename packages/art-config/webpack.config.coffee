module.exports = (require "art-build-configurator/configure_webpack")
  entries: "index"

  package:
    description: 'A powerful yet simple tool for configuring all your libraries consistently.'

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"


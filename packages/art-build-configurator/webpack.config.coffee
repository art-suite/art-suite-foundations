module.exports = (require "art-build-configurator/configure_webpack")
  entries: "index"
  package:
    description: 'Tools for configuring npm (package.json) and webpack (webpack.config.js)'
    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

module.exports =
  npm:
    description: 'Tools for configuring npm (package.json) and webpack (webpack.config.js)'
    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"
    bin:
      abc: "./abc"

  webpack:
    common:
      target: "node"
      output: libraryTarget: "commonjs2"
      externals: [
        "fs"
        "fs-promise"
        "detect-node"
        "webpack-merge"
        "bluebird/js/browser/bluebird.core"
        "bluebird/js/browser/bluebird.core.min"
        "path"
      ]
    targets: index: {}
module.exports =
  npm:
    dependencies:
      "webpack-node-externals": "^1.5.4"
      "webpack-merge":          "^3.0.0"
      "fs-promise":             "^1.0.0"
      "colors":                 "^1.1.2"
      "commander":              "^2.9.0"

    description: 'Tools for configuring npm (package.json) and webpack (webpack.config.js)'

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

    bin:
      abc: "./abc"

  webpack:
    common:
      target: "node"

module.exports =
  target:
    node: true
  npm:
    dependencies:
      "webpack-node-externals": "^1.5.4"
      "webpack-merge":          "^3.0.0"
      "fs-promise":             "^1.0.0"
      "colors":                 "^1.1.2"
      "commander":              "^2.9.0"
      "recursive-copy":         "^2.0.6"

    description: 'Tools for configuring npm (package.json) and webpack (webpack.config.js)'

    bin:
      abc: "./abc"

  webpack:
    common: {}

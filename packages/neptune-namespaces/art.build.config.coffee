module.exports =
  package:
    dependencies:
      "colors": "^1.1.2"
      "commander": "^2.9.0"
      "detect-node": "^2.0.3"
      "fs-promise": "^1.0.0"
      "glob-promise": "^3.1.0"

    devDependencies:
      "chai":   "^3.5.0"
      "mocha":  "^2.5.3"

    description: "Generate index.coffee and namespace.coffee files from directory structures",
    bin:
      "neptune-namespaces": "./nn"
      nn:                   "./nn"

    scripts:
      test: "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}

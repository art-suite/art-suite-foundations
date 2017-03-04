module.exports =
  package:
    description: 'Enhances javascript/coffeescript classes with features of more evolved class-based languages primarily through a new BaseClass.'
    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}

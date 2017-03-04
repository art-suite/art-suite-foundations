module.exports =
  package:
    scripts:
      test:     "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}

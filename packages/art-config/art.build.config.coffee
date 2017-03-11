module.exports =
  package:
    description: 'A powerful yet simple tool for configuring all your libraries consistently.'

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}

module.exports =
  package:
    description: "Simplified system of statuses for HTTP and any other network protocol"

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}

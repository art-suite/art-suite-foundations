module.exports =
  package:
    description: 'The Standard Library for JavaScript that aught to be.'
    dependencies:
      bluebird: "^3.4.6"
      dateformat: "^2.0.0"

    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}
      Types: {}

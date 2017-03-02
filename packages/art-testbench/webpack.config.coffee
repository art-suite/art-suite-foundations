module.exports = (require "art-build-configurator/configure_webpack")
  entries: "index"

  package:
    description: 'Art-Suite Testing tools. Right now, wrapper & extensions for Mocha & Chai'
    dependencies:
      chai:   '^3.5.0'
      mocha:  '^3.2.0'

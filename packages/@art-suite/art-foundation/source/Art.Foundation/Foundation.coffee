
module.exports = [

  require 'art-standard-lib'
  require "art-class-system"
  require "art-config"
  require 'art-binary'

  require './ForHumans'
  require "./Tools"

  Epoch:    require('art-epoched-state').EpochClass
  Browser:  require 'art-browser-tools'
  Binary:   require 'art-binary'

  package: _package = require "art-foundation/package.json"
  version: _package.version
]

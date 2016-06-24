Xbd = require './namespace'
XbdTag = require "./xbd_tag"

module.exports = [
  [XbdTag, "fromXbd", "createTagFactories"]
  parse: XbdTag.fromXbd
  package: _package = require "art-xbd/package.json"
  version: _package.version
]

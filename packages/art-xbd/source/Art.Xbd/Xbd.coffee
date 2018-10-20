Xbd = require './namespace'
XbdTag = require "./XbdTag"

module.exports = [
  [XbdTag, "createTagFactories"]
  fromXbd:  XbdTag.fromXbd # DEPRICATED
  parse:    XbdTag.fromXbd # DEPRICATED
  xbd:      XbdTag.fromXbd
  package:  _package = require "art-xbd/package.json"
  version:  _package.version
]

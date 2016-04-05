{createAllClass, select} = require 'art-foundation'

Xbd = require './namespace'
XbdTag = require "./xbd_tag"

createAllClass Xbd,
  select XbdTag, "fromXbd", "createTagFactories"
  parse: XbdTag.fromXbd

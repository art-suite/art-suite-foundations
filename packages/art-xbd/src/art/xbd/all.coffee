{createAllClass, select} = require 'art-foundation'

Xbd = require './namespace'
XbdTag = require "./xbd_tag"

createAllClass Xbd,
  select XbdTag, "fromXbd", "indentString"
  parse: XbdTag.fromXbd

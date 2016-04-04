#new Uint8Array @array_buffer, 0, @array_buffer.byteLength

#dependencies:
# ArrayBuffer
#   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/ArrayBuffer

{Binary} = require 'art-foundation'
stream = Binary.stream

XbdTag = require "./xbd_tag"
XbdDictionary = require "./xbd_dictionary"
module.exports = Xbd = require './namespace'

Xbd.indent = (str, indentStr) ->
  indentStr + str.split("\n").join("\n"+indentStr)

Xbd.toXbd = (object) ->


Xbd.fromXbd =
Xbd.parse = (input)->
  input = stream input

  header_should_match = "SBDXML\x01\x00"
  header = input.read header_should_match.length

  # read each of the 3 dictionaries in order
  tagsd = Xbd.XbdDictionary.parse input, "tag names"
  attrsd  = Xbd.XbdDictionary.parse input, "attribute names"
  valuesd = Xbd.XbdDictionary.parse input, "attribute values"

  # read all tags, return the root-tag
  Xbd.XbdTag.parse input, tagsd, attrsd, valuesd

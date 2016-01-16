#new Uint8Array @array_buffer, 0, @array_buffer.byteLength

#dependencies:
# ArrayBuffer
#   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/ArrayBuffer

{Binary} = require 'art.foundation'
stream = Binary.stream

Tag = require "./tag"
Dictionary = require "./dictionary"
module.exports = Xbd = require './namespace'

Xbd.indent = (str, indentStr) ->
  indentStr + str.split("\n").join("\n"+indentStr)

Xbd.parse = (input)->
  input = stream input

  header_should_match = "SBDXML\x01\x00"
  header = input.read header_should_match.length

  # read each of the 3 dictionaries in order
  tagsd = Xbd.Dictionary.parse input, "tag names"
  attrsd  = Xbd.Dictionary.parse input, "attribute names"
  valuesd = Xbd.Dictionary.parse input, "attribute values"

  # read all tags, return the root-tag
  Xbd.Tag.parse input, tagsd, attrsd, valuesd

#new Uint8Array @array_buffer, 0, @array_buffer.byteLength

#dependencies:
# ArrayBuffer
#   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/ArrayBuffer

{Binary} = require 'art.foundation'
Xbd = require './namespace'
binary = Binary.binary
stream = Binary.stream

module.exports = class Tag

  @parse: (stream, tagsd, attrsd, valuesd) ->
    tag_data = stream.read_asi_string()

    # read tag name
    name = tagsd.read_string(tag_data).toString()

    # read attributes
    attr_data = tag_data.read_asi_string()
    attributes = null
    while !attr_data.done()
      attributes = {} if !attributes
      n = attrsd.read_string(attr_data).toString()
      v = valuesd.read_string attr_data
      attributes[n] = v

    # read sub-tags
    tags = []
    while !tag_data.done()
      subTag = Xbd.Tag.parse tag_data, tagsd, attrsd, valuesd
      tags.push subTag
      tags[subTag.name] ||= subTag

    new Xbd.Tag name, attributes, tags

  # tags can be function for defining subtags
  constructor: (name, attributes = {}, tags = []) ->
    @name = name
    @attributes = attributes
    if tags instanceof Function
      @tags = []
      tags this
    else
      @tags = tags

  add: (args...) ->
    @tags.push new Xbd.Tag(args...)

  # return the first tag with the specified name
  tag: (name) ->
    for tag in @tags
      return tag if tag.name == name
    null

  # func(attr_val, attr_name, tag_name) -> new attr_val
  decode_attribute_values: (func) ->
    for k,v of @attributes
      @attributes[k] = func(v, k, @name)
    for t in @tags
      t.decode_attribute_values(func)

  # XML
  toString: () ->
    @toXml("  ")

  attributesXml: ->
    out = for k, v of @attributes
      "#{k}='#{v}'"
    out.join(" ")

  tagsXml: (indent)->
    out = @tags.map (tag)->
      tag.toXml indent
    Xbd.indent out.join("\n"), indent

  toXml: (indent = "") ->
    attr_xml = ""
    if @attributes && attr_xml = @attributesXml()
      attr_xml = " " + attr_xml

    if @tags.length == 0
      "<#{@name}#{attr_xml}/>"
    else
      "<#{@name}#{attr_xml}>\n#{@tagsXml indent}\n</#{@name}>"

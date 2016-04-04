Foundation = require 'art-foundation'
Xbd = require './namespace'

{Binary, isFunction} = Foundation
binary = Binary.binary
stream = Binary.stream

module.exports = class XbdTag

  @parse: (stream, tagsd, attrsd, valuesd) ->
    tag_data = stream.read_asi_string()

    # read tag name
    name = tagsd.readString(tag_data).toString()

    # read attributes
    attr_data = tag_data.read_asi_string()
    attributes = null
    while !attr_data.done()
      attributes = {} if !attributes
      n = attrsd.readString(attr_data).toString()
      v = valuesd.readString attr_data
      attributes[n] = v

    # read sub-tags
    tags = []
    while !tag_data.done()
      subTag = XbdTag.parse tag_data, tagsd, attrsd, valuesd
      tags.push subTag
      tags[subTag.name] ||= subTag

    new XbdTag name, attributes, tags

  ###
  IN:
    name: string
    attributes: map of keys to string/binary-string values
    tags: array of sub-tags
      or (@) -> null
  ###
  constructor: (name, attributes = {}, tags = []) ->
    @name = name
    @attributes = attributes
    if isFunction tags
      @tags = []
      tags this
    else
      @tags = tags

  add: (args...) ->
    @tags.push new XbdTag(args...)

  # return the first tag with the specified name
  tag: (name) ->
    for tag in @tags
      return tag if tag.name == name
    null

  # func(attr_val, attr_name, tag_name) -> new attr_val
  decodeAttributeValues: (func) ->
    for k,v of @attributes
      @attributes[k] = func(v, k, @name)
    for t in @tags
      t.decodeAttributeValues(func)

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

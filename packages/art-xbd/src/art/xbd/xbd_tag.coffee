Foundation = require 'art-foundation'
Xbd = require './namespace'
XbdDictionary = require './xbd_dictionary'

{Binary, isFunction, BaseObject, log, countKeys} = Foundation
{binary, stream, WriteStream} = Binary

xbdHeader = "SBDXML\x01\x00"

writeXbdHeader = (writeStream) ->
  writeStream.write "SBDXML"
  writeStream.write [1, 0]

module.exports = class XbdTag extends BaseObject
  @indentString: indentString = (str, indentStr) ->
    indentStr + str.split("\n").join("\n"+indentStr)

  ###
  createTagFactories:

  IN: one or more strings containing one or more tag-names: /[a-z0-9_]+/ig
  OUT:
    map from tag-names to:
      -> XbdTag
      IN:
        any sequence:
          plainObjects (which are merged into attributes)
          XbdTags (which become sub-tags)
          or arrays which are flattened

      OUT: XbdTag

  Example:
    {myTag, tagA, tagB} = createTagFactories "myTag tagA tagB"
    rootTag = myTag
      foo: "bar"
      tagA()
      tagA foo: "far"
      tagB fab: "bar"

  ###
  @createTagFactories: ->
    out = {}
    for str in arguments
      for tagName in str.match /[a-z0-9_]+/ig
        do (tagName) ->
          out[tagName] = XbdTag._factoryFactory (attrs, subTags) ->
            new XbdTag tagName, attrs, subTags
    out

  @fromXbd: (input)->
    input = stream input

    header = input.read xbdHeader.length

    # read each of the 3 dictionaries in order
    tagsd =   XbdDictionary.parse input, "tag names"
    attrsd  = XbdDictionary.parse input, "attribute names"
    valuesd = XbdDictionary.parse input, "attribute values"

    # read all tags, return the root-tag
    XbdTag.parse input, tagsd, attrsd, valuesd

  @parse: (stream, tagsd, attrsd, valuesd) ->
    tagData = stream.readAsiString()

    # read tag name
    name = tagsd.readString(tagData).toString()

    # read attributes
    attrData = tagData.readAsiString()
    attributes = null
    while !attrData.done()
      attributes = {} if !attributes
      n = attrsd.readString(attrData).toString()
      v = valuesd.readString attrData
      attributes[n] = v

    # read sub-tags
    tags = []
    while !tagData.done()
      subTag = XbdTag.parse tagData, tagsd, attrsd, valuesd
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
    for k, v of @attributes
      @attributes[k] = func(v, k, @name)
    for t in @tags
      t.decodeAttributeValues(func)

  # XML
  toString: ->
    @toXml "  "

  attributesXml: ->
    out = for k, v of @attributes
      "#{k}='#{v}'"
    out.join " "

  tagsXml: (indent)->
    out = @tags.map (tag)->
      tag.toXml indent
    indentString out.join("\n"), indent

  toPlainObjects: ->
    out = [@name]
    if 0 < countKeys @attributes
      attrs = {}
      attrs[k] = v.toString() for k, v of @attributes
      out.push attrs
    if @tags.length > 0
      out.push (tag.toPlainObjects() for tag in @tags)
    out

  toXml: (indent = "") ->
    attr_xml = ""
    if @attributes && attr_xml = @attributesXml()
      attr_xml = " " + attr_xml

    if @tags.length == 0
      "<#{@name}#{attr_xml}/>"
    else
      "<#{@name}#{attr_xml}>\n#{@tagsXml indent}\n</#{@name}>"

  # returns promise
  toXbd: (
    tagNamesDictionary   = @tagNamesDictionary
    attrNamesDictionary  = @attrNamesDictionary
    attrValuesDictionary = @attrValuesDictionary
  ) ->

    writeXbdHeader writeStream = new WriteStream
    tagNamesDictionary.writeWithPromise writeStream
    .then -> attrNamesDictionary.writeWithPromise writeStream
    .then -> attrValuesDictionary.writeWithPromise writeStream
    .then =>
      @getBinaryStringPromise tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
    .then (binaryString) ->
      writeStream.writeAsiString binaryString
      writeStream.binaryStringPromise

  getAttributesBinaryStringPromise: (attrNamesDictionary, attrValuesDictionary) ->
    writeStream = new WriteStream
    for name, value of @attributes
      writeStream.writeAsi attrNamesDictionary.get name
      writeStream.writeAsi attrValuesDictionary.get value
    writeStream.binaryStringPromise

  writeSubTagsWithPromise: (writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary) ->
    index = 0
    processNext = =>
      if tag = @tags?[index++]
        tag.getBinaryStringPromise tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
        .then (binaryString) ->
          writeStream.writeAsiString binaryString
          processNext()
      else
        Promise.resolve()

    processNext()

  getBinaryStringPromise: (tagNamesDictionary, attrNamesDictionary, attrValuesDictionary)->
    writeStream = new WriteStream

    writeStream.writeAsi tagNamesDictionary.get @name
    @getAttributesBinaryStringPromise attrNamesDictionary, attrValuesDictionary
    .then (attributesBinaryString) =>
      writeStream.writeAsiString attributesBinaryString
      @writeSubTagsWithPromise writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
    .then -> writeStream.binaryStringPromise

  @getter
    xbdPromise: -> @toXbd()
    xml: -> @toXml()
    plainObjects: -> @toPlainObjects()

    tagNamesDictionary: (dictionary = new XbdDictionary [], 'tag names') ->
      dictionary.add @name
      tag.getTagNamesDictionary dictionary for tag in @tags
      dictionary

    attrNamesDictionary: (dictionary = new XbdDictionary [], 'attribute names') ->
      dictionary.add k for k, v of @attributes
      tag.getAttrNamesDictionary dictionary for tag in @tags
      dictionary

    attrValuesDictionary: (dictionary = new XbdDictionary [], 'attribute values') ->
      dictionary.add v for k, v of @attributes
      tag.getAttrValuesDictionary dictionary for tag in @tags
      dictionary

  ###################
  # PRIVATE
  ###################
  deepArgsProcessing = (array, children) ->
    for el in array when el
      if el.constructor == Array
        deepArgsProcessing el, children
      else children.push el
    null

  @_factoryFactory: (factory) ->
    ->
      oneProps = null
      props = null
      children = []

      for el in arguments when el
        switch el.constructor
          when Object
            if oneProps
              props = {}
              props[k] = v for k, v of oneProps
              oneProps = null
            if props
              props[k] = v for k, v of el
            else
              oneProps = el

          when Array
            deepArgsProcessing el, children
          else children.push el

      props ||= oneProps || {}
      factory props, children


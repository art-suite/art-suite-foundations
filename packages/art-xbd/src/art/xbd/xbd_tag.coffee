Foundation = require 'art-foundation'
Xbd = require './namespace'
XbdDictionary = require './xbd_dictionary'

{Binary, isFunction, BaseObject, log, countKeys, upperCamelCase} = Foundation
{binary, stream, WriteStream} = Binary

module.exports = class XbdTag extends BaseObject

  ###########################
  # createTagFactories
  ###########################
  ###
  IN: one or more strings containing one or more tag-names: /[a-z0-9_]+/ig
  OUT:
    map from upperCamelCase(tag-names) to:
      -> XbdTag
      IN:
        any sequence:
          plainObjects (which are merged into attrs)
          XbdTags (which become sub-tags)
          or arrays which are flattened

      OUT: XbdTag

  Example:
    {MyTag, TagA, TagB} = createTagFactories "myTag tagA tagB"
    rootTag = MyTag
      foo: "bar"
      TagA()
      TagA foo: "far"
      TagB fab: "bar"

  ###
  @createTagFactories: ->
    out = {}
    for str in arguments
      for tagName in str.match /[a-z0-9_]+/ig
        do (tagName) ->
          out[upperCamelCase tagName] = XbdTag._factoryFactory (attrs, subTags) ->
            new XbdTag tagName, attrs, subTags
    out

  ###########################
  # fromXbd Binary String
  ###########################
  @fromXbd: (input)->
    input = stream input

    # read and ignore the header
    header = input.read xbdHeader.length

    # read each of the 3 dictionaries in order then
    # read all tags, return the root-tag
    XbdTag._parse input,
      XbdDictionary.parse input, "tag names"
      XbdDictionary.parse input, "attribute names"
      XbdDictionary.parse input, "attribute values"

  ###########################
  # constructor
  ###########################
  ###
  IN:
    name: string
    attrs: map of keys to string/binary-string values
    tags: array of sub-tags
  ###
  constructor: (@name, @attrs = {}, @tags = []) ->

  ###########################
  # toXbd Binary String
  ###########################
  ###
  toXbd
  IN:  inputs are for internal use. Pass in 0 args.
  OUT: promise.then (xbdBinaryString) ->

  Example:

    myRootTag.toXbd()
    .then (binaryString) ->
      binaryString.utf8Array # do something with it

  ###
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
      @_getBinaryStringPromise tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
    .then (binaryString) ->
      writeStream.writeAsiString binaryString
      writeStream.binaryStringPromise

  ###########################
  # Read data
  ###########################

  # return the first tag with the specified name
  tag: (name) ->
    return tag for tag in @tags when tag.name == name
    null

  # XML
  toString: ->
    @toXml "  "

  toPlainObjects: ->
    out = [@name]
    if 0 < countKeys @attrs
      attrs = {}
      attrs[k] = v.toString() for k, v of @attrs
      out.push attrs
    if @tags.length > 0
      out.push (tag.toPlainObjects() for tag in @tags)
    out

  toXml: (indent = "") ->
    attr_xml = ""
    if @attrs && attr_xml = @_attributesXml()
      attr_xml = " " + attr_xml

    if @tags.length == 0
      "<#{@name}#{attr_xml}/>"
    else
      "<#{@name}#{attr_xml}>\n#{@_tagsXml indent}\n</#{@name}>"

  @getter
    xbdPromise: -> @toXbd()
    xml: -> @toXml()
    plainObjects: -> @toPlainObjects()

    tagNamesDictionary: (dictionary = new XbdDictionary [], 'tag names') ->
      dictionary.add @name
      tag.getTagNamesDictionary dictionary for tag in @tags
      dictionary

    attrNamesDictionary: (dictionary = new XbdDictionary [], 'attribute names') ->
      dictionary.add k for k, v of @attrs
      tag.getAttrNamesDictionary dictionary for tag in @tags
      dictionary

    attrValuesDictionary: (dictionary = new XbdDictionary [], 'attribute values') ->
      dictionary.add v for k, v of @attrs
      tag.getAttrValuesDictionary dictionary for tag in @tags
      dictionary

  ###################
  # PRIVATE
  ###################

  xbdHeader = "SBDXML\x01\x00"

  writeXbdHeader = (writeStream) ->
    writeStream.write "SBDXML"
    writeStream.write [1, 0]

  indentString = (str, indentStr) ->
    indentStr + str.split("\n").join("\n"+indentStr)

  deepArgsProcessing = (array, children) ->
    for el in array when el
      if el.constructor == Array
        deepArgsProcessing el, children
      else children.push el
    null

  _attributesXml: ->
    out = for k, v of @attrs
      "#{k}='#{v}'"
    out.join " "

  _tagsXml: (indent)->
    out = @tags.map (tag)->
      tag.toXml indent
    indentString out.join("\n"), indent

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


  _getAttributesBinaryStringPromise: (attrNamesDictionary, attrValuesDictionary) ->
    writeStream = new WriteStream
    for name, value of @attrs
      writeStream.writeAsi attrNamesDictionary.get name
      writeStream.writeAsi attrValuesDictionary.get value
    writeStream.binaryStringPromise

  _writeSubTagsWithPromise: (writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary) ->
    index = 0
    processNext = =>
      if tag = @tags?[index++]
        tag._getBinaryStringPromise tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
        .then (binaryString) ->
          writeStream.writeAsiString binaryString
          processNext()
      else
        Promise.resolve()

    processNext()

  _getBinaryStringPromise: (tagNamesDictionary, attrNamesDictionary, attrValuesDictionary)->
    writeStream = new WriteStream

    writeStream.writeAsi tagNamesDictionary.get @name
    @_getAttributesBinaryStringPromise attrNamesDictionary, attrValuesDictionary
    .then (attributesBinaryString) =>
      writeStream.writeAsiString attributesBinaryString
      @_writeSubTagsWithPromise writeStream, tagNamesDictionary, attrNamesDictionary, attrValuesDictionary
    .then -> writeStream.binaryStringPromise

  @_parse: (stream, tagsd, attrsd, valuesd) ->
    tagData = stream.readAsiString()

    # read tag name
    name = tagsd.readString(tagData).toString()

    # read attrs
    attrData = tagData.readAsiString()
    attrs = null
    while !attrData.done()
      attrs = {} if !attrs
      n = attrsd.readString(attrData).toString()
      v = valuesd.readString attrData
      attrs[n] = v

    # read sub-tags
    tags = []
    while !tagData.done()
      subTag = XbdTag._parse tagData, tagsd, attrsd, valuesd
      tags.push subTag
      tags[subTag.name] ||= subTag

    new XbdTag name, attrs, tags

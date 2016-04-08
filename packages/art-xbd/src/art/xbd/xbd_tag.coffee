Foundation = require 'art-foundation'
Xbd = require './namespace'
XbdDictionary = require './xbd_dictionary'

{
  Binary, isFunction, BaseObject, log, countKeys, upperCamelCase, createObjectTreeFactories
  plainObjectsDeepEq
  inspect
} = Foundation
{binary, stream, WriteStream} = Binary

module.exports = class XbdTag extends BaseObject

  ###########################
  # createTagFactories
  ###########################
  ###
  IN:
    tagNames: string or array of strings which is compactFlattened
      every string is split into tag-names with this pattern: /[a-z0-9_]+/ig
    factoryNameSuffix: DEFAULT: 'Tag'
      Optional suffix for the names of the factories returned.
      Factor names are upperCamelCased from the tag-names and then the suffix is appended.
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
  @createTagFactories: (tagNames, factoryNameSuffix = 'Tag')->
    createObjectTreeFactories tagNames, (tagName, attrs, subTags) ->
      new XbdTag tagName, attrs, subTags
    , factoryNameSuffix

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
  # compare
  ###########################

  inspect: -> @toXml '  '

  eq: (b) ->
    b && plainObjectsDeepEq @plainObjects, b.plainObjects

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
  toXbd: ->
    {tagNamesDictionary, attrNamesDictionary, attrValuesDictionary} = @

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
      out.push tag.toPlainObjects() for tag in @tags
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

  _attributesXml: ->
    out = for k, v of @attrs
      "#{k}='#{v}'"
    out.join " "

  _tagsXml: (indent)->
    out = @tags.map (tag)->
      tag.toXml indent
    indentString out.join("\n"), indent

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

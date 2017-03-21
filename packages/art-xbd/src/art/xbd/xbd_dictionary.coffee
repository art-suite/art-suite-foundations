{log, inspect} = require 'art-standard-lib'
{Binary} = require 'art-foundation'
{binary, WriteStream, stream} = Binary

{BaseClass} = require 'art-class-system'

module.exports = class XbdDictionary extends BaseClass
  @parse: (stream, name) ->
    encodedDictionary = stream.readAsiString()

    lengths = for i in [0...encodedDictionary.readAsi()]
      encodedDictionary.readAsi()

    strings = for len in lengths
      encodedDictionary.read len

    new XbdDictionary strings, name

  constructor: (@strings, @name) ->

  ###
  IN: string: any legal input to binary()
  OUT: index/id for string
  EFFECT:
    string = binary string
    strings was added OR, if already present, nothing changed
  ###
  add: (string) ->
    string = binary string
    if 0 <= index = @_indexOf string
      index
    else
      @strings.push string
      @strings.length

  ###
  IN: string: any legal input to binary()
    NOTE: string is converted to a BinaryString for comparisions
  OUT: returns index of first match in @strings
  ###
  get: (string) ->
    string = binary string
    if 0 <= index = @_indexOf string
      index
    else
      throw new Error "string not found in dictionary: #{inspect string}"

  # reads an ASI id from string and returns the dictionary string for it
  readString: (stream) ->
    id = stream.readAsi()
    string = @strings[id]
    throw "string id(#{id}) not in #{@name} dictionary. keys = '#{Object.keys(@strings)}'" if !string
    string

  @getter
    binaryStringPromise: ->
      writeStream = new WriteStream
      normalizedStrings = @_getNormalizeStrings()
      writeStream.writeAsi normalizedStrings.length
      writeStream.writeAsi s.length for s in normalizedStrings
      writeStream.write string for string in normalizedStrings
      writeStream.binaryStringPromise

  writeWithPromise: (writeStream) ->
    @binaryStringPromise.then (binaryString) ->
      writeStream.writeAsiString binaryString

  ####################
  # PRIVATE
  ####################
  _getNormalizeStrings: ->
    binary s for s in @strings

  _indexOf: (binaryString) ->
    return i for s, i in @strings when s.eq binaryString
    return -1


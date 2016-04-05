{Binary, BaseObject} = require 'art-foundation'
{binary, WriteStream, stream} = Binary

module.exports = class XbdDictionary extends BaseObject
  @parse: (stream, name) ->
    encodedDictionary = stream.readAsiString()
    numEntries = encodedDictionary.readAsi()
    lengths = []
    while numEntries--
      lengths.push encodedDictionary.readAsi()

    strings = lengths.map (len) ->
      encodedDictionary.read(len)

    new XbdDictionary strings, name

  constructor: (strings, name) ->
    @strings = strings
    @name = name

  add: (string) ->
    if 0 <= index = @strings.indexOf string
      index
    else
      @strings.push string
      @strings.length

  get: (string) ->
    if 0 <= index = @strings.indexOf string
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
      writeStream.writeAsi @strings.length
      writeStream.writeAsiString string for string in @strings
      writeStream.binaryStringPromise

  writeWithPromise: (writeStream) ->
    @binaryStringPromise.then (binaryString) ->
      writeStream.writeAsiString binaryString

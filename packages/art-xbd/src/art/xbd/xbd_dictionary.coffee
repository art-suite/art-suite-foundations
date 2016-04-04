{Binary} = require 'art-foundation'
binary = Binary.binary
stream = Binary.stream

module.exports = class XbdDictionary
  @parse: (stream, name) ->
    encoded_dictionary = stream.readAsiString()
    num_entries = encoded_dictionary.readAsi()
    lengths = []
    while num_entries--
      lengths.push encoded_dictionary.readAsi()

    strings = lengths.map (len) ->
      encoded_dictionary.read(len)

    new XbdDictionary strings, name

  constructor: (strings, name) ->
    @strings = strings
    @name = name

  # reads an ASI id from string and returns the dictionary string for it
  readString: (stream) ->
    id = stream.readAsi()
    string = @strings[id]
    throw "string id(#{id}) not in #{@name} dictionary. keys = '#{Object.keys(@strings)}'" if !string
    string


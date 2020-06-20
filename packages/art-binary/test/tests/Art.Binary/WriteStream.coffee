{WriteStream, Stream, binary, log, inspect, isString} = require './StandardImport'

testWriting = (name, actions) ->
  test name, ->
    expectedAsPlainArray = actions stream = new WriteStream

    stream.binaryStringPromise.then (binaryString) ->
      assert.eq binaryString.plainArray, expectedAsPlainArray
      assert.eq stream.length, expectedAsPlainArray.length

testWriteReadAsi = (number) ->
  test "WriteReadAsi #{number}", ->
    stream = new WriteStream
    stream.writeAsi number
    stream.binaryStringPromise.then (binaryString) ->
      readStream = Stream.stream binaryString
      outNumber = readStream.readAsi()
      assert.eq outNumber, number

testWriteReadAsiStrings = (strings) ->
  test "WriteReadAsiStrings #{inspect strings}", ->
    stream = new WriteStream
    stream.writeAsiString s for s in strings
    stream.binaryStringPromise.then (binaryString) ->
      readStream = Stream.stream binaryString
      outStrings = []
      count = 0
      while !readStream.isDone
        if isString strings[count++]
          outStrings.push binary(readStream.readAsiString()).toString()
        else
          outStrings.push binary(readStream.readAsiString()).plainArray
      assert.eq outStrings, strings

module.exports = suite: ->
  test "new WriteStream", ->
    stream = new WriteStream
    assert.eq stream.length, 0

  testWriting "empty stream", (stream) ->
    []

  testWriting "writeByte", (stream) ->
    stream.writeByte 96
    [96]

  testWriting "write 'hi'", (stream) ->
    stream.write 'hi'
    [104, 105]

  testWriting "write [0, 255, 128]", (stream) ->
    stream.write [0, 255, 128]
    [0, 255, 128]

  testWriting "write new Uint8Array [0, 255, 128]", (stream) ->
    stream.write new Uint8Array [0, 255, 128]
    [0, 255, 128]

  testWriting "0", (stream) ->
    stream.writeAsi 0
    [0]

  testWriting "127", (stream) ->
    stream.writeAsi 127
    [127]

  testWriting "128", (stream) ->
    stream.writeAsi 128
    [128, 1]

  testWriting "129", (stream) ->
    stream.writeAsi 129
    [129, 1]

  testWriting "writeAsiString 'hi'", (stream) ->
    stream.writeAsiString 'hi'
    [2, 104, 105]

  testWriting "writeAsiString new Uint8Array [0, 255, 128]", (stream) ->
    stream.writeAsiString new Uint8Array [0, 255, 128]
    [3, 0, 255, 128]

suite "Art.Foundation.Binary.WriteStream.writeRead", ->

  for n in [0, 1, 127, 128, 129,
    128 * 128 - 1
    128 * 128
    128 * 128 + 1
    65535, 65536, 65537
    128 * 128 * 128 - 1
    128 * 128 * 128
    128 * 128 * 128 + 1
  ]
    testWriteReadAsi n

  testWriteReadAsiStrings []
  testWriteReadAsiStrings [""]
  testWriteReadAsiStrings ["hi"]
  testWriteReadAsiStrings ["hi", "bye"]
  testWriteReadAsiStrings ["a", "b", "c", "d"]
  testWriteReadAsiStrings ["smiley:😀"]
  testWriteReadAsiStrings [[0, 255, 128]]

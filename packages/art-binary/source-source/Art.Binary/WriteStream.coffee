StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'

{binary} = require "./BinaryString"

{Promise, readFileAsArrayBuffer, bound} = StandardLib
{BaseObject, log} = ClassSystem

bufferSize = 1024

module.exports = class WriteStream extends BaseObject

  constructor: ->
    @_written = []
    @_writeBuffer = new Uint8Array bufferSize
    @_pos = 0
    @_writtenLength = 0

  writeByte: (byte) ->
    @_commitHead() if @_pos == bufferSize
    @_writeBuffer[@_pos++] = byte

  writeAsi: (number)->
    throw new Error "expected number >= 0" if !(number >= 0)
    while true
      nextByte = number & 0x7F
      number >>= 7
      if number > 0
        @writeByte nextByte | 0x80
      else
        @writeByte nextByte
        break

  write: (string) ->
    binaryString = binary string
    if @_pos + binaryString.length <= bufferSize
      @_writeBuffer.set binaryString.uint8Array, @_pos
      @_pos += binaryString.length
    else
      @_commitHead()
      @_writtenLength += binaryString.length
      @_written.push binaryString.uint8Array

  writeAsiString: (string) ->
    binaryString = binary string
    @writeAsi binaryString.length
    @write binaryString

  @getter
    arrayBufferPromise:  -> @_compact().then (uint8Array) -> uint8Array.buffer
    binaryStringPromise: -> @arrayBufferPromise.then (ab) -> binary ab
    length: -> @_pos + @_writtenLength

  ###
  Using new Blob is much faster, thus we use Promises since it is async
    http://jsperf.com/appending-arraybuffers

  OUT: promise.then (compactedUint8Array) ->
  EFFECT:
    head was committed
    if @_written.length <= 1 then it isn't changed
    else @_written = [compactedUint8Array]
  ###
  _compact: ->
    @_commitHead()
    switch @_written.length
      when 0 then Promise.resolve new Uint8Array 0
      when 1 then Promise.resolve @_written[0]
      when global.Blob
        readFileAsArrayBuffer new Blob @_written
        .then (ab) =>
          @_written = [new Uint8Array ab]
          @_written[0]
      else
        # Node doesn't have Blobs. Buffers may work, but this'll do for now.
        totalLength = 0
        for typedArray in @_written
          totalLength += typedArray.length

        out = new Uint8Array totalLength
        outI = 0
        for typedArray in @_written
          for v in typedArray
            out[outI++] = v
        Promise.resolve out

  _commitHead: ->
    return unless @_pos > 0
    @_writtenLength += @_pos
    @_written.push @_writeBuffer.slice 0, @_pos
    @_pos = 0

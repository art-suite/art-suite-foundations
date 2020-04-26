ClassSystem = require 'art-class-system'
Binary   = require "./namespace"
{BaseObject} = ClassSystem
{binary} = require "./BinaryString"

module.exports = class Stream extends BaseObject

  @stream: (arg) ->
    if arg instanceof Stream
      arg
    else if arg instanceof ArrayBuffer
      Stream.fromArrayBuffer arg
    else if arg instanceof Uint8Array
      new Stream arg
    else
      new Stream(binary(arg).bytes)

  @fromArrayBuffer = (arrayBuffer) ->
    new Stream new Uint8Array arrayBuffer, 0, arrayBuffer.byteLength

  constructor: (byteView) ->
    @byteView = byteView
    @pos = 0

  readByte: ->
    @byteView[@pos++]

  readAsi: ->
    ret = 0
    shift = 0
    val = 128
    while val >= 128
      val = @readByte()
      ret += (val % 128) << shift
      shift += 7
    ret

  uint8Array: ->
    @byteView

  read: (length) ->
    begin = @pos
    @pos += length
    end = @pos
    new Stream @byteView.subarray begin, end

  inspect: ->
    "{Stream pos=#{@pos} byteOffset=#{@byteView.byteOffset} length=#{@byteView.length}}"

  readAsiString: ->
    @read @readAsi()

  done: ->
    @pos >= @byteView.length

  @getter
    buffer: -> @binaryString.buffer
    isDone: -> @pos >= @byteView.length
    binaryString: -> @_binaryString ?= binary @byteView
    inspectedString: -> @binaryString.inspectedString
    inspectedObjects: -> @binaryString.inspectedObjects

  toString: ->
    @binaryString.toString()

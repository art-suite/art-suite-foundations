# Uint8Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/Uint8Array
Binary = require "./namespace"
Utf8 = require   "./Utf8"

StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'
{
  merge
  isString, isFunction, isPlainArray, log, min, inspect, readFileAsDataUrl, readFileAsArrayBuffer, compactFlatten, pad
  InspectedObjectLiteral
  Promise
  isNode
} = StandardLib
{BaseObject, inspect} = ClassSystem

encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

module.exports = class BinaryString extends BaseObject
  @isBinary: (arg) ->
    arg && (
      (arg instanceof BinaryString) ||
      arg.constructor == ArrayBuffer ||
      arg.buffer?.constructor == ArrayBuffer
    )

  @binary: binary = (arg) ->
    if arg instanceof BinaryString
      arg
    else
      new BinaryString arg

  # OUT: promise.then (binaryString) ->
  @binaryFromBlob: (blob) ->
    readFileAsArrayBuffer blob
    .then (ab) -> binary ab

  @cloneUint8Array: (srcU8A) ->
    dstU8A = new Uint8Array new ArrayBuffer src.length
    dstU8A.set srcU8A
    dstU8A

  constructor: (arg) ->
    @bytes = unless arg?                      then new Uint8Array
    else if arg instanceof BinaryString       then BinaryString.cloneUint8Array(arg.bytes)
    else if isFunction arg?.uint8Array        then arg.uint8Array()
    else if isPlainArray arg                  then new Uint8Array arg
    else if arg instanceof ArrayBuffer        then new Uint8Array arg
    else if arg instanceof Uint8Array         then arg
    else if arg.buffer instanceof ArrayBuffer then new Uint8Array arg.buffer
    else if isString arg                      then Utf8.toBuffer arg
    else if isFunction arg.toString           then Utf8.toBuffer arg.toString()
    else throw new Error "invalid Binary string constructor argument: #{inspect arg}"
    @length = @bytes.length

  slice: (a, b) ->
    new BinaryString @bytes.slice a, b

  @fromBase64: (base64encoding)->
    if isNode
      new BinaryString Buffer.from base64encoding, "base64"

    else
      byteString = atob base64encoding

      len = byteString.length
      uint8Array = new Uint8Array new ArrayBuffer len

      for i in [0...len] by 1
        uint8Array[i] = byteString.charCodeAt i

      new BinaryString uint8Array

  # OUT: promise.then (dataUri) ->
  toDataUri: (mimeType, sync)->
    if isNode
      v = "data:#{mimeType ? ''};base64,#{@toBase64 true}"
      if sync then v else Promise.resolve v
    else
      readFileAsDataUrl @toBlob mimeType

  @fromDataUri: (dataURI)->
    splitDataURI = dataURI.split ','
    base64encoding = splitDataURI[1]
    @fromBase64 base64encoding

  toString: -> Utf8.toString @bytes
  getString: -> @toString()
  toArrayBuffer: -> @bytes.buffer
  toBlob: (mimeType) ->
    # NOTE: IE and Edge crash if we pass 'null' as the second parameter'
    # empty {} is OK
    new Blob [@bytes], merge type: mimeType

  eq: (b) -> @compare(b) == 0

  compare: (b) ->
    bytesA = @bytes
    bytesB = b.bytes
    for i in [0...min @length, b.length] when 0 != diff = bytesA[i] - bytesB[i]
      return diff

    return @length - b.length

  inspect: -> @getInspectedString()

  @getter
    uint8Array: -> @bytes
    buffer: ->
      if @bytes.buffer.byteLength != @bytes.byteLength
        oldBytes = @bytes
        @bytes = new Uint8Array new ArrayBuffer oldBytes.byteLength
        @bytes.set oldBytes

      @bytes.buffer

    arrayBuffer:  -> @buffer
    nodeBuffer:   -> Buffer.from @bytes
    blob:         -> new Blob [@bytes]
    plainArray:   -> b for b in @bytes
    byteLength:   -> @length

    inspectedObjects: ->
      lenStr = if @length >= 10 * 1024 * 1024
        "#{Math.floor @length / 1024 * 1024}m"
      else if @length >= 10 * 1024
        "#{Math.floor @length / 1024}k"
      else
        "#{@length}b"

      new InspectedObjectLiteral "<BinaryString length: #{lenStr}>"

    inspectedString: (stride = 8, maxBytes = 64)->
      count = 0
      characters = []
      maxBytes = @length if @length < maxBytes
      line = new Array stride
      compactFlatten [
        "BinaryString length: #{@length} bytes"
        "First #{maxBytes} bytes:" if maxBytes < @length
        for offset in [0...maxBytes] by stride
          @_inspectLine offset, stride, maxBytes
      ]
      .join '\n'


  _inspectLine: (offset, length, maxBytes) ->
    end = min @length, offset + length
    if maxBytes >= 0
      end = min end, maxBytes
    characters = for i in [offset...end]
      b = @bytes[i]
      if b >= 31 && b <= 127
        String.fromCharCode b
      else
        '•'

    hexCharacters = for i in [offset...end]
      b = @bytes[i]
      y = b.toString 16
      y = "0" + y if y.length < 2
      y

    "#{pad hexCharacters.join(' '), length * 3} '#{characters.join ''}'"

  ###
  toBase64 performance
  see: http://localhost:8080/webpack-dev-server/perf?grep=BinaryString
  as-of 2016-02-14, the manual string manipulation version is surprisingly the best on average for FF, Chrome and Safari
    For shorter lengths, toBase64Custom is by far the fastest, but
    toBase64ToDataUri starts to be faster at longer lengths.
  ###
  toBase64: (sync = false)->
    # 2016-2-14 benchmark based results for cut-over-to-toBase64ToDataUri length
    # FF:                 4 * 1024
    # Safari and Chrome:  16 * 1024
    if isNode
      v = Buffer.from(@bytes).toString 'base64'
      if sync then v else Promise.resolve v

    else if @length > 16 * 1024
      @toBase64ToDataUri()

    else
      @toBase64Custom()

  # surprizing to me, but as-of 2016-02-14 this one is always the slowest AND it crashs if the string is >= 128k
  # toBase64Btoa: ->
  #   Promise.resolve btoa String.fromCharCode.apply null, Array.prototype.slice.call @bytes

  toBase64ToDataUri: ->
    @toDataUri()
    .then (dataUri) -> dataUri.split(',')[1]

  toBase64Custom: ->
    # src: https:#gist.github.com/jonleighton/958841
    bytes = @bytes

    # buffer = new Uint8Array(buffer) if buffer instanceof ArrayBuffer
    base64    = ''

    byteLength    = bytes.byteLength
    byteRemainder = byteLength % 3
    mainLength    = byteLength - byteRemainder

    # Main loop deals with bytes in chunks of 3
    for i in [0..mainLength-1] by 3
      # Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      # Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 # 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 # 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 # 4032     = (2^6 - 1) << 6
      d = chunk & 63               # 63       = 2^6 - 1

      # Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]

    # Deal with the remaining bytes and padding
    Promise.resolve switch byteRemainder
      when 0 then base64
      when 1
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 # 252 = (2^6 - 1) << 2

        # Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4 # 3   = 2^2 - 1

        base64 + encodings[a] + encodings[b] + '=='

      when 2
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 # 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4 # 1008  = (2^6 - 1) << 4

        # Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2 # 15    = 2^4 - 1

        base64 + encodings[a] + encodings[b] + encodings[c] + '='

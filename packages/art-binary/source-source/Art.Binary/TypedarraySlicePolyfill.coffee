{bound} = require 'art-standard-lib'

# typed-array slice polyfill
# several browsers do not support 'slice' on typed arrays
# https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
Uint8Array.prototype.slice ||= genericSlice = (start, end = @length) ->
  start += @length if start < 0
  end += @length if end < 0
  start = bound 0, start, @length
  end = bound 0, end, @length
  out = new Uint8Array length = end - start
  outIndex = 0
  out[outIndex++] = @[i] for i in [start...end]
  out

Int8Array.prototype.slice ||= genericSlice
Uint8Array.prototype.slice ||= genericSlice
Int16Array.prototype.slice ||= genericSlice
Uint16Array.prototype.slice ||= genericSlice
Int32Array.prototype.slice ||= genericSlice
Uint32Array.prototype.slice ||= genericSlice
Float32Array.prototype.slice ||= genericSlice
Float64Array.prototype.slice ||= genericSlice

# IE < 11 does not support
self.Uint8ClampedArray?.prototype.slice ||= genericSlice

# IE-only, returned from canvas2dContext.getImageData().data
self.CanvasPixelArray?.prototype.slice ||= genericSlice

ArrayBuffer.prototype.slice ||= (start, end) ->
  (new Uint8Array @).slice(start, end).buffer

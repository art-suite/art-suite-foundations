StandardLib = require 'art-standard-lib'
{Promise} = StandardLib
BinaryString = require './BinaryString'
# Uint8Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/Uint8Array

module.exports = class File
  @_readWithPromise: (readFunction) ->
    (file) -> new Promise (resolve, reject) ->
      fr = new FileReader
      fr[readFunction] file
      fr.onerror = reject
      fr.onload  = (event) => resolve event.target.result

  @readAsArrayBuffer: readAsArrayBuffer = @_readWithPromise "readAsArrayBuffer"
  @readAsDataURL:     @_readWithPromise "readAsDataURL"

  @readAsBinaryString: (file) ->
    readAsArrayBuffer(file)
    .then (arrayBuffer) ->
      new BinaryString arrayBuffer

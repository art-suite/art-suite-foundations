StandardLib = require 'art-standard-lib'

{binary}     = require "./BinaryString"
{readAsDataURL} = require './File'

{Promise, isString} = StandardLib

module.exports = class DataUri

  @isDataUri: isDataUri= (dataString) ->
    isString(dataString) && dataString[0..4] == "data:"

  ###
  IN: data can be any of
    File: HTML File object is read as ArrayBuffer
    DataURI string: if it is already a data-uri string it is just returned as a successful promise
    any type 'binary' accepts

  OUT:
    promise.then (dataUri) ->
    , (errorEventOrErrorObject) ->
  ###
  @toDataUri: (data, mimeType = 'image/png') ->
    throw new Error "data not set" unless data
    return readAsDataURL data if global.File && data instanceof global.File
    return Promise.resolve data if isDataUri data
    binary(data).toBase64()
    .then (base64) -> "data:#{mimeType};base64,#{base64}"

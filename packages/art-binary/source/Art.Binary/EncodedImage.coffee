StandardLib = require 'art-standard-lib'
{toDataUri} = require './DataUri'
{
  isNode, log, Promise, readFileAsDataUrl, ErrorWithInfo, isString, escapeRegExp
  isObject
  sameOrigin
} = StandardLib
{isBinary, binary} = require './BinaryString'
# require 'art-rest-client'

# Node.js support - be sure to "npm install canvas"
unless global.Image
  try
    global.HTMLImageElement = global.Image = (global.HTMLCanvasElement = eval('require') "canvas").Image

{Image, HTMLImageElement} = global

module.exports = class EncodedImage

  ###
  IN:
    first arg:
      String: url
      or
      Binary: image data
      or
      HTMLImageElement

    second arg:
      options: (object)
        options for RestClient.getArrayBuffer
        NOTE: if options is provided, image-data is fetched using
          RestClient.getArrayBuffer
        This seems to work to endrun TAINT.

      crossOrigin: true/false/null/undefined
        false: DO NOT make crossorigin request
        null/undefined: AUTO
          crossOrigin is set to 'anonymous' if the request is indeed cross-origin
        true: crossOrigin is always set to 'anonymous'

    CORS/TAINT
      To avoid taint, either set the second option to {} or true.
      AND - make sure the server is returning the correct headers.

  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->


  CORS NOTES
    crossOrigin = "Anonymous" required to getImageData and avoid this error
      "The canvas has been tainted by cross-origin data."

    performance???
      I don't think there is a performance hit for making the crossOrigin request.
      - SBD March-2018

    crossOrigin should only be set for HTTP requests - since it can only be
    fulfilled with HTTP response headers. Some browsers (safari) get cranky
    if you use it with file or data URIs:

      file: urls break with crossOrigin in WkWebKit
      data: urls break with crossOrigin in Safari

  ###
  @get: get = (source, b) ->
    if isObject b
      options = b
    else
      crossOrigin = if b? then !!b # true, false, or undefined

    return Promise.reject() unless source?
    if source.constructor == HTMLImageElement || source.constructor == Image
      image = source
      {complete, naturalWidth} = source
      new Promise (resolve, reject) ->
        if complete && (naturalWidth > 0 || isNode)
          resolve source
        else
          image.onload  = -> resolve image
          image.onerror = (event) -> reject new ErrorWithInfo "image load error", event
    else
      Promise.then ->

        if isBinary source
          if Neptune.isNode
            # node canvas can load directly from a "Buffer" object
            binary(source).nodeBuffer
          else
            toDataUri source

        else if isString source
          if isObject options
            Neptune.Art.RestClient.getArrayBuffer source, options
            .then (arrayBuffer) -> readFileAsDataUrl new Blob [arrayBuffer]
          else source
        else throw new Error "expected arg #1 to be string or binary"

      .then (url) ->
        image = new Image

        unless isNode
          if crossOrigin ? !sameOrigin(url) && /^https?:/i.test url
            image.crossOrigin = "anonymous"

        image.src = url

        get image

  # IN: encodedImageData is
  #   - image-data encoded in a browser-compatible format (jpg, png, etc)
  #   - wrapped in any data-type toDataUri accepts (includes: File, BinaryString, ArrayBuffer, data-uris...)
  @toImage: (encodedImageData) ->
    toDataUri(encodedImageData).then (dataUri) => get dataUri

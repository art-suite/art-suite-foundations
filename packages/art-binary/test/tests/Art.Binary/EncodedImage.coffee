{EncodedImage, log, binary} = require './StandardImport'
{RestClient} = Neptune.Art

isTainted = (image)->
  canvas = document.createElement 'canvas'
  context = canvas.getContext "2d"
  context.drawImage image, 0, 0
  try
    context.getImageData 0, 0, 1, 1
    false
  catch
    true

if self.Image
  module.exports = suite: ->
    basics: ->
      test "base64", ->
        buffer = binary("hi")
        buffer.toBase64()
        .then (base64) ->
          assert.equal atob(base64), "hi"
          assert.equal base64, btoa("hi")

      test "base64 png", ->
        RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
        .then (arrayBuffer) ->
          binary(arrayBuffer).toBase64()
        .then (base64) ->
          assert.equal base64[0..9], "iVBORw0KGg"

      test "jpg toImage", ->
        RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
        .then (arrayBuffer) ->
          EncodedImage.toImage binary(arrayBuffer)
        .then (image)->
          assert.equal image.width, 256
          assert.equal image.height, 256

      test "EncodedImage.get url", ->
        EncodedImage.get "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
        .then (image) ->
          assert.equal image.width, 256
          assert.equal image.height, 256

      test "EncodedImage.get img immediate load", ->
        img = new Image
        img.src = "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
        EncodedImage.get img
        .then (image) ->
          log {image}
          assert.equal image.width, 256
          assert.equal image.height, 256

      test "EncodedImage.get img delayed load", ->
        img = new Image
        img.src = "#{testAssetRoot}/asset_loader_test/image1.png"
        EncodedImage.get img
        .then (image) ->
          log {image}
          assert.equal image.width, 48
          assert.equal image.height, 58

      test "png toImage", ->
        RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
        .then (arrayBuffer) ->
          EncodedImage.toImage binary(arrayBuffer)
        .then (image)->
            assert.equal image.width, 256
            assert.equal image.height, 256

    taint:
      crossOriginRequest: ->
        crossOriginUrl = "http://zoimages.imikimi.com/emiIg9qZtv252plK.png?w=100"

        test "EncodedImage.get(crossOriginUrl, false) IS TAINTED", ->
          EncodedImage.get crossOriginUrl, false
          .then (image) ->
            assert.true isTainted image

        test "EncodedImage.get(crossOriginUrl, true) is not tainted", ->
          EncodedImage.get crossOriginUrl, true
          .then (image) ->
            assert.false isTainted image

        test "EncodedImage.get(crossOriginUrl, {}) is not tainted", ->
          EncodedImage.get crossOriginUrl, verbose:true
          .then (image) ->
            assert.false isTainted image

        test "EncodedImage.get(crossOriginUrl) is not tainted", ->
          EncodedImage.get crossOriginUrl
          .then (image) ->
            assert.false isTainted image

      sameOriginRequest: ->
        sameOriginUrl = "#{testAssetRoot}/array_buffer_image_test/sample.png"

        test "EncodedImage.get(sameOriginUrl, false) is not tainted", ->
          EncodedImage.get sameOriginUrl, false
          .then (image) ->
            assert.false isTainted image

        test "EncodedImage.get(sameOriginUrl, true) is not tainted", ->
          EncodedImage.get sameOriginUrl, false
          .then (image) ->
            assert.false isTainted image

        test "EncodedImage.get(sameOriginUrl, {}) is not tainted", ->
          EncodedImage.get sameOriginUrl, false
          .then (image) ->
            assert.false isTainted image

        test "EncodedImage.get(sameOriginUrl) is not tainted", ->
          EncodedImage.get sameOriginUrl
          .then (image) ->
            assert.false isTainted image


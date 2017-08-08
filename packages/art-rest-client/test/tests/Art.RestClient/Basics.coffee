{merge, w, defineModule, isNode} = Neptune.Art.StandardLib
{RestClient} = Neptune.Art
{normalizeHeaders} = RestClient

testAssetRoot = if isNode
  "https://raw.githubusercontent.com/imikimi/art-rest-client/master/test/assets"
else
  "/test/assets"

arrayBufferToString = (buf) ->
  String.fromCharCode.apply null, new Uint8Array buf

defineModule module, suite: ->

  test "get", ->
    RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt"
    .then (string) ->
      assert.equal "hello in a file.", string

  test "getJson", ->
    RestClient.getJson "#{testAssetRoot}/array_buffer_rest_client_test/test.json"
    .then (json) ->
      assert.eq json, number: 123, object: {a: 1, b: 2, c: 3}, array: [1, 2, 3], true: true, false: false, string: "hi mom"

  test "getJson invalid json is rejected", ->
    assert.rejects RestClient.getJson "#{testAssetRoot}/array_buffer_rest_client_test/invalid.json"

  test "getArrayBuffer", ->
    RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt"
    .then (arrayBuffer) ->
      assert.equal "hello in a file.", arrayBufferToString(arrayBuffer).toString()

  test "onProgress", ->
    lastProgress =
    RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt",
      showProgressAfter: 0
      onProgress: (progress) -> #onProgress
        lastProgress = progress
    .then (string) ->
      assert.equal "hello in a file.", string.toString()
      {event, progress} = lastProgress
      assert.equal progress, 1
      assert.equal event.loaded, event.total

  test "get 404 is rejected", ->
    assert.rejects RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/doesnotexist.txt"

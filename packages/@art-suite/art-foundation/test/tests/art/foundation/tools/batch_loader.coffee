
{Foundation} = Neptune.Art
log = Foundation.log

suite "Art.Foundation.Tools.BatchLoader", ->
  test "single immediate load", (done)->
    loader = new Foundation.BatchLoader (src, addAsset) ->
      addAsset src, true

    loader.load "one", (assets) ->
      assert.eq assets["one"], true
      done()
    null

  test "addAsset", ->
    al = new Foundation.BatchLoader
    al.addAsset "one", "foo"
    al.addAsset "two", "bar"
    assert.eq al.assets, one:"foo", two:"bar"
    assert.eq al.loadingAssets, {}

  test "two loads, one already done", (done)->
    loaderInvocations = 0
    loader = new Foundation.BatchLoader (src, addAsset) ->
      loaderInvocations++
      addAsset src, true

    loader.addAsset "one", true

    loader.load ["one", "two"], (assets) ->
      assert.eq assets["one"], true
      assert.eq assets["two"], true
      assert.eq loaderInvocations, 1
      done()
    null

  test "two overlapping simultanious listloads", (done)->
    loaderInvocations = 0
    loader = new Foundation.BatchLoader (src, addAsset) ->
      loaderInvocations++
      Foundation.nextTick ->
        addAsset src, true

    finish = ->
      assert.equal loaderInvocations, 3
      assert.eq loader.loadingAssets, {}
      done()

    count = 0
    loader.load ["one", "two", "three"], (assets) ->
      count += 1 if assets["one"]
      count += 1 if assets["two"]
      count += 1 if assets["three"]
      finish() if count == 6

    loader.load ["one", "two", "three"], (assets) ->
      count += 1 if assets["one"]
      count += 1 if assets["two"]
      count += 1 if assets["three"]
      finish() if count == 6
    null


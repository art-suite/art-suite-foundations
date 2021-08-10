
{Foundation} = Neptune.Art
{ProgressAdapter, eq, inspect, clone, timeout} = Foundation

suite "Art.Foundation.Tools.ProgressAdapter", ->
  test "checks parameters", ->
    assert.throws -> pa = new ProgressAdapter()
    assert.throws -> pa = new ProgressAdapter 4
    assert.throws -> pa = new ProgressAdapter "hi", ->
    assert.throws -> pa = new ProgressAdapter {}, ->
    new ProgressAdapter 4, ->
    new ProgressAdapter [4, 4], ->

suite "Art.Foundation.Tools.ProgressAdapter.steps", ->
  test "new ProgressAdapter 4", ->
    pa = new ProgressAdapter 4, ->
    assert.eq pa.steps, [0, .25, .5, .75]

  test "new ProgressAdapter [1, 1]", ->
    pa = new ProgressAdapter [1, 1], ->
    assert.eq pa.steps, [0, .5]

  test "new ProgressAdapter [1, 2, 1]", ->
    pa = new ProgressAdapter [1, 2, 1], ->
    assert.eq pa.steps, [0, .25, .75]

suite "Art.Foundation.Tools.ProgressAdapter.makeProgress", ->
  test "new ProgressAdapter 2 basic", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    pa.makeProgress()
    assert.eq pa.warningCount, 0
    assert.eq callbackValues, [0, .5, 1]

  test "new ProgressAdapter 2 when called 3 times outputs console.warn", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    pa.makeProgress()
    pa.makeProgress()
    assert.eq pa.warningCount, 1
    assert.eq callbackValues, [0, .5, 1, 1]

  test "new ProgressAdapter [1, 2, 1]", ->
    callbackValues = []
    pa = new ProgressAdapter [1, 2, 1], (v) -> callbackValues.push v
    pa.makeProgress()
    pa.makeProgress()
    pa.makeProgress()
    assert.eq callbackValues, [0, .25, .75, 1]

suite "Art.Foundation.Tools.ProgressAdapter.makeProgressCallback", ->
  test "new ProgressAdapter 2", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 1
    assert.eq pa.warningCount, 0
    assert.eq callbackValues, [0, .5, .5, .75, 1]

  test "new ProgressAdapter 2 cant go backwards", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 0
    cb 1
    assert.eq pa.warningCount, 0
    assert.eq callbackValues, [0, .5, .5, .75, .75, 1]

  test "new ProgressAdapter [1, 2, 1]", ->
    callbackValues = []
    pa = new ProgressAdapter [1, 2, 1], (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 1
    pa.makeProgress()
    assert.eq pa.warningCount, 0
    assert.eq callbackValues, [0, .25, .25, .5, .75, 1]

suite "Art.Foundation.Tools.ProgressAdapter.executePromiseSequence", ->
  test "new ProgressAdapter 2", ->
    callbackValues = []
    events = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.executePromiseSequence([
      (_, progressCallback) ->
        events.push "first step"
        timeout 10
        .then ->
          progressCallback .25
          timeout 10
        .then ->
          progressCallback .50
          timeout 10
        .then ->
          progressCallback .75
          timeout 10
        .then ->
          events.push "timeout"
      ->
        events.push "second step"
    ])
    .then ->
      assert.eq callbackValues, [0, 0.125, 0.25, 0.375, 0.5, 1]
      assert.eq events, ["first step", "timeout", "second step"]

  test "ProgressAdapter.executePromiseSequence implicit weights", ->
    callbackValues = []
    events = []
    ProgressAdapter.executePromiseSequence(((v) -> callbackValues.push v), [
      (_, progressCallback) ->
        events.push "first step"
        timeout 10
        .then ->
          progressCallback .25
          timeout 10
        .then ->
          progressCallback .50
          timeout 10
        .then ->
          progressCallback .75
          timeout 10
        .then ->
          events.push "timeout"
      ->
        events.push "second step"
    ])
    .then ->
      assert.eq callbackValues, [0, 0.125, 0.25, 0.375, 0.5, 1]
      assert.eq events, ["first step", "timeout", "second step"]

{
  log
  timeout
  ReschedulableTimer
} = Neptune.Art.StandardLib

module.exports = suite: ->
  test "basic", ->
    timer = new ReschedulableTimer
    new Promise (resolve, reject) ->
      timeout 10, reject
      timer.timeout 0, resolve

  test "basic reschedule", ->
    timer = new ReschedulableTimer
    new Promise (resolve, reject) ->
      timer.timeout 2, -> reject "should have been rescheduled"
      timer.timeout 4, -> resolve()

  test "only invokes and only returns the last function and value", ->
    timer = new ReschedulableTimer
    trace = []
    firstCall = timer.timeout 2, -> trace.push 1; 1
    timer.timeout 4, -> trace.push 2; 2

    firstCall.then (v) ->
      assert.eq trace, [2]
      assert.eq v, 2

  test "multiple calls all return the same promise until resolved", ->
    timer = new ReschedulableTimer
    firstCall   = timer.timeout 2, ->
    secondCall  = timer.timeout 4, ->
    assert.equal firstCall, secondCall
    secondCall
    .then ->
      thirdCall  = timer.timeout 4, ->

      assert.notEqual firstCall, thirdCall


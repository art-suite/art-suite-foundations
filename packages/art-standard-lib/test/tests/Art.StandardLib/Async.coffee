
{currentSecond, timeout, PromiseWorkerPool, timeout, Promise, intRand, log, deepAll} = Neptune.Art.StandardLib

module.exports = suite:
  timeout: ->
    test "passed in function results go to promise", ->
      timeout 10, -> 123
      .then (result) -> assert.eq result, 123

    test "passed in function failure causes promise to fail", ->
      assert.rejects timeout 10, -> throw new Error

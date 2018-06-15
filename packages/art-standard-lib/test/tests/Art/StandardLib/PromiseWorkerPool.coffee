
{currentSecond, timeout, PromiseWorkerPool, timeout, Promise, intRand, log, deepAll} = Neptune.Art.StandardLib

module.exports = suite:
  basics: ->
    test "create", ->
      new PromiseWorkerPool

    test "queue 1", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)
      .queue -> workCount++
      .then (results)->
        assert.eq workCount, 1
        assert.eq results, [0]

  async: ->
    test "queue 1", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)
      .queue -> timeout 50, -> workCount++
      .then (results)->
        assert.eq workCount, 1
        assert.eq results, [0]

    test "queue 9", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)

      for i in [0...9]
        pwp.queue -> timeout 50, -> workCount++

      pwp.start().then (results)->
        assert.eq results, [0, 1, 2, 3, 4, 5, 6, 7, 8]
        assert.eq workCount, 9

    test "queue 11", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)

      for i in [0...11]
        pwp.queue -> timeout 10, -> workCount++

      pwp.start().then (results)->
        assert.eq results, (i for i in [0...11])
        assert.eq workCount, 11

    test "queue 20, 5 workers", ->
      workCount = 0
      pwp = (new PromiseWorkerPool 5)

      start = currentSecond()
      for i in [0...20]
        pwp.queue -> timeout 50, -> workCount++

      pwp.then (results)->
        assert.eq results, (i for i in [0...20])
        assert.eq workCount, 20
        end = currentSecond()
        delta = (end - start) * 1000 | 0
        assert.gte delta, 200, info = "20 jobs * 50ms each / 5 workers >> should be between 200 and 300 ms"
        assert.lte delta, 300, info

    test "queue 20, 10 workers", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)

      start = currentSecond()
      for i in [0...20]
        pwp.queue -> timeout 50, -> workCount++

      pwp.then (results)->
        assert.eq results, (i for i in [0...20])
        assert.eq workCount, 20
        end = currentSecond()
        delta = (end - start) * 1000 | 0
        assert.gte delta, 100, info = "20 jobs * 50ms each / 10 workers >> should be between 100 and 200 ms"
        assert.lte delta, 200, info

  errors: ->

    test "catch: queue 11, fail on 5", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)

      for i in [0...11]
        pwp.queue -> timeout 10, ->
          if 5 == workCount++
            throw new Error "fake-fail because we hate 5s!"

      pwp.catch (rejectedWith) ->
        assert.match rejectedWith.message, /fake-fail/

    test "then-catch: 11, fail on 5", ->
      workCount = 0
      pwp = (new PromiseWorkerPool)

      for i in [0...11]
        pwp.queue -> timeout 10, ->
          if 5 == workCount++
            throw new Error "fake-fail because we hate 5s!"

      pwp.then(
        -> throw new Error "should not succeed"
        (rejectedWith) -> assert.match rejectedWith.message, /fake-fail/
      )

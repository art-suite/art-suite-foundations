
{StandardLib} = Neptune.Art
{WorkerRpc, timeout, Promise, intRand, log, deepAll} = StandardLib

module.exports = suite:
  blueBirdBasics: ->
    test "new Promise()", ->
      new Promise (resolve) -> resolve()

  newExternallyResolvable: ->
    test "newExternallyResolvable.resolve()", ->
      Promise.newExternallyResolvable().resolve()

    test "newExternallyResolvable with true async", ->
      p = Promise.newExternallyResolvable()
      timeout 0, -> p.resolve()
      p

    test "newExternallyResolvable.reject()", ->
      (p = Promise.newExternallyResolvable()).reject new Error
      assert.rejects p

  invert: ->
    test "Promise.invert catch to then", ->
      Promise.invert Promise.then -> throw new Error "foo"

    test "Promise.invert then to catch", ->
      assert.rejects Promise.invert Promise.then -> "foo"

  finally: ->
    test "Promise.finally fires on success", ->
      took = false
      Promise.finally Promise.resolve(123), -> took = true
      .then (v) ->
        assert.eq v, 123
        assert.ok took

    test "Promise.finally fires on error", ->
      took = false
      assert.rejects Promise.finally Promise.reject(new Error 123), -> took = true
      .then ({message}) ->
        assert.eq message, "123"
        assert.ok took

    test "Promise.finally failure after success causes rejection", ->
      assert.rejects Promise.finally Promise.resolve(new Error 123), -> throw new Error "foo"

    test "Promise.finally failure after failure causes new rejection", ->
      assert.rejects Promise.finally Promise.reject(new Error "original rejection"), -> throw new Error "from finally"
      .then ({message}) -> assert.eq message, "from finally"

  deepAll: ->
    test 'deepAll {}', ->
      deepAll
        a: Promise.resolve 123
        b: Promise.resolve c: 1, d: 2
      .then (result) ->
        assert.eq result,
          a: 123
          b: c: 1, d: 2

    test 'deepAll [{}]', ->
      deepAll [
        999
        a: Promise.resolve 123
        b: Promise.resolve c: 1, d: 2
      ]
      .then (result) ->
        assert.eq result, [
          999
          a: 123
          b: c: 1, d: 2
        ]

    test 'deepAll []', ->
      deepAll [
        Promise.resolve 123
        Promise.resolve c: 1, d: 2
      ]
      .then (result) ->
        assert.eq result, [
          123
          c: 1, d: 2
        ]


  serializer: ->
    test "Promise.serialize", ->
      count = 0
      delays = [100, 0, 10]
      delaysUsed = []
      order = []
      f = Promise.serialize ->
        timeout delays[count], ->
          delaysUsed.push delays[count]
          order.push count++

      f()
      f()
      f()
      .then ->
        assert.eq order, [0, 1, 2]
        assert.eq delaysUsed, delays

    test "always", ->
      serializer = new Promise.Serializer
      serializer.then -> throw new Error "oh no!"
      serializer.always -> "oh, ok!"
      serializer.then (out)->
        log "1"
        assert.eq out, "oh, ok!"
        log "2"
        null
      # serializer.always -> "oh, ok!!!"
      # serializer.then (out)-> assert.eq out, "oh, ok!!!"; null

    test "serializer with forEach", ->
      count = 0
      delays = [100, 0, 10]
      delaysUsed = []
      order = []

      serializer = new Promise.Serializer
      delays.forEach serializer.serialize (delay) ->
        timeout delay, ->
          delaysUsed.push delay
          order.push count++

      serializer.then ->
        assert.eq order, [0, 1, 2]
        assert.eq delaysUsed, delays

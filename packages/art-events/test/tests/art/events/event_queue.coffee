define [
  'extlib/chai'
  'lib/art'
], (chai, Art) ->
  assert = chai.assert
  inspect = Art.Foundation.Inspect.inspect

  suite "Art.Events.EventQueue", ->
    test "blank queue", ->
      q = new Art.Events.EventQueue
      assert.eq q.length, 0
      assert.ok q.isEmpty

    test "add to queue queue", ->
      q = new Art.Events.EventQueue
      q.add "foo"
      assert.eq q.length, 1
      assert.ok !q.isEmpty

    test "clear works and frees up references", ->
      q = new Art.Events.EventQueue
      q.add "foo"
      assert.eq q.queue[0], "foo"
      q.clear()
      assert.eq q.queue[0], null
      assert.eq q.length, 0
      assert.ok q.isEmpty

    test "add array queue queue", ->
      q = new Art.Events.EventQueue
      q.add ["foo", "bar"]
      assert.eq q.length, 2

    test "processAll preserves order", ->
      q = new Art.Events.EventQueue
      q.add ["foo", "bar"]
      result = []
      q.processAll (e) ->
        result.push e
      assert.eq result, ["foo", "bar"]
      assert.eq q.length, 0

    test "processAll with exception", ->
      q = new Art.Events.EventQueue
      q.add "foo"
      q.add "bar"
      result = {}
      try
        q.processAll (e) ->
          throw new Error
          result[e] = true
      catch e
      assert.eq result, {}
      assert.eq q.length, 1
      q.processAll (e) ->
        result[e] = true
      assert.eq result, bar:true
      assert.eq q.length, 0

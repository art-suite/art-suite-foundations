{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
{inspect} = require 'art.foundation'
Events = require 'art.events'

suite "Art.Events.EventQueue", ->
  test "blank queue", ->
    q = new Events.EventQueue
    assert.eq q.length, 0
    assert.ok q.isEmpty

  test "add to queue queue", ->
    q = new Events.EventQueue
    q.add "foo"
    assert.eq q.length, 1
    assert.ok !q.isEmpty

  test "clear works and frees up references", ->
    q = new Events.EventQueue
    q.add "foo"
    assert.eq q.queue[0], "foo"
    q.clear()
    assert.eq q.queue[0], null
    assert.eq q.length, 0
    assert.ok q.isEmpty

  test "add array queue queue", ->
    q = new Events.EventQueue
    q.add ["foo", "bar"]
    assert.eq q.length, 2

  test "processAll preserves order", ->
    q = new Events.EventQueue
    q.add ["foo", "bar"]
    result = []
    q.processAll (e) ->
      result.push e
    assert.eq result, ["foo", "bar"]
    assert.eq q.length, 0

  test "processAll with exception", ->
    q = new Events.EventQueue
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

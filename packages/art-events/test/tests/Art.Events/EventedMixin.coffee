{nextTick, defineModule, Event, BaseClass, EventedMixin, log, merge} = require '../../StandardImport'

defineModule module, suite: ->
  class MyEventedObject extends EventedMixin BaseClass

  test "event(), when no handler, returns false", ->
    eo = new MyEventedObject
    assert.eq false, eo.queueEvent "foo"

  test "event(), when there is a handler, returns the queued event object", (done)->
    eo = new MyEventedObject
    eo.on foo: -> done()
    assert.eq true, eo.queueEvent "foo"

  test "handled event happens on nextTick", (done)->
    eo = new MyEventedObject
    count = 0
    eo.on foo: ->
      assert.eq count, 1
      done()
    assert.eq true, eo.queueEvent "foo"
    count++

  test "event creator function", (done)->
    eo = new MyEventedObject
    eo.on foo: (e)->
      assert.eq e.props.bar, 123
      done()
    assert.eq true, eo.queueEvent "foo", -> new Event "foo", bar:123

  test "events handled in order they occured", (done)->
    eo = new MyEventedObject
    count = 0
    eo.on bar: ->
      assert.eq count, 2
      done()
    eo.on foo: ->
      assert.eq count, 1
      count++
    eo.queueEvent "foo"
    eo.queueEvent "bar"
    count++

  test "show warning when queueing events when handling events", (done)->
    eo = new MyEventedObject
    eo.on foo: -> eo.queueEvent "bar"
    eo.on bar: -> done()
    eo.queueEvent "foo"

  test "show warning when handling events outside of an epoch", (done)->
    eo = new MyEventedObject
    eo.on foo: -> done()
    eo.handleEvent new Event "foo"

  test "events queued at other times are OK", (done)->
    eo = new MyEventedObject
    eo.on foo: -> nextTick -> eo.queueEvent "bar"
    eo.on bar: -> done()
    eo.queueEvent "foo"

  test "sequence of oneTime handlers", (done)->
    eo = new MyEventedObject

    eo.onNext
      birthday: ->
        eo.onNext birthday: -> done()
        eo.queueEvent "birthday"

    eo.queueEvent "birthday"


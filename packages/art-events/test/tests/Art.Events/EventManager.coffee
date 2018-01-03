{inspect} = require '../../StandardImport'
Events = require 'art-events'

module.exports = suite: ->
  test "add handler, fire event and handle event", (done)->
    em = new Events.EventManager
    em.on birthday:(e)->
      assert.equal e.props.present, "legos"
      done()

    em.handleEvent new Events.Event "birthday", present:"legos"

  test "add exception handler", (done)->
    em = new Events.EventManager

    success = false
    finalize = ->
      assert.equal success, true
      done()

    em.on
      eventException: (e) ->
        success = true
        finalize()
      birthday: (e)->
        throw new Error "fail"
        finalize()

    em.handleEvent new Events.Event "birthday"

  test "add oneTime handler", (done)->
    em = new Events.EventManager

    count = 0
    em.onNext
      birthday: (e)-> count++
      reallyDone: ->
        assert.ok !em.hasHandler "birthday"
        assert.eq count, 1
        done()

    assert.ok em.hasHandler "birthday"
    em.handleEvent new Events.Event "birthday"
    em.handleEvent new Events.Event "birthday"
    em.handleEvent new Events.Event "reallyDone"

  test "add normal, everytime handler", (done)->
    em = new Events.EventManager

    count = 0
    em.on
      birthday: (e)-> count++
      reallyDone: ->
        assert.ok em.hasHandler "birthday"
        assert.eq count, 2
        done()

    assert.ok em.hasHandler "birthday"
    em.handleEvent new Events.Event "birthday"
    em.handleEvent new Events.Event "birthday"
    em.handleEvent new Events.Event "reallyDone"

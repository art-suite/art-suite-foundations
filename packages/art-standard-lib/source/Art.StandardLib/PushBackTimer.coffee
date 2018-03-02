{currentSecond} = require './Time'
{timeout} = require './AsyncExtensions'

module.exports = class PushBackTimer
  constructor: ->
    @_lastTime = null

  timeout: (ms, action) ->
    @_lastTime = lastTime = currentSecond()
    timeout ms, => action() if @_lastTime == lastTime


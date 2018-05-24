{currentSecond} = require './Time'
{timeout} = require './AsyncExtensions'

module.exports = class ReschedulableTimer
  constructor: ->
    @_currentScheduleNumber = 0

  ###
  every time you call timeout it effectively cancels all previously pending timeouts
  leaving only this, new timeout active.

  In actuality, the repvious timeouts complete at some point, but their 'actions' are skipped.
  ###
  timeout: (ms, action) ->
    thisScheduleNumber = @_currentScheduleNumber += 1
    timeout ms, => action() if @_currentScheduleNumber == thisScheduleNumber

  cancel: -> @_currentScheduleNumber++
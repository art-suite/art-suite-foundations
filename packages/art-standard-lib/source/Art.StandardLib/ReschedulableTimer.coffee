{Promise} = require './Promise'
{currentSecond} = require './Time'
{timeout} = require './AsyncExtensions'

module.exports = class ReschedulableTimer
  constructor: ->
    @_actionCount = 0
    @cancel()

  ###
  every time you call timeout it effectively cancels all previously pending timeouts
  leaving only this, new timeout active.

  In actuality, the repvious timeouts complete at some point, but their 'actions' are skipped.

  OUT:
    Promise.then ->
      The result of the next-completed timeout.

      Note:
        If no additional calls to timeout are made within your ms, then
        this will be the result of your action.

        However, if another timeout is triggered before ms expires, the result
        will be the result of the action passed in then.
  ###
  timeout: (ms, action) ->
    actionCount = @_actionCount += 1
    # console.log setup: {actionCount, action: action.toString()}

    timeout ms, =>
      # console.log {actionCount, @_actionCount, action: action.toString(), go: @_actionCount == actionCount}
      if @_actionCount == actionCount
        {reject, resolve} = @
        @cancel()
        Promise.then -> action()
        .catch  reject
        .then   resolve

    @_getPendingPromise()

  cancel: ->
    @resolve = @reject = @_pendingTimeoutPromise = null
    @_actionCount++

  _getPendingPromise: ->
    @_pendingTimeoutPromise ?= new Promise (@resolve, @reject) =>

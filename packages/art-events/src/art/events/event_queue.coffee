define [
  './namespace'
  '../foundation'
], (Events, Foundation) ->
  class Events.EventQueue extends Foundation.BaseObject

    constructor: ->
      @_length = 0
      @nextToProcess = 0
      @queue = new Array 128

    # add event or array of events
    add: (a)->
      if a instanceof Array
        @queue = @queue.slice(0, @_length).concat a
        @_length += a.length
      else
        @queue[@_length++] = a

    clear: -> @processAll => # noop per item, but processAll ensures all memory is released

    @getter
      length: -> @_length - @nextToProcess
      isEmpty: -> @_length == 0

    popAll: ->
      result = @queue.slice 0, @_length
      @clear()
      result

    # if "f" throws an exception the current item is "consumed" and lost, safely, but unprocessed items still remain.
    # You must restart processesAll to process the remaining items.
    processAll: (f) ->
      while @nextToProcess < @_length
        popped = @queue[@nextToProcess]
        @queue[@nextToProcess++] = null
        f popped # do this last in case it throws an exception
      @nextToProcess = @_length = 0

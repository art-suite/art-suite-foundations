define [
  'art.foundation'
], (Foundation) ->
  {log, Epoch} = Foundation

  class EventEpoch extends Epoch
    @singletonClass()

    # event is a function
    # "null" is allowed and ignored
    # returns the event passed in
    queue: (event)-> @queueItem event

    logEvent: (name, id) ->

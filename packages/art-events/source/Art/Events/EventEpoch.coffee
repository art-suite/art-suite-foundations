Foundation = require 'art-foundation'
{defineModule, log, Epoch} = Foundation

defineModule module, class EventEpoch extends Epoch
  @singletonClass()

  # event is a function
  # "null" is allowed and ignored
  # returns the event passed in
  queue: (event)-> @queueItem event

  logEvent: (name, id) ->

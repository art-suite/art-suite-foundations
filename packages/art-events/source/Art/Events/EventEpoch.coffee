{defineModule, log} = require 'art-standard-lib'
{Epoch} = require 'art-foundation'

defineModule module, class EventEpoch extends Epoch
  @singletonClass()

  # event is a function
  # "null" is allowed and ignored
  # returns the event passed in
  queue: (event)-> @queueItem event

  logEvent: (name, id) ->

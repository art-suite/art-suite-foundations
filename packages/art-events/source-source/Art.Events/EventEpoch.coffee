{defineModule, log} = require 'art-standard-lib'
{EpochClass} = require 'art-epoched-state'

defineModule module, class EventEpoch extends EpochClass
  @singletonClass()

  # event is a function
  # "null" is allowed and ignored
  # returns the event passed in
  queue: (event)-> @queueItem event

  logEvent: (name, id) ->

Foundation = require 'art-foundation'
EventEpoch = require './EventEpoch'
Event = require './event'

{defineModule, isFunction, log, isPlainObject, inspect} = Foundation
{eventEpoch} = EventEpoch

###
to be used as a mixin via BaseObject's @include method

If this class is included directly, you must also implement the methods
  listed in "TO IMPLEMENT" below.
###
defineModule module, class EventedObjectBase
  @typeFromEventOrType: typeFromEventOrType = (eventOrType) -> eventOrType && (eventOrType.type || eventOrType)

  ###
  Purpose:
    handle event immediately
    do some preprocessing on the event

  Inputs: see #event()'s inputs

  Output: true if the event was actually handled

  IMPORTANT: This should only be called during an eventEpoch.
    This means:
      Usually, just don't call this directly. Use @queueEvent.
      If you need to call this directly, only do it from within an event handler.
    Examples reasons to call directly:
      - to do custom event routing
      - send a new event triggered from the first
  ###
  handleEvent: (eventOrType, eventPropertiesOrCreator) ->
    eventType = typeFromEventOrType eventOrType
    return false unless eventType && @_hasEventHandler eventType

    event = if eventOrType instanceof Event
      eventOrType
    else if isFunction eventPropertiesOrCreator
      if isPlainObject e = eventPropertiesOrCreator()
        new Event eventType, e
      else
        e
    else
      new Event eventType, eventPropertiesOrCreator

    return false unless event

    event.target = @
    try
      @_sendToEventHandler event
    catch e
      @_handleErrorInHandler event, "unknown", e
    event.target = null
    true

  ###
  Inputs:
    eventOrType can be:
     * an instanceof Event or
     * a string representing the "type" of the event
        (a new Event will be created)

    eventPropertiesOrCreator can be:
     * null: only if eventOrType is an instanceof Event
     * Object: properties passed into: new Event eventOrType, eventPropertiesOrCreator
     * Function: returns null (indicating a noop) or a new instanceof Event

  Output:
    true:   The event was queued.
    false:  There is no handler for the event. The event was ignored (discarded).
  ###
  queueEvent: (eventOrType, eventPropertiesOrCreator) ->
    eventType = typeFromEventOrType eventOrType
    if eventType && @_hasEventHandler eventType
      eventEpoch.queue => @handleEvent eventOrType, eventPropertiesOrCreator
      true
    else
      false

  ############################
  # TO IMPLEMENT
  ############################
  ###
  inputs: eventType is a string
  outputs: true if there is a handler for the specified type
  ###
  _hasEventHandler: (eventType) -> throw new Error "must implement"

  ###
  inputs: an Event object with event.target set to @
  output: ignored

  - Called exclusively from handleEvent. Don't call manually.
  - This is where the event handler is actually called.
  - Only called during an eventEpoch.
  - Only called if @_hasEventHandler returned true for event.type
  ###
  _sendToEventHandler: (event) -> throw new Error "must implement"

  _handleErrorInHandler: (event, handler, error) ->
    console.log "EventedObjectBase: exception in handler. Error:", error
    console.log "Event: #{inspect event, 1}"
    console.log "Handler:", handler
    console.log "Stack:", error.stack
    Foundation.throwErrorOutOfStack error

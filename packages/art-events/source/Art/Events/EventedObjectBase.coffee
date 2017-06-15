{defineModule, isFunction, log, isPlainObject, inspect} = require 'art-standard-lib'

{eventEpoch} = require './EventEpoch'
Event = require './Event'

###
to be used as a mixin via BaseObject's @include method

If this class is included directly, you must also implement the methods
  listed in "TO IMPLEMENT" below.
###
defineModule module, class EventedObjectBase
  @typeFromEventOrType: typeFromEventOrType = (eventOrType) -> eventOrType && (eventOrType.type || eventOrType)

  ###
  EFFECT:
    event is handled immediately if there is a handler for it.
    NOTE: if eventPropertiesOrCreator is an eventCreator, it is NOT INVOKED
      if there is no handler for eventType.

  IN: see normalizeEvent

  OUT: true if the event was actually handled

  IMPORTANT: This should only be called during an eventEpoch.
    This means:
      Usually, just don't call this directly. Use @queueEvent.
      If you need to call this directly, only do it from within an event handler.
    Examples reasons to call directly:
      - to do custom event routing
      - send a new event triggered from the first
  ###
  handleEvent: (eventOrType, eventPropertiesOrCreator) ->
    unless event = @_normalizedEventToHandle eventOrType, eventPropertiesOrCreator
      return false

    event.target = @
    try
      @_sendToEventHandler event
    catch e
      @_handleErrorInHandler event, "unknown", e
    event.target = null
    true

  ###
  IN 1: (event instance)
    EFFECT: returns event immediately

  IN 2: (eventType, eventPropertiesOrCreator)
    EFFECT:
      eventPropertiesOrCreator: eventProperties, eventCreator or null
      eventCreator: () -> Event instance, eventProperties or null
        NOTE: if eventCreator returns null, null is returned from normalizeEvent

      eventProperties: plain object used to create event: new Event eventType, eventProperties

  OUT:
    if !eventOrType? || !eventCreator?()? then null
    else event instance
  ###
  normalizeEvent: (eventOrType, eventPropertiesOrCreator) ->
    if eventOrType instanceof Event
      eventOrType

    else if isString eventType = eventOrType

      if isFunction eventCreator = eventPropertiesOrCreator
        if (e = eventCreator())?
          if isPlainObject e
            new Event eventType, e
          else if e instanceof Event
            e
          else
            throw new Error "expecting eventCreator to return EventInstance, null or plain object"
        else
          null
      else
        new Event eventType, eventPropertiesOrCreator

    else
      null

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

  _normalizedEventToHandle: (eventOrType, eventPropertiesOrCreator) ->
    (eventType = typeFromEventOrType eventOrType) &&
    @_hasEventHandler(eventType) &&
    @normalizeEvent eventOrType, eventPropertiesOrCreator

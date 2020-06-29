{defineModule, isString, isFunction, log, isPlainObject, inspect, throwErrorOutOfStack} = require 'art-standard-lib'

Event = require './Event'
{eventEpoch} = require './EventEpoch'

###
to be used as a mixin via BaseObject's @include method

If this class is included directly, you must also implement the methods
  listed in "TO IMPLEMENT" below.
###
defineModule module, -> (superClass) ->
  class EventedBaseMixin extends superClass
    @typeFromEventOrType: typeFromEventOrType = (eventOrType) -> eventOrType && (eventOrType.type || eventOrType)

    ###
    EFFECT: Queues an event to be handled next eventEpoch
    IN:
      eventOrType can be:
       * an instanceof Event or
       * a string representing the "type" of the event
          (a new Event will be created)

      eventPropertiesOrCreator can be:
       * null: only if eventOrType is an instanceof Event
       * Object: properties passed into: new Event eventOrType, eventPropertiesOrCreator
       * Function: returns null (indicating a noop) or a new instanceof Event

    OUT:
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

    ###
    EFFECT:
      If there is no handler for the specified event-type:
        returns immediately without further processing.
      else
        event is normalized and handled immediately

    IN: SEE: normalizeEvent

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
      eventType = typeFromEventOrType eventOrType
      unless eventType && @_hasEventHandler(eventType) && event = @normalizeEvent eventOrType, eventPropertiesOrCreator
        return false

      event.target = @
      try
        @_sendToEventHandler event
      catch e
        @_handleErrorInHandler event, "unknown", e
      event.target = null
      true

    ###
    IN:
      (event)
        event: Event instance

      OR

      (eventType, eventPropertiesOrCreator)
        eventType: string

        eventPropertiesOrCreator:
          function, invoked immediately:
            () ->
              OUT:
                event instance
                OR
                plain object - passed to Event constructor
          OR
            plain object - passed to Event constructor
          OR
            null

    OUT: Event instance or null
    ###
    normalizeEvent: (eventOrType, eventPropertiesOrCreator) ->
      if eventOrType instanceof Event
        eventOrType
      else
        unless isString eventType = eventOrType
          throw new Error "expected event or event-type-string"

        if isFunction eventCreator = eventPropertiesOrCreator
          e = eventCreator()
          switch
            when e instanceof Event then e
            when isPlainObject e then new Event eventType, e
            when e? then throw new Error "expecting event or plain-object"
            else null

        else
          new Event eventType, eventPropertiesOrCreator

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
      throwErrorOutOfStack error

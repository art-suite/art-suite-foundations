###

TODO:
  handlEvent alternate signature:
    (type, functionReturningEventElement) ->

  The function would only be invoked if there are actually event handlers for the specified type.

###

{defineModule, Log, nextTick, isFunction, inspect, clone, arrayWith, throwErrorOutOfStack} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

Event = require "./Event"
rawErrorLog = Log.rawErrorLog

defineModule module, class EventManager extends BaseClass

  constructor: (parent) ->
    @parent = parent
    @eventHandlers = {}

  hasHandler: (type) -> !!((handlers = @eventHandlers[type]) && handlers.length > 0)

  on: (handlerMap) ->
    for type, action of handlerMap when action
      throw new Error "EventManager: action is not a function for #{inspect type} event handler. (action: #{inspect action}, parent: #{inspect @parent})" unless isFunction action
      @eventHandlers[type] = arrayWith @eventHandlers[type], action:action, oneTime:false

  removeListeners: (handlerMap) ->
    count = 0
    for type, action of handlerMap when handlers = @eventHandlers[type]
      beforeCount = handlers.length
      @eventHandlers[type] = (handler for handler in handlers when handler.action != action)
      count = beforeCount - @eventHandlers[type].length
    count

  onNext: (handlerMap) ->
    for type, action of handlerMap
      @eventHandlers[type] ?= []
      @eventHandlers[type].push action:action, oneTime:true

  countOneTimeHandlersFor: (eventType) ->
    count = 0
    if handlers = @eventHandlers[eventType]
      count++ for handler in handlers when handler.oneTime
    count

  # event can be an Event or a string which becomes the event-type
  handleEvent: (event) ->
    event = new Event event if typeof event is "string"
    @sendToHandlers event.type, event

  handleEvents: (events) ->
    @handleEvent event for event in events

  # invokes handler.action(event) for every handler in handlers
  # returns handlers with any oneTime handlers removed
  sendToHandlers: (eventType, event) ->
    handlers = @eventHandlers[eventType]
    return unless handlers && handlers.length > 0
    firedOneTimeHandler = false
    for handler in handlers
      try
        handler.remove = firedOneTimeHandler = true if handler.oneTime
        action = handler.action
        action event
      catch error
        @handleErrorInHandler handler, event, error

    if firedOneTimeHandler
      # This could be run every time safely, but we want to only create a new array if we have to.
      @eventHandlers[event.type] = (handler for handler in @eventHandlers[eventType] when !handler.remove)


  handleErrorInHandler: (handler, event, error) ->
    if event.type == "eventException"
      rawErrorLog "exception in eventException handler.\nEvent:#{inspect event, 1}.\n\nError:\n#{error.stack}"
      throwErrorOutOfStack error
    else if @eventHandlers["eventException"]
      @handleEvent new Event "eventException",
        event: clone event
        exception: error
        handler: handler
    else
      rawErrorLog "exception in handler AND no eventException handler. Error:"
      rawErrorLog error
      rawErrorLog "Event: #{inspect event, 1}"
      rawErrorLog "Stack:\n#{error.stack}"
      throwErrorOutOfStack error

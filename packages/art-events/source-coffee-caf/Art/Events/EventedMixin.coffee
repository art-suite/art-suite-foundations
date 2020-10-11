{defineModule, isFunction, log, isPlainObject} = require 'art-standard-lib'

EventManager = require './EventManager'
EventedBaseMixin = require './EventedBaseMixin'

defineModule module, -> (superClass) ->
  class EventedMixin extends EventedBaseMixin superClass
    # NOTE: See EventedBaseMixin for full API
    constructor: ->
      super
      @_eventManager = null

    @getter
      eventManager: -> @_eventManager ||= new EventManager @

    # add every-time handlers
    on: (handlerMap) -> @eventManager.on @preprocessEventHandlers handlerMap

    # add one-time handlers
    onNext: (handlerMap) -> @eventManager.onNext handlerMap

    clearEventHandlers: -> @_eventManager = null
    removeListeners: (handlerMap) -> @_eventManager?.removeListeners handlerMap
    preprocessEventHandlers: (handlerMap) -> handlerMap

    ###################
    # PRIVATE OVERRIDES
    ###################
    _sendToEventHandler:  (event)     -> @_eventManager?.handleEvent event
    _hasEventHandler:     (eventType) -> @_eventManager?.hasHandler eventType

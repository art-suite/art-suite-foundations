Foundation = require 'art-foundation'
EventManager = require './EventManager'
EventEpoch = require './EventEpoch'
Event = require './Event'
EventedBaseMixin = require './EventedBaseMixin'

{defineModule, isFunction, log, isPlainObject} = Foundation
{eventEpoch} = EventEpoch

# to be used as a mixin via BaseObject's @include method
defineModule module, -> (superClass) ->
  class EventedMixin extends EventedBaseMixin superClass
    ###
    optional: call from your constructor to make your object more efficient
    Explanation: Most optimized javascript engines like objects that declare all their fields
      in the same order every time. In practice, this means do it in the constructor w/o conditionals.
    ###
    initEventHandling: -> @eventManager = null

    _sendToEventHandler: (event) -> @eventManager.handleEvent event
    _hasEventHandler: (eventType) -> @eventManager?.hasHandler eventType

    clearEventHandlers: -> @eventManager = null

    removeListeners: (handlerMap) -> @eventManager?.removeListeners handlerMap

    preprocessEventHandlers: (handlerMap) -> handlerMap

    # add every-time handlers
    on: (handlerMap) ->
      (@eventManager ||= new EventManager @).on handlerMap
      @preprocessEventHandlers handlerMap

    # add one-time handlers
    onNext: (handlerMap) -> (@eventManager ||= new EventManager @).onNext handlerMap

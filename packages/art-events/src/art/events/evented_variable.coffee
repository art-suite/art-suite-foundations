define [
  './namespace'
  'art-foundation'
  './evented_object'
], (Events, Foundation, EventedObject) ->
  eq = Foundation.Eq.eq

  class Events.EventedVariable extends Foundation.BaseObject
    @include EventedObject

    constructor: (value) ->
      @_value = value

    beforeFilter: (f) ->
      @beforeFilter = f

    @getter
      value: -> @_value

    @setter
      value: (value)->
        oldValue = @refresh value
        @queueEvent "change", value:value, oldValue:oldValue if !eq(oldValue, value)
        oldValue

    get: -> @_value
    set: (value) ->
      oldValue = @refresh value
      @queueEvent "change", value:value, oldValue:oldValue if !eq(oldValue, value)
      oldValue

    # update the value & only trigger :refresh events
    # subscribe to refresh events if you need to know when the value changes, but you shouldn't change any model-state because of it
    # if you are changing model-state, subscribe to :change
    refresh: (value) ->
      # value = @beforeFilter(value, @get()) if @beforeFilter
      oldValue = @_value
      @_value = value
      @queueEvent "refresh", value:value, oldValue:oldValue if !eq(oldValue, value)
      oldValue

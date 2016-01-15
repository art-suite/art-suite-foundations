define [
  './namespace'
  'art.foundation'
], (Events, Foundation) ->
  {currentSecond} = Foundation
  class Events.Event extends Foundation.BaseObject
    constructor: (@type, props, @timeStamp = currentSecond()) ->
      @[k] = v for k, v of props if props

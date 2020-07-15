{currentSecond, merge} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

emptyProps = {}
module.exports = class Event extends BaseClass
  constructor: (@type, @props = emptyProps, @timeStamp = currentSecond()) ->

  clone: ->
    new @class @type, @props, @timeStamp

  # This should only be used just after you clone an Event.
  # In general, don't mutate events.
  mergeInProps: (props) ->
    @props = merge @props, props
    @

{defineModule, log} = require 'art-standard-lib'
EventedMixin = require './EventedMixin'
{BaseClass} = require 'art-class-system'

# to be used as a mixin via BaseObject's @include method
defineModule module, class EventedObject extends EventedMixin BaseClass
  constructor: ->
    log.error "EventedObject is DEPRICATED - use EventedMixin"
    super

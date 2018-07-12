{currentSecond} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

emptyProps = {}
module.exports = class Event extends BaseClass
  constructor: (@type, @props = emptyProps, @timeStamp = currentSecond()) ->

  clone: ->
    new @class @type, @props, @timeStamp

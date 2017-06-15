{currentSecond} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

emptyProps = {}
module.exports = class Event extends BaseClass
  constructor: (@type, @props = emptyProps, @timeStamp = currentSecond()) ->

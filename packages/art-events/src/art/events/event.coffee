Foundation = require 'art-foundation'
{currentSecond, BaseObject} = Foundation

emptyProps = {}
module.exports = class Event extends BaseObject
  constructor: (@type, @props = emptyProps, @timeStamp = currentSecond()) ->

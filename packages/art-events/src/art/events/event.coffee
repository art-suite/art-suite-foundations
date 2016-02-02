Foundation = require 'art-foundation'
{currentSecond, BaseObject} = Foundation

module.exports = class Event extends BaseObject
  constructor: (@type, @props, @timeStamp = currentSecond()) ->

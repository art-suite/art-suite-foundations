{isString, isNumber, isDate} = require './Core/Types'
{formattedInspect} = require './Inspect'

march1973InMilliseconds = 100000000000

module.exports =
  # SEE: https://www.npmjs.com/package/dateformat

  # DEPRICATED - why did they name it this??? It should be "formatDate" - a correct english sentance fragment
  dateFormat: dateFormat = require "dateformat"

  formatDate: (value, format) ->
    if isString value
      format = value
      value = null

    dateFormat (toDate value), format

  ###
  IN:
    Date
    OR Number of Seconds since epoch-start
    OR Number of Milliseconds since epoch-start
  OUT:
    Number of Milliseconds since epoch-start
  ###
  toMilliseconds: toMilliseconds = (v) ->
    return Date.now() unless v?
    v = v - 0 if isString v
    if isNumber v
      if v < march1973InMilliseconds
        # assuming its a Seconds timestamp
        # range: 1970-01-01 to 5138-11-16
        v * 1000
      else
        # assuming its a Milliseconds timestamp
        # range: 1973-03-03 to JavaScript max-date
        v
    else if isDate v
      v - 0
    else throw new Error "invalid timestamp value: #{formattedInspect v}"

  ###
  IN:
    Date
    OR Number of Seconds since epoch-start
    OR Number of Milliseconds since epoch-start
  OUT:
    Number of Seconds since epoch-start
  ###
  toSeconds: (v) ->
    return Date.now() / 1000 unless v?
    (toMilliseconds(v) / 1000 + .5) | 0

  toDate: toDate = (v) ->
    return new Date unless v?
    if isDate v
      v
    else
      new Date toMilliseconds v
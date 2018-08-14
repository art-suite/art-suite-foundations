{isString, isNumber, isDate} = require './Core/Types'
{formattedInspect} = require './Inspect'

march1973InMilliseconds = 100000000000

module.exports =
  # SEE: https://www.npmjs.com/package/dateformat

  # DEPRICATED - why did they name it this??? It should be "formatDate" - a correct english sentance fragment
  dateFormat: dateFormat = require "dateformat"

  formatDate: (value, format, utc) ->
    if isString value
      format = value
      value = null

    dateFormat (toDate value), format, utc

  ###
  IN:
    v:
      Date
      OR Number of Seconds since epoch-start
      OR Number of Milliseconds since epoch-start
      OR String:
        if contains only digets with optional decimial
          examples:
            "123"
            "123.456"

          toMilliseconds v - 0

        else
          toMilliseconds Date.parse v
  OUT:
    Number of Milliseconds since epoch-start
  ###
  toMilliseconds: toMilliseconds = (v) ->
    return Date.now() unless v? && v != false
    if isString v
      if /^\d+(\.\d+)?$/.test v
        v = v - 0
      else
        v = Date.parse v

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
  toSeconds: toSeconds = (v) ->
    return Date.now() / 1000 unless v? && v != false
    (toMilliseconds(v) / 1000 + .5) | 0

  toDate: toDate = (v) ->
    return new Date unless v? && v != false
    if isDate v
      v
    else
      new Date toMilliseconds v

  secondsPerHour:  secondsPerHour = 3600
  secondsPerDay:   secondsPerDay  = secondsPerHour * 24

  firstOfHour:   firstOfHour = (time) ->  ((toSeconds(time)                 / secondsPerHour) | 0) * secondsPerHour
  firstOfDay:     firstOfDay = (time) ->  ((toSeconds(time)                 / secondsPerDay ) | 0) * secondsPerDay
  firstOfWeek:                 (time) ->  firstOfDay(time) - ((toDate(time).getUTCDay() - 1) %% 7) * secondsPerDay  # monday is first day
  firstOfMonth:                (time) ->  firstOfDay(time) - (toDate(time).getUTCDate() - 1)       * secondsPerDay

  firstOfDayLocale: firstOfDayLocal = (time) ->  firstOfHour(time)     - toDate(time).getHours()            * secondsPerHour
  firstOfWeekLocale:                  (time) ->  firstOfDayLocal(time) - ((toDate(time).getDay() - 1) %% 7) * secondsPerDay  # monday is first day
  firstOfMonthLocale:                 (time) ->  firstOfDayLocal(time) - (toDate(time).getDate() - 1)       * secondsPerDay

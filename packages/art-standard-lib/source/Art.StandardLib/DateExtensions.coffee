{isString, isNumber, isDate} = require './Core/Types'
{formattedInspect} = require './Inspect'

march1973InMilliseconds = 100000000000

module.exports =
  # SEE: https://www.npmjs.com/package/dateformat
  ###
    Mask              | Description
    ----              | -----------
    `d`               | Day of the month as digits; no leading zero for single-digit days.
    `dd`              | Day of the month as digits; leading zero for single-digit days.
    `ddd`             | Day of the week as a three-letter abbreviation.
    `dddd`            | Day of the week as its full name.
    `m`               | Month as digits; no leading zero for single-digit months.
    `mm`              | Month as digits; leading zero for single-digit months.
    `mmm`             | Month as a three-letter abbreviation.
    `mmmm`            | Month as its full name.
    `yy`              | Year as last two digits; leading zero for years less than 10.
    `yyyy`            | Year represented by four digits.
    `h`               | Hours; no leading zero for single-digit hours (12-hour clock).
    `hh`              | Hours; leading zero for single-digit hours (12-hour clock).
    `H`               | Hours; no leading zero for single-digit hours (24-hour clock).
    `HH`              | Hours; leading zero for single-digit hours (24-hour clock).
    `M`               | Minutes; no leading zero for single-digit minutes.
    `MM`              | Minutes; leading zero for single-digit minutes.
    `N`               | ISO 8601 numeric representation of the day of the week.
    `o`               | GMT/UTC timezone offset, e.g. -0500 or +0230.
    `s`               | Seconds; no leading zero for single-digit seconds.
    `ss`              | Seconds; leading zero for single-digit seconds.
    `S`               | The date's ordinal suffix (st, nd, rd, or th). Works well with `d`.
    `l`               |  Milliseconds; gives 3 digits.
    `L`               | Milliseconds; gives 2 digits.
    `t`               | Lowercase, single-character time marker string: a or p.
    `tt`              | Lowercase, two-character time marker string: am or pm.
    `T`               | Uppercase, single-character time marker string: A or P.
    `TT`              | Uppercase, two-character time marker string: AM or PM.
    `W`               | ISO 8601 week number of the year, e.g. 42
    `Z`               | US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the
    `'...'`, `"..."`  | Literal character sequence. Surrounding quotes are removed.
    `UTC:`            |  Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.

  ###

  # DEPRICATED - "formatDate" is a better function-name because it is verb-phrase, not a noun-phrase
  dateFormat: dateFormat = require "dateformat"

  formatDate: (value, format, utc) ->
    if isString(value) && !isString format
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
      v = switch
        when match = v.match /^(\d\d\d\d)-(\d\d)(?:-(\d\d))?$/
          [__, year, month, day = 1] = match
          new Date year - 0, month - 1, day - 0

        when /^\d+(\.\d+)?$/.test v
          v - 0

        else
          Date.parse v

    if isNumber v
      unless isFinite v
        throw new Error "toMilliseconds(#{v}) - number is not finite"
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
    (fractional) Number of Seconds since epoch-start
  ###
  toSeconds: toSeconds = (v) ->
    return Date.now() / 1000 unless v? && v != false
    toMilliseconds(v) / 1000

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

  firstOfDayLocale: firstOfDayLocale =  (time) ->  firstOfHour(time)     - toDate(time).getHours()            * secondsPerHour
  firstOfWeekLocale: (time, sundayIsFirst) ->
    day = toDate(time).getDay()
    day-- unless sundayIsFirst
    firstOfDayLocale(time) - secondsPerDay * (day %% 7)

  firstOfMonthLocale:                   (time) ->  firstOfDayLocale(time) - (toDate(time).getDate() - 1)       * secondsPerDay

{
  toSeconds, toMilliseconds, toDate
  firstOfHour
  firstOfDay
  firstOfWeek
  firstOfMonth

  firstOfDayLocale
  firstOfWeekLocale
  firstOfMonthLocale
} = require '../../../StandardImport'

date = new Date milliseconds = 1497123141167
roundedIntDiv1000 = (v) -> (v / 1000) + .5 | 0
seconds = roundedIntDiv1000 milliseconds
values = {date, seconds, milliseconds}

suite:
  basic: ->
    for valueName, value of values
      test "toSeconds #{valueName}", ->
        assert.isNumber v = toSeconds value
        assert.eq seconds, v

      test "toMilliseconds #{valueName}", ->
        assert.isNumber v = toMilliseconds value
        assert.ok abs(milliseconds - v) < 1000

      test "toDate #{valueName}", ->
        assert.isDate v = toDate value
        assert.ok abs(v - milliseconds) < 1000

    test "toSeconds null", -> assert.eq null, toSeconds null
    test "toMilliseconds null", -> assert.eq null, toMilliseconds null
    test "toDate null", -> assert.eq null, toDate null

    # NOTE - the local timezone effects formatDate, so when testing
    # in different timezones, this test would fail if we hardcoded the string
    test "formatDate", ->
      baseline = formatDate date
      assert.eq baseline, formatDate seconds
      assert.eq baseline, formatDate milliseconds

  firstOf: ->
    breakOut = (time) ->
      d = toDate time
      year:       d.getUTCFullYear()
      month:      d.getUTCMonth()
      day:        d.getUTCDate()
      hour:       d.getUTCHours()
      min:        d.getUTCMinutes()
      dayOfWeek:  d.getUTCDay()

    testFirstOf = (name, f, m) ->
      test name, ->
        v = f testTime
        assert.eq (breakOut v),
          merge
            breakOut testTime
            m

    testTime = 1528587452531
    testFirstOf "firstOfHour",   firstOfHour,  min: 0
    testFirstOf "firstOfDay",    firstOfDay,   hour: 0, min: 0
    testFirstOf "firstOfWeek",   firstOfWeek,  hour: 0, min: 0, dayOfWeek: 1, day: 4
    testFirstOf "firstOfMonth",  firstOfMonth, hour: 0, min: 0, dayOfWeek: 5, day: 1

  firstOfLocale: ->
    breakOut = (time) ->
      d = toDate time
      year:       d.getFullYear()
      month:      d.getMonth()
      day:        d.getDate()
      hour:       d.getHours()
      min:        d.getMinutes()
      dayOfWeek:  d.getDay()

    testFirstOfLocale = (name, f, m) ->
      test name, ->
        v = f testTime
        assert.eq (breakOut v),
          merge
            breakOut testTime
            m

    testTime = 1528587452531
    testFirstOfLocale "firstOfHour",   firstOfHour,  min: 0
    testFirstOfLocale "firstOfDay",    firstOfDayLocale,   hour: 0, min: 0
    testFirstOfLocale "firstOfWeek",   firstOfWeekLocale,  hour: 0, min: 0, dayOfWeek: 1, day: 4
    testFirstOfLocale "firstOfMonth",  firstOfMonthLocale, hour: 0, min: 0, dayOfWeek: 5, day: 1

{toSeconds, toMilliseconds, toDate} = require '../../../StandardImport'

date = new Date milliseconds = 1497123141167
roundedIntDiv1000 = (v) -> (v / 1000) + .5 | 0
seconds = roundedIntDiv1000 milliseconds
values = {date, seconds, milliseconds}

suite: ->
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

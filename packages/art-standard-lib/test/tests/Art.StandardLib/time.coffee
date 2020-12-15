
{StandardLib} = Neptune.Art
{stackTime, log, currentSecond, durationString} = StandardLib

module.exports = suite:
  durationString: ->
    test "small durations", ->
      assert.eq "0", durationString 0
      assert.eq "100ms", durationString .1
      assert.eq "100μs", durationString .0001
      assert.eq "100ns", durationString .0000001
      assert.eq "0", durationString .0000000001

    test "basic", ->
      assert.eq "1s", durationString 1
      assert.eq "10s", durationString 10
      assert.eq "1m", durationString 60
      assert.eq "1m", durationString 89
      assert.eq "2m", durationString 90

    test "multiple levels", ->
      assert.eq "1m 30s", durationString 90, 2
      assert.eq "1m 30s", durationString 90, 4
      assert.eq "1m 30s", durationString 90, 400000
      assert.eq "47mo 18d 21h 33m 9s", durationString 123456789, 400000

  misc: ->
    test "stackTime", ->
      insideTime = 0
      startTime = currentSecond()
      outsideTime = stackTime ->
        insideTime = stackTime ->
          j = 0
          j++ for i in [1..100000]
      endTime = currentSecond()
      totalTime = endTime - startTime

      outsideTime = outsideTime.remainder
      insideTime = insideTime.remainder

      log insideTime:insideTime, outsideTime:outsideTime, totalTime: totalTime
      assert.lte outsideTime, insideTime, "outsideTime"
      assert.lte outsideTime + insideTime, totalTime, "outsideTime + insideTime"


      # o = {}
      # id = Unique.objectId o
      # assert.equal (typeof id), "number"


{Foundation} = Neptune.Art
{stackTime, log, currentSecond} = Foundation

suite "Art.Foundation.StandardLib.Time", ->
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
    assert.eq true, outsideTime <= insideTime
    assert.eq true, outsideTime + insideTime <= totalTime


    # o = {}
    # id = Unique.objectId o
    # assert.equal (typeof id), "number"

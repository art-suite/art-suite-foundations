
{StandardLib} = Neptune.Art
{nextTick, eq, inspect, clone} = StandardLib

suite "Art.StandardLib.StandardLib.nextTick", ->
  test "one nextTick", (done)->
    nextTick done
    null

  test "nextTick with Promise", ->
    nextTick()

  test "nextTick is not immediate", ->
    nextTickHappened = false
    p = nextTick -> nextTickHappened = true
    assert.eq nextTickHappened, false
    p.then ->
      assert.eq nextTickHappened, true

  test "two nextTicks", ->
    count = 0
    nextTick ->
      count++
    nextTick ->
      assert.equal count, 1

  test "nested nextTicks", (done) ->
    sequence = ""
    nextTick -> sequence += "a"
    nextTick ->
      sequence += "b"
      nextTick ->
        sequence += "d"
        assert.equal sequence, "abcd"
        done()
    nextTick -> sequence += "c"
    null


{Foundation} = Neptune.Art

suite "Art.Foundation.Tools.Stat", ->
  test "average, min, max, samples", ->
    s = new Foundation.Stat
    s.add 1
    s.add 2
    s.add 3
    assert.eq s.values, [1,2,3]
    assert.eq s.values.length, 3
    assert.eq s.average, 2
    assert.eq s.min, 1
    assert.eq s.max, 3
    assert.eq s.length, 3

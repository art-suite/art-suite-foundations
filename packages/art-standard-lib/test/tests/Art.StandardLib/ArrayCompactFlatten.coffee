{compactFlatten, compact, flatten} = require './StandardImport'

suite: ->
  test "compactFlatten with only compacting needed", ->
    assert.eq (compactFlatten [1, null, undefined]), [1]

  test "compactFlatten with only flattening needed", ->
    assert.eq (compactFlatten [1,2,3,[4,5]]), [1,2,3,4,5]

  test "compactFlatten(a) and compact(flatten(a)) return same structure", ->
    structure = [0, [false], 1, 2, null, 3, [4, undefined, 5]]
    cF = compactFlatten structure
    c_f = compact flatten structure
    assert.eq cF, c_f

  test "compactFlatten with custom keepTester", ->
    structure = [0, [false], 1, 2, null, 3, [4, undefined, 5]]
    assert.eq (compactFlatten structure), [0, false, 1, 2, 3, 4, 5]
    assert.eq (compactFlatten structure, (a) -> !!a), [1, 2, 3, 4, 5]

{
  clone
  eq
  inspect
  compact
  compactFlatten
  flatten
  minimumOrderedOverlappingMerge
  longestCommonSubsequence
  insert
  withInserted
  deepEach
  stableSort
  log
  findSortedFirst
  arrayWithElementValueMoved
  arrayWithElementMoved
  moveArrayElement
  w
  a
  leftOf, rightOf, leftOfIndex, rightOfIndex, splitArray
} = Neptune.Art.StandardLib

module.exports = suite: ->
  test "compactFlatten null", -> assert.eq null, compactFlatten null
  test "compactFlatten undefined", -> assert.eq undefined, compactFlatten undefined
  test "compactFlatten false", -> assert.eq [false], compactFlatten false
  test "compactFlatten 1", -> assert.eq [1], compactFlatten 1
  test "compactFlatten ''", -> assert.eq [""], compactFlatten ""
  test "compactFlatten {}", -> assert.eq [{}], compactFlatten {}
  test "compactFlatten []", -> assert.eq [], compactFlatten []
  test "compactFlatten 'a'", -> assert.eq ["a"], compactFlatten "a"

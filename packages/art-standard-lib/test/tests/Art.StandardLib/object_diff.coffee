
{StandardLib} = Neptune.Art
{
  objectDiff
  inspect
  plainObjectsDeepEq
  objectKeyCount
} = StandardLib

suite "Art.StandardLib.StandardLib.objectDiff", ->
  added = removed = changed = unchanged = 0
  add = -> added++
  remove = -> removed++
  change = -> changed++
  noChange = -> unchanged++
  diffTest = (name, newObj, oldObj, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, options = {}) ->
    {useOldObjLengthHint, eqF} = options
    test name, ->
      o2LengthHint = if useOldObjLengthHint then objectKeyCount oldObj else null
      added = removed = changed = unchanged = 0
      objectDiff newObj, oldObj, add, remove, change, noChange, eqF, o2LengthHint
      assert.eq expectedAdded,      added,      "added"
      assert.eq expectedRemoved,    removed,    "removed"
      assert.eq expectedChanged,    changed,    "changed"
      assert.eq expectedUnchanged,  unchanged,  "unchanged"
  diffTestSuite = (name, newObj, oldObj, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged) ->
    suite "#{name}: newObj: #{inspect newObj}, oldObj: #{inspect oldObj}", ->
      diffTest "basic",                   newObj, oldObj, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged
      diffTest "oldObj-length-hint",      newObj, oldObj, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, useOldObjLengthHint:true
      diffTest "compare values with plainObjectsDeepEq",  newObj, oldObj, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, eqF:plainObjectsDeepEq

  diffTestSuite "null oldObj",                  {a:1, b:2},       null,               2, 0, 0, 0

  diffTestSuite "same",                         {a:1, b:2},       {a:1, b:2},         0, 0, 0, 2
  diffTestSuite "added",                        {a:1, b:2, c:3},  {a:1, b:2},         1, 0, 0, 2
  diffTestSuite "removed",                      {a:1, b:2},       {a:1, b:2, c:3},    0, 1, 0, 2
  diffTestSuite "changed",                      {a:1, b:2},       {a:1, b:3},         0, 0, 1, 1
  diffTestSuite "added, removed and changed",   {a:1, b:2, c:3},  {a:1, b:3, d:4},    1, 1, 1, 1

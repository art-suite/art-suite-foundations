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

module.exports = suite:
  move: ->
    moveArrayElementTest = (inArray, from, to, outArray) ->
      test "moveArrayElement #{inspect inArray}, #{from}, #{to} >>> #{inspect outArray}", ->
        assert.eq outArray, moveArrayElement inArray, from, to

    moveArrayElementTest [1,2,3], 0, 0, [1,2,3]
    moveArrayElementTest [1,2,3], 0, 1, [2,1,3]
    moveArrayElementTest [1,2,3], 0, 2, [2,3,1]

    moveArrayElementTest [1,2,3], 1, 0, [2,1,3]
    moveArrayElementTest [1,2,3], 1, 1, [1,2,3]
    moveArrayElementTest [1,2,3], 1, 2, [1,3,2]

    moveArrayElementTest [1,2,3], 2, 0, [3,1,2]
    moveArrayElementTest [1,2,3], 2, 1, [1,3,2]
    moveArrayElementTest [1,2,3], 2, 2, [1,2,3]

    largeMoveArrayElementTest = (from, to, tests) ->
      test "large moveArrayElement from:#{from}, to:#{to}", ->
        a = (i for i in [0...1000])
        assert.eq a.length, 1000
        assert.eq a[0], 0
        assert.eq a[999], 999
        largeArray = moveArrayElement a, from, to
        assert.eq largeArray.length, 1000
        for k, v of tests
          index = k | 0
          assert.eq largeArray[index], v, "largeArray[#{index}] should == #{v}"

    largeMoveArrayElementTest 999, 0,
      0: 999
      1: 0
      998: 997
      999: 998

    largeMoveArrayElementTest 0, 999,
      0: 1
      1: 2
      998: 999
      999: 0

    test 'arrayWithElementMoved [1,2,3], 2, 0', ->
      assert.eq [3,1,2], arrayWithElementMoved [1,2,3], 2, 0

    test 'arrayWithElementValueMoved [1,2,3], 3, 0', ->
      assert.eq [3,1,2], arrayWithElementValueMoved [1,2,3],3, 0

  compact: ->

    test "compact", ->
      assert.eq (compact [1,2,3,null,4]), [1,2,3,4]
      assert.eq (compact [1,2,3,null]), [1,2,3]
      assert.eq (compact [null,1,2,3]), [1,2,3]

    test "compact doesn't remove false", ->
      assert.eq ["child2", "child3", false, "child4"], compact [undefined, "child2", null, "child3", false, "child4"]

    test "compact not needed returns exactly the input array", ->
      a = [1,3,4]
      assert.equal a, compact a

    test "compact with custom keepTester", ->
      structure = [0, false, 1, 2, null, 3, 4, undefined, 5]
      assert.eq (compact structure), [0, false, 1, 2, 3, 4, 5]
      assert.eq (compact structure, (a) -> !!a), [1, 2, 3, 4, 5]

  flatten: ->
    test "flatten empty array", ->
      assert.eq (flatten []), []

    test "flatten not needed returns exactly the input array", ->
      a = [1,3,4]
      assert.equal a, flatten a

    test "flatten args returns array", ->
      assert.eq (flatten 1,2,3).constructor, Array

    test "flatten() => []",           -> assert.eq [], flatten()
    test "flatten [] => []",          -> assert.eq [], flatten []
    test "flatten 1 => [1]",          -> assert.eq [1], flatten 1
    test "flatten [1] => [1]",        -> assert.eq [1], flatten [1]
    test "flatten 1, 2 => [1, 2]",    -> assert.eq [1, 2], flatten 1, 2
    test "flatten [1], 2 => [1, 2]",  -> assert.eq [1, 2], flatten [1], 2
    test "flatten 1, [2] => [1, 2]",  -> assert.eq [1, 2], flatten 1, [2]
    test "flatten [1, 2] => [1, 2]",  -> assert.eq [1, 2], flatten [1, 2]

    test "flatten already flat array returns untouched input", ->
      b = flatten a = [1,2,3,4,5]
      assert.eq true, a == b

    test "flatten keeps nulls, undefineds, falses and 0s", ->
      assert.eq (flatten [null, undefined, false, 0]), [null, undefined, false, 0]

    test "flatten array with one sub-array", ->
      assert.eq (flatten [1,2,3,[4,5]]), [1,2,3,4,5]

    test "flatten array lots of direct nesting", ->
      assert.eq (flatten [[[1]]]), [1]
      assert.eq (flatten [[[]]]), []

    test "flatten array with random nesting", ->
      assert.eq (flatten [[0, [1, 2], 3], [4, [5, [6, 7]]]]), [0, 1, 2, 3, 4, 5, 6, 7]

    test "flatten array with nested []", ->
      assert.eq (flatten [[],1,2,3,[4,5]]), [1,2,3,4,5]


  insert: ->
    test "insert 0", ->
      assert.eq (insert [1,2,3], 0, 999), [999, 1, 2, 3]

    test "insert 3", ->
      assert.eq (insert [1,2,3], 3, 999), [1, 2, 3, 999]

    test "insert -1", ->
      assert.eq (insert [1,2,3], -1, 999), [1, 2, 3, 999]

    test "insert -2", ->
      assert.eq (insert [1,2,3], -2, 999), [1, 2, 999, 3]

    test "withInserted 0", ->
      a = [1,2,3]
      b = withInserted a, 0, 999
      assert.eq a, [1, 2, 3]
      assert.eq b, [999, 1, 2, 3]

  longestCommonSubsequence: ->

    test "longestCommonSubsequence [2], [2]", ->
      c = longestCommonSubsequence [2], [2]
      assert.eq c, [2]

    test "longestCommonSubsequence [2], [2, 1]", ->
      c = longestCommonSubsequence [2], [2, 1]
      assert.eq c, [2]

    test "longestCommonSubsequence [2, 1], [2, 1]", ->
      c = longestCommonSubsequence [2, 1], [2, 1]
      assert.eq c, [2, 1]

    test "longestCommonSubsequence [2, 1, 2], [2, 1]", ->
      c = longestCommonSubsequence [2, 1, 2], [2, 1]
      assert.eq c, [2, 1]

    test "longestCommonSubsequence [1, 2], [2, 1]", ->
      c = longestCommonSubsequence [1, 2], [2, 1]
      assert.eq c, [1]

    test "longestCommonSubsequence [1], [2, 1, 4]", ->
      c = longestCommonSubsequence [1], [2, 1, 4]
      assert.eq c, [1]

    test "minimumOrderedOverlappingMerge [1,2], [2, 1]", ->
      c = minimumOrderedOverlappingMerge [1,2], [2, 1]
      assert.eq c, [2, 1]

    test "minimumOrderedOverlappingMerge [1,3], [2, 1]", ->
      c = minimumOrderedOverlappingMerge [1,3], [2, 1]
      assert.eq c, [2, 1, 3]

    test "minimumOrderedOverlappingMerge [1], [2, 1, 4]", ->
      c = minimumOrderedOverlappingMerge [1], [2, 1, 4]
      assert.eq c, [2, 1, 4]

  stableSort: ->
    test "stableSort works like sort (except for stability)", ->
      arrays = [
        [1, 2, 3, 4]
        [4, 3, 2, 1]
        [3, 1, 2, 4]
        []
        [1]
        [2, 1]
        [1, 2, 3]
        [1, 1]
        [2, 3, 1, 1, 4]
      ]
      for a in arrays
        assert.eq a.sort(), stableSort a

    test "stableSort maintains order of 'same' elements", ->
      list = [
        [2, 'a']
        [1, 'b']
        [1, 'c']
        [0, 'f']
        [1, 'd']
        [1, 'e']
      ]
      stableSortedList = [
        [0, 'f']
        [1, 'b']
        [1, 'c']
        [1, 'd']
        [1, 'e']
        [2, 'a']
      ]
      sortFunciton = (a, b) -> a[0] - b[0]
      assert.eq stableSortedList, stableSort list, sortFunciton

  "slice helpers": ->
    test "leftOfIndex null array",       -> assert.eq null,   leftOfIndex  null, 0
    test "rightOfIndex null array",      -> assert.eq null,   rightOfIndex null, 0
    test "leftOfIndex 0",       -> assert.eq [],            leftOfIndex  [1,2,3,4,5,6], 0
    test "rightOfIndex 0",      -> assert.eq [2,3,4,5,6],   rightOfIndex [1,2,3,4,5,6], 0
    test "leftOfIndex -2",      -> assert.eq [1,2,3,4],     leftOfIndex  [1,2,3,4,5,6], -2
    test "rightOfIndex -2",     -> assert.eq [6],           rightOfIndex [1,2,3,4,5,6], -2
    test "leftOfIndex -1",      -> assert.eq [1,2,3,4,5],   leftOfIndex  [1,2,3,4,5,6], -1
    test "rightOfIndex -1",     -> assert.eq [],            rightOfIndex [1,2,3,4,5,6], -1
    test "leftOfIndex 3",       -> assert.eq [1,2,3],       leftOfIndex  [1,2,3,4,5,6], 3
    test "rightOfIndex 3",      -> assert.eq [5,6],         rightOfIndex [1,2,3,4,5,6], 3
    test "leftOfIndex 5",       -> assert.eq [1,2,3,4,5],   leftOfIndex  [1,2,3,4,5,6], 5
    test "rightOfIndex 5",      -> assert.eq [],            rightOfIndex [1,2,3,4,5,6], 5
    test "leftOfIndex 6",       -> assert.eq [1,2,3,4,5,6], leftOfIndex  [1,2,3,4,5,6], 6
    test "rightOfIndex 6",      -> assert.eq [],            rightOfIndex [1,2,3,4,5,6], 6
    test "leftOfIndex 7",       -> assert.eq [1,2,3,4,5,6], leftOfIndex  [1,2,3,4,5,6], 7
    test "rightOfIndex 7",      -> assert.eq [],            rightOfIndex [1,2,3,4,5,6], 7
    test "leftOf one match",    -> assert.eq [1, 2, 3],     leftOf  [1,2,3,4,5,6], 4
    test "rightOf one match ",  -> assert.eq [5, 6],        rightOf [1,2,3,4,5,6], 4
    test "leftOf no match",     -> assert.eq [1,2,3,4,5,6], leftOf  [1,2,3,4,5,6], 400
    test "rightOf no match ",   -> assert.eq [],            rightOf [1,2,3,4,5,6], 400
    test "leftOf two matches",  -> assert.eq [1],           leftOf  [1,4,3,4,5,6], 4
    test "rightOf two matches", -> assert.eq [3,4,5,6],     rightOf [1,4,3,4,5,6], 4

    test "splitArray", -> assert.eq [[1,2], [4,5,6]], splitArray [1,2,3,4,5,6], 3

  findSortedFirst: ->
    test "empty or null/undefined array returns undefined", ->
      assert.eq undefined, findSortedFirst []
      assert.eq undefined, findSortedFirst null
      assert.eq undefined, findSortedFirst undefined

    test "numbers", ->
      assert.eq 1, findSortedFirst [3, 1, 2]
      assert.eq 1, findSortedFirst [1, 2, 3]
      assert.eq 1, findSortedFirst [1, 3, 2]

    test "custom compareFunction with numbers", ->
      assert.eq 3, findSortedFirst [3, 1, 2], (a, b) -> b - a
      assert.eq 3, findSortedFirst [1, 2, 3], (a, b) -> b - a
      assert.eq 3, findSortedFirst [1, 3, 2], (a, b) -> b - a


  w: ->
    assert.test.eq w, "this", ['this']
    assert.test.eq w, "this ~!@#$%^&*()_+{}|:<>? stinks", ['this', "~!@#$%^&*()_+{}|:<>?", "stinks"]
    assert.test.eq w, "this is it", ['this', 'is', 'it']
    assert.test.eq w, ["this is", "it also"], ['this', 'is', 'it', 'also']
    assert.test.eq w, [123, "it also", foo: 'baz it', ["keep together"]], [123, "it", "also", foo: 'baz it', ["keep together"]]

  a: ->
    assert.test.eq a, [], []
    assert.test.eq a, [null], [null]
    assert.test.eq a, [undefined], [undefined]
    assert.test.eq a, [0], [0]
    assert.test.eq a, [false], [false]
    assert.test.eq a, [1, 2 ,3], [1, 2, 3]
    assert.test.eq a, [1, [2 ,3]], [1, [2, 3]]

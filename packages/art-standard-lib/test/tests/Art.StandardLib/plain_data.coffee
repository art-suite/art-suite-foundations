
{StandardLib} = Neptune.Art
{merge, deepEach, deepMap, log, inspect, toJsonStructure, compact} = StandardLib

suite "Art.StandardLib.StandardLib.PlainData", ->

  suite "deepEach", ->
    tester = (v, expectedCount, expectedSum) ->
      test "deepEach #{inspect v} should count #{expectedCount} and sum #{expectedSum}", ->
        count = sum = 0
        deepEach v, (v) -> count++; sum+=v
        assert.equal expectedSum, sum
        assert.equal expectedCount, count

    suite "single value", ->
      tester 123, 1, 123

    suite "arrays only", ->
      tester [], 0, 0
      tester [10, 20], 2, 30
      tester [10, [20, 30]], 3, 60
      tester [10, [20, [[30]]], []], 3, 60

    suite "objects only", ->
      tester {}, 0, 0
      tester {a:10, b:20}, 2, 30
      tester {a:10, b:{c:20, d:30}}, 3, 60
      tester {a:10, b:{c:20, d:{e:{f:30}}}, h:{}}, 3, 60

    suite "mixed", ->
      tester [{}], 0, 0
      tester {a:[]}, 0, 0
      tester [{a:12}], 1, 12
      tester {a:[12]}, 1, 12
      tester {a:[10], b:20, c:{d:30}}, 3, 60


  suite "toJsonStructure", ->
    tester = (v, expectedResult) ->
      test "toJsonStructure #{inspect v} -> #{inspect expectedResult}", ->
        result = toJsonStructure v
        if expectedResult instanceof RegExp
          assert.match result, expectedResult
        else
          assert.eq expectedResult, result

    suite "json atomic types", ->
      tester 123, 123
      tester "hi", "hi"
      tester true, true
      tester false, false

    suite "json collection types", ->
      tester {}, {}
      tester [], []

    suite "non-json types", ->
      tester (->), /\s*function\s*\(\)\s*{}/
      d = new Date
      tester d, d.toString()

  suite "deepMap", ->
    tester = (v, expectedResult, f) ->
      test "deepMap #{inspect v} -> #{inspect expectedResult}", ->
        result = deepMap v, f
        assert.eq expectedResult, result

    suite "single value", ->
      tester 123, 246, (v) -> v * 2

    suite "arrays only", ->
      tester [],                      [],                     (v) -> v * 2
      tester [[]],                    [[]],                   (v) -> v * 2
      tester [10, 20],                [20, 40],               (v) -> v * 2
      tester [10, [20, 30]],          [20, [40, 60]],         (v) -> v * 2
      tester [10, [20, [[30]]], []],  [20, [40, [[60]]], []], (v) -> v * 2

    suite "objects only", ->
      tester {},                                    {},                                   (v) -> v * 2
      tester {a:{}},                                {a:{}},                               (v) -> v * 2
      tester {a:10, b:20},                          {a:20, b:40},                         (v) -> v * 2
      tester {a:10, b:{c:20, d:30}},                {a:20, b:{c:40, d:60}},               (v) -> v * 2
      tester {a:10, b:{c:20, d:{e:{f:30}}}},  {a:20, b:{c:40, d:{e:{f:60}}}},             (v) -> v * 2
      tester {a:10, b:{c:20, d:{e:{f:30}}}, h:{}},  {a:20, b:{c:40, d:{e:{f:60}}}, h:{}}, (v) -> v * 2

    suite "mixed", ->
      tester [{}],                     [{}],                     (v) -> v * 2
      tester {a:[]},                   {a:[]},                   (v) -> v * 2
      tester [{a:12}],                 [{a:24}],                 (v) -> v * 2
      tester {a:[12]},                 {a:[24]},                 (v) -> v * 2
      tester {a:[10], b:20, c:{d:30}}, {a:[20], b:40, c:{d:60}}, (v) -> v * 2

    suite "no change returns exach same object", ->
      testNoChange = (v) ->
        test inspect(v), ->
          result = deepMap v, (v) -> v
          assert.equal true, result == v

      testNoChange []
      testNoChange [123]
      testNoChange [1, 2, 3]
      testNoChange {}
      testNoChange {a:1, b:2, c:3}
      testNoChange {a:[10], b:20, c:{d:30}}
      test "no change on sub object but change on parent; sub object is identical", ->
        c = deepMap a = [b = [4], 123], (v) ->
          if v == 123
            456
          else
            v
        assert.eq [[4], 456], c
        assert.eq [4], c[0]
        assert.equal true, b == c[0]
        assert.equal false, a == c

    suite "postprocessArray", ->
      test "basic", ->
        c = deepMap [1,2,3], ((v) -> if v == 2 then v else null), postprocessArray: compact
        assert.eq c, [2]

      test "deep", ->
        c = deepMap [1,[2,3], 2], ((v) -> if v == 2 then v else null), postprocessArray: compact
        assert.eq c, [[2], 2]

    suite "postprocessObject", ->
      test "basic", ->
        c = deepMap {a:1,b:2,c:3}, ((v) -> if v == 2 then v else undefined), postprocessObject: merge
        assert.eq c, b: 2

      test "deep", ->
        c = deepMap {a:1,b:{b1:2,b2:3}, c:2}, ((v) -> if v == 2 then v else undefined), postprocessObject: merge
        assert.eq c, c: 2, b: b1: 2
